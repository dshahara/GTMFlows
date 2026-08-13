import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ADMIN_EMAILS,
  type AutomationContent,
  type AutomationRecord,
  seedAutomations,
  slugify,
  toPublicAutomation,
  type PublicAutomation,
} from "./catalogue";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

type AutomationRow = {
  id: number;
  sort_order: number;
  draft_slug: string;
  published_slug: string | null;
  draft_json: AutomationContent | string;
  published_json: AutomationContent | string | null;
  archived_at: number | null;
  created_at: number;
  updated_at: number;
  published_at: number | null;
  created_by: string | null;
  updated_by: string | null;
  published_by: string | null;
};

type RedirectRow = {
  to_slug: string;
};

export type SlugLookup =
  | { kind: "automation"; automation: PublicAutomation; record: AutomationRecord }
  | { kind: "redirect"; toSlug: string }
  | { kind: "missing" };

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

export async function getCatalogueRecords(): Promise<AutomationRecord[]> {
  const supabase = await prepareDatabase();
  const { data, error } = await supabase
    .from("automations")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("id", { ascending: true });
  assertNoError(error);
  return ((data ?? []) as AutomationRow[]).map(rowToRecord);
}

export async function getCatalogueRecord(id: number): Promise<AutomationRecord | null> {
  const supabase = await prepareDatabase();
  const { data, error } = await supabase.from("automations").select("*").eq("id", id).maybeSingle();
  assertNoError(error);
  return data ? rowToRecord(data as AutomationRow) : null;
}

export async function getPublishedAutomations(): Promise<PublicAutomation[]> {
  try {
    const records = await getCatalogueRecords();
    const published = records
      .filter((record) => !record.archivedAt && record.published?.visible)
      .map((record) => toPublicAutomation(record.published as AutomationContent, record.sortOrder));
    return published.length ? published : seedAutomations.map((item, index) => toPublicAutomation(item, index + 1));
  } catch {
    return seedAutomations.map((item, index) => toPublicAutomation(item, index + 1));
  }
}

export async function findPublishedAutomationBySlug(slug: string): Promise<SlugLookup> {
  try {
    const supabase = await prepareDatabase();
    const { data: automationRow, error: automationError } = await supabase
      .from("automations")
      .select("*")
      .eq("published_slug", slug)
      .not("published_json", "is", null)
      .is("archived_at", null)
      .maybeSingle();
    assertNoError(automationError);

    if (automationRow) {
      const record = rowToRecord(automationRow as AutomationRow);
      return { kind: "automation", record, automation: toPublicAutomation(record.published as AutomationContent, record.sortOrder) };
    }

    const { data: redirectRow, error: redirectError } = await supabase
      .from("automation_slug_redirects")
      .select("to_slug")
      .eq("from_slug", slug)
      .maybeSingle();
    assertNoError(redirectError);
    if ((redirectRow as RedirectRow | null)?.to_slug) return { kind: "redirect", toSlug: (redirectRow as RedirectRow).to_slug };
  } catch {
    const seeded = seedAutomations.find((item) => item.slug === slug);
    if (seeded) {
      const record = seedRecord(seeded, seeded.id);
      return { kind: "automation", record, automation: toPublicAutomation(seeded, seeded.id) };
    }
  }

  return { kind: "missing" };
}

export async function createAutomation(email: string, partial?: Partial<AutomationContent>) {
  const supabase = await prepareDatabase();
  const now = Date.now();
  const { data: lastRow, error: lastError } = await supabase
    .from("automations")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  assertNoError(lastError);

  const nextOrder = ((lastRow as Pick<AutomationRow, "sort_order"> | null)?.sort_order ?? 0) + 1;
  const name = partial?.name?.trim() || "Untitled automation";
  const draft = normalizeAutomation({
    ...seedAutomations[0],
    id: nextOrder,
    name,
    short: partial?.short || "",
    slug: await uniqueSlug(supabase, partial?.slug || slugify(name) || `automation-${now}`),
    category: partial?.category || "Lead flow",
    setupCostMin: partial?.setupCostMin ?? 0,
    setupCostMax: partial?.setupCostMax ?? 0,
    monthlyCostMin: partial?.monthlyCostMin ?? 0,
    monthlyCostMax: partial?.monthlyCostMax ?? 0,
    implementationDaysMin: partial?.implementationDaysMin ?? 1,
    implementationDaysMax: partial?.implementationDaysMax ?? 1,
    details: partial?.details ?? ["Describe what the automation does."],
    steps: partial?.steps ?? ["Capture", "Process", "Sync"],
    tools: partial?.tools ?? [],
    faqs: partial?.faqs ?? [],
    visible: partial?.visible ?? true,
  });

  const { error } = await supabase.from("automations").insert({
    sort_order: nextOrder,
    draft_slug: draft.slug,
    draft_json: draft,
    created_at: now,
    updated_at: now,
    created_by: email,
    updated_by: email,
  });
  assertNoError(error);
  return getCatalogueRecords();
}

export async function updateAutomationDraft(id: number, draft: AutomationContent, email: string) {
  const supabase = await prepareDatabase();
  const normalized = normalizeAutomation(draft);
  await assertDraftSlugAvailable(supabase, normalized.slug, id);
  const { error } = await supabase
    .from("automations")
    .update({
      draft_slug: normalized.slug,
      draft_json: normalized,
      updated_at: Date.now(),
      updated_by: email,
    })
    .eq("id", id);
  assertNoError(error);
  return getCatalogueRecords();
}

export async function duplicateAutomation(id: number, email: string) {
  const supabase = await prepareDatabase();
  const source = await getRecordById(supabase, id);
  const { data: lastRow, error: lastError } = await supabase
    .from("automations")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  assertNoError(lastError);

  const nextOrder = ((lastRow as Pick<AutomationRow, "sort_order"> | null)?.sort_order ?? 0) + 1;
  const now = Date.now();
  const draft = normalizeAutomation({
    ...source.draft,
    id: nextOrder,
    name: `${source.draft.name} Copy`,
    slug: await uniqueSlug(supabase, `${source.draft.slug}-copy`),
  });

  const { error } = await supabase.from("automations").insert({
    sort_order: nextOrder,
    draft_slug: draft.slug,
    draft_json: draft,
    created_at: now,
    updated_at: now,
    created_by: email,
    updated_by: email,
  });
  assertNoError(error);
  return getCatalogueRecords();
}

export async function publishAutomation(id: number, email: string) {
  const supabase = await prepareDatabase();
  const record = await getRecordById(supabase, id);
  const validation = validateForPublish(record.draft);
  if (validation.length) {
    throw new Error(validation.join(" "));
  }

  await assertPublishedSlugAvailable(supabase, record.draft.slug, id);
  const previousSlug = record.published?.slug;
  const now = Date.now();
  const { error: updateError } = await supabase
    .from("automations")
    .update({
      published_slug: record.draft.slug,
      published_json: record.draft,
      published_at: now,
      published_by: email,
      updated_at: now,
      updated_by: email,
    })
    .eq("id", id);
  assertNoError(updateError);

  if (previousSlug && previousSlug !== record.draft.slug) {
    const { error: redirectError } = await supabase.from("automation_slug_redirects").upsert(
      {
        automation_id: id,
        from_slug: previousSlug,
        to_slug: record.draft.slug,
        created_at: now,
      },
      { onConflict: "from_slug" },
    );
    assertNoError(redirectError);
  }

  return getCatalogueRecords();
}

export async function unpublishAutomation(id: number, email: string) {
  const supabase = await prepareDatabase();
  const { error } = await supabase
    .from("automations")
    .update({
      published_slug: null,
      published_json: null,
      updated_at: Date.now(),
      updated_by: email,
    })
    .eq("id", id);
  assertNoError(error);
  return getCatalogueRecords();
}

export async function setAutomationArchived(id: number, archived: boolean, email: string) {
  const supabase = await prepareDatabase();
  const { error } = await supabase
    .from("automations")
    .update({
      archived_at: archived ? Date.now() : null,
      updated_at: Date.now(),
      updated_by: email,
    })
    .eq("id", id);
  assertNoError(error);
  return getCatalogueRecords();
}

export async function reorderAutomations(ids: number[], email: string) {
  const supabase = await prepareDatabase();
  const now = Date.now();
  await Promise.all(
    ids.map(async (id, index) => {
      const { error } = await supabase
        .from("automations")
        .update({ sort_order: index + 1, updated_at: now, updated_by: email })
        .eq("id", id);
      assertNoError(error);
    }),
  );
  return getCatalogueRecords();
}

async function prepareDatabase() {
  const supabase = createSupabaseAdminClient();
  await seedDatabaseIfEmpty(supabase);
  return supabase;
}

async function seedDatabaseIfEmpty(supabase: SupabaseClient) {
  const { count, error } = await supabase.from("automations").select("id", { count: "exact", head: true });
  assertNoError(error);
  if ((count ?? 0) > 0) return;

  const now = Date.now();
  const { error: insertError } = await supabase.from("automations").insert(
    seedAutomations.map((automation, index) => ({
      sort_order: index + 1,
      draft_slug: automation.slug,
      published_slug: automation.slug,
      draft_json: automation,
      published_json: automation,
      created_at: now,
      updated_at: now,
      published_at: now,
      created_by: "seed",
      updated_by: "seed",
      published_by: "seed",
    })),
  );
  assertNoError(insertError);
}

async function getRecordById(supabase: SupabaseClient, id: number) {
  const { data, error } = await supabase.from("automations").select("*").eq("id", id).maybeSingle();
  assertNoError(error);
  if (!data) throw new Error("Automation not found.");
  return rowToRecord(data as AutomationRow);
}

function rowToRecord(row: AutomationRow): AutomationRecord {
  return {
    id: row.id,
    sortOrder: row.sort_order,
    draft: parseAutomationJson(row.draft_json),
    published: row.published_json ? parseAutomationJson(row.published_json) : null,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    publishedBy: row.published_by,
  };
}

function parseAutomationJson(value: AutomationContent | string): AutomationContent {
  return typeof value === "string" ? (JSON.parse(value) as AutomationContent) : value;
}

function seedRecord(content: AutomationContent, order: number): AutomationRecord {
  return {
    id: content.id,
    sortOrder: order,
    draft: content,
    published: content,
    archivedAt: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    publishedAt: Date.now(),
    createdBy: "seed",
    updatedBy: "seed",
    publishedBy: "seed",
  };
}

function normalizeAutomation(input: AutomationContent): AutomationContent {
  const name = input.name.trim();
  return {
    ...input,
    name,
    short: input.short.trim(),
    slug: slugify(input.slug || name),
    category: input.category.trim() || "Lead flow",
    fit: input.fit.trim(),
    threshold: input.threshold.trim(),
    metric: input.metric.trim(),
    seoTitle: input.seoTitle.trim(),
    metaDescription: input.metaDescription.trim(),
    answerSummary: input.answerSummary.trim(),
    setupCostMin: Number(input.setupCostMin),
    setupCostMax: Number(input.setupCostMax),
    monthlyCostMin: Number(input.monthlyCostMin),
    monthlyCostMax: Number(input.monthlyCostMax),
    implementationDaysMin: Number(input.implementationDaysMin),
    implementationDaysMax: Number(input.implementationDaysMax),
    details: input.details.map((value) => value.trim()).filter(Boolean),
    steps: input.steps.map((value) => value.trim()).filter(Boolean),
    tools: input.tools.map((value) => value.trim()).filter(Boolean),
    faqs: input.faqs
      .map((faq) => ({ question: faq.question.trim(), answer: faq.answer.trim() }))
      .filter((faq) => faq.question && faq.answer),
    visible: Boolean(input.visible),
  };
}

function validateForPublish(draft: AutomationContent) {
  const errors: string[] = [];
  if (!draft.name.trim()) errors.push("Heading is required.");
  if (!draft.short.trim()) errors.push("Subtitle is required.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) errors.push("Slug must contain lowercase letters, numbers and hyphens only.");
  if (draft.setupCostMin < 0 || draft.setupCostMax < draft.setupCostMin) errors.push("Setup cost range is invalid.");
  if (draft.monthlyCostMin < 0 || draft.monthlyCostMax < draft.monthlyCostMin) errors.push("Monthly running cost range is invalid.");
  if (draft.implementationDaysMin < 1 || draft.implementationDaysMax < draft.implementationDaysMin) errors.push("Implementation time range is invalid.");
  if (!draft.details.length) errors.push("The automation details are required.");
  if (!draft.steps.length) errors.push("Workflow steps are required.");
  if (!draft.tools.length) errors.push("Supported tools are required.");
  if (!draft.fit.trim()) errors.push("Best fit is required.");
  if (!draft.threshold.trim()) errors.push("Check first guidance is required.");
  if (!draft.metric.trim()) errors.push("Primary success metric is required.");
  if (!draft.seoTitle.trim() || !draft.metaDescription.trim() || !draft.answerSummary.trim()) errors.push("SEO title, meta description and answer summary are required.");
  return errors;
}

async function assertDraftSlugAvailable(supabase: SupabaseClient, slug: string, id: number) {
  const { data, error } = await supabase.from("automations").select("id").eq("draft_slug", slug).neq("id", id).maybeSingle();
  assertNoError(error);
  if (data) throw new Error("Another draft already uses this slug.");
}

async function assertPublishedSlugAvailable(supabase: SupabaseClient, slug: string, id: number) {
  const { data, error } = await supabase.from("automations").select("id").eq("published_slug", slug).neq("id", id).maybeSingle();
  assertNoError(error);
  if (data) throw new Error("Another published automation already uses this slug.");
}

async function uniqueSlug(supabase: SupabaseClient, requestedSlug: string) {
  const base = slugify(requestedSlug) || "automation";
  let candidate = base;
  let suffix = 2;
  while (await slugExists(supabase, candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

async function slugExists(supabase: SupabaseClient, slug: string) {
  const { data, error } = await supabase.from("automations").select("id").eq("draft_slug", slug).maybeSingle();
  assertNoError(error);
  return Boolean(data);
}

function assertNoError(error: unknown) {
  if (!error) return;
  if (typeof error === "object" && "message" in error && typeof error.message === "string") {
    throw new Error(error.message);
  }
  throw new Error("Supabase request failed.");
}
