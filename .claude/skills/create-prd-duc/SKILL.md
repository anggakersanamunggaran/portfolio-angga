---
name: create-prd-duc
description: "Creates a paired PRD + DUC in Confluence and matching Jira tickets (ASD project) for any platform-wide design or UX convention. Triggers when: engineer says 'create PRD', 'buat PRD', 'create DUC', 'buat DUC', 'create PRD and DUC', 'document this convention', 'bikin dokumen', or when a new platform-wide standard needs to be established (action order, terminology, component patterns, etc.). Reads existing PRD/DUC reference pages to match format exactly, looks up relevant CUC pages, reads competitive landscape docs, proposes a plan for approval, then creates Jira tickets + Confluence pages + updates ticket descriptions with doc links."
model: inherit
background: false
allowed-tools: Read, Bash, mcp__atlassian__getConfluencePage, mcp__atlassian__searchConfluenceUsingCql, mcp__atlassian__createConfluencePage, mcp__atlassian__createJiraIssue, mcp__atlassian__editJiraIssue, mcp__atlassian__lookupJiraAccountId
---

# Create PRD + DUC

This skill creates a complete paired PRD (Product Requirements Document) and DUC (Design Use Case Document) for any platform-wide convention or feature — matching ASTRNT's existing document format exactly, with CUC references and competitive context always included.

**Triggers:**
- Engineer says "create PRD", "buat PRD", "create DUC", "buat DUC", "create PRD and DUC", "bikin dokumen"
- A new platform-wide standard or convention needs to be documented (action order, copy rules, component patterns, etc.)
- Engineer explicitly invokes `/create-prd-duc`

---

## Mandatory Flow (do not skip steps)

### Step 1 — Clarify & Show Plan (ALWAYS first)

Before doing anything, present a short clarification summary to the engineer showing exactly what you're about to create. Use this format:

```
Here's what I'll create:

**PRD**
- Title: PRD: [topic] — [subtitle]
- Confluence: PRD folder (matches existing PRD format)
- Jira: ASD project, label `PRD`, assigned to januar@astrnt.co

**DUC**
- Title: DUC: [topic] — [scope] (Phase 1)
- Confluence: DUC folder (matches existing DUC format)
- Jira: ASD project, label `DesignUseCaseDocument`, assigned to januar@astrnt.co

**Both tickets:**
- Due date: [date from user, or ask]
- Description: summary + `Link to Doc: _TBA_` at top (updated to real URL after pages are created)

**What I'll cover in the PRD:**
- [3–5 bullet points of the proposed convention rules]

**What I'll cover in the DUC Phase 1:**
- [target page/surface]
- [specific changes: N items]

Shall I proceed?
```

Wait for confirmation before continuing.

---

### Step 2 — Read Reference Documents

Read both reference documents in parallel to match format exactly:

- **PRD reference:** Page ID `2735865860` — PRD: Content Terminology
- **DUC reference:** Page ID `2736291853` — DUC: Content Terminology Phase 1

Use `mcp__atlassian__getConfluencePage` with `contentFormat: markdown` for both.

Note the exact structure: metadata table, section numbering, status lozenges, table patterns, task list format, references section.

---

### Step 3 — Look Up Relevant CUCs (MANDATORY)

Search all three CUC folders to find CUCs whose persona, trigger, or workflow is served by this feature.

Run all three searches in parallel:

```
CQL: title ~ "CUC-TA" AND space.key = "PRD" AND type = page
CQL: title ~ "CUC-TM" AND space.key = "PRD" AND type = page
CQL: title ~ "CUC-UA" AND space.key = "PRD" AND type = page
```

CUC folder links (for reference in the docs):
- TA: https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2558492680
- TM: https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2558132235
- UA: https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2557509666

For each CUC found, classify it as:
- **Primary** — the feature directly enables or unblocks this CUC workflow
- **Secondary** — the feature improves an adjacent step in this CUC

Include ALL primary CUCs and only the most relevant secondary ones (max 3).

The CUC References table goes directly after the PRD metadata table, before §1 Executive Summary. Format:

| CUC | Use Case | Segment | Relevance |
|-----|----------|---------|-----------|
| [CUC-XX-NN](link) | [Name] | TA/TM/UA | **Primary** — [one sentence] |

---

### Step 4 — Read Competitive Landscape (MANDATORY)

Read the competitive intelligence files to find competitors relevant to this feature:

```
/home/angga/work/astronaut/astrnt-workspace-memory/architecture/COMPETITIVE_LANDSCAPE.md
/home/angga/work/astronaut/astrnt-workspace-memory/architecture/COMPETITIVE_INTELLIGENCE_TA_TIER1.md
/home/angga/work/astronaut/astrnt-workspace-memory/architecture/COMPETITIVE_INTELLIGENCE_TA_TIER2.md
/home/angga/work/astronaut/astrnt-workspace-memory/architecture/COMPETITIVE_INTELLIGENCE_TM.md
```

Extract:
1. Which competitors address the same problem — and how
2. Where ASTRNT has a structural advantage (capability, segment access, pricing, localization)
3. Which CUC segments are underserved or at risk from a competitor

Write the Competitive Context section as **§2.4** inside Problem Statement. It must contain:
- A brief paragraph on how competitors approach this problem
- A comparison table: Competitor | Approach | Overlap | ASTRNT Advantage
- 3–4 strategic bullet points explaining why this feature strengthens ASTRNT's position

The DUC gets a shorter version of this as a standalone `## Competitive Context` section after Business Context — focus on the use-case level implications, not the full landscape.

---

### Step 5 — Audit the Codebase (if needed)

If the convention requires evidence from the codebase (e.g. action order, copy inconsistencies), grep the relevant files:

- Search `src/app` and `src/components` for the pattern in question
- Collect before/after examples for the DUC spec table
- Note file paths and line numbers

Skip this step if the engineer has already provided the spec.

---

### Step 6 — Create Jira Tickets (in parallel)

Create both ASD tickets simultaneously using `mcp__atlassian__createJiraIssue`:

**PRD ticket:**
- `projectKey`: ASD
- `issueTypeName`: Task
- `summary`: `PRD: [topic] — [subtitle]`
- `assignee_account_id`: `5e6ef94786a16d0c3e6a1332` (januar@astrnt.co)
- `additional_fields`: `{"labels": ["PRD"], "duedate": "YYYY-MM-DD"}`
- `description`: `Link to Doc: _TBA_\n\n## Summary\n\n[summary text]`

**DUC ticket:**
- `projectKey`: ASD
- `issueTypeName`: Task
- `summary`: `DUC: [topic] — [Jira key]`
- `assignee_account_id`: `5e6ef94786a16d0c3e6a1332` (januar@astrnt.co)
- `additional_fields`: `{"labels": ["DesignUseCaseDocument"], "duedate": "YYYY-MM-DD"}`
- `description`: `Link to Doc: _TBA_\n\n## Summary\n\n[summary text]`

---

### Step 7 — Create Confluence Pages (sequentially — PRD first, then DUC)

**PRD page:**
- `spaceId`: `2463727621`
- `parentId`: `2674753537` (PRD folder)
- Use the exact metadata table structure from the reference PRD
- Sections (in order):
  1. Metadata table
  2. **CUC References** (from Step 3 — MANDATORY, never skip)
  3. §1 Executive Summary
  4. §2 Problem Statement → 2.1 User Pain Point → 2.2 Current vs Desired → 2.3 Evidence → **2.4 Competitive Context** (from Step 4 — MANDATORY)
  5. §3 Proposed Solution (with wireframes if applicable)
  6. §4 Phasing
  7. §5 Scope
  8. §6 Technical Requirements
  9. §7 Risks
  10. §8 Launch Plan
  11. §9 Open Questions
  12. §10 Stakeholders
  13. §11 Decisions NOT to Relitigate
  14. §12 Next Up (task list)
  15. References
- Status lozenges: Draft (yellow) for Status; Planned (blue/neutral) for phases
- Link DUC Jira ticket in the "Related DUC" row of the metadata table

**DUC page:**
- `spaceId`: `2463727621`
- `parentId`: `2674851841` (DUC folder)
- **Title format:** `DUC: [Feature Name] — [Jira Key]` — always include the Jira key
- Use the exact metadata table structure from the reference DUC
- Metadata table must include rows: Use Case ID, Use Case Name, Feature Category, Priority, Complexity, Last Revised, Revision Context, Depends On, **Jira (M1)**, **Sprint Ticket**, Blocks
- Sections (in order):
  1. Metadata table
  2. Brief Description (with convention summary bullets)
  3. Business Context
  4. **Competitive Context** (from Step 4 — shorter version, use-case focused — MANDATORY)
  5. Root Cause Analysis
  6. Solution Approach (reuse vs new code table)
  7. §1 User Type/Job
  8. §2 Goal
  9. §3 Implementation Spec:
     - 3A New Files (table: #, File, Notes)
     - 3B Modified Files (table: #, File, Change)
     - 3C DB Schema (existing tables + new/modified columns)
     - 3D Logic/Flow Spec (pseudocode in `<pre><code>` blocks)
     - **3E Wireframes (MANDATORY — ASCII art in `<pre><code>` blocks)**
  10. §4 Trigger/Entry Point
  11. §5 Competitor Analysis
  12. §6 Unhappy Path/Edge Cases
  13. §7 Constraints & Requirements
  14. §8 Open Questions
  15. §9 Success Criteria
  16. Dictionary table
  17. References
- Link PRD Confluence page in the "Depends On" row of the metadata table

**Wireframes (§3E) — mandatory rules:**
- One `<pre><code>` block per UI component (dialog, modal, page section, etc.)
- Show every meaningful UI state: idle, uploading/loading, success, error, empty state
- Use box-drawing characters: `┌─┐ │ └─┘ ├─┤`
- Label each state clearly: `State A — [description]`
- Add a note line after the block for any non-obvious constraint or behaviour
- Example structure:
  ```
  <p><strong>Component N: [Name] — [Context]</strong></p>
  <pre><code>
  State A — [label]
  ┌─────────────────────────────────────────────────────────────────┐
  │ Dialog Title                                               [×]  │
  ├─────────────────────────────────────────────────────────────────┤
  │  [UI elements...]                                               │
  │  [     Cancel     ]              [   Primary Action    ]        │
  └─────────────────────────────────────────────────────────────────┘

  State B — [label]
  ┌─────────────────────────────────────────────────────────────────┐
  │ ...                                                              │
  └─────────────────────────────────────────────────────────────────┘
  Note: [constraint or behaviour]
  </code></pre>
  ```

---

### Step 8 — Update Jira Descriptions with Real Doc Links (in parallel)

Once both Confluence pages are created, update both Jira ticket descriptions using `mcp__atlassian__editJiraIssue`:

- Replace `Link to Doc: _TBA_` with `Link to Doc: [actual Confluence URL]`
- Keep the rest of the description intact

---

### Step 9 — Report Results

Output a clean summary:

```
Done. Here's what was created:

**Jira:**
- [ASD-XXX](url) — PRD, label `PRD`, due [date]
- [ASD-YYY](url) — DUC Phase 1, label `DesignUseCaseDocument`, due [date]

**Confluence:**
- [PRD: title](url)
- [DUC: title](url)

CUC references included: [N CUCs — list codes]
Competitive context: [N competitors covered]

Both Jira descriptions updated with live doc links.
Next: review PRD draft, then implement DUC Phase 1 changes.
```

---

## Key Constants

| Item | Value |
|---|---|
| Default assignee account ID | `5e6ef94786a16d0c3e6a1332` (januar@astrnt.co) |
| Confluence space ID | `2463727621` |
| PRD folder parent ID | `2674753537` |
| DUC folder parent ID | `2674851841` |
| PRD reference page ID | `2735865860` |
| DUC reference page ID | `2736291853` |
| Jira PRD label | `PRD` |
| Jira DUC label | `DesignUseCaseDocument` |
| TA CUC folder | `https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2558492680` |
| TM CUC folder | `https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2558132235` |
| UA CUC folder | `https://astrntco.atlassian.net/wiki/spaces/PRD/folder/2557509666` |
| Competitive landscape dir | `/home/angga/work/astronaut/astrnt-workspace-memory/architecture/` |

---

## Rules

- **Always show the plan and wait for confirmation before creating anything** (Step 1 is non-negotiable)
- **Always include CUC References** — look up the three folders every time; never write a PRD without them
- **Always include Competitive Context** — read the competitive landscape files every time; never leave this section blank
- Always read the reference documents before writing pages — never guess the format
- Always create Jira tickets before Confluence pages — you need the ticket keys for cross-links
- Always update Jira descriptions after pages are created — `_TBA_` must never be left in a published ticket
- Match the exact section numbering, table structure, and status lozenge colors from the reference docs
- Never hard-code "delete" or "remove" in convention rules without checking terminology-rules.md first
- CUC classification: Primary = feature directly enables the CUC workflow; Secondary = feature improves an adjacent step
