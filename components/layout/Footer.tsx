import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

// No social icons anywhere in this component — omitted entirely per instruction
// rather than linking placeholder profiles.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid #22222f", background: "#08080b" }}>
      <div className="container-main section-padding grid grid-cols-2 md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="font-black text-lg mb-3" style={{ color: "#f4f4f8" }}>
            {SITE_NAME}
          </div>
          <p className="text-sm max-w-sm leading-relaxed" style={{ color: "#92929f" }}>
            An independent review site for casino, color-prediction, and real-money earning game
            apps in Pakistan. Every listing carries a real, editor-assigned score — not a
            fabricated rating — and is upfront about legal and financial risk.
          </p>
        </div>

        <div>
          <div className="font-semibold text-sm mb-3" style={{ color: "#f4f4f8" }}>
            Site
          </div>
          <ul className="flex flex-col gap-2">
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
            <li><Link href="/privacy" className="nav-link">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="nav-link">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-main pb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs" style={{ color: "#5c5c6b", borderTop: "1px solid #16161f", paddingTop: "1.5rem" }}>
        <span>© {year} {SITE_NAME}. All rights reserved.</span>
        <span>Real-money apps involve genuine financial risk. Nothing here is financial advice.</span>
      </div>
    </footer>
  );
}
