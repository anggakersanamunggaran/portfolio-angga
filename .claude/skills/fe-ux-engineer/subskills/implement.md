# Implement UX Fixes

You receive findings from `consistency.md` and `audit.md`. Apply fixes directly to the files. Do not ask for permission to fix issues already identified in the audit.

---

## Rules Before Touching Any File

1. **Read the file first** before editing — never edit blind
2. **Consistency fixes first** — fix token drift and wrong components before flow/nav/typography changes
3. **One concern per edit** — consistency → flow → navigation → typography (separate focused edits, not one giant diff)
4. **Do not refactor unrelated code** — scope changes to audit findings only
5. **Tailwind tokens only** — no raw hex in classNames, no inline `style` props (exception: CSS variables or keyframes Tailwind cannot express)
6. **Use shadcn/ui components** — `<Button>`, `<Dialog>`, `<Sheet>`, `<Input>`, `<Badge>`, `<Separator>`, etc.

---

## Consistency Fix Patterns

### Replace raw hex with design tokens

```tsx
// Before
<div className="bg-[#18244e] text-white">…</div>
<span className="text-[#737373]">Muted</span>
<div className="border border-[#e5e5e5] bg-[#fafafa]">…</div>

// After
<div className="bg-navy-950 text-white">…</div>
<span className="text-neutral-500">Muted</span>
<div className="border border-neutral-200 bg-neutral-50">…</div>
```

### Replace raw `<button>` with shadcn `<Button>`

```tsx
// Before
<button className="bg-[#18244e] text-white px-4 py-2 rounded-lg text-sm font-medium" onClick={save}>
  Save
</button>

// After
import { Button } from "@/components/ui/button"
<Button onClick={save}>Save</Button>
```

### Replace custom modal with shadcn `<Dialog>`

```tsx
// Before — custom overlay
{open && (
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">…</div>
  </div>
)}

// After — shadcn Dialog
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader><DialogTitle>Title</DialogTitle></DialogHeader>
    {/* body */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Replace arbitrary spacing with named tokens

```tsx
// Before
<div className="p-[13px] gap-[7px]">

// After
<div className="p-md gap-xs">   {/* md=12px, xs=6px */}
```

---

## Flow Fix Patterns

### Removing an unnecessary step

Before:
```tsx
// Step 1: Click "Add" button → opens confirmation modal
// Step 2: Click "Confirm" in modal → performs action
```

After:
```tsx
// Remove modal. Perform action directly on click.
// Add inline undo toast if action is reversible:
// toast("Item added", { action: { label: "Undo", onClick: handleUndo } })
```

### Merging two consecutive steps into one

Before: Two separate screens collecting Name then Email
After: Single screen with both fields, single submit

### Replacing a wizard step with progressive disclosure

Before:
```tsx
// Step 3 of 5: Advanced options (optional)
```

After:
```tsx
// Inline on the main form, collapsed by default
<details>
  <summary className="text-sm font-medium cursor-pointer text-muted-foreground">
    Advanced options
  </summary>
  {/* fields here */}
</details>
```

Or using shadcn/ui Collapsible:
```tsx
<Collapsible>
  <CollapsibleTrigger className="text-sm font-medium text-muted-foreground">
    Advanced options
  </CollapsibleTrigger>
  <CollapsibleContent>{/* fields */}</CollapsibleContent>
</Collapsible>
```

### Replacing confirmation dialog on non-destructive action

Before:
```tsx
<AlertDialog> // "Are you sure you want to add this?"
```

After:
```tsx
// Perform immediately, show undo:
<Button onClick={() => { performAction(); toast("Done", { action: { label: "Undo", onClick: undo } }) }}>
  Add
</Button>
```

---

## Navigation Fix Patterns

### Adding active state

```tsx
// Before — no active state
<Link href="/dashboard">Dashboard</Link>

// After — active state with color + weight
const pathname = usePathname()
<Link
  href="/dashboard"
  className={cn(
    "text-sm transition-colors",
    pathname === "/dashboard"
      ? "font-semibold text-foreground"
      : "font-normal text-muted-foreground hover:text-foreground"
  )}
>
  Dashboard
</Link>
```

### Adding a back affordance

```tsx
// In any sub-page or detail view
<button
  onClick={() => router.back()}
  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
>
  <ChevronLeft className="h-4 w-4" />
  Back
</button>
```

### Separating destructive nav items

```tsx
// Good: destructive items at the bottom with a visual separator
<Separator className="my-2" />
<button className="text-sm text-destructive hover:text-destructive/80 ...">
  Log out
</button>
```

### Fixing vague nav labels

| Before | After |
|--------|-------|
| "Items" | "Candidates" / "Questions" / "Sessions" (use the domain noun) |
| "Create" | "Create Interview" |
| "Edit" | "Edit Profile" |
| "List" | specific noun: "Interviews" |

---

## Typography Fix Patterns

### Applying the type scale

```tsx
// Page title
<h1 className="text-2xl font-bold leading-tight tracking-tight">Page Title</h1>

// Section heading
<h2 className="text-xl font-semibold leading-snug">Section</h2>

// Body
<p className="text-sm text-muted-foreground leading-relaxed">Description text here.</p>

// Form label
<label className="text-sm font-medium leading-none">Full Name</label>

// Caption / helper
<span className="text-xs text-muted-foreground">Used for display only</span>
```

### Fixing flat hierarchy (everything same size)

Identify the most important text on the page. Make it 2 steps larger than body. Make supporting text 1 step smaller than body.

```tsx
// Before: everything text-sm
<div>
  <p className="text-sm">Interview Title</p>
  <p className="text-sm">Created by John</p>
  <p className="text-sm">3 questions</p>
</div>

// After: clear hierarchy
<div>
  <p className="text-base font-semibold">Interview Title</p>
  <p className="text-sm text-muted-foreground">Created by John</p>
  <p className="text-xs text-muted-foreground">3 questions</p>
</div>
```

### Fixing low-contrast muted text

```tsx
// Too light on white background:
<p className="text-gray-300">Secondary info</p>  // FAIL

// Correct minimum for secondary text on white:
<p className="text-muted-foreground">Secondary info</p>  // = text-gray-500 in shadcn defaults
```

---

## After Applying All Fixes

List what was changed, grouped by category:

```
CHANGES APPLIED
──────────────────────────────────────────────
[CONST] src/components/foo.tsx:12 — bg-[#18244e] → bg-navy-950
[CONST] src/components/foo.tsx:34 — raw <button> → <Button variant="default">
[CONST] src/components/bar.tsx:8  — fixed inset-0 custom modal → shadcn <Dialog>
[FLOW]  Removed confirmation dialog on "Save draft" — now saves immediately with undo toast
[FLOW]  Merged "Name" and "Category" into single step — removed intermediate screen
[NAV]   Added active state to sidebar links using usePathname()
[NAV]   Added back button to detail view at src/app/interviews/[id]/page.tsx:12
[TYPE]  Upgraded page title from text-lg → text-2xl font-bold at src/app/dashboard/page.tsx:8
[TYPE]  Fixed body text contrast from text-gray-300 → text-neutral-500 at src/components/card.tsx:24
──────────────────────────────────────────────
```

If any finding could NOT be implemented (e.g. requires a design or product decision), state it explicitly:
```
NOT IMPLEMENTED: [NAV-3] — Reducing top-level nav from 9 to 7 items requires deciding which 2 sections to merge. Please confirm which items to group before I proceed.
```
