"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm({ source = "Contact page" }: { source?: string }) {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setMessage("");

    const process = String(data.get("process") ?? "").trim();
    const tools = String(data.get("tools") ?? "").trim();
    const volume = String(data.get("volume") ?? "").trim();
    const outcome = String(data.get("outcome") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          company: String(data.get("company") ?? "").trim(),
          automation: role ? `Role: ${role}` : "Revenue system fit check",
          message: [
            `Process: ${process}`,
            tools && `Current tools: ${tools}`,
            volume && `Monthly volume: ${volume}`,
            outcome && `Desired improvement: ${outcome}`,
          ].filter(Boolean).join("\n"),
          website: String(data.get("website") ?? "").trim(),
          source,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Unable to send inquiry right now.");

      form.reset();
      setStatus("sent");
      setMessage("Thanks — your inquiry has been sent. We’ll review the fit and get back to you.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to send inquiry right now.");
    }
  }

  return (
    <form className="fit-check-form" onSubmit={submitInquiry}>
      <label>Name<input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
      <label>Work email<input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
      <label>Company<input name="company" type="text" autoComplete="organization" placeholder="Company name" /></label>
      <label>Your role<input name="role" type="text" autoComplete="organization-title" placeholder="Founder, RevOps, Growth..." /></label>
      <label className="full">Current CRM and GTM tools<input name="tools" type="text" placeholder="HubSpot, Clay, Apollo, n8n..." /></label>
      <label className="full">Which process is breaking or consuming time?<textarea name="process" rows={4} required placeholder="Describe the current workflow and where it breaks." /></label>
      <label>Approximate monthly volume<input name="volume" type="text" placeholder="Accounts, leads or customers" /></label>
      <label>What should improve?<input name="outcome" type="text" placeholder="Speed, coverage, pipeline quality..." /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
      <button className="button button-dark full" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Request a fit check"}
      </button>
      <p className="fit-check-note full">No obligation. If automation is not the right first step, we will say so.</p>
      {message && <p className={`form-message full ${status === "error" ? "error" : "success"}`} role="status">{message}</p>}
    </form>
  );
}
