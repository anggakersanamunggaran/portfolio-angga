import { ImageResponse } from "next/og";

export const alt =
  "Angga Kersana Munggaran — Senior Full-Stack Engineer in HR technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "linear-gradient(135deg, #18244e 0%, #2c65e4 58%, #5b0ef5 100%)",
          position: "relative",
        }}
      >
        {/* decorative glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(197,180,253,0.22)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: "50%",
            background: "rgba(101,165,245,0.25)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 96px",
            maxWidth: 1000,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#34d399",
              }}
            />
            <span style={{ fontSize: 28, color: "#bfdbfe", letterSpacing: 6 }}>
              PORTFOLIO
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.02,
              marginTop: 28,
            }}
          >
            <span>Angga Kersana</span>
            <span>Munggaran</span>
          </div>

          <div
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: "#e9d5ff",
              marginTop: 24,
            }}
          >
            Senior Full-Stack Engineer
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 26,
            }}
          >
            <span
              style={{ width: 56, height: 4, borderRadius: 2, background: "#5b0ef5" }}
            />
            <span style={{ fontSize: 32, color: "#e2e8f0", opacity: 0.95 }}>
              Seven years in HR technology — two stack generations, one flagship rebuild.
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
