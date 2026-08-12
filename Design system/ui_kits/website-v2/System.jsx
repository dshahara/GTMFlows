function OperatingGap() {
  const { GAP } = window.GTMSite;
  return <div className="shell"><section className="band">
    <div className="head-grid">
      <span className="section-number">01 / The operating gap</span>
      <h2 className="big">Your tools collect data. We make the data operational.</h2>
      <p className="lede">Revenue data is usually spread across the CRM, spreadsheets, product, website and enrichment tools. Without shared decision rules, teams still research manually, react inconsistently and miss valuable revenue moments.</p>
    </div>
    <div className="gap-grid">
      <div className="gap-col">
        <span className="section-number">Before</span>
        <h3>Fragmented GTM</h3>
        <ul>{GAP.map(([a]) => <li key={a}><i>—</i>{a}</li>)}</ul>
      </div>
      <div className="gap-col good">
        <span className="section-number">After</span>
        <h3>Connected revenue system</h3>
        <ul>{GAP.map(([, b]) => <li key={b}><i>✓</i>{b}</li>)}</ul>
      </div>
    </div>
  </section></div>;
}

function RevenueSystem() {
  const { STAGES } = window.GTMSite;
  const [sel, setSel] = React.useState(2);
  const s = STAGES[sel];
  const areas = ['a', 'b', 'c', 'd', 'e', 'f'];
  const node = i => {
    const st = STAGES[i];
    return <button key={st.key} className={'loop-node' + (sel === i ? ' on' : '')} style={{ '--ga': areas[i], '--acc': st.acc }}
      onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={() => setSel(i)}>
      <span>{'0' + (i + 1)}</span><strong>{st.label}</strong><small>{st.chips}</small>
    </button>;
  };
  const arrow = (a, ch) => <div key={a} className="loop-arrow" style={{ gridArea: a }}>{ch}</div>;
  return <section className="band band-dark" id="system"><div className="shell">
    <div className="head-grid">
      <span className="section-number light">02 / One connected revenue system</span>
      <h2 className="big">From raw data to coordinated revenue action.</h2>
      <p className="lede light">We build the connective layer between your data sources and the teams responsible for revenue. The system creates trusted data, makes consistent decisions, activates the right action and learns from the outcome.</p>
    </div>
    <div className="loop">
      {node(0)}{arrow('x', '→')}{node(1)}{arrow('y', '→')}{node(2)}
      {arrow('v', '↓')}
      {node(5)}{arrow('w', '←')}{node(4)}{arrow('u', '←')}{node(3)}
    </div>
    <div className="detail">
      <div>
        <span className="section-number" style={{ color: '#596516' }}>Selected stage</span>
        <h3>{s.label}</h3>
        <p>{s.desc}</p>
      </div>
      <div className="detail-cols">
        {[['Example input', s.input], ['Decision', s.decision], ['Output', s.output]].map(([k, v]) =>
          <div key={k}><span>{k}</span><p>{v}</p></div>)}
      </div>
    </div>
    <div className="stage-defs">
      {STAGES.slice(1).map(st => <div key={st.key}><strong>{st.label}</strong><p>{st.desc}</p></div>)}
    </div>
  </div></section>;
}

Object.assign(window.GTMSite, { OperatingGap, RevenueSystem });
