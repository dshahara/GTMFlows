import { env } from "cloudflare:workers";
import {
  ADMIN_EMAILS,
  type AutomationContent,
  type AutomationRecord,
  seedAutomations,
  slugify,
  toPublicAutomation,
  type PublicAutomation,
} from "./catalogue";

type D1Row = {
  id: number;
  sort_order: number;
  draft_slug: string;
  published_slug: string | null;
  draft_json: string;
  published_json: string | null;
  archived_at: number | null;
  created_at: number;
  updated_at: number;
  published_at: number | null;
  created_by: string | null;
  updated_by: string | null;
  published_by: string | null;
};

export type SlugLookup =
  | { kind: "automation"; automation: PublicAutomation; record: AutomationRecord }
  | { kind: "redirect"; toSlug: string }
  | { kind: "missing" };

const createAutomationsSql = `CREATE TABLE IF NOT EXISTS automations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sort_order INTEGER NOT NULL,
  draft_slug TEXT NOT NULL,
  published_slug TEXT,
  draft_json TEXT NOT NULL,
  published_json TEXT,
  archived_at INTEGER,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER,
  created_by TEXT,
  updated_by TEXT,
  published_by TEXT
)`;

const createRedirectsSql = `CREATE TABLE IF NOT EXISTS automation_slug_redirects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  automation_id INTEGER NOT NULL,
  from_slug TEXT NOT NULL,
  to_slug TEXT NOT NULL,
  created_at INTEGER NOT NULL
)`;

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));
}

export async function getCatalogueRecords(): Promise<AutomationRecord[]> {
  const db = await prepareDatabase();
  const result = await db
    .prepare("SELECT * FROM automations ORDER BY sort_order ASC, id ASC")
    .all<D1Row>();
  return (result.results ?? []).map(rowToRecord);
}

export async function getCatalogueRecord(id: number): Promise<AutomationRecord | null> {
  const db = await prepareDatabase();
  const row = await db.prepare("SELECT * FROM automations WHERE id = ? LIMIT 1").bind(id).first<D1Row>();
  return row ? rowToRecord(row) : null;
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
    const db = await prepareDatabase();
    const row = await db
      .prepare("SELECT * FROM automations WHERE published_slug = ? AND published_json IS NOT NULL AND archived_at IS NULL LIMIT 1")
      .bind(slug)
      .first<D1Row>();
    if (row) {
      const record = rowToRecord(row);
      return { kind: "automation", record, automation: toPublicAutomation(record.published as AutomationContent, record.sortOrder) };
    }

    const redirect = await db
      .prepare("SELECT to_slug FROM automation_slug_redirects WHERE from_slug = ? LIMIT 1")
      .bind(slug)
      .first<{ to_slug: string }>();
    if (redirect?.to_slug) return { kind: "redirect", toSlug: redirect.to_slug };
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
  const db = await prepareDatabase();
  const now = Date.now();
  const last = await db.prepare("SELECT MAX(sort_order) AS max_order FROM automations").first<{ max_order: number | null }>();
  const nextOrder = (last?.max_order ?? 0) + 1;
  const name = partial?.name?.trim() || "Untitled automation";
  const draft = normalizeAutomation({
    ...seedAutomations[0],
    id: nextOrder,
    name,
    short: partial?.short || "",
    slug: await uniqueSlug(db, partial?.slug || slugify(name) || `automation-${now}`),
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

  await db
    .prepare(
      "INSERT INTO automations (sort_order, draft_slug, draft_json, created_at, updated_at, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(nextOrder, draft.slug, JSON.stringify(draft), now, now, email, email)
    .run();
  return getCatalogueRecords();
}

export async function updateAutomationDraft(id: number, draft: AutomationContent, email: string) {
  const db = await prepareDatabase();
  const normalized = normalizeAutomation(draft);
  await assertDraftSlugAvailable(db, normalized.slug, id);
  await db
    .prepare("UPDATE automations SET draft_slug = ?, draft_json = ?, updated_at = ?, updated_by = ? WHERE id = ?")
    .bind(normalized.slug, JSON.stringify(normalized), Date.now(), email, id)
    .run();
  return getCatalogueRecords();
}

export async function duplicateAutomation(id: number, email: string) {
  const db = await prepareDatabase();
  const source = await getRecordById(db, id);
  const last = await db.prepare("SELECT MAX(sort_order) AS max_order FROM automations").first<{ max_order: number | null }>();
  const nextOrder = (last?.max_order ?? 0) + 1;
  const now = Date.now();
  const draft = normalizeAutomation({
    ...source.draft,
    id: nextOrder,
    name: `${source.draft.name} Copy`,
    slug: await uniqueSlug(db, `${source.draft.slug}-copy`),
  });
  await db
    .prepare(
      "INSERT INTO automations (sort_order, draft_slug, draft_json, created_at, updated_at, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(nextOrder, draft.slug, JSON.stringify(draft), now, now, email, email)
    .run();
  return getCatalogueRecords();
}

export async function publishAutomation(id: number, email: string) {
  const db = await prepareDatabase();
  const record = await getRecordById(db, id);
  const validation = validateForPublish(record.draft);
  if (validation.length) {
    throw new Error(validation.join(" "));
  }

  await assertPublishedSlugAvailable(db, record.draft.slug, id);
  const previousSlug = record.published?.slug;
  const now = Date.now();
  const statements = [
    db
      .prepare(
        "UPDATE automations SET published_slug = ?, published_json = ?, published_at = ?, published_by = ?, updated_at = ?, updated_by = ? WHERE id = ?",
      )
      .bind(record.draft.slug, JSON.stringify(record.draft), now, email, now, email, id),
  ];
  if (previousSlug && previousSlug !== record.draft.slug) {
    statements.push(
      db
        .prepare("INSERT OR REPLACE INTO automation_slug_redirects (automation_id, from_slug, to_slug, created_at) VALUES (?, ?, ?, ?)")
        .bind(id, previousSlug, record.draft.slug, now),
    );
  }
  await db.batch(statements);
  return getCatalogueRecords();
}

export async function unpublishAutomation(id: number, email: string) {
  const db = await prepareDatabase();
  await db
    .prepare("UPDATE automations SET published_slug = NULL, published_json = NULL, updated_at = ?, updated_by = ? WHERE id = ?")
    .bind(Date.now(), email, id)
    .run();
  return getCatalogueRecords();
}

export async function setAutomationArchived(id: number, archived: boolean, email: string) {
  const db = await prepareDatabase();
  await db
    .prepare("UPDATE automations SET archived_at = ?, updated_at = ?, updated_by = ? WHERE id = ?")
    .bind(archived ? Date.now() : null, Date.now(), email, id)
    .run();
  return getCatalogueRecords();
}

export async function reorderAutomations(ids: number[], email: string) {
  const db = await prepareDatabase();
  const now = Date.now();
  await db.batch(
    ids.map((id, index) =>
      db
        .prepare("UPDATE automations SET sort_order = ?, updated_at = ?, updated_by = ? WHERE id = ?")
        .bind(index + 1, now, email, id),
    ),
  );
  return getCatalogueRecords();
}

async function prepareDatabase() {
  const db = env.DB;
  if (!db) throw new Error("D1 database is not available.");

  await db.batch([
    db.prepare(createAutomationsSql),
    db.prepare(createRedirectsSql),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_automations_draft_slug ON automations (draft_slug)"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_automations_published_slug ON automations (published_slug)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_automations_sort_order ON automations (sort_order)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_automations_archived_at ON automations (archived_at)"),
    db.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_automation_redirects_from_slug ON automation_slug_redirects (from_slug)"),
    db.prepare("CREATE INDEX IF NOT EXISTS idx_automation_redirects_automation_id ON automation_slug_redirects (automation_id)"),
  ]);

  const count = await db.prepare("SELECT COUNT(*) AS count FROM automations").first<{ count: number }>();
  if ((count?.count ?? 0) === 0) {
    const now = Date.now();
    await db.batch(
      seedAutomations.map((automation, index) =>
        db
          .prepare(
            "INSERT INTO automations (id, sort_order, draft_slug, published_slug, draft_json, published_json, created_at, updated_at, published_at, created_by, updated_by, published_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          )
          .bind(
            automation.id,
            index + 1,
            automation.slug,
            automation.slug,
            JSON.stringify(automation),
            JSON.stringify(automation),
            now,
            now,
            now,
            "seed",
            "seed",
            "seed",
          ),
      ),
    );
  }

  return db;
}

async function getRecordById(db: D1Database, id: number) {
  const row = await db.prepare("SELECT * FROM automations WHERE id = ? LIMIT 1").bind(id).first<D1Row>();
  if (!row) throw new Error("Automation not found.");
  return rowToRecord(row);
}

function rowToRecord(row: D1Row): AutomationRecord {
  return {
    id: row.id,
    sortOrder: row.sort_order,
    draft: JSON.parse(row.draft_json) as AutomationContent,
    published: row.published_json ? (JSON.parse(row.published_json) as AutomationContent) : null,
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    publishedBy: row.published_by,
  };
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

async function assertDraftSlugAvailable(db: D1Database, slug: string, id: number) {
  const row = await db.prepare("SELECT id FROM automations WHERE draft_slug = ? AND id != ? LIMIT 1").bind(slug, id).first<{ id: number }>();
  if (row) throw new Error("Another draft already uses this slug.");
}

async function assertPublishedSlugAvailable(db: D1Database, slug: string, id: number) {
  const row = await db
    .prepare("SELECT id FROM automations WHERE published_slug = ? AND id != ? LIMIT 1")
    .bind(slug, id)
    .first<{ id: number }>();
  if (row) throw new Error("Another published automation already uses this slug.");
}

async function uniqueSlug(db: D1Database, requestedSlug: string) {
  const base = slugify(requestedSlug) || "automation";
  let candidate = base;
  let suffix = 2;
  while (await db.prepare("SELECT id FROM automations WHERE draft_slug = ? LIMIT 1").bind(candidate).first()) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}
