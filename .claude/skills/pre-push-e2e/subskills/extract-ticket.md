# Extract Ticket

Get the ticket ID and its context before generating the spec. The ticket title and acceptance criteria are the primary inputs for deciding what to test.

---

## Step 1 — Get Ticket ID from Git Branch

```bash
git rev-parse --abbrev-ref HEAD
```

Parse the ticket ID from the branch name. Common formats:

| Branch pattern | Ticket ID |
|----------------|-----------|
| `feature/AS-6604` | `AS-6604` |
| `AS-6628-invitation-history` | `AS-6628` |
| `fix/AS-6739-credit-transparency` | `AS-6739` |
| `hotfix/as6800-cv-retry` | `AS-6800` |

The pattern is: look for `AS-\d+` (case-insensitive) anywhere in the branch name.

If the branch name has no ticket ID (e.g. `main`, `staging`, `develop`, generic name), ask the engineer:
> "What's the Jira ticket ID for this change? (e.g. AS-6628)"

---

## Step 2 — Fetch Jira Ticket for Context

Once the ticket ID is known, use the Atlassian MCP to fetch the full ticket:

Use `mcp__claude_ai_Atlassian__getJiraIssue` with the ticket key (e.g. `AS-6628`).

Extract from the response:
- **summary** → ticket title (used in `describe()` label and spec filename slug)
- **description** → feature description and acceptance criteria (what to test)
- **status** → confirm the ticket is In Progress or Done (not Backlog)

If Jira is unreachable or the ticket is not found, fall back to:
1. Reading recent commit messages: `git log --oneline -10`
2. Asking the engineer: "Give me a one-line description of what this ticket does."

---

## Step 3 — Derive Spec Filename and describe() Label

From the ticket ID and title, derive:

```
ticketId:   AS-6628
title:      "Rebuild: Invitation History tab"
slug:       "invitation-history"         ← kebab-case of the core feature noun(s)
filename:   "as6628-invitation-history.cy.ts"
describe:   "AS-6628 — Invitation History"
```

Slug rules:
- Remove ticket prefix, "Rebuild:", "Fix:", "Update:", "Feature:" etc.
- Take the 2–4 most meaningful words
- kebab-case, all lowercase
- Max 4 words

---

## Step 4 — Pass to scan-changes.md

Pass this payload:

```
ticketId:  AS-6628
title:     "Rebuild: Invitation History tab"
slug:      invitation-history
filename:  cypress/e2e/as6628-invitation-history.cy.ts
describe:  "AS-6628 — Invitation History"
jira_ac:   [list of acceptance criteria from Jira, if available]
```
