import { HomePageClient } from "@/components/HomePageClient";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { getPublishedAutomations } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const automations = await getPublishedAutomations();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GTM Flows",
      url: CANONICAL_ORIGIN,
      description: "GTM Flows builds fixed-scope GTM automations for B2B sales and revenue teams.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "GTM Flows",
      url: CANONICAL_ORIGIN,
      potentialAction: {
        "@type": "SearchAction",
        target: `${CANONICAL_ORIGIN}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient automations={automations} />
    </>
  );
}
