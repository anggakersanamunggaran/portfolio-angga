import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import {
  Briefcase,
  MapPin,
  Calendar,
  ArrowRight,
  Layers,
  FileText,
  Award,
  GraduationCap,
  Trophy,
  GitBranch,
  TicketCheck,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ctaSolid } from "@/components/ui/cta";

const recognition = [
  {
    icon: Trophy,
    title: "“Set Objective, Move Fast” Award",
    detail: "ASTRNT, Q3 2025. For delivering results that represent the company value.",
  },
  {
    icon: Award,
    title: "“We Do Excellence & Personal Growth” Award",
    detail: "ASTRNT, 2026.",
  },
  {
    icon: GraduationCap,
    title: "Published paper & speaker",
    detail: "SNATI 2017, voice-recognition research (MFCC + Hidden Markov Model).",
  },
];

const quickFacts = [
  { icon: Briefcase, label: "Role", value: personalInfo.title },
  { icon: MapPin, label: "Location", value: personalInfo.location },
  { icon: Calendar, label: "Experience", value: "7+ years · May 2019 to Aug 2026" },
  { icon: Briefcase, label: "Domain", value: "HR Technology · B2B SaaS" },
];

const howIWork = [
  {
    icon: GitBranch,
    title: "GitFlow, not guesswork",
    detail:
      "Every change branches off develop and ships through release. Nothing lands straight on production.",
  },
  {
    icon: TicketCheck,
    title: "Jira for every ticket",
    detail:
      "Each piece of work is a tracked ticket, and commits link back to it, so the trail stays auditable.",
  },
  {
    icon: FileText,
    title: "Confluence as documentation",
    detail:
      "Specs and decisions live as documents, so the story runs cleanly from idea to shipped code.",
  },
];

/** A hairline panel with a micro-label heading. Repeats three times. */
function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-rule p-6 last:border-b-0">
      <h3 className="label-micro text-muted">{title}</h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="About me"
          title={
            <>
              Seven years in one vertical, with the products to{" "}
              <em className="accent-serif whitespace-nowrap">prove it</em>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Prose */}
          <div className="lg:col-span-7">
            <div className="space-y-5 text-sm leading-relaxed text-body">
              <p>
                I&apos;m a senior full-stack engineer who has spent my whole career
                inside HR technology at ASTRNT, across two complete generations of the
                stack. I helped build and sustain the flagship Laravel and React recruiter
                platform and its candidate assessment app for years, then led their
                ground-up rebuild on Next.js, React and TypeScript.
              </p>
              <p>
                What makes me unusual is scope. Beyond shipping the code, I write the
                product specifications that drive it: product requirement documents,
                design use cases, and the template the team writes against. I define the
                work, specify it, implement it, and document it.
              </p>
              <p>
                That mix is genuinely hard to hire for. Deep legacy-system knowledge,
                modern rebuild experience, and the ability to operate at scale under load.
                It is what I bring to every project.
              </p>
              <p>
                Under that product work runs infrastructure ownership. When the company
                moved its platform from AWS to Azure, I stood up the per-environment builds
                and PM2 process management for each web app, and helped re-home what Azure
                had no direct equivalent for. Object and video storage went onto Azure
                Blob, and the DynamoDB activity log onto MongoDB.
              </p>
            </div>

            {/* Two differentiators */}
            <div className="mt-12 grid border-t border-l border-rule sm:grid-cols-2">
              <div className="border-b border-r border-rule p-6">
                <Layers size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
                <h4 className="mt-5 text-sm font-bold text-ink">
                  Two stack generations
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Maintained a legacy Laravel and React platform for seven years, then
                  rebuilt its successor without freezing the original.
                </p>
              </div>
              <div className="border-b border-r border-rule p-6">
                <FileText size={20} strokeWidth={1.5} className="text-ink" aria-hidden="true" />
                <h4 className="mt-5 text-sm font-bold text-ink">
                  Specifies, then ships
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Authored the product-specification layer for a platform rebuild, and
                  then implemented it.
                </p>
              </div>
            </div>

            {/* Recognition */}
            <div className="mt-12">
              <div className="flex items-center gap-4">
                <h3 className="label-micro text-muted">Recognition</h3>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <ul className="mt-6 divide-y divide-rule border-t border-rule">
                {recognition.map((item) => (
                  <li key={item.title} className="flex items-start gap-4 py-5">
                    <item.icon
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-ink"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5">
            <div className="border border-rule">
              {/* Portrait. Square, no ring, no shadow, and in colour: the
                  monochrome system frames the page, not the person. */}
              <div className="border-b border-rule p-6">
                <Image
                  src="/profile.jpg"
                  alt={personalInfo.name}
                  width={144}
                  height={144}
                  className="h-32 w-32 object-cover"
                />
                <h3 className="mt-5 text-lg font-bold text-ink">
                  {personalInfo.name}
                </h3>
                <p className="label-micro mt-1 text-muted">{personalInfo.title}</p>
              </div>

              <Panel title="Quick facts">
                <dl className="divide-y divide-rule">
                  {quickFacts.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <item.icon
                        size={16}
                        strokeWidth={1.5}
                        className="shrink-0 text-ink"
                        aria-hidden="true"
                      />
                      <dt className="label-micro w-24 shrink-0 text-muted">
                        {item.label}
                      </dt>
                      <dd className="text-sm font-medium text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Panel>

              <Panel title="How I run the work">
                <ul className="divide-y divide-rule">
                  {howIWork.map((item) => (
                    <li
                      key={item.title}
                      className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <item.icon
                        size={16}
                        strokeWidth={1.5}
                        className="mt-0.5 shrink-0 text-ink"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-semibold text-ink">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="Auditable record">
                <p className="text-sm leading-relaxed text-body">
                  My career is auditable: 11,697 commits, 1,661 Jira tickets held and 49
                  product specs written, all reconstructed from primary sources rather than
                  recollection. The full story lives on its own page.
                </p>
                <Link href="/career" className={`${ctaSolid} mt-5`}>
                  Explore my full track record
                  <ArrowRight size={15} />
                </Link>
              </Panel>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
