import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { findPublishedAutomationBySlug, getPublishedAutomations } from "@/lib/catalogue-store";
import { localBusinessJsonLd } from "@/lib/seo";

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
    title: getAutomationSeoTitle(automation.name, automation.seoTitle),
    description: getAutomationMetaDescription(automation),
    alternates: { canonical: url },
    openGraph: {
      title: getAutomationSeoTitle(automation.name, automation.seoTitle),
      description: getAutomationMetaDescription(automation),
      type: "article",
      url,
      images: [{ url: `${CANONICAL_ORIGIN}/og.png`, width: 1200, height: 630, alt: `${automation.name} by GTM Flows` }],
    },
    twitter: {
      card: "summary_large_image",
      title: getAutomationSeoTitle(automation.name, automation.seoTitle),
      description: getAutomationMetaDescription(automation),
      images: [`${CANONICAL_ORIGIN}/og.png`],
    },
  };
}

function getAutomationSeoTitle(name: string, fallback: string) {
  const map: Record<string, string> = {
    "Lead-to-Rep in 5 Minutes": "Lead Routing Automation for Fast B2B Follow-Up | GTM Flows",
    "Research-to-CRM Engine": "Research-to-CRM Automation for B2B Sales | GTM Flows",
    "No-Touch CRM Updates": "Sales Meeting CRM Automation for B2B Teams | GTM Flows",
    "No Lead Left Behind": "Lead Follow-Up SLA Automation for Sales Teams | GTM Flows",
    "Always-Clean CRM": "CRM Data Quality Automation for RevOps Teams | GTM Flows",
    "Pipeline Revival": "Closed-Lost Pipeline Revival Automation | GTM Flows",
    "Deal Follow-Up Autopilot": "Proposal Follow-Up Automation for Sales Teams | GTM Flows",
    "Hot Account Alerts": "Buying Intent Alert Automation for B2B Sales | GTM Flows",
    "Lead Source & CRM Sync": "Lead Source Attribution Sync Automation | GTM Flows",
    "Renewal & Expansion Alerts": "Renewal and Expansion Alert Automation | GTM Flows",
  };
  return map[name] ?? fallback;
}

function getAutomationH1(name: string) {
  const map: Record<string, string> = {
    "Lead-to-Rep in 5 Minutes": "Lead routing automation for fast B2B follow-up",
    "Research-to-CRM Engine": "Research-to-CRM automation for B2B sales teams",
    "No-Touch CRM Updates": "Sales meeting CRM automation",
    "No Lead Left Behind": "Lead follow-up SLA automation",
    "Always-Clean CRM": "CRM data quality automation",
    "Pipeline Revival": "Closed-lost pipeline revival automation",
    "Deal Follow-Up Autopilot": "Proposal follow-up automation",
    "Hot Account Alerts": "Buying intent alert automation",
    "Lead Source & CRM Sync": "Lead source attribution sync automation",
    "Renewal & Expansion Alerts": "Renewal and expansion alert automation",
  };
  return map[name] ?? name;
}

function getAutomationMetaDescription(automation: { name: string; metaDescription: string; setup: string; monthly: string; days: string }) {
  const map: Record<string, string> = {
    "Lead-to-Rep in 5 Minutes": "Route inbound leads faster with enrichment, scoring, CRM assignment and SLA alerts. See cost, tools and implementation time.",
    "Research-to-CRM Engine": "Automate B2B account research, enrichment, verification and CRM sync. Compare cost, tools, timing and fit before building.",
    "No-Touch CRM Updates": "Turn sales calls into CRM summaries, next steps, tasks and follow-up drafts with review controls and clear implementation costs.",
    "No Lead Left Behind": "Automate lead follow-up SLAs, reminders, escalations and reassignment so high-value leads do not sit untouched.",
    "Always-Clean CRM": "Detect duplicates, missing fields, stale records and risky CRM data issues with reports, enrichment and approval queues.",
    "Pipeline Revival": "Find stalled or closed-lost deals, detect fresh signals, draft re-engagement and track reopened pipeline opportunities.",
    "Deal Follow-Up Autopilot": "Automate proposal follow-up dates, reminders, escalation and CRM next actions for sales teams managing active deals.",
    "Hot Account Alerts": "Convert website, product and first-party buying signals into qualified sales alerts with scoring, routing and CRM evidence.",
    "Lead Source & CRM Sync": "Preserve lead source, UTM, form and campaign attribution across CRM records, ad platforms and analytics tools.",
    "Renewal & Expansion Alerts": "Monitor renewal dates, risk signals and expansion opportunities across CRM, product, support and billing data.",
  };
  return map[automation.name] ?? automation.metaDescription;
}

function extendedFaqs(automation: { name: string; setup: string; monthly: string; days: string; tools: string[]; fit: string; threshold: string; faqs: Array<{ question: string; answer: string }> }) {
  const shared = [
    { question: `How much does ${automation.name} cost?`, answer: `Published estimates for ${automation.name} are ${automation.setup} setup plus ${automation.monthly} per month in running costs. Final cost depends on tools, volume and edge cases.` },
    { question: `How long does ${automation.name} take to implement?`, answer: `${automation.name} usually takes ${automation.days} once access, data inputs, rules and acceptance criteria are confirmed.` },
    { question: `Which tools does ${automation.name} support?`, answer: `Common supported tools include ${automation.tools.slice(0, 6).join(", ")}${automation.tools.length > 6 ? " and related CRM or automation platforms" : ""}.` },
    { question: `Who is ${automation.name} best for?`, answer: automation.fit },
  ];
  const seen = new Set<string>();
  return [...automation.faqs, ...shared].filter((faq) => {
    if (seen.has(faq.question)) return false;
    seen.add(faq.question);
    return true;
  });
}

export default async function AutomationPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const lookup = await findPublishedAutomationBySlug(slug);

  if (lookup.kind === "redirect") {
    permanentRedirect(`/automations/${lookup.toSlug}`);
  }
  if (lookup.kind === "missing") notFound();

  const automation = lookup.automation;
  const faqs = extendedFaqs(automation);
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
      audience: {
        "@type": "BusinessAudience",
        audienceType: "RevOps, growth, sales and customer success teams",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: automation.setupCostMin,
        highPrice: automation.setupCostMax,
        offerCount: 1,
      },
    },
    localBusinessJsonLd,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: CANONICAL_ORIGIN },
        { "@type": "ListItem", position: 2, name: "Automations", item: `${CANONICAL_ORIGIN}/catalogue` },
        { "@type": "ListItem", position: 3, name: automation.name, item: url },
      ],
    },
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
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
      <SiteNav />

      <section className={`detail-hero shell accent-${automation.accent}`}>
        <div>
          <div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href="/catalogue">Automations</a><span>/</span><span>{automation.name}</span></div>
          <span className="section-number">{automation.category}</span>
          <h1>{getAutomationH1(automation.name)}</h1>
          <p>{automation.short}</p>
          <div className="detail-actions">
            <a className="button button-dark" href="/catalogue#roi">Calculate ROI <span>↗</span></a>
            <a className="button button-light" href="/contact">Book fit check <span>→</span></a>
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
          <h2>What does {automation.name} automate?</h2>
          <ul className="check-list">{automation.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
          <p className="quote-line">{automation.name} is most useful when the workflow has repeated volume, clear business rules and a measurable operational metric.</p>
        </article>

        <article className="detail-panel">
          <span>Workflow</span>
          <h2>How does the {automation.name} workflow run?</h2>
          <ol className="step-list">{automation.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>

        <article className="detail-panel">
          <span>Economics</span>
          <h2>What does {automation.name} cost in India?</h2>
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
          <h2>Who is {automation.name} best for?</h2>
          <p>{automation.fit}</p>
          <h3>Check first</h3>
          <p>{automation.threshold}</p>
        </article>

        <article className="detail-panel">
          <span>Tools</span>
          <h2>Which tools does {automation.name} support?</h2>
          <div className="tool-list detail-tools">{automation.tools.map((tool) => <i key={tool}>{tool}</i>)}</div>
        </article>

        <article className="detail-panel wide">
          <span>Decision guide</span>
          <h2>When should this automation be built first?</h2>
          <table className="decision-table">
            <thead>
              <tr><th>Build now</th><th>Check first</th><th>Measure after launch</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{automation.fit}</strong></td>
                <td>{automation.threshold}</td>
                <td>{automation.metric}</td>
              </tr>
            </tbody>
          </table>
        </article>

        {faqs.length > 0 && (
          <article className="detail-panel wide">
            <span>FAQs</span>
            <h2>Common questions about {automation.name}</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
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
          )) : <a className="related-card accent-lime" href="/catalogue"><span>Catalogue</span><strong>Browse all GTM flows</strong><small>Compare cost, timing and fit</small></a>}
        </div>
      </section>

      <section className="cta shell">
        <div>
          <span className="section-number">NEXT STEP</span>
          <h2>Check whether this flow is worth building first.</h2>
        </div>
        <div>
          <p>We confirm volume, tools, edge cases and monthly running cost before recommending the build.</p>
          <a className="button button-light" href="/contact">Request a fit check <span>↗</span></a>
        </div>
      </section>

      <SiteFooter source={`${automation.name} automation page`} />
    </main>
  );
}
