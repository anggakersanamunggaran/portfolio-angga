# Angga Kersana Munggaran — Portfolio Website

This is a modern portfolio website built with Next.js 16 (App Router) and Tailwind CSS v4.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@theme` directives in CSS)
- **Icons:** lucide-react
- **Deploy:** Vercel

## Project Structure
```
src/
├── app/                    # App Router pages
│   ├── globals.css         # Global styles + Tailwind v4 theme tokens
│   ├── layout.tsx          # Root layout (Navbar, Footer, metadata)
│   └── page.tsx            # Homepage (all sections)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navigation with mobile menu
│   │   └── Footer.tsx      # Footer with social links
│   └── sections/
│       ├── Hero.tsx        # Landing hero section
│       ├── About.tsx       # About me + quick facts
│       ├── Skills.tsx      # Skills with category tabs + progress bars
│       ├── Projects.tsx    # Project cards + detail modal
│       ├── Experience.tsx  # Work experience timeline
│       └── Contact.tsx     # Contact cards + email CTA
├── data/
│   └── portfolio.ts        # All portfolio data (projects, skills, experience)
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
- Edit `personalInfo` for name, bio, social links
- Edit `skills` array for technology skills
- Edit `projects` array for project showcase entries
- Edit `experiences` array for work history

## Pages
- `/` — Single-page site with all sections (Hero → About → Skills → Projects → Experience → Contact)
