import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

// TODO: Replace with your real contact address before launch.
const CONTACT_EMAIL = "contact@apksumal.com";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description: `Get in touch with the ${SITE_NAME} team.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="section-padding" style={{ background: "#08080b" }}>
      <div className="container-main max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6" style={{ color: "#f4f4f8" }}>
          Contact Us
        </h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: "#92929f" }}>
          Found an outdated listing, a broken download link, or want to suggest an app for
          review? Email us directly:
        </p>
        <a href={`mailto:${CONTACT_EMAIL}`} className="btn-gold w-fit">
          <Mail size={18} aria-hidden />
          {CONTACT_EMAIL}
        </a>
      </div>
    </section>
  );
}
