import { SITE_DOMAIN, SITE_NAME } from "@/lib/site";
import type { Item } from "@/lib/schema";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─── SCHEMA BUILDERS ──────────────────────────────────────────────────────────
// No `sameAs` field — omitted entirely rather than link placeholder social
// profiles (per explicit instruction; add real profile URLs here if you get them).
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/icon.png`,
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_DOMAIN,
    publisher: { "@type": "Organization", name: SITE_NAME },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_DOMAIN}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** SoftwareApplication for an item page. Uses a single publisher-authored Review
 *  driven by the item's real `editorialScore` rather than a fabricated
 *  aggregateRating. `aggregateRating` is only added when the item carries a
 *  genuine `userRatingValue`/`userRatingCount` pair — never a placeholder. */
export function softwareApplicationSchema(item: Item) {
  const url = `${SITE_DOMAIN}/${item.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: item.name,
    url,
    description: item.shortDescription,
    image: `${SITE_DOMAIN}${item.icon}`,
    softwareVersion: item.version,
    fileSize: item.fileSize,
    operatingSystem: `Android ${item.minAndroidVersion}+`,
    applicationCategory: "https://schema.org/MobileApplication",
    datePublished: item.publishedAt,
    dateModified: item.updatedAt,
    author: { "@type": "Organization", name: item.developer },
    publisher: { "@type": "Organization", name: SITE_NAME },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    review: {
      "@type": "Review",
      author: { "@type": "Organization", name: SITE_NAME },
      reviewRating: {
        "@type": "Rating",
        ratingValue: item.editorialScore,
        bestRating: 5,
        worstRating: 0,
      },
    },
    ...(item.userRatingValue !== undefined && item.userRatingCount !== undefined
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: item.userRatingValue,
            reviewCount: item.userRatingCount,
            bestRating: 5,
            worstRating: 0,
          },
        }
      : {}),
  };
}
