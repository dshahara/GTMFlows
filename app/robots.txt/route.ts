import { CANONICAL_ORIGIN } from "@/lib/catalogue";

export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /api/

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`,
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
