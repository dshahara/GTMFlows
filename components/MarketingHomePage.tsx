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
          <h1>Automated revenue systems for B2B growth teams</h1>
          <p>GTM Flows builds automated revenue systems that connect CRM data, buying signals, AI research and workflow automation. We help RevOps, growth and customer success teams identify the right accounts, prioritise action and reduce manual GTM work.</p>
          <div className="marketing-hero-actions">
            <a className="button button-dark" href="/contact">Design my revenue system</a>
            <a className="text-link" href="/how-we-build">Explore how we build →</a>
          </div>
        </div>
        <DecisionFlowVisual />
      </section>

      <div className="capability-ticker" aria-label="GTM Flows capabilities">
        <div>{capabilities.map((capability) => <span key={capability}>{capability} ·</span>)}</div>
      </div>

      <section className="marketing-band shell">
        <div className="marketing-head-grid">
          <span className="section-number">Operating gap</span>
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

      <section className="marketing-band shell compact-top">
        <div className="marketing-head-grid">
          <span className="section-number">Revenue systems</span>
          <h2>Start with one revenue bottleneck. Connect the system as value becomes visible.</h2>
          <p>Each system solves a defined commercial problem end to end. They share the same foundation, so a second system connects to the first instead of replacing it.</p>
        </div>
        <div className="revenue-system-list">
          {revenueSystems.map((system) => (
            <article className={`revenue-system-card accent-border-${system.accent}`} key={system.number}>
              <div><span>{system.number}</span><h2>{system.name}</h2></div>
              <div>
                <p>{system.longDescription}</p>
                <span className="micro-label">Typical flow</span>
                <div className="flow-chain">
                  {system.flow.map((item, index) => <span key={item}><i>{item}</i>{index < system.flow.length - 1 && <b>→</b>}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-band dark-band" id="system">
        <div className="shell">
          <div className="marketing-head-grid">
            <span className="section-number light">Connected revenue system</span>
            <h2>From raw data to coordinated revenue action.</h2>
            <p>We build the connective layer between your data sources and the teams responsible for revenue. The system creates trusted data, makes consistent decisions, activates the right action and learns from the outcome.</p>
          </div>
          <RevenueSystemLoop />
        </div>
      </section>

      <section className="marketing-band shell worked-example">
        <div className="marketing-head-grid">
          <span className="section-number">From signal to action</span>
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

      <section className="marketing-conversion shell">
        <div className="conversion-process">
          <span className="section-number">Fixed scope. Visible milestones.</span>
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
