/*
 * Blog content.
 *
 * Posts are stored as typed blocks rather than markdown so the site keeps its
 * single content convention (`portfolio.ts` is the same idea) and pulls in no
 * markdown dependency. It also means the renderer decides every typographic
 * detail, so article prose cannot drift away from the rest of the design the
 * way a generic markdown stylesheet would.
 *
 * To add a post: append to `posts`. The slug becomes the URL, `/blog/<slug>`.
 */
/*
 * In `p` and `ul` text, a pair of backticks marks inline code. The renderer
 * turns it into a chip, so the stored text stays readable as plain source.
 */
export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; caption?: string }
  | {
      type: "compare";
      /** The older version of the same view. */
      before: { src: string; alt: string };
      /** The current version, shot at the same width and scroll position. */
      after: { src: string; alt: string };
      caption?: string;
    };

export interface Post {
  slug: string;
  /** Heading lead, set in the heavy uppercase display face. */
  title: string;
  /** Heading tail, set in the serif italic accent. Keep it to a few words. */
  accent: string;
  /** ISO date, used for sorting and the <time> element. */
  date: string;
  /** Human date, written out so it needs no client-side formatting. */
  dateLabel: string;
  readingMinutes: number;
  excerpt: string;
  tags: string[];
  blocks: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "why-this-site-looks-the-way-it-does",
    title: "Why this site looks",
    accent: "the way it does",
    date: "2026-09-15",
    dateLabel: "15 September 2026",
    readingMinutes: 8,
    excerpt:
      "I rebuilt this portfolio around a monochrome, editorial system. These are the decisions behind it, including two Tailwind v4 behaviours that did most of the work and one screenshot that lied to me.",
    tags: ["Design systems", "Tailwind", "Next.js", "Accessibility"],
    blocks: [
      {
        type: "p",
        text: "The previous version of this site looked like a lot of developer portfolios: a navy and purple palette, soft rounded cards, drop shadows, gradient headings, and two blurred circles floating behind the hero. None of it was wrong. It was just generic, and generic is expensive when the page has about ten seconds to say something specific.",
      },
      {
        type: "p",
        text: "So I rebuilt it around a single idea: one black, one white, hairline rules, and typography doing all of the work. This post is the reasoning, and the parts that turned out to be more interesting than expected.",
      },
      {
        type: "compare",
        before: {
          src: "/blog/before-hero.jpg",
          alt: "The original homepage hero: centred layout, navy and purple palette, gradient background, and a circular portrait.",
        },
        after: {
          src: "/blog/after-hero.jpg",
          alt: "The rebuilt homepage hero: black background, left-aligned uppercase headline with a serif italic closing clause, and a proof strip on hairline rules.",
        },
        caption:
          "The same hero, same words and same numbers, captured at 1440 by 900.",
      },

      { type: "h2", text: "Deciding what to aim at" },
      {
        type: "p",
        text: "I picked a reference site and studied it properly rather than in passing. The useful finding was that it is not uniformly dark. The homepage opens on a black hero and everything after it is white. That one observation settled the structure of my own homepage, because it meant the black was a statement at the top rather than a theme.",
      },
      {
        type: "p",
        text: "The other finding was how little decoration the reference used. No rounded corners, no shadows, no gradients. Every separation is a one pixel line. Emphasis comes entirely from type: a heavy uppercase display face for statements, an italic serif for the words that carry the meaning, and a tiny wide-tracked uppercase label for everything structural.",
      },

      { type: "h2", text: "One decision that removed about ninety edits" },
      {
        type: "p",
        text: "My first assumption was that going monochrome meant touching every component. Roughly 167 class references pointed at colour tokens and about 114 were light and dark pairs. That is a large, error-prone sweep.",
      },
      {
        type: "p",
        text: "The better move was to change the tokens instead and leave the components alone. Tailwind v4 keeps its design tokens in CSS, so repointing the brand ramp to greys made the entire site monochrome in one file:",
      },
      {
        type: "code",
        caption: "Same token names, new values. No component changed.",
        code: `@theme inline {
  --color-brand-50:  #f5f5f5;
  --color-brand-600: #000000;
  --color-brand-950: #000000;
  --color-brand-primary: #000000;
  --color-brand-accent:  #000000;
}`,
      },
      {
        type: "p",
        text: "The same trick reaches further than colour. Corner radius, shadow and blur are token-driven too, so the whole site lost its soft edges from one block. Worth knowing: `rounded-full` is not token-driven, because it compiles to a calc that resolves to a very large number. Deliberate circles survive, which was what I wanted, but it also means a stray pill-shaped tag will quietly outlive the restyle.",
      },
      {
        type: "code",
        caption: "This is the whole of it. It is a one-way door.",
        code: `@theme {
  --radius-sm: 0px;
  --radius-md: 0px;
  --radius-lg: 0px;
  --radius-xl: 0px;
  --radius-2xl: 0px;

  --shadow-sm: 0 0 #0000;
  --shadow-md: 0 0 #0000;
  --shadow-lg: 0 0 #0000;
}`,
      },
      {
        type: "compare",
        before: {
          src: "/blog/before-projects.jpg",
          alt: "The original project list: rounded cards with gradient top edges, drop shadows and pill-shaped tag chips.",
        },
        after: {
          src: "/blog/after-projects.jpg",
          alt: "The rebuilt project list: a hairline grid of square cells, squared tag chips with wide-tracked uppercase labels, and no elevation.",
        },
        caption:
          "The project grid, before and after the radius and shadow tokens were zeroed.",
      },

      { type: "h2", text: "Removing dark mode in one line" },
      {
        type: "p",
        text: "The old site followed the operating system and switched itself to dark automatically. That had to go, and not only for taste: an explicitly black hero cannot survive a dark mode that resolves surfaces to white. Two themes and one designed black section are not compatible.",
      },
      {
        type: "p",
        text: "Deleting the dark variants from a hundred places was the obvious approach. The cheaper one was to neuter the variant itself so those classes never match anything:",
      },
      {
        type: "code",
        caption: "`.dark` is never set anywhere, so every dark: twin is inert.",
        code: `@custom-variant dark (&:where(.dark, .dark *));`,
      },
      {
        type: "p",
        text: "That buys time. The dead classes then get deleted while the component is open for other reasons, instead of in one risky pass. I have since removed all of them, but they were harmless for as long as they existed.",
      },

      { type: "h2", text: "The font that was downloaded but never used" },
      {
        type: "p",
        text: "This one cost me an hour. The site loaded Inter through the framework font loader, which self-hosts it and gives the family a hashed name. My theme declared the sans stack as the literal string \"Inter\".",
      },
      {
        type: "p",
        text: "The `inline` keyword on a theme block inlines resolved values rather than referencing them. So the utility compiled down to a literal font-family of Inter, which never matched the hashed name the loader had actually installed. The font file was downloaded on every page load and used on none of them. Everything fell back to the system sans, which looks close enough that nothing appears broken.",
      },
      {
        type: "p",
        text: "The fix is to point the token at the variable the loader exposes, so the reference stays a reference:",
      },
      {
        type: "code",
        caption: "Before: the literal string, which silently never matched.",
        code: `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

/* After: the variable, which resolves to the loaded face. */
--font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;`,
      },

      { type: "h2", text: "Measuring instead of trusting the picture" },
      {
        type: "p",
        text: "Partway through I took a screenshot at a phone width and the layout looked broken. Headline text ran off the right edge, the type was far too large for the screen, and it looked like a horizontal overflow bug.",
      },
      {
        type: "p",
        text: "It was not. The screenshot tool was not applying the window size to page layout, so the page had laid itself out at roughly 886 pixels wide and the image had captured the left 390 of it. I had been about to redesign a layout that was already correct.",
      },
      {
        type: "p",
        text: "So I stopped screenshotting to check layout and started measuring it. The replacement script reports the real viewport, the document scroll width, the rendered font size, and any element whose box escapes the viewport, at several widths, from a real browser:",
      },
      {
        type: "code",
        caption: "The check that actually answers the question.",
        code: `scrollWidth > clientWidth   // is anything overflowing?
getBoundingClientRect()     // where is the box, really?
getComputedStyle(h1).fontSize  // did clamp() resolve as intended?`,
      },
      {
        type: "p",
        text: "The same measurement caught a genuine bug the eye had missed. The hero is anchored to the bottom of the first screen, and on a phone its content comes to about 1335 pixels against a 900 pixel viewport. The four proof numbers were stacking into four rows. Two columns on small screens and one row above the breakpoint brought it down to 1183. Still taller than one screen on a phone, which is fine, but no longer absurd.",
      },

      { type: "h2", text: "What the austere version has to get right" },
      {
        type: "p",
        text: "A monochrome design has no colour left to signal with, which moves weight onto the things colour was quietly covering for:",
      },
      {
        type: "ul",
        items: [
          "Focus rings. There is no accent colour to lean on, so keyboard focus is a two pixel outline, black on white and white on the black hero. It has to be visible on both.",
          "Links inside prose. With no colour shift available, an inline link is underlined. That is not a style preference, it is the only affordance left.",
          "Text selection. The default selection would have been invisible against the black hero, so selection colours are set per surface.",
          "Motion. Several sections start at zero opacity and rely on an animation to become visible. Anyone who has asked their system to reduce motion would have landed on a blank page, so reduced motion resolves those elements to their finished state.",
        ],
      },

      { type: "h2", text: "What I would keep" },
      {
        type: "p",
        text: "The token-first approach. Changing what the tokens mean, rather than what the components say, turned a large risky refactor into a small safe one, and the same lever reached radius, shadow and blur that I had not expected it to touch.",
      },
      {
        type: "p",
        text: "And measuring rather than eyeballing. Two of the decisions in this post came from a number in a terminal, not from looking at the page, and one of them was a bug I had been looking straight past.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Newest first. */
export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
