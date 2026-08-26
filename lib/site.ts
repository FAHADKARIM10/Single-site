// Single source of truth for the canonical host. Every canonical URL, OG url,
// sitemap entry, and internal link must be built from this constant so the
// host is never inconsistent across the site (see proxy.ts for the runtime
// redirect that enforces this same host at the edge).
export const SITE_DOMAIN = "https://apksumal.com";
export const SITE_NAME = "APK Sumal";
// Niche: casino, color-prediction, and real-money "earning game" APKs for
// Pakistan specifically — not a general Android app directory. Every category
// and item should fit inside that scope; see SEO.md.
export const SITE_DESCRIPTION =
  "APK Sumal reviews casino, color-prediction, and real-money earning game apps for Pakistan — real payout mechanics, real legal risk, and an honest editorial verdict on every listing.";
