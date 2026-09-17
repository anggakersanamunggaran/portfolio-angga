import { ImageResponse } from "next/og";
import { sortedPosts } from "@/data/posts";

export const alt = "The writing index of Angga Kersana Munggaran";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/*
 * Read from the environment rather than repeating the domain, so the card
 * cannot drift away from where the site is actually served from.
 */
const SITE =
  process.env.NEXT_PUBLIC_SITE_URL || "https://anggakersana-dev.vercel.app";
const SITE_LABEL = SITE.replace(/^https?:\/\//, "");

/*
 * Formatted by hand rather than through Intl, because the card is rendered on
 * whatever locale the build machine happens to have and a date that changes
 * shape between machines is a card that changes shape between builds.
 */
const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function shortDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

const HEADING: [string, string] = ["NOTES ON", "BUILDING THINGS"];

/*
 * The index card. Same frame as the per-post cards, but instead of one piece
 * it lists what is currently on the page, so a shared /blog link shows the
 * archive rather than the personal card.
 */
export default async function Image() {
  const latest = sortedPosts().slice(0, 3);

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
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 12, height: 12, background: "#ffffff" }} />
          <span style={{ fontSize: 22, color: "#a3a3a3", letterSpacing: 5 }}>
            WRITING
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#ffffff" }}>{HEADING[0]}</span>
            <span style={{ color: "#a3a3a3" }}>{HEADING[1]}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 40,
            }}
          >
            {latest.map((post) => (
              <div
                key={post.slug}
                style={{ display: "flex", alignItems: "baseline", marginTop: 16 }}
              >
                <span
                  style={{
                    fontSize: 20,
                    color: "#737373",
                    letterSpacing: 3,
                    width: 190,
                  }}
                >
                  {shortDate(post.date)}
                </span>
                <span style={{ fontSize: 26, color: "#d4d4d4" }}>
                  {post.title} {post.accent}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ height: 1, background: "#262626" }} />
          <div style={{ display: "flex", marginTop: 26 }}>
            <span style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 3 }}>
              {`${SITE_LABEL}/blog`.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
