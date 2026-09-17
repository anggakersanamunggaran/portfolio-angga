import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, getPost } from "@/data/posts";
import { PostBody } from "@/components/blog/PostBody";

// Next 16 hands route params in as a promise.
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const fullTitle = `${post.title} ${post.accent}`;

  return {
    title: fullTitle,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/blog/${post.slug}`,
      siteName: "Angga Kersana Munggaran",
      title: fullTitle,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
    /*
     * No `images` here on purpose. A config-based image overrides the
     * file-based one, so naming the generic card here is what used to make
     * every post share the same preview. The card now comes from
     * `./opengraph-image.tsx`, which is per-post and also fills twitter:image.
     */
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main>
      <article className="pt-32 pb-20 sm:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <Link
            href="/blog"
            className="label-micro inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All writing
          </Link>

          <header className="mt-12 border-t border-rule pt-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <time dateTime={post.date} className="label-micro text-ink">
                {post.dateLabel}
              </time>
              <span className="label-micro text-muted">
                {post.readingMinutes} min read
              </span>
            </div>

            <h1 className="display-l mt-5 max-w-5xl">
              {post.title}{" "}
              <em className="accent-serif">{post.accent}</em>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-rule px-2.5 py-1 label-micro text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </header>

          <div className="mt-14">
            <PostBody blocks={post.blocks} />
          </div>

          <footer className="mt-20 border-t border-rule pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-rule px-6 py-3 label-micro text-ink transition-colors hover:border-ink"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All writing
            </Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
