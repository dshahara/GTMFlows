import type { Metadata } from "next";
import { PrivateAccessDenied, getPrivateAccess } from "@/lib/private-access";
import { RevenueSystemsPageContent } from "@/components/RevenueSystemsPageContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Revenue Systems | GTM Flows",
  robots: { index: false, follow: false },
};

export default async function PrivateRevenueSystemsPage() {
  const { user, allowed } = await getPrivateAccess("/private/revenue-systems");
  if (!allowed) return <PrivateAccessDenied signedInEmail={user.email} />;

  return <RevenueSystemsPageContent />;
}
