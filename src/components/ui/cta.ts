/*
 * Shared call-to-action styles. Exported as class strings rather than a
 * component because the links are a mix of `next/link`, `mailto:` anchors and
 * in-page hashes, and a wrapper would have to re-implement that dispatch.
 *
 * All four are square, hairline-bordered, and set in the micro label face. The
 * solid variants invert on hover, which is the only motion the design uses.
 */
const base =
  "inline-flex items-center gap-2 border px-6 py-3 label-micro transition-colors";

/** Primary action on a white section. */
export const ctaSolid = `${base} border-ink bg-ink text-white hover:bg-paper hover:text-ink`;

/** Secondary action on a white section. */
export const ctaOutline = `${base} border-rule text-ink hover:border-ink`;

/** Primary action on the black hero or footer. */
export const ctaOnInk = `${base} border-white bg-white text-ink hover:bg-transparent hover:text-white`;

/** Secondary action on the black hero or footer. */
export const ctaOnInkOutline = `${base} border-white/30 text-white hover:border-white`;
