import { redirect } from "next/navigation";

export const metadata = {
  title: "Private Revenue Systems | GTM Flows",
  robots: { index: false, follow: false },
};

export default function RevenueSystemsRedirectPage() {
  redirect("/private/revenue-systems");
}
