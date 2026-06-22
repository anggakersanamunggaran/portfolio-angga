---
name: resolve-conflict
description: "Safely resolves git merge conflicts without dropping anyone's changes. Triggers on: 'ada conflict', 'merge conflict', 'konflik', 'conflict pas rebase', 'conflict di staging', 'resolve conflict', 'fix conflict', 'bentrok', 'ada yang bentrok', 'conflict saat rebase', 'conflict saat pull', 'conflict waktu merge ke staging'. Enforces: NEVER use git checkout --ours or --theirs; NEVER accept one side only; always merge both sides semantically; use staging as baseline reference for feature-vs-develop conflicts; treat staging merges as two independent features that must coexist in the same file."
model: inherit
background: false
allowed-tools: Read, Edit, Write, Bash
---

# Resolve Conflict

**This skill is the safe guard against AI-assisted conflict mistakes.**

The most common team error: an engineer (or AI tool) hits a conflict and just picks one side — either "accept ours" or "accept theirs" — which silently deletes a teammate's work. This skill prevents that.

**Two conflict scenarios, two different strategies:**

| Scenario | When | Strategy |
|---|---|---|
| **Feature vs develop** | `git rebase develop` or `git pull develop` on a feature branch | Preserve both: your feature code + all changes already in develop. Use `staging` as the common ancestor reference. |
| **Feature vs staging** | Merging your feature branch into `staging` | Treat as two independent features. Both must fully coexist. Neither side overwrites the other. |

**Triggers:**
- "ada conflict", "konflik", "conflict pas rebase", "conflict di staging"
- "resolve conflict", "fix conflict", "bentrok", "ada yang bentrok"
- Git output contains `CONFLICT (content)` or `<<<<<<< HEAD`
- Engineer is about to run or just ran `git rebase develop`, `git pull develop`, or `git merge <branch> staging`

**HARD RULES — never break these:**
- ❌ Never run `git checkout --ours <file>` or `git checkout --theirs <file>`
- ❌ Never accept an entire file from one side only
- ❌ Never delete a `<<<<<<` block by just keeping the top or bottom half
- ❌ Never assume "the newer code is right" — both sides are right for their feature
- ✅ Always read what BOTH sides are trying to accomplish before touching anything
- ✅ Always verify the merged result contains logic from both sides

---

## Mandatory Flow (do not skip steps)

1. **Diagnose** — Read [./subskills/diagnose.md](./subskills/diagnose.md) — identify conflict type, branch context, list all conflicted files
2. **Analyze** — Read [./subskills/analyze-intent.md](./subskills/analyze-intent.md) — for each file, extract what each side changed and WHY
3. **Resolve** — Choose the correct subskill based on conflict type:
   - Feature vs develop → Read [./subskills/resolve-rebase.md](./subskills/resolve-rebase.md)
   - Feature vs staging → Read [./subskills/resolve-staging.md](./subskills/resolve-staging.md)
4. **Verify** — Read [./subskills/verify.md](./subskills/verify.md) — confirm no markers remain, both sides' logic is intact

**Steps 1–2 are sequential. Step 3 picks one path. Step 4 always runs.**

---

## Branch Model Context

```
main        ← production releases only
develop     ← integration branch, always ahead of main
staging     ← pre-release testing, fed by feature branches
feature/*   ← individual ticket branches, branch off from develop
```

When rebasing a feature on `develop`: staging is the stable reference baseline.
When merging a feature into `staging`: staging already has other features — both must survive.
