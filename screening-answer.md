# My Experience with JavaScript, TypeScript, NestJS, etc.

---

## 1. Saabic Umroh Apps (2016) — Ionic

My first professional experience with JavaScript was back in 2016 when I worked on **Saabic Umroh Apps** using **Ionic**. That's where I learned the fundamentals — how the browser lifecycle works, how JavaScript handles asynchronous operations, and how to use Promises to sync data.

We built a mobile app for pilgrims to manage their deposit and track what perks they got from their package. It also included daily routines like surah and doa for the pilgrimage. It was deployed and used by real clients, and that experience taught me how JavaScript actually works under the hood — not just writing code that happens to run.

---

## 2. EduDok — Laravel + jQuery SPA

After that, I joined **EduDok**, a medical service company, working on the backend with **Laravel**. We built a queue system for ticket triggering actions for hospital visits. On the frontend, I used Laravel to route into **jQuery-based SPA pages** with a CMS inside.

This system managed **23 clinics** under the **RSP Group (Rumah Sakit Padjajaran)**. This was my first real exposure to backend logic and how frontend and backend connect.

---

## 3. ASTRNT — Phase 1: Frontend (CRA + React)

Then I joined **ASTRNT**, and this is where my career really grew.

My first year was intensive frontend work on the **candidate experience platform** — helping users answer async interview questions, multiple choice questions, and free text questions. I used **Create React App (CRA)** and learned deeply about React lifecycle:

- componentDidMount, componentWillUnmount, shouldComponentUpdate — class-based approach
- Browser storage with localStorage
- State management with Redux: actions, reducers, dispatch, mapStateToProps
- Middleware: **Redux Thunk** and **Redux Saga** for handling side effects

### Key Achievement — Bundle Size Optimization

One of my proudest achievements that year: I managed to reduce the recruiter platform bundle size from **25MB to under 2MB** by moving static files to **Azure Blob Storage** and **AWS S3**. That was a huge win for page load time.

---

## 4. ASTRNT — Phase 2: Fullstack (Laravel + Modern FE)

After that, I transitioned to fullstack. On the backend, I worked with **Laravel 5.2** and learned about:

- Seeders & Migrations
- Laravel Queues
- Broadcast Events
- WebSocket integration
- Elasticsearch

I improved the frontend notification system to be realtime and added chat integration.

---

## 5. Kognisi ID (Kompas) — Nuxt.js / Vue

We also had a project with **Kompas** called **Kognisi ID**, which used **Nuxt.js (Vue)**. That's where I learned Vue and **Vuex**. The concepts are similar to React — store, state, mutations, actions, mapState, computed, commit, dispatch — just different naming. I also learned how to create plugins and initialize them in pages.

---

## 6. ASTRNT Dashboard v2 — Next.js 14+ / TypeScript

More recently, I built the **ASTRNT Dashboard v2** from the ground up using:

- **Next.js 14+ (App Router)** — server components, client components, layout system
- **TypeScript** — discriminated unions, template literal types, complex data models
- **shadcn/ui** — custom design system with role-based theming (TA/TM/ADM)
- **Prisma + MariaDB** — multi-tenant database schema
- **Redis** — caching, pub/sub for realtime notifications

Key features: AI-powered video interviews, automated candidate scoring, role-based dashboards for recruiters, complex data flows for job pipelines and candidate matching.

**Lesson learned:** Early on, I tried to build a generic component library before understanding the actual UI patterns we needed. I ended up rewriting it twice. Now I build for specific use cases first, then extract patterns once they repeat.

---

## 7. ShopeeMonitor Pro — NestJS + PostgreSQL + Redis + BullMQ

I built **ShopeeMonitor Pro** — a fullstack e-commerce monitoring system:

### Backend (NestJS)
- **Modular architecture** — 8 modules: Auth, Shops, Orders, Products, Profit, Notifications, Settings, Shared
- **BullMQ job queues** — 15-minute sync cycle pipeline: sync orders → calculate profit → send notifications
- **Error recovery** — partial retry without double-processing
- **JWT + Passport** authentication
- **Shopee OAuth 2.0** with HMAC-SHA256 signing
- **AES-256 encryption** for stored tokens

### Database (PostgreSQL + TypeORM)
- Multi-tenant schema design
- Complex aggregation queries with window functions
- Raw SQL for performance (4s → 80ms improvement)

### Background Jobs
1. **ShopeeSync Agent** — sync orders every 15 minutes
2. **ProfitCalc Agent** — calculate net profit per SKU (proportional deduction allocation)
3. **Notification Agent** — stock alerts and order notifications

### Frontend (React + Vite)
- **TanStack Query** for server state
- **Zustand** for client state
- **Recharts** for profit visualization

### Redis
- **BullMQ queue backend** — job state tracking, retry management
- **Cache** — profit summaries, API responses, user settings

---

## Portfolio & Source Code

- **GitHub:** https://github.com/anggakersanamunggaran
- **LinkedIn:** https://www.linkedin.com/in/angga-munggaran/
- **ShopeeMonitor Pro:** https://github.com/anggakersanamunggaran/ShopeeMonitor
- **ASTRNT Web Logger:** https://github.com/anggakersanamunggaran/astrnt-web-logger
- **Personal Portfolio:** https://github.com/anggakersanamunggaran/portfolio-angga
- **EZReturn:** https://gitlab.com/wildanvian/ezreturn_fe
- **ASTRNT Dashboard (live):** https://app-v2.astrnt.co
