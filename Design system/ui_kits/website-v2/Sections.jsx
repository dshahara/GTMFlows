function WorkedExample() {
  const { EXAMPLE } = window.GTMSite;
  return <div className="shell"><section className="band">
    <div className="head-grid">
      <span className="section-number">03 / From signal to action</span>
      <h2 className="big">A target account starts building its outbound sales team. Here is what happens next.</h2>
      <p className="lede">One worked example, end to end — the same path every prioritised account follows.</p>
    </div>
    <div className="steps">
      {EXAMPLE.map(([n, title, desc, acc]) => <div className="step" key={n}>
        <div className="step-num" style={{ '--acc': acc }}>{n}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>)}
    </div>
    <p className="callout">The signal is not the strategy. <b>The value comes from checking fit, adding context and making the next action predictable.</b></p>
  </section></div>;
}

function SystemsWeBuild() {
  const { SYSTEMS } = window.GTMSite;
  return <div className="shell"><section className="band" id="systems" style={{ paddingTop: 0 }}>
    <div className="head-grid">
      <span className="section-number">04 / Start with one bottleneck</span>
      <h2 className="big">Deploy one focused system. Connect more only when the value is visible.</h2>
      <p className="lede">Each system solves a single revenue bottleneck and can later connect into the wider architecture.</p>
    </div>
    <div className="sys-grid">
      {SYSTEMS.map(([n, name, desc, acc]) => <article className="sys-card" key={n} style={{ '--acc': acc }}>
        <span>{n}</span>
        <div><h3>{name}</h3><p>{desc}</p></div>
      </article>)}
      <article className="sys-card" style={{ '--acc': 'var(--ink)', justifyContent: 'flex-end' }}>
        <div><h3 style={{ fontSize: 22 }}>Explore automation details, delivery estimates and running costs</h3></div>
        <a className="button button-light" href="../website/index.html" style={{ alignSelf: 'flex-start' }}>Open the catalogue →</a>
      </article>
    </div>
  </section></div>;
}

function Engagement() {
  const { ENGAGEMENT } = window.GTMSite;
  return <div className="shell"><section className="band" style={{ paddingTop: 0 }}>
    <div className="head-grid">
      <span className="section-number">05 / Fixed scope. Visible milestones.</span>
      <h2 className="big">Four stages, one measurable outcome.</h2>
      <p className="lede">Start with one fixed-scope system and an objective 30-day milestone. Software, data and variable usage costs remain in your company’s name.</p>
    </div>
    <div className="process-grid">
      {ENGAGEMENT.map(([n, name, acc]) => <article key={n} style={{ '--acc': acc }}>
        <i style={{ color: acc === 'var(--ink)' || acc === 'var(--blue)' ? '#fff' : 'var(--ink)' }}>{n}</i>
        <h3>{name}</h3>
      </article>)}
    </div>
    <div style={{ marginTop: 28 }}><a className="button button-dark" href="how-we-build.html">See how we build →</a></div>
  </section></div>;
}

Object.assign(window.GTMSite, { WorkedExample, SystemsWeBuild, Engagement });
