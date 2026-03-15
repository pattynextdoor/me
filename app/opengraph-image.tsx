import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Patrick Tumbucon - Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          backgroundColor: "#020617",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: "#EDEDED",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          Patrick Tumbucon
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#888888",
            lineHeight: 1.5,
            maxWidth: 700,
          }}
        >
          I build things that are useful to me. I enjoy thematic flair,
          delightful QoL, and shifting parts of a design in a bold direction.
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#555555",
            marginTop: 40,
          }}
        >
          Seattle, WA
        </div>
      </div>
    ),
    { ...size }
  );
}
