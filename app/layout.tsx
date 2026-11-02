import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { MobileDonateBar } from "@/components/layout/mobile-donate-bar";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const grotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"], display: "swap", weight: ["400", "500", "600", "700"] });

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-23-ngo-climate.vercel.app").replace(/\/$/, "");

export const viewport: Viewport = { themeColor: "#0C2A1E" };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    template: `%s · ${siteConfig.brand.name}`,
  },
  description: siteConfig.brand.description,
  keywords: ["tree planting Nigeria", "Great Green Wall", "mangrove restoration Niger Delta", "climate NGO Lagos", "carbon offset Nigeria", "clean cookstoves", "donate Nigeria", "FinStore template"],
  openGraph: {
    type: "website",
    siteName: siteConfig.brand.name,
    title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
    description: siteConfig.brand.description,
    url: siteUrl,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG">
      <body className={`${inter.variable} ${grotesk.variable} antialiased`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] btn btn-lime">
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileDonateBar />
      </body>
    </html>
  );
}
