# Angga Kersana Munggaran — Portfolio Website

This is a modern portfolio website built with Next.js 16 (App Router) and Tailwind CSS v4.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@theme` directives in CSS)
- **Icons:** lucide-react
- **Deploy:** Vercel (push to `main` auto-redeploys)

## Project Structure
```
src/
├── app/                    # App Router pages
│   ├── globals.css         # Global styles + Tailwind v4 theme tokens
│   ├── layout.tsx          # Root layout (Navbar, Footer, fonts, metadata)
│   ├── page.tsx            # Homepage (all sections)
│   ├── career/page.tsx     # Auditable full track-record page
│   ├── blog/page.tsx       # Writing index
│   ├── blog/[slug]/page.tsx # Post, statically generated per slug
│   └── opengraph-image.tsx # OG card, drawn with satori
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav; section links go to "/#section"
│   │   └── Footer.tsx      # Footer with social links
│   ├── ui/                 # Shared design primitives
│   │   ├── Rule.tsx            # Hairline rule closed by a square marker
│   │   ├── SectionHeader.tsx   # Eyebrow + display heading, 12-column grid
│   │   └── cta.ts              # ctaSolid / ctaOutline / ctaOnInk / ctaOnInkOutline
│   ├── blog/
│   │   └── PostBody.tsx    # Renders post blocks; the only article typography
│   └── sections/
│       ├── Hero.tsx            # Hero: headline + proof strip + CTAs + latest post
│       ├── ForYourBusiness.tsx # "What I can do for your business" section
│       ├── About.tsx           # About + quick facts + recognition band
│       ├── Skills.tsx          # Skill chips with check icons (no progress bars)
│       ├── Projects.tsx        # Project cards + detail modal
│       ├── Experience.tsx      # Work experience timeline
│       └── Contact.tsx         # Contact cards + email CTA
├── data/
│   ├── portfolio.ts        # ALL site content (personalInfo, heroProof, skills, projects, experiences, career data)
│   └── posts.ts            # Blog posts, stored as typed blocks
└── lib/
    └── utils.ts            # Utility functions
```

## Development
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Start production server
```

## Design System
Monochrome editorial: one black, one white, hairline rules, and typography carrying the whole design. Inspired by the Zero One Group site, but with Angga's own identity. Their "0——1" mark is deliberately **not** imitated.

- **Single fixed theme, no dark mode.** `@custom-variant dark (&:where(.dark, .dark *))` makes every `dark:` class inert, because `.dark` is never set anywhere. Do not reintroduce a media-based dark variant: an explicitly black hero cannot coexist with a theme that resolves surfaces to white.
- **Colour is token-driven.** `--color-ink`, `--color-paper`, `--color-rule`, `--color-rule-invert`, `--color-muted`, `--color-muted-invert`. The legacy `brand-*` and `surface-*` names still exist but are repointed to greys. **Change the tokens, not the components.**
- **Shape and elevation are token-driven too.** `@theme { --radius-*: 0px; --shadow-*: 0 0 #0000 }` squares off every corner and kills every shadow site-wide. Note that `rounded-full` is **not** token-driven (it compiles to `calc(infinity * 1px)`), so deliberate circles survive, and a stray pill-shaped element will quietly outlive a restyle.
- **Utilities:** `label-micro` (11px uppercase, 0.2em tracking) for eyebrows, nav links and captions; `display-xl` / `display-l` / `display-m` for headings; `accent-serif` for the Instrument Serif italic emphasis words inside a sans headline. `stagger-1`..`stagger-9` delay the entrance animations.
- **Fonts:** Inter via `next/font` (`--font-inter`) plus Instrument Serif italic (`--font-instrument-serif`). The theme must reference `var(--font-inter)`, **never the literal string `"Inter"`**: `@theme inline` inlines resolved values, so a literal never matches the hashed family name the loader installs, and the font silently falls back with nothing appearing broken.
- **Shared building blocks:** `components/ui/Rule.tsx` (hairline closed by a square marker), `components/ui/SectionHeader.tsx` (eyebrow + display heading in a 12-column grid), `components/ui/cta.ts` (`ctaSolid`, `ctaOutline`, `ctaOnInk`, `ctaOnInkOutline`).
- **The one colour exception:** the profile photo. It stays full colour on purpose. The monochrome system frames the page, not the person.
- **Accessibility the design depends on:** with no accent colour left to signal with, inline links are underlined, focus rings are 2px black (white inside `.on-ink`), `::selection` is inverted per surface, and `prefers-reduced-motion` resolves the `opacity-0` entrance elements to their finished state instead of leaving a blank page.
- **Measure, do not eyeball.** Headless screenshots have lied about layout in this repo (the tool ignored `--window-size` and laid the page out ~886px wide while capturing 390px, which looked exactly like a mobile overflow bug). Verify layout with `getBoundingClientRect()`, `documentElement.scrollWidth` and `getComputedStyle()` from a real browser.

## Updating Content
All portfolio content lives in `src/data/portfolio.ts`:
- Edit `personalInfo` for name, headline, bio, social links, `resumeUrl`
- Edit `heroProof` for the Hero proof-strip numbers
- Edit `careerStats` / `careerPhases` / `domainExpertise` / `cloudMigration` for the /career page
- Edit `skills` array for technology skills (rendered as chips)
- Edit `projects` array for project showcase entries (title, description, longDescription, highlights)
- Edit `experiences` array for work history

All blog content lives in `src/data/posts.ts`, as typed blocks rather than markdown (no markdown dependency, and the renderer owns every typographic detail):
- Append a post to `posts`; the `slug` becomes `/blog/<slug>` and it is statically generated automatically
- `title` is the heading lead (heavy uppercase display face), `accent` is the heading tail (serif italic). Keep the accent to a few words
- Blocks are `p`, `h2`, `ul` (items), `code` (code + optional caption), and `compare` (before/after image pair + optional caption)
- A pair of backticks inside `p`/`ul` text renders as an inline code chip, so the stored text stays readable as plain source
- Screenshots for a `compare` block live in `public/blog/`
A richer "where to edit what" table lives in `public/angga-task/README.md`.

## Working Conventions (Angga)
How Angga runs his projects — applies beyond this repo too:
- **GitFlow always** as the branching strategy: feature branch off `develop` → `develop` → `release` → `main`.
  - NOTE: this portfolio repo only has a `main` branch and is pushed to directly to trigger Vercel deploys. Confirm before applying full GitFlow here.
- **Product management:** Jira tickets for tracking, **Confluence as documentation**. Engineering commits should be traceable to a Jira ticket key.

## Repo & Branch Routing (one folder, two remotes)
This working copy is a **single folder with two remotes**, and each branch pushes to a different one. A wrong push publishes personal job-application material to a public repo, so confirm the target before every push.

| Branch | Remote | GitHub repo | Visibility | Holds |
|---|---|---|---|---|
| `main` | `origin` | `portfolio-angga` | **PUBLIC** | Portfolio source, `public/CV/`, public context log |
| `apply` | `personal` | `personal-notes` | **PRIVATE** | Everything on `main`, plus application material: `public/angga-task/apply-to/`, `public/angga-task/screening-answers.md`, `screening-answer.md`, `public/angga-task/signature-gmail-preview.html` |

- Upstream is already set (2026-09-15): `main` tracks `origin/main` and `apply` tracks `personal/main`, so a bare `git push` on either branch lands correctly.
- **When the pairing is not the tracked one, push explicitly:** `git push <remote> <local-branch>:<remote-branch>`. Never let a bare `git push` guess the target.
- **Never push `apply` to `origin`.** `origin/apply` existed until 2026-09-15 and exposed recruiter emails and applicant data on the public repo; it was deleted. Do not recreate it.
- `personal-notes` is a **full duplicate** of this portfolio, not a subset. A portfolio change lands only on `main` until `main` is merged into `apply`. Merge `main` → `apply` after portfolio work; there is no reverse sync.
- The personal gitignore rules (`screening-answer.md`, `public/angga-task/apply-to/`, `signature-gmail-preview.html`) exist **only on `main`**. On `apply` those files are tracked on purpose. Do not "fix" that by adding the rules to `apply`.

## Constraints & Standing Rules
- **`screening-answer.md` (repo root) stays untracked on `main`** (gitignored, personal notes). On `apply` it is tracked on purpose, because that branch pushes to the private repo. Never let it reach `origin`.
- **`public/CV/` IS committed and pushed** so the CV downloads live at `/CV/Angga_Kersana_Munggaran_CV_2026.pdf` (CTA label: "Check out my resume", not literal "Download CV"). Old duplicate `CV(2).pdf` was deleted.
- **No em dashes `—` in visible paragraph/bullet copy** anywhere (homepage, `src/data/portfolio.ts`, `/career`) so text does not read as AI-written. Use colons, commas, or restructured sentences. En dashes only in year/date ranges. Metadata `<title>`/OG may keep em dashes.
- **Career numbers must stay verifiable** from primary sources (git history, Jira, Confluence/docs). Never invent figures.
- **Respond to Angga in Indonesian.**
- A human-readable context log lives at `public/angga-task/README.md` — keep it in sync when making structural or content changes.

## Pages
- `/` — Single-page site with all sections (Hero → ForYourBusiness → About → Skills → Projects → Experience → Contact)
- `/career` — Full auditable track record (stats, three career acts, cloud chapter, domain expertise, engineering practice)
- `/blog` — Writing index, one row per post on a date rail
- `/blog/<slug>` — A single post, statically generated from `generateStaticParams`

Only the homepage opens on a black hero. The navbar decides its colours by measuring `[data-hero]`, so a new page does **not** need its own dark hero to look right, and a page that adds one will also need the navbar's `overHero` condition widened past `pathname === "/"`.
