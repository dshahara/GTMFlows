import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { AUTOMATIONS_BASE_PATH } from "@/lib/brand";
import { getPublishedAutomations } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const automations = await getPublishedAutomations();
  const now = new Date().toISOString();
  const urls = [
    { loc: CANONICAL_ORIGIN, lastmod: now, priority: "1.0" },
    { loc: `${CANONICAL_ORIGIN}/catalogue`, lastmod: now, priority: "0.9" },
    { loc: `${CANONICAL_ORIGIN}/how-we-build`, lastmod: now, priority: "0.8" },
    { loc: `${CANONICAL_ORIGIN}/faq`, lastmod: now, priority: "0.7" },
    { loc: `${CANONICAL_ORIGIN}/contact`, lastmod: now, priority: "0.7" },
    ...automations.map((automation) => ({
      loc: `${CANONICAL_ORIGIN}${AUTOMATIONS_BASE_PATH}/${automation.slug}`,
      lastmod: now,
      priority: "0.8",
    })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(url.loc)}</loc><lastmod>${url.lastmod}</lastmod><priority>${url.priority}</priority></url>`).join("\n")}
</urlset>`;
  return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
}

function escapeXml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
