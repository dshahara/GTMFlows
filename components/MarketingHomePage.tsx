import { DecisionFlowVisual, RevenueSystemLoop } from "@/components/MarketingExperience";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { capabilities, engagementSteps, operatingGap, revenueSystems, workedExample } from "@/lib/marketing";

export function MarketingHomePage() {
  return (
    <main className="marketing-site">
      <SiteNav />

      <section className="marketing-hero shell" id="top">
        <div>
          <span className="eyebrow"><i className="live-dot" />Automated revenue systems for sales-led B2B companies</span>
          <h1>Build a revenue system that knows <em>who to target, why now, and what happens next.</em></h1>
          <p>GTM Flows connects your revenue data, buying signals and GTM tools to identify opportunities, prioritise action and automate execution.</p>
          <div className="marketing-hero-actions">
            <a className="button button-dark" href="/contact">Design my revenue system</a>
            <a className="text-link" href="/catalogue">Explore the automation catalogue →</a>
          </div>
        </div>
        <DecisionFlowVisual />
      </section>

      <div className="capability-ticker" aria-label="GTM Flows capabilities">
        <div>{capabilities.map((capability) => <span key={capability}>{capability} ·</span>)}</div>
      </div>

      <section className="marketing-band shell">
        <div className="marketing-head-grid">
          <span className="section-number">01 / The operating gap</span>
          <h2>Your tools collect data. We make the data operational.</h2>
          <p>Revenue data is usually spread across the CRM, spreadsheets, product, website and enrichment tools. Without shared decision rules, teams still research manually, react inconsistently and miss valuable revenue moments.</p>
        </div>
        <div className="gap-grid">
          <article className="gap-column">
            <span className="section-number">Before</span>
            <h3>Fragmented GTM</h3>
            <ul>{operatingGap.map(([before]) => <li key={before}><i>—</i>{before}</li>)}</ul>
          </article>
          <article className="gap-column connected">
            <span className="section-number">After</span>
            <h3>Connected revenue system</h3>
            <ul>{operatingGap.map(([, after]) => <li key={after}><i>✓</i>{after}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className="marketing-band dark-band" id="system">
        <div className="shell">
          <div className="marketing-head-grid">
            <span className="section-number light">02 / One connected revenue system</span>
            <h2>From raw data to coordinated revenue action.</h2>
            <p>We build the connective layer between your data sources and the teams responsible for revenue. The system creates trusted data, makes consistent decisions, activates the right action and learns from the outcome.</p>
          </div>
          <RevenueSystemLoop />
        </div>
      </section>

      <section className="marketing-band shell worked-example">
        <div className="marketing-head-grid">
          <span className="section-number">03 / From signal to action</span>
          <h2>A target account starts building its outbound sales team. Here is what happens next.</h2>
          <p>One worked example, end to end—the same decision path every prioritised account follows.</p>
        </div>
        <div className="example-steps">
          {workedExample.map(([number, title, description, accent]) => (
            <article key={number}>
              <span className={`example-number accent-bg-${accent}`}>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <p className="example-callout">The signal is not the strategy. <strong>The value comes from checking fit, adding context and making the next action predictable.</strong></p>
      </section>

      <section className="marketing-band shell home-systems" id="catalogue">
        <div className="marketing-head-grid">
          <span className="section-number">04 / Start with one bottleneck</span>
          <h2>Deploy one focused system. Connect more only when the value is visible.</h2>
          <p>Each system solves a defined revenue bottleneck and can later connect into the wider architecture.</p>
        </div>
        <div className="home-system-grid">
          {revenueSystems.slice(0, 3).map((system) => (
            <article className={`home-system-card accent-border-${system.accent}`} key={system.number}>
              <span>{system.number}</span>
              <div><h3>{system.name}</h3><p>{system.description}</p></div>
            </article>
          ))}
          <a className="home-system-card system-link-card" href="/revenue-systems">
            <span>05 systems</span>
            <div><h3>Explore the complete revenue-system library</h3><p>See the workflow, data model, tools and success measures.</p></div>
          </a>
        </div>
      </section>

      <section className="marketing-conversion shell">
        <div className="conversion-process">
          <span className="section-number">05 / Fixed scope. Visible milestones.</span>
          <h2>Four stages, one measurable first outcome.</h2>
          <div className="engagement-grid">
            {engagementSteps.map(([number, label, accent]) => <div key={number}><i className={`accent-bg-${accent}`}>{number}</i><strong>{label}</strong></div>)}
          </div>
          <p>Start with one fixed-scope system and an objective 30-day milestone. Software, data and variable usage costs remain in your company’s name.</p>
          <a className="text-link" href="/how-we-build">See how we build →</a>
        </div>
        <div className="conversion-cta">
          <span className="section-number">Start with the bottleneck</span>
          <h2>Where does valuable revenue data currently stop becoming action?</h2>
          <p>Show us the workflow, tools and current bottleneck. We’ll identify whether the right first step is better data, smarter prioritisation or workflow automation.</p>
          <div><a className="button button-lime" href="/contact">Request a fit check</a><a className="button button-light" href="/catalogue">Explore automations</a></div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
