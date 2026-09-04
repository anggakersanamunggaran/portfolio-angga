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
} from "lucide-react";

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

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: About text */}
          <div>
            <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
              About Me
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white mb-6">
              Seven years in one vertical, with the products to prove it.
            </h3>
            <div className="space-y-4 text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
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

            {/* Two quick differentiators */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle">
                <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400 w-fit mb-3">
                  <Layers size={18} />
                </div>
                <h4 className="text-sm font-bold text-brand-primary dark:text-white mb-1">
                  Two stack generations
                </h4>
                <p className="text-xs text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                  Maintained a legacy Laravel and React platform for seven years, then
                  rebuilt its successor without freezing the original.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle">
                <div className="p-2.5 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400 w-fit mb-3">
                  <FileText size={18} />
                </div>
                <h4 className="text-sm font-bold text-brand-primary dark:text-white mb-1">
                  Specifies, then ships
                </h4>
                <p className="text-xs text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                  Authored the product-specification layer for a platform rebuild, and
                  then implemented it.
                </p>
              </div>
            </div>

            {/* Recognition */}
            <div className="mt-8 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle p-5">
              <h4 className="text-sm font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-4">
                Recognition
              </h4>
              <ul className="space-y-3">
                {recognition.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400 shrink-0">
                      <item.icon size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-primary dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Photo + Quick facts */}
          <div className="space-y-6">
            {/* Photo card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle text-center">
              <Image
                src="/profile.jpg"
                alt={personalInfo.name}
                width={144}
                height={144}
                className="mx-auto w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-md shadow-brand-950/10 mb-4"
              />
              <h4 className="text-lg font-bold text-brand-primary dark:text-white">
                {personalInfo.name}
              </h4>
              <p className="text-sm text-brand-accent dark:text-brand-400">
                {personalInfo.title}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle">
              <h4 className="text-sm font-semibold tracking-widest uppercase text-neutral-500 dark:text-neutral-400 mb-4">
                Quick Facts
              </h4>
              <div className="space-y-4">
                {[
                  { icon: Briefcase, label: "Role", value: personalInfo.title },
                  { icon: MapPin, label: "Location", value: personalInfo.location },
                  {
                    icon: Calendar,
                    label: "Experience",
                    value: "7+ years · May 2019 to Aug 2026",
                  },
                  {
                    icon: Briefcase,
                    label: "Domain",
                    value: "HR Technology · B2B SaaS",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-brand-primary dark:text-white">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to full track record */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-950/20 dark:to-brand-950/10 border border-border-accent dark:border-border-dark-accent">
              <p className="text-sm text-brand-950 dark:text-brand-200 leading-relaxed mb-4">
                My career is auditable: 11,697 commits, 1,661 Jira tickets held and 49
                product specs written, all reconstructed from primary sources rather than
                recollection. The full story lives on its own page.
              </p>
              <Link
                href="/career"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary dark:bg-white text-white dark:text-brand-primary text-sm font-medium hover:bg-brand-accent dark:hover:bg-brand-100 transition-all"
              >
                Explore my full track record
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
