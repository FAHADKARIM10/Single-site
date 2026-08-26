function colorFor(score: number): string {
  if (score >= 4) return "#00e576";
  if (score >= 2.5) return "#3b82f6";
  return "#ff5c5c";
}

export function ScoreRing({ score, size = "md" }: { score: number; size?: "sm" | "md" }) {
  return (
    <div
      className={`score-ring ${size === "sm" ? "score-ring--sm" : ""}`}
      style={{ "--score": score, "--score-color": colorFor(score) } as React.CSSProperties}
      role="img"
      aria-label={`Editorial score: ${score.toFixed(1)} out of 5`}
    >
      <span>{score.toFixed(1)}</span>
    </div>
  );
}
