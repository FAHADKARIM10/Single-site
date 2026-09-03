import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Download, Info } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE_DOMAIN } from "@/lib/site";
import { getAllItems, getCategoryBySlug, getItemBySlug, getRelatedItems } from "@/lib/content";
import {
  JsonLd,
  softwareApplicationSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/item/Breadcrumbs";
import { SpecsTable } from "@/components/item/SpecsTable";
import { ProsCons } from "@/components/item/ProsCons";
import { FaqSection } from "@/components/item/FaqSection";
import { RelatedItems } from "@/components/item/RelatedItems";
import { StarRating } from "@/components/ui/StarRating";

// In-article screenshots: `<Screenshot src="..." alt="..." float="left"|"right" />`.
// A block-level MDX component tag, not markdown `![]()` — a markdown image
// gets wrapped in a <p> by the parser, and this renders a <figure> with a
// nested <div>/<figcaption>, which isn't legal inside <p> and breaks hydration.
function Screenshot({ src, alt, float }: { src: string; alt: string; float?: "left" | "right" }) {
  const floatClass = float === "right" ? " mdx-screenshot--float-right" : float === "left" ? " mdx-screenshot--float-left" : "";

  return (
    <figure className={`mdx-screenshot${floatClass}`}>
      <div className="mdx-screenshot-frame">
        <Image src={src} alt={alt} width={750} height={1333} sizes="190px" />
      </div>
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

const mdxComponents = { Screenshot };

function DownloadCTA({ name, downloadUrl }: { name: string; downloadUrl: string }) {
  return (
    <div className="card-flat flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm sm:text-base font-semibold text-center sm:text-left" style={{ color: "#f4f4f8" }}>
        Ready to try {name}? Download the latest version now.
      </p>
      <a href={downloadUrl} className="btn-gold flex-shrink-0" rel="nofollow sponsored">
        <Download size={18} aria-hidden />
        Download {name}
      </a>
    </div>
  );
}

export function generateStaticParams() {
  return getAllItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) return {};

  const year = new Date(item.updatedAt).getFullYear();

  return buildMetadata({
    title: item.title ?? `${item.name} APK Download — Latest Version for Android ${year}`,
    description: item.shortDescription,
    path: `/${item.slug}`,
    ogImage: `${SITE_DOMAIN}/${item.slug}/opengraph-image`,
  });
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);
  if (!item) notFound();

  const category = getCategoryBySlug(item.category)!;
  const related = getRelatedItems(item, 6);

  // The body's opening prose (before its first `##` heading) is the intro —
  // render it under its own "Introduction" heading ahead of the app info table.
  const firstHeadingIndex = item.body.search(/\n##\s/);
  const introBody = (firstHeadingIndex === -1 ? item.body : item.body.slice(0, firstHeadingIndex)).trim();
  const restBody = (firstHeadingIndex === -1 ? "" : item.body.slice(firstHeadingIndex)).trim();

  // Split restBody again so a mid-article download CTA can sit right after
  // the how-to-get-started sections, ahead of the tips/games reference sections.
  const midSplitIndex = restBody.indexOf("## Expert Advice");
  const restBodyEarly = (midSplitIndex === -1 ? restBody : restBody.slice(0, midSplitIndex)).trim();
  const restBodyLate = (midSplitIndex === -1 ? "" : restBody.slice(midSplitIndex)).trim();

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: item.name, href: `/${item.slug}` },
  ];

  const breadcrumb = breadcrumbSchema(
    breadcrumbItems.map((b) => ({ name: b.name, url: `${SITE_DOMAIN}${b.href === "/" ? "" : b.href}` }))
  );

  return (
    <>
      <JsonLd data={softwareApplicationSchema(item)} />
      <JsonLd data={breadcrumb} />
      {item.faqs.length > 0 && <JsonLd data={faqPageSchema(item.faqs)} />}

      <section className="bg-mesh relative overflow-hidden">
        <div className="container-main section-padding relative max-w-4xl">
          <Breadcrumbs items={breadcrumbItems} />

          {item.isExample && (
            <div
              className="rounded-lg p-3 mb-6 text-sm flex items-start gap-2"
              style={{ background: "rgba(255,92,92,0.08)", border: "1px solid rgba(255,92,92,0.3)", color: "#ff8888" }}
            >
              <Info size={16} aria-hidden className="flex-shrink-0 mt-0.5" />
              EXAMPLE CONTENT — this listing is scaffold data. Replace it with a real, independently-researched entry before launch.
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden" style={{ border: "1px solid #22222f", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                <Image src={item.icon} alt="" fill sizes="80px" className="object-cover" priority />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "#f4f4f8" }}>
                  {item.h1 ?? item.name}
                </h1>
                <p className="text-sm mt-1" style={{ color: "#92929f" }}>
                  by {item.developer}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:ml-auto">
              <StarRating score={item.editorialScore} size={20} />
              <span className="text-sm font-semibold" style={{ color: "#f4f4f8" }}>
                {item.editorialScore.toFixed(1)}
              </span>
            </div>
          </div>

          {item.userRatingValue !== undefined && item.userRatingCount !== undefined && (
            <p className="text-sm mt-4" style={{ color: "#5c5c6b" }}>
              {item.userRatingValue.toFixed(1)} user rating from {item.userRatingCount.toLocaleString()} reviews
            </p>
          )}

          <p className="text-base leading-relaxed mt-6 max-w-2xl" style={{ color: "#92929f" }}>
            {item.shortDescription}
          </p>

          <a
            id="download"
            href={item.downloadUrl}
            className="btn-gold mt-6"
            rel="nofollow sponsored"
            style={{ scrollMarginTop: "6rem" }}
          >
            <Download size={18} aria-hidden />
            Download {item.name}
          </a>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main max-w-4xl flex flex-col gap-10">
          {introBody && (
            <div className="prose-content max-w-none">
              <MDXRemote source={`## Introduction\n\n${introBody}`} components={mdxComponents} />
            </div>
          )}

          <SpecsTable
            name={item.name}
            category={category.name}
            fileSize={item.fileSize}
            updatedAt={item.updatedAt}
            minAndroidVersion={item.minAndroidVersion}
            version={item.version}
          />

          {restBodyEarly && (
            <div className="prose-content max-w-none">
              <MDXRemote source={restBodyEarly} components={mdxComponents} />
            </div>
          )}

          <DownloadCTA name={item.name} downloadUrl={item.downloadUrl} />

          {restBodyLate && (
            <div className="prose-content max-w-none">
              <MDXRemote source={restBodyLate} components={mdxComponents} />
            </div>
          )}

          <DownloadCTA name={item.name} downloadUrl={item.downloadUrl} />

          <ProsCons pros={item.pros} cons={item.cons} />

          {item.faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-black mb-4" style={{ color: "#f4f4f8" }}>
                Frequently Asked Questions
              </h2>
              <FaqSection faqs={item.faqs} />
            </div>
          )}

          <RelatedItems items={related} />

          <Link href="/" className="text-sm nav-link w-fit">
            ← Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
