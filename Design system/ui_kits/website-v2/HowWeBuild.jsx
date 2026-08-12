const QUESTIONS = [
  ['01', 'What revenue decision are we improving?', 'Which account, lead, opportunity or customer should receive attention?', 'var(--lime)'],
  ['02', 'What evidence should influence that decision?', 'Which first-party, third-party or derived data points are credible and affordable?', 'var(--aqua)'],
  ['03', 'How will the decision be made?', 'What rules, weights, exclusions, confidence levels or approval steps are required?', 'var(--blue)'],
  ['04', 'What action follows?', 'Which owner, channel, workflow and response window apply?', 'var(--violet)'],
  ['05', 'How will the system learn?', 'Which downstream outcomes return to the model and improve future prioritisation?', 'var(--coral)']
];

const ARCH = [
  ['Sources', 'CRM · Product · Website · Conversations · Public data · Data providers', 'var(--aqua)'],
  ['Foundation', 'Identity resolution · Standardisation · Enrichment · Deduplication · Governance', 'var(--lime)'],
  ['Decision layer', 'ICP fit · Timing · Contact relevance · Potential value · Confidence', 'var(--blue)'],
  ['Orchestration', 'Ownership · Priority · Channel · SLA · Approval · Escalation', 'var(--violet)'],
  ['Activation', 'CRM tasks · Outbound · Alerts · Ads · Customer workflows', 'var(--coral)'],
  ['Feedback', 'Replies · Meetings · Opportunities · Usage · Renewal · Exceptions', 'var(--orange)']
];

const PHASES = [
  { n: 'Phase 0', name: 'Infrastructure and data readiness', acc: 'var(--aqua)',
    obj: 'Create a stable operating environment before increasing volume or adding automation.',
    does: ['Audit the CRM, spreadsheets, enrichment providers and sending tools already in use', 'Document integrations, credentials, field ownership and current points of failure', 'Configure a CRM, Clay base, Airtable or controlled spreadsheet when no reliable operating layer exists', 'Set up outbound domains and inboxes when outbound execution is included', 'Configure SPF, DKIM and DMARC, sending limits and mailbox rotation', 'Establish naming conventions, deduplication logic and data-retention rules', 'Create the initial tracking dashboard and system documentation'],
    del: ['A working, documented GTM stack with client-owned accounts and a clear “system ready” checklist.'] },
  { n: 'Phase 1', name: 'Market definition and TAM design', acc: 'var(--lime)',
    obj: 'Define who the company should pursue and convert that strategy into usable account data.',
    does: ['Analyse the strongest closed-won customers, weak-fit customers and lost opportunities', 'Interview commercial stakeholders when CRM history is incomplete', 'Define firmographic, geographic, technographic and commercial attributes', 'Create two or three ICP tiers with must-have, preferred and exclusion criteria', 'Source the total addressable market from appropriate databases and public sources', 'Break the TAM into segments only where the pain, offer or buying motion changes', 'Add the fields required for later scoring and activation'],
    del: ['Written ICP and exclusion criteria', 'Raw TAM with source and refresh information', 'Named market segments with commercial rationale', 'Data dictionary for key targeting fields'] },
  { n: 'Phase 2', name: 'Scoring, signals and target selection', acc: 'var(--blue)',
    obj: 'Determine which accounts deserve attention now.',
    does: ['Build a company-fit score using weighted ICP attributes', 'Define live signals connected to purchase, expansion, reactivation or churn', 'Monitor sources such as hiring, funding, leadership changes, technology changes, website activity, product events and CRM history', 'Set the refresh frequency and cost controls for each data source', 'Combine fit and timing without hiding the logic inside an unexplained score', 'Establish thresholds based on the team’s real weekly capacity', 'Produce a current working list instead of leaving thousands of scored accounts unused'],
    del: ['Fit and timing scorecards', 'Signal source and refresh map', 'Prioritised weekly or monthly account queue', 'Exception report for records that cannot be scored confidently'] },
  { n: 'Phase 3', name: 'Buying committee, enrichment and message context', acc: 'var(--violet)',
    obj: 'Identify the right people and provide enough context for relevant engagement.',
    does: ['Define buyer, champion, influencer and potential blocker roles for each segment', 'Find one to three relevant contacts per account', 'Verify work emails using sequential provider checks where appropriate', 'Enrich role, seniority, tenure and available contact information', 'Collect useful context from company announcements, hiring, public initiatives, CRM history and relevant professional activity', 'Separate evidence that should influence a message from data that merely creates noise', 'Combine company priority with contact relevance to determine activation order'],
    del: ['Enriched and verified buying committee', 'Contact-level relevance score', 'Research summary and evidence fields', 'Final person-level activation queue'] },
  { n: 'Phase 4', name: 'Plays, orchestration and activation', acc: 'var(--coral)',
    obj: 'Turn qualified data into a coordinated action across the appropriate channel.',
    does: ['Develop distinct message angles based on segment, problem and signal context', 'Define what the system may draft automatically and what requires human approval', 'Create test variants with a clear hypothesis, audience and success measure', 'Map leads, evidence and copy to the correct campaign or sales workflow', 'Configure cadence, sending schedules, suppression rules and deliverability controls', 'Coordinate email, LinkedIn, CRM tasks, Slack alerts and advertising where appropriate', 'Define who owns each trigger, what happens next and the expected response time', 'Record activity and status changes back in the CRM'],
    del: ['Approved play and experiment matrix', 'Live CRM and campaign workflows', 'Routing, ownership and escalation rules', 'Quality-assurance and launch report'] },
  { n: 'Phase 5', name: 'Measurement and continuous improvement', acc: 'var(--orange)',
    obj: 'Learn which combinations of account, signal, message and channel create commercial movement.',
    does: ['Monitor data coverage, enrichment accuracy, bounce risk and workflow failures', 'Track positive replies, qualified meetings, opportunities and pipeline where attribution is credible', 'Compare results by segment, signal, angle and channel', 'Pause weak variants and expand evidence-supported winners', 'Refresh exhausted audiences and maintain suppression lists', 'Review CRM exceptions and repair broken handoffs', 'Document what changed, why it changed and what will be tested next'],
    del: ['Live operating dashboard', 'Biweekly performance and system-health report', 'Experiment decisions and next-test backlog', 'Updated data, routing and workflow documentation'] }
];

const STANDARDS = ['Client-owned accounts and documented access', 'Reversible updates for sensitive CRM workflows', 'Test records and acceptance criteria before production activation', 'Idempotency and duplicate-action protection where applicable', 'Suppression, consent and do-not-contact controls', 'Error queues and visible exception handling', 'Cost limits for enrichment, AI and API usage', 'Change documentation and named workflow ownership', 'Human review at high-risk or high-value decision points'];

function HowWeBuildPage() {
  const { Nav, Footer, FinalCta, PageHero } = window.GTMSite;
  return <React.Fragment>
    <Nav />
    <PageHero crumb="How We Build" label="How we build" title="Revenue automation starts with a decision—not a tool."
      body="Our delivery process connects commercial strategy, data architecture and workflow execution. Every build begins by identifying the decision the system must improve, the evidence required to make it and the action that should follow." />

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="head-grid">
        <span className="section-number">01 / The design questions</span>
        <h2 className="big">Before building, we answer five questions.</h2>
        <p className="lede">Each one narrows the system to a decision it can genuinely improve.</p>
      </div>
      <div className="qlist">
        {QUESTIONS.map(([n, q, sub, acc]) => <article key={n} style={{ '--acc': acc }}>
          <span>{n}</span><h3>{q}</h3><p>{sub}</p>
        </article>)}
      </div>
    </section></div>

    <section className="band band-dark"><div className="shell">
      <div className="head-grid">
        <span className="section-number light">02 / System architecture</span>
        <h2 className="big">Six layers, one direction of travel.</h2>
        <p className="lede light">Every engagement is scoped around a specific commercial bottleneck. The exact tools vary, but the architecture does not.</p>
      </div>
      <div className="arch">
        {ARCH.map(([t, items, acc], i) => <React.Fragment key={t}>
          <div style={{ '--acc': acc }}><strong>{t}</strong><p>{items}</p></div>
          {i < ARCH.length - 1 ? <i>↓</i> : null}
        </React.Fragment>)}
      </div>
    </div></section>

    <div className="shell"><section className="band">
      <div className="head-grid">
        <span className="section-number">03 / How the system is built</span>
        <h2 className="big">The work behind a production-ready revenue engine.</h2>
        <p className="lede">Every engagement is scoped around a specific commercial bottleneck. The exact tools vary, but the system is built through five connected phases.</p>
      </div>
      <div className="phases">
        {PHASES.map(p => <article className="phase" key={p.n} style={{ '--acc': p.acc }}>
          <div className="phase-head">
            <span>{p.n}</span>
            <h3>{p.name}</h3>
            <p><b>Objective.</b> {p.obj}</p>
          </div>
          <div className="phase-body">
            <span>What we do</span>
            <ul>{p.does.map(d => <li key={d}>{d}</li>)}</ul>
            <div className="deliverable">
              <span>{p.del.length > 1 ? 'Deliverables' : 'Deliverable'}</span>
              <ul>{p.del.map(d => <li key={d}>{d}</li>)}</ul>
            </div>
          </div>
        </article>)}
      </div>
    </section></div>

    <section className="band band-dark"><div className="shell">
      <div className="head-grid">
        <span className="section-number light">04 / Build standards</span>
        <h2 className="big">What every build carries by default.</h2>
      </div>
      <ul className="two-list dark">{STANDARDS.map(s => <li key={s}>{s}</li>)}</ul>
    </div></section>

    <FinalCta n="05" />
    <Footer />
  </React.Fragment>;
}

window.GTMSite = window.GTMSite || {};
Object.assign(window.GTMSite, { HowWeBuildPage });
