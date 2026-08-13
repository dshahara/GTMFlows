import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { SiteNav } from "@/components/SiteNav";
import { hasSupabasePublicConfig } from "@/lib/supabase/env";

type PageProps = {
  searchParams: Promise<{ returnTo?: string }> | { returnTo?: string };
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Sign In | GTM Flows",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await Promise.resolve(searchParams);
  const returnTo = params.returnTo || "/admin";

  return (
    <main className="auth-page">
      <SiteNav />
      <section className="shell auth-shell">
        {hasSupabasePublicConfig() ? (
          <LoginForm returnTo={returnTo} />
        ) : (
          <div className="login-card">
            <span className="section-number">Setup required</span>
            <h1>Supabase Auth is not configured yet.</h1>
            <p>Add the Supabase URL and anon key to the Netlify environment before using admin sign-in.</p>
          </div>
        )}
      </section>
    </main>
  );
}
