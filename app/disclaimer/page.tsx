import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: `Disclaimer for ${SITE_NAME}.`,
  path: "/disclaimer",
  noindex: true,
});

export default function DisclaimerPage() {
  return (
    <section className="section-padding" style={{ background: "#08080b" }}>
      <div className="container-main max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6" style={{ color: "#f4f4f8" }}>
          Disclaimer
        </h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#92929f" }}>
          <p>
            {SITE_NAME} is an independent directory and is not affiliated with, endorsed by, or
            sponsored by the developers of the apps listed here unless explicitly stated on a
            given listing.
          </p>
          <p>
            App names, icons, and screenshots are used for identification purposes under fair
            use and remain the property of their respective developers.
          </p>
          <p>
            {/* TODO: If download links are monetized/affiliate, disclose that plainly here — see rel="sponsored" on download buttons in app/[category]/[slug]/page.tsx */}
            Some download links on this site may be monetized. This does not affect the
            editorial score or verdict assigned to any listing.
          </p>
          <p>
            Editorial scores and written verdicts reflect our own hands-on testing at the time
            of publication (see each listing's &ldquo;Updated&rdquo; date). App behavior can
            change after an update — always review the current permissions requested during
            installation.
          </p>
        </div>
      </div>
    </section>
  );
}
