import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
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
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "GTM Flows — GTM Automation Catalogue",
    description: "Browse fixed-price GTM automations with transparent setup costs, monthly running costs, implementation time and ROI.",
    openGraph: {
      title: "Know what to automate. Know what it costs.",
      description: "10 ready-to-deploy GTM automations with transparent costs, implementation time and ROI.",
      type: "website",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "GTM Flows automation catalogue" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Know what to automate. Know what it costs.",
      description: "10 ready-to-deploy GTM automations with transparent costs, implementation time and ROI.",
      images: [`${origin}/og.png`],
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
