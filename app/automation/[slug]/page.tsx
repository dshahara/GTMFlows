import { permanentRedirect } from "next/navigation";
import { AUTOMATIONS_BASE_PATH } from "@/lib/brand";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export const metadata = {
  title: "Automation Redirect | GTM Flows",
  robots: { index: false, follow: true },
};

export default async function SingularAutomationRedirectPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  permanentRedirect(`${AUTOMATIONS_BASE_PATH}/${slug}`);
}
