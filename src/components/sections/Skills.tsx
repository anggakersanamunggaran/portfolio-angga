"use client";

import { useState } from "react";
import { skills } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="Skills & expertise"
          title={
            <>
              Proven in production,{" "}
              <em className="accent-serif whitespace-nowrap">not self-assessed</em>
            </>
          }
          description="Every item here shipped in a product people actually used, across two generations of the ASTRNT stack from 2019 to 2026."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/*
            Category filter. Deliberately kept as flat bordered squares rather
            than pills: `rounded-full` is the one radius the token layer does not
            neutralise, so a pill here would survive the restyle.
          */}
          <div
            className="flex flex-wrap gap-2 lg:col-span-4 lg:flex-col lg:items-start"
            role="group"
            aria-label="Filter skills by category"
          >
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={active}
                  className={`border px-4 py-2.5 label-micro text-left transition-colors ${
                    active
                      ? "border-ink bg-ink text-white"
                      : "border-rule text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-wrap gap-2">
              {filteredSkills.map((skill) => (
                <li
                  key={skill.name}
                  className="border border-rule px-4 py-2.5 text-sm font-medium text-ink"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-xl text-xs leading-relaxed text-muted">
              Usage spans the recruiter platform, the candidate assessment app and the
              Next.js rebuild. The full, verifiable breakdown lives on the{" "}
              {/* Underlined rather than colour-shifted: the design has no accent
                  colour to lean on, so the affordance has to be the underline. */}
              <a href="/career" className="text-ink underline underline-offset-2">
                career page
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
