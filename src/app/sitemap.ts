import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  const base = siteConfig.url.replace(/\/$/, "");
  return [
    { url: base },
    { url: `${base}/kitchen` },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}` })),
  ];
}
