const SYSDETAIL = [
  ['01', 'Signal-to-sequence pipeline engine', 'Continuously identify suitable accounts, monitor relevant changes, find the buying committee and activate the right outbound play based on fit and timing.', ['TAM', 'Enrichment', 'Fit score', 'Signal monitoring', 'Contact verification', 'Research', 'Campaign or sales task', 'CRM feedback'], 'var(--lime)'],
  ['02', 'Intelligent inbound response', 'Enrich every form submission, calculate fit and urgency, route it to the correct owner and enforce response SLAs without adding unnecessary form fields.', ['Form or product event', 'Identity resolution', 'Enrichment', 'Qualification', 'Routing', 'Alert', 'Follow-up tracking'], 'var(--blue)'],
  ['03', 'CRM data foundation', 'Continuously detect duplicates, missing fields, stale contacts and conflicting records so teams and automations operate from more reliable data.', ['CRM scan', 'Standardisation', 'Duplicate detection', 'Enrichment', 'Approval rules', 'Update', 'Exception reporting'], 'var(--coral)'],
  ['04', 'Pipeline reactivation', 'Find closed-lost, stalled or previously engaged accounts with a credible new reason to restart the conversation.', ['CRM history', 'Eligibility rules', 'New signal', 'Account reprioritisation', 'Context creation', 'Owner assignment', 'Measurement'], 'var(--violet)'],
  ['05', 'Renewal and expansion intelligence', 'Combine renewal dates, usage patterns, support context and account changes to surface risk and growth opportunities before the commercial moment is missed.', ['Customer data', 'Risk and expansion rules', 'Account score', 'CSM alert', 'Action plan', 'Escalation', 'Outcome tracking'], 'var(--aqua)']
];

const DERIVED = ['Whether the company’s business model matches your strongest customer segment', 'Whether relevant hiring is concentrated in a function your product supports', 'Whether its website reveals a workflow, compliance requirement or growth initiative', 'Whether it uses a compatible, competing or complementary technology', 'Whether past opportunities mention a recurring pain point', 'Whether product usage indicates activation, risk or expansion potential', 'Whether multiple weak signals combine into a meaningful timing event'];

const SIGNAL_LADDER = [
  ['Generic signal', 'Company raised funding', 'var(--line)'],
  ['More useful signal', 'Company raised funding + is hiring its first RevOps leader', 'var(--aqua)'],
  ['Defensible signal model', 'Company raised funding + is hiring its first RevOps leader + uses HubSpot + has expanded into the US + previously engaged with your integration content', 'var(--lime)']
];

const CONTROLS = ['Source evidence is retained for important derived fields', 'Confidence thresholds determine whether the system proceeds or requests review', 'Deterministic rules handle ownership, suppression, compliance and critical CRM updates', 'Human approval is included when context, brand risk or account value warrants it', 'Outputs, failures and operating costs are monitored after launch'];

const STACK = [
  ['CRM and customer systems', ['HubSpot', 'Salesforce', 'Zoho', 'Pipedrive', 'Intercom', 'Spreadsheets']],
  ['Data and enrichment', ['Clay', 'Apollo', 'LinkedIn Sales Navigator', 'BuiltWith', 'Email verification providers', 'Public and first-party data sources']],
  ['Automation and integration', ['n8n', 'Make', 'Zapier', 'APIs', 'Webhooks', 'Serverless functions']],
  ['Activation', ['Smartlead', 'Instantly', 'Apollo', 'Email', 'LinkedIn', 'Slack', 'Advertising audiences']],
  ['Measurement', ['CRM reporting', 'GA4', 'PostHog', 'Looker Studio', 'Custom operating dashboards']]
];

const METRICS = [
  ['System health', ['Required-field and enrichment coverage', 'Verification and match rates', 'Duplicate and exception volume', 'Workflow success and failure rates', 'Data and API cost per activated record']],
  ['Team execution', ['Time from signal to owner action', 'Manual research or administration hours reduced', 'Routing-SLA compliance', 'Accounts and contacts activated per period', 'Experiment launch and learning velocity']],
  ['Commercial movement', ['Positive reply and qualified-conversation rates', 'Meetings accepted and held', 'Opportunities created or reactivated', 'Pipeline influenced where attribution is credible', 'Renewal, risk or expansion actions completed']]
];

const GOOD_FIT = ['You operate a sales-led B2B motion with a defined product and customer problem', 'Your average customer value can justify targeted research and automation', 'You already have CRM, campaign, product or customer data worth connecting', 'Revenue teams spend meaningful time researching, cleaning, routing or updating records', 'You want targeting based on more than static database filters', 'You are willing to define ownership, response rules and measurable acceptance criteria'];
const CHECK_FIRST = ['Product-market fit or the ICP is still changing every week', 'The offer relies on high-volume generic outreach', 'Nobody owns CRM quality or post-launch workflow decisions', 'The team expects automation to compensate for weak positioning or an unproven offer', 'The required data cannot be collected lawfully or reliably', 'Success is defined only as guaranteed revenue or meetings'];

function RevenueSystemsPage() {
  const { Nav, Footer, FinalCta, PageHero } = window.GTMSite;
  return <React.Fragment>
    <Nav />
    <PageHero crumb="Revenue Systems" label="Systems we build" title="Start with one revenue bottleneck. Connect the system as value becomes visible."
      body="Each system solves a defined commercial problem end to end. They share the same foundation, so a second system connects to the first instead of replacing it." />

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="sysdetail">
        {SYSDETAIL.map(([n, name, desc, flow, acc]) => <article key={n} style={{ '--acc': acc }}>
          <div><span>{n}</span><h3>{name}</h3></div>
          <div>
            <p>{desc}</p>
            <em style={{ marginTop: 20 }}>Typical flow</em>
            <div className="chain">
              {flow.map((f, i) => <span key={f} className="chain-item"><i>{f}</i>{i < flow.length - 1 ? <b>→</b> : null}</span>)}
            </div>
          </div>
        </article>)}
      </div>
      <div style={{ marginTop: 28 }}><a className="button button-dark" href="../website/index.html">Browse individual automations, delivery estimates and running costs →</a></div>
    </section></div>

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="head-grid">
        <span className="section-number">01 / Unique data</span>
        <h2 className="big">The strongest targeting criteria are rarely available as a standard database filter.</h2>
        <p className="lede">Employee count, industry and funding are accessible to every competitor. They help define a market, but they do not create much advantage on their own. We help you create data points that are specific to your product, customers and sales motion.</p>
      </div>
      <ul className="two-list">{DERIVED.map(d => <li key={d}>{d}</li>)}</ul>
      <div style={{ display: 'grid', gap: 10, marginTop: 44 }}>
        {SIGNAL_LADDER.map(([k, v, acc]) => <div key={k} style={{ border: '1px solid var(--line)', borderLeft: '6px solid ' + acc, borderRadius: 16, background: 'var(--white)', padding: '20px 24px' }}>
          <span style={{ display: 'block', font: '700 10px var(--mono)', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 9 }}>{k}</span>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}>{v}</p>
        </div>)}
      </div>
      <p className="callout" style={{ maxWidth: 900 }}>The objective is not to collect the most data. <b>It is to identify the smallest set of data points that improves a real revenue decision.</b></p>
    </section></div>

    <section className="band band-dark"><div className="shell">
      <div className="head-grid">
        <span className="section-number light">02 / AI with control</span>
        <h2 className="big">Use AI where interpretation is needed. Use rules where consistency matters.</h2>
        <p className="lede light">AI is useful for classifying websites, extracting information from unstructured text, summarising account context and drafting research-based messages. It should not quietly become the source of truth for critical revenue data.</p>
      </div>
      <ul className="two-list dark">{CONTROLS.map(c => <li key={c}>{c}</li>)}</ul>
      <p style={{ marginTop: 36, fontSize: 22, lineHeight: 1.4, letterSpacing: '-.035em', fontWeight: 600, maxWidth: 760 }}>The goal is not maximum automation. <span style={{ color: 'var(--lime)' }}>It is the right balance of speed, reliability and human judgment.</span></p>
    </div></section>

    <div className="shell"><section className="band">
      <div className="head-grid">
        <span className="section-number">03 / Works with your stack</span>
        <h2 className="big">Built around the tools you already own.</h2>
        <p className="lede">We select tools based on data coverage, workflow requirements, reliability and total running cost. The architecture is documented, and variable-use accounts remain in your company’s name.</p>
      </div>
      <div className="stack-grid">
        {STACK.map(([t, items]) => <div className="stack-row" key={t}>
          <span>{t}</span>
          <div>{items.map(i => <i key={i}>{i}</i>)}</div>
        </div>)}
      </div>
      <p style={{ marginTop: 22, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6, maxWidth: 720 }}>Supported tools depend on the workflow and the access available. We do not recommend adding software until the decision logic and expected operating cost are understood.</p>
    </section></div>

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="head-grid">
        <span className="section-number">04 / Measurement</span>
        <h2 className="big">Measure the decisions and actions the system can genuinely influence.</h2>
        <p className="lede">We establish a baseline before deployment and agree on the measures relevant to the workflow.</p>
      </div>
      <div className="cols3">
        {METRICS.map(([t, items]) => <div className="col-card" key={t}>
          <h3>{t}</h3>
          <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>
        </div>)}
      </div>
      <p style={{ marginTop: 22, color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6, maxWidth: 720 }}>We do not treat open rate, records processed or messages sent as business outcomes on their own.</p>
    </section></div>

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="head-grid">
        <span className="section-number">05 / Is GTM Flows a fit?</span>
        <h2 className="big">Best for teams with a valuable revenue process that has outgrown manual execution.</h2>
      </div>
      <div className="fit-grid">
        <div className="fit-col" style={{ '--acc': 'var(--lime)' }}>
          <span className="section-number">Good fit</span>
          <h3>Where this works</h3>
          <ul>{GOOD_FIT.map(f => <li key={f}><b>✓</b>{f}</li>)}</ul>
        </div>
        <div className="fit-col" style={{ '--acc': 'var(--coral)' }}>
          <span className="section-number">Check first</span>
          <h3>Worth resolving first</h3>
          <ul>{CHECK_FIRST.map(f => <li key={f}><b>—</b>{f}</li>)}</ul>
        </div>
      </div>
    </section></div>

    <FinalCta n="06" />
    <Footer />
  </React.Fragment>;
}

window.GTMSite = window.GTMSite || {};
Object.assign(window.GTMSite, { RevenueSystemsPage });
