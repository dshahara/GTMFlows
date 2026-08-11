import type { Metadata } from "next";
import { MarketingFinalCta, MarketingPageHero } from "@/components/MarketingPageParts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { aiControls, checkFirst, derivedData, goodFit, metricGroups, revenueSystems, technologyStack } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Automated Revenue Systems | GTM Flows",
  description: "Explore signal-led pipeline, inbound response, CRM data, reactivation, renewal and expansion systems built by GTM Flows.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/revenue-systems` },
};

export default function RevenueSystemsPage() {
  return (
    <main className="marketing-site">
      <SiteNav />
      <MarketingPageHero
        crumb="Revenue Systems"
        label="Systems we build"
        title="Start with one revenue bottleneck. Connect the system as value becomes visible."
        body="Each system solves a defined commercial problem end to end. They share the same foundation, so a second system connects to the first instead of replacing it."
      />

      <section className="marketing-page-section shell compact-top">
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
        <a className="button button-dark responsive-button" href="/catalogue">Browse automations, delivery estimates and running costs →</a>
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid">
          <span className="section-number">01 / Unique data</span>
          <h2>The strongest targeting criteria are rarely available as a standard database filter.</h2>
          <p>Employee count, industry and funding are accessible to every competitor. We help create data points specific to your product, customers and sales motion.</p>
        </div>
        <ul className="two-column-list">{derivedData.map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="signal-ladder">
          <div><span>Generic signal</span><p>Company raised funding</p></div>
          <div><span>More useful signal</span><p>Company raised funding + is hiring its first RevOps leader</p></div>
          <div><span>Defensible signal model</span><p>Funding + first RevOps hire + HubSpot + US expansion + previous engagement with your integration content</p></div>
        </div>
        <p className="example-callout">The objective is not to collect the most data. <strong>It is to identify the smallest set of data points that improves a real revenue decision.</strong></p>
      </section>

      <section className="marketing-page-section dark-band">
        <div className="shell">
          <div className="marketing-head-grid">
            <span className="section-number light">02 / AI with control</span>
            <h2>Use AI where interpretation is needed. Use rules where consistency matters.</h2>
            <p>AI can classify websites, extract information, summarise account context and draft research-based messages. It should not quietly become the source of truth for critical revenue data.</p>
          </div>
          <ul className="two-column-list dark-list">{aiControls.map((item) => <li key={item}>{item}</li>)}</ul>
          <p className="dark-callout">The goal is not maximum automation. <strong>It is the right balance of speed, reliability and human judgment.</strong></p>
        </div>
      </section>

      <section className="marketing-page-section shell">
        <div className="marketing-head-grid">
          <span className="section-number">03 / Works with your stack</span>
          <h2>Built around the tools you already own.</h2>
          <p>We select tools based on data coverage, workflow requirements, reliability and total running cost. Variable-use accounts remain in your company’s name.</p>
        </div>
        <div className="stack-grid">
          {technologyStack.map(([title, tools]) => <article key={title}><span>{title}</span><div>{tools.map((tool) => <i key={tool}>{tool}</i>)}</div></article>)}
        </div>
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid">
          <span className="section-number">04 / Measurement</span>
          <h2>Measure the decisions and actions the system can genuinely influence.</h2>
          <p>We establish a baseline before deployment and agree on the measures relevant to the workflow.</p>
        </div>
        <div className="metric-grid">
          {metricGroups.map(([title, items]) => <article key={title}><h3>{title}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
        </div>
        <p className="supporting-note">We do not treat open rate, records processed or messages sent as business outcomes on their own.</p>
      </section>

      <section className="marketing-page-section shell compact-top">
        <div className="marketing-head-grid">
          <span className="section-number">05 / Is GTM Flows a fit?</span>
          <h2>Best for teams with a valuable revenue process that has outgrown manual execution.</h2>
        </div>
        <div className="fit-grid">
          <article className="accent-border-lime"><span className="section-number">Good fit</span><h3>Where this works</h3><ul>{goodFit.map((item) => <li key={item}><b>✓</b>{item}</li>)}</ul></article>
          <article className="accent-border-coral"><span className="section-number">Check first</span><h3>Worth resolving first</h3><ul>{checkFirst.map((item) => <li key={item}><b>—</b>{item}</li>)}</ul></article>
        </div>
      </section>

      <MarketingFinalCta />
      <SiteFooter />
    </main>
  );
}
