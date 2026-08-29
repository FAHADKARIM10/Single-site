import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { getAllItems, getItemBySlug } from "@/lib/content";

export const alt = "App preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllItems().map((item) => ({ slug: item.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08080b",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(59,130,246,0.18) 0%, transparent 60%)",
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 700, color: "#f5c451", display: "flex", letterSpacing: 2 }}>
          {SITE_NAME.toUpperCase()}
        </div>
        <div style={{ fontSize: 68, fontWeight: 900, color: "#f4f4f8", marginTop: 16, display: "flex" }}>
          {item?.name ?? SITE_NAME}
        </div>
        {item && (
          <div style={{ fontSize: 28, color: "#92929f", marginTop: 24, display: "flex", maxWidth: 950 }}>
            {item.shortDescription}
          </div>
        )}
        {item && (
          <div style={{ fontSize: 24, color: "#f5c451", marginTop: 32, display: "flex" }}>
            Editor Score: {item.editorialScore.toFixed(1)} / 5
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
