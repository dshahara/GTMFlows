"use client";

import { useMemo, useState } from "react";
import type { PublicAutomation } from "@/lib/catalogue";
import { categories, formatFullRupees } from "@/lib/catalogue";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

type HomePageClientProps = {
  automations: PublicAutomation[];
};

export function HomePageClient({ automations }: HomePageClientProps) {
  const [category, setCategory] = useState("All");
  const [volume, setVolume] = useState(500);
  const [minutes, setMinutes] = useState(12);
  const [hourlyCost, setHourlyCost] = useState(600);
  const [coverage, setCoverage] = useState(80);
  const [runCost, setRunCost] = useState(12000);
  const [setupCost, setSetupCost] = useState(75000);

  const visibleCategories = useMemo(() => {
    const used = new Set(automations.map((item) => item.category));
    return categories.filter((item) => item === "All" || used.has(item));
  }, [automations]);

  const filtered = useMemo(
    () => (category === "All" ? automations : automations.filter((item) => item.category === category)),
    [automations, category],
  );

  const roi = useMemo(() => {
    const currentHours = (volume * minutes) / 60;
    const hoursSaved = currentHours * (coverage / 100);
    const monthlyValue = hoursSaved * hourlyCost;
    const netMonthly = monthlyValue - runCost;
    const firstYearCost = setupCost + runCost * 12;
    const firstYearBenefit = monthlyValue * 12;
    const percentage = firstYearCost > 0 ? ((firstYearBenefit - firstYearCost) / firstYearCost) * 100 : 0;
    const payback = netMonthly > 0 ? setupCost / netMonthly : 0;
    return { currentHours, hoursSaved, monthlyValue, netMonthly, percentage, payback };
  }, [volume, minutes, hourlyCost, coverage, runCost, setupCost]);

  return (
    <main className="catalogue-page">
      <SiteNav />
      <section className="marketing-page-hero shell" id="top">
        <div>
          <div className="breadcrumbs"><a href="/">Home</a><span>/</span><span>Automation Catalogue</span></div>
          <span className="section-number">Ready-to-deploy automations</span>
          <h1>Know what to automate. Know what it costs.</h1>
        </div>
        <div>
          <p>Compare {automations.length} focused GTM automations by setup price, monthly running cost, implementation time, complexity and best-fit use case.</p>
          <a className="button button-dark" href="#catalogue">Browse the catalogue ↓</a>
        </div>
      </section>

      <section className="intro shell" id="catalogue">
        <div>
          <span className="section-number">01 / Automation catalogue</span>
          <h2>Start with one process that already costs your team time.</h2>
        </div>
        <p>No lengthy transformation project. Compare the economics, choose a workflow, and launch only when the numbers make sense.</p>
      </section>

      <section className="catalogue shell">
        <div className="filters" role="group" aria-label="Filter automations by category">
          {visibleCategories.map((item) => (
            <button className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)} aria-pressed={category === item}>
              {item}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {filtered.map((item) => (
            <article className={`automation-card accent-${item.accent}`} key={item.slug}>
              <div className="card-top">
                <span className="card-index">{String(item.order).padStart(2, "0")}</span>
                <span className="category-tag">{item.category}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.short}</p>
              <div className="mini-flow" aria-label={`${item.name} workflow`}>
                {item.steps.slice(0, 4).map((step, index) => (
                  <div key={`${item.slug}-${step}`}><span>{step}</span>{index < 3 && <i>→</i>}</div>
                ))}
              </div>
              <dl className="card-stats">
                <div><dt>Setup</dt><dd>{item.setup}</dd></div>
                <div><dt>Runs at</dt><dd>{item.monthly}<small>/month</small></dd></div>
                <div><dt>Live in</dt><dd>{item.days}</dd></div>
                <div><dt>Complexity</dt><dd><span className={`complexity ${item.complexity.toLowerCase()}`}>{item.complexity}</span></dd></div>
              </dl>
              <div className="fit-note"><span>Best fit</span>{item.fit}</div>
              <a className="card-action card-link" href={`/automations/${item.slug}`}>View details <span>→</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="transparency shell">
        <div className="transparency-copy">
          <span className="section-number">02 / COST TRANSPARENCY</span>
          <h2>See the whole cost. Not just the build fee.</h2>
          <p>Every catalogue estimate separates implementation from the ongoing software, data, AI and execution costs required to keep the automation running.</p>
          <div className="cost-legend">
            <div><i className="legend-build" /><span><strong>One-time build</strong>Design, integration, testing and training.</span></div>
            <div><i className="legend-run" /><span><strong>Monthly run cost</strong>Workflow, data, AI and messaging usage.</span></div>
            <div><i className="legend-own" /><span><strong>You own the stack</strong>Accounts and billing stay in your company's name.</span></div>
          </div>
        </div>
        <div className="cost-graphic" aria-label="First-year automation cost breakdown">
          <div className="graphic-title"><span>FIRST-YEAR COST</span><strong>Example · Research engine</strong></div>
          <div className="donut">
            <div><strong>₹2.49L</strong><span>year one</span></div>
          </div>
          <div className="bar-list">
            <div><span>Build</span><i><b style={{ width: "30%" }} /></i><strong>₹75K</strong></div>
            <div><span>Data + tools</span><i><b style={{ width: "64%" }} /></i><strong>₹1.44L</strong></div>
            <div><span>Care</span><i><b style={{ width: "12%" }} /></i><strong>₹30K</strong></div>
          </div>
          <p>Illustrative only. Your estimate is calculated from actual record volume and selected tools.</p>
        </div>
      </section>

      <section className="roi-section" id="roi">
        <div className="shell">
          <div className="roi-heading">
            <span className="section-number light">03 / ROI CALCULATOR</span>
            <h2>Will the automation pay for itself?</h2>
            <p>Use your numbers. Revenue uplift is deliberately excluded from the base calculation.</p>
          </div>
          <div className="calculator">
            <div className="inputs">
              <label>Tasks or records per month<input type="number" min="0" value={volume} onChange={(e) => setVolume(Number(e.target.value))} /></label>
              <label>Minutes per task<input type="number" min="0" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} /></label>
              <label>Loaded team cost per hour<input type="number" min="0" value={hourlyCost} onChange={(e) => setHourlyCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
              <label>Work that can be automated<input type="range" min="10" max="100" step="5" value={coverage} onChange={(e) => setCoverage(Number(e.target.value))} /><output>{coverage}%</output></label>
              <label>Monthly tool/API cost<input type="number" min="0" value={runCost} onChange={(e) => setRunCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
              <label>One-time setup cost<input type="number" min="0" value={setupCost} onChange={(e) => setSetupCost(Number(e.target.value))} /><span className="input-prefix">₹</span></label>
            </div>
            <div className="results">
              <div className="result-kicker">YOUR ESTIMATED BASE CASE</div>
              <div className="primary-result"><span>Payback period</span><strong>{roi.payback > 0 ? roi.payback.toFixed(1) : "—"}<small> months</small></strong></div>
              <div className="result-grid">
                <div><span>Hours returned/month</span><strong>{Math.round(roi.hoursSaved)}h</strong></div>
                <div><span>Monthly labour value</span><strong>{formatFullRupees(roi.monthlyValue)}</strong></div>
                <div><span>Monthly net benefit</span><strong>{formatFullRupees(roi.netMonthly)}</strong></div>
                <div><span>First-year ROI</span><strong>{Math.round(roi.percentage)}%</strong></div>
              </div>
              <div className="result-visual">
                <div className="baseline"><span>Manual effort</span><i><b style={{ width: "100%" }} /></i><strong>{Math.round(roi.currentHours)}h</strong></div>
                <div className="automated"><span>After automation</span><i><b style={{ width: `${100 - coverage}%` }} /></i><strong>{Math.round(roi.currentHours - roi.hoursSaved)}h</strong></div>
              </div>
              <p>This is an illustrative labour-efficiency estimate, not a revenue guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="process shell" id="process">
        <div className="process-heading">
          <span className="section-number">04 / HOW IT WORKS</span>
          <h2>One workflow. Four clear steps.</h2>
        </div>
        <div className="process-grid">
          <article><span>01</span><h3>Choose</h3><p>Select a catalogue automation that matches your process and volume.</p></article>
          <article><span>02</span><h3>Confirm</h3><p>We verify tools, rules, edge cases, acceptance criteria and final running cost.</p></article>
          <article><span>03</span><h3>Launch</h3><p>We build, test, document and deploy inside accounts owned by your company.</p></article>
          <article><span>04</span><h3>Measure</h3><p>Compare the result with the baseline and decide whether to automate the next process.</p></article>
        </div>
      </section>

      <section className="cta shell">
        <div>
          <span className="section-number">Start with the bottleneck</span>
          <h2>Which revenue process should stop depending on manual work?</h2>
        </div>
        <div>
          <p>Pick one repetitive process. We will confirm the fit, total operating cost and acceptance criteria before you commit.</p>
          <a className="button button-light" href="/contact">Find my first automation <span>↗</span></a>
        </div>
      </section>

      <SiteFooter source="Automation catalogue" />

    </main>
  );
}
