import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb {
  name: string;
  href: string;
}

// Visible nav that mirrors the BreadcrumbList JSON-LD exactly — same items,
// same order, same labels — so structured data never diverges from what's on screen.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={14} aria-hidden style={{ color: "#3a3a48" }} />}
              {isLast ? (
                <span aria-current="page" style={{ color: "#f4f4f8" }}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="nav-link">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
