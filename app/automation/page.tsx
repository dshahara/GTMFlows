import { permanentRedirect } from "next/navigation";

export const metadata = {
  title: "Automation Catalogue | GTM Flows",
  robots: { index: false, follow: true },
};

export default function SingularAutomationIndexRedirectPage() {
  permanentRedirect("/catalogue");
}
