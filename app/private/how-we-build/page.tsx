import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { PrivateAccessDenied, getPrivateAccess } from "@/lib/private-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private How We Build | GTM Flows",
  robots: { index: false, follow: false },
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
  {
    number: "00",
    name: "Infrastructure and data readiness",
    objective: "Create a stable operating environment before increasing volume or adding automation.",
    work: ["Audit the CRM, spreadsheets, enrichment and activation tools", "Document integrations, ownership and current failure points", "Establish naming, deduplication and data-retention rules", "Configure domains, authentication and sending controls when outbound is included", "Create the initial dashboard and system documentation"],
    deliverable: "A working, documented GTM stack with client-owned accounts and a system-ready checklist.",
    accent: "aqua",
  },
  {
    number: "01",
    name: "Market definition and TAM design",
    objective: "Define who the company should pursue and convert that strategy into usable account data.",
    work: ["Analyse strong customers, weak-fit customers and lost opportunities", "Define firmographic, geographic, technographic and commercial attributes", "Create ICP tiers with must-have, preferred and exclusion criteria", "Source and segment the total addressable market", "Define the data fields required for scoring and activation"],
    deliverable: "A written ICP, segmented TAM and data dictionary for the targeting model.",
    accent: "lime",
  },
  {
    number: "02",
    name: "Scoring, signals and target selection",
    objective: "Determine which accounts deserve attention now.",
    work: ["Build a transparent company-fit score", "Define signals connected to purchase, expansion, reactivation or churn", "Set source, refresh-frequency and cost controls", "Combine fit and timing without hiding the logic", "Set thresholds based on the team’s weekly capacity"],
    deliverable: "Fit and timing scorecards, a signal map and a current account queue.",
    accent: "blue",
  },
  {
    number: "03",
    name: "Buying committee and enrichment",
    objective: "Identify the right people and provide enough evidence for relevant engagement.",
    work: ["Define buyer, champion, influencer and blocker roles", "Find one to three relevant contacts per account", "Verify contact data through appropriate provider checks", "Collect useful company and contact context", "Combine company priority with contact relevance"],
    deliverable: "A verified buying committee, research evidence and person-level activation queue.",
    accent: "violet",
  },
  {
    number: "04",
    name: "Plays, orchestration and activation",
    objective: "Turn qualified data into a coordinated action across the appropriate channel.",
    work: ["Develop message angles based on segment, problem and signal", "Define automatic and human-approved steps", "Configure tests, cadence, suppression and deliverability controls", "Coordinate CRM tasks, email, LinkedIn, alerts and audiences", "Record activity and status changes back in the CRM"],
    deliverable: "Approved plays, live workflows, routing rules and a launch QA report.",
    accent: "coral",
  },
  {
    number: "05",
    name: "Measurement and continuous improvement",
    objective: "Learn which combinations of account, signal, message and channel create commercial movement.",
    work: ["Monitor data coverage, accuracy, cost and workflow failures", "Compare results by segment, signal, angle and channel", "Pause weak variants and expand evidence-supported winners", "Refresh audiences and repair broken handoffs", "Document what changed and what will be tested next"],
    deliverable: "A live dashboard, biweekly review and evidence-based experiment backlog.",
    accent: "orange",
  },
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

export default async function PrivateHowWeBuildPage() {
  const { user, allowed } = await getPrivateAccess("/private/how-we-build");
  if (!allowed) return <PrivateAccessDenied signedInEmail={user.email} />;

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
        <div className="marketing-head-grid"><span className="section-number">How the system is built</span><h2>The work behind a production-ready revenue engine.</h2><p>Every engagement is scoped around a specific commercial bottleneck and built through connected phases.</p></div>
        <div className="phase-list">
          {phases.map((phase) => <article className={`accent-border-${phase.accent}`} key={phase.number}>
            <div><span>{phase.number}</span><h3>{phase.name}</h3><p><strong>Objective.</strong> {phase.objective}</p></div>
            <div><span>What we do</span><ul>{phase.work.map((item) => <li key={item}>{item}</li>)}</ul><div className="phase-deliverable"><span>Deliverable</span><p>{phase.deliverable}</p></div></div>
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
