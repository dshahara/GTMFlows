import { env } from "cloudflare:workers";

export const dynamic = "force-dynamic";

type InquiryPayload = {
  name?: string;
  email?: string;
  company?: string;
  automation?: string;
  message?: string;
  website?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as InquiryPayload;
    const inquiry = normalizeInquiry(payload);

    if (inquiry.website) {
      return Response.json({ ok: true });
    }

    const validationError = validateInquiry(inquiry);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const webhookUrl = getEnvString("SLACK_WEBHOOK_URL");
    if (!webhookUrl) {
      return Response.json(
        { error: "Slack notifications are not configured yet. Please email hello@gtmflows.co for now." },
        { status: 503 },
      );
    }

    const slackResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toSlackMessage(inquiry, request.url)),
    });

    if (!slackResponse.ok) {
      throw new Error(`Slack rejected the inquiry with status ${slackResponse.status}.`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact inquiry failed", error);
    return Response.json({ error: "Unable to send inquiry right now. Please email hello@gtmflows.co." }, { status: 500 });
  }
}

function normalizeInquiry(payload: InquiryPayload) {
  return {
    name: clean(payload.name, 90),
    email: clean(payload.email, 140),
    company: clean(payload.company, 120),
    automation: clean(payload.automation, 160),
    message: clean(payload.message, 1800),
    website: clean(payload.website, 160),
    source: clean(payload.source, 180) || "Website contact form",
  };
}

function clean(value: unknown, limit: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function validateInquiry(inquiry: ReturnType<typeof normalizeInquiry>) {
  if (!inquiry.name) return "Please add your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return "Please add a valid work email.";
  if (!inquiry.message || inquiry.message.length < 12) return "Please add a little more detail about the workflow.";
  return null;
}

function getEnvString(key: string) {
  const value = (env as unknown as Record<string, unknown>)[key];
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function toSlackMessage(inquiry: ReturnType<typeof normalizeInquiry>, requestUrl: string) {
  const submittedFrom = new URL(requestUrl).origin;
  const fields = [
    { type: "mrkdwn", text: `*Name*\n${inquiry.name}` },
    { type: "mrkdwn", text: `*Email*\n${inquiry.email}` },
    { type: "mrkdwn", text: `*Company*\n${inquiry.company || "Not provided"}` },
    { type: "mrkdwn", text: `*Automation interest*\n${inquiry.automation || "Not specified"}` },
    { type: "mrkdwn", text: `*Source*\n${inquiry.source}` },
    { type: "mrkdwn", text: `*Website*\n${submittedFrom}` },
  ];

  return {
    text: `New GTM Flows inquiry from ${inquiry.name} (${inquiry.email})`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New GTM Flows inquiry", emoji: true },
      },
      {
        type: "section",
        fields,
      },
      {
        type: "section",
        text: { type: "mrkdwn", text: `*Workflow details*\n${inquiry.message}` },
      },
    ],
  };
}
