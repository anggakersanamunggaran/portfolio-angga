import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/portfolio";
import { Briefcase, MapPin, Calendar, ArrowRight, Layers, FileText } from "lucide-react";

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
              Seven years in one vertical — and the products to prove it.
            </h3>
            <div className="space-y-4 text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
              <p>
                I&apos;m a senior full-stack engineer who has spent my career inside
                HR technology at ASTRNT — spanning two complete generations of the stack.
                I helped build and sustain the flagship Laravel + React recruiter platform
                and its candidate assessment app for years, then led their ground-up
                rebuild on Next.js, React and TypeScript.
              </p>
              <p>
                What makes me unusual is scope. Beyond shipping the code, I write the
                product specifications that drive it — product requirement documents,
                design use cases, and the template the team writes against. I define the
                work, specify it, implement it, and document it.
              </p>
              <p>
                That mix — deep legacy-system knowledge, modern rebuild experience, and
                the ability to operate at scale under load — is genuinely hard to hire
                for, and it&apos;s what I bring to every project.
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
                  Maintained a legacy Laravel/React platform for seven years — then
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
                  Authored the product-specification layer for a platform rebuild — and
                  then implemented it.
                </p>
              </div>
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
                    value: "7+ years · 2019–present",
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
                My career is auditable — 11,697 commits, 1,661 Jira tickets held and
                49 product specs written are reconstructed from primary sources, not
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
