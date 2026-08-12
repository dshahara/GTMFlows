import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { KeyTakeaways, SourceNote } from "@/components/SeoBlocks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { faqItems } from "@/lib/marketing";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Revenue Automation FAQ for GTM Teams | GTM Flows",
  description: "Answers on revenue automation, signal-led GTM, AI controls, pricing, ownership, implementation and measurable milestones.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/faq` },
};

const commercialPrinciples = [
  "Fixed-scope or value-based implementation pricing",
  "Pricing informed by the credible first-year value of the problem",
  "Client-owned software, data and sending accounts",
  "Variable API and usage charges paid directly by the client",
  "Clear assumptions, exclusions and acceptance criteria",
  "No revenue guarantees for outcomes affected by external factors",
  "Ongoing support justified through measured performance and improvement",
] as const;

export default function FaqPage() {
  const jsonLd = [
    localBusinessJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: CANONICAL_ORIGIN },
      { name: "FAQ", url: `${CANONICAL_ORIGIN}/faq` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ];

  return (
    <main className="marketing-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <MarketingPageHero crumb="FAQ" label="Questions" title="Revenue automation FAQ for GTM teams" body="Answers about automated revenue systems, signal-led GTM, AI controls, ownership, pricing, implementation and measurable milestones." />

      <section className="shell compact-top">
        <KeyTakeaways
          answer="Revenue automation connects data, decision rules and workflow execution across the GTM stack."
          bestFor="Teams comparing automation, enrichment, AI controls, pricing and implementation ownership."
          stat="GTM Flows publishes setup, running cost and implementation estimates for ten automation categories."
          bottomLine="Use the FAQ to qualify fit before choosing a workflow or requesting a build."
        />
        <SourceNote source="GTM Flows commercial principles and FAQ content" />
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="faq-grid">
          {faqItems.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="marketing-page-section dark-band compact-section">
        <div className="shell">
          <div className="marketing-head-grid"><span className="section-number light">Commercial principles</span><h2>Buy the first measurable system—not an open-ended block of engineering hours.</h2></div>
          <ul className="two-column-list dark-list">{commercialPrinciples.map((principle) => <li key={principle}>{principle}</li>)}</ul>
        </div>
      </section>

      <MarketingFinalCta />
      <SiteFooter />
    </main>
  );
}
