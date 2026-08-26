import type { Metadata } from "next";
import { Search } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { getAllItems } from "@/lib/content";
import { ItemCard } from "@/components/item/ItemCard";

export const metadata: Metadata = buildMetadata({
  title: `${SITE_NAME} — Android Apps & Games Directory`,
  description: SITE_DESCRIPTION,
  path: "",
});

export default function Home() {
  const items = getAllItems();
  const recent = [...items]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 6);

  return (
    <>
      <section className="bg-mesh relative overflow-hidden">
        <div className="container-main section-padding relative">
          <h1 className="text-4xl md:text-6xl font-black mb-5 max-w-3xl leading-[1.05] tracking-tight" style={{ color: "#f4f4f8" }}>
            Honest reviews for <span className="text-gradient-gold">casino & earning game</span> apps
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-8" style={{ color: "#92929f" }}>
            {SITE_DESCRIPTION}
          </p>

          <form action="/search" method="GET" className="flex items-center gap-2 rounded-2xl p-2 max-w-lg" style={{ background: "#101018", border: "1px solid #22222f" }}>
            <Search size={18} aria-hidden style={{ color: "#5c5c6b" }} className="ml-2" />
            <label htmlFor="hero-search" className="sr-only">Search apps</label>
            <input
              id="hero-search"
              type="search"
              name="q"
              placeholder="Search an app, e.g. JJwin..."
              className="bg-transparent outline-none text-sm flex-1 py-2"
              style={{ color: "#f4f4f8" }}
            />
            <button type="submit" className="btn-gold py-2.5 px-5 text-sm">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-main">
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "#f4f4f8" }}>
            Earning Games
          </h2>
          <div className="section-divider" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4 mt-6">
            {recent.map((item) => (
              <ItemCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
