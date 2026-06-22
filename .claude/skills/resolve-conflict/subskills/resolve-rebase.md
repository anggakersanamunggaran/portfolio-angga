# Resolve: Feature vs Develop (Rebase Conflict)

Use this subskill when the conflict happened during `git rebase develop` or `git pull --rebase develop` on a feature branch.

**Situation:** Your feature branch diverged from develop. Since then, your teammates pushed changes to develop. Now your commits are being replayed on top of the updated develop, and some files have overlapping edits.

**Goal:** The final file must contain:
1. All changes already in `develop` (teammates' work) — untouched
2. All changes from your feature branch — on top of develop's state
3. Nothing removed from either side

---

## The Mental Model

Think of it as: **"develop is the new floor, your feature sits on top."**

The staging branch is your reference for what the codebase looked like before your feature branch diverged. Use it to verify which changes are "old baseline" vs "new additions from either side."

```
staging (baseline)
    ↓
develop (has teammates' changes on top of staging)
    ↓  ← you are rebasing onto here
your feature commits (being replayed)
```

---

## Resolution Process

### Step 1 — Orient the conflict markers

During rebase, the marker orientation is **inverted**:
- `<<<<<<< HEAD` = develop's version (what's already in develop)
- `>>>>>>> [your commit hash]` = your feature branch version

Confirm with:
```bash
git log --oneline develop -5
git log --oneline ORIG_HEAD -5
```

### Step 2 — For each conflict block

Apply this decision tree:

```
Is theirs (develop) the same as staging baseline?
  YES → "develop hasn't changed this part" → Keep YOUR version (it adds new feature logic on unchanged code)
  NO  → "develop changed this too" → You must merge both

Is ours (feature) the same as staging baseline?
  YES → "you haven't changed this part" → Keep THEIR version (develop's change) as-is
  NO  → Both sides changed it → Merge both
```

**The "both sides changed it" merge:**
1. Start from staging baseline as the common ground
2. Apply develop's diff to the baseline
3. Apply your feature's diff to the result
4. If the diffs touch the same lines, apply them simultaneously (both changes in one line)

### Step 3 — Write the resolved version

Edit the conflicted file directly. Remove ALL conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).

The resolved file must:
- Contain the full develop changes (no teammate's code missing)
- Contain the full feature changes (no feature code missing)
- Compile/type-check correctly (no broken imports, no duplicate declarations)

### Step 4 — Stage the resolved file

```bash
git add <filepath>
```

Do NOT run `git rebase --continue` until ALL conflicted files are resolved and staged.

### Step 5 — After all files are resolved

```bash
git rebase --continue
```

If new conflicts appear (in the next commit being replayed), repeat Steps 1–4 for each new conflict.

---

## Common Scenarios

### Both sides added an import
```typescript
// staging baseline
import { Button } from "@/components/ui/button"

// develop added:
import { Badge } from "@/components/ui/badge"

// your feature added:
import { Checkbox } from "@/components/ui/checkbox"

// CORRECT resolution — keep both imports:
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
```

### Both sides edited the same function
```typescript
// develop changed return type + added a guard:
async function getCandidates(companyId: number): Promise<Candidate[]> {
  if (!companyId) return []
  return prisma.candidates.findMany({ where: { company_id: companyId } })
}

// your feature added a new filter param:
async function getCandidates(companyId: number, status?: string): Promise<Candidate[]> {
  return prisma.candidates.findMany({ where: { company_id: companyId, status } })
}

// CORRECT resolution — merge both changes:
async function getCandidates(companyId: number, status?: string): Promise<Candidate[]> {
  if (!companyId) return []
  return prisma.candidates.findMany({ where: { company_id: companyId, status } })
}
```

### Develop deleted a line your feature modified
- **Check why develop deleted it** — was it a bug fix or a refactor?
- If it was a bug fix: your feature must be updated to not rely on the deleted code
- If it was a refactor: find the new equivalent and apply your feature's logic there
- **Never blindly restore the deleted line just to make your feature work**

---

## What NOT to Do

```bash
# ❌ NEVER — this throws away develop's changes
git checkout --ours src/components/CandidateTable.tsx

# ❌ NEVER — this throws away your feature changes
git checkout --theirs src/components/CandidateTable.tsx

# ❌ NEVER — blindly accepting "newer" code
# (the timestamps are meaningless for correctness)
```
