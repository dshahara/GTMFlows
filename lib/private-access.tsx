import { ADMIN_EMAILS } from "@/lib/catalogue";
import { requireAuthenticatedUser, signOutPath } from "@/lib/auth";
import { isAdminEmail } from "@/lib/catalogue-store";

export async function getPrivateAccess(returnTo: string) {
  const user = await requireAuthenticatedUser(returnTo);
  return { user, allowed: isAdminEmail(user.email) };
}

export function PrivateAccessDenied({ signedInEmail }: { signedInEmail: string }) {
  return (
    <main className="admin-denied">
      <div>
        <span className="section-number">Private page</span>
        <h1>This page is private to GTM Flows.</h1>
        <p>Signed in as {signedInEmail}. Approved viewers are {ADMIN_EMAILS.join(" and ")}.</p>
        <a className="button button-dark" href={signOutPath("/")}>Sign out</a>
      </div>
    </main>
  );
}
