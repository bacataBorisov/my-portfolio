import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        <div
            style={{
                background: `linear-gradient(135deg, ${site.colors.teal} 0%, ${site.colors.indigo} 100%)`,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "sans-serif",
                color: "white",
                padding: "60px",
            }}
        >
            <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: "-1px", marginBottom: 20 }}>
                {site.name}
            </div>
            <div
                style={{
                    fontSize: 28,
                    color: `${site.colors.aqua}e6`,
                    marginBottom: 16,
                    textAlign: "center",
                }}
            >
                {site.tagline}
            </div>
            <div style={{ fontSize: 22, color: "rgba(255,255,255,0.6)", textAlign: "center" }}>
                {site.ogSubtitle}
            </div>
        </div>,
        { ...size }
    );
}
