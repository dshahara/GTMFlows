import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "How GTM Flows Builds Revenue Systems",
  description: "See how GTM Flows designs data foundations, scoring models, signal tracking, activation workflows and measurable 30-day milestones.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/how-we-build` },
};

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
  return (
    <main className="marketing-site">
      <SiteNav />
      <MarketingPageHero
        crumb="How We Build"
        label="Decision first. Tools second."
        title="Revenue automation starts with a decision—not a tool."
        body="Our delivery process connects commercial strategy, data architecture and workflow execution. Every build begins by identifying the decision the system must improve."
      />

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid"><span className="section-number">The design questions</span><h2>Five questions before we automate anything.</h2></div>
        <div className="question-grid">
          {designQuestions.map(([number, title, body, accent]) => <article className={`accent-border-${accent}`} key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="marketing-page-section dark-band">
        <div className="shell">
          <div className="marketing-head-grid"><span className="section-number light">System architecture</span><h2>Six layers, one direction of travel.</h2><p>The exact tools vary, but every system must connect evidence to a decision, an owner, an action and a measurable outcome.</p></div>
          <div className="architecture-stack">
            {architecture.map(([title, body, accent], index) => <div key={title}><article className={`accent-border-${accent}`}><strong>{title}</strong><p>{body}</p></article>{index < architecture.length - 1 && <i>↓</i>}</div>)}
          </div>
        </div>
      </section>

      <section className="marketing-page-section shell">
        <div className="marketing-head-grid"><span className="section-number">How the system is built</span><h2>A focused build path without the playbook exposed.</h2><p>Publicly, we keep this high-level: define the decision, prepare the data, connect the workflow, launch safely and measure what changed. The detailed build checklist is shared only inside active engagements.</p></div>
        <div className="phase-summary-grid">
          {phases.map(([name, objective, accent]) => <article className={`accent-border-${accent}`} key={name}>
            <span>{name}</span>
            <h3>{objective}</h3>
          </article>)}
        </div>
      </section>

      <section className="marketing-page-section dark-band compact-section">
        <div className="shell">
          <div className="marketing-head-grid"><span className="section-number light">Build standards</span><h2>What every production build carries by default.</h2></div>
          <ul className="two-column-list dark-list">{standards.map((standard) => <li key={standard}>{standard}</li>)}</ul>
        </div>
      </section>

      <MarketingFinalCta />
      <SiteFooter />
    </main>
  );
}
