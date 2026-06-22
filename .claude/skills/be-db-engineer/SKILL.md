---
name: be-db-engineer
description: "ALWAYS USE for any backend database work in this codebase. Triggers on: writing any SQL query (SELECT, INSERT, UPDATE, DELETE); planning or executing schema changes (new table, add/drop column, add index, migration); writing or editing any server action or API route that reads/writes the database; using prisma.$queryRaw, Prisma.sql, prisma.findMany, prisma.create, prisma.update, prisma.upsert, prisma.delete; 'query', 'fetch from DB', 'save to DB', 'insert', 'update record', 'delete row', 'new table', 'add column', 'add index', 'migration', 'database', 'schema'. Enforces: always read .docs/database-scheme.md first; detect new tables via live DB check and update docs if found; no N+1 queries (JOINs or batched queries only); always filter deleted_at IS NULL on soft-delete tables; always include company_id in WHERE for multi-tenant tables; parameterized queries only; null/empty result checks; index recommendations for every new query."
model: inherit
background: false
allowed-tools: Read, Edit, Write, Bash
---

# BE Database Engineer

**This skill is MANDATORY for any task that touches the database.** Runs automatically whenever an engineer writes a query, plans a schema change, or builds any server action/API route with DB access.

**Use this skill when:**
- Writing any SQL query: SELECT, INSERT, UPDATE, DELETE
- Planning any schema change: new table, add/drop column, add index, migration
- Writing or editing any file that imports `prisma` from `@/lib/prisma` or `src/lib/prisma`
- Building any server action or API route (`src/app/api/**`, `src/lib/**`) that accesses the DB
- User says "query", "fetch", "save", "insert", "update", "delete", "new table", "add column", "migration", "database", "schema"

**Do NOT use this skill when:**
- The task has zero DB access: pure UI component, utility function, email template, client-only logic

---

## Mandatory Flow (do not skip steps)

1. **Identify** — Read [./subskills/identify.md](./subskills/identify.md)
2. **Schema sync** — Read [./subskills/schema-sync.md](./subskills/schema-sync.md) — always check docs + live DB before writing any query
3. **Query rules** — Read [./subskills/query-rules.md](./subskills/query-rules.md) — N+1, null checks, indexing, multi-tenant, soft delete
4. **Implement** — Read [./subskills/implement.md](./subskills/implement.md)

---

## Stack Context

- **ORM:** Prisma with `@prisma/adapter-mariadb` — import from `src/lib/prisma.ts`
- **DB engine:** MySQL 5.7.44 (InnoDB), charset utf8/utf8_unicode_ci
- **Raw queries:** `prisma.$queryRaw<T[]>(Prisma.sql\`...\`)` — always use `Prisma.sql` tagged template, never string concatenation
- **Schema docs:** `.docs/database-scheme.md` — 337 tables, authoritative reference
- **Gotchas:** `.docs/primbon.md` — known quirks, non-obvious table behaviors
- **BigInt:** MySQL COUNT/SUM returns BigInt — always cast with `Number(row.count)`
- **Pool:** configured in `src/lib/prisma.ts`, pool_size=30, pool_timeout=30s — do not create additional connections
