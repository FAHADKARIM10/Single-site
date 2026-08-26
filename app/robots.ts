import type { MetadataRoute } from "next";
import { SITE_DOMAIN } from "@/lib/site";
import { getSitemapChunkCount } from "@/lib/sitemap-data";

export default function robots(): MetadataRoute.Robots {
  const chunkCount = getSitemapChunkCount();
  const sitemaps = Array.from({ length: chunkCount }, (_, id) => `${SITE_DOMAIN}/sitemap/${id}.xml`);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: sitemaps,
  };
}
