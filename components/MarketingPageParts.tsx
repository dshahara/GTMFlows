export function MarketingPageHero({
  crumb,
  label,
  title,
  body,
}: {
  crumb: string;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <section className="marketing-page-hero shell">
      <div>
        <div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>{crumb}</span></div>
        <span className="section-number">{label}</span>
        <h1>{title}</h1>
      </div>
      <p>{body}</p>
    </section>
  );
}

export function MarketingFinalCta() {
  return (
    <section className="marketing-final-cta shell">
      <div>
        <span className="section-number">Start with the bottleneck</span>
        <h2>Where does valuable revenue data currently stop becoming action?</h2>
      </div>
      <div>
        <p>Show us the workflow, tools and current bottleneck. We’ll identify whether the right first step is better data, smarter prioritisation or workflow automation.</p>
        <div><a className="button button-lime" href="/contact">Request a fit check</a><a className="button button-light" href="/catalogue">Explore automations</a></div>
      </div>
    </section>
  );
}
