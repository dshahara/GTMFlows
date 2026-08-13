const LINKS = {
  'Revenue Systems': 'revenue-systems.html',
  'How We Build': 'how-we-build.html',
  'Automation Catalogue': '../website/index.html',
  'ROI Calculator': '../website/index.html',
  'Contact': 'contact.html'
};

function Nav({ home }) {
  return <div className="shell"><div className="nav">
    <a className="brand" href={home || 'index.html'}><img className="brand-logo" src="assets/gf-logo.svg" alt="" /><span>GTM Flows</span></a>
    <nav className="nav-links">
      {Object.keys(LINKS).map(n => <a key={n} href={LINKS[n]}>{n}</a>)}
      <a className="button button-dark nav-cta" href="contact.html">Design my revenue system</a>
    </nav>
  </div></div>;
}

function FinalCta({ n }) {
  return <div className="shell" id="cta"><section className="cta">
    <div>
      <span className="section-number">{n} / Start with the bottleneck</span>
      <h2>Where does valuable revenue data currently stop becoming action?</h2>
    </div>
    <div>
      <p>Show us the workflow, tools and current bottleneck. We’ll identify whether the right first step is better data, smarter prioritisation or workflow automation.</p>
      <div className="cta-actions">
        <a className="button button-lime" href="contact.html">Request a fit check</a>
        <a className="button button-light" href="revenue-systems.html">Explore fixed-scope automations</a>
      </div>
    </div>
  </section></div>;
}

function Footer() {
  const cols = [
    ['Systems', [['Revenue Systems', 'revenue-systems.html'], ['How We Build', 'how-we-build.html'], ['Automation Catalogue', '../website/index.html']]],
    ['Tools', [['ROI Calculator', '../website/index.html'], ['FAQ', 'faq.html'], ['Delivery estimates', '../website/index.html']]],
    ['Company', [['Contact', 'contact.html'], ['Fit check', 'contact.html'], ['Privacy', '#']]]
  ];
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top">
      <div>
        <a className="brand" href="index.html"><img className="brand-logo" src="assets/gf-logo.svg" alt="" /><span>GTM Flows</span></a>
        <p className="footer-tagline">Automated revenue systems</p>
      </div>
      <div className="footer-nav">
        {cols.map(([t, links]) => <div key={t}>
          <span>{t}</span>
          {links.map(([l, href]) => <a key={l} href={href}>{l}</a>)}
        </div>)}
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 GTM Flows</p>
      <p>Client-owned software, data and sending accounts.</p>
    </div>
  </div></footer>;
}

function PageHero({ crumb, label, title, body }) {
  return <div className="shell"><section className="page-hero">
    <div>
      <div className="breadcrumbs"><a href="index.html">Home</a><span>/</span><span>{crumb}</span></div>
      <span className="section-number">{label}</span>
      <h1>{title}</h1>
    </div>
    <p>{body}</p>
  </section></div>;
}

window.GTMSite = window.GTMSite || {};
Object.assign(window.GTMSite, { Nav, Footer, FinalCta, PageHero });
