export type AutomationTableRow = {
  id: number;
  sort_order: number;
  draft_slug: string;
  published_slug: string | null;
  draft_json: unknown;
  published_json: unknown | null;
  archived_at: number | null;
  created_at: number;
  updated_at: number;
  published_at: number | null;
  created_by: string | null;
  updated_by: string | null;
  published_by: string | null;
};

export type AutomationSlugRedirectTableRow = {
  id: number;
  automation_id: number;
  from_slug: string;
  to_slug: string;
  created_at: number;
};
