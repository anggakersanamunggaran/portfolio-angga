import { ImageResponse } from "next/og";

export const alt =
  "Angga Kersana Munggaran — Senior Full-Stack Engineer in HR technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://anggakersana-dev.vercel.app";

// Muat avatar dari domain live sebagai data URI. Fallback null agar build tetap
// sukses bila domain belum bisa dijangkau (mis. build lokal tanpa network).
async function loadAvatar(): Promise<string | null> {
  try {
    const res = await fetch(`${SITE}/profile.jpg`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const bytes = new Uint8Array(await res.arrayBuffer());
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const avatar = await loadAvatar();

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
            flex: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 90px",
            position: "relative",
          }}
        >
          {/* Left: text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 720,
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
              <span style={{ fontSize: 26, color: "#bfdbfe", letterSpacing: 6 }}>
                PORTFOLIO
              </span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 84,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.05,
                marginTop: 26,
              }}
            >
              <span>Angga Kersana</span>
              <span>Munggaran</span>
            </div>

            <div
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: "#e9d5ff",
                marginTop: 22,
              }}
            >
              Senior Full-Stack Engineer
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 24,
              }}
            >
              <span
                style={{ width: 56, height: 4, borderRadius: 2, background: "#5b0ef5" }}
              />
              <span style={{ fontSize: 30, color: "#e2e8f0", opacity: 0.95 }}>
                Seven years in HR technology — two stack generations, one flagship rebuild.
              </span>
            </div>
          </div>

          {/* Right: avatar */}
          {avatar ? (
            <img
              src={avatar}
              alt=""
              style={{
                width: 248,
                height: 248,
                borderRadius: "50%",
                border: "10px solid rgba(255,255,255,0.9)",
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
