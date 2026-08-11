"use client";

import { useEffect, useState } from "react";
import { heroNodes, revenueStages } from "@/lib/marketing";

export function DecisionFlowVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setActive(heroNodes.length - 1);
      return;
    }
    const timer = window.setInterval(() => setActive((value) => (value + 1) % heroNodes.length), 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="decision-panel" aria-label="Example account moving through a revenue decision flow">
      <span className="decision-orbit decision-orbit-large" />
      <span className="decision-orbit decision-orbit-small" />
      <div className="decision-topline">
        <span className="status-pill"><i className="live-dot" />Live decision flow</span>
        <span>Realtime</span>
      </div>
      <div className="decision-account">
        <div className="decision-avatar">AL</div>
        <div><strong>Acme Labs</strong><span>Account detected · enterprise segment</span></div>
        <div className="decision-fit">Fit 91/100</div>
      </div>
      <div className="decision-path">
        {heroNodes.map(([number, label, accent], index) => (
          <div className={`decision-node accent-bg-${accent}${index <= active ? " active" : ""}`} key={number}>
            <span>{number}</span>
            <strong>{label}</strong>
          </div>
        ))}
      </div>
      <dl className="decision-facts">
        <div><dt>Signal</dt><dd>New VP Sales + SDR hiring</dd></div>
        <div><dt>Buyer</dt><dd>Verified</dd></div>
        <div><dt>Next action</dt><dd>High-context outbound</dd></div>
        <div><dt>Owner</dt><dd>Enterprise SDR</dd></div>
      </dl>
      <div className="decision-result">
        <div><span className="check">✓</span>Status: activated in CRM</div>
        <strong>No manual research</strong>
      </div>
    </div>
  );
}

export function RevenueSystemLoop() {
  const [selected, setSelected] = useState(2);
  const stage = revenueStages[selected];

  return (
    <>
      <div className="system-loop" aria-label="Interactive revenue system stages">
        {revenueStages.map((item, index) => (
          <button
            className={`system-node accent-border-${item.accent}${selected === index ? ` selected accent-bg-${item.accent}` : ""}`}
            key={item.key}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            onFocus={() => setSelected(index)}
            onMouseEnter={() => setSelected(index)}
          >
            <span>0{index + 1}</span>
            <strong>{item.label}</strong>
            <small>{item.chips}</small>
          </button>
        ))}
      </div>
      <div className={`system-detail accent-bg-${stage.accent}`} aria-live="polite">
        <div>
          <span className="section-number">Selected stage</span>
          <h3>{stage.label}</h3>
          <p>{stage.description}</p>
        </div>
        <div className="system-detail-grid">
          <div><span>Example input</span><p>{stage.input}</p></div>
          <div><span>Decision</span><p>{stage.decision}</p></div>
          <div><span>Output</span><p>{stage.output}</p></div>
        </div>
      </div>
    </>
  );
}
