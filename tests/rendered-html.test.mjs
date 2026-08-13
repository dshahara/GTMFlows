import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function text(path) {
  return readFile(new URL(path, root), "utf8");
}

test("defines the Supabase-backed catalogue and seeds all 10 automations", async () => {
  const [catalogue, schema, store, migration] = await Promise.all([
    text("lib/catalogue.ts"),
    text("db/schema.ts"),
    text("lib/catalogue-store.ts"),
    text("supabase/migrations/0001_catalogue.sql"),
  ]);

  assert.match(schema, /AutomationTableRow/);
  assert.match(migration, /create table if not exists public\.automations/);
  assert.match(migration, /jsonb not null/);
  assert.match(store, /createSupabaseAdminClient/);
  assert.match(store, /published_json/);
  assert.match(store, /draft_json/);
  assert.match(store, /seedDatabaseIfEmpty/);
  assert.equal((catalogue.match(/slug: "/g) ?? []).length, 10);
  assert.match(catalogue, /Lead Source & CRM Sync/);
  assert.match(catalogue, /Captures source and campaign information/);
});

test("keeps admin access behind Supabase auth and email allowlist", async () => {
  const [adminPage, apiRoute, loginPage, loginForm, proxy, catalogue] = await Promise.all([
    text("app/admin/page.tsx"),
    text("app/api/admin/automations/route.ts"),
    text("app/login/page.tsx"),
    text("components/auth/LoginForm.tsx"),
    text("proxy.ts"),
    text("lib/catalogue.ts"),
  ]);

  assert.match(adminPage, /requireAdminUser\("\/admin"\)/);
  assert.match(apiRoute, /getAuthenticatedUser/);
  assert.match(apiRoute, /isAdminEmail/);
  assert.match(apiRoute, /status: 401/);
  assert.match(apiRoute, /status: 403/);
  assert.match(loginPage, /Supabase Auth is not configured yet/);
  assert.match(loginForm, /signInWithOtp/);
  assert.match(proxy, /createServerClient/);
  assert.match(catalogue, /deepanshu06@gmail\.com/);
  assert.match(catalogue, /amrish\.connect@gmail\.com/);
});

test("uses a single customer-facing card action that opens the detail page", async () => {
  const homepage = await text("components/HomePageClient.tsx");

  assert.match(homepage, /View details/);
  assert.match(homepage, /AUTOMATIONS_BASE_PATH/);
  assert.match(homepage, /href=\{`\$\{AUTOMATIONS_BASE_PATH\}\/\$\{item\.slug\}`\}/);
  assert.doesNotMatch(homepage, /Quick view/);
  assert.doesNotMatch(homepage, /SEO page/);
  assert.doesNotMatch(homepage, /setSelected/);
  assert.doesNotMatch(homepage, /modal-backdrop/);
});

test("keeps public navigation customer-facing and defines a favicon", async () => {
  const [homepage, catalogue, detailPage, nav, footer, contactForm, layout, favicon, brand] = await Promise.all([
    text("components/MarketingHomePage.tsx"),
    text("components/HomePageClient.tsx"),
    text("app/automations/[slug]/page.tsx"),
    text("components/SiteNav.tsx"),
    text("components/SiteFooter.tsx"),
    text("components/ContactForm.tsx"),
    text("app/layout.tsx"),
    text("public/favicon.svg"),
    text("lib/brand.ts"),
  ]);

  assert.match(footer, /Automated revenue systems/);
  assert.match(footer, /HSR Layout, Bengaluru/);
  assert.match(footer, /linkedin\.com\/company\/gtm-flows/);
  assert.match(footer, /contact@gtmflows\.co/);
  assert.match(contactForm, /\/api\/contact/);
  assert.match(contactForm, /What should improve/);
  assert.doesNotMatch(footer, /Slack workspace/);
  assert.doesNotMatch(catalogue, /Fixed-price GTM automations for B2B sales teams\./);
  assert.doesNotMatch(nav, /href="\/admin">Admin/);
  assert.doesNotMatch(nav, /href="\/revenue-systems"/);
  assert.doesNotMatch(footer, /llms\.txt/);
  assert.doesNotMatch(homepage, /href="\/admin">Admin/);
  assert.doesNotMatch(detailPage, /href="\/admin">Admin/);
  assert.match(layout, /favicon\.svg/);
  assert.match(layout, /favicon\.ico/);
  assert.match(layout, /favicon-32\.png/);
  assert.match(layout, /favicon-192\.png/);
  assert.match(favicon, /<svg/);
  assert.match(favicon, /data:image\/png;base64/);
  assert.match(brand, /BRAND_WORDMARK = "GTM Flows"/);
  assert.match(brand, /BRAND_LOGO_SRC = "\/gf-logo\.png"/);
  assert.doesNotMatch(nav, /GTM\/FLOWS/);
  assert.doesNotMatch(footer, /GTM\/FLOWS/);
  assert.match(nav, /BRAND_LOGO_SRC/);
  assert.match(detailPage, /<SiteNav \/>/);
  assert.match(footer, /BRAND_LOGO_SRC/);
});

test("ships the revenue-systems positioning as concise, connected website pages", async () => {
  const [homepage, marketingData, systemsPage, privateSystemsPage, buildPage, privateBuildPage, faqPage, cataloguePage, sitemap, llms, robots] = await Promise.all([
    text("components/MarketingHomePage.tsx"),
    text("lib/marketing.ts"),
    text("app/revenue-systems/page.tsx"),
    text("app/private/revenue-systems/page.tsx"),
    text("app/how-we-build/page.tsx"),
    text("app/private/how-we-build/page.tsx"),
    text("app/faq/page.tsx"),
    text("app/catalogue/page.tsx"),
    text("app/sitemap.xml/route.ts"),
    text("app/llms.txt/route.ts"),
    text("app/robots.txt/route.ts"),
  ]);

  assert.match(homepage, /Automated revenue systems/);
  assert.match(homepage, /Revenue systems/);
  assert.match(marketingData, /Signal-to-Sequence Engine/);
  assert.match(marketingData, /Renewal and Expansion Intelligence/);
  assert.match(homepage, /Connected revenue system/);
  assert.match(homepage, /From signal to action/);
  assert.match(systemsPage, /redirect\("\/private\/revenue-systems"\)/);
  assert.match(privateSystemsPage, /RevenueSystemsPageContent/);
  assert.doesNotMatch(buildPage, /Audit the CRM/);
  assert.match(privateBuildPage, /Infrastructure and data readiness/);
  assert.match(faqPage, /FAQPage/);
  assert.match(cataloguePage, /getPublishedAutomations/);
  assert.doesNotMatch(sitemap, /\/revenue-systems/);
  assert.match(robots, /Disallow: \/private/);
  assert.match(sitemap, /\/catalogue/);
  assert.match(llms, /automated revenue systems/);
  assert.doesNotMatch(llms, /Revenue systems:/);
});

test("ships the uploaded logo and favicon assets without public brand-detail downloads", async () => {
  const assets = [
    "public/gf-logo.svg",
    "public/gf-logo.png",
    "public/favicon.png",
    "public/favicon.ico",
    "public/favicon-192.png",
    "public/favicon-32.png",
  ];

  for (const asset of assets) {
    const info = await stat(new URL(asset, root));
    assert.ok(info.size > 0, `${asset} should not be empty`);
  }

  const oldPublicBrandAssets = [
    "public/brand/gtm-flows-logo.svg",
    "public/brand/gtm-flows-logo.png",
    "public/brand/gtm-flows-mark.svg",
    "public/brand/gtm-flows-mark.png",
    "public/brand/linkedin-banner.svg",
    "public/brand/linkedin-banner.png",
  ];
  for (const asset of oldPublicBrandAssets) {
    await assert.rejects(stat(new URL(asset, root)));
  }

  const logo = await text("public/gf-logo.svg");
  assert.match(logo, /data:image\/png;base64/);

  const designSystemChrome = await text("Design system/ui_kits/website-v2/Chrome.jsx");
  const designSystemCss = await text("Design system/ui_kits/website-v2/brand.css");
  await stat(new URL("Design system/ui_kits/website-v2/assets/gf-logo.png", root));
  assert.match(designSystemChrome, /assets\/gf-logo\.png/);
  assert.doesNotMatch(designSystemChrome, /GTM\/FLOWS/);
  assert.match(designSystemCss, /object-fit:cover/);
});

test("keeps plural automation URLs canonical and redirects singular URLs", async () => {
  const [brand, singularIndex, singularSlug, detailPage, sitemap, llms, netlifyConfig, migrationPlan] = await Promise.all([
    text("lib/brand.ts"),
    text("app/automation/page.tsx"),
    text("app/automation/[slug]/page.tsx"),
    text("app/automations/[slug]/page.tsx"),
    text("app/sitemap.xml/route.ts"),
    text("app/llms.txt/route.ts"),
    text("netlify.toml"),
    text("docs/netlify-migration.md"),
  ]);

  assert.match(brand, /AUTOMATIONS_BASE_PATH = "\/automations"/);
  assert.match(singularIndex, /permanentRedirect\("\/catalogue"\)/);
  assert.match(singularSlug, /permanentRedirect\(`\$\{AUTOMATIONS_BASE_PATH\}\/\$\{slug\}`\)/);
  assert.match(detailPage, /AUTOMATIONS_BASE_PATH/);
  assert.doesNotMatch(sitemap, /\/automation\//);
  assert.doesNotMatch(llms, /\/automation\//);
  assert.match(netlifyConfig, /\/automation\/:slug/);
  assert.match(migrationPlan, /\/automation\/\[slug\] -> \/automations\/\[slug\]/);
});

test("accepts contact inquiries through a Slack-ready endpoint", async () => {
  const [contactRoute, envExample] = await Promise.all([
    text("app/api/contact/route.ts"),
    text(".env.example"),
  ]);

  assert.match(contactRoute, /SLACK_WEBHOOK_URL/);
  assert.match(contactRoute, /fetch\(webhookUrl/);
  assert.match(contactRoute, /New GTM Flows inquiry/);
  assert.doesNotMatch(contactRoute, /Please email hello@gtmflows\.co/);
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
  assert.match(previewPage, /requireAdminUser\("\/admin"\)/);
  assert.match(previewPage, /getCatalogueRecord/);
  assert.match(previewPage, /DIRECT ANSWER PREVIEW/);
});

test("adds SEO, AEO and crawl-control routes", async () => {
  const [detailPage, cataloguePage, homePage, howWeBuildPage, contactPage, sitemap, robots, llms, layout] = await Promise.all([
    text("app/automations/[slug]/page.tsx"),
    text("app/catalogue/page.tsx"),
    text("components/MarketingHomePage.tsx"),
    text("app/how-we-build/page.tsx"),
    text("app/contact/page.tsx"),
    text("app/sitemap.xml/route.ts"),
    text("app/robots.txt/route.ts"),
    text("app/llms.txt/route.ts"),
    text("app/layout.tsx"),
  ]);

  assert.match(detailPage, /FAQPage/);
  assert.match(detailPage, /BreadcrumbList/);
  assert.match(detailPage, /"@type": "Service"/);
  assert.match(detailPage, /localBusinessJsonLd/);
  assert.match(detailPage, /What does \{automation\.name\} cost in India/);
  assert.match(cataloguePage, /CollectionPage/);
  assert.match(cataloguePage, /FAQPage/);
  assert.doesNotMatch(homePage, /KeyTakeaways|Key Takeaways|source-note/);
  assert.doesNotMatch(detailPage, /KeyTakeaways|Key Takeaways|source-note/);
  assert.match(howWeBuildPage, /How to build revenue automation systems/);
  assert.match(contactPage, /ContactPage/);
  assert.match(detailPage, /permanentRedirect/);
  assert.match(sitemap, /getPublishedAutomations/);
  assert.match(robots, /Disallow: \/admin/);
  assert.match(robots, /Disallow: \/private/);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(llms, /getPublishedAutomations/);
  assert.match(layout, /CANONICAL_ORIGIN/);
  assert.match(await text("lib/catalogue.ts"), /https:\/\/gtmflows\.co/);
});

test("ships Netlify and Supabase deployment metadata", async () => {
  const [packageJson, netlifyConfig, envExample, migration, migrationDocs, credentialDocs] = await Promise.all([
    text("package.json"),
    text("netlify.toml"),
    text(".env.example"),
    text("supabase/migrations/0001_catalogue.sql"),
    text("docs/netlify-migration.md"),
    text("docs/supabase-netlify-credentials.md"),
  ]);

  assert.match(packageJson, /"build": "next build"/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|drizzle-kit/);
  assert.match(netlifyConfig, /publish = "\.next"/);
  assert.match(envExample, /NEXT_PUBLIC_SUPABASE_URL=/);
  assert.match(envExample, /SUPABASE_SECRET_KEY=/);
  assert.match(envExample, /NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=/);
  assert.match(migration, /enable row level security/);
  assert.match(migrationDocs, /Netlify \+ Supabase migration/);
  assert.match(credentialDocs, /Project URL/);
});

test("removes runtime dependencies on Cloudflare D1 and ChatGPT auth", async () => {
  const files = [
    "app/api/contact/route.ts",
    "app/api/admin/automations/route.ts",
    "lib/catalogue-store.ts",
    "lib/private-access.tsx",
    "db/index.ts",
  ];

  for (const file of files) {
    const content = await text(file);
    assert.doesNotMatch(content, /cloudflare:workers/);
    assert.doesNotMatch(content, /ChatGPT|chatGPT|signin-with-chatgpt|oai-authenticated/);
  }
});
