import type { MetadataRoute } from "next";
import { buildSitemapEntries, getSitemapChunkCount, SITEMAP_CHUNK_SIZE } from "@/lib/sitemap-data";

// Splits into /sitemap/0.xml, /sitemap/1.xml, ... once the site crosses
// SITEMAP_CHUNK_SIZE URLs, per Next's generateSitemaps convention. With one
// category/item today this yields a single chunk — the splitting logic is
// already in place for when the catalog grows to 500+.
export function generateSitemaps() {
  return Array.from({ length: getSitemapChunkCount() }, (_, id) => ({ id }));
}

export default async function sitemap({ id }: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const chunkId = Number(await id);
  const start = chunkId * SITEMAP_CHUNK_SIZE;
  return buildSitemapEntries().slice(start, start + SITEMAP_CHUNK_SIZE);
}
