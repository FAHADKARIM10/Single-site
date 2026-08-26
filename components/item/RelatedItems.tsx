import type { Item } from "@/lib/schema";
import { ItemCard } from "./ItemCard";

export function RelatedItems({ items }: { items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-black mb-4" style={{ color: "#f4f4f8" }}>
        Related Apps
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
        {items.map((item) => (
          <ItemCard key={item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
