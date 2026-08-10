import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function text(path) {
  return readFile(new URL(path, root), "utf8");
}

test("defines the database-backed catalogue and seeds all 10 automations", async () => {
  const [catalogue, schema, store, migration] = await Promise.all([
    text("lib/catalogue.ts"),
    text("db/schema.ts"),
    text("lib/catalogue-store.ts"),
    text("drizzle/0000_dry_epoch.sql"),
  ]);

  assert.match(schema, /sqliteTable\(\s*"automations"/);
  assert.match(schema, /sqliteTable\(\s*"automation_slug_redirects"/);
  assert.match(store, /published_json/);
  assert.match(store, /draft_json/);
  assert.match(migration, /CREATE TABLE `automations`/);
  assert.equal((catalogue.match(/slug: "/g) ?? []).length, 10);
  assert.match(catalogue, /Lead Source & CRM Sync/);
  assert.match(catalogue, /Captures source and campaign information/);
});

test("keeps admin access behind ChatGPT sign-in and email allowlist", async () => {
  const [adminPage, apiRoute, catalogue] = await Promise.all([
    text("app/admin/page.tsx"),
    text("app/api/admin/automations/route.ts"),
    text("lib/catalogue.ts"),
  ]);

  assert.match(adminPage, /requireChatGPTUser\("\/admin"\)/);
  assert.match(apiRoute, /getChatGPTUser/);
  assert.match(apiRoute, /isAdminEmail/);
  assert.match(apiRoute, /status: 401/);
  assert.match(apiRoute, /status: 403/);
  assert.match(catalogue, /deepanshu06@gmail\.com/);
  assert.match(catalogue, /amrish\.connect@gmail\.com/);
});

test("uses a single customer-facing card action that opens the detail page", async () => {
  const homepage = await text("components/HomePageClient.tsx");

  assert.match(homepage, /View details/);
  assert.match(homepage, /href=\{`\/automations\/\$\{item\.slug\}`\}/);
  assert.doesNotMatch(homepage, /Quick view/);
  assert.doesNotMatch(homepage, /SEO page/);
  assert.doesNotMatch(homepage, /setSelected/);
  assert.doesNotMatch(homepage, /modal-backdrop/);
});

test("keeps public navigation customer-facing and defines a favicon", async () => {
  const [homepage, detailPage, footer, layout, favicon] = await Promise.all([
    text("components/HomePageClient.tsx"),
    text("app/automations/[slug]/page.tsx"),
    text("components/SiteFooter.tsx"),
    text("app/layout.tsx"),
    text("public/favicon.svg"),
  ]);

  assert.match(footer, /GTM automations for B2B sales teams\./);
  assert.match(footer, /HSR Layout, Bengaluru/);
  assert.match(footer, /linkedin\.com\/company\/gtmflows/);
  assert.match(footer, /\/api\/contact/);
  assert.doesNotMatch(homepage, /Fixed-price GTM automations for B2B sales teams\./);
  assert.doesNotMatch(homepage, /href="\/admin">Admin/);
  assert.doesNotMatch(detailPage, /href="\/admin">Admin/);
  assert.match(layout, /favicon\.svg/);
  assert.match(favicon, /<svg/);
  assert.match(favicon, /#d9ff57/);
});

test("accepts contact inquiries through a Slack-ready endpoint", async () => {
  const [contactRoute, envExample] = await Promise.all([
    text("app/api/contact/route.ts"),
    text(".env.example"),
  ]);

  assert.match(contactRoute, /SLACK_WEBHOOK_URL/);
  assert.match(contactRoute, /fetch\(webhookUrl/);
  assert.match(contactRoute, /New GTM Flows inquiry/);
  assert.match(contactRoute, /hello@gtmflows\.co/);
  assert.match(envExample, /SLACK_WEBHOOK_URL=/);
});

test("publishes the current editor draft and exposes a protected draft preview", async () => {
  const [dashboard, apiRoute, previewPage] = await Promise.all([
    text("components/AdminDashboard.tsx"),
    text("app/api/admin/automations/route.ts"),
    text("app/admin/preview/[id]/page.tsx"),
  ]);

  assert.match(dashboard, /Publish draft/);
  assert.match(dashboard, /draft: selected/);
  assert.match(dashboard, /Preview draft page/);
  assert.match(dashboard, /Open published/);
  assert.doesNotMatch(dashboard, /Preview live/);
  assert.match(apiRoute, /payload\.draft/);
  assert.match(apiRoute, /updateAutomationDraft/);
  assert.match(previewPage, /requireChatGPTUser\("\/admin"\)/);
  assert.match(previewPage, /getCatalogueRecord/);
  assert.match(previewPage, /DIRECT ANSWER PREVIEW/);
});

test("adds SEO, AEO and crawl-control routes", async () => {
  const [detailPage, sitemap, robots, llms, layout] = await Promise.all([
    text("app/automations/[slug]/page.tsx"),
    text("app/sitemap.xml/route.ts"),
    text("app/robots.txt/route.ts"),
    text("app/llms.txt/route.ts"),
    text("app/layout.tsx"),
  ]);

  assert.match(detailPage, /FAQPage/);
  assert.match(detailPage, /BreadcrumbList/);
  assert.match(detailPage, /"@type": "Service"/);
  assert.match(detailPage, /permanentRedirect/);
  assert.match(sitemap, /getPublishedAutomations/);
  assert.match(robots, /Disallow: \/admin/);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(llms, /getPublishedAutomations/);
  assert.match(layout, /CANONICAL_ORIGIN/);
  assert.match(await text("lib/catalogue.ts"), /https:\/\/gtmflows\.co/);
});

test("ships deployable build artifacts with hosting metadata and migrations", async () => {
  const [server, hosting, migration] = await Promise.all([
    text("dist/server/index.js"),
    text("dist/.openai/hosting.json"),
    text("dist/.openai/drizzle/0000_dry_epoch.sql"),
  ]);

  assert.match(server, /vinext/);
  assert.match(hosting, /"d1": "DB"/);
  assert.match(migration, /CREATE TABLE `automations`/);
});
