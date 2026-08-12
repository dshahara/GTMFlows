import { notFound } from "next/navigation";
import { requireChatGPTUser } from "@/app/chatgpt-auth";
import { getCatalogueRecord, isAdminEmail } from "@/lib/catalogue-store";
import { toPublicAutomation } from "@/lib/catalogue";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Draft Preview | GTM Flows",
  robots: { index: false, follow: false },
};

export default async function AdminPreviewPage({ params }: PageProps) {
  const user = await requireChatGPTUser("/admin");
  if (!isAdminEmail(user.email)) notFound();

  const { id } = await Promise.resolve(params);
  const record = await getCatalogueRecord(Number(id));
  if (!record) notFound();

  const automation = toPublicAutomation(record.draft, record.sortOrder);

  return (
    <main className="automation-page admin-preview-page">
      <nav className="nav shell" aria-label="Admin preview navigation">
        <a className="brand" href="/admin" aria-label="Back to GTM Flows admin">
          <img className="brand-logo" src="/gf-logo.png" alt="" />
          <span>GTM/FLOWS</span>
        </a>
        <div className="nav-links">
          <a href="/admin">Back to admin</a>
          {record.published && <a href={`/automations/${record.published.slug}`}>Open published</a>}
        </div>
        <span className="button button-light nav-cta">Draft preview</span>
      </nav>

      <section className={`detail-hero shell accent-${automation.accent}`}>
        <div>
          <div className="breadcrumbs"><a href="/admin">Admin</a><span>/</span><span>Draft preview</span></div>
          <span className="section-number">{automation.category} draft preview</span>
          <h1>{automation.name}</h1>
          <p>{automation.short}</p>
          <div className="detail-actions">
            <a className="button button-dark" href="/admin">Back to editor <span>↗</span></a>
            {record.published && <a className="button button-light" href={`/automations/${record.published.slug}`}>Compare published <span>→</span></a>}
          </div>
        </div>
        <aside className="answer-card">
          <span>DIRECT ANSWER PREVIEW</span>
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
    </main>
  );
}
