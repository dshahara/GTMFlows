window.GTMSite = window.GTMSite || {};
Object.assign(window.GTMSite, {
NAV: ['Revenue Systems', 'How We Build', 'Automation Catalogue', 'ROI Calculator', 'Contact'],
HERO_NODES: [
  ['01', 'Account detected', 'var(--lime)'],
  ['02', 'Fit scored', 'var(--aqua)'],
  ['03', 'Signal verified', 'var(--violet)'],
  ['04', 'Buyer identified', 'var(--orange)'],
  ['05', 'Play activated', 'var(--coral)']
],
HERO_FACTS: [
  ['Signal', 'New VP Sales + SDR hiring'],
  ['Buyer', 'Verified'],
  ['Next action', 'High-context outbound'],
  ['Owner', 'Enterprise SDR']
],
CAPABILITIES: ['Data foundation', 'ICP and TAM', 'Signal tracking', 'Lead scoring', 'CRM activation', 'Lifecycle automation'],
GAP: [
  ['Static account lists', 'Continuously ranked accounts'],
  ['Disconnected signals', 'Signals checked against ICP fit'],
  ['Manual account research', 'Automated research with supporting evidence'],
  ['Alerts without ownership', 'Defined owner, action and response time'],
  ['Campaign activity in separate tools', 'Outcomes recorded in the CRM']
],
STAGES: [
  { key: 'sources', label: 'Sources', chips: 'CRM · Product · Website', acc: 'var(--aqua)', desc: 'Revenue data as it already exists across the stack.',
    input: 'A CRM record, a product event and a website session for the same company', decision: 'Is this one account or several fragments?', output: 'A single resolved account record' },
  { key: 'foundation', label: 'Foundation', chips: 'Clean · Match · Enrich', acc: 'var(--lime)', desc: 'Standardise, deduplicate and enrich revenue data.',
    input: 'Resolved account missing industry and headcount', decision: 'Which fields are required before scoring can run?', output: 'Enriched record with source and refresh date' },
  { key: 'decision', label: 'Decision', chips: 'Fit · Timing · Value', acc: 'var(--blue)', desc: 'Score fit, timing, contact relevance and potential value.',
    input: 'Enriched account plus a hiring and leadership change', decision: 'Does fit and timing clear the weekly capacity threshold?', output: 'Fit 91/100, timing confirmed, account queued' },
  { key: 'orchestration', label: 'Orchestration', chips: 'Owner · Action · SLA', acc: 'var(--violet)', desc: 'Decide who acts, what happens and how quickly.',
    input: 'Prioritised account in the enterprise segment', decision: 'Which owner, channel and response window apply?', output: 'Assigned to an enterprise SDR with a 24-hour SLA' },
  { key: 'activation', label: 'Activation', chips: 'Sales · Growth · CS', acc: 'var(--coral)', desc: 'Trigger CRM tasks, outbound plays, alerts and customer workflows.',
    input: 'Assigned account with research and evidence fields', decision: 'Draft automatically or route for human approval?', output: 'CRM task, outbound play and Slack alert created' },
  { key: 'feedback', label: 'Feedback', chips: 'Replies · Pipeline', acc: 'var(--orange)', desc: 'Use outcomes to improve prioritisation and future plays.',
    input: 'A positive reply and a created opportunity', decision: 'Which signal and angle combination produced movement?', output: 'Updated weights and a next-test backlog' }
],
EXAMPLE: [
  ['01', 'Signal captured', 'New VP Sales + six open SDR roles', 'var(--lime)'],
  ['02', 'Context added', 'Company matches the ICP and recently expanded into the US', 'var(--aqua)'],
  ['03', 'Buying committee identified', 'VP Sales, Head of RevOps and Growth leader verified', 'var(--violet)'],
  ['04', 'Action selected', 'High-context outbound play assigned to the correct rep', 'var(--orange)'],
  ['05', 'System updated', 'Research, task, message context and status recorded in the CRM', 'var(--coral)']
],
SYSTEMS: [
  ['01', 'Signal-to-Sequence Engine', 'Find and activate accounts based on fit and timing.', 'var(--lime)'],
  ['02', 'Intelligent Inbound Response', 'Enrich, qualify and route incoming demand automatically.', 'var(--blue)'],
  ['03', 'CRM Data Foundation', 'Continuously repair missing, stale and duplicate records.', 'var(--coral)'],
  ['04', 'Pipeline Reactivation', 'Revisit stalled accounts when a credible new reason appears.', 'var(--violet)'],
  ['05', 'Renewal and Expansion Intelligence', 'Surface customer risk and growth opportunities earlier.', 'var(--aqua)']
],
ENGAGEMENT: [
  ['01', 'Diagnose', 'var(--ink)'],
  ['02', 'Design', 'var(--blue)'],
  ['03', 'Build', 'var(--coral)'],
  ['04', 'Measure', 'var(--lime)']
]
});
