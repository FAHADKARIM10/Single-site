import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description: `About ${SITE_NAME} — how we review casino and real-money earning game apps for Pakistan.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="section-padding" style={{ background: "#08080b" }}>
      <div className="container-main max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-black mb-6" style={{ color: "#f4f4f8" }}>
          About {SITE_NAME}
        </h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#92929f" }}>
          <p>
            {SITE_NAME} reviews casino, color-prediction, and real-money &ldquo;earning game&rdquo;
            apps aimed at players in Pakistan. This is a category built almost entirely on APKs
            distributed outside the Play Store, with no consistent licensing and wide variation
            in whether an app actually pays out reliably — so every listing carries a real,
            editor-assigned score and an honest verdict, not templated copy with the name
            swapped in.
          </p>
          <p>
            {/* TODO: Replace with your actual review methodology once defined */}
            Our review process: each app is installed and used directly before it's listed. We
            record the real payout mechanics, the house edge where it can be determined, how
            deposits and withdrawals actually behave via JazzCash/Easypaisa, and the specific
            legal and financial risks worth flagging — then assign an editorial score out of 5
            based on that hands-on testing, not the app's own marketing.
          </p>
          <p>
            We don't publish fabricated user ratings. Where a listing shows a user rating
            alongside our own editorial score, that figure is sourced from a real, disclosed
            origin — never invented to make a listing look more popular or trustworthy than it
            is. See our <a href="/disclaimer" style={{ color: "#3b82f6" }}>disclaimer</a> for how
            we handle affiliate/monetized download links.
          </p>
          {/* TODO: Add a real founding date, team info, or company entity details here */}
        </div>
      </div>
    </section>
  );
}
