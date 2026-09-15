import type { ReactNode } from "react";
import { Rule } from "./Rule";

/*
 * Every section opens the same way: a rule, then a two-column header with the
 * micro label in a narrow left column and the display heading beside it.
 *
 * The heading is left-aligned and takes a ReactNode so callers can drop an
 * `<em className="accent-serif">` around the words that carry the emphasis.
 * That accent, and this header shape, are what tie the sections together.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <header className={className}>
      <Rule />
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <p className="label-micro text-muted lg:col-span-3">{eyebrow}</p>
        <div className="lg:col-span-9">
          <h2 className="display-l max-w-4xl">{title}</h2>
          {description && (
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              {description}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
