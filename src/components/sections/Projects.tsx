"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ExternalLink, ChevronRight, X, Briefcase, Rocket } from "lucide-react";
import { GithubIcon, GitlabIcon } from "@/components/ui/social-icons";

const workProjects = projects.filter((p) => p.kind === "work");
const sideProjects = projects.filter((p) => p.kind === "side");

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="group relative flex flex-col bg-white dark:bg-surface-dark-secondary rounded-2xl border border-neutral-200 dark:border-border-dark-subtle overflow-hidden hover:border-brand-200 dark:hover:border-brand-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-950/5 dark:hover:shadow-black/20">
      {/* Card gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-600 to-brand-accent dark:from-brand-400 dark:to-brand-accent" />

      <div className="flex flex-col flex-1 p-6 lg:p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold text-brand-primary dark:text-white mb-2 group-hover:text-brand-accent dark:group-hover:text-brand-400 transition-colors">
          {project.title}
        </h4>

        {/* Description */}
        <p className="text-sm text-neutral-600 dark:text-text-dark-secondary leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Year */}
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4">
          {project.year}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpen(project.id)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent dark:text-brand-400 hover:text-brand-accent-hover dark:hover:text-brand-200 transition-colors"
          >
            View Details
            <ChevronRight size={14} />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            {project.links?.github && (
              <a
                href={project.links?.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-brand-accent dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all"
                aria-label="View on GitHub"
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.links?.gitlab && (
              <a
                href={project.links?.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-brand-accent dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all"
                aria-label="View on GitLab"
              >
                <GitlabIcon size={16} />
              </a>
            )}
            {project.links?.live && (
              <a
                href={project.links?.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-brand-accent dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 transition-all"
                aria-label="View live site"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const openProject = projects.find((p) => p.id === selectedProject);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-secondary/50 dark:bg-surface-dark-secondary/50" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-brand-accent dark:text-brand-400 mb-3">
            Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white">
            What I&apos;ve built
          </h3>
          <p className="mt-4 text-neutral-600 dark:text-text-dark-secondary max-w-xl mx-auto">
            Production-grade platforms I&apos;ve designed, shipped, and kept running —
            from flagship hiring software to side projects.
          </p>
        </div>

        {/* At ASTRNT */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex p-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400">
            <Briefcase size={15} />
          </span>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-brand-primary dark:text-white">
            At ASTRNT · commercial products
          </h4>
          <div className="hidden sm:block h-px flex-1 bg-neutral-200 dark:bg-neutral-800 ml-2" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {workProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}
        </div>

        {/* Side projects */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex p-1.5 rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400">
            <Rocket size={15} />
          </span>
          <h4 className="text-sm font-semibold tracking-widest uppercase text-brand-primary dark:text-white">
            Side projects & experiments
          </h4>
          <div className="hidden sm:block h-px flex-1 bg-neutral-200 dark:bg-neutral-800 ml-2" />
        </div>
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {sideProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />
          ))}

          {/* Fill card: more on GitHub */}
          <a
            href="https://github.com/anggakersanamunggaran"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center min-h-[200px] rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/40 dark:bg-surface-dark-secondary/40 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50/40 dark:hover:bg-brand-950/10 transition-all duration-300"
          >
            <div className="text-center p-6">
              <GithubIcon size={28} className="mx-auto text-neutral-400 dark:text-neutral-500 mb-3 group-hover:text-brand-accent dark:group-hover:text-brand-400 transition-colors" />
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                More experiments on GitHub
              </p>
              <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
                Explore my public repos
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && openProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-surface-dark rounded-2xl border border-neutral-200 dark:border-border-dark-subtle shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Gradient bar */}
            <div className="h-1.5 bg-gradient-to-r from-brand-600 to-brand-accent dark:from-brand-400 dark:to-brand-accent" />

            <div className="p-6 lg:p-8">
              {/* Kind badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md mb-4 ${
                  openProject.kind === "work"
                    ? "bg-brand-50 dark:bg-brand-950/30 text-brand-accent dark:text-brand-400"
                    : "bg-neutral-100 dark:bg-white/5 text-neutral-500 dark:text-neutral-400"
                }`}
              >
                {openProject.kind === "work" ? <Briefcase size={12} /> : <Rocket size={12} />}
                {openProject.kind === "work" ? "At ASTRNT" : "Side project"}
              </span>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {openProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl font-bold text-brand-primary dark:text-white mb-1">
                {openProject.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                {openProject.year}
              </p>

              <p className="text-neutral-600 dark:text-text-dark-secondary leading-relaxed mb-6">
                {openProject.longDescription}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-brand-primary dark:text-white mb-3">
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {openProject.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-neutral-600 dark:text-text-dark-secondary"
                    >
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-brand-accent dark:bg-brand-400 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-brand-primary dark:text-white mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {openProject.techStack.map((t) => (
                    <span
                      key={`${t.name}-${t.category}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-border-dark-subtle"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-200 dark:border-border-dark-subtle">
                {openProject.links?.github && (
                  <a
                    href={openProject.links?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
                  >
                    <GithubIcon size={16} />
                    Source Code
                  </a>
                )}
                {openProject.links?.gitlab && (
                  <a
                    href={openProject.links?.gitlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
                  >
                    <GitlabIcon size={16} />
                    Source Code
                  </a>
                )}
                {openProject.links?.live && (
                  <a
                    href={openProject.links?.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all"
                  >
                    <ExternalLink size={16} />
                    {openProject.kind === "work" ? "Live Product" : "Live Demo"}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
