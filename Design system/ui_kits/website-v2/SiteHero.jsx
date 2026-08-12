function SiteHero() {
  const { HERO_NODES, HERO_FACTS, CAPABILITIES } = window.GTMSite;
  const [active, setActive] = React.useState(4);
  React.useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 5), 1500);
    return () => clearInterval(t);
  }, []);
  return <React.Fragment>
    <div className="shell"><section className="hero" id="top">
      <div className="hero-copy">
        <span className="eyebrow"><i className="live-dot"></i>Automated revenue systems for sales-led B2B companies</span>
        <h1>Build a revenue system that knows <em>who to target, why now, and what happens next.</em></h1>
        <p className="hero-sub">GTM Flows connects your revenue data, buying signals and GTM tools to identify opportunities, prioritise action and automate execution.</p>
        <div className="hero-actions">
          <a className="button button-dark" href="contact.html">Design my revenue system</a>
          <a className="text-link" href="../website/index.html">Explore the automation catalogue →</a>
        </div>
      </div>
      <div className="flow-panel">
        <span className="orbit" style={{ width: 360, height: 360, right: -160, top: 35 }}></span>
        <span className="orbit" style={{ width: 230, height: 230, right: -90, top: 100 }}></span>
        <div className="flow-topline">
          <span className="status-pill"><i className="live-dot"></i>LIVE DECISION FLOW</span>
          <span style={{ color: '#88887f' }}>REALTIME</span>
        </div>
        <div className="flow-lead">
          <div className="avatar">AL</div>
          <div><strong>Acme Labs</strong><span>Account detected · enterprise segment</span></div>
          <div className="time-tag">FIT 91/100</div>
        </div>
        <div className="flow-path">
          {HERO_NODES.map(([n, name, acc], i) =>
            <div className="flow-node" key={n} style={{ background: acc, opacity: i <= active ? 1 : 0.28, transition: 'opacity .3s' }}>
              <span>{n}</span><strong>{name}</strong>
            </div>)}
        </div>
        <dl className="flow-facts">
          {HERO_FACTS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <div className="flow-result">
          <div><span className="check">✓</span>Status: activated in CRM</div>
          <span style={{ font: '700 11px var(--mono)', color: 'var(--lime)', letterSpacing: '.08em' }}>NO MANUAL RESEARCH</span>
        </div>
      </div>
    </section></div>
    <div className="ticker"><div>{CAPABILITIES.map(c => <span key={c}>{c} ·</span>)}</div></div>
  </React.Fragment>;
}

Object.assign(window.GTMSite, { SiteHero });
