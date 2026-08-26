import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

// Server Component. Mobile nav uses <details>/<summary> so the menu works with
// zero client JS — no "use client" needed anywhere in this file.
export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div style={{ background: "rgba(8,8,11,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #22222f" }}>
        <div className="container-main flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight" style={{ color: "#f4f4f8" }}>
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
              style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", color: "#f8fafc" }}
            >
              A
            </span>
            {SITE_NAME}
          </Link>

          <div className="flex items-center gap-3">
            <form action="/search" method="GET" className="hidden sm:flex items-center gap-2 rounded-full px-3.5 py-2" style={{ background: "#101018", border: "1px solid #22222f" }}>
              <Search size={16} aria-hidden style={{ color: "#5c5c6b" }} />
              <label htmlFor="header-search" className="sr-only">Search apps</label>
              <input
                id="header-search"
                type="search"
                name="q"
                placeholder="Search apps..."
                className="bg-transparent outline-none text-sm w-40"
                style={{ color: "#f4f4f8" }}
              />
            </form>

            <details className="md:hidden relative">
              <summary
                className="list-none cursor-pointer p-2 rounded-lg"
                style={{ border: "1px solid #22222f" }}
                aria-label="Open menu"
              >
                <Menu size={20} aria-hidden style={{ color: "#f4f4f8" }} />
              </summary>
              <div
                className="absolute right-0 top-12 w-60 rounded-xl p-4 flex flex-col gap-3"
                style={{ background: "#101018", border: "1px solid #22222f", boxShadow: "0 12px 40px rgba(0,0,0,0.5)" }}
              >
                <form action="/search" method="GET" className="flex items-center gap-2 rounded-full px-3 py-1.5 mb-1" style={{ background: "#15151f", border: "1px solid #22222f" }}>
                  <Search size={16} aria-hidden style={{ color: "#5c5c6b" }} />
                  <label htmlFor="mobile-search" className="sr-only">Search apps</label>
                  <input
                    id="mobile-search"
                    type="search"
                    name="q"
                    placeholder="Search apps..."
                    className="bg-transparent outline-none text-sm w-full"
                    style={{ color: "#f4f4f8" }}
                  />
                </form>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
