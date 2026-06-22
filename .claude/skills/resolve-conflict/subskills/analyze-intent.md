# Analyze Intent

Before touching any conflict marker, understand what EACH side was trying to accomplish. This is the most important step — a conflict can only be resolved correctly if you understand the semantic purpose of both changes.

---

## The Core Question for Every Conflict Block

For every `<<<<<<< ... >>>>>>> ` block in every file, answer:

1. **What was "ours" (HEAD) trying to do?** — What feature, fix, or behavior does this code implement?
2. **What was "theirs" (incoming) trying to do?** — What different feature, fix, or behavior does this code implement?
3. **Are they editing the same line for different reasons, or is one a superset of the other?**
4. **What does the `staging` baseline look like at this point?** — Is one side closer to staging (i.e., it just hasn't received the other's changes yet)?

---

## Reading Conflict Markers

A conflict block looks like:

```
<<<<<<< HEAD
  // our version (current branch or current tip)
=======
  // their version (incoming branch)
>>>>>>> feature/AS-XXXX
```

With `git rebase`, the labels are **reversed** from what you'd expect:
- `<<<<<<< HEAD` = **theirs** (the branch being rebased onto, i.e. `develop`)
- `>>>>>>> feature/AS-XXXX` = **ours** (the feature branch commits being replayed)

With `git merge` (staging scenario):
- `<<<<<<< HEAD` = **ours** (the branch you're currently on, usually `staging`)
- `>>>>>>> feature/AS-XXXX` = **theirs** (the branch being merged in)

**Always confirm orientation before resolving.** A wrong assumption here silently deletes the wrong person's work.

To confirm which is which:
```bash
# During rebase:
cat .git/rebase-merge/head-name   # shows branch being rebased onto (develop)
cat .git/rebase-merge/orig-head   # shows original feature branch HEAD

# During merge:
git log --oneline HEAD -3
git log --oneline MERGE_HEAD -3
```

---

## Pattern: Classify Each Conflict Block

For each conflict block, classify it into one of these patterns:

### Pattern 1 — Independent Additions (most common in staging merges)
Both sides added different things to the same area (e.g., both added a new import, or both added a new function).
- **Resolution:** Keep both. Order: whichever is logically upstream first (e.g., imports alphabetically, functions in call order).

### Pattern 2 — Different Edit to the Same Line
Both sides modified the same existing line for different reasons (e.g., one updated a prop name, one added a new prop).
- **Resolution:** Merge the edits. Apply both changes to the line simultaneously.

### Pattern 3 — One Side Extended, Other Side Fixed
One side added new logic (feature), the other side fixed a bug in the original code.
- **Resolution:** Apply the bug fix first, then apply the feature extension on top of the fixed code.

### Pattern 4 — Diverged Refactor vs Feature
One side renamed/restructured a function while the other side added logic to the old structure.
- **Resolution:** Apply the rename/restructure, then re-apply the new logic inside the new structure.

### Pattern 5 — Same Logic, Different Implementation
Both sides solve the same problem differently (true semantic conflict).
- **Resolution:** Stop and ask the engineer:
  > "Ini ada dua implementasi yang berbeda untuk hal yang sama. Mana yang harus dipakai — punya kamu atau punya [teammate]? Jangan di-resolve otomatis."

---

## Output to Pass Forward

For each conflicted file, produce:

```
file: src/components/CandidateTable.tsx
conflict_blocks: 2

block_1:
  ours_intent: "Add 'bulk reset' button to toolbar — feature AS-6895"
  theirs_intent: "Add 'invite all' button to toolbar — feature AS-6780"
  pattern: Pattern 1 — Independent Additions
  safe_to_auto_merge: true

block_2:
  ours_intent: "Change query param from candidateId to candidate_id"
  theirs_intent: "Change query param from candidateId to id"
  pattern: Pattern 5 — Same Logic, Different Implementation
  safe_to_auto_merge: false
  needs_human: true
  question: "Mana nama param yang benar — candidate_id atau id? Ini ngaruh ke API contract."
```

Pass this to the appropriate resolve subskill.
