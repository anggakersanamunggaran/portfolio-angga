export interface Project {
  id: string;
  title: string;
  kind: "work" | "side";
  /** True renders the card full-width across both grid columns */
  featured?: boolean;
  description: string;
  longDescription: string;
  image?: string;
  tags: string[];
  links?: {
    github?: string;
    gitlab?: string;
    live?: string;
    docs?: string;
  };
  highlights: string[];
  techStack: { name: string; category: string }[];
  year: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  current?: boolean;
  description: string;
  achievements: string[];
  techUsed: string[];
}

export interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface CareerStat {
  value: string;
  label: string;
  sub?: string;
}

export interface CareerPhase {
  period: string;
  act: string;
  summary: string;
  points: string[];
}

export interface DomainExpertise {
  area: string;
  blurb: string;
}

export interface CloudMigrationChapter {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
}

export const personalInfo = {
  name: "Angga Kersana Munggaran",
  shortName: "Angga",
  title: "Senior Full-Stack Engineer",
  tagline: "Product-minded engineer · 7+ years in HR technology",
  description:
    "Seven years in HR technology at ASTRNT (2019 – 2026) — principal contributor to the Laravel + React recruiter platform and candidate assessment apps, and the engineer who led their ground-up Next.js / TypeScript rebuild and wrote the product specifications that drove it. Open to senior full-stack and product-engineering roles.",
  location: "Indonesia",
  email: "anggakersana@gmail.com",
  whatsapp: "6281324230307",
  resumeUrl: "#",
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/anggakersanamunggaran",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/angga-munggaran/",
      icon: "linkedin",
    },
    { name: "Email", url: "mailto:anggakersana@gmail.com", icon: "mail" },
    { name: "WhatsApp", url: "https://wa.me/6281324230307", icon: "whatsapp" },
  ] as SocialLink[],
};

export const careerStats: CareerStat[] = [
  {
    value: "7+ yrs",
    label: "Years in HR technology",
    sub: "one domain, May 2019 – Aug 2026",
  },
  {
    value: "11,697",
    label: "Commits authored",
    sub: "across 35 repositories, deduplicated",
  },
  {
    value: "1,661",
    label: "Jira tickets held",
    sub: "93% completed · 335 reported by me",
  },
  {
    value: "88/88",
    label: "Months active",
    sub: "no dormant month in seven years",
  },
  {
    value: "2,114",
    label: "Hours logged",
    sub: "via Jira #time smart commits",
  },
  {
    value: "70",
    label: "Docs authored",
    sub: "Confluence pages + 48 co-edited",
  },
  {
    value: "49",
    label: "Product specs written",
    sub: "19 PRDs · 30 design use cases",
  },
  {
    value: "2.0",
    label: "Platform generations",
    sub: "Laravel/React → Next.js/TypeScript",
  },
];

export const careerPhases: CareerPhase[] = [
  {
    period: "2019 – 2021",
    act: "Act I · Depth",
    summary:
      "Joined as a Web Developer and was committing to production within weeks — on both sides of the product at once: the Laravel recruiter platform and the React candidate assessment app.",
    points: [
      "Became the principal contributor to the candidate assessment experience — interview session & timer engine, resumable video upload, camera/mic device testing, online proctoring and anti-cheat controls.",
      "Shipped five question engines (MCQ, RSQ, FTQ, document upload, media answer), the retake flow, and internationalisation across EN / ID / PT-BR with locale-aware pluralisation.",
      "The highest-intensity months of the whole tenure land in the first year — deep ownership of two core products from month one.",
    ],
  },
  {
    period: "2021 – 2024",
    act: "Act II · Breadth",
    summary:
      "From a single platform to a product family — plus a sideways move into data engineering that the company had never had in-house.",
    points: [
      "Executed a Laravel 5.4 → 5.8 and PHP 7.1 → 7.4 migration on the live revenue-generating monolith across parallel legacy/target branches — without freezing feature delivery.",
      "Helped turn one shared Laravel 8 + Nuxt 2 codebase into three white-labelled products: Kognisi, Popskul, and the CDC per-university career portals.",
      "Built the job-market data-acquisition capability from scratch — a scraping suite against LinkedIn, JobStreet, Prosple, GradConnection, Kalibrr, Disnaker and Talentic, feeding a common ingestion API.",
      "Shipped a Python/Flask service (VirusTotal scanning, Drive/YouTube transfer, Azure Speech pronunciation scoring) and client-facing landing pages for named enterprises including BCA, Deloitte, Gojek and Google.",
    ],
  },
  {
    period: "2025 – 2026",
    act: "Act III · Modernisation",
    summary:
      "Consolidation on the core, then a generational rebuild — executed by the same engineer who had maintained the legacy system for seven years.",
    points: [
      "Diagnosed and fixed a production performance crisis at 2,500 concurrent candidates — N+1 elimination, a database lock and index audit, and queue offloading.",
      "Led the ASTRNT 2.0 dashboard rebuild on Next.js 16 · React 19 · TypeScript 5 · Tailwind — with a dual-database live-migration architecture and explicit feature-parity tracking against V1.",
      "Authored the product specification layer for the rebuild: 19 PRDs, 30 design use cases, and the company-wide PRD template — work specified, then implemented, by the same person.",
      "Integrated AI scoring and matching (Anthropic, OpenAI, Gemini SDKs) and enforced engineering standards — mandatory Claude Code skill gates and a no-mock E2E policy.",
    ],
  },
];

export const domainExpertise: DomainExpertise[] = [
  {
    area: "Asynchronous video interviewing",
    blurb:
      "Recording, upload, playback and review pipelines that hold up on unknown devices and unreliable connections.",
  },
  {
    area: "Online proctoring & anti-cheat",
    blurb:
      "Camera proctoring, screen recording, copy/paste blocking, multi-tab detection and mobile lockout.",
  },
  {
    area: "Assessment & AI scoring",
    blurb:
      "Psychometric (VRA) assessments and AI-assisted scoring of video answers and English fluency.",
  },
  {
    area: "CV parsing & candidate matching",
    blurb:
      "Document ingestion and structured CV extraction — the pipeline that feeds the matching engine.",
  },
  {
    area: "ATS workflow",
    blurb:
      "Talent pools, hiring teams, reviewer assignment, comments and voting, change-request status.",
  },
  {
    area: "White-labelling & i18n",
    blurb:
      "Per-company branding and multi-tenant product families, localised across EN / ID / PT-BR.",
  },
  {
    area: "Legacy modernisation",
    blurb:
      "Running a migration track in parallel with live production for three years — then a ground-up rebuild.",
  },
  {
    area: "Job-market data",
    blurb:
      "Reverse-engineered scrapers and an ingestion API that opened a new capability area in-house.",
  },
];

export const cloudMigration: CloudMigrationChapter = {
  eyebrow: "Platform & infrastructure",
  title: "The cloud chapter — carrying the platform from AWS to Azure",
  intro:
    "Alongside the product work, I helped move ASTRNT's stack off AWS onto Azure across the public site, the candidate app and the recruiter backend — Azure DevOps hosting, per-environment builds and PM2 process management stood up for each web app, and storage, video and logging re-homed where Azure had no direct AWS equivalent.",
  bullets: [
    "Repo hosting and integration moved to Azure DevOps (dev.azure.com); the web apps shipped through a beta-az integration line that ran in parallel with the AWS environment.",
    "PM2 process management on the servers — public-live on :8080 and web-qna on :8081, each with an ecosystem.config.js and a pm2-reload deploy step.",
    "Per-environment builds per app — twin build-aws / build-azure scripts that switch every API and media host at build time from one codebase.",
    "Object storage and the video ingest/out pipeline moved onto Azure Blob Storage.",
    "The activity-log store was re-homed from AWS DynamoDB onto MongoDB, which the platform already ran — Azure has no managed DynamoDB equivalent.",
  ],
};

export const skills: Skill[] = [
  // Backend
  { name: "Laravel (5.3 → 8.x)", category: "Backend", level: 95 },
  { name: "PHP (5.6 → 8.x)", category: "Backend", level: 92 },
  { name: "REST API Design", category: "Backend", level: 92 },
  { name: "Queue Workers & Async", category: "Backend", level: 86 },
  { name: "OAuth2 / Passport", category: "Backend", level: 82 },
  { name: "Node.js / Express", category: "Backend", level: 76 },
  { name: "Python / Flask", category: "Backend", level: 70 },
  // Frontend
  { name: "React (16 → 19)", category: "Frontend", level: 93 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "Next.js App Router", category: "Frontend", level: 86 },
  { name: "Redux", category: "Frontend", level: 84 },
  { name: "Tailwind CSS", category: "Frontend", level: 86 },
  { name: "Vue 2 / Nuxt", category: "Frontend", level: 78 },
  { name: "Web Media APIs", category: "Frontend", level: 90 },
  { name: "Webpack / Bundlers", category: "Frontend", level: 78 },
  // Data & Storage
  { name: "MySQL", category: "Data & Storage", level: 92 },
  { name: "Query Optimization", category: "Data & Storage", level: 90 },
  { name: "Redis", category: "Data & Storage", level: 86 },
  { name: "MongoDB", category: "Data & Storage", level: 84 },
  { name: "Elasticsearch", category: "Data & Storage", level: 76 },
  { name: "Database Design", category: "Data & Storage", level: 88 },
  { name: "Prisma", category: "Data & Storage", level: 74 },
  // Cloud & DevOps
  { name: "AWS S3", category: "Cloud & DevOps", level: 86 },
  { name: "Azure Blob Storage", category: "Cloud & DevOps", level: 82 },
  { name: "Cloud Migration (AWS → Azure)", category: "Cloud & DevOps", level: 78 },
  { name: "Azure DevOps (Pipelines & Repos)", category: "Cloud & DevOps", level: 78 },
  { name: "PM2 Process Management", category: "Cloud & DevOps", level: 76 },
  { name: "Docker", category: "Cloud & DevOps", level: 78 },
  { name: "CI/CD Pipelines", category: "Cloud & DevOps", level: 80 },
  { name: "Sentry / Monitoring", category: "Cloud & DevOps", level: 76 },
  { name: "Deployment (Vercel, EB)", category: "Cloud & DevOps", level: 82 },
  // Platform & Integrations
  { name: "SAML 2.0 SSO", category: "Platform & Integrations", level: 84 },
  { name: "Payments (Midtrans, Stripe)", category: "Platform & Integrations", level: 82 },
  { name: "Video Delivery (JWPlayer, FFmpeg)", category: "Platform & Integrations", level: 86 },
  { name: "Web Scraping (Puppeteer)", category: "Platform & Integrations", level: 84 },
  { name: "AI SDKs (OpenAI, Anthropic, Gemini)", category: "Platform & Integrations", level: 80 },
  { name: "Localisation / i18n", category: "Platform & Integrations", level: 82 },
  { name: "PDF & Spreadsheet Processing", category: "Platform & Integrations", level: 78 },
];

export const projects: Project[] = [
  // ------------------------------------------------------------------
  // At ASTRNT — commercial work
  // ------------------------------------------------------------------
  {
    id: "astrnt-recruiter-platform",
    title: "ASTRNT Recruiter Platform",
    kind: "work",
    description:
      "The company's flagship recruiter platform — video interviews, assessments, talent pools and structured hiring workflows. Principal contributor for seven years.",
    longDescription:
      "ASTRNT's core product: a Laravel monolith with a React/Redux frontend, backed by MySQL, MongoDB, Elasticsearch and Redis, integrating AWS S3, Azure Blob, Stripe, Veritrans, SAML 2.0 SSO, FFmpeg, Google Cloud Speech and Tesseract. I helped build it from my first month and kept building it for seven straight years — roughly 5,260 commits. My largest concentrated body of work was the document/CV upload and extraction pipeline that later fed the AI matching engine, alongside ATS workflow, assessment management, white-labelling and internationalisation for the PT-BR market.",
    tags: ["Laravel", "PHP", "React", "MySQL", "MongoDB", "Elasticsearch"],
    links: {
      live: "https://app.astrnt.co",
    },
    highlights: [
      "Principal contributor across the full product lifecycle, May 2019 – Aug 2026",
      "Owned the document/CV upload & structured-extraction pipeline (the largest single workstream)",
      "Executed a live Laravel + PHP migration across three years of parallel branches",
      "ATS workflow: talent pools, hiring teams, reviewer assignment, comments & voting",
      "White-labelled per-client branding with EN / ID / PT-BR localisation",
    ],
    techStack: [
      { name: "Laravel", category: "Framework" },
      { name: "PHP", category: "Language" },
      { name: "React / Redux", category: "Frontend" },
      { name: "MySQL", category: "Database" },
      { name: "MongoDB", category: "Database" },
      { name: "Elasticsearch", category: "Search" },
      { name: "Redis", category: "Cache/Queue" },
      { name: "AWS S3", category: "Storage" },
      { name: "Azure Blob", category: "Storage" },
      { name: "SAML 2.0 SSO", category: "Integration" },
      { name: "Stripe / Veritrans", category: "Payments" },
      { name: "FFmpeg / Google Speech", category: "Media" },
    ],
    year: "2019 – 2026",
  },
  {
    id: "astrnt-candidate-app",
    title: "QNA — Candidate Assessment App",
    kind: "work",
    description:
      "The candidate-facing assessment experience: asynchronous video interviews, proctoring, and five question engines used by job applicants across the globe.",
    longDescription:
      "The part of the product actual job applicants use under time pressure, on unknown devices, over unreliable connections. I built and owned the interview session and timer engine, video recording with a resumable and quality-checked upload pipeline, camera/mic device testing, camera-based online proctoring (later screen recording), anti-cheat controls (copy/paste blocking, multi-tab detection, mobile lockout), five distinct question engines, the retake flow, and internationalisation across EN / ID / PT-BR. Cross-browser compatibility — Safari, Firefox, Edge, legacy Node — was a tracked discipline throughout. Later years added a Laravel 8 API service and fixes for a production load incident at 2,500 concurrent candidates.",
    tags: ["React", "Redux", "WebRTC", "Media API", "Laravel 8"],
    links: {
      live: "https://developers.astrnt.co/demo-web-sdk",
    },
    highlights: [
      "End-to-end asynchronous video interview session with resumable upload",
      "Camera-based proctoring + anti-cheat: multi-tab, copy/paste, mobile lockout",
      "Five question engines — MCQ, RSQ, FTQ, document upload, media answer",
      "~1,300 commits; the highest individual share of a 20-author codebase",
      "Fixed a production performance crisis at 2,500 concurrent candidates",
    ],
    techStack: [
      { name: "React", category: "Frontend" },
      { name: "Redux", category: "State" },
      { name: "Web Media APIs", category: "Media" },
      { name: "WebRTC", category: "Media" },
      { name: "Socket.IO", category: "Realtime" },
      { name: "Laravel 8 / API-QNA", category: "Backend" },
      { name: "MongoDB", category: "Database" },
      { name: "Elasticsearch", category: "Search" },
    ],
    year: "2019 – 2026",
  },
  {
    id: "astrnt-dashboard-v2",
    title: "ASTRNT Dashboard V2",
    kind: "work",
    description:
      "Ground-up rebuild of the recruiter dashboard — Next.js 16, React 19, TypeScript — replacing the seven-year-old Laravel/React platform.",
    longDescription:
      "Led the 2026 ground-up replacement of the recruiter dashboard on a modern stack, shipping roughly 690 commits in about six months across eighteen feature themes — onboarding, an import wizard, credits, the assessment builder, review and reporting, reminders, AI video-quality checks, CV Score and the matching engine. Three things make it more than a rewrite: a dual-database live-flip architecture allowing migration without a cutover outage, explicit feature-parity tracking against V1 so replacement was measurable, and enforced engineering standards (Claude Code skill gates and a no-mock E2E policy).",
    tags: ["Next.js", "React 19", "TypeScript", "Tailwind", "Prisma", "AI"],
    links: {
      live: "https://app-v2.astrnt.co",
    },
    highlights: [
      "~690 commits in six months; eighteen feature themes shipped",
      "Dual-database live-migration architecture — no cutover outage",
      "Feature-parity tracked against V1, not asserted",
      "AI CV scoring, job extraction & candidate–job matching",
      "Enforced no-mock E2E testing and Claude Code skill gates",
    ],
    techStack: [
      { name: "Next.js 16", category: "Framework" },
      { name: "React 19", category: "Frontend" },
      { name: "TypeScript 5", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "shadcn/ui", category: "UI Library" },
      { name: "Prisma", category: "ORM" },
      { name: "Redis", category: "Cache/Queue" },
      { name: "Anthropic / OpenAI / Gemini", category: "AI" },
      { name: "Cypress", category: "Testing" },
      { name: "Azure Pipelines", category: "CI/CD" },
    ],
    year: "2026",
  },
  {
    id: "astrnt-white-label-family",
    title: "White-label Product Family",
    kind: "work",
    description:
      "One shared Laravel 8 + Nuxt 2 codebase productised into three commercially distinct portals — Kognisi, Popskul and CDC.",
    longDescription:
      "A single shared codebase (all three Nuxt frontends still self-identify as \"marketplace\") forked into three products: Kognisi kept the certified-course-marketplace framing, Popskul pivoted to a fresh-graduate jobs board, and CDC became a white-labelled per-university career portal. I contributed across front and back end of all three over roughly 1,000 commits — including Midtrans payments, Laravel Socialite logins, and multi-tenant per-university branding. The shared lineage is verifiable: the CDC and Popskul backends share 1,083 identical commit SHAs; the frontends share 1,870.",
    tags: ["Laravel 8", "Nuxt 2", "Vue", "Multi-tenant", "Midtrans"],
    highlights: [
      "Three sellable products out of one maintained codebase",
      "CDC → white-labelled per-university career portals",
      "~1,000 commits across front and back end",
      "Midtrans payments, Socialite auth, per-tenant branding",
      "Shared lineage verifiable via identical commit SHAs",
    ],
    techStack: [
      { name: "Laravel 8", category: "Framework" },
      { name: "Nuxt 2", category: "Framework" },
      { name: "Vue 2", category: "Frontend" },
      { name: "MySQL", category: "Database" },
      { name: "MongoDB", category: "Database" },
      { name: "Midtrans", category: "Payments" },
      { name: "Laravel Socialite", category: "Integration" },
      { name: "Sentry", category: "Monitoring" },
    ],
    year: "2021 – 2025",
  },
  {
    id: "astrnt-public-web",
    title: "Public Web & Client Landing Pages",
    kind: "work",
    description:
      "The company's marketing site plus a landing-page system serving named enterprise clients under real brand expectations.",
    longDescription:
      "The marketing site (Express plus React SPAs) and a Laravel 5.8 + Vue 2 landing-page system that served named enterprise clients — BCA (with 18 university sub-pages), Deloitte, Gojek, Sephora, Google, Home Credit, KAI, Circles, Samudera, Star4Hire, Ristekdikti and TechHR. This was client-facing delivery under real brand expectations rather than internal tooling, spanning roughly 1,100 commits from 2019 to 2026.",
    tags: ["Express", "React", "Laravel", "Vue", "Sass"],
    links: {
      live: "https://astrnt.co",
    },
    highlights: [
      "Marketing site + per-client landing-page system, ~1,100 commits",
      "Enterprise clients: BCA, Deloitte, Gojek, Sephora, Google & more",
      "BCA alone spanned 18 university sub-pages",
      "Laravel 5.8 + Vue 2 with a reusable page-building system",
    ],
    techStack: [
      { name: "Express", category: "Backend" },
      { name: "React", category: "Frontend" },
      { name: "Laravel", category: "Framework" },
      { name: "Vue 2", category: "Frontend" },
      { name: "Sass", category: "Styling" },
      { name: "AWS S3", category: "Storage" },
    ],
    year: "2019 – 2026",
  },
  {
    id: "astrnt-job-scraping",
    title: "Job-market Data Acquisition",
    kind: "work",
    description:
      "A scraping suite that opened a new capability area in-house — feeding job-market data into ASTRNT's talent pool.",
    longDescription:
      "Seven Puppeteer/axios scrapers built from late 2023 through 2024, targeting LinkedIn, Prosple, GradConnection, JobStreet, Disnaker, Kalibrr and Talentic — all feeding a common insert_job_scraping ingestion API. Each required its own reverse-engineering: decoding LinkedIn's redirect scheme, reverse-engineering Prosple's GraphQL API, resolving Disnaker's multi-hop URLs. A Python/Flask service (`python-check-link`) added VirusTotal link/file safety scanning, Google Drive and YouTube transfer to Azure, and Azure Speech pronunciation scoring — a deliberate second-language capability the company had never had in his hands.",
    tags: ["Puppeteer", "Python", "Flask", "Data Engineering"],
    highlights: [
      "Reverse-engineered scrapers against seven job boards",
      "Common ingestion API feeding ASTRNT's talent data",
      "Python/Flask service: VirusTotal, Drive/YouTube transfer, Azure Speech scoring",
      "A new capability area opened deliberately with low-risk tools",
    ],
    techStack: [
      { name: "Puppeteer", category: "Scraping" },
      { name: "axios", category: "HTTP" },
      { name: "Python", category: "Language" },
      { name: "Flask", category: "Framework" },
      { name: "Azure Speech", category: "AI" },
      { name: "VirusTotal API", category: "Security" },
    ],
    year: "2023 – 2025",
  },
  {
    id: "astrnt-cloud-migration",
    title: "Cloud Migration — AWS → Azure",
    kind: "work",
    featured: true,
    description:
      "The engineering behind ASTRNT's move off AWS onto Azure — Azure DevOps hosting, per-environment build pipelines, PM2 process management on the servers, and storage, video and logging re-homed where Azure had no direct equivalent.",
    longDescription:
      "When the platform moved off AWS, every web app had to be re-homed and re-served. I set up the server-side process management and per-environment builds across the product family — public-web, qna-web and the recruiter backend. The Git remotes and integration moved to Azure DevOps (dev.azure.com), each app shipping through a beta-az line that ran in parallel with the AWS environment. public-web and qna-web run under PM2 as public-live and web-qna, each with its own ecosystem.config.js and a pm2-reload deploy step, and each carries twin build scripts — build-aws and build-azure — so a single codebase builds against whichever environment's hosts it is pointed at. Object storage and the video ingest/out pipeline moved onto Azure Blob Storage, and the activity-log store was re-homed from AWS DynamoDB onto MongoDB — which the platform already ran — because Azure offers no managed equivalent to DynamoDB.",
    tags: ["Azure", "DevOps", "PM2", "Node.js", "React", "Laravel"],
    highlights: [
      "PM2 ecosystem.config.js for public-live (:8080) and web-qna (:8081) with pm2-reload deploys",
      "Twin build-aws / build-azure pipelines per app — environment hosts switched at build time",
      "Git remotes and CI onto Azure DevOps with a beta-az integration line",
      "Storage and the video pipeline onto Azure Blob; activity log re-homed from DynamoDB to MongoDB",
    ],
    techStack: [
      { name: "Azure DevOps", category: "CI/CD" },
      { name: "PM2", category: "Process Manager" },
      { name: "Azure Blob Storage", category: "Storage" },
      { name: "MongoDB", category: "Database" },
      { name: "DynamoDB (AWS)", category: "Legacy" },
      { name: "Node.js / Express", category: "Backend" },
      { name: "React", category: "Frontend" },
      { name: "Laravel / PHP", category: "Backend" },
    ],
    year: "2020",
  },

  // ------------------------------------------------------------------
  // Side projects & experiments
  // ------------------------------------------------------------------
  {
    id: "shopeemonitor",
    title: "ShopeeMonitor Pro",
    kind: "side",
    description:
      "E-commerce monitoring for Shopee merchants — automated net-profit per SKU from the Escrow API, with a multi-shop dashboard.",
    longDescription:
      "Built from concept to deployment a full-stack monitoring platform that helps Shopee merchants automatically calculate net profit per SKU by extracting detailed deduction data from Shopee Escrow API. Multi-shop OAuth integration, 15-minute sync cycles via BullMQ, profit analytics with Recharts, real-time stock alerts. Saves merchants 1–2 hours of manual Excel work daily.",
    tags: ["NestJS", "React", "PostgreSQL", "Redis", "BullMQ", "Shopee API"],
    links: {
      github: "https://github.com/anggakersanamunggaran/ShopeeMonitor",
    },
    highlights: [
      "Automated net-profit per SKU from Shopee Escrow API",
      "Multi-shop OAuth 2.0 with AES-256 encrypted token storage",
      "BullMQ pipeline: sync → profit calc → notifications",
      "Proportional deduction allocation for multi-SKU orders",
    ],
    techStack: [
      { name: "NestJS", category: "Backend" },
      { name: "React", category: "Frontend" },
      { name: "PostgreSQL", category: "Database" },
      { name: "Redis", category: "Cache/Queue" },
      { name: "BullMQ", category: "Job Queue" },
      { name: "TanStack Query", category: "State" },
      { name: "Recharts", category: "Visualization" },
      { name: "Docker", category: "Infrastructure" },
    ],
    year: "2026",
  },
  {
    id: "ezreturn-fe",
    title: "EZReturn — Return Management",
    kind: "side",
    description:
      "E-commerce return-management frontend for processing and tracking product returns across marketplaces.",
    longDescription:
      "Frontend for a return-management system that streamlines the product-return process for e-commerce operations — return request management with multi-step workflows, status tracking and real-time updates.",
    tags: ["React", "TypeScript", "Tailwind CSS", "E-commerce"],
    links: {
      gitlab: "https://gitlab.com/wildanvian/ezreturn_fe",
    },
    highlights: [
      "Multi-step return request workflows",
      "Status tracking and real-time updates",
      "Clean component architecture in React + TypeScript",
    ],
    techStack: [
      { name: "React", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
    ],
    year: "2025",
  },
  {
    id: "astrnt-web-logger",
    title: "astrnt-web-logger",
    kind: "side",
    description:
      "Lightweight browser event-tracking library for capturing user interactions with configurable environments.",
    longDescription:
      "A lightweight JavaScript library for tracking web events across the ASTRNT ecosystem — capturing candidate and recruiter interactions during video interviews and assessments. Webpack + Babel for cross-browser compatibility, promise-based async recording, and support for beta/staging/production environments.",
    tags: ["JavaScript", "Webpack", "Analytics"],
    links: {
      github: "https://github.com/anggakersanamunggaran/astrnt-web-logger",
    },
    highlights: [
      "Cross-browser event tracking with configurable environments",
      "Promise-based async recording with error handling",
      "Optimised bundle via Webpack + UglifyJS",
    ],
    techStack: [
      { name: "JavaScript (ES6+)", category: "Language" },
      { name: "Webpack", category: "Bundler" },
      { name: "Babel", category: "Transpiler" },
    ],
    year: "2025",
  },
];

export const experiences: Experience[] = [
  {
    id: "astrnt-phase-2",
    role: "Senior Full-Stack Engineer · Product & Platform",
    company: "ASTRNT (Astronaut Technologies)",
    companyUrl: "https://astrnt.co",
    location: "Indonesia",
    startDate: "Jan 2025",
    endDate: "Aug 2026",
    description:
      "Led the modernisation of the company's flagship product while specifying the work that drove it — owning the ASTRNT 2.0 dashboard rebuild on a modern stack and the product specification layer behind it.",
    achievements: [
      "Led the ground-up Dashboard V2 rebuild (Next.js 16 / React 19 / TypeScript), including a dual-database live-migration architecture and feature-parity tracking against V1",
      "Authored the product specification layer for the rebuild — 19 PRDs, 30 design use cases and the company-wide PRD template",
      "Diagnosed and fixed a production performance crisis at 2,500 concurrent candidates (N+1 elimination, index & lock audit, queue offloading)",
      "Delivered AI-assisted assessment scoring and integrated Anthropic, OpenAI & Gemini SDKs for CV scoring and candidate–job matching",
      "Enforced engineering standards — Claude Code skill gates and a no-mock E2E testing policy",
      "Continued shipping maintenance to the legacy platform while the replacement was built",
    ],
    techUsed: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "Redis",
      "OpenAI / Anthropic / Gemini",
      "Cypress",
    ],
  },
  {
    id: "astrnt-phase-1",
    role: "Full-Stack Engineer · Recruiter Platform & Candidate App",
    company: "ASTRNT (Astronaut Technologies)",
    companyUrl: "https://astrnt.co",
    location: "Indonesia",
    startDate: "May 2019",
    endDate: "Dec 2024",
    description:
      "Principal contributor building and sustaining ASTRNT's two core products — the Laravel recruiter platform and the React candidate assessment app — before expanding across a product family and into data engineering.",
    achievements: [
      "Helped build and sustain the flagship recruiter platform for the full period — roughly 5,260 commits as one of its principal contributors",
      "Owned the candidate assessment experience end to end: video interviewing, online proctoring, anti-cheat controls, five question engines, retake flow and EN/ID/PT-BR localisation",
      "Owned the document/CV upload and structured-extraction pipeline that later fed the AI matching engine",
      "Executed a Laravel 5.4 → 5.8 and PHP 7.1 → 7.4 migration on the live monolith across parallel branches",
      "Productised one shared codebase into three white-labelled products — Kognisi, Popskul, CDC career portals",
      "Opened the job-market data-acquisition capability — a seven-site scraping suite plus a Python/Flask service",
      "Helped carry the platform from AWS to Azure — Azure DevOps hosting, per-environment build-aws / build-azure pipelines, PM2 process management, and the activity-log store re-homed from DynamoDB onto MongoDB",
    ],
    techUsed: [
      "Laravel",
      "PHP",
      "React",
      "Redux",
      "Vue / Nuxt",
      "MySQL",
      "MongoDB",
      "Elasticsearch",
      "Redis",
      "AWS S3",
      "Azure Blob",
      "Azure DevOps",
      "PM2",
      "Puppeteer",
    ],
  },
  {
    id: "shopeemonitor",
    role: "Creator & Full-Stack Developer (side project)",
    company: "ShopeeMonitor Pro",
    companyUrl: "https://github.com/anggakersanamunggaran/ShopeeMonitor",
    location: "Indonesia",
    startDate: "Feb 2026",
    endDate: "Present",
    current: true,
    description:
      "Designed and built a monitoring platform from the ground up — concept, architecture, backend, frontend and deployment — for Shopee merchants.",
    achievements: [
      "Designed system architecture and multi-tenant database schema for e-commerce monitoring",
      "Implemented Shopee Open API v2 with OAuth 2.0 and HMAC-SHA256 signing",
      "Built a BullMQ background-job pipeline for 15-minute automated sync cycles",
      "Created a net-profit engine with proportional deduction allocation",
    ],
    techUsed: ["NestJS", "React", "PostgreSQL", "Redis", "BullMQ", "Shopee API"],
  },
];
