export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  tags: string[];
  links: {
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

export const personalInfo = {
  name: "Angga Kersana Munggaran",
  shortName: "Angga",
  title: "Full-Stack Engineer",
  tagline: "building for the web, for people",
  description:
    "Full-stack engineer with deep experience building AI-powered hiring platforms, e-commerce monitoring systems, and developer tools. I specialize in Next.js, React, Node.js, and Cloud Infrastructure, with a passion for crafting clean, scalable, and user-centric applications.",
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

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "Frontend", level: 95 },
  { name: "Next.js", category: "Frontend", level: 92 },
  { name: "TypeScript", category: "Frontend", level: 90 },
  { name: "Tailwind CSS", category: "Frontend", level: 92 },
  { name: "shadcn/ui", category: "Frontend", level: 88 },
  { name: "TanStack Query", category: "Frontend", level: 85 },
  { name: "Zustand", category: "Frontend", level: 82 },
  { name: "Recharts", category: "Frontend", level: 75 },
  { name: "Vite", category: "Frontend", level: 85 },
  // Backend
  { name: "NestJS", category: "Backend", level: 85 },
  { name: "Node.js", category: "Backend", level: 88 },
  { name: "PostgreSQL", category: "Backend", level: 85 },
  { name: "Redis", category: "Backend", level: 78 },
  { name: "BullMQ", category: "Backend", level: 75 },
  { name: "Prisma", category: "Backend", level: 82 },
  { name: "TypeORM", category: "Backend", level: 80 },
  { name: "REST API", category: "Backend", level: 90 },
  // AI/ML
  { name: "OpenAI API", category: "AI & ML", level: 82 },
  { name: "Anthropic API", category: "AI & ML", level: 85 },
  { name: "Google AI", category: "AI & ML", level: 75 },
  { name: "AI Agents", category: "AI & ML", level: 80 },
  { name: "Prompt Engineering", category: "AI & ML", level: 85 },
  // DevOps & Tools
  { name: "Docker", category: "DevOps", level: 80 },
  { name: "GitHub Actions", category: "DevOps", level: 75 },
  { name: "Azure Pipelines", category: "DevOps", level: 70 },
  { name: "Vercel", category: "DevOps", level: 85 },
  { name: "Cypress", category: "Testing", level: 82 },
  { name: "Vitest", category: "Testing", level: 78 },
  { name: "Playwright", category: "Testing", level: 70 },
];

export const projects: Project[] = [
  {
    id: "astrnt-dashboard",
    title: "ASTRNT Dashboard v2",
    description:
      "AI-powered hiring & assessment platform — video interviews, automated evaluations, and structured hiring workflows at scale.",
    longDescription:
      "Built the next-generation dashboard for ASTRNT, an end-to-end hiring platform serving thousands of recruiters. The platform features AI-driven candidate assessments, video interviews with automated scoring, structured hiring pipelines, and real-time collaboration tools. Architected the frontend with Next.js App Router, implemented a comprehensive design system with shadcn/ui, and built complex data flows for candidate matching, interview scheduling, and reporting.",
    tags: ["Next.js", "React", "shadcn/ui", "Prisma", "PostgreSQL", "AI"],
    links: {
      live: "https://app-v2.astrnt.co",
    },
    highlights: [
      "AI-powered video interview & auto-scoring system",
      "Comprehensive design system with role-based theming (TA/TM/ADM)",
      "Complex data pipelines for candidate matching & job recommendation",
      "Real-time collaboration & multi-tenant architecture",
      "Cypress E2E testing suite & CI/CD with Azure Pipelines",
    ],
    techStack: [
      { name: "Next.js 16", category: "Framework" },
      { name: "React 19", category: "Frontend" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "shadcn/ui", category: "UI Library" },
      { name: "Prisma", category: "ORM" },
      { name: "MariaDB", category: "Database" },
      { name: "Redis", category: "Cache" },
      { name: "OpenAI / Anthropic", category: "AI" },
      { name: "Google Gemini", category: "AI" },
      { name: "Cypress", category: "Testing" },
      { name: "Sentry", category: "Monitoring" },
      { name: "Azure Pipelines", category: "CI/CD" },
    ],
    year: "2025–2026",
  },
  {
    id: "shopeemonitor",
    title: "ShopeeMonitor Pro",
    description:
      "E-commerce monitoring system for Shopee merchants with automated net profit calculation per SKU and multi-shop unified dashboard.",
    longDescription:
      "Built from concept to deployment a full-stack monitoring platform that helps Shopee merchants automatically calculate net profit per SKU by extracting detailed deduction data from Shopee Escrow API. Features multi-shop OAuth integration, automated 15-minute sync cycles via BullMQ background jobs, profit analytics with Recharts visualization, real-time stock alerts, and a comprehensive dashboard. The system saves merchants 1-2 hours of manual Excel work daily.",
    tags: ["NestJS", "React", "PostgreSQL", "Redis", "BullMQ", "Shopee API"],
    links: {
      github: "https://github.com/anggakersanamunggaran/ShopeeMonitor",
    },
    highlights: [
      "Automated net profit calculation per SKU from Shopee Escrow API",
      "Multi-shop OAuth 2.0 integration with AES-256 encrypted token storage",
      "BullMQ background job pipeline: sync → profit calc → notifications",
      "Real-time profit dashboard with Recharts visualizations",
      "Proportional deduction allocation for multi-SKU orders",
    ],
    techStack: [
      { name: "NestJS", category: "Backend" },
      { name: "React 18", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "PostgreSQL 15", category: "Database" },
      { name: "Redis 7", category: "Cache/Queue" },
      { name: "BullMQ", category: "Job Queue" },
      { name: "TanStack Query", category: "State" },
      { name: "Zustand", category: "State" },
      { name: "Recharts", category: "Visualization" },
      { name: "Tailwind CSS", category: "Styling" },
      { name: "Shopee Open API v2", category: "Integration" },
      { name: "Docker", category: "Infrastructure" },
    ],
    year: "2026",
  },
  {
    id: "astrnt-web-logger",
    title: "ASTRNT Web Logger",
    description:
      "Lightweight browser event tracking library for capturing user interactions and application events with configurable environments.",
    longDescription:
      "Developed a lightweight JavaScript library for tracking web events in the ASTRNT ecosystem. The library captures candidate and recruiter interactions during video interviews and assessment processes, providing valuable analytics data. Built with Webpack and Babel for cross-browser compatibility, supporting multiple deployment environments (beta, staging, production) with async promise-based event recording.",
    tags: ["JavaScript", "Webpack", "Babel", "Event Tracking", "Analytics"],
    links: {
      github: "https://github.com/anggakersanamunggaran/astrnt-web-logger",
    },
    highlights: [
      "Cross-browser event tracking with configurable environments",
      "Promise-based async recording with error handling",
      "Lightweight bundle optimized with Webpack + UglifyJS",
      "Integration with interview lifecycle events",
    ],
    techStack: [
      { name: "JavaScript (ES6+)", category: "Language" },
      { name: "Webpack 4", category: "Bundler" },
      { name: "Babel", category: "Transpiler" },
      { name: "Lodash", category: "Utility" },
    ],
    year: "2025",
  },
  {
    id: "ezreturn-fe",
    title: "EZReturn — Return Management",
    description:
      "E-commerce return management frontend for processing and tracking product returns across multiple marketplaces.",
    longDescription:
      "Built the frontend application for EZReturn, a return management system that streamlines the product return process for e-commerce operations. The platform handles return requests, tracking, and resolution workflows with efficient status management and customer communication.",
    tags: ["React", "TypeScript", "Tailwind CSS", "E-commerce"],
    links: {
      gitlab: "https://gitlab.com/wildanvian/ezreturn_fe",
    },
    highlights: [
      "Return request management with multi-step workflows",
      "Status tracking and real-time updates",
      "Integration with e-commerce platforms",
    ],
    techStack: [
      { name: "React", category: "Frontend" },
      { name: "TypeScript", category: "Language" },
      { name: "Tailwind CSS", category: "Styling" },
    ],
    year: "2025",
  },
];

export const experiences: Experience[] = [
  {
    id: "astrnt",
    role: "Full-Stack Engineer",
    company: "ASTRNT (Astronaut Technologies)",
    companyUrl: "https://astrnt.co",
    location: "Indonesia",
    startDate: "Jan 2025",
    endDate: "Present",
    description:
      "Building and maintaining the next-generation AI-powered hiring platform. Working across the full stack — from complex UI components and design systems to database architecture and AI integration.",
    achievements: [
      "Architected the Next.js v2 dashboard with shadcn/ui design system serving 10K+ users",
      "Built AI-powered candidate assessment and video interview scoring system",
      "Implemented complex data pipelines for role-candidate matching using ML models",
      "Designed multi-tenant database schema with role-based access (TA/TM/ADM)",
      "Established CI/CD pipelines with Cypress E2E testing and Azure DevOps",
      "Integrated multiple AI providers (OpenAI, Anthropic, Google Gemini) for platform features",
      "Built real-time notification system with Redis pub/sub",
    ],
    techUsed: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "MariaDB",
      "Redis",
      "OpenAI",
      "Anthropic",
      "Cypress",
      "Azure",
    ],
  },
  {
    id: "shopeemonitor",
    role: "Full-Stack Developer (Project)",
    company: "ShopeeMonitor Pro",
    companyUrl: "https://github.com/anggakersanamunggaran/ShopeeMonitor",
    location: "Indonesia",
    startDate: "Feb 2026",
    endDate: "Present",
    description:
      "Designed and built a comprehensive e-commerce monitoring platform from the ground up — concept, architecture, backend, frontend, and deployment.",
    achievements: [
      "Designed system architecture and database schema for multi-tenant e-commerce monitoring",
      "Implemented Shopee Open API v2 integration with OAuth 2.0 and HMAC-SHA256 signing",
      "Built BullMQ background job pipeline for automated 15-minute data sync cycles",
      "Created net profit calculation engine with proportional deduction allocation",
      "Developed React dashboard with real-time profit analytics and stock alerts",
      "Set up Docker Compose for local development with PostgreSQL + Redis",
    ],
    techUsed: [
      "NestJS",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Shopee API",
      "Docker",
    ],
  },
];
