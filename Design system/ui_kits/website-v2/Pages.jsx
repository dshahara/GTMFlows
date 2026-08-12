const FAQS = [
  ['What is an automated revenue system?', 'An automated revenue system connects company, contact and customer data to business rules and revenue workflows. It helps a team decide which opportunities matter, what action should happen, who owns it and how the result is recorded.'],
  ['How is this different from buying a lead list?', 'A lead list is usually a static export. A revenue system defines the market, maintains and enriches the data, monitors relevant changes, prioritises accounts and activates the appropriate workflow. It also records outcomes so targeting can improve over time.'],
  ['How is this different from a lead-generation agency?', 'GTM Flows builds the underlying data, decision and automation infrastructure inside client-owned systems. Outbound execution can be part of the engagement, but the principal deliverable is a documented operating system your company can retain and extend.'],
  ['What is signal-led GTM?', 'Signal-led GTM uses observable company, contact or first-party changes to improve the timing and priority of revenue actions. Signals are evaluated alongside customer fit and connected to predefined ownership and response rules.'],
  ['Which signals should we track?', 'The right signals depend on the product and buying process. Common inputs include hiring, funding, leadership changes, technology changes, website activity, product usage, previous CRM engagement, support activity and renewal milestones. We prioritise signals that can change a real decision.'],
  ['Do we need Clay?', 'No. Clay is useful for many sourcing, enrichment and research workflows, but the architecture depends on your use case, current stack, data volume and operating-cost requirements. We can also work with CRM-native automation, n8n, Make, APIs and other data providers.'],
  ['Will AI send messages automatically?', 'Only where the agreed workflow permits it. AI may classify data, conduct research or draft context, while deterministic rules and human approval protect critical updates, sensitive accounts and brand decisions.'],
  ['How long does implementation take?', 'A focused catalogue automation may launch within days. A connected revenue system normally begins with a defined 30-day milestone. Timing depends on data quality, access, workflow complexity and the number of systems involved.'],
  ['Who owns the tools and data?', 'The client owns its CRM, domains, inboxes, data-provider accounts and production automation accounts. Variable software, API and usage costs are placed in the client’s name wherever possible.'],
  ['Do you guarantee meetings or revenue?', 'No. We agree on objective system milestones and measure downstream commercial performance, but revenue also depends on the product, offer, market, sales execution, pricing and other factors outside the workflow.'],
  ['Can we start with one automation?', 'Yes. The catalogue is designed as a lower-risk entry point. A focused workflow can solve an immediate bottleneck and later connect to a broader revenue system if the measured value supports expansion.']
];

const PRINCIPLES = ['Fixed-scope or value-based implementation pricing', 'Pricing informed by the credible first-year value of the problem', 'Client-owned software, data and sending accounts', 'Variable API and usage charges paid directly by the client', 'Clear assumptions, exclusions and acceptance criteria', 'No revenue guarantees for outcomes affected by product, market, sales execution or other external factors', 'Ongoing support justified through measured system performance and continued improvement'];

const ENGAGE = [
  ['01', 'Value and system review', 'We map the current process, tools, volumes, failure points and commercial value of the problem. We identify the smallest system capable of proving value.', 'var(--aqua)'],
  ['02', 'Build and 30-day milestone', 'We agree on the data sources, decision logic, workflow boundaries, acceptance criteria and running-cost estimate before implementation. The first milestone is objective and demonstrable.', 'var(--blue)'],
  ['03', 'Launch and observation', 'We test real records, handle exceptions, document ownership and monitor the system after deployment.', 'var(--coral)'],
  ['04', 'Optimise or expand', 'Once the initial workflow is producing credible evidence, we improve the model, add signals or connect the next revenue process.', 'var(--lime)']
];

function FaqPage() {
  const { Nav, Footer, FinalCta, PageHero } = window.GTMSite;
  return <React.Fragment>
    <Nav />
    <PageHero crumb="FAQ" label="Questions" title="What people ask before the first build."
      body="Scope, ownership, tooling and what we will and will not promise." />

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="faq-grid">
        {FAQS.map(([q, a]) => <section key={q}><h3>{q}</h3><p>{a}</p></section>)}
      </div>
    </section></div>

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="head-grid">
        <span className="section-number">01 / Fixed scope. Visible milestones.</span>
        <h2 className="big">Buy the first measurable system—not an open-ended block of engineering hours.</h2>
      </div>
      <div className="qlist">
        {ENGAGE.map(([n, t, d, acc]) => <article key={n} style={{ '--acc': acc }}>
          <span>{n}</span><h3>{t}</h3><p>{d}</p>
        </article>)}
      </div>
    </section></div>

    <section className="band band-dark"><div className="shell">
      <div className="head-grid">
        <span className="section-number light">02 / Commercial principles</span>
        <h2 className="big">How the engagement is priced and bounded.</h2>
      </div>
      <ul className="two-list dark">{PRINCIPLES.map(p => <li key={p}>{p}</li>)}</ul>
    </div></section>

    <FinalCta n="03" />
    <Footer />
  </React.Fragment>;
}

const FIELDS = [
  ['Name', 'text', false], ['Work email', 'email', false],
  ['Company', 'text', false], ['Your role', 'text', false],
  ['Current CRM and GTM tools', 'text', true],
  ['Which process is breaking or consuming time?', 'textarea', true],
  ['Approximate monthly account, lead or customer volume', 'text', false],
  ['What should improve if the system works?', 'text', false]
];

function ContactPage() {
  const { Nav, Footer, PageHero } = window.GTMSite;
  return <React.Fragment>
    <Nav />
    <PageHero crumb="Contact" label="Start with the bottleneck" title="Where does valuable revenue data currently stop becoming action?"
      body="Show us the process, tools, approximate volume and current failure point. We will help identify whether the right first step is a data repair, decision model, activation workflow—or no automation at all." />

    <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
      <div className="contact-card">
        <div>
          <span className="section-number" style={{ color: '#596516' }}>Fit check</span>
          <h2>Tell us where the workflow breaks.</h2>
          <p>We will review the workflow, likely data requirements and operating-cost considerations before recommending a build.</p>
        </div>
        <form className="contact-form" onSubmit={e => e.preventDefault()}>
          {FIELDS.map(([label, type, full]) => <label key={label} className={full ? 'full' : ''}>
            {label}
            {type === 'textarea' ? <textarea name={label}></textarea> : <input type={type} name={label} />}
          </label>)}
          <button className="button button-dark full" type="submit">Request a fit check</button>
          <p className="contact-note">No obligation. If automation is not the right first step, we will say so.</p>
        </form>
      </div>
      <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a className="button button-light" href="../website/index.html">Explore fixed-scope automations</a>
        <a className="button button-light" href="faq.html">Read the FAQ</a>
      </div>
    </section></div>

    <Footer />
  </React.Fragment>;
}

window.GTMSite = window.GTMSite || {};
Object.assign(window.GTMSite, { FaqPage, ContactPage });
