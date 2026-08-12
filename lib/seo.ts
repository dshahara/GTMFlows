import { CANONICAL_ORIGIN } from "@/lib/catalogue";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GTM Flows",
  alternateName: "GTMFlows",
  url: CANONICAL_ORIGIN,
  logo: `${CANONICAL_ORIGIN}/gf-logo.png`,
  sameAs: ["https://www.linkedin.com/company/gtm-flows/"],
  description: "GTM Flows builds automated revenue systems using AI, data enrichment and workflow automation.",
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "GTM Flows",
  url: CANONICAL_ORIGIN,
  image: `${CANONICAL_ORIGIN}/gf-logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  areaServed: "India",
};

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
