import { ImageResponse } from "next/og";
import { getPost, posts } from "@/data/posts";

export const alt = "A post on the writing page of Angga Kersana Munggaran";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = { params: Promise<{ slug: string }> };

/*
 * Generate a card per post at build time rather than on the first request.
 * Without this the route is still correct, it just renders lazily and the
 * first crawler to arrive pays for it.
 */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/*
 * Satori's text handling stops short of a line clamp worth trusting, so the
 * shortening happens here where the result is deterministic and the same on
 * every build. Cuts land on a word boundary so nothing is severed mid-word.
 */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;

  const window = text.slice(0, max);

  /*
   * A severed clause reads worse than a shorter complete thought, so when a
   * sentence ends inside the budget, stop there instead of mid-clause. The
   * length guard keeps a throwaway opener like "Yes." from winning.
   */
  const sentence = window.match(/^.*?[.!?](?=\s|$)/);
  if (sentence && sentence[0].length >= 50) return sentence[0];

  return `${window.replace(/\s+\S*$/, "")}…`;
}

/*
 * One card per post, carrying the same monochrome frame as the site card in
 * `src/app/opengraph-image.tsx`.
 *
 * The serif italic accent that closes every heading on the site cannot be
 * reproduced here: next/font self-hosts into the build cache under hashed
 * names and satori cannot reach it, and there is no font file in the repo to
 * load instead. The accent keeps its own line and shifts to grey, so the
 * contrast survives without the extra face.
 */
export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000000",
            color: "#ffffff",
            fontSize: 48,
          }}
        >
          Writing
        </div>
      ),
      { ...size }
    );
  }

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
        {/* Top: eyebrow, matching the square marker used across the site */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 12, height: 12, background: "#ffffff" }} />
          <span style={{ fontSize: 22, color: "#a3a3a3", letterSpacing: 5 }}>
            WRITING
          </span>
        </div>

        {/* Middle: the post's own heading, then the opening line of the piece */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#ffffff" }}>
              {clamp(post.title, 30).toUpperCase()}
            </span>
            <span style={{ color: "#a3a3a3" }}>
              {clamp(post.accent, 30).toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a3a3a3",
              lineHeight: 1.4,
              marginTop: 28,
              maxWidth: 920,
            }}
          >
            {clamp(post.excerpt, 150)}
          </div>
        </div>

        {/* Bottom: hairline + date on the left, topics on the right */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ height: 1, background: "#262626" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 26,
            }}
          >
            <span style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 3 }}>
              {post.dateLabel.toUpperCase()}
            </span>
            <span style={{ fontSize: 20, color: "#a3a3a3", letterSpacing: 3 }}>
              {post.tags.slice(0, 2).join(", ").toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
