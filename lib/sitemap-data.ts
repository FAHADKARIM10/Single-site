import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "./site";
import { getAllItems } from "./content";

// Shared by app/sitemap.ts (which needs the actual entries, chunked) and
// app/robots.ts (which only needs to know how many child sitemap files exist)
// so the two files can never disagree about how many /sitemap/[id].xml chunks
// there are.
export const SITEMAP_CHUNK_SIZE = 40000; // under Google's 50,000-URL-per-file cap

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const items = getAllItems();

  const latestUpdate = items.reduce(
    (latest, item) => (item.updatedAt > latest ? item.updatedAt : latest),
    "2026-01-01"
  );

  // Noindexed routes (/search, /privacy, /disclaimer, /terms) are deliberately
  // excluded — a sitemap should only list pages you want indexed.
  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_DOMAIN, lastModified: new Date(latestUpdate), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_DOMAIN}/about`, lastModified: new Date(latestUpdate), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_DOMAIN}/contact`, lastModified: new Date(latestUpdate), changeFrequency: "yearly", priority: 0.3 },
  ];

  const itemEntries: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${SITE_DOMAIN}/${item.slug}`,
    lastModified: new Date(item.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...itemEntries];
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(buildSitemapEntries().length / SITEMAP_CHUNK_SIZE));
}
