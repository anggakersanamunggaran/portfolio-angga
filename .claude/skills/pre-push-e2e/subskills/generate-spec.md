# Generate E2E Spec

Write the complete Cypress E2E spec file. Use the test surface map from scan-changes.md and the ticket info from extract-ticket.md.

---

## Spec File Template

Every spec file MUST follow this structure, in this exact order:

```ts
export {};

/**
 * cypress/e2e/{filename}.cy.ts
 *
 * {ticketId} — {ticket title}
 *
 * Coverage:
 *   - {ac line 1}
 *   - {ac line 2}
 *   - ...
 */

// ── Constants ──────────────────────────────────────────────────────────────────

const LOGIN_EMAIL    = 'rizal@astrnt.co';
const LOGIN_PASSWORD = '@Today1234';

// API patterns (use * for dynamic segments)
const API_{RESOURCE} = '/api/{route}*';

// Mock data
const MOCK_{RESOURCE} = { ... };

// ── Helpers ────────────────────────────────────────────────────────────────────

function loginAndVisit{PageName}() {
  // Stub the page-wrapper API (if the page is inside a job/resource detail)
  cy.intercept('GET', '/api/jobs/{id}*', { body: { success: true, job: MOCK_JOB } }).as('jobReq');

  // Programmatic login — real auth, no UI interaction needed
  cy.visit('/login');
  cy.request('POST', '/api/auth/login', {
    email: LOGIN_EMAIL,
    password: LOGIN_PASSWORD,
  }).then((resp) => {
    cy.window().then((win) => {
      win.sessionStorage.setItem('auth_user', JSON.stringify(resp.body));
      win.localStorage.setItem('astrnt_welcome_modal_dismissed', '1');
    });
  });

  // Visit the target page
  cy.visit('{target URL}');

  // Wait for critical mount requests
  cy.wait('@jobReq', { timeout: 15000 });
}

// ── Tests ──────────────────────────────────────────────────────────────────────

describe('{ticketId} — {short feature name}', () => {

  describe('happy path', () => {
    beforeEach(() => {
      cy.intercept('GET', API_{RESOURCE}, {
        body: { success: true, data: MOCK_{RESOURCE} },
      }).as('get{Resource}');

      loginAndVisit{PageName}();
      cy.wait('@get{Resource}', { timeout: 15000 });
    });

    it('loads the page without errors', () => {
      cy.contains('{page title or heading}').should('be.visible');
    });

    it('calls the {feature} API on mount', () => {
      // Already waited in beforeEach — just confirm no error
      cy.get('@get{Resource}').its('response.statusCode').should('eq', 200);
    });

    it('renders {primary data}', () => {
      cy.contains('{expected text from mock data}').should('be.visible');
    });

    // Add one it() per Jira acceptance criterion that involves visible UI
  });

  describe('empty state', () => {
    beforeEach(() => {
      cy.intercept('GET', API_{RESOURCE}, {
        body: { success: true, data: { items: [], total: 0 } },
      }).as('get{Resource}Empty');

      loginAndVisit{PageName}();
      cy.wait('@get{Resource}Empty', { timeout: 15000 });
    });

    it('shows empty state when no {resource} exist', () => {
      cy.contains(/{no data|empty|no {resource}}/i).should('be.visible');
    });
  });

  describe('API error state', () => {
    beforeEach(() => {
      cy.intercept('GET', API_{RESOURCE}, {
        statusCode: 500,
        body: { success: false, error: 'Internal server error' },
      }).as('get{Resource}Error');

      loginAndVisit{PageName}();
      cy.wait('@get{Resource}Error', { timeout: 15000 });
    });

    it('shows error or fallback on API failure', () => {
      cy.contains(/error|failed|something went wrong|try again/i).should('be.visible');
    });
  });

});
```

---

## Rules for Writing it() Blocks

### One assertion per it()
Each `it()` tests exactly one behavior. Never combine two unrelated assertions.

```ts
// Good
it('shows invitation title', () => {
  cy.contains('Software Engineer Round 1').should('be.visible');
});

it('shows candidate count', () => {
  cy.contains('2').should('exist');
});

// Bad — two concerns in one test
it('shows invitation data', () => {
  cy.contains('Software Engineer Round 1').should('be.visible');
  cy.contains('2').should('exist');
  cy.contains('SE Template').should('be.visible');
});
```

### Map Jira ACs to it() blocks

For each acceptance criterion in the Jira ticket, write one `it()` block:

```
Jira AC: "Table shows columns: Name, Email, Status, Invited At"
→
it('shows table columns: Name, Email, Status, Invited At', () => {
  cy.contains('Name').should('be.visible');
  cy.contains('Email').should('be.visible');
  cy.contains('Status').should('be.visible');
  cy.contains('Invited At').should('be.visible');
});
```

### Cover these scenarios for EVERY feature

| Scenario | describe() block | it() content |
|----------|-----------------|--------------|
| Page loads | `happy path` | `cy.contains(heading).should('be.visible')` |
| API called | `happy path` | `cy.get('@alias').its('response.statusCode').should('eq', 200)` |
| Data renders | `happy path` | `cy.contains(mock data value).should('be.visible')` |
| Empty result | `empty state` | `cy.contains(/no .../i).should('be.visible')` |
| API error | `API error state` | `cy.contains(/error|failed/i).should('be.visible')` |

### For write operations (forms, buttons that POST/PUT/DELETE)

Add a `describe('user actions', ...)` block:

```ts
describe('user actions', () => {
  beforeEach(() => {
    cy.intercept('POST', API_{RESOURCE}, { body: { success: true } }).as('create{Resource}');
    loginAndVisit{PageName}();
  });

  it('calls the create API when form is submitted', () => {
    cy.get('input[name="title"]').type('Test Entry');
    cy.contains('button', /save|submit|create/i).click();
    cy.wait('@create{Resource}').its('response.statusCode').should('eq', 200);
  });

  it('shows success feedback after submit', () => {
    cy.get('input[name="title"]').type('Test Entry');
    cy.contains('button', /save|submit|create/i).click();
    cy.wait('@create{Resource}');
    cy.contains(/saved|success|created/i).should('be.visible');
  });
});
```

---

## Mock Data Rules

1. **Include all fields** — mock data must include every field the component might read; missing fields cause undefined errors.
2. **Use realistic values** — use human-readable strings, not `"string"` or `"value"`.
3. **Keep IDs predictable** — use small numbers like `31823`, `201`, `202` — easy to grep.
4. **One happy-path mock** — define `MOCK_{RESOURCE}` as a single realistic object; build array variants inside `beforeEach`.

```ts
// Good — complete mock with readable values
const MOCK_INVITATION = {
  id: 1,
  title: 'Software Engineer Round 1',
  isDefault: true,
  templateName: 'SE Template',
  sentOn: '2026-03-01',
  totalCandidates: 2,
  statusBreakdown: { not_started: 1, in_progress: 0, finished: 1, session_expired: 0, not_interested: 0 },
};

// Bad — incomplete mock
const MOCK_INVITATION = { id: 1, title: 'test' };
```

---

## Anti-Patterns (Never Do These)

| Anti-pattern | Why | Fix |
|---|---|---|
| `cy.wait(3000)` | Arbitrary sleep, flaky | Use `cy.wait('@alias')` or `cy.contains(...).should('be.visible')` |
| `cy.get('.some-class')` for key assertions | Class names change | Use `cy.contains('text')` or `data-testid` |
| Asserting API implementation details | Brittle | Assert UI outcome, not internal state |
| Calling real APIs without `cy.intercept` | Flaky on staging | Always stub feature APIs |
| Multiple `cy.visit()` in one `it()` | Expensive, flaky | One visit per test, in `beforeEach` |
| Querying DB inside `it()` blocks | Slow, couples test to DB | Use `cy.task()` only in `before()`/`beforeEach()` |
| `cy.get('button').first()` | Fragile positional | `cy.contains('button', 'Save')` |

---

## After Writing the Spec

1. **Confirm the file path** matches naming convention: `cypress/e2e/{ticket-slug}-{feature-name}.cy.ts`
2. **Count the it() blocks** — minimum 5, covering: page load, API call, data render, empty state, error state
3. **Verify all `cy.wait('@alias')` have a matching `cy.intercept(...).as('alias')`**
4. **Check no hardcoded test IDs** — if a URL uses a dynamic ID (e.g. `/jobs/31823`), define it as a constant: `const JOB_ID = '31823'`

Report:

```
SPEC CREATED
─────────────────────────────────────────────────────
File:     cypress/e2e/as6628-invitation-history.cy.ts
Ticket:   AS-6628 — Rebuild: Invitation History tab
Tests:    8 it() blocks across 3 describe() groups
Coverage: page load · API call · invitation list render ·
          candidate count · empty state · API error
─────────────────────────────────────────────────────
Run with:
  npx cypress run --spec "cypress/e2e/as6628-invitation-history.cy.ts"
Or open interactively:
  npx cypress open
```
