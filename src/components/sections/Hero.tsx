"use client";

import Image from "next/image";
import Link from "next/link";
import { personalInfo, heroProof } from "@/data/portfolio";
import { sortedPosts } from "@/data/posts";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  mail: <Mail size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
};

/*
 * The hero headline is one sentence. It is split at its first comma so the
 * opening clause can carry the heavy uppercase display type and the closing
 * clause can drop into the serif italic, which is the emphasis device the
 * whole design leans on. If the headline ever loses its comma, the first part
 * simply takes the whole line and the italic line is skipped.
 */
function splitHeadline(headline: string): [string, string] {
  const comma = headline.indexOf(",");
  if (comma === -1) return [headline, ""];
  return [headline.slice(0, comma + 1), headline.slice(comma + 1).trim()];
}

export function Hero() {
  const [headlineLead, headlineTail] = splitHeadline(personalInfo.headline);
  const latestPost = sortedPosts()[0];

  return (
    <section
      data-hero
      className="on-ink relative flex min-h-screen flex-col justify-end overflow-hidden bg-black pt-20 text-white"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-8 lg:px-8">
        {/* Availability */}
        <div className="mb-6 flex items-center gap-3 opacity-0 animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="label-micro text-white/60">
            Open to senior full-stack and product roles
          </span>
        </div>

        {/* Display headline */}
        <p className="label-micro mb-4 text-white/45 opacity-0 animate-fade-in-up stagger-1">
          {personalInfo.name}
        </p>
        <h1 className="display-xl opacity-0 animate-fade-in-up stagger-2">
          {headlineLead}
          {headlineTail && (
            /*
             * 0.7em is tuned so the closing clause lands on a single line at
             * desktop width. At the full display size it wraps to two, and the
             * orphaned second line costs a whole display line of hero height.
             */
            <span className="accent-serif mt-1 block text-[0.7em] leading-[1.05]">
              {headlineTail}
            </span>
          )}
        </h1>

        {/*
          * Proof strip. Two columns on mobile, one row from `sm` up. The
          * vertical rules only appear once the items actually sit side by side:
          * when they wrap, a left rule and a 2rem indent just look like a
          * misaligned list.
          */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/20 pt-6 opacity-0 animate-fade-in-up stagger-5 sm:flex sm:flex-wrap sm:items-stretch sm:gap-x-0">
          {heroProof.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i > 0
                  ? "sm:border-l sm:border-white/20 sm:pl-8 sm:pr-8"
                  : "sm:pr-8"
              }
            >
              <dd className="text-2xl font-bold tabular-nums tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
              <dt className="label-micro mt-1 max-w-[13rem] text-white/45">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Description, photo, actions */}
        <div className="mt-6 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg opacity-0 animate-fade-in-up stagger-6">
            <p className="text-sm leading-relaxed text-white/70">
              {personalInfo.description}
            </p>
            <p className="label-micro mt-4 text-white/45">{personalInfo.tagline}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-6 opacity-0 animate-fade-in-up stagger-7 sm:items-end">
            {/* Deliberately the one full-colour element on the page: the
                monochrome system is the frame, not the person in it. */}
            <Image
              src="/profile.jpg"
              alt={personalInfo.name}
              width={160}
              height={160}
              priority
              className="h-24 w-24 object-cover"
            />
            <div className="flex items-center gap-2">
              {personalInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  // mailto: is not an external page; opening it in a new tab
                  // leaves a blank window behind.
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.url.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center border border-white/25 text-white/70 transition-colors hover:border-white hover:text-white"
                >
                  {iconMap[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3 opacity-0 animate-fade-in-up stagger-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/85"
          >
            See the work behind these numbers
            <ArrowDown size={16} />
          </a>
          <a
            href="#for-your-business"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            What this means for your business
          </a>
        </div>
      </div>

      {/*
        Latest writing. This replaced a decorative "Scroll" cue: it occupies the
        same slot at the foot of the hero, and points at something real instead
        of at the act of scrolling.
      */}
      {latestPost && (
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-6 lg:px-8">
          <Link
            href={`/blog/${latestPost.slug}`}
            className="group flex flex-col gap-2 border-t border-white/20 pt-5 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <span className="label-micro text-white/45">Latest writing</span>
            <span className="flex items-baseline gap-3 text-sm text-white">
              {latestPost.title}{" "}
              <em className="accent-serif text-base">{latestPost.accent}</em>
              <ArrowRight
                size={15}
                className="translate-y-0.5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
