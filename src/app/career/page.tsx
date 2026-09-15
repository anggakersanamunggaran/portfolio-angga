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
  MapPin,
  Sparkles,
  TicketCheck,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ctaSolid, ctaOutline } from "@/components/ui/cta";

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

const practices = [
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
];

const heroFacts = [
  { icon: Calendar, label: "May 2019 – Aug 2026" },
  { icon: Briefcase, label: "Web Developer → Senior Full-Stack Engineer" },
  { icon: MapPin, label: "Indonesia" },
];

export default function CareerPage() {
  return (
    <main>
      {/*
        This page keeps the light treatment rather than opening on a second
        black hero. The navbar reads the homepage hero to decide whether it sits
        on ink, so a dark hero here would need that logic to grow a second case
        for no real gain.
      */}
      <section className="pt-32 pb-16 sm:pt-40">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <Link
            href="/"
            className="label-micro inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to homepage
          </Link>

          <p className="label-micro mt-12 text-muted">The full track record</p>
          <h1 className="display-l mt-5 max-w-5xl">
            Seven years in HR technology, spanning two complete generations of{" "}
            <em className="accent-serif whitespace-nowrap">the stack</em>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <p className="text-sm leading-relaxed text-body lg:col-span-7">
              Full-stack engineer at{" "}
              <a
                href="https://astrnt.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-2"
              >
                ASTRNT
              </a>{" "}
              from May 2019 to August 2026. Principal contributor to the flagship
              recruiter platform and the candidate assessment application, and the
              engineer who led the ground-up rebuild on a modern stack, then wrote the
              product specifications that drove it. Now open to senior full-stack and
              product-engineering roles.
            </p>
            <p className="text-sm leading-relaxed text-muted lg:col-span-5">
              This page is built from primary sources rather than recollection: the
              commit history across my Git identities, the Jira tickets cited in those
              commits, and the documentation I authored. Every number below is
              verifiable.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap gap-2">
            {heroFacts.map((fact) => (
              <li
                key={fact.label}
                className="inline-flex items-center gap-2 border border-rule px-4 py-2.5 label-micro text-muted"
              >
                <fact.icon size={14} aria-hidden="true" />
                {fact.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- The numbers ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="The numbers"
            title={
              <>
                A sustained,{" "}
                <em className="accent-serif whitespace-nowrap">auditable</em> record
              </>
            }
          />

          {/* Same hairline grid as the homepage sections. Numbers are solid
              ink now; the old gradient-clipped text had no equivalent here. */}
          <dl className="mt-14 grid border-t border-l border-rule grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {careerStats.map((stat) => (
              <div key={stat.label} className="border-b border-r border-rule p-6">
                <dd className="text-3xl font-bold tabular-nums tracking-tight text-ink sm:text-4xl">
                  {stat.value}
                </dd>
                <dt className="mt-3 text-sm font-medium text-ink">{stat.label}</dt>
                {stat.sub && (
                  <p className="mt-1 text-xs leading-relaxed text-muted">{stat.sub}</p>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- Three acts ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="The career arc"
            title={
              <>
                Three acts,{" "}
                <em className="accent-serif whitespace-nowrap">one trajectory</em>
              </>
            }
            description="From feature contributor, to multi-product full-stack engineer, to the person trusted with re-architecting the company's flagship product."
          />

          <div className="mt-14">
            {careerPhases.map((phase) => (
              <article
                key={phase.period}
                className="grid gap-6 border-t border-rule py-10 lg:grid-cols-12 lg:gap-10"
              >
                <div className="lg:col-span-3">
                  <p className="label-micro tabular-nums text-ink">{phase.period}</p>
                  <p className="label-micro mt-2 text-muted">{phase.act}</p>
                </div>
                <div className="lg:col-span-9">
                  <p className="max-w-2xl text-sm leading-relaxed text-body">
                    {phase.summary}
                  </p>
                  <ul className="mt-6 max-w-2xl space-y-2.5">
                    {phase.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-body"
                      >
                        <span
                          className="mt-2 h-1 w-1 shrink-0 bg-ink"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Cloud chapter ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow={cloudMigration.eyebrow}
            title={cloudMigration.title}
            description={cloudMigration.intro}
          />

          <ul className="mt-14 border-t border-rule">
            {cloudMigration.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-4 border-b border-rule py-6"
              >
                <Cloud
                  size={16}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-ink"
                  aria-hidden="true"
                />
                <span className="max-w-3xl text-sm leading-relaxed text-body">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- Domain expertise ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="Domain expertise"
            title={
              <>
                What seven years in one vertical{" "}
                <em className="accent-serif whitespace-nowrap">teaches</em>
              </>
            }
            description="HR technology knowledge that transfers less visibly than a framework, yet matters more."
          />

          <div className="mt-14 grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">
            {domainExpertise.map((domain) => (
              <div key={domain.area} className="border-b border-r border-rule p-6">
                <Sparkles
                  size={18}
                  strokeWidth={1.5}
                  className="text-ink"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-sm font-bold text-ink">{domain.area}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {domain.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How I work ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="How I work"
            title={
              <>
                Engineering practice,{" "}
                <em className="accent-serif whitespace-nowrap">measured</em>
              </>
            }
          />

          <div className="mt-14 grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice) => (
              <div key={practice.title} className="border-b border-r border-rule p-6">
                <practice.icon
                  size={18}
                  strokeWidth={1.5}
                  className="text-ink"
                  aria-hidden="true"
                />
                <h3 className="mt-5 text-sm font-bold text-ink">{practice.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {practice.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing CTA ---- */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <SectionHeader
            eyebrow="Next"
            title={
              <>
                Interested in working{" "}
                <em className="accent-serif whitespace-nowrap">together?</em>
              </>
            }
            description="I'm open to senior full-stack and product-engineering roles in HR-tech, B2B SaaS, or any domain where writing the spec and shipping the code go hand in hand."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=Let%27s%20talk`}
              className={ctaSolid}
            >
              <Mail size={15} aria-hidden="true" />
              {personalInfo.email}
            </a>
            <a
              href="https://www.linkedin.com/in/angga-munggaran/"
              target="_blank"
              rel="noopener noreferrer"
              className={ctaOutline}
            >
              View LinkedIn
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
