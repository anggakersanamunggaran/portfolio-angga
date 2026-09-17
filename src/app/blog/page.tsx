import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sortedPosts } from "@/data/posts";
import { SectionHeader } from "@/components/ui/SectionHeader";

const title = "Writing";
const description =
  "Notes on building this site and the engineering decisions behind it, written up as they happen.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/blog",
    siteName: "Angga Kersana Munggaran",
    title: `${title} — Angga Kersana Munggaran`,
    description,
  },
  /*
   * The card is the file convention at `./opengraph-image.tsx`. Naming one
   * here would override it and put the personal card back on a shared /blog
   * link.
   */
  twitter: {
    card: "summary_large_image",
    title: `${title} — Angga Kersana Munggaran`,
    description,
  },
};

export default function BlogIndexPage() {
  const allPosts = sortedPosts();

  return (
    <main>
      <section className="pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="Writing"
            title={
              <>
                Notes on{" "}
                <em className="accent-serif whitespace-nowrap">building things</em>
              </>
            }
            description="Decisions I made while working on this site and on the products behind it, written up with the reasoning rather than just the outcome."
          />

          {/*
            Same date-rail row shape as the experience list, so the archive and
            the timeline read as the same kind of record.
          */}
          <div className="mt-14">
            {allPosts.map((post) => (
              <article
                key={post.slug}
                className="grid gap-6 border-t border-rule py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-3">
                  <time dateTime={post.date} className="label-micro text-ink">
                    {post.dateLabel}
                  </time>
                  <p className="label-micro mt-2 text-muted">
                    {post.readingMinutes} min read
                  </p>
                </div>

                <div className="lg:col-span-9">
                  <h2 className="display-m text-ink">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}{" "}
                      <em className="accent-serif">{post.accent}</em>
                    </Link>
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-rule px-2.5 py-1 label-micro text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-4"
                  >
                    Read the post
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
