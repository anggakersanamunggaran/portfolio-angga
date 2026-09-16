import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { Rocket, FileText, Sparkles, Cloud, ArrowRight, Send } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ctaSolid, ctaOutline } from "@/components/ui/cta";

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
    title: "Scale and migrate successfully",
    body: "When 2,500 candidates hit the platform at once and the database saturated, I traced it and fixed it. When the company consolidated onto Azure, I carried the platform across, moving object and video storage to Azure Blob and the activity log from DynamoDB to MongoDB, successfully.",
  },
] as const;

export function ForYourBusiness() {
  return (
    <section id="for-your-business" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="For founders, CTOs and hiring teams"
          title={
            <>
              What I can do for{" "}
              {/* Kept on one line: broken across two, the serif phrase reads
                  as an accident rather than as emphasis. */}
              <em className="accent-serif whitespace-nowrap">your business</em>
            </>
          }
          description="Seven years of owning a product rather than just tickets maps onto the problems you are probably trying to solve today."
        />

        {/*
          Hairline grid: the container draws the top and left rules, each cell
          draws its own bottom and right. That gives a closed table without
          per-cell position logic, which breaks as soon as the grid rewraps.
        */}
        <div className="mt-14 grid border-t border-l border-rule sm:grid-cols-2">
          {offerings.map((offering) => (
            <article
              key={offering.title}
              className="group border-b border-r border-rule p-8 lg:p-10"
            >
              <offering.icon
                size={22}
                strokeWidth={1.5}
                className="text-ink"
                aria-hidden="true"
              />
              <h3 className="mt-6 text-lg font-bold leading-snug text-ink">
                {offering.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {offering.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-relaxed text-muted">
            Somewhere in there is likely the problem you are hiring for. If one of
            them is yours, we should talk.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/career" className={ctaOutline}>
              See the evidence
              <ArrowRight size={15} />
            </Link>
            <a
              href={`mailto:${personalInfo.email}?subject=Let%27s%20talk`}
              className={ctaSolid}
            >
              Let&apos;s talk
              <Send size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
