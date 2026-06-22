# Build Check

Run a full production build before pushing. This catches TypeScript errors, missing imports, and any Next.js compilation issues that would break the server — before they hit CI or production.

---

## Step 1 — Run the Build

```bash
npm run build 2>&1
```

This runs: `node scripts/prisma-generate.mjs && next build`

The build output goes to `.next/`. A successful build ends with:
```
✓ Compiled successfully
Route (app) ...
```

Allow up to **5 minutes** — large codebases can take time. Do not cancel early.

---

## Step 2 — Parse the Result

### If build SUCCEEDS

```
✅ BUILD PASSED
─────────────────────────────────────────────────────
npm run build completed without errors.
Safe to push.
─────────────────────────────────────────────────────
```

Proceed — the branch is ready to push.

### If build FAILS

Read the full error output. Categorize the failure:

---

### Category 1 — TypeScript / Type Error

**Signal:** Output contains `Type error:` or `TS\d+:`

```
Type error: Type 'string | null' is not assignable to type 'string'.
  → src/components/foo.tsx:34:12
```

**Fix protocol:**
1. Read the exact file and line from the error
2. Fix the type error — common fixes:
   - Add null check: `if (!value) return`
   - Use optional chaining: `row?.column ?? defaultValue`
   - Add explicit type cast where safe: `value as string`
   - Fix the function signature to accept the correct type
3. Re-run `npm run build` after fixing
4. Do not move on until build passes

---

### Category 2 — Module Not Found

**Signal:** `Module not found: Can't resolve '...'`

```
Module not found: Can't resolve '@/components/SomeComponent'
  → src/app/some-page/page.tsx:5
```

**Fix protocol:**
1. Check if the import path is correct — verify the file exists at that path
2. If the file was renamed/moved: update the import path
3. If it's a new component that wasn't created: create it or remove the import
4. Re-run `npm run build`

---

### Category 3 — Syntax / Parse Error

**Signal:** `SyntaxError:` or `Unexpected token`

```
SyntaxError: Unexpected token '}'
  → src/lib/someFile.ts:88
```

**Fix protocol:**
1. Read the file at the reported line
2. Fix the syntax: missing bracket, unclosed JSX tag, missing comma, etc.
3. Re-run `npm run build`

---

### Category 4 — Prisma Generation Error

**Signal:** Error from `scripts/prisma-generate.mjs` before `next build` starts

```
Error: PRISMA_... environment variable not set
```

**Fix protocol:**
- Check `.env.local` has `DB_HOST`, `DB_DATABASE`, `DB_USER`, `DB_PASSWORD` set
- If env is missing: do not push yet — tell the engineer which env var is missing
- This is a local config issue, not a code bug

---

### Category 5 — Build Timeout / Memory

**Signal:** Process killed, OOM error, or > 10 minutes elapsed

**Fix protocol:**
- Run with increased memory: `NODE_OPTIONS="--max-old-space-size=4096" npm run build 2>&1`
- If still fails, report to the engineer and let them decide whether to push anyway

---

## Step 3 — Iterate Until Green

After fixing any error, re-run:

```bash
npm run build 2>&1
```

Repeat until the build output shows:
```
✓ Compiled successfully
```

**Do not allow a push if the build is failing.** The broken build will fail on the server and block deployments for the whole team.

---

## Step 4 — Final Pre-Push Report

After build passes, produce the complete pre-push summary:

```
PRE-PUSH CHECKLIST
══════════════════════════════════════════════════════
✅  E2E spec created:  cypress/e2e/{filename}.cy.ts
                       {N} it() blocks — happy path · empty state · error state
✅  Build passed:      npm run build completed without errors

READY TO PUSH
══════════════════════════════════════════════════════
Branch:  {branch name}
Ticket:  {ticketId} — {ticket title}

Push command:
  git push origin {branch name}
══════════════════════════════════════════════════════
```

If the E2E spec was skipped for a valid reason, note it explicitly:

```
⚠️  E2E spec: skipped — backend-only change (no browser surface)
✅  Build passed: npm run build completed without errors
```
