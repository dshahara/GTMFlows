import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { MarketingPageHero } from "@/components/MarketingPageParts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request a Revenue Automation Fit Check | GTM Flows",
  description: "Request a GTM Flows fit check to identify the right revenue automation, data foundation or workflow system for your team.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/contact` },
};

export default function ContactPage() {
  const jsonLd = [
    localBusinessJsonLd,
    breadcrumbJsonLd([
      { name: "Home", url: CANONICAL_ORIGIN },
      { name: "Contact", url: `${CANONICAL_ORIGIN}/contact` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Request a Revenue Automation Fit Check",
      url: `${CANONICAL_ORIGIN}/contact`,
      description: "Request a GTM Flows fit check to identify the right revenue automation, data foundation or workflow system.",
    },
  ];

  return (
    <main className="marketing-site">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteNav />
      <MarketingPageHero
        crumb="Contact"
        label="Start with the bottleneck"
        title="Request a revenue automation fit check"
        body="Show us the process, tools, approximate volume and current failure point. We will help identify whether the right first step is data repair, a decision model, workflow activation—or no automation at all."
      />

      <section className="marketing-page-section shell compact-top">
        <div className="fit-check-card">
          <div>
            <span className="section-number">Fit check</span>
            <h2>Tell us where the workflow breaks.</h2>
            <p>We’ll review the workflow, likely data requirements and operating-cost considerations before recommending a build.</p>
            <div className="contact-details">
              <span>HSR Layout, Bengaluru</span>
              <a href="mailto:contact@gtmflows.co">contact@gtmflows.co</a>
              <a href="https://www.linkedin.com/company/gtm-flows/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
