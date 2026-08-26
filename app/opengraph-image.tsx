import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const runtime = "edge";
export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
        <div style={{ fontSize: 72, fontWeight: 900, color: "#f4f4f8", display: "flex" }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 28, color: "#92929f", marginTop: 24, display: "flex", maxWidth: 900 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
