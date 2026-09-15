/*
 * The rule motif: a hairline spanning the full content width, closed by a small
 * square marker at the right edge. It is the only decorative element the design
 * uses, and it replaces the gradient bars and blurred blobs of the old theme.
 *
 * `invert` is for the black hero and the footer, where a #e5e5e5 hairline
 * would be invisible.
 */
export function Rule({
  invert = false,
  className = "",
}: {
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className={`h-px flex-1 ${invert ? "bg-white/25" : "bg-rule"}`} />
      <span className={`h-1.5 w-1.5 ${invert ? "bg-white" : "bg-ink"}`} />
    </div>
  );
}
