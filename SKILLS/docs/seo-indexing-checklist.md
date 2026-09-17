# Web App / Website SEO & Indexing Checklist

**Purpose:** A reusable, framework-agnostic checklist to diagnose and fix why a
site isn't showing up on Google, and to improve its ranking once it is
indexed. Use this on any new or existing web app/website.

**How to use this file:**
- Copy this file into any project (e.g. `docs/seo-checklist.md`).
- Paste it into an AI coding agent (Claude Code, Cursor, etc.) along with the
  instruction: *"Audit this codebase against every item below, implement any
  missing fixes, and report what was found/changed/skipped and why."*
- Each item below has: what it is, why it matters, how to implement it, and
  how to verify it's working. Treat "How to verify" as the pass/fail test.

---

## Phase 1 — Indexing Prerequisites (fix these FIRST)

Nothing below this section matters if these aren't clean. These control
whether Google can find and index your pages at all.

### 1. Verify Google Search Console
- **What it does:** Proves domain ownership to Google and unlocks indexing
  tools, error reports, and sitemap submission.
- **Why it matters:** Without this you're flying blind — no visibility into
  crawl errors, no way to request indexing manually.
- **How to implement:** Add the property at search.google.com/search-console.
  Verify via DNS TXT record (needs registrar access) OR via URL-prefix method
  (HTML file upload, meta tag in `<head>`, or existing Analytics/Tag Manager
  install) if DNS access isn't available.
- **How to verify:** Search Console dashboard shows the property as
  "Verified" with no pending action.

### 2. sitemap.xml
- **What it does:** A machine-readable list of every URL on the site that
  should be indexed.
- **Why it matters:** Lets Google discover all pages fast instead of relying
  on it finding links organically over weeks.
- **How to implement:** Generate at `/sitemap.xml`. Most frameworks have a
  built-in or plugin way to auto-generate this from routes/pages.
- **How to verify:** Visiting `yourdomain.com/sitemap.xml` returns valid XML
  listing real URLs. Submit it under Search Console → Sitemaps and confirm
  "Success" status.

### 3. robots.txt
- **What it does:** Tells crawlers which paths they may or may not crawl.
- **Why it matters:** A leftover `Disallow: /` from a staging/dev config
  accidentally pushed to production will silently block the entire site.
- **How to implement:** Serve a `robots.txt` at the domain root. Only disallow
  paths that genuinely shouldn't be indexed (admin panels, API routes, etc.).
- **How to verify:** Visit `yourdomain.com/robots.txt` and confirm it does
  NOT disallow the pages you want indexed.

### 4. No unintended noindex tags
- **What it does:** A `<meta name="robots" content="noindex">` tag explicitly
  tells Google not to index that specific page.
- **Why it matters:** This is the most common silent killer — frameworks
  often default new/staging pages to noindex, and it gets forgotten in
  production.
- **How to implement:** Search the codebase for `noindex` and confirm it only
  appears on pages that should genuinely be excluded (admin, thank-you pages,
  duplicate filters, etc.).
- **How to verify:** View page source (Ctrl+U) on every important page and
  confirm no noindex tag is present. Search Console's URL Inspection tool
  also reports this directly.

### 5. Enforce HTTPS
- **What it does:** Serves the site only over encrypted HTTPS, redirecting
  any HTTP request.
- **Why it matters:** Google treats `http://` and `https://` as separate
  URLs; splitting traffic/authority between them hurts indexing and ranking,
  and browsers flag HTTP sites as "Not Secure."
- **How to implement:** Get an SSL certificate (most hosts/CDNs provide this
  free), and add a server-level redirect from HTTP to HTTPS.
- **How to verify:** Visiting the `http://` version of the site redirects
  automatically to `https://`.

### 6. Canonical tags
- **What it does:** `<link rel="canonical" href="...">` tells Google which
  URL is the "real" version when duplicate/near-duplicate URLs exist (www vs
  non-www, trailing slash, query parameters, etc.).
- **Why it matters:** Prevents Google from indexing the wrong duplicate or
  splitting ranking signals across duplicate URLs.
- **How to implement:** Add a self-referencing canonical tag to every page's
  `<head>`, pointing to the preferred URL format.
- **How to verify:** View source on a few pages and confirm the canonical URL
  matches the actual preferred URL exactly (correct protocol, domain, no
  trailing slash inconsistency).

### 7. No broken links
- **What it does:** Ensures internal links point to pages that actually
  return 200 OK, not 404s.
- **Why it matters:** Wastes crawl budget and can strand pages Google never
  reaches, hurting both indexing and user experience.
- **How to implement:** Run a crawler (Screaming Frog, Ahrefs, or a simple
  script) across the site and fix or remove any link returning 4xx/5xx.
- **How to verify:** Crawl report shows zero broken internal links.

---

## Phase 2 — On-Page SEO (improves ranking once indexed)

### 8. Meta titles
- **What it does:** The clickable blue text shown in search results.
- **Why it matters:** Directly affects click-through rate and is a ranking
  signal for relevance.
- **How to implement:** Unique, descriptive `<title>` per page (50–60
  characters), primary keyword near the front.
- **How to verify:** Every page has a unique title; none are empty, default,
  or duplicated across the site.

### 9. Meta descriptions
- **What it does:** The snippet text shown under the title in search results.
- **Why it matters:** Not a direct ranking factor, but strongly affects
  click-through rate.
- **How to implement:** Unique `<meta name="description">` per page
  (~150–160 characters), written like ad copy.
- **How to verify:** Every important page has a unique, non-empty
  description tag.

### 10. One H1 per page + clean header hierarchy
- **What it does:** Structures content so `<h1>` is the page's main topic,
  followed by properly nested `<h2>`, `<h3>`, etc.
- **Why it matters:** Helps Google (and screen readers) parse what the page
  is actually about.
- **How to implement:** Exactly one `<h1>` per page. Don't skip levels
  (no `<h3>` directly under `<h1>` with no `<h2>`).
- **How to verify:** Inspect the DOM — count `<h1>` tags per page (should be
  1) and confirm heading levels descend logically.

### 11. Alt text on images
- **What it does:** Text description attached to `<img>` tags via the `alt`
  attribute.
- **Why it matters:** Accessibility for screen readers, and lets images
  surface in Google Image search.
- **How to implement:** Add descriptive (not keyword-stuffed) `alt` text to
  every meaningful image. Decorative images can use `alt=""`.
- **How to verify:** No `<img>` tags with missing `alt` attributes on
  content-bearing images.

### 12. Schema markup (structured data)
- **What it does:** JSON-LD markup describing page content in a
  machine-readable format (e.g. Article, Product, FAQ, Organization).
- **Why it matters:** Enables rich results in search (star ratings,
  breadcrumbs, FAQ dropdowns) which increase click-through rate.
- **How to implement:** Add a `<script type="application/ld+json">` block
  with the relevant schema.org type for the page content.
- **How to verify:** Test the page URL in Google's Rich Results Test tool —
  it should detect the schema with no errors.

### 13. Internal links
- **What it does:** Links from one page on the site to another.
- **Why it matters:** Spreads ranking authority across the site and helps
  Google discover deeper pages that aren't in top-level navigation.
- **How to implement:** Link related content naturally within body copy and
  navigation — every important page should be reachable within a few clicks
  from the homepage.
- **How to verify:** Crawl the site and confirm no important page is
  "orphaned" (zero internal links pointing to it).

### 14. Clean URL slugs
- **What it does:** Human-readable URL paths (e.g. `/services/roofing`
  instead of `/page?id=482`).
- **Why it matters:** Easier for users and search engines to understand page
  content from the URL alone; minor ranking factor.
- **How to implement:** Use descriptive, lowercase, hyphen-separated slugs
  derived from page title/topic.
- **How to verify:** Every public URL is readable and descriptive, not a raw
  ID or query string.

### 15. og:image (and other Open Graph tags)
- **What it does:** Controls the preview image/title/description shown when
  a link is shared on social platforms (WhatsApp, LinkedIn, Facebook, etc.).
- **Why it matters:** Not a Google ranking factor — this is purely about how
  the link looks when shared, but it affects click-through from social
  shares.
- **How to implement:** Add `<meta property="og:image">`, `og:title`,
  `og:description` tags to the page `<head>`.
- **How to verify:** Test the URL in Facebook's Sharing Debugger or
  LinkedIn's Post Inspector and confirm the preview renders correctly.

---

## Phase 3 — Site Health & Performance

### 16. Compress all images
- **What it does:** Reduces image file size without visible quality loss
  (modern formats like WebP/AVIF, proper sizing).
- **Why it matters:** Directly impacts page load speed, which affects both
  Core Web Vitals and user experience.
- **How to implement:** Serve appropriately-sized, compressed images; use
  lazy-loading for below-the-fold images. Many frameworks have a built-in
  image optimization component that handles this automatically.
- **How to verify:** Run Google PageSpeed Insights — no "properly size
  images" or "serve images in next-gen formats" warnings.

### 17. Improve Core Web Vitals
- **What it does:** Google's three measured performance metrics — Largest
  Contentful Paint (loading speed), Interaction to Next Paint
  (responsiveness), Cumulative Layout Shift (visual stability).
- **Why it matters:** Confirmed Google ranking factor, and directly affects
  how usable the site feels.
- **How to implement:** Optimize images, minimize render-blocking JS/CSS,
  reserve space for dynamic content (ads, images) to prevent layout shift,
  use a CDN.
- **How to verify:** Google PageSpeed Insights / Search Console's Core Web
  Vitals report shows all three metrics in the "Good" range.

---

## Phase 4 — Off-Page SEO

### 18. Build a backlink strategy
- **What it does:** Getting other reputable sites to link back to yours.
- **Why it matters:** One of the strongest ranking signals — but it's about
  ranking, not indexing, and it's the slowest to pay off.
- **How to implement:** Guest posts, directory listings relevant to your
  industry, partnerships, PR mentions, sharing genuinely useful content that
  earns organic links.
- **How to verify:** Track referring domains growth over time in Search
  Console → Links, or a third-party tool (Ahrefs, Moz).

---

## Recommended Order of Execution

1. Verify Search Console
2. Submit sitemap.xml
3. Fix robots.txt
4. Audit and remove unintended noindex tags
5. Enforce HTTPS + fix canonical tags
6. Fix broken links
7. Meta titles, descriptions, H1/header hierarchy, alt text
8. Schema markup, internal links, clean slugs, og:image
9. Compress images, fix Core Web Vitals
10. Ongoing: backlink strategy

## Quick Audit Checklist

- [ ] Search Console verified
- [ ] sitemap.xml live and submitted
- [ ] robots.txt not blocking wanted pages
- [ ] No unintended noindex tags
- [ ] HTTPS enforced site-wide
- [ ] Canonical tags correct on every page
- [ ] Zero broken internal links
- [ ] Unique meta title per page
- [ ] Unique meta description per page
- [ ] Exactly one H1 per page, clean heading hierarchy
- [ ] Alt text on all content images
- [ ] Schema markup added where relevant
- [ ] No orphaned pages (internal linking complete)
- [ ] Clean, descriptive URL slugs
- [ ] og:image and Open Graph tags present
- [ ] Images compressed / next-gen formats
- [ ] Core Web Vitals in "Good" range
- [ ] Backlink strategy in progress
