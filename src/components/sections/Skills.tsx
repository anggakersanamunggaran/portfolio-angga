"use client";

import { useState } from "react";
import { skills } from "@/data/portfolio";
import { Check } from "lucide-react";

export function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            Skills & Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
            Proven in production, not self-assessed
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            Every item here shipped in a product people actually used, across two
            generations of the ASTRNT stack from 2019 to 2026.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-brand-primary dark:bg-white text-white dark:text-brand-primary shadow-sm"
                  : "bg-white dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skill chips */}
        <div className="max-w-3xl mx-auto">
          <ul className="flex flex-wrap justify-center gap-2.5">
            {filteredSkills.map((skill) => (
              <li
                key={skill.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle text-sm font-medium text-brand-primary dark:text-white"
              >
                <Check size={14} className="text-brand-accent dark:text-brand-400 shrink-0" />
                {skill.name}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-neutral-500 dark:text-neutral-400">
            Usage spans the recruiter platform, the candidate assessment app and the
            Next.js rebuild. The full, verifiable breakdown lives on the{" "}
            <a
              href="/career"
              className="text-brand-accent dark:text-brand-400 hover:underline"
            >
              career page
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
