CREATE TABLE `automation_slug_redirects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`automation_id` integer NOT NULL,
	`from_slug` text NOT NULL,
	`to_slug` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_automation_redirects_from_slug` ON `automation_slug_redirects` (`from_slug`);--> statement-breakpoint
CREATE INDEX `idx_automation_redirects_automation_id` ON `automation_slug_redirects` (`automation_id`);--> statement-breakpoint
CREATE TABLE `automations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sort_order` integer NOT NULL,
	`draft_slug` text NOT NULL,
	`published_slug` text,
	`draft_json` text NOT NULL,
	`published_json` text,
	`archived_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`published_at` integer,
	`created_by` text,
	`updated_by` text,
	`published_by` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_automations_draft_slug` ON `automations` (`draft_slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_automations_published_slug` ON `automations` (`published_slug`);--> statement-breakpoint
CREATE INDEX `idx_automations_sort_order` ON `automations` (`sort_order`);--> statement-breakpoint
CREATE INDEX `idx_automations_archived_at` ON `automations` (`archived_at`);