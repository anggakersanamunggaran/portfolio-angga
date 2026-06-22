# Resolve: Feature into Staging (Merge Conflict)

Use this subskill when the conflict happened while merging a feature branch INTO `staging`, or when `staging` has conflicts after multiple feature branches were merged.

**Situation:** `staging` already contains Feature A (from a teammate). You're merging Feature B (your branch). Both features touched the same file in different ways, causing a conflict.

**Goal:** The final file must contain:
1. Feature A's complete changes — fully working as intended
2. Feature B's complete changes — fully working as intended
3. No logic from either feature is lost or broken by the other

This is NOT about choosing the "latest" or "most correct" code. Both are correct. Both must exist.

---

## The Mental Model

Think of it as **surgical integration**: you're interleaving two independent features into one codebase. Like adding two separate rooms to a house — neither room replaces the other.

```
develop (common baseline)
    ├── feature/AS-XXXX  ← Feature A (already in staging)
    └── feature/AS-YYYY  ← Feature B (being merged now)
                ↓
           staging (must contain both A + B)
```

---

## Resolution Process

### Step 1 — Identify which feature each side represents

```bash
# Who's already on staging?
git log --oneline staging --not develop | head -10

# What's being merged in?
git log --oneline MERGE_HEAD --not develop | head -10
```

This tells you: "HEAD = staging has Feature A, MERGE_HEAD = Feature B is coming in."

### Step 2 — Understand what each feature does to the file

Read both versions completely before resolving anything:

```bash
git show :2:<filepath>    # full "ours" version (staging with Feature A)
git show :3:<filepath>    # full "theirs" version (feature branch with Feature B)
git show develop:<filepath>  # baseline without either feature
```

Answer for each version:
- What new components/functions/imports did Feature A add?
- What new components/functions/imports did Feature B add?
- Where do they overlap?

### Step 3 — For each conflict block

Use this decision tree:

```
Does ours (staging/Feature A) contain code NOT in develop baseline?
  YES → Feature A added this → must be in the final file

Does theirs (feature branch/Feature B) contain code NOT in develop baseline?
  YES → Feature B added this → must also be in the final file

Is the conflict just about ordering (two additions in the same area)?
  YES → Keep both, order logically (imports alphabetically, UI sections top-to-bottom)

Do both sides change the same line for different feature reasons?
  YES → Apply both changes to the line simultaneously
```

**The "same line, different feature" merge:**

Both sides changed a JSX prop, an object key, or a function parameter for their own feature reasons. Apply BOTH changes:

```typescript
// develop baseline:
<Table columns={baseColumns} data={candidates} />

// Feature A (staging) added: onRowClick handler
<Table columns={baseColumns} data={candidates} onRowClick={handleSelect} />

// Feature B (incoming) added: loading state
<Table columns={baseColumns} data={candidates} loading={isLoading} />

// CORRECT — both features' additions:
<Table columns={baseColumns} data={candidates} onRowClick={handleSelect} loading={isLoading} />
```

### Step 4 — Write the integrated version

The integrated file is NOT "ours" or "theirs". It is a new version that satisfies both features.

Structure guide:
- **Imports:** All imports from both features (no duplicates, alphabetically sorted within each import group)
- **Types/interfaces:** All types from both features; if both extend the same base type, merge the properties
- **State declarations:** All state from both features
- **Effects/handlers:** All handlers from both features (rename if they collide: `handleSelectA` vs `handleSelectB` — then ask which name is canonical)
- **JSX:** All UI elements from both features; follow the layout design intent of each feature for placement
- **API calls:** All API calls from both features; do not merge them into one call unless they truly share an endpoint

### Step 5 — Stage and complete the merge

```bash
git add <filepath>
# After all files are resolved:
git merge --continue
# Or if the message is pre-filled:
git commit
```

---

## Common Scenarios

### Both features added a new menu item / tab / button

```tsx
// Feature A added "Bulk Reset" button:
<div className="flex gap-2">
  <Button onClick={handleBulkReset}>Bulk Reset</Button>
</div>

// Feature B added "Export CSV" button:
<div className="flex gap-2">
  <Button onClick={handleExport}>Export CSV</Button>
</div>

// CORRECT — both buttons:
<div className="flex gap-2">
  <Button onClick={handleBulkReset}>Bulk Reset</Button>
  <Button onClick={handleExport}>Export CSV</Button>
</div>
```

### Both features added a new API call in the same useEffect

```typescript
// Feature A:
useEffect(() => {
  fetchCandidates()
}, [companyId])

// Feature B:
useEffect(() => {
  fetchCandidates()
  fetchDepartments()  // Feature B added this
}, [companyId])

// CORRECT — but check if Feature A also changed fetchCandidates' arguments:
useEffect(() => {
  fetchCandidates()   // preserve any changes Feature A made to this call
  fetchDepartments()  // Feature B addition
}, [companyId])
```

### Both features changed the same conditional

Rebuild the conditional to satisfy both conditions:

```typescript
// develop baseline:
if (isAdmin) { showPanel() }

// Feature A: added role check
if (isAdmin || isManager) { showPanel() }

// Feature B: added feature flag check
if (isAdmin && featureEnabled) { showPanel() }

// CORRECT — both conditions applied:
if ((isAdmin || isManager) && featureEnabled) { showPanel() }
// Note: verify with engineer if AND vs OR logic is correct for the combined case
```

---

## When to Stop and Ask

Stop and ask the engineer before resolving if:

1. **Two features register the same route or export the same function name** — one will shadow the other; a rename decision is needed.

2. **Two features change the same DB query differently** — the query's WHERE clause or JOIN structure is different; only an engineer who knows both features' data requirements can merge these correctly.

3. **The conflict is in a schema/migration file** — never auto-resolve migration conflicts; escalate to the team.

4. **The integrated result would change the behavior of either feature** — if making both features coexist requires altering how one feature works, that's a product decision, not a merge decision.

Ask:
> "Kedua fitur ini sama-sama ngubah [describe the conflicted piece]. Kalau keduanya harus ada bareng, [describe the tradeoff]. Mana yang harus jadi prioritas, atau gimana harusnya keduanya koeksistensi?"

---

## What NOT to Do

```bash
# ❌ NEVER — drops Feature A from staging
git checkout --theirs src/components/CandidateTable.tsx

# ❌ NEVER — drops Feature B before it even lands
git checkout --ours src/components/CandidateTable.tsx

# ❌ NEVER — "this is the newer feature so it wins"
# Age is irrelevant. Both are intended to ship together.

# ❌ NEVER — resolve by commenting out one feature's code
// // Feature A code (temporarily disabled)
// This is not a merge, it's a deletion with a note.
```
