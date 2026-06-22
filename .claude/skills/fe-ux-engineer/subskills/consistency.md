# Consistency Check

Before writing or reviewing any UI code, run this check to ensure new work matches the established codebase patterns. This prevents token drift and visual inconsistency across pages.

---

## Step 1 — Read Tailwind Config

Always read `tailwind.config.ts` to know the current token set before writing any class. The available ASTRNT tokens are documented in **Section A** below, but the file is authoritative if it changes.

---

## Section A — ASTRNT Design Tokens (from tailwind.config.ts)

### Color Tokens

**RULE: Never use raw hex values in component code. Always use the Tailwind token names below.**

| Token | Value | Use for |
|-------|-------|---------|
| `navy-50` | `#F0F6FE` | Hover background, avatar bg, light highlight |
| `navy-100` | `#DCEAFD` | Light blue bg, secondary highlight |
| `navy-200` | `#C1DBFC` | Border blue, inactive indicator |
| `navy-400` | `#65A5F5` | Active icon (blue) |
| `navy-600` | `#2C65E4` | Link, strong accent |
| `navy-950` | `#18244E` | Primary navy, page title, active nav text |
| `neutral-50` | `#FAFAFA` | Sidebar bg, panel bg |
| `neutral-100` | `#F5F5F5` | Light bg, skeleton bg |
| `neutral-200` | `#E6E6E6` | Divider, separator line |
| `neutral-300` | `#D6D6D6` | Disabled border |
| `neutral-400` | `#A5A5A5` | Placeholder text |
| `neutral-500` | `#767676` | Muted text, icon color |
| `neutral-700` | `#434343` | Secondary text |
| `neutral-900` | `#1A1A1A` | Near-black body text |
| `neutral-950` | `#000000` | True black |
| `grey-indigo-50` | `#F8F9FE` | Body/page background |
| `as-red-50` | `#FDF3F3` | Error/danger bg |
| `as-red-600` | `#C04051` | Error/danger text, destructive |
| `as-yellow-50` | `#FFFBF0` | Warning bg |
| `as-yellow-700` | `#AD4D10` | Warning text |
| `teal-dark-50` | `#EFF9F9` | Success/info bg |
| `teal-dark-500` | `#43969D` | Success/info, ADM role color |

**Semantic tokens (use these for role-based intent):**

| Token | Use for |
|-------|---------|
| `primary` / `primary-foreground` | Primary button bg/text |
| `destructive` / `destructive-foreground` | Destructive action button |
| `brand` / `brand-hover` / `brand-light` / `brand-border` | Brand-colored elements |
| `ta-*` | Talent Acquisition role-themed elements |
| `tm-*` | Team Member role-themed elements |
| `adm-*` | Admission role-themed elements |
| `muted-foreground` | Secondary/muted text (shadcn CSS var) |
| `border` | Standard border (shadcn CSS var) |

**Common substitution map (existing raw hex → correct token):**

| Raw hex in code | Use this instead |
|-----------------|-----------------|
| `#18244e` / `#18244E` | `navy-950` or `primary` |
| `#f0f6fe` / `#F0F6FE` | `navy-50` |
| `#c1dbfc` / `#C1DBFC` | `navy-200` |
| `#4283ef` | `navy-400` (closest) |
| `#737373` | `neutral-500` |
| `#404040` | `neutral-700` |
| `#0a0a0a` | `neutral-900` |
| `#e5e5e5` | `neutral-200` |
| `#fafafa` | `neutral-50` |
| `#f8f9fe` | `grey-indigo-50` |
| `#223b86` | `navy-600` (closest) |

### Spacing Tokens

Use the named spacing scale — not arbitrary values:

| Token | Value | Tailwind class pattern |
|-------|-------|------------------------|
| `3xs` | 2px | `p-3xs`, `gap-3xs` |
| `2xs` | 4px | `p-2xs`, `gap-2xs` |
| `xs` | 6px | `p-xs`, `gap-xs` |
| `sm` | 8px | `p-sm`, `gap-sm` |
| `md` | 12px | `p-md`, `gap-md` |
| `lg` | 16px | `p-lg`, `gap-lg` |
| `xl` | 20px | `p-xl`, `gap-xl` |
| `2xl` | 24px | `p-2xl`, `gap-2xl` |
| `3xl` | 32px | `p-3xl`, `gap-3xl` |
| `4xl` | 48px | `p-4xl`, `gap-4xl` |
| `5xl` | 64px | `p-5xl`, `gap-5xl` |

### Border Radius Tokens

| Token | Value | Use for |
|-------|-------|---------|
| `rounded-xs` | 2px | Tags, tiny elements |
| `rounded-sm` | 4px | Inputs, small components |
| `rounded` (DEFAULT) | 6px | Buttons, form fields |
| `rounded-md` | 8px | Cards, modals |
| `rounded-lg` | 12px | Large cards, panels |
| `rounded-xl` | 16px | Drawers, sheets |
| `rounded-full` | 9999px | Avatars, badges, pills |

### Layout Tokens

| Token | Use |
|-------|-----|
| `h-header` (48px) | Header height — all sticky headers use this |
| `w-sidebar` (240px) | Sidebar expanded width |
| `w-sidebar-sm` (56px) | Sidebar collapsed width |

---

## Section B — Component Patterns

Check that new code uses these established patterns. Read 2–3 existing examples from `src/components/` before writing a similar component.

### Buttons

Always use `<Button>` from `src/components/ui/button.tsx`. Never create a raw `<button>` for primary/secondary actions.

| Action type | Variant | Example |
|------------|---------|---------|
| Primary CTA | `default` | `<Button>Save</Button>` |
| Cancel / secondary | `outline` | `<Button variant="outline">Cancel</Button>` |
| Danger action | `destructive` | `<Button variant="destructive">Delete</Button>` |
| Subtle / tertiary | `ghost` | `<Button variant="ghost">View</Button>` |
| Text link | `link` | `<Button variant="link">Learn more</Button>` |
| Loading state | `default` + `disabled` | `<Button disabled><Loader2 className="animate-spin" />Saving…</Button>` |

Size: default (`h-9`) for most actions, `sm` for compact rows/tables, `lg` for full-width CTAs.

### Modals / Dialogs

Always use `<Dialog>` from `src/components/ui/dialog.tsx` (shadcn). Never create custom modals with `fixed inset-0` and `z-[9999]`.

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Optional description</DialogDescription>
    </DialogHeader>
    {/* body */}
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleConfirm}>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

Destructive confirm dialogs: use `<Button variant="destructive">` in footer. Single primary action only.

### Sheet / Drawer

Use `<Sheet>` from `src/components/ui/sheet.tsx` for slide-in panels.

```tsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Panel Title</SheetTitle>
    </SheetHeader>
    {/* content */}
  </SheetContent>
</Sheet>
```

### Form Inputs

Always use `<Input>` / `<Textarea>` / `<Select>` from `src/components/ui/`. Add `<label>` with `text-sm font-medium` above every input.

```tsx
<div className="flex flex-col gap-sm">
  <label className="text-sm font-medium text-neutral-900">Full Name</label>
  <Input placeholder="e.g. John Doe" />
  <p className="text-xs text-neutral-500">Used for display only</p>
</div>
```

### Cards / List Items

Consistent card shell:

```tsx
<div className="bg-white border border-neutral-200 rounded-md p-lg flex flex-col gap-md">
  {/* content */}
</div>
```

Hover state for clickable cards:

```tsx
<div className="... hover:bg-navy-50 hover:border-navy-200 transition-colors cursor-pointer">
```

### Navigation Active State

Always use both color AND weight for active state — never color alone:

```tsx
className={cn(
  "flex items-center gap-sm px-md py-xs rounded text-sm transition-colors",
  isActive
    ? "bg-navy-50 text-navy-950 font-medium"
    : "text-neutral-700 font-normal hover:bg-navy-50 hover:text-navy-950"
)}
```

### Empty States

Consistent empty state structure:

```tsx
<div className="flex flex-col items-center gap-md py-4xl text-center">
  <Icon className="size-10 text-neutral-300" />
  <div className="flex flex-col gap-xs">
    <p className="text-sm font-medium text-neutral-700">No items yet</p>
    <p className="text-xs text-neutral-500">Get started by creating your first item.</p>
  </div>
  <Button size="sm">Create Item</Button>
</div>
```

### Loading / Skeleton States

Use `animate-pulse` with `bg-neutral-100` for skeletons. Never show a blank white area while loading.

```tsx
<div className="animate-pulse flex flex-col gap-sm">
  <div className="h-4 w-48 rounded bg-neutral-100" />
  <div className="h-4 w-full rounded bg-neutral-100" />
  <div className="h-4 w-3/4 rounded bg-neutral-100" />
</div>
```

### Badges / Status Indicators

Use `<Badge>` from `src/components/ui/badge.tsx`. Define variant semantics:

| Status | Classes |
|--------|---------|
| Active / Published | `bg-teal-dark-50 text-teal-dark-700 border-teal-dark-200` |
| Draft | `bg-neutral-100 text-neutral-700 border-neutral-200` |
| Closed / Inactive | `bg-as-red-50 text-as-red-600 border-as-red-100` |
| Warning | `bg-as-yellow-50 text-as-yellow-700` |

---

## Section C — Consistency Audit Checks

When reviewing existing code, flag these violations:

| Issue | Flag as | Fix |
|-------|---------|-----|
| Raw hex color in className | `[CONST-C1]` | Replace with Tailwind token from Section A |
| `style={{ color: "#..." }}` inline | `[CONST-C2]` | Move to className with token |
| Custom `<button>` instead of `<Button>` | `[CONST-C3]` | Replace with shadcn `<Button>` + correct variant |
| Custom modal with `fixed inset-0` | `[CONST-C4]` | Rewrite as shadcn `<Dialog>` |
| Arbitrary spacing `p-[13px]` or `gap-[7px]` | `[CONST-C5]` | Round to nearest token |
| Arbitrary radius `rounded-[3px]` | `[CONST-C6]` | Use named radius token |
| Different icon library (not lucide-react) | `[CONST-C7]` | Replace with lucide-react equivalent |
| Active nav state with color only | `[CONST-C8]` | Add weight (`font-medium`) alongside color |
| Loading state shows blank area | `[CONST-C9]` | Add `animate-pulse` skeleton |
| Card uses inconsistent border/bg | `[CONST-C10]` | Use `border-neutral-200 bg-white rounded-md` |

---

## Section D — Before Writing New Code

Run this checklist mentally before writing any new component:

1. Read 1–2 existing similar components in `src/components/` to match their structure
2. Check that every color you plan to use has a token name in Section A
3. Check that every spacing you plan to use maps to the custom spacing scale
4. Confirm the component type has an established pattern in Section B — use it
5. If you're adding a new pattern not in Section B, it becomes the new standard — document it in a comment

Output format for consistency findings:

```
[CONST-C1] src/components/foo.tsx:32 — bg-[#18244e] → bg-navy-950
[CONST-C3] src/components/bar.tsx:17 — raw <button> for primary action → <Button variant="default">
```
