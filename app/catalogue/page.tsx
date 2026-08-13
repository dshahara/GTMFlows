import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { AUTOMATIONS_BASE_PATH } from "@/lib/brand";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { getPublishedAutomations } from "@/lib/catalogue-store";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GTM Automation Catalogue for Revenue Teams | GTM Flows",
  description: "Compare GTM automations by cost, timing, complexity, tools and ROI. Find the right revenue workflow to automate first.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/catalogue` },
};

export default async function CataloguePage() {
  const automations = await getPublishedAutomations();
  const jsonLd = [
    localBusinessJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: CANONICAL_ORIGIN },
      { name: "Automation Catalogue", url: `${CANONICAL_ORIGIN}/catalogue` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "GTM Automation Catalogue",
      url: `${CANONICAL_ORIGIN}/catalogue`,
      description: "A catalogue of GTM automations with setup cost, running cost, implementation time, complexity and supported tools.",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: automations.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          url: `${CANONICAL_ORIGIN}${AUTOMATIONS_BASE_PATH}/${item.slug}`,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        ["Which GTM automation should we build first?", "Start with a workflow that already has volume, clear ownership, measurable time cost and reliable input data."],
        ["How much does a GTM automation cost?", "Published GTM Flows catalogue builds currently range from ₹35K to ₹1.5L setup, with separate monthly running costs."],
        ["What running costs should we expect?", "Running costs depend on records, enrichment providers, AI usage, automation tools and messaging volume."],
        ["Can one automation connect to a broader revenue system?", "Yes. A focused automation can become the first connected layer of a wider revenue system."],
      ].map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient automations={automations} />
    </>
  );
}
