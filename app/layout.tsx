import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import "./globals.css";
import "./marketing.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Automated Revenue Systems for B2B Teams | GTM Flows",
    description: "GTM Flows builds automated revenue systems using data enrichment, buying signals, AI research and workflow automation for B2B revenue teams.",
    metadataBase: new URL(CANONICAL_ORIGIN),
    alternates: { canonical: CANONICAL_ORIGIN },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Build a revenue system that knows who to target and why now.",
      description: "Connect revenue data, buying signals and GTM tools to identify opportunities, prioritise action and automate execution.",
      type: "website",
      url: CANONICAL_ORIGIN,
      images: [{ url: `${CANONICAL_ORIGIN}/gf-logo.svg`, width: 1200, height: 1200, alt: "GTM Flows logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Build a revenue system that knows who to target and why now.",
      description: "Connect revenue data, buying signals and GTM tools to identify opportunities, prioritise action and automate execution.",
      images: [`${CANONICAL_ORIGIN}/gf-logo.svg`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
