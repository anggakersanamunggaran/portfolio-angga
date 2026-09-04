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
│   ├── layout.tsx          # Root layout (Navbar, Footer, metadata)
│   ├── page.tsx            # Homepage (all sections)
│   └── career/page.tsx     # Auditable full track-record page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky nav; section links go to "/#section"
│   │   └── Footer.tsx      # Footer with social links
│   └── sections/
│       ├── Hero.tsx            # Hero: headline + proof strip + CTAs
│       ├── ForYourBusiness.tsx # "What I can do for your business" section
│       ├── About.tsx           # About + quick facts + recognition band
│       ├── Skills.tsx          # Skill chips with check icons (no progress bars)
│       ├── Projects.tsx        # Project cards + detail modal
│       ├── Experience.tsx      # Work experience timeline
│       └── Contact.tsx         # Contact cards + email CTA
├── data/
│   └── portfolio.ts        # ALL site content (personalInfo, heroProof, skills, projects, experiences, career data)
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
- Uses custom theme tokens in `globals.css` via `@theme inline`
- Brand colors: `brand-*` tokens (navy-based with purple accent)
- Dark mode: automatic via `prefers-color-scheme`
- Animation utilities: `animate-fade-in-up`, `animate-scale-in`, etc.

## Updating Content
All portfolio content lives in `src/data/portfolio.ts`:
- Edit `personalInfo` for name, headline, bio, social links, `resumeUrl`
- Edit `heroProof` for the Hero proof-strip numbers
- Edit `careerStats` / `careerPhases` / `domainExpertise` / `cloudMigration` for the /career page
- Edit `skills` array for technology skills (rendered as chips)
- Edit `projects` array for project showcase entries (title, description, longDescription, highlights)
- Edit `experiences` array for work history
A richer "where to edit what" table lives in `public/angga-task/README.md`.

## Working Conventions (Angga)
How Angga runs his projects — applies beyond this repo too:
- **GitFlow always** as the branching strategy: feature branch off `develop` → `develop` → `release` → `main`.
  - NOTE: this portfolio repo only has a `main` branch and is pushed to directly to trigger Vercel deploys. Confirm before applying full GitFlow here.
- **Product management:** Jira tickets for tracking, **Confluence as documentation**. Engineering commits should be traceable to a Jira ticket key.

## Constraints & Standing Rules
- **Never commit `screening-answer.md`** (repo root, personal notes). Keep it untracked.
- **`public/CV/` IS committed and pushed** so the CV downloads live at `/CV/Angga_Kersana_Munggaran_CV_2026.pdf` (CTA label: "Check out my resume", not literal "Download CV"). Old duplicate `CV(2).pdf` was deleted.
- **No em dashes `—` in visible paragraph/bullet copy** anywhere (homepage, `src/data/portfolio.ts`, `/career`) so text does not read as AI-written. Use colons, commas, or restructured sentences. En dashes only in year/date ranges. Metadata `<title>`/OG may keep em dashes.
- **Career numbers must stay verifiable** from primary sources (git history, Jira, Confluence/docs). Never invent figures.
- **Respond to Angga in Indonesian.**
- A human-readable context log lives at `public/angga-task/README.md` — keep it in sync when making structural or content changes.

## Pages
- `/` — Single-page site with all sections (Hero → ForYourBusiness → About → Skills → Projects → Experience → Contact)
- `/career` — Full auditable track record (stats, three career acts, cloud chapter, domain expertise, engineering practice)
