import { MarketingHomePage } from "@/components/MarketingHomePage";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "GTM Flows",
      url: CANONICAL_ORIGIN,
      description: "GTM Flows builds automated revenue systems using data enrichment, buying signals, AI research and workflow automation.",
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
      <MarketingHomePage />
    </>
  );
}
