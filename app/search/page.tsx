import type { Metadata } from "next";
import { Search } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { searchItems } from "@/lib/content";
import { ItemCard } from "@/components/item/ItemCard";

// Results are noindexed: query-string result pages are inherently duplicate/thin
// content and add no crawl value, but the page itself must stay crawlable
// (not robots-disallowed) so Google can see and honor this noindex tag — see SEO.md.
export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search the app directory.",
  path: "/search",
  noindex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchItems(q);

  return (
    <section className="section-padding bg-mesh">
      <div className="container-main max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2 tracking-tight" style={{ color: "#f4f4f8" }}>
          <Search size={22} aria-hidden style={{ color: "#3b82f6" }} />
          {q ? `Results for "${q}"` : "Search"}
        </h1>

        <form action="/search" method="GET" className="flex items-center gap-2 rounded-full px-4 py-2 mb-8 max-w-md" style={{ background: "#101018", border: "1px solid #22222f" }}>
          <label htmlFor="q" className="sr-only">Search apps</label>
          <input
            id="q"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search apps..."
            className="bg-transparent outline-none text-sm w-full"
            style={{ color: "#f4f4f8" }}
          />
        </form>

        {q && results.length === 0 && (
          <p style={{ color: "#92929f" }}>No apps matched &ldquo;{q}&rdquo;.</p>
        )}

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
          {results.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
