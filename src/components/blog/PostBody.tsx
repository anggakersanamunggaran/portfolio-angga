import Image from "next/image";
import { Fragment } from "react";
import type { PostBlock } from "@/data/posts";

/*
 * Article typography lives here and nowhere else. Keeping it in one component
 * is what stops the prose drifting away from the rest of the design: there is
 * no markdown stylesheet in the project for it to disagree with.
 *
 * Width is set per block rather than on the wrapper, because figures need to
 * break out past the measure of the text.
 */
const PROSE = "max-w-[68ch]";

/*
 * Inline code is written with backticks in the stored text and turned into a
 * chip here, so `src/data/posts.ts` still reads as plain prose. Splitting on
 * the backtick makes the odd-indexed segments the code ones.
 */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((segment, index) =>
        index % 2 === 1 ? (
          <code
            key={index}
            className="border border-rule bg-neutral-50 px-1 py-0.5 font-mono text-[0.85em]"
          >
            {segment}
          </code>
        ) : (
          <Fragment key={index}>{segment}</Fragment>
        )
      )}
    </>
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                className={`${PROSE} mt-14 border-t border-rule pt-6 text-xl font-bold tracking-tight text-ink`}
              >
                {block.text}
              </h2>
            );

          case "ul":
            return (
              <ul key={index} className={`${PROSE} mt-6 space-y-3`}>
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base leading-[1.75] text-body"
                  >
                    <span
                      className="mt-3 h-1 w-1 shrink-0 bg-ink"
                      aria-hidden="true"
                    />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <figure key={index} className={`${PROSE} mt-8`}>
                <pre className="overflow-x-auto border border-rule bg-neutral-50 p-5">
                  <code className="font-mono text-xs leading-relaxed text-ink">
                    {block.code}
                  </code>
                </pre>
                {block.caption && (
                  <figcaption className="label-micro mt-3 text-muted">
                    <RichText text={block.caption} />
                  </figcaption>
                )}
              </figure>
            );

          /*
           * Side by side from `sm` up, stacked below it. Two phone-width
           * columns would be too small to read anything from, so the pair
           * only sits in one row once each half is still legible.
           */
          case "compare": {
            const sides = [
              { label: "Before", ...block.before },
              { label: "After", ...block.after },
            ];
            return (
              <figure key={index} className="mt-10 max-w-[1120px]">
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
                  {sides.map((side) => (
                    <div key={side.label}>
                      <span className="label-micro text-muted">
                        {side.label}
                      </span>
                      <Image
                        src={side.src}
                        alt={side.alt}
                        width={1440}
                        height={900}
                        sizes="(min-width: 640px) 550px, 100vw"
                        className="mt-2 w-full border border-rule"
                      />
                    </div>
                  ))}
                </div>
                {block.caption && (
                  <figcaption className="label-micro mt-4 text-muted">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          default:
            return (
              <p
                key={index}
                className={`${PROSE} mt-6 text-base leading-[1.75] text-body`}
              >
                <RichText text={block.text} />
              </p>
            );
        }
      })}
    </div>
  );
}
