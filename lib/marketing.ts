export const heroNodes = [
  ["01", "Account detected", "aqua"],
  ["02", "Fit scored", "lime"],
  ["03", "Signal verified", "violet"],
  ["04", "Buyer identified", "orange"],
  ["05", "Play activated", "coral"],
] as const;

export const capabilities = [
  "Data foundation",
  "ICP and TAM",
  "Signal tracking",
  "Lead scoring",
  "CRM activation",
  "Lifecycle automation",
] as const;

export const operatingGap = [
  ["Static account lists", "Continuously ranked accounts"],
  ["Disconnected signals", "Signals checked against ICP fit"],
  ["Manual account research", "Automated research with supporting evidence"],
  ["Alerts without ownership", "Defined owner, action and response time"],
  ["Campaign activity in separate tools", "Outcomes recorded in the CRM"],
] as const;

export type RevenueStage = {
  key: string;
  label: string;
  chips: string;
  accent: string;
  description: string;
  input: string;
  decision: string;
  output: string;
};

export const revenueStages: RevenueStage[] = [
  {
    key: "sources",
    label: "Sources",
    chips: "CRM · Product · Website",
    accent: "aqua",
    description: "Revenue data as it already exists across the stack.",
    input: "A CRM record, product event and website session for the same company",
    decision: "Is this one account or several fragments?",
    output: "One resolved account record",
  },
  {
    key: "foundation",
    label: "Foundation",
    chips: "Clean · Match · Enrich",
    accent: "lime",
    description: "Standardise, deduplicate and enrich revenue data.",
    input: "A resolved account missing industry and headcount",
    decision: "Which fields are required before scoring can run?",
    output: "An enriched record with source and refresh date",
  },
  {
    key: "decision",
    label: "Decision",
    chips: "Fit · Timing · Value",
    accent: "blue",
    description: "Score fit, timing, contact relevance and potential value.",
    input: "An enriched account plus hiring and leadership changes",
    decision: "Does fit and timing clear the weekly capacity threshold?",
    output: "Fit 91/100, timing confirmed, account queued",
  },
  {
    key: "orchestration",
    label: "Orchestration",
    chips: "Owner · Action · SLA",
    accent: "violet",
    description: "Decide who acts, what happens and how quickly.",
    input: "A prioritised account in the enterprise segment",
    decision: "Which owner, channel and response window apply?",
    output: "Assigned to an enterprise SDR with a 24-hour SLA",
  },
  {
    key: "activation",
    label: "Activation",
    chips: "Sales · Growth · CS",
    accent: "coral",
    description: "Trigger CRM tasks, outbound plays, alerts and customer workflows.",
    input: "An assigned account with research and evidence fields",
    decision: "Draft automatically or route for human approval?",
    output: "CRM task, outbound play and Slack alert created",
  },
  {
    key: "feedback",
    label: "Feedback",
    chips: "Replies · Pipeline",
    accent: "orange",
    description: "Use outcomes to improve prioritisation and future plays.",
    input: "A positive reply and newly created opportunity",
    decision: "Which signal and angle combination produced movement?",
    output: "Updated weights and a next-test backlog",
  },
];

export const workedExample = [
  ["01", "Signal captured", "New VP Sales + six open SDR roles", "lime"],
  ["02", "Context added", "Company matches the ICP and recently expanded into the US", "aqua"],
  ["03", "Buying committee identified", "VP Sales, Head of RevOps and Growth leader verified", "violet"],
  ["04", "Action selected", "High-context outbound play assigned to the correct rep", "orange"],
  ["05", "System updated", "Research, task, message context and status recorded in the CRM", "coral"],
] as const;

export const revenueSystems = [
  {
    number: "01",
    name: "Signal-to-Sequence Engine",
    description: "Find and activate accounts based on fit and timing.",
    longDescription: "Continuously identify suitable accounts, monitor relevant changes, find the buying committee and activate the right outbound play based on fit and timing.",
    flow: ["TAM", "Enrichment", "Fit score", "Signals", "Buyer verification", "Research", "Activation", "CRM feedback"],
    accent: "lime",
  },
  {
    number: "02",
    name: "Intelligent Inbound Response",
    description: "Enrich, qualify and route incoming demand automatically.",
    longDescription: "Enrich every form submission, calculate fit and urgency, route it to the correct owner and enforce response SLAs without adding unnecessary form fields.",
    flow: ["Form or product event", "Identity resolution", "Enrichment", "Qualification", "Routing", "Alert", "Follow-up"],
    accent: "blue",
  },
  {
    number: "03",
    name: "CRM Data Foundation",
    description: "Continuously repair missing, stale and duplicate records.",
    longDescription: "Detect duplicates, missing fields, stale contacts and conflicting records so teams and automations operate from more reliable data.",
    flow: ["CRM scan", "Standardisation", "Duplicate detection", "Enrichment", "Approval", "Update", "Exceptions"],
    accent: "coral",
  },
  {
    number: "04",
    name: "Pipeline Reactivation",
    description: "Revisit stalled accounts when a credible new reason appears.",
    longDescription: "Find closed-lost, stalled or previously engaged accounts with a credible new reason to restart the conversation.",
    flow: ["CRM history", "Eligibility", "New signal", "Reprioritisation", "Context", "Owner", "Measurement"],
    accent: "violet",
  },
  {
    number: "05",
    name: "Renewal and Expansion Intelligence",
    description: "Surface customer risk and growth opportunities earlier.",
    longDescription: "Combine renewal dates, usage patterns, support context and account changes to surface risk and growth opportunities before the commercial moment is missed.",
    flow: ["Customer data", "Risk rules", "Account score", "CSM alert", "Action plan", "Escalation", "Outcome"],
    accent: "aqua",
  },
] as const;

export const engagementSteps = [
  ["01", "Diagnose", "ink"],
  ["02", "Design", "blue"],
  ["03", "Build", "coral"],
  ["04", "Measure", "lime"],
] as const;

export const derivedData = [
  "Whether the company’s business model matches your strongest customer segment",
  "Whether relevant hiring is concentrated in a function your product supports",
  "Whether its website reveals a workflow, compliance requirement or growth initiative",
  "Whether it uses a compatible, competing or complementary technology",
  "Whether past opportunities mention a recurring pain point",
  "Whether product usage indicates activation, risk or expansion potential",
  "Whether several weak signals combine into a meaningful timing event",
] as const;

export const aiControls = [
  "Source evidence is retained for important derived fields",
  "Confidence thresholds determine whether the system proceeds or requests review",
  "Deterministic rules handle ownership, suppression and critical CRM updates",
  "Human approval is included when context, brand risk or account value warrants it",
  "Outputs, failures and operating costs are monitored after launch",
] as const;

export const technologyStack = [
  ["CRM and customer systems", ["HubSpot", "Salesforce", "Zoho", "Pipedrive", "Intercom", "Spreadsheets"]],
  ["Data and enrichment", ["Clay", "Apollo", "LinkedIn Sales Navigator", "BuiltWith", "Verification providers", "First-party data"]],
  ["Automation and integration", ["n8n", "Make", "Zapier", "APIs", "Webhooks", "Serverless functions"]],
  ["Activation", ["Smartlead", "Instantly", "Apollo", "Email", "LinkedIn", "Slack", "Ad audiences"]],
  ["Measurement", ["CRM reporting", "GA4", "PostHog", "Looker Studio", "Operating dashboards"]],
] as const;

export const metricGroups = [
  ["System health", ["Required-field and enrichment coverage", "Verification and match rates", "Duplicate and exception volume", "Workflow success and failure rates", "Data and API cost per activated record"]],
  ["Team execution", ["Time from signal to owner action", "Manual research or administration hours reduced", "Routing-SLA compliance", "Accounts and contacts activated", "Experiment learning velocity"]],
  ["Commercial movement", ["Positive and qualified conversations", "Meetings accepted and held", "Opportunities created or reactivated", "Pipeline influenced where attribution is credible", "Renewal, risk or expansion actions"]],
] as const;

export const goodFit = [
  "You operate a sales-led B2B motion with a defined product and customer problem",
  "Your average customer value can justify targeted research and automation",
  "You already have CRM, campaign, product or customer data worth connecting",
  "Revenue teams spend meaningful time researching, cleaning, routing or updating records",
  "You want targeting based on more than static database filters",
  "You will define ownership, response rules and measurable acceptance criteria",
] as const;

export const checkFirst = [
  "Product-market fit or the ICP is still changing every week",
  "The offer relies on high-volume generic outreach",
  "Nobody owns CRM quality or post-launch workflow decisions",
  "The team expects automation to compensate for weak positioning or an unproven offer",
  "The required data cannot be collected lawfully or reliably",
  "Success is defined only as guaranteed revenue or meetings",
] as const;

export const faqItems = [
  ["What is an automated revenue system?", "An automated revenue system connects company, contact and customer data to business rules and revenue workflows. It helps a team decide which opportunities matter, what action should happen, who owns it and how the result is recorded."],
  ["How is this different from buying a lead list?", "A lead list is usually a static export. A revenue system maintains and enriches the data, monitors relevant changes, prioritises accounts, activates the appropriate workflow and records the outcome."],
  ["How is this different from a lead-generation agency?", "GTM Flows builds the underlying data, decision and automation infrastructure inside client-owned systems. Outbound execution can be included, but the principal deliverable is an operating system your company can retain and extend."],
  ["What is signal-led GTM?", "Signal-led GTM uses observable company, contact or first-party changes to improve the timing and priority of revenue actions. Signals are evaluated alongside customer fit and connected to predefined ownership and response rules."],
  ["Which signals should we track?", "The right signals depend on the product and buying process. Common inputs include hiring, funding, leadership changes, technology changes, website activity, product usage, previous CRM engagement, support activity and renewal milestones."],
  ["Do we need Clay?", "No. Clay is useful for many sourcing, enrichment and research workflows, but the architecture depends on your use case, current stack, data volume and operating-cost requirements."],
  ["Will AI send messages automatically?", "Only where the agreed workflow permits it. AI may classify data, conduct research or draft context, while deterministic rules and human approval protect critical updates, sensitive accounts and brand decisions."],
  ["How long does implementation take?", "A focused catalogue automation may launch within days. A connected revenue system normally begins with a defined 30-day milestone. Timing depends on data quality, access and workflow complexity."],
  ["Who owns the tools and data?", "The client owns its CRM, domains, inboxes, data-provider accounts and production automation accounts. Variable software, API and usage costs are placed in the client’s name wherever possible."],
  ["Do you guarantee meetings or revenue?", "No. We agree on objective system milestones and measure downstream commercial performance, but revenue also depends on the product, offer, market, sales execution and other external factors."],
  ["Can we start with one automation?", "Yes. The catalogue is a lower-risk entry point. A focused workflow can solve an immediate bottleneck and later connect to a broader revenue system if the measured value supports expansion."],
] as const;
