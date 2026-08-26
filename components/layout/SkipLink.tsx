export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold"
      style={{ background: "#3b82f6", color: "#f8fafc" }}
    >
      Skip to content
    </a>
  );
}
