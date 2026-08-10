import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { findPublishedAutomationBySlug, getPublishedAutomations } from "@/lib/catalogue-store";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const lookup = await findPublishedAutomationBySlug(slug);
  if (lookup.kind !== "automation") {
    return {
      title: "Automation not found | GTM Flows",
      robots: { index: false, follow: false },
    };
  }

  const automation = lookup.automation;
  const url = `${CANONICAL_ORIGIN}/automations/${automation.slug}`;
  return {
    title: automation.seoTitle,
    description: automation.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: automation.seoTitle,
      description: automation.metaDescription,
      type: "article",
      url,
      images: [{ url: `${CANONICAL_ORIGIN}/og.png`, width: 1200, height: 630, alt: `${automation.name} by GTM Flows` }],
    },
    twitter: {
      card: "summary_large_image",
      title: automation.seoTitle,
      description: automation.metaDescription,
      images: [`${CANONICAL_ORIGIN}/og.png`],
    },
  };
}

export default async function AutomationPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const lookup = await findPublishedAutomationBySlug(slug);

  if (lookup.kind === "redirect") {
    permanentRedirect(`/automations/${lookup.toSlug}`);
  }
  if (lookup.kind === "missing") notFound();

  const automation = lookup.automation;
  const related = (await getPublishedAutomations())
    .filter((item) => item.slug !== automation.slug && item.category === automation.category)
    .slice(0, 3);
  const url = `${CANONICAL_ORIGIN}/automations/${automation.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: automation.name,
      provider: { "@type": "Organization", name: "GTM Flows", url: CANONICAL_ORIGIN },
      areaServed: "India",
      serviceType: "GTM automation",
      url,
      description: automation.metaDescription,
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: automation.setupCostMin,
        highPrice: automation.setupCostMax,
        offerCount: 1,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: CANONICAL_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Automations", item: `${CANONICAL_ORIGIN}/#catalogue` },
        { "@type": "ListItem", position: 3, name: automation.name, item: url },
      ],
    },
    ...(automation.faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: automation.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <main className="automation-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="/" aria-label="GTM Flows home">
          <img className="brand-logo" src="/gf-logo.png" alt="" />
          <span>GTM/FLOWS</span>
        </a>
        <div className="nav-links">
          <a href="/#catalogue">Catalogue</a>
          <a href="/#roi">ROI calculator</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="button button-dark nav-cta" href="#contact">Discuss this flow <span>↗</span></a>
      </nav>

      <section className={`detail-hero shell accent-${automation.accent}`}>
        <div>
          <div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/#catalogue">Automations</a><span>/</span><span>{automation.name}</span></div>
          <span className="section-number">{automation.category} / AUTOMATION {String(automation.order).padStart(2, "0")}</span>
          <h1>{automation.name}</h1>
          <p>{automation.short}</p>
          <div className="detail-actions">
            <a className="button button-dark" href="/#roi">Calculate ROI <span>↗</span></a>
            <a className="button button-light" href="#contact">Book fit check <span>→</span></a>
          </div>
        </div>
        <aside className="answer-card">
          <span>DIRECT ANSWER</span>
          <p>{automation.answerSummary}</p>
        </aside>
      </section>

      <section className="detail-grid shell">
        <article className="detail-panel wide">
          <span>The automation</span>
          <h2>What it does</h2>
          <ul className="check-list">{automation.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
        </article>

        <article className="detail-panel">
          <span>Workflow</span>
          <h2>Ordered steps</h2>
          <ol className="step-list">{automation.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>

        <article className="detail-panel">
          <span>Economics</span>
          <h2>Cost and timing</h2>
          <dl className="detail-facts">
            <div><dt>Setup</dt><dd>{automation.setup}</dd></div>
            <div><dt>Running cost</dt><dd>{automation.monthly}/month</dd></div>
            <div><dt>Implementation</dt><dd>{automation.days}</dd></div>
            <div><dt>Complexity</dt><dd>{automation.complexity}</dd></div>
            <div><dt>Primary metric</dt><dd>{automation.metric}</dd></div>
          </dl>
        </article>

        <article className="detail-panel">
          <span>Qualification</span>
          <h2>Best fit</h2>
          <p>{automation.fit}</p>
          <h3>Check first</h3>
          <p>{automation.threshold}</p>
        </article>

        <article className="detail-panel">
          <span>Tools</span>
          <h2>Supported stack</h2>
          <div className="tool-list detail-tools">{automation.tools.map((tool) => <i key={tool}>{tool}</i>)}</div>
        </article>

        {automation.faqs.length > 0 && (
          <article className="detail-panel wide">
            <span>FAQs</span>
            <h2>Common questions</h2>
            <div className="faq-list">
              {automation.faqs.map((faq) => (
                <section key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              ))}
            </div>
          </article>
        )}
      </section>

      <section className="related shell">
        <span className="section-number">Related automations</span>
        <div className="related-grid">
          {related.length ? related.map((item) => (
            <a className={`related-card accent-${item.accent}`} href={`/automations/${item.slug}`} key={item.slug}>
              <span>{item.category}</span>
              <strong>{item.name}</strong>
              <small>{item.setup} setup · {item.days}</small>
            </a>
          )) : <a className="related-card accent-lime" href="/#catalogue"><span>Catalogue</span><strong>Browse all GTM flows</strong><small>Compare cost, timing and fit</small></a>}
        </div>
      </section>

      <section className="cta shell">
        <div>
          <span className="section-number">NEXT STEP</span>
          <h2>Check whether this flow is worth building first.</h2>
        </div>
        <div>
          <p>We confirm volume, tools, edge cases and monthly running cost before recommending the build.</p>
          <a className="button button-light" href="#contact">Request a fit check <span>↗</span></a>
        </div>
      </section>

      <SiteFooter source={`${automation.name} automation page`} />
    </main>
  );
}
