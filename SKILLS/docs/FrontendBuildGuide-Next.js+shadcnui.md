# Frontend Build Guide — Next.js + shadcn/ui

A start-to-finish plan for building the frontend once backend routes are developed and tested, using secure, well-maintained libraries and a mobile-first, fully responsive approach.

---

## 0. Entry Condition

Do not start frontend work until:

- [ ] All backend routes are implemented
- [ ] Routes are tested (Postman/Insomnia collection or automated tests — status codes, payload shapes, auth/error cases)
- [ ] API documentation exists (Swagger/OpenAPI, or at minimum a shared Postman collection) so the frontend can be built against a known contract instead of guessing

---

## 1. Project Setup

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-app
npx shadcn@latest init
```

Choose the **App Router** (not Pages Router) — it's the actively developed path and where the ecosystem (including shadcn examples) is heading.

Recommended base config:
- TypeScript strict mode on
- ESLint + Prettier configured together (avoid conflicting rules)
- `.env.local` for API base URL and secrets, never committed

---

## 2. Recommended Libraries

Pick from this list based on actual need — don't install something "just in case." Every dependency is attack surface and maintenance burden.

| Purpose | Library | Why |
|---|---|---|
| UI components | `shadcn/ui` | Copy-in code, no runtime dependency, full control |
| Extra components | `kibo-ui` | Extends shadcn (kanban, code blocks) without a different design language |
| Icons | `lucide-react` | Actively maintained, tree-shakeable, shadcn's default |
| Forms | `react-hook-form` + `zod` | Type-safe validation, minimal re-renders, shadcn's `<Form>` is built for this pair |
| Server state / data fetching | `@tanstack/react-query` | Caching, retries, request dedupe — avoids hand-rolled fetch logic |
| Client state (if needed) | `zustand` | Small, no boilerplate, avoids over-using Context |
| Data tables | `@tanstack/react-table` | Pairs with shadcn's `<Table>` for sorting/filtering/pagination |
| Dates | `date-fns` | Modular imports (unlike `moment`, which is legacy and bloated) |
| Charts / dashboards | `recharts` or `tremor` | shadcn's own chart components wrap Recharts |
| Animation | `motion` (Framer Motion) | Only add if you have actual transitions to build |
| Theming | `next-themes` | Dark/light mode, works with shadcn's CSS variables |
| HTTP client | native `fetch` (wrapped) | Skip `axios` unless you specifically need interceptors/cancellation it simplifies |
| Auth (if applicable) | `next-auth` (Auth.js) | Well-audited, avoid rolling your own session/JWT handling |

Avoid: `moment.js` (unmaintained, large), any unstarred/unmaintained npm package with no recent commits, anything requiring `--legacy-peer-deps` to install (usually a compatibility red flag).

---

## 3. Dependency Security Checklist

Run this **before** and periodically **during** development, not just before deploy:

```bash
npm audit                    # check for known CVEs
npm audit fix                # auto-fix where possible (review changes)
npx npm-check-updates        # see what's outdated
```

- [ ] Enable **Dependabot** (or Renovate) on the repo for automated dependency PRs
- [ ] Commit the lockfile (`package-lock.json`) — never let versions drift silently
- [ ] Before adding any new package: check its GitHub repo — last commit date, open critical issues, weekly npm downloads
- [ ] Pin exact versions for anything security-sensitive (auth, crypto) rather than using `^`
- [ ] Run `npm audit` in CI so a vulnerable dependency fails the build, not just a local warning
- [ ] For a pre-launch pass, run a scanner like **Snyk** (`snyk test`) for a deeper CVE database than `npm audit` alone

---

## 4. Responsive Design Strategy

Build **mobile-first**: style for the smallest screen by default, then add complexity at larger breakpoints with Tailwind's responsive prefixes.

Tailwind's default breakpoints (use consistently, don't invent custom ones unless there's a real reason):

| Prefix | Min width | Typical device |
|---|---|---|
| (none) | 0px | Small phones |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Small laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large monitors |

Practical rules:
- Use `flex` / `grid` with wrapping, not fixed pixel widths, for layout containers
- Test tables and dense data views specifically — these break first on small screens (consider a card layout fallback on mobile for wide tables)
- Use `max-w-*` + `mx-auto` for content containers, not hardcoded widths
- Fluid type: prefer Tailwind's default type scale over one-off `text-[13px]` values
- Touch targets: minimum ~44x44px for buttons/links on mobile
- Test with real content lengths (long project names, long DPR entries) — not just placeholder text

---

## 5. Suggested Folder Structure

```
src/
  app/                  # routes (App Router)
  components/
    ui/                 # shadcn-generated primitives (don't hand-edit unless needed)
    shared/             # your composed, reusable components
  features/             # feature-specific components, grouped by domain (e.g. dpr/, claims/)
  lib/                  # api client, utils, validators (zod schemas)
  hooks/                # custom hooks
  types/                # shared TypeScript types (ideally generated from backend OpenAPI spec)
```

---

## 6. Build Workflow (Step-by-Step)

1. **Confirm the API contract** — get the tested route list/spec from the backend dev before writing any UI code
2. **Scaffold** the Next.js app and install shadcn/ui (Section 1)
3. **Set up the shell** — root layout, navigation, theme provider (`next-themes`), global error boundary
4. **Build shared components first** — buttons, form fields, tables, modals — using shadcn primitives, before building feature pages
5. **Wire up API layer** — a typed `lib/api.ts` client + `react-query` hooks per resource, matching the tested backend routes
6. **Build features page by page**, mobile layout first, then adjust at `md:`/`lg:` breakpoints
7. **Responsive polish pass** — go back through every page at each breakpoint (see testing section below) and fix layout breaks
8. **Accessibility pass** — keyboard navigation, focus states, alt text, color contrast (shadcn/Radix gives you most of this for free if you don't override it)
9. **Performance pass** — run Lighthouse, fix render-blocking issues, lazy-load below-the-fold content
10. **Security pass** — `npm audit` / Snyk, check for exposed secrets, confirm auth guards on protected routes
11. **Cross-browser + cross-device QA** (see below)
12. **Deploy**

---

## 7. Testing Across Screen Sizes & Mobile Views

**During development (fast feedback loop):**
- Chrome/Edge DevTools → Device Toolbar (`Cmd/Ctrl+Shift+M`) — test at minimum: 320px, 375px, 768px, 1024px, 1280px, 1536px
- Resize the actual browser window slowly through breakpoints to catch layout "jump" bugs between them, not just at fixed device presets

**Component-level:**
- **Storybook** with the `@storybook/addon-viewport` — build and review components in isolation at multiple widths before they're ever placed in a page

**Automated regression:**
- **Playwright** — write tests that load key pages at several `viewport` sizes and take screenshots; catches layout regressions in CI before they ship
```js
test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE
```
- Run the same test suite at 2–3 viewport sizes (mobile, tablet, desktop) as part of CI

**Real-device verification (before major releases):**
- **BrowserStack** or **Responsively App** — check on actual iOS/Android rendering engines, not just Chrome's emulation, since Safari mobile has real layout quirks Chrome DevTools won't catch
- Test with an actual slow/mobile network throttle setting, not just a resized viewport

**Manual pre-launch checklist per page:**
- [ ] No horizontal scroll at any breakpoint
- [ ] Nav collapses to a usable mobile menu below `md:`
- [ ] Tables/dense data readable or reflow on mobile
- [ ] Forms usable with on-screen keyboard (inputs not hidden behind it)
- [ ] Images/icons scale, don't overflow
- [ ] Touch targets aren't cramped on small screens

---

## 8. Pre-Launch Checklist

- [ ] `npm audit` clean (or all findings triaged)
- [ ] Lighthouse score reviewed (Performance, Accessibility, Best Practices)
- [ ] Tested at all six standard breakpoints
- [ ] Tested on at least one real iOS and one real Android device
- [ ] Dark/light mode both checked, if applicable
- [ ] Error and empty states designed, not just the happy path
- [ ] Environment variables confirmed for production build
