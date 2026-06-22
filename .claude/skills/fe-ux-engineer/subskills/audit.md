# UX Audit

**Note:** The consistency check (design tokens, component patterns) is in `consistency.md` and runs before this file. This file covers the three UX-quality audits: flow steps, navigation clarity, and typography.

Run all three audits below on the target files. Report findings as a numbered list grouped by category, each with `file:line` reference and a one-line fix suggestion. Then pass all findings (including consistency findings from `consistency.md`) to `implement.md`.

---

## Audit 1 — Flow Steps

**Goal:** Count the user actions required to complete the primary task on this page/flow. Flag anything > 3 steps for a single-purpose flow, or > 5 steps for a multi-stage flow.

### What to count as a "step"

A step is any required user action:
- Clicking a button that does not immediately complete the task (e.g. "Next", "Continue", modal open)
- Filling in a form field that is not auto-filled or defaulted
- Making a choice between options when a smart default could be used instead
- A confirmation dialog before a non-destructive action

### Rules

| Signal | Issue | Fix Direction |
|--------|-------|---------------|
| Confirmation dialog on non-destructive action | Unnecessary friction | Remove dialog, provide inline undo instead |
| Step exists only to collect data already available | Redundant step | Pre-fill from session/profile or skip the step |
| Two consecutive steps that always go together | Split unnecessarily | Merge into one step |
| "Review" screen before a low-stakes submit | Over-cautious flow | Remove review screen, show summary inline |
| User must navigate away and come back | Broken flow context | Bring the dependency into the same screen |
| Empty state has no clear primary CTA | Dead end | Add one clear action that gets the user started |
| Wizard has more than 4 steps | Too long | Collapse steps or use progressive disclosure |
| Modal contains a multi-step sub-flow | Wrong pattern | Modal is for single actions; use a page or drawer for multi-step |

### Output format

```
[FLOW] Step count: N (target: ≤3 for single task)
[FLOW-1] file:line — <what the step is> → <how to reduce/remove>
```

---

## Audit 2 — Navigation Clarity

**Goal:** Check that every navigation element is immediately understandable and the user always knows where they are and how to go back.

### Checks to run

**Labels**
- [ ] Nav items use noun or verb+noun labels ("Settings", "Create Interview") — not just verbs ("Create") or vague nouns ("Items")
- [ ] Icon-only nav items have a visible label or accessible tooltip
- [ ] Destructive nav items (Delete, Logout) are visually separated from normal items

**Active / current state**
- [ ] Current page/section is visually highlighted — must use BOTH a color change AND a font-weight or indicator, not color alone
- [ ] Active state is implemented in code (not just in design); check `className` logic for conditional active classes

**Back navigation**
- [ ] User can always get back — a back button, breadcrumb, or clear parent link is visible
- [ ] Back button does not navigate to an unexpected place (e.g. logs user out, resets form state)
- [ ] Modal/drawer always has a close affordance (X button or backdrop click)

**Hierarchy**
- [ ] Primary nav (what the app does) is visually dominant
- [ ] Secondary nav (settings, profile, support) is subordinate — smaller, lower contrast, or placed away from primary
- [ ] No more than 7 top-level nav items; if > 7, group into a dropdown/section

**Consistency**
- [ ] Navigation is in the same position on every page (not moved or hidden on specific routes)
- [ ] Nav item order never changes between pages

### Output format

```
[NAV-1] file:line — <what is wrong> → <what it should be>
```

---

## Audit 3 — Typography

**Goal:** Verify the font scale, weight hierarchy, and line-height follow a clear, readable system.

### Required type scale (Tailwind)

| Role | Size class | Weight class | Line-height |
|------|------------|--------------|-------------|
| Page title / H1 | `text-2xl` – `text-3xl` (24–30px) | `font-bold` (700) | `leading-tight` |
| Section heading / H2 | `text-xl` (20px) | `font-semibold` (600) | `leading-snug` |
| Subsection / H3 | `text-lg` (18px) | `font-semibold` (600) | `leading-snug` |
| Body text | `text-sm` – `text-base` (14–16px) | `font-normal` (400) | `leading-relaxed` |
| Label / form label | `text-sm` (14px) | `font-medium` (500) | `leading-none` – `leading-tight` |
| Caption / helper text | `text-xs` (12px) | `font-normal` (400) | `leading-normal` |
| Button text | `text-sm` – `text-base` | `font-medium` (500) | — |

### Rules

| Signal | Issue | Fix |
|--------|-------|-----|
| `text-xs` used for body/paragraph content | Too small to read comfortably | Upgrade to `text-sm` minimum |
| Two adjacent headings with no size difference | No hierarchy | Increase size gap by at least one step |
| `font-bold` on body paragraph text | Visual noise | Use `font-normal`; bold is for headings and callouts only |
| `font-normal` on a heading | Weak hierarchy | Use `font-semibold` or `font-bold` |
| Missing `leading-*` on multi-line text | Default line-height (1.2) too tight for reading | Add `leading-relaxed` or `leading-normal` |
| Color used as the only differentiator between heading levels | Relies on color | Add size or weight difference |
| All text on a page the same size | No hierarchy | Apply the scale above |
| `text-[13px]` or arbitrary sizes | Off-scale | Round to nearest Tailwind step |
| Muted text using `text-gray-300` on white | Contrast too low | Use `text-gray-500` minimum on white bg |
| Muted text using `text-gray-600` on dark bg | Contrast too low | Use `text-gray-300` minimum on dark bg |

### Contrast minimums

- Body text on white/light bg: `text-gray-800` or darker (≥ 4.5:1)
- Muted/secondary text: `text-gray-500` minimum on white (3:1+)
- Disabled text: `text-gray-400` (clearly muted, not primary)

### Output format

```
[TYPE-1] file:line — <what is wrong: e.g. "body paragraph uses text-xs"> → <fix: e.g. "change to text-sm leading-relaxed">
```

---

## Audit Summary

After running all audits (consistency + these three), produce a combined summary:

```
AUDIT SUMMARY
─────────────────────────────────────
Consistency issues: N  (token drift, wrong components)
Flow issues:        N  (N critical)
Navigation issues:  N
Typography issues:  N
─────────────────────────────────────
Top 3 to fix first:
1. [highest impact issue]
2. ...
3. ...
```

Then pass all findings to implement.md.
