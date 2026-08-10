"use client";

import { useMemo, useState, useTransition } from "react";
import type { AutomationContent, AutomationRecord } from "@/lib/catalogue";
import { accentOptions, categories, complexityOptions, formatCostRange, formatDayRange, slugify } from "@/lib/catalogue";

type AdminDashboardProps = {
  initialRecords: AutomationRecord[];
  userEmail: string;
};

type StatusFilter = "all" | "published" | "draft" | "unpublished" | "archived";

export function AdminDashboard({ initialRecords, userEmail }: AdminDashboardProps) {
  const [records, setRecords] = useState(initialRecords);
  const [selectedId, setSelectedId] = useState(initialRecords[0]?.id ?? 0);
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const selectedRecord = records.find((record) => record.id === selectedId) ?? records[0] ?? null;
  const selected = selectedRecord?.draft ?? null;
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return records.filter((record) => {
      const item = record.draft;
      const matchesCategory = category === "All" || item.category === category;
      const matchesStatus =
        status === "all" ||
        (status === "published" && Boolean(record.published) && !hasDraftChanges(record)) ||
        (status === "draft" && hasDraftChanges(record)) ||
        (status === "unpublished" && !record.published && !record.archivedAt) ||
        (status === "archived" && Boolean(record.archivedAt));
      const matchesQuery = !needle || `${item.name} ${item.short} ${item.slug}`.toLowerCase().includes(needle);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [records, category, status, query]);

  function mutate(action: Record<string, unknown>, success: string) {
    setMessage("");
    startTransition(async () => {
      const response = await fetch("/api/admin/automations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(action),
      });
      const body = (await response.json()) as { records?: AutomationRecord[]; error?: string };
      if (!response.ok || !body.records) {
        setMessage(body.error || "Something went wrong.");
        return;
      }
      setRecords(body.records);
      setMessage(success);
      if (action.action === "create") setSelectedId(body.records.at(-1)?.id ?? selectedId);
    });
  }

  function updateDraft(patch: Partial<AutomationContent>) {
    if (!selectedRecord || !selected) return;
    const next = { ...selected, ...patch };
    setRecords((current) => current.map((record) => (record.id === selectedRecord.id ? { ...record, draft: next, updatedAt: Date.now() } : record)));
  }

  function saveDraft() {
    if (!selectedRecord || !selected) return;
    mutate({ action: "update", id: selectedRecord.id, draft: selected }, "Draft saved.");
  }

  function move(recordId: number, direction: -1 | 1) {
    const ordered = [...records].sort((a, b) => a.sortOrder - b.sortOrder);
    const index = ordered.findIndex((record) => record.id === recordId);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
    [ordered[index], ordered[nextIndex]] = [ordered[nextIndex], ordered[index]];
    mutate({ action: "reorder", ids: ordered.map((record) => record.id) }, "Catalogue order updated.");
  }

  if (!selectedRecord || !selected) {
    return (
      <main className="admin-shell">
        <div className="admin-empty">
          <h1>Catalogue admin</h1>
          <button className="admin-button primary" onClick={() => mutate({ action: "create" }, "Automation created.")}>Create first automation</button>
        </div>
      </main>
    );
  }

  const draftCost = `${formatCostRange(selected.setupCostMin, selected.setupCostMax)} setup · ${formatCostRange(selected.monthlyCostMin, selected.monthlyCostMax)}/month`;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a className="brand" href="/" aria-label="GTM Flows home"><span className="brand-mark">G/F</span><span>GTM/FLOWS</span></a>
        <div className="admin-user"><span>Signed in</span><strong>{userEmail}</strong></div>
        <button className="admin-button primary" onClick={() => mutate({ action: "create" }, "Automation created.")}>+ New automation</button>
        <div className="admin-filters">
          <input aria-label="Search automations" placeholder="Search catalogue" value={query} onChange={(event) => setQuery(event.target.value)} />
          <select aria-label="Filter by category" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
            <option value="all">All status</option>
            <option value="published">Published</option>
            <option value="draft">Draft changes</option>
            <option value="unpublished">Unpublished</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="admin-list">
          {filtered.map((record) => (
            <button className={record.id === selectedRecord.id ? "active" : ""} key={record.id} onClick={() => setSelectedId(record.id)}>
              <span>{String(record.sortOrder).padStart(2, "0")} · {record.draft.category}</span>
              <strong>{record.draft.name}</strong>
              <small>{statusLabel(record)}</small>
            </button>
          ))}
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div>
            <span>Catalogue dashboard</span>
            <h1>{selected.name}</h1>
          </div>
          <div className="admin-actions">
            <button className="admin-button" disabled={isPending} onClick={saveDraft}>Save draft</button>
            <button className="admin-button primary" disabled={isPending} onClick={() => mutate({ action: "publish", id: selectedRecord.id }, "Published to the website.")}>Publish</button>
            <a className="admin-button" href={`/automations/${selected.slug}`} target="_blank">Preview live</a>
          </div>
        </header>

        {message && <div className={message.includes("wrong") || message.includes("required") || message.includes("invalid") || message.includes("denied") ? "admin-message error" : "admin-message"}>{message}</div>}

        <div className="admin-grid">
          <section className="editor-panel">
            <div className="panel-heading"><span>Core fields</span><strong>Draft content</strong></div>
            <label>Heading<input value={selected.name} onChange={(event) => updateDraft({ name: event.target.value })} /></label>
            <label>Subtitle<textarea value={selected.short} onChange={(event) => updateDraft({ short: event.target.value })} /></label>
            <div className="field-row">
              <label>Slug<input value={selected.slug} onChange={(event) => updateDraft({ slug: slugify(event.target.value) })} /></label>
              <label>Category<select value={selected.category} onChange={(event) => updateDraft({ category: event.target.value })}>{categories.filter((item) => item !== "All").map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <div className="field-row">
              <label>Accent<select value={selected.accent} onChange={(event) => updateDraft({ accent: event.target.value as AutomationContent["accent"] })}>{accentOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label>Complexity<select value={selected.complexity} onChange={(event) => updateDraft({ complexity: event.target.value as AutomationContent["complexity"] })}>{complexityOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <div className="field-row thirds">
              <NumberField label="Setup min" value={selected.setupCostMin} onChange={(value) => updateDraft({ setupCostMin: value })} />
              <NumberField label="Setup max" value={selected.setupCostMax} onChange={(value) => updateDraft({ setupCostMax: value })} />
              <NumberField label="Monthly min" value={selected.monthlyCostMin} onChange={(value) => updateDraft({ monthlyCostMin: value })} />
              <NumberField label="Monthly max" value={selected.monthlyCostMax} onChange={(value) => updateDraft({ monthlyCostMax: value })} />
              <NumberField label="Days min" value={selected.implementationDaysMin} onChange={(value) => updateDraft({ implementationDaysMin: value })} />
              <NumberField label="Days max" value={selected.implementationDaysMax} onChange={(value) => updateDraft({ implementationDaysMax: value })} />
            </div>
            <label>Primary success metric<input value={selected.metric} onChange={(event) => updateDraft({ metric: event.target.value })} /></label>
            <label>Best fit<textarea value={selected.fit} onChange={(event) => updateDraft({ fit: event.target.value })} /></label>
            <label>Check first<textarea value={selected.threshold} onChange={(event) => updateDraft({ threshold: event.target.value })} /></label>
          </section>

          <section className="editor-panel">
            <div className="panel-heading"><span>Operational copy</span><strong>Popup and page details</strong></div>
            <TextareaList label="The automation" value={selected.details} onChange={(details) => updateDraft({ details })} />
            <TextareaList label="Workflow steps" value={selected.steps} onChange={(steps) => updateDraft({ steps })} />
            <TextareaList label="Supported tools" value={selected.tools} onChange={(tools) => updateDraft({ tools })} />
            <label>SEO title<input value={selected.seoTitle} onChange={(event) => updateDraft({ seoTitle: event.target.value })} /></label>
            <label>Meta description<textarea value={selected.metaDescription} onChange={(event) => updateDraft({ metaDescription: event.target.value })} /></label>
            <label>Search-summary answer<textarea value={selected.answerSummary} onChange={(event) => updateDraft({ answerSummary: event.target.value })} /></label>
            <FaqEditor value={selected.faqs} onChange={(faqs) => updateDraft({ faqs })} />
          </section>

          <section className="preview-panel">
            <div className={`automation-card accent-${selected.accent}`}>
              <div className="card-top"><span className="card-index">{String(selectedRecord.sortOrder).padStart(2, "0")}</span><span className="category-tag">{selected.category}</span></div>
              <h3>{selected.name}</h3>
              <p>{selected.short}</p>
              <dl className="card-stats">
                <div><dt>Setup</dt><dd>{formatCostRange(selected.setupCostMin, selected.setupCostMax)}</dd></div>
                <div><dt>Runs at</dt><dd>{formatCostRange(selected.monthlyCostMin, selected.monthlyCostMax)}<small>/month</small></dd></div>
                <div><dt>Live in</dt><dd>{formatDayRange(selected.implementationDaysMin, selected.implementationDaysMax)}</dd></div>
                <div><dt>Complexity</dt><dd><span className={`complexity ${selected.complexity.toLowerCase()}`}>{selected.complexity}</span></dd></div>
              </dl>
              <div className="fit-note"><span>Best fit</span>{selected.fit}</div>
            </div>
            <div className="admin-meta">
              <div><span>Draft cost</span><strong>{draftCost}</strong></div>
              <div><span>Draft slug</span><strong>/automations/{selected.slug}</strong></div>
              <div><span>Published</span><strong>{selectedRecord.published ? "Yes" : "No"}</strong></div>
              <div><span>Last edited</span><strong>{formatDate(selectedRecord.updatedAt)} by {selectedRecord.updatedBy ?? "unknown"}</strong></div>
              <div><span>Last published</span><strong>{selectedRecord.publishedAt ? `${formatDate(selectedRecord.publishedAt)} by ${selectedRecord.publishedBy ?? "unknown"}` : "Not published"}</strong></div>
            </div>
            <div className="admin-actions vertical">
              <button className="admin-button" disabled={isPending} onClick={() => mutate({ action: "duplicate", id: selectedRecord.id }, "Automation duplicated.")}>Duplicate</button>
              <button className="admin-button" disabled={isPending} onClick={() => mutate({ action: "unpublish", id: selectedRecord.id }, "Automation unpublished.")}>Unpublish</button>
              <button className="admin-button" disabled={isPending} onClick={() => move(selectedRecord.id, -1)}>Move up</button>
              <button className="admin-button" disabled={isPending} onClick={() => move(selectedRecord.id, 1)}>Move down</button>
              <button className="admin-button danger" disabled={isPending} onClick={() => mutate({ action: selectedRecord.archivedAt ? "restore" : "archive", id: selectedRecord.id }, selectedRecord.archivedAt ? "Automation restored." : "Automation archived.")}>
                {selectedRecord.archivedAt ? "Restore" : "Archive"}
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label>{label}<input type="number" min="0" value={value} onChange={(event) => onChange(Number(event.target.value))} /></label>;
}

function TextareaList({ label, value, onChange }: { label: string; value: string[]; onChange: (value: string[]) => void }) {
  return (
    <label>{label}<textarea value={value.join("\n")} onChange={(event) => onChange(lines(event.target.value))} /></label>
  );
}

function FaqEditor({ value, onChange }: { value: AutomationContent["faqs"]; onChange: (value: AutomationContent["faqs"]) => void }) {
  const text = value.map((faq) => `${faq.question}\n${faq.answer}`).join("\n---\n");
  return (
    <label>FAQs <small>Use question, answer, then --- between FAQs.</small>
      <textarea value={text} onChange={(event) => onChange(parseFaqs(event.target.value))} />
    </label>
  );
}

function lines(value: string) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}

function parseFaqs(value: string) {
  return value
    .split("\n---\n")
    .map((block) => {
      const [question, ...answer] = block.split("\n");
      return { question: question?.trim() ?? "", answer: answer.join("\n").trim() };
    })
    .filter((faq) => faq.question && faq.answer);
}

function hasDraftChanges(record: AutomationRecord) {
  return JSON.stringify(record.draft) !== JSON.stringify(record.published);
}

function statusLabel(record: AutomationRecord) {
  if (record.archivedAt) return "Archived";
  if (!record.published) return "Unpublished draft";
  if (hasDraftChanges(record)) return "Draft changes";
  return "Published";
}

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(timestamp));
}
