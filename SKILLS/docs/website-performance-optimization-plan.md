# Website Performance Optimization Plan

A prioritized execution order for fixing a slow website, grouped by phase. Each phase builds on the last — don't skip ahead to frontend polish while backend queries are still slow.

---

## Phase 0: Diagnose

### 1. Lighthouse Audit
Run this **before** changing anything. It tells you whether the bottleneck is server response time, render-blocking JS, oversized images, or layout shifts. Fixing things blindly wastes time — this gives you a baseline and a prioritized list of real issues specific to your site.

---

## Phase 1: Backend & Database (usually the biggest wins)

### 2. Fix N+1 Database Queries
Check this first. An N+1 query means your code runs one query to get a list, then a separate query *per item* in that list — so a page with 50 rows fires 51 queries instead of 1–2. This is often the single worst performance offender on data-heavy pages. Fix with eager loading / joins / batching before doing anything else.

### 3. Index the Database
Once N+1 queries are fixed, look at what's still slow. Add indexes on columns used in `WHERE`, `JOIN`, and `ORDER BY` clauses. Without indexes, the database scans entire tables row by row — indexes let it jump straight to matching rows.

### 4. Cache Expensive Queries
For data that's expensive to compute but doesn't change every request (aggregates, reports, dashboards), cache the result in Redis or in-memory rather than recalculating on every hit.

### 5. Database Connection Pooling
Opening a new database connection per request is expensive. A connection pool keeps a set of ready-to-use connections open and reuses them, preventing connection overhead from stacking up under load.

### 6. Paginate Large Lists
Never return unbounded result sets. Returning 10,000 rows when the user sees 20 wastes database time, network bandwidth, and browser memory. Paginate at the query level, not just in the UI.

### 7. Compress API Payloads
Enable gzip or brotli compression on API responses. This is a cheap, near-immediate win — it shrinks response size significantly with minimal server overhead.

### 8. Cache API Responses
Use HTTP caching headers (`Cache-Control`, `ETag`) or a caching layer (CDN edge cache, reverse proxy) so repeat requests for the same data don't hit your server at all.

### 9. Server-Side Caching
For whole pages or page fragments that are expensive to render repeatedly (e.g., server-rendered HTML), cache the rendered output rather than regenerating it on every request.

---

## Phase 2: Frontend Delivery

### 10. Minify JS and CSS
Strip whitespace, comments, and shorten variable names in production builds. Most modern frameworks (Next.js included) do this automatically — verify your build isn't accidentally running in dev mode in production.

### 11. Split Code into Chunks
Break your JS bundle into smaller pieces loaded on demand, instead of one giant bundle loaded upfront. Next.js does route-based splitting automatically — check for large shared dependencies being pulled into every page unnecessarily.

### 12. Defer Non-Critical Scripts
Analytics, chat widgets, and third-party embeds shouldn't block the initial page render. Load them with `defer` or `async`, or after the main content has painted.

### 13. Remove Unused Dependencies
Audit your `package.json` for libraries that are imported but barely used, or duplicated across the bundle. Use a bundle analyzer or a tool like `depcheck` to find dead weight.

---

## Phase 3: Images & Lazy Content

### 14. Compress Images
Convert to modern formats (WebP/AVIF) and serve properly sized images instead of full-resolution originals scaled down in the browser.

### 15. Add Lazy Loading
Only load images and heavy components when they're about to enter the viewport. `next/image` handles this by default — for anything else, use `loading="lazy"`.

### 16. Loading Skeletons
These don't make the page faster, but they improve *perceived* speed — showing a skeleton layout while data loads feels much better than a blank screen or spinner, especially on slower connections.

---

## Phase 4: Rendering Behavior (React-specific)

### 17. Eliminate Unnecessary Re-renders
Check for missing `useMemo`/`useCallback`, unstable object/array props passed to children, and context providers that re-render the entire component tree on every state change.

### 18. Debounce Input Handlers
For search boxes, filters, and live-validation inputs, debounce the handler so it fires once after the user pauses typing, instead of on every keystroke.

---

## Phase 5: Infrastructure

### 19. Add a CDN
Serve static assets (and cacheable API responses, where possible) from edge locations closer to the user, reducing latency significantly for geographically distributed traffic.

### 20. Load Balancer
This is a **scaling** fix, not a raw speed fix — it distributes traffic across multiple servers so no single instance is overwhelmed. Only relevant once you're actually scaling horizontally; it won't make a single slow page load faster on its own.

---

## Recommended Execution Order

1. **Run Lighthouse** + check database query logs for N+1s and missing indexes
2. **Fix backend query/caching issues** — usually the largest source of latency
3. **Fix bundle size and unused dependencies**
4. **Add lazy loading, image compression, and skeletons**
5. **Add CDN / server-side caching** once the app itself is efficient
6. **Scale infrastructure (load balancer)** only once demand actually requires it

> Tip: Re-run Lighthouse after each phase to confirm the fix actually moved the needle before investing more time in the next one.
