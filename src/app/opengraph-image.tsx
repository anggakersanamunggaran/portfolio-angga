import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt =
  "Angga Kersana Munggaran — Senior Full-Stack Engineer in HR technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Read the avatar off disk rather than fetching it back from the live domain.
 * The previous version fetched `${SITE}/profile.jpg`, which made the social
 * card depend on the deployment being able to reach itself and silently
 * dropped the avatar whenever it could not.
 *
 * It reads `avatar.jpg`, not `profile.jpg`: the hero portrait is a circular
 * shot with a lavender ring baked into the file, which was the last surviving
 * piece of the old palette anywhere near the metadata. The avatar is a square
 * crop of the same face, matching the tab icon.
 */
async function loadAvatar(): Promise<string | null> {
  try {
    const file = await readFile(
      path.join(process.cwd(), "public", "avatar.jpg")
    );
    return `data:image/jpeg;base64,${file.toString("base64")}`;
  } catch {
    return null;
  }
}

const proof = ["7 YRS HR TECH", "11,697 COMMITS", "2,500 CONCURRENT"];

/*
 * The social card follows the site now: black, monochrome, square, and set in
 * the same micro-label / display-type pairing.
 *
 * next/font output is not available to satori, so the serif italic accent used
 * on the site cannot be reproduced here. The role line carries the contrast
 * through weight and colour instead, which needs no extra font.
 */
export default async function OpengraphImage() {
  const avatar = await loadAvatar();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          padding: "72px 80px",
        }}
      >
        {/* Top: eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 12, height: 12, background: "#ffffff" }} />
          <span style={{ fontSize: 22, color: "#a3a3a3", letterSpacing: 5 }}>
            SENIOR FULL-STACK ENGINEER
          </span>
        </div>

        {/* Middle: name + role + avatar */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 78,
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 0.95,
                letterSpacing: -3,
              }}
            >
              <span>ANGGA KERSANA</span>
              <span>MUNGARAN</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 400,
                color: "#a3a3a3",
                marginTop: 28,
              }}
            >
              Two stack generations. One flagship rebuild.
            </div>
          </div>

          {avatar ? (
            <img
              src={avatar}
              alt=""
              style={{
                width: 224,
                height: 224,
                objectFit: "cover",
              }}
            />
          ) : null}
        </div>

        {/* Bottom: hairline + proof strip */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ height: 1, background: "#262626" }} />
          <div style={{ display: "flex", gap: 40, marginTop: 26 }}>
            {proof.map((item) => (
              <span
                key={item}
                style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 3 }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
