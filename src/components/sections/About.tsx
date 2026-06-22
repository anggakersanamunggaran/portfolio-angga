import { personalInfo } from "@/data/portfolio";
import { Briefcase, MapPin, Calendar } from "lucide-react";

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
              Building digital products with precision and purpose.
            </h3>
            <div className="space-y-4 text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
              <p>
                I&apos;m a full-stack engineer passionate about building intuitive,
                high-performance web applications that solve real problems. Currently based
                in {personalInfo.location}, I focus on creating products at the
                intersection of modern web technologies and artificial intelligence.
              </p>
              <p>
                My experience spans building AI-powered hiring platforms used by thousands
                of recruiters, developing e-commerce monitoring systems with complex
                background job pipelines, and crafting lightweight developer tools and
                libraries.
              </p>
              <p>
                I believe in writing clean, maintainable code and designing systems that
                scale gracefully. Every project is an opportunity to learn something new
                and make a meaningful impact.
              </p>
            </div>
          </div>

          {/* Right: Photo + Quick facts */}
          <div className="space-y-6">
            {/* Photo card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle text-center">
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
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
                    value: "6+ years professional",
                  },
                  {
                    icon: Briefcase,
                    label: "Focus",
                    value: "Full-Stack Web, AI Integration",
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

            {/* Quote/Tagline box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-950/20 dark:to-brand-950/10 border border-border-accent dark:border-border-dark-accent">
              <p className="text-sm italic text-brand-950 dark:text-brand-200 leading-relaxed">
                &ldquo;Every great product starts as a solution to a real problem.
                I build the bridge between complex requirements and elegant
                implementation.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
