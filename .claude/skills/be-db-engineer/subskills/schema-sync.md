# Schema Sync

Run this before writing any query or schema change. Goal: confirm the table structure is known and the local docs match the live database.

---

## Step 1 — Read Schema Docs

Always read `.docs/database-scheme.md` first. Find the relevant table(s) for this task and note:
- Column names and types
- Which columns are nullable
- Soft-delete column: `deleted_at` (present on most tables — treat as mandatory filter)
- Multi-tenant column: `company_id` (present on most feature tables — always include in WHERE)
- Audit columns: `created_by`, `updated_by`, `deleted_by`, `created_at`, `updated_at`
- Existing indexes (documented under each table)

If the table is not in the docs, proceed to Step 2.

---

## Step 2 — Check Live DB for New Tables

Run this command to get the current table list from the live database and compare against `.docs/database-scheme.md`:

```bash
source /home/angga/.nvm/nvm.sh && nvm use 24 && node -e "
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
console.log('Connecting to:', DB_HOST + ':' + (DB_PORT||3306) + '/' + DB_DATABASE);
mysql.createConnection({ host: DB_HOST, port: DB_PORT||3306, user: DB_USER, password: DB_PASSWORD, database: DB_DATABASE, connectTimeout: 5000 })
  .then(c => c.query('SHOW TABLES').then(([rows]) => {
    const tables = rows.map(r => Object.values(r)[0]);
    console.log('TOTAL TABLES:', tables.length);
    console.log(JSON.stringify(tables));
    c.end();
  }))
  .catch(e => console.error('DB ERROR:', e.message));
"
```

Compare the count with the `**Total Tables:** 337` line in `.docs/database-scheme.md`. If the count is higher, new tables exist.

---

## Step 3 — Describe New Tables (if any found)

For each table NOT in `.docs/database-scheme.md`, run DESCRIBE + SHOW CREATE TABLE to get full structure and indexes:

```bash
source /home/angga/.nvm/nvm.sh && nvm use 24 && node -e "
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
mysql.createConnection({ host: DB_HOST, port: DB_PORT||3306, user: DB_USER, password: DB_PASSWORD, database: DB_DATABASE, connectTimeout: 5000 })
  .then(async c => {
    const [cols] = await c.query('DESCRIBE \`TABLE_NAME\`');
    const [create] = await c.query('SHOW CREATE TABLE \`TABLE_NAME\`');
    console.log('COLUMNS:', JSON.stringify(cols, null, 2));
    console.log('CREATE:', create[0]['Create Table']);
    c.end();
  })
  .catch(e => console.error('DB ERROR:', e.message));
"
```

Replace `TABLE_NAME` with the actual table name.

---

## Step 4 — Update .docs/database-scheme.md (if new tables found)

If Step 2 found new tables, add them to `.docs/database-scheme.md` immediately. Follow the existing format:

```markdown
### Table: `new_table_name`

**Purpose:** [what this table stores]
**Multi-tenant:** yes/no (has company_id?)
**Soft delete:** yes/no (has deleted_at?)

| Column | Type | Nullable | Default | Notes |
|--------|------|----------|---------|-------|
| id | int(10) unsigned | NO | — | PK, auto-increment |
| company_id | int(10) unsigned | NO | — | FK → astronautcompanies.id |
| ... | | | | |
| created_at | timestamp | YES | NULL | |
| updated_at | timestamp | YES | NULL | |
| deleted_at | timestamp | YES | NULL | Soft delete |

**Indexes:**
- PRIMARY KEY (`id`)
- KEY `idx_company_id` (`company_id`)
```

Also update the `**Total Tables:**` count at the top of the file.

---

## Step 5 — Verify Target Table Columns (for queries)

Before writing a query against a specific table, confirm the exact column names via:

```bash
source /home/angga/.nvm/nvm.sh && nvm use 24 && node -e "
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
mysql.createConnection({ host: DB_HOST, port: DB_PORT||3306, user: DB_USER, password: DB_PASSWORD, database: DB_DATABASE, connectTimeout: 5000 })
  .then(c => c.query('DESCRIBE \`TABLE_NAME\`').then(([rows]) => {
    console.log(rows.map(r => \`\${r.Field} \${r.Type} \${r.Null === 'YES' ? 'NULL' : 'NOT NULL'} \${r.Key ? '[' + r.Key + ']' : ''}\`).join('\n'));
    c.end();
  }))
  .catch(e => console.error('DB ERROR:', e.message));
"
```

Never assume a column name from memory — verify against the live schema.

---

## Step 6 — Check Existing Indexes

Before recommending or adding indexes, check what already exists:

```bash
source /home/angga/.nvm/nvm.sh && nvm use 24 && node -e "
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
mysql.createConnection({ host: DB_HOST, port: DB_PORT||3306, user: DB_USER, password: DB_PASSWORD, database: DB_DATABASE, connectTimeout: 5000 })
  .then(c => c.query('SHOW INDEX FROM \`TABLE_NAME\`').then(([rows]) => {
    console.log(JSON.stringify(rows.map(r => ({ key: r.Key_name, col: r.Column_name, unique: r.Non_unique === 0 })), null, 2));
    c.end();
  }))
  .catch(e => console.error('DB ERROR:', e.message));
"
```

---

## If DB is Unreachable

If the DB connection fails (`ETIMEDOUT`, `ER_ACCESS_DENIED`):
- For `ETIMEDOUT` → DB host may have changed. Check `.env.local` `DB_HOST`, ask the team if staging DB moved.
- For `ER_ACCESS_DENIED` → wrong credentials in `.env.local`.
- Do NOT proceed with schema assumptions — tell the engineer: "DB unreachable, cannot verify schema. Please fix the connection first."

Only proceed without live DB verification when the table is already fully documented in `.docs/database-scheme.md` AND you are not making schema changes.
