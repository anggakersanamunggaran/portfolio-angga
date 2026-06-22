# Identify DB Work Type

Classify the task before doing anything else. The classification determines which parts of `query-rules.md` and `implement.md` to focus on.

## Work Types

| Type | Description | Key concern |
|------|-------------|-------------|
| `READ` | SELECT query to fetch data | N+1, null check, index |
| `WRITE` | INSERT / UPDATE / DELETE / UPSERT | Parameterized, audit cols, soft delete |
| `SCHEMA` | New table, add/drop column, add index, migration | Naming convention, indexes, FK constraints |
| `MULTI` | Multiple operations in one request (e.g. transaction) | Atomicity, rollback safety |

## Clarify if Unclear

Ask ONE focused question if the scope is ambiguous:

- Unsure which table(s) are involved → ask: "Which table or feature area does this touch?"
- Unsure if it's a new table or modifying existing → ask: "Are you adding a new table or changing an existing one?"
- Unsure if the query replaces an existing one → ask: "Is this replacing an existing query or brand new?"

## Pass to schema-sync.md

After identifying, pass:

```
type:   READ | WRITE | SCHEMA | MULTI
tables: [list of table names involved, if known]
goal:   one-line description of what the operation achieves
```

If `tables` is unknown, schema-sync.md will help identify them from `.docs/database-scheme.md`.
