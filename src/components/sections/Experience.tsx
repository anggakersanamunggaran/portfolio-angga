import { experiences } from "@/data/portfolio";
import { MapPin, Calendar } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            Experience
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
            Where I&apos;ve worked
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            My professional journey building software that makes a real impact.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          <div className="space-y-12">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="relative sm:pl-12 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[11px] top-1 w-[17px] h-[17px] rounded-full border-[3px] border-brand-accent dark:border-brand-400 bg-white dark:bg-surface-dark hidden sm:block group-hover:scale-125 transition-transform" />

                {/* Card */}
                <div className="p-6 lg:p-8 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-brand-primary dark:text-white">
                        {exp.role}
                      </h4>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-accent dark:text-brand-400 hover:underline"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          {exp.company}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-600 dark:text-text-dark-secondary leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  {exp.achievements.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs font-semibold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 mb-2">
                        Key Achievements
                      </h5>
                      <ul className="space-y-1.5">
                        {exp.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-neutral-600 dark:text-text-dark-secondary"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-accent dark:bg-brand-400 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech used */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
