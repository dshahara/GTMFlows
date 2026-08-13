"use client";

import { useMemo, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type LoginFormProps = {
  returnTo: string;
};

export function LoginForm({ returnTo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = useMemo(() => {
    if (typeof window === "undefined") return "";
    const next = encodeURIComponent(returnTo || "/admin");
    return `${window.location.origin}/auth/callback?next=${next}`;
  }, [returnTo]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setMessage("Check your email for the login link.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to send login link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="login-card" onSubmit={submit}>
      <span className="section-number">Admin sign in</span>
      <h1>Sign in to manage the catalogue</h1>
      <p>Use the approved GTM Flows admin email. We’ll send a secure login link through Supabase Auth.</p>
      <label>
        Work email
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <button className="button button-dark" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send login link"}
      </button>
      {message && <p className="login-message">{message}</p>}
    </form>
  );
}
