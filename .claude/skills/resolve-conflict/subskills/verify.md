# Verify Conflict Resolution

After all files have been resolved and staged, run this verification before completing the rebase/merge.

---

## Step 1 — Confirm No Conflict Markers Remain

```bash
grep -rn "<<<<<<\|=======\|>>>>>>>" src/ --include="*.ts" --include="*.tsx" --include="*.js" --include="*.json"
```

If any markers are found, do NOT continue. Go back and resolve those files.

---

## Step 2 — Confirm Both Sides' Logic Is Present

For each file that was conflicted, do a quick sanity check:

```bash
# Show what Feature A (ours) added vs develop baseline
git diff develop...HEAD -- <filepath>

# Show what Feature B (theirs) added vs develop baseline  
git diff develop...MERGE_HEAD -- <filepath>    # for merge conflicts
# OR
git diff develop...ORIG_HEAD -- <filepath>      # for rebase conflicts
```

Visually confirm the resolved file contains the meaningful additions from BOTH diffs.

If a diff shows a function, import, or component that's NOT visible in the current file content, the resolution dropped it — go back and add it.

---

## Step 3 — Type Check (if TypeScript)

```bash
npx tsc --noEmit 2>&1 | head -50
```

Fix any type errors in the resolved files before continuing. A type error often means an interface was merged incorrectly (e.g., a required prop from one side is missing).

---

## Step 4 — Lint Check

```bash
npx eslint src/ --ext .ts,.tsx --max-warnings 0 2>&1 | grep -E "error|warning" | head -30
```

Fix errors (not warnings) in the resolved files.

---

## Step 5 — Complete the Operation

**For rebase:**
```bash
git rebase --continue
# If prompted for commit message, keep the original message (don't edit it)
```

**For merge:**
```bash
git merge --continue
# Or: git commit (if merge --continue isn't available)
```

---

## Step 6 — Final Verification After Completion

```bash
# Confirm your feature commits are present
git log --oneline develop..HEAD | head -10

# Confirm teammates' commits are present  
git log --oneline HEAD..develop    # should be empty (you're ahead of or at develop)

# Spot check: a key file from your feature is correct
git show HEAD:<your_feature_key_file> | head -40
```

---

## If Something Looks Wrong

If after completing the rebase/merge you notice a function missing or logic broken:

```bash
# Find out which commit removed it
git log --all --oneline -- <filepath>
git show <commit-hash>:<filepath> | grep -n "missingFunction"
```

Do NOT force-push or reset. Create a follow-up commit that restores the missing piece, with a commit message like:
```
fix: restore [feature name] after conflict resolution — was dropped during rebase
```

Then flag it in the PR description so the reviewer knows to check that area.
