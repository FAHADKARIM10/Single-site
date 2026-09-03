import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import type { Item } from "@/lib/schema";
import { StarRating } from "@/components/ui/StarRating";

// Compact tile: designed to sit 3-up on a mobile row, so it carries only
// icon / name / rating / a download action — no description or dev byline.
export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="game-tile">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden" style={{ border: "1px solid #22222f" }}>
        <Image src={item.icon} alt="" fill sizes="(max-width: 640px) 30vw, 160px" className="object-cover" />
      </div>

      <h3 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2" style={{ color: "#f4f4f8" }}>
        {item.name}
      </h3>

      <div className="flex items-center gap-1.5">
        <StarRating score={item.editorialScore} size={11} />
        <span className="text-[10px] font-semibold" style={{ color: "#5c5c6b" }}>
          {item.editorialScore.toFixed(1)}
        </span>
      </div>

      <Link href={`/${item.slug}`} className="btn-gold btn-gold-sm mt-auto" aria-label={`Download ${item.name}`}>
        <Download size={12} aria-hidden />
        <span className="hidden sm:inline">Download</span>
      </Link>
    </div>
  );
}
