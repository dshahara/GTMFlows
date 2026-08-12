import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { faqItems } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Revenue Systems FAQ | GTM Flows",
  description: "Answers about automated revenue systems, signal-led GTM, AI controls, implementation, ownership, pricing and measurable milestones.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="marketing-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <MarketingPageHero crumb="FAQ" label="Questions" title="What teams ask before the first build." body="Scope, ownership, tooling, pricing and what we will—and will not—promise." />

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
