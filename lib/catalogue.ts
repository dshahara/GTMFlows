export type Complexity = "Low" | "Medium" | "High";

export type AutomationFaq = {
  question: string;
  answer: string;
};

export type AutomationContent = {
  id: number;
  name: string;
  short: string;
  slug: string;
  category: string;
  accent: "lime" | "blue" | "coral" | "violet" | "aqua" | "orange";
  setupCostMin: number;
  setupCostMax: number;
  monthlyCostMin: number;
  monthlyCostMax: number;
  implementationDaysMin: number;
  implementationDaysMax: number;
  complexity: Complexity;
  fit: string;
  threshold: string;
  tools: string[];
  details: string[];
  steps: string[];
  metric: string;
  seoTitle: string;
  metaDescription: string;
  answerSummary: string;
  faqs: AutomationFaq[];
  visible: boolean;
};

export type AutomationRecord = {
  id: number;
  sortOrder: number;
  draft: AutomationContent;
  published: AutomationContent | null;
  archivedAt: number | null;
  createdAt: number;
  updatedAt: number;
  publishedAt: number | null;
  createdBy: string | null;
  updatedBy: string | null;
  publishedBy: string | null;
};

export type PublicAutomation = AutomationContent & {
  order: number;
  setup: string;
  monthly: string;
  days: string;
};

export const CANONICAL_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://gtmflows.co").replace(/\/$/, "");
export const ADMIN_EMAILS = ["deepanshu06@gmail.com", "amrish.connect@gmail.com"];

export const categories = ["All", "Lead flow", "Research", "Sales admin", "CRM data", "Pipeline", "Signals"];
export const accentOptions = ["lime", "blue", "coral", "violet", "aqua", "orange"] as const;
export const complexityOptions = ["Low", "Medium", "High"] as const;

export const seedAutomations: AutomationContent[] = [
  {
    id: 1,
    name: "Lead-to-Rep in 5 Minutes",
    short: "Enrich, qualify and route every inbound lead automatically.",
    slug: "lead-to-rep-in-5-minutes",
    category: "Lead flow",
    accent: "lime",
    setupCostMin: 50000,
    setupCostMax: 100000,
    monthlyCostMin: 2000,
    monthlyCostMax: 15000,
    implementationDaysMin: 5,
    implementationDaysMax: 10,
    complexity: "Medium",
    fit: "Teams receiving 50+ inbound leads each month.",
    threshold: "Usually not worthwhile below 20 leads/month.",
    tools: ["HubSpot", "Zoho", "Freshsales", "Salesforce", "Pipedrive", "Slack", "Teams", "n8n", "Make", "Zapier"],
    details: [
      "Captures every new demo, contact or landing-page submission.",
      "Validates the lead's email address and phone number.",
      "Enriches the contact, company, industry, location and employee count.",
      "Checks the CRM for existing contacts, companies and open opportunities.",
      "Scores the lead using your agreed fit and qualification criteria.",
      "Assigns the correct salesperson using territory, segment or round-robin rules.",
      "Creates the CRM task and sends an immediate sales alert.",
      "Escalates or reassigns leads that are not contacted within the SLA.",
    ],
    steps: ["Validate", "Enrich", "Score", "Assign", "Alert", "Escalate"],
    metric: "Response time",
    seoTitle: "Lead Routing Automation for B2B Sales Teams | GTM Flows",
    metaDescription: "Automate inbound lead enrichment, qualification, routing, CRM tasks and SLA alerts with transparent setup and running costs.",
    answerSummary: "Lead-to-Rep in 5 Minutes enriches, qualifies and routes inbound leads to the right salesperson. It is best for teams receiving 50+ inbound leads each month, with setup from Rs. 50,000 to Rs. 1,00,000 and monthly running costs from Rs. 2,000 to Rs. 15,000. Typical implementation takes 5 to 10 days.",
    faqs: [
      { question: "What does this automation replace?", answer: "It replaces manual lead checking, enrichment, assignment and first-response reminders for inbound sales teams." },
      { question: "When is it a good fit?", answer: "It is strongest when inbound volume is high enough that slow routing or missed follow-up is already costing sales time." },
    ],
    visible: true,
  },
  {
    id: 2,
    name: "Research-to-CRM Engine",
    short: "Turn account lists into verified, sales-ready CRM records.",
    slug: "research-to-crm-engine",
    category: "Research",
    accent: "blue",
    setupCostMin: 75000,
    setupCostMax: 150000,
    monthlyCostMin: 15000,
    monthlyCostMax: 60000,
    implementationDaysMin: 7,
    implementationDaysMax: 12,
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
    seoTitle: "B2B Research-to-CRM Automation | GTM Flows",
    metaDescription: "Build a research automation that enriches accounts, verifies decision-makers and syncs approved records into your CRM.",
    answerSummary: "Research-to-CRM Engine turns account lists into verified CRM records for outbound teams. It fits teams researching 500+ accounts monthly, with setup from Rs. 75,000 to Rs. 1,50,000 and monthly running costs from Rs. 15,000 to Rs. 60,000. Typical implementation takes 7 to 12 days.",
    faqs: [
      { question: "Which teams benefit most from this?", answer: "Outbound teams with recurring account research, enrichment and CRM-entry work benefit most." },
      { question: "Why can the running cost be higher?", answer: "The monthly cost depends on data enrichment, email verification and volume-based usage across research tools." },
    ],
    visible: true,
  },
  {
    id: 3,
    name: "No-Touch CRM Updates",
    short: "Convert sales meetings into structured CRM updates and next steps.",
    slug: "no-touch-crm-updates",
    category: "Sales admin",
    accent: "coral",
    setupCostMin: 40000,
    setupCostMax: 80000,
    monthlyCostMin: 2000,
    monthlyCostMax: 15000,
    implementationDaysMin: 3,
    implementationDaysMax: 7,
    complexity: "Low",
    fit: "Teams conducting 40+ sales meetings each month.",
    threshold: "Check your meeting tool's native features first.",
    tools: ["Zoom", "Google Meet", "Fireflies", "Fathom", "Grain", "HubSpot", "Zoho", "Salesforce", "Freshsales"],
    details: [
      "Captures the sales meeting transcript and recording metadata.",
      "Creates a structured summary of the customer's situation and requirements.",
      "Extracts pain points, stakeholders, objections and agreed next steps.",
      "Updates the relevant contact, company and opportunity records.",
      "Populates agreed qualification and deal fields with confidence controls.",
      "Creates follow-up tasks and drafts the post-meeting email.",
      "Flags uncertain or missing information for salesperson approval.",
    ],
    steps: ["Capture", "Summarise", "Extract", "Update", "Task", "Draft"],
    metric: "Admin hours saved",
    seoTitle: "Sales Meeting to CRM Update Automation | GTM Flows",
    metaDescription: "Turn meeting transcripts into CRM summaries, next steps, tasks and follow-up drafts without manual sales admin.",
    answerSummary: "No-Touch CRM Updates converts sales meeting transcripts into structured CRM updates and next steps. It fits teams conducting 40+ sales meetings each month, with setup from Rs. 40,000 to Rs. 80,000 and monthly running costs from Rs. 2,000 to Rs. 15,000. Typical implementation takes 3 to 7 days.",
    faqs: [
      { question: "Does it update the CRM automatically?", answer: "It can update agreed fields automatically while flagging uncertain information for salesperson approval." },
      { question: "What should be checked before building?", answer: "Check whether your meeting recorder or CRM already handles the fields and approvals you need." },
    ],
    visible: true,
  },
  {
    id: 4,
    name: "No Lead Left Behind",
    short: "Enforce follow-up SLAs without manager intervention.",
    slug: "no-lead-left-behind",
    category: "Lead flow",
    accent: "violet",
    setupCostMin: 35000,
    setupCostMax: 70000,
    monthlyCostMin: 1000,
    monthlyCostMax: 6000,
    implementationDaysMin: 3,
    implementationDaysMax: 7,
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
    seoTitle: "Lead Follow-Up SLA Automation | GTM Flows",
    metaDescription: "Automate lead response timers, reminders, manager alerts, reassignment and CRM follow-up tasks.",
    answerSummary: "No Lead Left Behind enforces follow-up SLAs for assigned leads. It fits multi-rep sales teams with inconsistent response times, with setup from Rs. 35,000 to Rs. 70,000 and monthly running costs from Rs. 1,000 to Rs. 6,000. Typical implementation takes 3 to 7 days.",
    faqs: [
      { question: "Can it reassign untouched leads?", answer: "Yes, it can reassign leads using the escalation or round-robin rules agreed during setup." },
      { question: "What needs to exist first?", answer: "Lead ownership rules and response-time SLAs should be clear before launch." },
    ],
    visible: true,
  },
  {
    id: 5,
    name: "Always-Clean CRM",
    short: "Detect duplicates, missing data and stale records automatically.",
    slug: "always-clean-crm",
    category: "CRM data",
    accent: "aqua",
    setupCostMin: 50000,
    setupCostMax: 100000,
    monthlyCostMin: 2000,
    monthlyCostMax: 15000,
    implementationDaysMin: 5,
    implementationDaysMax: 10,
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
    seoTitle: "CRM Data Quality Automation | GTM Flows",
    metaDescription: "Detect CRM duplicates, missing fields, stale records and risky data issues with automated reports and approval queues.",
    answerSummary: "Always-Clean CRM detects duplicates, missing fields and stale records automatically. It fits companies with 5,000+ CRM records or recurring data issues, with setup from Rs. 50,000 to Rs. 1,00,000 and monthly running costs from Rs. 2,000 to Rs. 15,000. Typical implementation takes 5 to 10 days.",
    faqs: [
      { question: "Does it merge CRM records automatically?", answer: "Risky merges can be routed through a human approval queue so data owners stay in control." },
      { question: "What should be agreed first?", answer: "You should define merge rules, required fields and record ownership rules before publishing changes." },
    ],
    visible: true,
  },
  {
    id: 6,
    name: "Pipeline Revival",
    short: "Find and prioritise opportunities already hiding in your CRM.",
    slug: "pipeline-revival",
    category: "Pipeline",
    accent: "orange",
    setupCostMin: 60000,
    setupCostMax: 125000,
    monthlyCostMin: 3000,
    monthlyCostMax: 25000,
    implementationDaysMin: 7,
    implementationDaysMax: 10,
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
    seoTitle: "Closed-Lost Pipeline Revival Automation | GTM Flows",
    metaDescription: "Find stalled or closed-lost deals, detect new signals, draft re-engagement and track reopened opportunities.",
    answerSummary: "Pipeline Revival finds and prioritises stalled or closed-lost CRM opportunities. It fits teams with a meaningful database of old deals, with setup from Rs. 60,000 to Rs. 1,25,000 and monthly running costs from Rs. 3,000 to Rs. 25,000. Typical implementation takes 7 to 10 days.",
    faqs: [
      { question: "What data does this need?", answer: "It needs reliable loss reasons, last activity history and enough CRM records to create useful revival segments." },
      { question: "Does it send emails automatically?", answer: "It can create re-engagement drafts for approval and route positive replies back to the right owner." },
    ],
    visible: true,
  },
  {
    id: 7,
    name: "Deal Follow-Up Autopilot",
    short: "Keep every proposal connected to a clear next action.",
    slug: "deal-follow-up-autopilot",
    category: "Sales admin",
    accent: "lime",
    setupCostMin: 35000,
    setupCostMax: 75000,
    monthlyCostMin: 1000,
    monthlyCostMax: 6000,
    implementationDaysMin: 3,
    implementationDaysMax: 7,
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
    seoTitle: "Proposal Follow-Up Automation | GTM Flows",
    metaDescription: "Automate proposal follow-up dates, reminders, drafts, escalation and CRM next-action fields.",
    answerSummary: "Deal Follow-Up Autopilot keeps proposals connected to a next action. It fits teams sending 20+ proposals or quotations monthly, with setup from Rs. 35,000 to Rs. 75,000 and monthly running costs from Rs. 1,000 to Rs. 6,000. Typical implementation takes 3 to 7 days.",
    faqs: [
      { question: "Which proposal workflows fit this?", answer: "It works best when proposal or quotation sending follows a repeatable process with clear next-step rules." },
      { question: "Can managers see stalled proposals?", answer: "Yes, the automation can produce a manager view of proposals that need attention." },
    ],
    visible: true,
  },
  {
    id: 8,
    name: "Hot Account Alerts",
    short: "Tell sales when a qualified account demonstrates buying intent.",
    slug: "hot-account-alerts",
    category: "Signals",
    accent: "coral",
    setupCostMin: 75000,
    setupCostMax: 150000,
    monthlyCostMin: 10000,
    monthlyCostMax: 50000,
    implementationDaysMin: 7,
    implementationDaysMax: 15,
    complexity: "High",
    fit: "Companies with meaningful website, product or first-party activity.",
    threshold: "Not suitable when traffic is too low to produce usable signals.",
    tools: ["GA4", "PostHog", "Segment", "HubSpot", "Zoho", "Salesforce", "Visitor identification tools", "Slack", "Teams"],
    details: [
      "Captures agreed website, pricing-page, product or campaign activity.",
      "Resolves the visitor or activity to an account where the data allows it.",
      "Checks the CRM for the account's owner, history and open opportunities.",
      "Combines account fit and behavioural intent into one priority score.",
      "Filters out low-confidence signals before they reach the sales team.",
      "Alerts the appropriate salesperson with context and a recommended action.",
      "Creates the CRM task and tracks whether the signal was actioned.",
    ],
    steps: ["Capture", "Resolve", "Match", "Score", "Alert", "Track"],
    metric: "Alert-to-action time",
    seoTitle: "B2B Buying Intent Alert Automation | GTM Flows",
    metaDescription: "Turn website, product and first-party activity into qualified account alerts for sales teams.",
    answerSummary: "Hot Account Alerts notifies sales when a qualified account shows buying intent. It fits companies with meaningful website, product or first-party activity, with setup from Rs. 75,000 to Rs. 1,50,000 and monthly running costs from Rs. 10,000 to Rs. 50,000. Typical implementation takes 7 to 15 days.",
    faqs: [
      { question: "What signals can trigger alerts?", answer: "Website, pricing-page, product, campaign or first-party activity can be used when the data is available." },
      { question: "When should this wait?", answer: "It should wait if traffic or product activity is too low to produce reliable sales signals." },
    ],
    visible: true,
  },
  {
    id: 9,
    name: "Lead Source & CRM Sync",
    short: "Preserve accurate source data across campaigns, forms and CRM.",
    slug: "lead-source-crm-sync",
    category: "CRM data",
    accent: "blue",
    setupCostMin: 40000,
    setupCostMax: 80000,
    monthlyCostMin: 1000,
    monthlyCostMax: 8000,
    implementationDaysMin: 5,
    implementationDaysMax: 8,
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
    seoTitle: "Lead Source and CRM Attribution Sync | GTM Flows",
    metaDescription: "Preserve lead source, UTM, form and campaign data across CRM records, ad platforms and analytics tools.",
    answerSummary: "Lead Source & CRM Sync preserves accurate attribution across campaigns, forms and CRM records. It fits companies generating leads through multiple forms, campaigns or landing pages, with setup from Rs. 40,000 to Rs. 80,000 and monthly running costs from Rs. 1,000 to Rs. 8,000. Typical implementation takes 5 to 8 days.",
    faqs: [
      { question: "What problem does this solve?", answer: "It prevents campaign and source data from being lost, overwritten or disconnected from CRM records." },
      { question: "Which tools are commonly supported?", answer: "HubSpot, Zoho, Salesforce, Webflow, WordPress, Typeform, Google Ads, LinkedIn Ads, GA4 and spreadsheets are supported." },
    ],
    visible: true,
  },
  {
    id: 10,
    name: "Renewal & Expansion Alerts",
    short: "Surface renewal risk and expansion opportunities before they are missed.",
    slug: "renewal-expansion-alerts",
    category: "Pipeline",
    accent: "violet",
    setupCostMin: 60000,
    setupCostMax: 125000,
    monthlyCostMin: 3000,
    monthlyCostMax: 20000,
    implementationDaysMin: 7,
    implementationDaysMax: 12,
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
    seoTitle: "Renewal and Expansion Alert Automation | GTM Flows",
    metaDescription: "Monitor renewal windows, risk signals and expansion opportunities across billing, CRM and product data.",
    answerSummary: "Renewal & Expansion Alerts surfaces renewal risk and expansion opportunities before they are missed. It fits subscription businesses with 50+ active customers, with setup from Rs. 60,000 to Rs. 1,25,000 and monthly running costs from Rs. 3,000 to Rs. 20,000. Typical implementation takes 7 to 12 days.",
    faqs: [
      { question: "What data is required?", answer: "The automation needs usable renewal, billing, product usage or support data to identify useful account signals." },
      { question: "Who receives the alerts?", answer: "Alerts and tasks can be routed to the correct account owner, renewal owner or customer-facing team." },
    ],
    visible: true,
  },
];

export function toPublicAutomation(content: AutomationContent, order = content.id): PublicAutomation {
  return {
    ...content,
    order,
    setup: formatCostRange(content.setupCostMin, content.setupCostMax),
    monthly: formatCostRange(content.monthlyCostMin, content.monthlyCostMax),
    days: formatDayRange(content.implementationDaysMin, content.implementationDaysMax),
  };
}

export function formatCostRange(min: number, max: number) {
  return `${formatCompactRupees(min)}–${formatCompactRupees(max)}`;
}

export function formatDayRange(min: number, max: number) {
  return min === max ? `${min} days` : `${min}–${max} days`;
}

export function formatFullRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function formatCompactRupees(value: number) {
  if (value >= 100000) {
    const lakhs = value / 100000;
    return `₹${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}L`;
  }
  if (value >= 1000) {
    const thousands = value / 1000;
    return `₹${Number.isInteger(thousands) ? thousands : thousands.toFixed(1).replace(/0$/, "")}K`;
  }
  return formatFullRupees(value);
}
