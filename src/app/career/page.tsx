import type { Metadata } from "next";
import Link from "next/link";
import {
  careerStats,
  careerPhases,
  domainExpertise,
  cloudMigration,
  personalInfo,
} from "@/data/portfolio";
import {
  ArrowUpRight,
  ArrowLeft,
  Briefcase,
  Calendar,
  Cloud,
  FileText,
  GitCommitHorizontal,
  Layers,
  Mail,
  Sparkles,
  TicketCheck,
} from "lucide-react";

const careerTitle =
  "Career in detail — seven years of full-stack engineering at ASTRNT";
const careerDescription =
  "Seven years at ASTRNT in detail — 11,697 commits across 35 repositories, 1,661 Jira tickets held, 49 product specifications authored, and the three acts that shaped the career.";
const ogImageAlt =
  "Angga Kersana Munggaran — Senior Full-Stack Engineer in HR technology";

export const metadata: Metadata = {
  title: "Career in detail",
  description: careerDescription,
  alternates: {
    canonical: "/career",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/career",
    siteName: "Angga Kersana Munggaran",
    title: careerTitle,
    description: careerDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: careerTitle,
    description: careerDescription,
    images: ["/opengraph-image"],
  },
};

export default function CareerPage() {
  return (
    <main>
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-surface-dark dark:to-surface-dark" />
        <div className="absolute top-0 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-100/30 dark:bg-brand-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 pt-32 sm:pt-40 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-brand-accent dark:hover:text-brand-400 transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            Back to homepage
          </Link>

          <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            The full track record
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-primary dark:text-white max-w-3xl">
            Seven years in HR technology, spanning two complete generations of the stack.
          </h1>

          <p className="mt-6 text-lg text-neutral-600 dark:text-text-dark-secondary leading-relaxed max-w-3xl">
            Full-stack engineer at{" "}
            <a
              href="https://astrnt.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-accent dark:text-brand-400 hover:underline"
            >
              ASTRNT
            </a>{" "}
            from May 2019 to August 2026. Principal contributor to the flagship recruiter
            platform and the candidate assessment application, and the engineer who led the
            ground-up rebuild on a modern stack, then wrote the product specifications that
            drove it. Now open to senior full-stack and product-engineering roles.
          </p>

          <p className="mt-6 text-neutral-600 dark:text-text-dark-secondary leading-relaxed max-w-3xl text-base">
            This page is built from primary sources rather than recollection: the commit
            history across my Git identities, the Jira tickets cited in those commits, and
            the documentation I authored. Every number below is verifiable.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-border-dark-subtle text-neutral-700 dark:text-neutral-300">
              <Calendar size={15} />
              May 2019 – Aug 2026
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-border-dark-subtle text-neutral-700 dark:text-neutral-300">
              <Briefcase size={15} />
              Web Developer → Senior Full-Stack Engineer
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-200 dark:border-border-dark-subtle text-neutral-700 dark:text-neutral-300">
              <MapPinIcon />
              Indonesia
            </span>
          </div>
        </div>
      </section>

      {/* ---- The numbers ---- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              The numbers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
              A sustained, auditable record
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {careerStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600/50 transition-all duration-300"
              >
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-accent dark:from-brand-400 dark:to-brand-accent bg-clip-text text-transparent tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-brand-primary dark:text-white">
                  {stat.label}
                </p>
                {stat.sub && (
                  <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {stat.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Three acts ---- */}
      <section className="relative py-20 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              The career arc
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
              Three acts, one trajectory
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
              From feature contributor, to multi-product full-stack engineer, to the person
              trusted with re-architecting the company&apos;s flagship product.
            </p>
          </div>

          <div className="space-y-8">
            {careerPhases.map((phase, index) => (
              <div
                key={phase.period}
                className="grid md:grid-cols-[220px_1fr] gap-0 md:gap-10"
              >
                {/* Period rail */}
                <div className="md:text-right mb-3 md:mb-0">
                  <p className="text-sm font-semibold text-brand-accent dark:text-brand-400 tabular-nums">
                    {phase.period}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mt-1">
                    {phase.act}
                  </p>
                  {/* connector */}
                  <div className="hidden md:flex justify-end items-center gap-3 mt-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-brand-400" />
                    <div
                      className={`w-4 h-4 rounded-full border-[3px] border-brand-accent dark:border-brand-400 bg-white dark:bg-surface-dark ${
                        index === careerPhases.length - 1 ? "" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Content card */}
                <div className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle">
                  <p className="text-neutral-600 dark:text-text-dark-secondary leading-relaxed mb-4">
                    {phase.summary}
                  </p>
                  <ul className="space-y-2.5">
                    {phase.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-text-dark-secondary leading-relaxed"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-400 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Cloud chapter ---- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              {cloudMigration.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white max-w-3xl mx-auto">
              {cloudMigration.title}
            </h2>
            <p className="mt-5 text-neutral-600 dark:text-text-dark-secondary max-w-2xl mx-auto leading-relaxed">
              {cloudMigration.intro}
            </p>
          </div>

          <ul className="space-y-4 max-w-3xl mx-auto">
            {cloudMigration.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 p-5 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle"
              >
                <Cloud
                  size={16}
                  className="mt-0.5 text-brand-accent dark:text-brand-400 shrink-0"
                />
                <span className="text-sm text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Domain expertise ---- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              Domain expertise
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
              What seven years in one vertical teaches
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
              HR technology knowledge that transfers less visibly than a framework, yet
              matters more.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {domainExpertise.map((domain) => (
              <div
                key={domain.area}
                className="p-5 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600/50 transition-all duration-300"
              >
                <Sparkles size={16} className="text-brand-accent dark:text-brand-400 mb-3" />
                <h3 className="text-sm font-bold text-brand-primary dark:text-white mb-1.5">
                  {domain.area}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                  {domain.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How I work ---- */}
      <section className="relative py-20 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              How I work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
              Engineering practice, measured
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                icon: GitCommitHorizontal,
                title: "Requirements traceability",
                body: "Every commit links code to a requirement: 916 distinct Jira ticket keys cited in commit messages across 13 projects.",
              },
              {
                icon: TicketCheck,
                title: "Sustained ownership",
                body: "1,661 tickets held over seven years; 93% completed. The rest were handed on with progress intact, not abandoned.",
              },
              {
                icon: FileText,
                title: "Spec-first, then ship",
                body: "19 PRDs, 30 design use cases and the company-wide PRD template, work defined then implemented by the same person.",
              },
              {
                icon: Layers,
                title: "Deliberate risk-taking",
                body: "New technology is proven in low-risk projects first: TypeScript in a scraper in 2024 carried the flagship rebuild in 2026.",
              },
              {
                icon: Calendar,
                title: "Never dormant",
                body: "88 of 88 calendar months active. A flat contribution line: the difference between bursts and someone a team can plan around.",
              },
              {
                icon: Sparkles,
                title: "Honest documentation",
                body: "Specs that record their own failures and design reversals, including a security gap flagged before it could reach production.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle"
              >
                <item.icon size={18} className="text-brand-accent dark:text-brand-400 mb-3" />
                <h3 className="text-sm font-bold text-brand-primary dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="relative py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white mb-4">
            Interested in working together?
          </h2>
          <p className="text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto mb-8">
            I&apos;m open to senior full-stack and product-engineering roles in HR-tech,
            B2B SaaS, or any domain where writing the spec and shipping the code go hand
            in hand.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${personalInfo.email}?subject=Let%27s%20talk`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary dark:bg-white text-white dark:text-brand-primary font-medium text-sm hover:bg-brand-accent dark:hover:bg-brand-100 transition-all duration-200"
            >
              <Mail size={16} />
              {personalInfo.email}
            </a>
            <a
              href="https://www.linkedin.com/in/angga-munggaran/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-white/5 transition-all duration-200"
            >
              View LinkedIn
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

// Inline location icon (avoids pulling in an extra map for a single use)
function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
