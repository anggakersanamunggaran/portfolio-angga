---
name: fe-ux-engineer
description: "ALWAYS USE for any UI/frontend work in this codebase. Triggers on: building a page, component, or feature with any UI surface; creating or editing .tsx files in src/app or src/components; implementing designs from Figma; adding buttons, forms, modals, tables, cards, nav, sidebars, drawers, tabs, badges, inputs, selects, or any visual element; reviewing or improving UX flow; auditing navigation clarity, typography, or visual hierarchy; 'create', 'build', 'add', 'implement', 'refactor', 'fix', 'update' + any UI noun; 'simplify flow', 'too many steps', 'feels confusing', 'not intuitive', 'review UX', 'check fonts', 'bad navigation', 'improve experience'. Enforces: ASTRNT design token consistency (navy-*, neutral-*, brand-* Tailwind tokens — never raw hex), shadcn/ui component usage, typography scale, navigation clarity, and minimal-step flows. Produces file:line audit findings and applies fixes."
model: inherit
background: false
allowed-tools: Read, Edit, Write, Bash
---

# FE UX Engineer

**This skill is MANDATORY for any task that touches UI.** It runs automatically whenever an engineer builds, modifies, or reviews any component, page, or visual feature.

**Use this skill when:**
- Building or editing any `.tsx` file in `src/app/` or `src/components/`
- Adding or modifying any visual element: button, form, modal, table, card, nav, sidebar, badge, input, tab, drawer, sheet, skeleton, toast
- Implementing a Figma design
- Reviewing or improving any user flow, navigation, or UX
- User says "build", "create", "add", "implement", "fix", "update" for anything with a UI surface
- User says "simplify", "too many steps", "confusing", "not intuitive", "review UX", "bad navigation", "check fonts"

**Do NOT use this skill when:**
- The task has zero UI surface: pure API route, server action, database query, migration, or utility function with no component changes
- The user explicitly says to skip UX review

---

## Mandatory Flow (do not skip steps)

1. **Identify scope** — Read [./subskills/identify.md](./subskills/identify.md)
2. **Consistency check** — Read [./subskills/consistency.md](./subskills/consistency.md) — always run before writing any new code
3. **Audit** — Read [./subskills/audit.md](./subskills/audit.md) — flow steps, navigation, typography
4. **Implement** — Read [./subskills/implement.md](./subskills/implement.md)

For **new builds**: run consistency check (step 2) first to understand what patterns already exist, then implement with those patterns from the start — skip the audit report and go straight to implementation.

For **reviews / fixes**: run the full audit (steps 2–3), produce findings, then implement.

## Stack Context

This skill operates in the ASTRNT Dashboard v2 codebase:
- **Framework:** Next.js 14 App Router (App dir, Server/Client components)
- **Styling:** Tailwind CSS — with ASTRNT custom tokens in `tailwind.config.ts`
- **Components:** shadcn/ui (`src/components/ui/`) + custom components in `src/components/`
- **Icons:** lucide-react exclusively — no other icon libraries
- **Auth:** sessionStorage `auth_user`
- **Token reference:** always read `tailwind.config.ts` before writing color/spacing/radius classes
