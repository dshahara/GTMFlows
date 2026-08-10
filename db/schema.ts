// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
export {};
import { integer, sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";

export const automations = sqliteTable(
  "automations",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    sortOrder: integer("sort_order").notNull(),
    draftSlug: text("draft_slug").notNull(),
    publishedSlug: text("published_slug"),
    draftJson: text("draft_json").notNull(),
    publishedJson: text("published_json"),
    archivedAt: integer("archived_at"),
    createdAt: integer("created_at").notNull(),
    updatedAt: integer("updated_at").notNull(),
    publishedAt: integer("published_at"),
    createdBy: text("created_by"),
    updatedBy: text("updated_by"),
    publishedBy: text("published_by"),
  },
  (table) => [
    uniqueIndex("idx_automations_draft_slug").on(table.draftSlug),
    uniqueIndex("idx_automations_published_slug").on(table.publishedSlug),
    index("idx_automations_sort_order").on(table.sortOrder),
    index("idx_automations_archived_at").on(table.archivedAt),
  ],
);

export const automationSlugRedirects = sqliteTable(
  "automation_slug_redirects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    automationId: integer("automation_id").notNull(),
    fromSlug: text("from_slug").notNull(),
    toSlug: text("to_slug").notNull(),
    createdAt: integer("created_at").notNull(),
  },
  (table) => [
    uniqueIndex("idx_automation_redirects_from_slug").on(table.fromSlug),
    index("idx_automation_redirects_automation_id").on(table.automationId),
  ],
);
