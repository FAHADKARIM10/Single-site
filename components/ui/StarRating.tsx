import { Star } from "lucide-react";

// Proportional star fill: an outline row underneath, a solid-gold row on top
// clipped to (score/5)*100% width — gives a true partial-star fill (e.g. 3.2/5
// visibly fills ~64% of the 3rd star) without needing half-star icon assets.
export function StarRating({ score, size = 14 }: { score: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));

  return (
    <div className="star-rating" role="img" aria-label={`Rated ${score.toFixed(1)} out of 5 stars`}>
      <div className="star-rating-track">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} aria-hidden />
        ))}
      </div>
      <div className="star-rating-fill" style={{ width: `${pct}%` }} aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} fill="currentColor" />
        ))}
      </div>
    </div>
  );
}
