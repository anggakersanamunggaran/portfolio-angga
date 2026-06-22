# Implement DB Operations

Apply all rules from `query-rules.md`. Use the patterns below as the standard templates for each operation type.

---

## READ — SELECT Query

### Single record fetch

```ts
import { prisma } from '@/lib/prisma'
import { Prisma } from '@/generated/prisma/client'

const rows = await prisma.$queryRaw<{
  id: number
  title: string
  company_id: number
}[]>(Prisma.sql`
  SELECT id, title, company_id
  FROM astronautjobs
  WHERE id = ${jobId}
    AND company_id = ${companyId}
    AND deleted_at IS NULL
`)

if (!rows || rows.length === 0) {
  return NextResponse.json({ error: 'Job not found' }, { status: 404 })
}
const job = rows[0]
```

### List fetch with JOIN (no N+1)

```ts
type JobWithCount = {
  id: number
  title: string
  question_count: bigint  // MySQL COUNT returns BigInt
}

const rows = await prisma.$queryRaw<JobWithCount[]>(Prisma.sql`
  SELECT
    j.id,
    j.title,
    COUNT(aq.id) AS question_count
  FROM astronautjobs j
  LEFT JOIN astronautquestions aq
    ON aq.invite_id = (
      SELECT id FROM astronautinvites
      WHERE job_id = j.id AND is_default = 1
      LIMIT 1
    )
  WHERE j.company_id = ${companyId}
    AND j.deleted_at IS NULL
  GROUP BY j.id, j.title
  ORDER BY j.created_at DESC
  LIMIT ${limit} OFFSET ${offset}
`)

// Cast BigInt before use
const jobs = rows.map(r => ({
  ...r,
  question_count: Number(r.question_count),
}))

if (jobs.length === 0) {
  return { success: true, data: [], total: 0 }
}
```

### Batch fetch by IDs (instead of loop)

```ts
const ids = parentRows.map(r => r.id)
if (ids.length === 0) return []  // guard before IN query

const details = await prisma.$queryRaw<Detail[]>(Prisma.sql`
  SELECT id, parent_id, value
  FROM detail_table
  WHERE parent_id IN (${Prisma.join(ids)})
    AND deleted_at IS NULL
`)

// Group by parent_id for O(1) lookup
const byParentId = new Map<number, Detail[]>()
for (const d of details) {
  const arr = byParentId.get(d.parent_id) ?? []
  arr.push(d)
  byParentId.set(d.parent_id, arr)
}
```

### Paginated list

```ts
const page   = Math.max(1, Number(searchParams.get('page') ?? 1))
const limit  = 20
const offset = (page - 1) * limit

const [rows, countRows] = await Promise.all([
  prisma.$queryRaw<Row[]>(Prisma.sql`
    SELECT id, title
    FROM astronautjobs
    WHERE company_id = ${companyId}
      AND deleted_at IS NULL
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `),
  prisma.$queryRaw<{total: bigint}[]>(Prisma.sql`
    SELECT COUNT(*) AS total
    FROM astronautjobs
    WHERE company_id = ${companyId}
      AND deleted_at IS NULL
  `),
])

const total     = Number(countRows[0]?.total ?? 0)
const totalPages = Math.ceil(total / limit)
```

---

## WRITE — INSERT

```ts
await prisma.$executeRaw(Prisma.sql`
  INSERT INTO some_table (
    company_id, title, status,
    created_by, updated_by,
    created_at, updated_at
  ) VALUES (
    ${companyId}, ${title}, 'draft',
    ${userId}, ${userId},
    NOW(), NOW()
  )
`)

// Get the inserted ID
const inserted = await prisma.$queryRaw<{id: number}[]>(
  Prisma.sql`SELECT LAST_INSERT_ID() AS id`
)
const newId = inserted[0]?.id
if (!newId) throw new Error('Insert failed — no ID returned')
```

---

## WRITE — UPDATE

```ts
const result = await prisma.$executeRaw(Prisma.sql`
  UPDATE some_table
  SET
    title = ${title},
    status = ${status},
    updated_by = ${userId},
    updated_at = NOW()
  WHERE id = ${id}
    AND company_id = ${companyId}
    AND deleted_at IS NULL
`)

// result = affected row count (number)
if (result === 0) {
  return NextResponse.json({ error: 'Not found or already deleted' }, { status: 404 })
}
```

---

## WRITE — Soft DELETE

```ts
// Never use hard DELETE on tables with deleted_at
const result = await prisma.$executeRaw(Prisma.sql`
  UPDATE some_table
  SET
    deleted_at = NOW(),
    deleted_by = ${userId},
    updated_at = NOW()
  WHERE id = ${id}
    AND company_id = ${companyId}
    AND deleted_at IS NULL
`)

if (result === 0) {
  return NextResponse.json({ error: 'Not found or already deleted' }, { status: 404 })
}
```

---

## WRITE — UPSERT

```ts
await prisma.$executeRaw(Prisma.sql`
  INSERT INTO some_table (company_id, key_col, value, created_at, updated_at)
  VALUES (${companyId}, ${key}, ${value}, NOW(), NOW())
  ON DUPLICATE KEY UPDATE
    value = VALUES(value),
    updated_at = NOW()
`)
```

---

## WRITE — Transaction (multi-step atomic)

```ts
const result = await prisma.$transaction(async (tx) => {
  // Step 1: insert parent
  await tx.$executeRaw(Prisma.sql`
    INSERT INTO parent_table (company_id, title, created_by, created_at, updated_at)
    VALUES (${companyId}, ${title}, ${userId}, NOW(), NOW())
  `)
  const [{ id: parentId }] = await tx.$queryRaw<{id: number}[]>(
    Prisma.sql`SELECT LAST_INSERT_ID() AS id`
  )

  // Step 2: insert children
  for (const child of children) {
    // Loop is OK here — all inside one transaction, no separate DB round-trips for reads
    await tx.$executeRaw(Prisma.sql`
      INSERT INTO child_table (parent_id, value, created_at, updated_at)
      VALUES (${parentId}, ${child.value}, NOW(), NOW())
    `)
  }

  return { parentId }
})
```

---

## SCHEMA — New Table

Follow this template. Always include: `id`, `company_id` (if multi-tenant), `created_at`, `updated_at`, `deleted_at` (if soft delete applies), audit columns.

```sql
CREATE TABLE `new_feature_table` (
  `id`          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  `company_id`  INT UNSIGNED    NOT NULL,
  `title`       VARCHAR(255)    NOT NULL,
  `status`      ENUM('draft','active','closed') NOT NULL DEFAULT 'draft',
  `created_by`  INT UNSIGNED    DEFAULT NULL,
  `updated_by`  INT UNSIGNED    DEFAULT NULL,
  `deleted_by`  INT UNSIGNED    DEFAULT NULL,
  `created_at`  TIMESTAMP       NULL DEFAULT NULL,
  `updated_at`  TIMESTAMP       NULL DEFAULT NULL,
  `deleted_at`  TIMESTAMP       NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_new_feature_table_company_id` (`company_id`),
  KEY `idx_new_feature_table_status` (`status`),
  KEY `idx_new_feature_table_company_status` (`company_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

**Naming rules:**
- Table: `snake_case`, plural noun (`job_pipeline_stages`, not `JobPipelineStage`)
- Column: `snake_case`
- Index: `idx_<table>_<col>` or `idx_<table>_<col1>_<col2>` for composite

---

## SCHEMA — Add Column

```sql
ALTER TABLE `existing_table`
  ADD COLUMN `new_column` VARCHAR(255) DEFAULT NULL AFTER `existing_column`;
```

Always use `DEFAULT NULL` unless there's a specific reason the column must be NOT NULL. Adding a NOT NULL column without a default to a large table requires a table rebuild — high risk on production.

---

## SCHEMA — Add Index

Only add after confirming the index does not already exist (see schema-sync.md Step 6).

```sql
-- Single column
ALTER TABLE `some_table`
  ADD KEY `idx_some_table_company_id` (`company_id`);

-- Composite (put most selective column first)
ALTER TABLE `some_table`
  ADD KEY `idx_some_table_company_status` (`company_id`, `status`);
```

---

## After Implementing

Report what was done:

```
DB CHANGES
──────────────────────────────────────────────────────
[READ]   src/lib/jobsList.ts:45 — single JOIN query, no N+1, soft-delete filter added
[INDEX]  Recommended: ADD KEY idx_astronautjobs_company_status (company_id, status)
[SCHEMA] .docs/database-scheme.md updated — added table `new_feature_table` (total: 338)
[WRITE]  src/app/api/jobs/route.ts:88 — parameterized INSERT with audit columns
──────────────────────────────────────────────────────
```

Flag any item that needs manual action (e.g. running a migration on production):

```
MANUAL ACTION REQUIRED:
  Run this migration on staging before merging:
  ALTER TABLE `astronautjobs` ADD KEY `idx_astronautjobs_company_status` (`company_id`, `status`);
  Then verify with: EXPLAIN SELECT ... (paste the query here)
```
