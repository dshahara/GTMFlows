"use client";

import { useEffect, useState } from "react";
import { BRAND_LOGO_SRC, BRAND_WORDMARK } from "@/lib/brand";

const links = [
  ["How We Build", "/how-we-build"],
  ["Automation Catalogue", "/catalogue"],
  ["ROI Calculator", "/catalogue#roi"],
  ["Contact", "/contact"],
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="shell site-nav">
        <a className="brand" href="/" aria-label="GTM Flows home">
          <img className="brand-logo" src={BRAND_LOGO_SRC} alt="" />
          <span>{BRAND_WORDMARK}</span>
        </a>

        <nav className="site-nav-links" aria-label="Primary navigation">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <a className="button button-dark site-nav-cta" href="/contact">Design my revenue system</a>
        </nav>

        <button
          className="mobile-nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav className={`mobile-navigation${open ? " open" : ""}`} id="mobile-navigation" aria-label="Mobile navigation">
        <div className="shell">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span>↗</span></a>)}
          <a className="button button-lime" href="/contact" onClick={() => setOpen(false)}>Design my revenue system</a>
        </div>
      </nav>
    </header>
  );
}
