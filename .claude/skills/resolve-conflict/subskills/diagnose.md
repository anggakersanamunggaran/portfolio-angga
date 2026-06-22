# Diagnose Conflict

Identify what kind of conflict this is before touching a single file.

---

## Step 1 — Identify Current Branch and Operation

```bash
git rev-parse --abbrev-ref HEAD
git status
```

From `git status`, look for:
- `rebase in progress` → this is a **rebase conflict** (feature vs develop)
- `You have unmerged paths` without rebase notice → this is a **merge conflict** (likely feature into staging)

Also check:
```bash
cat .git/MERGE_HEAD 2>/dev/null || echo "no merge head"
cat .git/rebase-merge/head-name 2>/dev/null || echo "no rebase in progress"
cat .git/rebase-merge/onto 2>/dev/null || echo ""
```

---

## Step 2 — Classify the Conflict Type

**Conflict Type A — Feature vs Develop (Rebase)**
- Current branch: `feature/AS-XXXX` or similar
- Operation: engineer ran `git rebase develop` or `git pull --rebase develop`
- `.git/rebase-merge/` directory exists
- Strategy: use `staging` branch as the semantic baseline reference

**Conflict Type B — Feature into Staging (Merge)**
- Current branch: `staging`, or engineer is merging a feature branch into staging
- Operation: `git merge feature/AS-XXXX` ran from `staging`, or engineer did `git pull` while on staging
- `.git/MERGE_HEAD` exists
- Strategy: both features must fully coexist — neither replaces the other

If neither is clear, ask the engineer:
> "Ada conflict di branch apa, dan lagi ngapain sebelum conflict — rebase develop, pull, atau merge ke staging?"

---

## Step 3 — List All Conflicted Files

```bash
git diff --name-only --diff-filter=U
```

For each file listed, note:
- File type (`.tsx`, `.ts`, API route, config, schema, etc.)
- Rough area in the codebase (component, API, DB migration, config)

**If a conflicted file is a DB migration file (`.sql` or inside `prisma/migrations/`):**
Stop and warn the engineer immediately:
> "⚠️ Ada conflict di migration file. Jangan di-resolve pakai AI — ini harus di-handle manual dengan hati-hati karena bisa corrupt schema. Pastikan urutan migration tetap konsisten dengan DB state."

---

## Step 4 — Capture Three-Way Diff for Each File

For every conflicted file, run:

```bash
# Get the common ancestor (base) version
git show :1:<filepath> > /tmp/conflict_base.txt 2>/dev/null || echo "no base"

# Get "ours" version (current branch / HEAD)
git show :2:<filepath> > /tmp/conflict_ours.txt

# Get "theirs" version (the branch being merged/rebased)
git show :3:<filepath> > /tmp/conflict_theirs.txt
```

Also get the staging reference for Type A conflicts:
```bash
git show staging:<filepath> > /tmp/conflict_staging.txt 2>/dev/null || echo "no staging version"
```

Pass all four versions to `analyze-intent.md`.

---

## Output to Pass Forward

```
conflict_type: A  (or B)
current_branch: feature/AS-XXXX
conflicted_files:
  - src/app/api/candidates/route.ts
  - src/components/CandidateTable.tsx
per_file:
  - file: src/app/api/candidates/route.ts
    base: [content or "no base"]
    ours: [content]
    theirs: [content]
    staging_ref: [content or "no staging version"]
```
