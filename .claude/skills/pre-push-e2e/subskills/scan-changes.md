# Scan Changes

Understand what was built by reading the git diff and the changed source files. This tells the spec generator which pages, routes, and APIs to cover.

---

## Step 1 — Get Changed Files

```bash
git diff main...HEAD --name-only 2>/dev/null || git diff HEAD~1 --name-only
```

If on a branch with no common ancestor with main, use:
```bash
git status --short
```

---

## Step 2 — Categorize Changed Files

Group the changed files by type:

| Category | File pattern | Meaning for tests |
|----------|-------------|-------------------|
| **Page** | `src/app/**/page.tsx` | URL to visit, UI to assert |
| **Component** | `src/components/**/*.tsx` | UI elements to interact with |
| **API route** | `src/app/api/**/*.ts` | Endpoints to `cy.intercept()` |
| **Server action** | `src/app/**/*.ts` (non-page) | Usually tested via the page that calls them |
| **Library** | `src/lib/**/*.ts` | Backend logic — test via the API surface |
| **Type/util** | `src/lib/utils.ts`, `src/types/**` | Not directly testable — skip |

---

## Step 3 — Read Page Files to Extract Route + UI

For each changed **page** file, read it to find:
- The URL path (from the file's location in `src/app/`)
- Key UI elements: headings, buttons, tables, forms, modals, empty states
- What APIs the page calls (look for `fetch('/api/...')` or `useEffect` with `fetch`)

```
src/app/jobs/[jobId]/invitations/page.tsx
  → URL: /jobs/{jobId}?tab=invitations (or /jobs/{jobId}/invitations)
  → UI: InvitationHistory table, empty state message, candidate list
  → API: GET /api/jobs/{jobId}/invitations
```

---

## Step 4 — Read API Route Files to Extract Endpoints

For each changed **API route** file, read it to find:
- HTTP method (GET, POST, PUT, DELETE, PATCH)
- URL pattern (from file path: `src/app/api/jobs/[jobId]/invitations/route.ts` → `/api/jobs/{jobId}/invitations`)
- Response shape (what fields does it return?)
- Error cases (what does it return on failure?)

---

## Step 5 — Build Test Surface Map

Produce a structured summary to pass to generate-spec.md:

```
CHANGED PAGES:
  /jobs/[jobId]?tab=invitations
    - renders InvitationHistory component
    - calls GET /api/jobs/[jobId]/invitations on mount
    - shows table of invitations when data exists
    - shows empty state when data is empty

CHANGED APIS:
  GET /api/jobs/[jobId]/invitations
    - returns { success: true, data: { invitations: [], total: 0 } }
    - returns { success: false, error: "..." } on failure

CHANGED COMPONENTS:
  src/components/invitation/InvitationHistory.tsx
    - shows invitation title, template name, candidate count
    - shows status breakdown badges

USER ACTIONS:
  - View the invitations tab (primary read-only flow)
  - [any buttons/forms that trigger writes — list them]

MOCK DATA NEEDED:
  - One invitation object with all fields
  - Job object (for the job detail page wrapper)
```

---

## Step 6 — Check for Existing Spec

```bash
ls cypress/e2e/ | grep -i "{ticket-slug}"
# e.g. ls cypress/e2e/ | grep -i "as6628"
```

If a spec already exists for this ticket:
- Tell the engineer: "A spec already exists at `cypress/e2e/as6628-*.cy.ts`. Should I update it instead?"
- If yes: switch to update mode — append new `it()` blocks, don't rewrite the whole file
- If no: proceed to generate-spec.md for a new file

---

## Pass to generate-spec.md

```
ticketId:     AS-6628
filename:     cypress/e2e/as6628-invitation-history.cy.ts
describe:     "AS-6628 — Invitation History"
pages:        [{ url: "/jobs/{jobId}?tab=invitations", component: "InvitationHistory" }]
apis:         [{ method: "GET", pattern: "/api/jobs/*/invitations*", response_shape: {...} }]
user_actions: ["view tab", "see invitation list", "see empty state"]
jira_ac:      [from extract-ticket.md]
```
