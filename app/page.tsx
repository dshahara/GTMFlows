"use client";

import { useEffect, useMemo, useState } from "react";

type Automation = {
  id: number;
  name: string;
  short: string;
  category: string;
  accent: string;
  setup: string;
  monthly: string;
  days: string;
  complexity: "Low" | "Medium" | "High";
  fit: string;
  threshold: string;
  tools: string[];
  details: string[];
  steps: string[];
  metric: string;
};

const automations: Automation[] = [
  {
    id: 1,
    name: "Lead-to-Rep in 5 Minutes",
    short: "Enrich, qualify and route every inbound lead automatically.",
    category: "Lead flow",
    accent: "lime",
    setup: "₹50K–₹1L",
    monthly: "₹2K–₹15K",
    days: "5–10 days",
    complexity: "Medium",
    fit: "Teams receiving 50+ inbound leads each month.",
    threshold: "Usually not worthwhile below 20 leads/month.",
    tools: ["HubSpot", "Zoho", "Freshsales", "Salesforce", "Pipedrive", "Slack", "Teams", "n8n", "Make", "Zapier"],
    details: [
      "Captures every new demo, contact or landing-page submission.",
      "Validates the lead’s email address and phone number.",
      "Enriches the contact, company, industry, location and employee count.",
      "Checks the CRM for existing contacts, companies and open opportunities.",
      "Scores the lead using your agreed fit and qualification criteria.",
      "Assigns the correct salesperson using territory, segment or round-robin rules.",
      "Creates the CRM task and sends an immediate sales alert.",
      "Escalates or reassigns leads that are not contacted within the SLA.",
    ],
    steps: ["Validate", "Enrich", "Score", "Assign", "Alert", "Escalate"],
    metric: "Response time",
  },
  {
    id: 2,
    name: "Research-to-CRM Engine",
    short: "Turn account lists into verified, sales-ready CRM records.",
    category: "Research",
    accent: "blue",
    setup: "₹75K–₹1.5L",
    monthly: "₹15K–₹60K",
    days: "7–12 days",
    complexity: "High",
    fit: "Outbound teams researching 500+ accounts each month.",
    threshold: "Best when two or more SDRs perform manual research.",
    tools: ["Clay", "Apollo", "Hunter", "HubSpot", "Zoho", "Salesforce", "Pipedrive", "Google Sheets", "n8n"],
    details: [
      "Imports target accounts from a spreadsheet, CRM view or outbound list.",
      "Enriches company size, industry, geography, technology and other firmographic data.",
      "Finds relevant decision-makers for the selected buying roles.",
      "Finds and verifies business email addresses and available phone numbers.",
      "Checks every account against your structured ICP criteria.",
      "Collects useful hiring, funding, technology or expansion signals.",
      "Creates account summaries and personalisation inputs for sales representatives.",
      "Pushes approved, sales-ready records into the CRM or sequencing platform.",
    ],
    steps: ["Import", "Enrich", "Verify", "Check ICP", "Research", "Sync"],
    metric: "Cost per ready account",
  },
  {
    id: 3,
    name: "No-Touch CRM Updates",
    short: "Convert sales meetings into structured CRM updates and next steps.",
    category: "Sales admin",
    accent: "coral",
    setup: "₹40K–₹80K",
    monthly: "₹2K–₹15K",
    days: "3–7 days",
    complexity: "Low",
    fit: "Teams conducting 40+ sales meetings each month.",
    threshold: "Check your meeting tool’s native features first.",
    tools: ["Zoom", "Google Meet", "Fireflies", "Fathom", "Grain", "HubSpot", "Zoho", "Salesforce", "Freshsales"],
    details: [
      "Captures the sales meeting transcript and recording metadata.",
      "Creates a structured summary of the customer’s situation and requirements.",
      "Extracts pain points, stakeholders, objections and agreed next steps.",
      "Updates the relevant contact, company and opportunity records.",
      "Populates agreed qualification and deal fields with confidence controls.",
      "Creates follow-up tasks and drafts the post-meeting email.",
      "Flags uncertain or missing information for salesperson approval.",
    ],
    steps: ["Capture", "Summarise", "Extract", "Update", "Task", "Draft"],
    metric: "Admin hours saved",
  },
  {
    id: 4,
    name: "No Lead Left Behind",
    short: "Enforce follow-up SLAs without manager intervention.",
    category: "Lead flow",
    accent: "violet",
    setup: "₹35K–₹70K",
    monthly: "₹1K–₹6K",
    days: "3–7 days",
    complexity: "Low",
    fit: "Multi-rep teams with inconsistent response times.",
    threshold: "Best when lead ownership and SLA rules are already clear.",
    tools: ["HubSpot", "Zoho", "Salesforce", "Freshsales", "Pipedrive", "Slack", "Teams", "Email", "WhatsApp APIs"],
    details: [
      "Starts a response timer whenever a new qualified lead is assigned.",
      "Sends reminders before the agreed response deadline is missed.",
      "Alerts the manager when a high-priority lead remains untouched.",
      "Reassigns leads using your escalation or round-robin rules.",
      "Creates the required CRM follow-up tasks automatically.",
      "Captures contacted, rejected and disqualified lead outcomes.",
      "Produces a daily exception report of leads that need attention.",
    ],
    steps: ["Start SLA", "Remind", "Escalate", "Reassign", "Report"],
    metric: "SLA compliance",
  },
  {
    id: 5,
    name: "Always-Clean CRM",
    short: "Detect duplicates, missing data and stale records automatically.",
    category: "CRM data",
    accent: "aqua",
    setup: "₹50K–₹1L",
    monthly: "₹2K–₹15K",
    days: "5–10 days",
    complexity: "Medium",
    fit: "Companies with 5,000+ CRM records or recurring data issues.",
    threshold: "Requires agreement on merge and ownership rules.",
    tools: ["HubSpot", "Zoho", "Salesforce", "Freshsales", "Pipedrive", "Clay", "Apollo", "Hunter"],
    details: [
      "Scans contacts, companies and opportunities for duplicate records.",
      "Standardises company names, domains, countries and phone numbers.",
      "Validates email addresses and flags risky or unusable contact data.",
      "Enriches required fields that are missing from otherwise useful records.",
      "Identifies incorrect ownership and unassigned sales records.",
      "Flags stale contacts, accounts and deals using agreed inactivity rules.",
      "Routes risky merges and field changes through a human approval queue.",
      "Produces a recurring CRM data-quality score and exception report.",
    ],
    steps: ["Scan", "Normalise", "Dedupe", "Enrich", "Approve", "Report"],
    metric: "Data completeness",
  },
  {
    id: 6,
    name: "Pipeline Revival",
    short: "Find and prioritise opportunities already hiding in your CRM.",
    category: "Pipeline",
    accent: "orange",
    setup: "₹60K–₹1.25L",
    monthly: "₹3K–₹25K",
    days: "7–10 days",
    complexity: "Medium",
    fit: "Teams with a meaningful database of stalled or closed-lost deals.",
    threshold: "Needs reliable loss reasons and previous activity data.",
    tools: ["HubSpot", "Zoho", "Salesforce", "Freshsales", "Pipedrive", "Apollo", "Clay", "Email platforms"],
    details: [
      "Finds stalled, closed-lost and no-response opportunities in the CRM.",
      "Segments records using loss reason, account fit and last activity.",
      "Checks eligible accounts for new hiring, funding or business signals.",
      "Prioritises the accounts with the strongest reason to revisit now.",
      "Creates context-aware re-engagement drafts for salesperson approval.",
      "Routes positive responses back to the correct account owner.",
      "Tracks reactivated conversations and reopened opportunities in the CRM.",
    ],
    steps: ["Find", "Segment", "Signal", "Prioritise", "Draft", "Track"],
    metric: "Deals reopened",
  },
  {
    id: 7,
    name: "Deal Follow-Up Autopilot",
    short: "Keep every proposal connected to a clear next action.",
    category: "Sales admin",
    accent: "lime",
    setup: "₹35K–₹75K",
    monthly: "₹1K–₹6K",
    days: "3–7 days",
    complexity: "Low",
    fit: "Teams sending 20+ proposals or quotations each month.",
    threshold: "Works best when proposals follow a standard process.",
    tools: ["PandaDoc", "DocuSign", "HubSpot Quotes", "Zoho", "Salesforce", "Gmail", "Outlook", "Slack"],
    details: [
      "Detects when a proposal, quotation or commercial document is sent.",
      "Creates the next follow-up date using your sales process rules.",
      "Reminds the salesperson before a proposal becomes overdue.",
      "Drafts a context-aware follow-up using the opportunity information.",
      "Escalates proposals that remain open without an agreed next step.",
      "Updates the deal stage, activity and next-action fields in the CRM.",
      "Produces a manager view of proposals that are stalled or need attention.",
    ],
    steps: ["Detect", "Schedule", "Remind", "Draft", "Escalate", "Update"],
    metric: "Deals with next step",
  },
  {
    id: 8,
    name: "Hot Account Alerts",
    short: "Tell sales when a qualified account demonstrates buying intent.",
    category: "Signals",
    accent: "coral",
    setup: "₹75K–₹1.5L",
    monthly: "₹10K–₹50K",
    days: "7–15 days",
    complexity: "High",
    fit: "Companies with meaningful website, product or first-party activity.",
    threshold: "Not suitable when traffic is too low to produce usable signals.",
    tools: ["GA4", "PostHog", "Segment", "HubSpot", "Zoho", "Salesforce", "Visitor identification tools", "Slack", "Teams"],
    details: [
      "Captures agreed website, pricing-page, product or campaign activity.",
      "Resolves the visitor or activity to an account where the data allows it.",
      "Checks the CRM for the account’s owner, history and open opportunities.",
      "Combines account fit and behavioural intent into one priority score.",
      "Filters out low-confidence signals before they reach the sales team.",
      "Alerts the appropriate salesperson with context and a recommended action.",
      "Creates the CRM task and tracks whether the signal was actioned.",
    ],
    steps: ["Capture", "Resolve", "Match", "Score", "Alert", "Track"],
    metric: "Alert-to-action time",
  },
  {
    id: 9,
    name: "Lead Source & CRM Sync",
    short: "Preserve accurate source data across campaigns, forms and CRM.",
    category: "CRM data",
    accent: "blue",
    setup: "₹40K–₹80K",
    monthly: "₹1K–₹8K",
    days: "5–8 days",
    complexity: "Medium",
    fit: "Companies generating leads through several campaigns and forms.",
    threshold: "Most valuable above 100 leads/month across multiple sources.",
    tools: ["HubSpot", "Zoho", "Salesforce", "Webflow", "WordPress", "Typeform", "Google Ads", "LinkedIn Ads", "GA4", "Spreadsheets"],
    details: [
      "Captures source and campaign information.",
      "Standardises UTM values.",
      "Connects form submissions with CRM records.",
      "Prevents source information from being overwritten.",
      "Updates campaign membership.",
      "Flags records with missing attribution.",
      "Produces a lead-source exception report.",
    ],
    steps: ["Capture", "Standardise", "Match", "Protect", "Sync", "Flag"],
    metric: "Attributed leads",
  },
  {
    id: 10,
    name: "Renewal & Expansion Alerts",
    short: "Surface renewal risk and expansion opportunities before they are missed.",
    category: "Pipeline",
    accent: "violet",
    setup: "₹60K–₹1.25L",
    monthly: "₹3K–₹20K",
    days: "7–12 days",
    complexity: "High",
    fit: "Subscription businesses with 50+ active customers.",
    threshold: "Requires usable renewal, billing or product-usage data.",
    tools: ["Stripe", "Chargebee", "HubSpot", "Zoho", "Salesforce", "Customer support tools", "Product databases", "Slack", "Email"],
    details: [
      "Monitors upcoming renewal dates and required customer-contact windows.",
      "Combines billing, product-usage and support signals where available.",
      "Flags accounts showing potential renewal or adoption risk.",
      "Identifies customers displaying potential expansion signals.",
      "Assigns the appropriate renewal or expansion task to the account owner.",
      "Escalates upcoming renewals that have no recent activity or next step.",
      "Records the outreach, account status and agreed actions in the CRM.",
      "Produces a recurring report of renewals and expansion opportunities requiring attention.",
    ],
    steps: ["Monitor", "Combine", "Flag", "Assign", "Escalate", "Record"],
    metric: "Renewals covered",
  },
];

const categories = ["All", "Lead flow", "Research", "Sales admin", "CRM data", "Pipeline", "Signals"];

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Automation | null>(null);
  const [volume, setVolume] = useState(500);
  const [minutes, setMinutes] = useState(12);
  const [hourlyCost, setHourlyCost] = useState(600);
  const [coverage, setCoverage] = useState(80);
  const [runCost, setRunCost] = useState(12000);
  const [setupCost, setSetupCost] = useState(75000);

  const filtered = useMemo(
    () => (category === "All" ? automations : automations.filter((item) => item.category === category)),
    [category],
  );

  const roi = useMemo(() => {
    const currentHours = (volume * minutes) / 60;
    const hoursSaved = currentHours * (coverage / 100);
    const monthlyValue = hoursSaved * hourlyCost;
    const netMonthly = monthlyValue - runCost;
    const firstYearCost = setupCost + runCost * 12;
    const firstYearBenefit = monthlyValue * 12;
    const percentage = firstYearCost > 0 ? ((firstYearBenefit - firstYearCost) / firstYearCost) * 100 : 0;
    const payback = netMonthly > 0 ? setupCost / netMonthly : 0;
    return { currentHours, hoursSaved, monthlyValue, netMonthly, percentage, payback };
  }, [volume, minutes, hourlyCost, coverage, runCost, setupCost]);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="GTM Auto home">
          <span className="brand-mark">G/A</span>
          <span>GTM/AUTO</span>
        </a>
        <div className="nav-links">
          <a href="#catalogue">Catalogue</a>
          <a href="#roi">ROI calculator</a>
          <a href="#process">How it works</a>
        </div>
        <a className="button button-dark nav-cta" href="#catalogue">Find my automation <span>↗</span></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> Ready-to-deploy GTM automations</div>
          <h1>Know what to automate. <span>Know what it costs.</span></h1>
          <p className="hero-sub">Browse a transparent catalogue of sales automations with setup price, monthly running cost, delivery time and ROI—before you book a call.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#catalogue">Browse 10 automations <span>↓</span></a>
            <a className="text-link" href="#roi">Calculate your ROI <span>↗</span></a>
          </div>
          <div className="hero-proof">
            <div><strong>5–10</strong><span>days to launch most builds</span></div>
            <div><strong>₹1K+</strong><span>estimated monthly run cost</span></div>
            <div><strong>100%</strong><span>client-owned accounts</span></div>
          </div>
        </div>

        <div className="flow-panel" aria-label="Lead automation workflow illustration">
          <div className="flow-topline">
            <span>LIVE WORKFLOW</span>
            <span className="status-pill">● Healthy</span>
          </div>
          <div className="flow-lead">
            <div className="avatar">AK</div>
            <div><strong>New demo request</strong><span>Acme Labs · 120 employees</span></div>
            <span className="time-tag">NOW</span>
          </div>
          <div className="flow-path">
            <div className="flow-node node-lime"><span>01</span><strong>Enrich</strong><small>11 fields added</small></div>
            <div className="connector"><i /></div>
            <div className="flow-node node-blue"><span>02</span><strong>Score</strong><small>ICP match: 92%</small></div>
            <div className="connector"><i /></div>
            <div className="flow-node node-coral"><span>03</span><strong>Route</strong><small>Assigned to Nisha</small></div>
          </div>
          <div className="flow-result">
            <div><span className="check">✓</span><strong>Ready for sales</strong></div>
            <div className="time-saved"><small>PROCESSING TIME</small><strong>00:43</strong></div>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
      </section>

      <section className="ticker" aria-label="Supported tools">
        <div>HUBSPOT <span>✦</span> ZOHO <span>✦</span> SALESFORCE <span>✦</span> CLAY <span>✦</span> APOLLO <span>✦</span> N8N <span>✦</span> MAKE <span>✦</span> ZAPIER</div>
      </section>

      <section className="intro shell" id="catalogue">
        <div>
          <span className="section-number">01 / CATALOGUE</span>
          <h2>Start with one process that already costs you time.</h2>
        </div>
        <p>No lengthy transformation project. Compare the economics, choose a workflow, and launch only when the numbers make sense.</p>
      </section>

      <section className="catalogue shell">
        <div className="filters" role="group" aria-label="Filter automations by category">
          {categories.map((item) => (
            <button
              className={category === item ? "active" : ""}
              key={item}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filtered.map((item) => (
            <article className={`automation-card accent-${item.accent}`} key={item.id}>
              <div className="card-top">
                <span className="card-index">{String(item.id).padStart(2, "0")}</span>
                <span className="category-tag">{item.category}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.short}</p>
              <div className="mini-flow" aria-label={`${item.name} workflow`}>
                {item.steps.slice(0, 4).map((step, index) => (
                  <div key={step}><span>{step}</span>{index < 3 && <i>→</i>}</div>
                ))}
              </div>
              <dl className="card-stats">
                <div><dt>Setup</dt><dd>{item.setup}</dd></div>
                <div><dt>Runs at</dt><dd>{item.monthly}<small>/month</small></dd></div>
                <div><dt>Live in</dt><dd>{item.days}</dd></div>
                <div><dt>Complexity</dt><dd><span className={`complexity ${item.complexity.toLowerCase()}`}>{item.complexity}</span></dd></div>
              </dl>
              <div className="fit-note"><span>Best fit</span>{item.fit}</div>
              <button className="card-action" onClick={() => setSelected(item)}>View automation <span>↗</span></button>
            </article>
          ))}
        </div>
      </section>

      <section className="transparency shell">
        <div className="transparency-copy">
          <span className="section-number">02 / COST TRANSPARENCY</span>
          <h2>See the whole cost. Not just the build fee.</h2>
          <p>Every catalogue estimate separates implementation from the ongoing software, data, AI and execution costs required to keep the automation running.</p>
          <div className="cost-legend">
            <div><i className="legend-build" /><span><strong>One-time build</strong>Design, integration, testing and training.</span></div>
            <div><i className="legend-run" /><span><strong>Monthly run cost</strong>Workflow, data, AI and messaging usage.</span></div>
            <div><i className="legend-own" /><span><strong>You own the stack</strong>Accounts and billing stay in your company’s name.</span></div>
          </div>
        </div>
        <div className="cost-graphic" aria-label="First-year automation cost breakdown">
          <div className="graphic-title"><span>FIRST-YEAR COST</span><strong>Example · Research engine</strong></div>
          <div className="donut" style={{ "--build": "30%", "--run": "64%" } as React.CSSProperties}>
            <div><strong>₹2.49L</strong><span>year one</span></div>
          </div>
          <div className="bar-list">
            <div><span>Build</span><i><b style={{ width: "30%" }} /></i><strong>₹75K</strong></div>
            <div><span>Data + tools</span><i><b style={{ width: "64%" }} /></i><strong>₹1.44L</strong></div>
            <div><span>Care</span><i><b style={{ width: "12%" }} /></i><strong>₹30K</strong></div>
          </div>
          <p>Illustrative only. Your estimate is calculated from actual record volume and selected tools.</p>
        </div>
      </section>

      <section className="roi-section" id="roi">
        <div className="shell">
          <div className="roi-heading">
            <span className="section-number light">03 / ROI CALCULATOR</span>
            <h2>Will the automation pay for itself?</h2>
            <p>Use your numbers. Revenue uplift is deliberately excluded from the base calculation.</p>
          </div>
          <div className="calculator">
            <div className="inputs">
              <label>Tasks or records per month<input type="number" min="0" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></label>
              <label>Minutes per task<input type="number" min="0" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /></label>
              <label>Loaded team cost per hour<input type="number" min="0" value={hourlyCost} onChange={(e) => setHourlyCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
              <label>Work that can be automated<input type="range" min="10" max="100" step="5" value={coverage} onChange={(e) => setCoverage(Number(e.target.value))} /><output>{coverage}%</output></label>
              <label>Monthly tool/API cost<input type="number" min="0" value={runCost} onChange={(e) => setRunCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
              <label>One-time setup cost<input type="number" min="0" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
            </div>
            <div className="results">
              <div className="result-kicker">YOUR ESTIMATED BASE CASE</div>
              <div className="primary-result"><span>Payback period</span><strong>{roi.payback > 0 ? roi.payback.toFixed(1) : "—"}<small> months</small></strong></div>
              <div className="result-grid">
                <div><span>Hours returned/month</span><strong>{Math.round(roi.hoursSaved)}h</strong></div>
                <div><span>Monthly labour value</span><strong>{formatRupees(roi.monthlyValue)}</strong></div>
                <div><span>Monthly net benefit</span><strong>{formatRupees(roi.netMonthly)}</strong></div>
                <div><span>First-year ROI</span><strong>{Math.round(roi.percentage)}%</strong></div>
              </div>
              <div className="result-visual">
                <div className="baseline"><span>Manual effort</span><i><b style={{ width: "100%" }} /></i><strong>{Math.round(roi.currentHours)}h</strong></div>
                <div className="automated"><span>After automation</span><i><b style={{ width: `${100 - coverage}%` }} /></i><strong>{Math.round(roi.currentHours - roi.hoursSaved)}h</strong></div>
              </div>
              <p>This is an illustrative labour-efficiency estimate, not a revenue guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process shell" id="process">
        <div className="process-heading">
          <span className="section-number">04 / HOW IT WORKS</span>
          <h2>One workflow. Four clear steps.</h2>
        </div>
        <div className="process-grid">
          <article><span>01</span><h3>Choose</h3><p>Select a catalogue automation that matches your process and volume.</p></article>
          <article><span>02</span><h3>Confirm</h3><p>We verify tools, rules, edge cases, acceptance criteria and final running cost.</p></article>
          <article><span>03</span><h3>Launch</h3><p>We build, test, document and deploy inside accounts owned by your company.</p></article>
          <article><span>04</span><h3>Measure</h3><p>Compare the result with the baseline and decide whether to automate the next process.</p></article>
        </div>
      </section>

      <section className="cta shell">
        <div>
          <span className="section-number">START SMALL</span>
          <h2>What should your sales team stop doing manually?</h2>
        </div>
        <div>
          <p>Pick one repetitive process. We’ll confirm the fit, total operating cost and acceptance criteria before you commit.</p>
          <a className="button button-light" href="mailto:hello@example.com?subject=Find%20my%20first%20automation">Find my first automation <span>↗</span></a>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand"><span className="brand-mark">G/A</span><span>GTM/AUTO</span></div>
        <p>Fixed-price GTM automations for B2B sales teams.</p>
        <div><a href="#catalogue">Catalogue</a><a href="#roi">ROI</a><a href="#top">Back to top ↑</a></div>
      </footer>

      {selected && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelected(null)}>
          <section className={`modal accent-${selected.accent}`} role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close automation details">×</button>
            <span className="section-number">AUTOMATION {String(selected.id).padStart(2, "0")}</span>
            <h2 id="modal-title">{selected.name}</h2>
            <p className="modal-short">{selected.short}</p>
            <div className="modal-flow">
              {selected.steps.map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>)}
            </div>
            <div className="modal-detail-copy">
              <span>THE AUTOMATION</span>
              <ul>
                {selected.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
            <div className="modal-facts">
              <div><span>Setup investment</span><strong>{selected.setup}</strong></div>
              <div><span>Monthly run cost</span><strong>{selected.monthly}</strong></div>
              <div><span>Implementation</span><strong>{selected.days}</strong></div>
              <div><span>Primary metric</span><strong>{selected.metric}</strong></div>
            </div>
            <div className="modal-notes">
              <div><span>GOOD FIT</span><p>{selected.fit}</p></div>
              <div><span>CHECK FIRST</span><p>{selected.threshold}</p></div>
            </div>
            <div className="tool-list"><span>SUPPORTED TOOLS</span>{selected.tools.map((tool) => <i key={tool}>{tool}</i>)}</div>
            <a className="button button-dark" href="#roi" onClick={() => setSelected(null)}>Calculate the ROI <span>↗</span></a>
          </section>
        </div>
      )}
    </main>
  );
}
