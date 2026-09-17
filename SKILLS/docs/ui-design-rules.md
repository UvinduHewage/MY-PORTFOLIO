# UI Design Rules — Adding New Features

**Purpose:** when a developer adds a new feature, this governs how its UI gets designed — extend and reuse what already exists, don't rebuild from scratch. Follow this before writing any new component.

---

## 1. Before You Start — Check What Already Exists

In this order, before writing a single line of new UI:

1. Is there a **shadcn primitive** that already does this? (`/components/ui`)
2. Is there a **shared composed component** that does this or something close? (`/components/shared`)
3. Does an **existing feature** already solve a similar UI problem (a table, a multi-step form, a filter bar)? Copy its pattern, don't reinvent it.

Only if none of the above fit do you build something new — and if it's reusable, it goes into `/components/shared`, not buried inside one feature folder.

---

## 2. Design Tokens — Use, Don't Invent

| Token type | Rule |
|---|---|
| Colors | Use the CSS variables already defined (`--primary`, `--secondary`, `--muted`, `--destructive`, `--accent`, `--border`). Never hardcode a hex value in a component. |
| Spacing | Stick to Tailwind's default scale (`p-1` → `p-16`, i.e. 4px increments). No arbitrary values (`p-[13px]`) unless there's a documented reason. |
| Typography | Use the existing type scale (`text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`). Don't introduce a one-off font size. |
| Radius | Use the existing `--radius` token, don't set custom `rounded-[Npx]` per component. |
| Shadows | Use the existing elevation utility classes, don't invent new box-shadow values. |

If a new feature genuinely needs a token that doesn't exist (e.g. a new status color), add it to the shared theme config — don't hardcode it locally.

---

## 3. Component Reuse Hierarchy

Always prefer the option higher on this list:

1. **Use a shadcn primitive as-is**
2. **Use an existing shared component** (`Button`, `DataTable`, `FormField`, `PageHeader`, etc.)
3. **Compose a new pattern from primitives** — if it's reusable, promote it to `/components/shared` immediately, don't leave it duplicated inside one feature
4. **Build a bespoke one-off** — last resort only, and flag it in the PR for review since it's the thing most likely to drift from the design system

---

## 4. Page Layout Conventions

Every new feature page follows the same shell:

- Same page container `max-width` and horizontal padding as existing pages
- Same page header pattern: title + description (optional) + action buttons row, right-aligned
- Same breadcrumb pattern for nested pages
- Same vertical spacing rhythm between sections/cards (don't eyeball a new gap value)

---

## 5. Data Display Conventions

| Pattern | Rule |
|---|---|
| Tables | Reuse the shared `DataTable` component (search, sort, pagination already built in) — don't build a new `<table>` from scratch |
| Forms | `react-hook-form` + `zod`, wrapped in the shared `FormField` component for consistent label/error/help-text layout |
| Empty states | Use the shared empty-state component (icon + message + optional CTA), not an ad hoc "No data" string |
| Loading states | Use the shared skeleton loader pattern for content areas; use inline spinners only for button-level actions |
| Errors | Use the shared error banner/toast pattern — don't roll a one-off error box per feature |

---

## 6. Interaction Patterns

- **Destructive actions** (delete, cancel, discard) → always confirm via the shared `AlertDialog`, never a bare `confirm()` or no confirmation at all
- **Feedback** (success/error after an action) → use the shared toast (Sonner) consistently, not mixed inline messages
- **Dialog vs. Drawer/Sheet** — short single-step forms use `Dialog`; anything multi-step or content-heavy uses `Sheet`/`Drawer`
- **Multi-step flows** → reuse the existing stepper pattern rather than building a new wizard UI per feature

---

## 7. Responsive Rules

- Every new screen is built mobile-first and checked at the project's standard breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`)
- Any new table/dense-data view must define a mobile fallback (card layout or a documented horizontal-scroll container) — don't ship a table that only works on desktop
- Don't add breakpoints outside Tailwind's defaults without a specific, documented reason

---

## 8. Accessibility Requirements

- Every interactive element must be reachable and operable by keyboard
- Every form field has a real `<label>` — placeholder text is not a substitute for a label
- Icon-only buttons require an `aria-label`
- Status/state is never conveyed by color alone — pair it with an icon or text (e.g. not just a red dot, but "Overdue" + red)

---

## 9. Naming & File Placement

- Reusable component → `/components/shared/`, PascalCase filename matching the component name
- Feature-only component → `/features/<feature-name>/components/`
- Match existing suffix conventions where they exist (`*Card`, `*Form`, `*Table`, `*Dialog`) so component names are predictable across the codebase

---

## 10. New Feature UI Checklist

Before opening a PR for a new feature's UI:

- [ ] Checked for an existing component/pattern before building anything new
- [ ] Used design tokens only — no hardcoded colors, spacing, or radii
- [ ] Followed the standard page layout (header, breadcrumb, spacing rhythm)
- [ ] Reused `DataTable` / `FormField` / `Dialog`/`AlertDialog` patterns where applicable
- [ ] Added loading, empty, and error states — not just the happy path
- [ ] Tested at mobile, tablet, and desktop breakpoints
- [ ] Keyboard navigation and labels checked
- [ ] Any new shared-worthy component was promoted to `/components/shared` and not left duplicated
