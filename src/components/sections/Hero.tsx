"use client";

import Image from "next/image";
import { personalInfo, heroProof } from "@/data/portfolio";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/social-icons";

const iconMap: Record<string, React.ReactNode> = {
  github: <GithubIcon size={18} />,
  linkedin: <LinkedinIcon size={18} />,
  mail: <Mail size={18} />,
  whatsapp: <WhatsappIcon size={18} />,
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-surface-dark dark:to-surface-dark" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-brand-100/30 dark:bg-brand-600/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-brand-accent/5 dark:bg-brand-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-accent dark:border-border-dark-accent bg-brand-50/50 dark:bg-brand-950/20 text-sm text-brand-950 dark:text-brand-200 mb-8 opacity-0 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-soft" />
            Open to senior full-stack & product roles
          </div>

          {/* Profile Photo */}
          <div className="mb-8 opacity-0 animate-fade-in-up stagger-1">
            <Image
              src="/profile.jpg"
              alt={personalInfo.name}
              width={160}
              height={160}
              priority
              className="mx-auto w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-lg shadow-brand-950/10"
            />
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-brand-primary dark:text-white opacity-0 animate-fade-in-up stagger-2">
            {personalInfo.name}
          </h1>
          <p className="mt-4 text-xl sm:text-2xl md:text-3xl font-medium text-brand-accent dark:text-brand-400 opacity-0 animate-fade-in-up stagger-3">
            {personalInfo.title}
          </p>
          <p className="mt-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto opacity-0 animate-fade-in-up stagger-4">
            {personalInfo.tagline}
          </p>

          {/* Outcome headline */}
          <p className="mt-5 text-2xl sm:text-3xl md:text-[2rem] font-semibold leading-snug tracking-tight text-brand-primary dark:text-white max-w-3xl mx-auto opacity-0 animate-fade-in-up stagger-5">
            {personalInfo.headline}
          </p>

          {/* Supporting line */}
          <p className="mt-4 text-base leading-relaxed text-neutral-600 dark:text-text-dark-secondary max-w-2xl mx-auto opacity-0 animate-fade-in-up stagger-6">
            {personalInfo.description}
          </p>

          {/* Proof strip */}
          <dl className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 max-w-3xl mx-auto opacity-0 animate-fade-in-up stagger-7">
            {heroProof.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-brand-600 to-brand-accent dark:from-brand-400 dark:to-brand-accent bg-clip-text text-transparent tabular-nums">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-up stagger-8">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary dark:bg-white text-white dark:text-brand-primary font-medium text-sm hover:bg-brand-accent dark:hover:bg-brand-100 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              See the work behind these numbers
              <ArrowDown size={16} />
            </a>
            <a
              href="#for-your-business"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium text-sm hover:bg-neutral-100 dark:hover:bg-white/5 hover:border-brand-400 transition-all duration-200"
            >
              What this means for your business
            </a>
          </div>

          {/* Social links */}
          <div className="mt-10 flex items-center justify-center gap-3 opacity-0 animate-fade-in-up stagger-9">
            {personalInfo.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl text-neutral-500 dark:text-text-dark-secondary hover:text-brand-accent dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all"
                aria-label={social.name}
              >
                {iconMap[social.icon]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up">
        <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-600">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-700 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-neutral-400 dark:bg-neutral-600 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
