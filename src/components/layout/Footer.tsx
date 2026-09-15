import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { Rule } from "@/components/ui/Rule";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <Rule />
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-base font-bold uppercase tracking-tight text-ink"
            >
              {personalInfo.shortName}.
            </Link>
            <p className="label-micro mt-2 text-muted">
              © {new Date().getFullYear()} · {personalInfo.title}
            </p>
          </div>

          {/*
            The thin vertical rules between links are the footer's version of
            the same hairline motif used between sections.
          */}
          <nav aria-label="Elsewhere">
            <ul className="flex flex-wrap items-stretch divide-x divide-rule border-x border-rule">
              {personalInfo.socials.map((social) => (
                <li key={social.name}>
                  {/* A mailto: is not an external page, so it must not open a
                      new tab the way the http links do. */}
                  <a
                    href={social.url}
                    target={social.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.url.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="label-micro flex h-full items-center px-5 py-2 text-muted transition-colors hover:text-ink"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="label-micro flex h-full items-center px-5 py-2 text-muted transition-colors hover:text-ink"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
