import { AdminDashboard } from "@/components/AdminDashboard";
import { accessDeniedMessage, requireAdminUser, signOutPath } from "@/lib/auth";
import { getCatalogueRecords, isAdminEmail } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Catalogue Admin | GTM Flows",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdminUser("/admin");
  if (!isAdminEmail(user.email)) {
    return (
      <main className="admin-denied">
        <div>
          <span className="section-number">Access denied</span>
          <h1>This email is not approved for GTM Flows admin.</h1>
          <p>{accessDeniedMessage(user.email)}</p>
          <a className="button button-dark" href={signOutPath("/admin")}>Sign out</a>
        </div>
      </main>
    );
  }

  const records = await getCatalogueRecords();
  return <AdminDashboard initialRecords={records} userEmail={user.email.toLowerCase()} />;
}
