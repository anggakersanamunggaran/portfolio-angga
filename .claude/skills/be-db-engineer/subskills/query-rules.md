# Query Rules

All rules below apply to every query written in this codebase. No exceptions unless explicitly noted.

---

## Rule 1 — Unified DB Access

**Always import `prisma` from `@/lib/prisma`. Never create a new connection.**

```ts
// Correct
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'

// WRONG — never do this
import mysql from 'mysql2/promise'
const conn = mysql.createConnection(...)
```

The shared pool in `src/lib/prisma.ts` is pool_size=30 and handles all concurrency. Creating additional connections causes pool exhaustion.

---

## Rule 2 — Parameterized Queries Only

**Never interpolate user input or variables into SQL strings. Always use `Prisma.sql` tagged templates.**

```ts
// Correct
const rows = await prisma.$queryRaw<Row[]>(Prisma.sql`
  SELECT id, title FROM astronautjobs
  WHERE company_id = ${companyId}
    AND deleted_at IS NULL
`)

// WRONG — SQL injection risk
const rows = await prisma.$queryRaw(`
  SELECT * FROM astronautjobs WHERE company_id = ${companyId}
`)
```

For Prisma ORM methods (`findMany`, `create`, etc.), parameterization is automatic — no `Prisma.sql` needed.

---

## Rule 3 — No N+1 Queries

**Never query inside a loop. Fetch all needed data in a single query using JOINs, subqueries, or IN clauses.**

```ts
// WRONG — N+1: queries per job
const jobs = await prisma.$queryRaw<Job[]>(Prisma.sql`SELECT id FROM astronautjobs WHERE company_id = ${companyId}`)
for (const job of jobs) {
  // This is a query per job — N+1 pattern
  const count = await prisma.$queryRaw(Prisma.sql`SELECT COUNT(*) FROM astronautquestions WHERE job_id = ${job.id}`)
}

// Correct — single query with subquery/JOIN
const jobs = await prisma.$queryRaw<JobWithCount[]>(Prisma.sql`
  SELECT
    j.id,
    j.title,
    (SELECT COUNT(*) FROM astronautquestions aq WHERE aq.job_id = j.id) AS question_count
  FROM astronautjobs j
  WHERE j.company_id = ${companyId}
    AND j.deleted_at IS NULL
`)

// Correct — batch with IN when IDs are already known
const ids = [1, 2, 3]
const details = await prisma.$queryRaw<Detail[]>(Prisma.sql`
  SELECT * FROM some_table WHERE id IN (${Prisma.join(ids)})
`)
```

**Detection checklist — flag as N+1 if:**
- `await prisma.$queryRaw` or any `prisma.*` call is inside a `for`, `forEach`, `map`, `reduce`, or `while` loop
- A loop runs after a first query and each iteration uses a value from that query result as a WHERE parameter

---

## Rule 4 — Soft Delete Filter

**Any table with `deleted_at` column MUST include `AND deleted_at IS NULL` in every SELECT.**

Check `.docs/database-scheme.md` for which tables have `deleted_at`. When in doubt, run `DESCRIBE table_name` to check.

```ts
// Correct — always filter soft-deleted rows
Prisma.sql`
  SELECT * FROM astronautjobs
  WHERE company_id = ${companyId}
    AND deleted_at IS NULL
`

// WRONG — may return logically deleted data
Prisma.sql`
  SELECT * FROM astronautjobs
  WHERE company_id = ${companyId}
`
```

**Tables known to have soft delete:** `astronautjobs`, `astronautcandidates`, `astronautquestions`, `astronautinvites`, `astronautusers`, `astronautcompanies` — and most feature tables. Always verify.

---

## Rule 5 — Multi-Tenant Filter

**Every query against a multi-tenant table MUST include `company_id` in the WHERE clause.**

```ts
// Correct — always scope to the requesting company
Prisma.sql`
  SELECT * FROM astronautjobs
  WHERE company_id = ${companyId}
    AND deleted_at IS NULL
`

// WRONG — returns data from all companies
Prisma.sql`
  SELECT * FROM astronautjobs
  WHERE job_status = 'active'
`
```

The `companyId` must come from the authenticated session — never from user-supplied request parameters directly without validation.

```ts
// Get companyId from auth session (not from request body/query)
import { parseAuthUser } from '@/lib/parseAuthUser'
const auth = parseAuthUser(req)
const companyId = auth.company?.id
if (!companyId) return NextResponse.json({ error: 'No company' }, { status: 401 })
```

---

## Rule 6 — Empty / Null Result Checks

**Always check if the query returned data before using it. Never assume a row exists.**

```ts
// SELECT single row
const rows = await prisma.$queryRaw<Job[]>(Prisma.sql`
  SELECT * FROM astronautjobs WHERE id = ${jobId} AND company_id = ${companyId} AND deleted_at IS NULL
`)
if (!rows || rows.length === 0) {
  return NextResponse.json({ error: 'Job not found' }, { status: 404 })
}
const job = rows[0]

// SELECT list
const items = await prisma.$queryRaw<Item[]>(Prisma.sql`...`)
if (!items || items.length === 0) {
  return { success: true, data: [] }  // empty state, not an error
}

// Nullable column — check before using
const score = job.score ?? null
if (score === null) { /* handle missing score */ }
```

**Rules:**
- Single-row fetch (`findFirst` / `queryRaw` for one record) → 404 if not found
- List fetch → return empty array `[]`, never throw
- Nullable column → always use `?? defaultValue` or explicit null check before using
- COUNT result → cast with `Number()` before comparing: `Number(rows[0].count) > 0`

---

## Rule 7 — Indexing

**Every new query that filters, joins, or orders by a non-indexed column on a large table needs an index recommendation.**

### When to add an index

| Scenario | Add index on |
|----------|-------------|
| `WHERE col = ?` on any table with >10k rows | `col` |
| `WHERE company_id = ? AND status = ?` | `(company_id, status)` composite |
| `ORDER BY created_at DESC` | `created_at` |
| `JOIN tableA ON tableA.job_id = tableB.id` | `job_id` on tableA |
| `WHERE deleted_at IS NULL AND company_id = ?` | `(company_id, deleted_at)` |

### Index naming convention

```sql
-- Single column
KEY `idx_tablename_colname` (`colname`)

-- Composite
KEY `idx_tablename_col1_col2` (`col1`, `col2`)

-- Unique
UNIQUE KEY `uniq_tablename_colname` (`colname`)
```

### Add index in migration SQL

```sql
ALTER TABLE `table_name`
  ADD KEY `idx_table_name_company_id` (`company_id`);
```

Always check existing indexes via `SHOW INDEX FROM table_name` (see schema-sync.md Step 6) before adding — never add a duplicate index.

---

## Rule 8 — BigInt Casting

**MySQL returns `BigInt` for COUNT, SUM, and auto-increment IDs from `$queryRaw`. Always cast.**

```ts
// COUNT result
const countRow = rows[0] as { total: bigint }
const total = Number(countRow.total)  // cast before any comparison

// The prisma.ts file already patches BigInt.prototype.toJSON — safe for JSON.stringify
// But still cast before arithmetic or comparison operators
if (Number(row.count) > 0) { ... }
```

---

## Rule 9 — Write Operations: Audit Columns

**INSERT and UPDATE operations on tables with audit columns must set them correctly.**

```ts
// INSERT with audit columns
Prisma.sql`
  INSERT INTO some_table (company_id, title, created_by, updated_by, created_at, updated_at)
  VALUES (${companyId}, ${title}, ${userId}, ${userId}, NOW(), NOW())
`

// UPDATE with audit columns
Prisma.sql`
  UPDATE some_table
  SET title = ${title}, updated_by = ${userId}, updated_at = NOW()
  WHERE id = ${id} AND company_id = ${companyId}
`

// Soft DELETE — never hard-delete from tables with deleted_at
Prisma.sql`
  UPDATE some_table
  SET deleted_at = NOW(), deleted_by = ${userId}, updated_at = NOW()
  WHERE id = ${id} AND company_id = ${companyId}
`
```

---

## Rule 10 — Transaction for Multi-Step Writes

**When two or more write operations must succeed or fail together, use a transaction.**

```ts
// Correct — atomic multi-step write
await prisma.$transaction(async (tx) => {
  await tx.$executeRaw(Prisma.sql`
    INSERT INTO parent_table (company_id, title, created_at, updated_at)
    VALUES (${companyId}, ${title}, NOW(), NOW())
  `)
  const [inserted] = await tx.$queryRaw<{id: number}[]>(Prisma.sql`SELECT LAST_INSERT_ID() as id`)
  await tx.$executeRaw(Prisma.sql`
    INSERT INTO child_table (parent_id, value, created_at, updated_at)
    VALUES (${inserted.id}, ${value}, NOW(), NOW())
  `)
})
```

Use `$executeRaw` (not `$queryRaw`) for INSERT/UPDATE/DELETE inside transactions — it returns affected row count, not result sets.

---

## Rule 11 — Query Performance Checklist

Before finalizing any query, verify:

- [ ] Uses `Prisma.sql` tagged template (parameterized)
- [ ] Includes `deleted_at IS NULL` if table has soft delete
- [ ] Includes `company_id = ${companyId}` if table is multi-tenant
- [ ] No nested loops with DB calls (N+1 check)
- [ ] Empty result handled (404 for single row, `[]` for list)
- [ ] COUNT/SUM/BigInt columns cast with `Number()`
- [ ] JOIN/WHERE columns are indexed (checked via SHOW INDEX)
- [ ] Write operations include audit columns (`created_by`, `updated_by`, `created_at`, `updated_at`)
- [ ] Destructive deletes use soft delete pattern (`deleted_at = NOW()`)
