import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { AUTOMATIONS_BASE_PATH } from "@/lib/brand";
import { getPublishedAutomations } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const automations = await getPublishedAutomations();
  const lines = [
    "# GTM Flows",
    "",
    "GTM Flows builds automated revenue systems using AI, data enrichment and workflow automation for RevOps, growth and customer success teams in India.",
    "",
    "We connect fragmented customer data, identify meaningful signals and activate the next best action across the revenue lifecycle.",
    "",
    "## Core pages",
    "",
    `- How we build: ${CANONICAL_ORIGIN}/how-we-build`,
    `- Automation catalogue and ROI calculator: ${CANONICAL_ORIGIN}/catalogue`,
    `- Frequently asked questions: ${CANONICAL_ORIGIN}/faq`,
    `- Contact and fit check: ${CANONICAL_ORIGIN}/contact`,
    "",
    "## Automation catalogue",
    "",
    ...automations.flatMap((automation) => [
      `- ${automation.name}: ${automation.answerSummary}`,
      `  URL: ${CANONICAL_ORIGIN}${AUTOMATIONS_BASE_PATH}/${automation.slug}`,
      `  Setup: ${automation.setup}; Monthly running cost: ${automation.monthly}; Implementation: ${automation.days}; Tools: ${automation.tools.join(", ")}`,
      "",
    ]),
    "## Contact",
    "",
    `Use the fit-check form at ${CANONICAL_ORIGIN}/contact for revenue-system and automation enquiries.`,
  ];

  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
