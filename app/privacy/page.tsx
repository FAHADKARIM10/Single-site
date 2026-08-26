import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <section className="section-padding" style={{ background: "#08080b" }}>
      <div className="container-main max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6" style={{ color: "#f4f4f8" }}>
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#92929f" }}>
          {/* TODO: This is a starting-point draft, not legal advice. Have it reviewed
              against your actual data practices (analytics, cookies, hosting provider)
              before launch. */}
          <p>
            {SITE_NAME} does not require account creation to browse listings. This page
            describes what data is collected when you visit the site and how it's used.
          </p>
          <p>
            <strong style={{ color: "#f4f4f8" }}>Server logs.</strong> Our hosting provider
            records standard request logs (IP address, user agent, requested URL) for security
            and abuse prevention. These logs are not sold or shared with third-party advertisers.
          </p>
          <p>
            <strong style={{ color: "#f4f4f8" }}>Analytics.</strong> {/* TODO: Name your actual
              analytics provider here once one is added, and describe what it collects. */}
            If analytics tooling is added to this site, it will be disclosed here along with
            what it tracks and how to opt out.
          </p>
          <p>
            <strong style={{ color: "#f4f4f8" }}>Outbound links.</strong> Download buttons on
            item pages link to third-party developer or distribution sites. Once you leave
            {" "}{SITE_NAME}, that site's own privacy policy applies.
          </p>
          <p>
            {/* TODO: Add a real contact email and last-updated date */}
            Questions about this policy can be sent via the <a href="/contact" style={{ color: "#3b82f6" }}>contact page</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
