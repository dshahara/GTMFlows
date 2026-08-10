import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CANONICAL_ORIGIN } from "@/lib/catalogue";
import "./globals.css";

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
    title: "GTM Flows — GTM Automation Catalogue",
    description: "Browse fixed-price GTM automations with transparent setup costs, monthly running costs, implementation time and ROI.",
    metadataBase: new URL(CANONICAL_ORIGIN),
    alternates: { canonical: CANONICAL_ORIGIN },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/favicon.png",
    },
    openGraph: {
      title: "Know what to automate. Know what it costs.",
      description: "10 ready-to-deploy GTM automations with transparent costs, implementation time and ROI.",
      type: "website",
      url: CANONICAL_ORIGIN,
      images: [{ url: `${CANONICAL_ORIGIN}/og.png`, width: 1200, height: 630, alt: "GTM Flows automation catalogue" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Know what to automate. Know what it costs.",
      description: "10 ready-to-deploy GTM automations with transparent costs, implementation time and ROI.",
      images: [`${CANONICAL_ORIGIN}/og.png`],
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
