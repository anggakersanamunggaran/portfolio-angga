"use client";

import { useState } from "react";
import { skills } from "@/data/portfolio";

export function Skills() {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            Skills & Expertise
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
            Technologies I work with
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            A curated set of tools and technologies I&apos;ve used to build production-grade
            applications — from frontend to infrastructure.
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
                  : "bg-neutral-100 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills bars */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="group p-4 rounded-xl bg-white dark:bg-surface-dark-secondary border border-neutral-200 dark:border-border-dark-subtle hover:border-brand-200 dark:hover:border-brand-600 transition-all duration-200"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-brand-primary dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-accent dark:from-brand-400 dark:to-brand-accent transition-all duration-700 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
