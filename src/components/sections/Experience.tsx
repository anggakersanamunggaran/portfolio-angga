import { experiences } from "@/data/portfolio";
import { MapPin } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve{" "}
              <em className="accent-serif whitespace-nowrap">worked</em>
            </>
          }
          description="Seven years at one company across three phases, from feature contributor to the person trusted with re-architecting the flagship product."
        />

        {/*
          Dates run down a narrow left rail and the role runs beside them. That
          replaces the old dot-and-line timeline: the rule between rows already
          carries the sequence, so the dots and the connector were decoration on
          top of information the layout was giving away twice.
        */}
        <div className="mt-14">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="grid gap-6 border-t border-rule py-10 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-3">
                <p className="label-micro text-ink">
                  {exp.startDate} to {exp.endDate}
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted">
                  <MapPin size={12} aria-hidden="true" />
                  {exp.location}
                </p>
              </div>

              <div className="lg:col-span-9">
                <h3 className="display-m text-ink">{exp.role}</h3>
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-ink underline underline-offset-2"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-muted">{exp.company}</p>
                )}

                <p className="mt-5 max-w-2xl text-sm leading-relaxed text-body">
                  {exp.description}
                </p>

                {exp.achievements.length > 0 && (
                  <div className="mt-7">
                    <h4 className="label-micro text-muted">Key achievements</h4>
                    <ul className="mt-4 max-w-2xl space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-3 text-sm leading-relaxed text-body"
                        >
                          <span
                            className="mt-2 h-1 w-1 shrink-0 bg-ink"
                            aria-hidden="true"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="mt-7 flex flex-wrap gap-2">
                  {exp.techUsed.map((tech) => (
                    <li
                      key={tech}
                      className="border border-rule px-2.5 py-1 label-micro text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
