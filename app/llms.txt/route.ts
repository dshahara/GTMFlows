import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { getPublishedAutomations } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const automations = await getPublishedAutomations();
  const lines = [
    "# GTM Flows",
    "",
    "GTM Flows provides fixed-scope GTM automation builds for B2B sales and revenue teams in India.",
    "",
    "## Automation catalogue",
    "",
    ...automations.flatMap((automation) => [
      `- ${automation.name}: ${automation.answerSummary}`,
      `  URL: ${CANONICAL_ORIGIN}/automations/${automation.slug}`,
      `  Setup: ${automation.setup}; Monthly running cost: ${automation.monthly}; Implementation: ${automation.days}; Tools: ${automation.tools.join(", ")}`,
      "",
    ]),
    "## Contact",
    "",
    "Use the website contact form for fit checks and catalogue automation enquiries.",
  ];

  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
