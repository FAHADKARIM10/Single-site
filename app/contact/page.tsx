import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

const WHATSAPP_NUMBER = "923173091699"; // +92 317 3091699
const WHATSAPP_DISPLAY = "+92 317 3091699";

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
          review? Message us on WhatsApp:
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          className="btn-gold w-fit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={18} aria-hidden />
          {WHATSAPP_DISPLAY}
        </a>
      </div>
    </section>
  );
}
