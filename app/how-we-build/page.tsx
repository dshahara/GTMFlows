import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { KeyTakeaways, SourceNote } from "@/components/SeoBlocks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How to Build Revenue Automation Systems | GTM Flows",
  description: "See how GTM Flows builds revenue automation systems across data foundation, scoring, signals, workflows and measurement.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/how-we-build` },
};

const howWeBuildFaqs = [
  ["What is the first step in revenue automation?", "The first step is defining the revenue decision the system should improve before selecting tools or workflows."],
  ["Why does GTM Flows start with data foundation?", "Reliable data foundation prevents automations from routing, scoring or updating records based on duplicates, stale fields or missing context."],
  ["How does AI fit into the build process?", "AI can classify, research and draft context, but deterministic rules and human approval protect sensitive workflow decisions."],
  ["How do you measure whether the system worked?", "Each build defines an objective milestone such as response time, data coverage, SLA compliance, cost per ready account or admin hours reduced."],
] as const;

const designQuestions = [
  ["01", "What revenue decision are we improving?", "Which account, lead, opportunity or customer should receive attention?", "aqua"],
  ["02", "What evidence should influence it?", "Which first-party, third-party or derived data points are credible and affordable?", "lime"],
  ["03", "How will the decision be made?", "What rules, weights, exclusions, confidence levels or approvals are required?", "blue"],
  ["04", "What action follows?", "Which owner, channel, workflow and response window apply?", "violet"],
  ["05", "How will the system learn?", "Which outcomes return to the model and improve future prioritisation?", "coral"],
] as const;

const architecture = [
  ["Sources", "CRM · Product · Website · Conversations · Public data · Data providers", "aqua"],
  ["Foundation", "Identity resolution · Standardisation · Enrichment · Deduplication · Governance", "lime"],
  ["Decision layer", "ICP fit · Timing · Contact relevance · Potential value · Confidence", "blue"],
  ["Orchestration", "Ownership · Priority · Channel · SLA · Approval · Escalation", "violet"],
  ["Activation", "CRM tasks · Outbound · Alerts · Ads · Customer workflows", "coral"],
  ["Feedback", "Replies · Meetings · Opportunities · Usage · Renewal · Exceptions", "orange"],
] as const;

const phases = [
  ["Data readiness", "Stabilise the operating environment and confirm the workflow can safely support automation.", "aqua"],
  ["Market and account focus", "Translate the commercial strategy into clear account, segment and data requirements.", "lime"],
  ["Signals and prioritisation", "Define which accounts or customers deserve attention and why now.", "blue"],
  ["Activation workflow", "Connect the decision to the right owner, channel, timing and review point.", "violet"],
  ["Measurement loop", "Track system health, team execution and the commercial movement the workflow can influence.", "orange"],
] as const;

const standards = [
  "Client-owned accounts and documented access",
  "Reversible updates for sensitive CRM workflows",
  "Test records and acceptance criteria before production activation",
  "Duplicate-action protection where applicable",
  "Suppression, consent and do-not-contact controls",
  "Visible error queues and exception handling",
  "Cost limits for enrichment, AI and API usage",
  "Human review at high-risk or high-value decision points",
] as const;

export default function HowWeBuildPage() {
  const jsonLd = [
    localBusinessJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: CANONICAL_ORIGIN },
      { name: "How We Build", url: `${CANONICAL_ORIGIN}/how-we-build` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Revenue automation system design",
      serviceType: "Revenue automation and GTM engineering",
      provider: { "@type": "Organization", name: "GTM Flows", url: CANONICAL_ORIGIN },
      areaServed: "India",
      url: `${CANONICAL_ORIGIN}/how-we-build`,
      description: "GTM Flows designs revenue automation systems across data foundation, decision logic, workflow activation and measurement.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: howWeBuildFaqs.map(([question, answer]) => ({
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
      <MarketingPageHero
        crumb="How We Build"
        label="Decision first. Tools second."
        title="How to build revenue automation systems"
        body="Revenue automation should start with a business decision, not a tool selection. GTM Flows connects commercial strategy, data architecture and workflow execution so each build has a clear owner, measurable outcome and safe operating model."
      />

      <section className="shell compact-top">
        <KeyTakeaways
          answer="Revenue automation should start with a business decision, not with a tool selection."
          bestFor="Teams that need reliable CRM data, signal scoring and repeatable GTM execution."
          stat="GTM Flows uses five design questions before recommending any automation build."
          bottomLine="Build the decision layer first, then connect data, workflow, ownership and measurement."
        />
        <SourceNote source="GTM Flows delivery process and automation catalogue" />
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid"><span className="section-number">The design questions</span><h2>Five questions before we automate anything.</h2></div>
        <div className="question-grid">
          {designQuestions.map(([number, title, body, accent]) => <article className={`accent-border-${accent}`} key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="marketing-page-section dark-band">
        <div className="shell">
          <div className="marketing-head-grid"><span className="section-number light">System architecture</span><h2>What layers make revenue automation reliable?</h2><p>The exact tools vary, but every system must connect evidence to a decision, an owner, an action and a measurable outcome.</p></div>
          <div className="architecture-stack">
            {architecture.map(([title, body, accent], index) => <div key={title}><article className={`accent-border-${accent}`}><strong>{title}</strong><p>{body}</p></article>{index < architecture.length - 1 && <i>↓</i>}</div>)}
          </div>
        </div>
      </section>

      <section className="marketing-page-section shell">
        <div className="marketing-head-grid"><span className="section-number">How the system is built</span><h2>How do we build without exposing the full playbook?</h2><p>Publicly, we keep this high-level: define the decision, prepare the data, connect the workflow, launch safely and measure what changed. The detailed build checklist is shared only inside active engagements.</p></div>
        <div className="phase-summary-grid">
          {phases.map(([name, objective, accent]) => <article className={`accent-border-${accent}`} key={name}>
            <span>{name}</span>
            <h3>{objective}</h3>
          </article>)}
        </div>
      </section>

      <section className="marketing-page-section dark-band compact-section">
        <div className="shell">
          <div className="marketing-head-grid"><span className="section-number light">Build standards</span><h2>What controls should every production revenue automation include?</h2></div>
          <ul className="two-column-list dark-list">{standards.map((standard) => <li key={standard}>{standard}</li>)}</ul>
        </div>
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid">
          <span className="section-number">Implementation FAQ</span>
          <h2>What do teams ask before building revenue automation?</h2>
          <p>These answers describe the operating principles without disclosing the private implementation checklist.</p>
        </div>
        <div className="faq-list">
          {howWeBuildFaqs.map(([question, answer]) => (
            <section key={question}>
              <h3>{question}</h3>
              <p>{answer}</p>
            </section>
          ))}
        </div>
        <div className="source-links">
          <span>Reference frameworks:</span>
          <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noreferrer">Google structured data guidance</a>
          <a href="https://schema.org/Service" target="_blank" rel="noreferrer">Schema.org Service</a>
        </div>
      </section>

      <MarketingFinalCta />
      <SiteFooter />
    </main>
  );
}
