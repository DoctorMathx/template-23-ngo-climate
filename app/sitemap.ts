import type { MetadataRoute } from "next";
import { programmes } from "@/mock/programmes";
import { projects } from "@/mock/projects";
import { campaigns } from "@/mock/campaigns";
import { stories } from "@/mock/stories";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://template-23-ngo-climate.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = ["", "/plant", "/donate", "/impact", "/projects", "/programmes", "/campaigns", "/canopy-club", "/business", "/partnerships", "/transparency", "/stories", "/events", "/get-involved", "/about", "/contact", "/faq"];
  return [
    ...statics.map((p) => ({ url: `${siteUrl}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.8 })),
    ...programmes.map((p) => ({ url: `${siteUrl}/programmes/${p.slug}`, lastModified: now })),
    ...projects.map((p) => ({ url: `${siteUrl}/projects/${p.slug}`, lastModified: now })),
    ...campaigns.map((c) => ({ url: `${siteUrl}/campaigns/${c.slug}`, lastModified: now })),
    ...stories.map((s) => ({ url: `${siteUrl}/stories/${s.slug}`, lastModified: new Date(s.date) })),
  ];
}
