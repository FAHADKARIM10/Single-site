import type { Metadata } from "next";
import { SITE_DOMAIN, SITE_NAME } from "./site";

interface SeoOptions {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  type?: "website" | "article";
}

/** Every route builds its metadata through this — one place that guarantees
 *  canonical, OG url, and Twitter card always agree with each other and with
 *  SITE_DOMAIN. No page should construct these tags by hand. */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage,
  type = "website",
}: SeoOptions): Metadata {
  const canonical = `${SITE_DOMAIN}${path}`;
  const image = ogImage ?? `${SITE_DOMAIN}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type,
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
