import type { Metadata } from "next";
import { HomePageClient } from "@/components/HomePageClient";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import { getPublishedAutomations } from "@/lib/catalogue-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GTM Automation Catalogue | GTM Flows",
  description: "Compare GTM automations by setup cost, monthly running cost, implementation time, supported tools and ROI.",
  alternates: { canonical: `${CANONICAL_ORIGIN}/catalogue` },
};

export default async function CataloguePage() {
  return <HomePageClient automations={await getPublishedAutomations()} />;
}
