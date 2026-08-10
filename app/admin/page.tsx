import { requireChatGPTUser, chatGPTSignOutPath } from "@/app/chatgpt-auth";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ADMIN_EMAILS } from "@/lib/catalogue";
import { getCatalogueRecords, isAdminEmail } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Catalogue Admin | GTM Flows",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");
  if (!isAdminEmail(user.email)) {
    return (
      <main className="admin-denied">
        <div>
          <span className="section-number">Access denied</span>
          <h1>This ChatGPT account is not approved for GTM Flows admin.</h1>
          <p>Signed in as {user.email}. Approved admins are {ADMIN_EMAILS.join(" and ")}.</p>
          <a className="button button-dark" href={chatGPTSignOutPath("/admin")}>Sign out</a>
        </div>
      </main>
    );
  }

  const records = await getCatalogueRecords();
  return <AdminDashboard initialRecords={records} userEmail={user.email.toLowerCase()} />;
}
