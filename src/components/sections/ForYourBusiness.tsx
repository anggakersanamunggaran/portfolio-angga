import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { Rocket, FileText, Sparkles, Cloud, ArrowRight, Send } from "lucide-react";

const offerings = [
  {
    icon: Rocket,
    title: "Rebuild a product that is slowing you down",
    body: "A legacy Laravel and PHP codebase does not have to block your roadmap. I ran one in production for seven years, then replaced it with a Next.js and TypeScript rebuild while customers kept using it. 18 feature areas shipped in about six months, with no cut-over outage.",
  },
  {
    icon: FileText,
    title: "Take an idea from spec to shipped product",
    body: "Most engineers ship code and somebody else writes the brief. I do both. I authored 19 product requirement documents, 30 design use cases and the PRD template a whole team adopted, then implemented what they described.",
  },
  {
    icon: Sparkles,
    title: "Add AI your users will actually feel",
    body: "I integrated Anthropic, OpenAI and Gemini into real features: AI CV scoring, candidate to job matching, and automatic grading of recorded video interview answers. Not a demo bolted onto the side, a capability built into the product.",
  },
  {
    icon: Cloud,
    title: "Scale and migrate without downtime",
    body: "When 2,500 candidates hit the platform at once and the database saturated, I traced it and fixed it. When the company consolidated onto Azure, I carried the platform across, moving object and video storage to Azure Blob and the activity log from DynamoDB to MongoDB, with no service downtime.",
  },
] as const;

export function ForYourBusiness() {
  return (
    <section id="for-your-business" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            For founders, CTOs and hiring teams
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white max-w-3xl mx-auto">
            What I can do for your business
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            Seven years of owning a product rather than just tickets maps onto the
            problems you are probably trying to solve today.
          </p>
        </div>

        {/* Offerings */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="group p-6 lg:p-8 rounded-2xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600/50 hover:shadow-lg hover:shadow-brand-950/5 dark:hover:shadow-black/20 transition-all duration-300"
            >
              <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400 w-fit mb-5 group-hover:scale-110 transition-transform">
                <offering.icon size={20} />
              </div>
              <h4 className="text-base font-bold text-brand-primary dark:text-white mb-2 leading-snug">
                {offering.title}
              </h4>
              <p className="text-sm text-neutral-600 dark:text-text-dark-secondary leading-relaxed">
                {offering.body}
              </p>
            </div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 dark:text-text-dark-secondary max-w-lg mx-auto mb-6">
            Somewhere in there is likely the problem you are hiring for. If one of
            them is yours, we should talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/career"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-white/5 hover:border-brand-400 transition-all duration-200"
            >
              See the evidence
              <ArrowRight size={16} />
            </Link>
            <a
              href={`mailto:${personalInfo.email}?subject=Let%27s%20talk`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary dark:bg-white text-white dark:text-brand-primary font-medium text-sm hover:bg-brand-accent dark:hover:bg-brand-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Let&apos;s talk
              <Send size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
