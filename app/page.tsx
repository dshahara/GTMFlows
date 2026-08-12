import { MarketingHomePage } from "@/components/MarketingHomePage";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { localBusinessJsonLd, organizationJsonLd } from "@/lib/seo";

export default function Home() {
  const jsonLd = [
    organizationJsonLd,
    localBusinessJsonLd,
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
      <MarketingHomePage />
    </>
  );
}
