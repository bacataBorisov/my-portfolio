import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vasil Borisov — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #3E8C86 0%, #131247 100%)",
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
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 700,
                        letterSpacing: "-1px",
                        marginBottom: 20,
                    }}
                >
                    Vasil Borisov
                </div>
                <div
                    style={{
                        fontSize: 28,
                        color: "rgba(143, 217, 219, 0.9)",
                        marginBottom: 16,
                        textAlign: "center",
                    }}
                >
                    Electro-Technical Officer → Software Engineer
                </div>
                <div
                    style={{
                        fontSize: 22,
                        color: "rgba(255,255,255,0.6)",
                        textAlign: "center",
                    }}
                >
                    iOS · macOS · Python · C · Navigation Technology
                </div>
            </div>
        ),
        { ...size }
    );
}
