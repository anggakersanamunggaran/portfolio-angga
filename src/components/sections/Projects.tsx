"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/data/portfolio";
import { ExternalLink, ChevronRight, X, Briefcase, Rocket } from "lucide-react";
import { GithubIcon, GitlabIcon } from "@/components/ui/social-icons";
import { SectionHeader } from "@/components/ui/SectionHeader";

const workProjects = projects.filter((p) => p.kind === "work");
const sideProjects = projects.filter((p) => p.kind === "side");

/** Micro label with a hairline running to the edge. Groups the two grids. */
function GroupLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Briefcase;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4">
      <Icon size={16} strokeWidth={1.5} className="shrink-0 text-ink" aria-hidden="true" />
      <h3 className="label-micro text-ink">{children}</h3>
      <span className="h-px flex-1 bg-rule" />
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
  featured?: boolean;
}

function ProjectCard({ project, onOpen, featured }: ProjectCardProps) {
  return (
    <article
      className={`group flex flex-col border-b border-r border-rule ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`flex flex-1 ${
          featured ? "flex-col gap-8 p-8 lg:flex-row lg:p-10" : "flex-col p-8"
        }`}
      >
        {/* Main column */}
        <div className="flex flex-1 flex-col">
          <ul className="mb-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="border border-rule px-2.5 py-1 label-micro text-muted"
              >
                {tag}
              </li>
            ))}
            {project.tags.length > 3 && (
              <li className="border border-rule px-2.5 py-1 label-micro text-muted">
                +{project.tags.length - 3}
              </li>
            )}
          </ul>

          <h4
            className={`font-bold text-ink ${
              featured ? "display-m" : "text-xl"
            }`}
          >
            {project.title}
          </h4>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          <p className="label-micro mt-5 text-muted">{project.year}</p>

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              onClick={() => onOpen(project.id)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink underline underline-offset-4"
            >
              View details
              <ChevronRight size={14} aria-hidden="true" />
            </button>

            <div className="ml-auto flex items-center gap-1">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted transition-colors hover:text-ink"
                  aria-label={`${project.title} on GitHub`}
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {project.links?.gitlab && (
                <a
                  href={project.links.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted transition-colors hover:text-ink"
                  aria-label={`${project.title} on GitLab`}
                >
                  <GitlabIcon size={16} />
                </a>
              )}
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted transition-colors hover:text-ink"
                  aria-label={`${project.title} live site`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right rail on the featured card, divided by a vertical hairline. */}
        {featured && (
          <aside className="flex flex-col lg:w-80 lg:shrink-0 lg:border-l lg:border-rule lg:pl-8">
            <h5 className="label-micro text-muted">Key moves</h5>
            <ul className="mt-4 space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-sm leading-relaxed text-body"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 bg-ink" aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {project.techStack.slice(0, 6).map((tech) => (
                <li
                  key={tech.name}
                  className="border border-rule px-2.5 py-1 label-micro text-muted"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openProject = projects.find((p) => p.id === selectedProject);

  /*
   * Dialog behaviour: Escape closes, the page behind stops scrolling, focus
   * moves into the panel on open and returns to whatever opened it on close.
   * Without the focus move, keyboard users keep tabbing through the page
   * underneath the overlay.
   */
  useEffect(() => {
    if (!selectedProject) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      opener?.focus();
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <SectionHeader
          eyebrow="Projects"
          title={
            <>
              What I&apos;ve{" "}
              <em className="accent-serif whitespace-nowrap">built</em>
            </>
          }
          description="Production-grade platforms I've designed, shipped, and kept running, from flagship hiring software to side projects."
        />

        {/* Commercial work */}
        <div className="mt-14">
          <GroupLabel icon={Briefcase}>At ASTRNT · commercial products</GroupLabel>
          <div className="mt-6 grid border-t border-l border-rule md:grid-cols-2">
            {workProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
                featured={project.featured}
              />
            ))}
          </div>
        </div>

        {/* Side projects */}
        <div className="mt-16">
          <GroupLabel icon={Rocket}>Side projects & experiments</GroupLabel>
          <div className="mt-6 grid border-t border-l border-rule md:grid-cols-2">
            {sideProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={setSelectedProject}
              />
            ))}

            <a
              href="https://github.com/anggakersanamunggaran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[200px] items-center justify-center border-b border-r border-rule p-8 transition-colors hover:bg-neutral-50"
            >
              <span className="text-center">
                <GithubIcon size={26} className="mx-auto text-ink" />
                <span className="mt-4 block text-sm font-medium text-ink">
                  More experiments on GitHub
                </span>
                <span className="mt-1 block label-micro text-muted">
                  Explore my public repos
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {selectedProject && openProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto border border-rule bg-paper"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-rule bg-paper px-6 py-4">
              <span className="label-micro text-muted">
                {openProject.kind === "work" ? "At ASTRNT" : "Side project"}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1 text-muted transition-colors hover:text-ink"
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 lg:p-8">
              <ul className="mb-5 flex flex-wrap gap-2">
                {openProject.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-rule px-2.5 py-1 label-micro text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              <h3 id="project-dialog-title" className="display-m text-ink">
                {openProject.title}
              </h3>
              <p className="label-micro mt-3 text-muted">{openProject.year}</p>

              <p className="mt-6 text-sm leading-relaxed text-body">
                {openProject.longDescription}
              </p>

              <h4 className="label-micro mt-8 text-muted">Key highlights</h4>
              <ul className="mt-4 space-y-3">
                {openProject.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 text-sm leading-relaxed text-body"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 bg-ink" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <h4 className="label-micro mt-8 text-muted">Tech stack</h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {openProject.techStack.map((tech) => (
                  <li
                    key={`${tech.name}-${tech.category}`}
                    className="border border-rule px-2.5 py-1 label-micro text-muted"
                  >
                    {tech.name}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-rule pt-6">
                {openProject.links?.github && (
                  <a
                    href={openProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-rule px-4 py-2 label-micro text-ink transition-colors hover:border-ink"
                  >
                    <GithubIcon size={15} />
                    Source code
                  </a>
                )}
                {openProject.links?.gitlab && (
                  <a
                    href={openProject.links.gitlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-rule px-4 py-2 label-micro text-ink transition-colors hover:border-ink"
                  >
                    <GitlabIcon size={15} />
                    Source code
                  </a>
                )}
                {openProject.links?.live && (
                  <a
                    href={openProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-rule px-4 py-2 label-micro text-ink transition-colors hover:border-ink"
                  >
                    <ExternalLink size={15} />
                    {openProject.kind === "work" ? "Live product" : "Live demo"}
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
