"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

type SiteFooterProps = {
  source?: string;
};

export function SiteFooter({ source = "Website footer" }: SiteFooterProps) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("sending");
    setMessage("");

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      automation: String(formData.get("automation") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      source,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send inquiry right now.");
      }

      form.reset();
      setStatus("sent");
      setMessage("Thanks — your inquiry has been sent. We’ll review the fit and get back to you.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send inquiry right now.");
    }
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="shell footer-shell">
        <section className="footer-main" aria-label="GTM Flows contact information">
          <div>
            <a className="brand footer-brand" href="/" aria-label="GTM Flows home">
              <span className="brand-mark">G/F</span>
              <span>GTM/FLOWS</span>
            </a>
            <p className="footer-tagline">GTM automations for B2B sales teams.</p>
            <h2>Have one GTM workflow worth automating?</h2>
            <p>
              Send the process, tools and rough monthly volume. We’ll help you check whether it is worth
              automating before you spend on the build.
            </p>
          </div>

          <div className="footer-info-grid">
            <div>
              <span>Location</span>
              <p>HSR Layout, Bengaluru, Karnataka, India</p>
            </div>
            <div>
              <span>Social</span>
              <a href="https://www.linkedin.com/company/gtm-flows/" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
            <div>
              <span>Response</span>
              <p>We usually review new fit-check requests within one business day.</p>
            </div>
            <div>
              <span>Best for</span>
              <p>B2B sales, RevOps and founder-led GTM teams</p>
            </div>
          </div>
        </section>

        <section className="contact-card" aria-label="Contact GTM Flows">
          <span className="section-number">CONTACT</span>
          <h2>Request a fit check</h2>
          <form className="contact-form" onSubmit={submitInquiry}>
            <label>
              Name
              <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
            </label>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
            </label>
            <label>
              Company
              <input name="company" type="text" autoComplete="organization" placeholder="Company name" />
            </label>
            <label>
              Automation interest
              <input name="automation" type="text" placeholder="Lead enrichment, CRM routing, attribution..." />
            </label>
            <label className="full">
              What do you want to automate?
              <textarea name="message" rows={5} required placeholder="Tell us the current manual process, tools used and approximate monthly volume." />
            </label>
            <label className="honeypot" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="button button-dark full" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send inquiry to GTM Flows"} <span>↗</span>
            </button>
          </form>
          {message && <p className={`form-message ${status === "error" ? "error" : "success"}`}>{message}</p>}
          <p className="contact-note">We’ll review your tools, volume and fit before recommending a build.</p>
        </section>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GTM Flows. All rights reserved.</p>
          <div>
            <a href="/#catalogue">Catalogue</a>
            <a href="/#roi">ROI calculator</a>
            <a href="/llms.txt">llms.txt</a>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
