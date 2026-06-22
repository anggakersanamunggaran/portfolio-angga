---
name: pre-push-e2e
description: "PRE-PUSH gate: automatically generates a Cypress E2E spec before an engineer pushes their branch. Triggers when: engineer says 'done', 'selesai', 'beres', 'siap push', 'mau push', 'ready to push', 'before push', 'mau commit', 'mau PR', 'buatin test dulu', 'generate test'; or when a feature/fix/update has just been completed and no E2E spec exists for the ticket yet. Reads git diff to understand what changed, extracts ticket ID from branch name, fetches Jira ticket for context, reads changed source files to identify routes/APIs/UI, then generates a complete Cypress E2E spec following ASTRNT conventions: export {} header, JSDoc coverage block, constants, stubApis helper, loginAndVisit helper, describe/it blocks covering happy path + empty state + API error state."
model: inherit
background: false
allowed-tools: Read, Edit, Write, Bash
---

# Pre-Push E2E

**This skill is the last gate before pushing.** When an engineer finishes a feature, update, or fix and is about to push, this skill auto-generates a Cypress E2E spec so the work is covered before it hits the repo.

**Triggers:**
- Engineer says "done", "selesai", "beres", "siap push", "mau push", "ready to push", "mau PR", "buatin test dulu"
- A feature implementation has just completed and no spec exists for the ticket yet
- Engineer explicitly says "generate test" / "buatin cypress"

**Does NOT trigger when:**
- The engineer is mid-implementation (not done yet)
- A spec for the ticket already exists and engineer only wants to update it (use `cypress-author` instead)
- The change is backend-only with no UI/API surface visible to a browser

---

## Mandatory Flow (do not skip steps)

1. **Extract ticket** — Read [./subskills/extract-ticket.md](./subskills/extract-ticket.md) — get ticket ID and title from git branch + Jira
2. **Scan changes** — Read [./subskills/scan-changes.md](./subskills/scan-changes.md) — understand what was built from git diff
3. **Generate spec** — Read [./subskills/generate-spec.md](./subskills/generate-spec.md) — write the complete E2E spec file
4. **Build check** — Read [./subskills/build-check.md](./subskills/build-check.md) — run `npm run build`, fix any errors, do NOT allow push until build is green

**Steps 1–3 run in parallel (ticket + scan are independent). Step 4 always runs last — never skip it.**

A branch is only ready to push when BOTH are true:
- ✅ E2E spec exists for the ticket in `cypress/e2e/`
- ✅ `npm run build` exits with no errors

---

## Project Cypress Context

- **Config:** `cypress.config.ts` — `baseUrl: https://app-v2.astrnt.co`, `specPattern: cypress/e2e/**/*.cy.{ts,tsx}`
- **Spec location:** `cypress/e2e/` — files named `{ticket-slug}-{feature-name}.cy.ts`
- **Custom commands:** `cy.login(email, password, {redirect?})`, `cy.clearAuthSession()`
- **DB tasks:** `cy.task('ensureTestUser', {...})`, `cy.task('dbResetTestUser', {...})`
- **Auth:** Tests do a real `cy.request('POST', '/api/auth/login')` for login; feature APIs are stubbed with `cy.intercept()`
- **Support file:** `cypress/support/e2e.ts` auto-loaded — no need to import commands manually
- **Test credentials:** `rizal@astrnt.co` / `@Today1234` (staging test account)
