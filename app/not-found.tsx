import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-padding" style={{ background: "#08080b" }}>
      <div className="container-main max-w-lg text-center">
        <h1 className="text-4xl font-black mb-4" style={{ color: "#f4f4f8" }}>
          404
        </h1>
        <p className="mb-6" style={{ color: "#92929f" }}>
          This page doesn&apos;t exist, or the listing has been removed.
        </p>
        <Link href="/" className="btn-gold w-fit mx-auto">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
