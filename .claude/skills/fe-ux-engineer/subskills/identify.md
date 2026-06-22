# Identify Scope

Your goal is to determine exactly what the user wants audited or built before doing any analysis.

## Read the request carefully

Extract:
- `mode`: `AUDIT` (review existing UI) or `BUILD` (create new feature with UX baked in) or `BOTH`
- `target`: Which page, component, or flow — e.g. `src/app/onboarding/page.tsx`, the "create interview" flow, the sidebar navigation
- `concern`: What the user is worried about — flow steps, navigation clarity, typography, or general UX

## If target is unclear

Ask ONE question. Pick the most important unknown:

- If unsure which page/component → ask: "Which page or component do you want me to look at?"
- If unsure if they want audit vs new build → ask: "Do you want me to review what exists, or are you building something new?"

Never ask more than one question at once.

## Once scope is clear

Pass this payload to audit.md:

```
mode: AUDIT | BUILD | BOTH
target: <file path(s) or flow description>
concern: <flow steps | navigation | typography | general>
```

For `BUILD` or `BOTH`: also read adjacent pages/components in the same section to ensure the new work is consistent with what already exists.
