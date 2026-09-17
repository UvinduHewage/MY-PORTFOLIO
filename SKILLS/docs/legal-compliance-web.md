# Legal & Compliance Checklist — Web App / Website

**Purpose:** Reduce legal exposure (privacy law, consumer protection law, accessibility law, IP) before or shortly after launch.

**How to use this file (for an executing agent):**
For each item below: (1) run the "Check" step against the actual codebase/site, (2) if it fails, apply the "Fix" step, (3) mark the item `[x]` when verified fixed. Do not mark an item complete based on assumption — verify against real files/config/rendered output.

---

## Phase 1 — Core Legal Documents

- [ ] **Privacy Policy**
  - Check: Look for a `/privacy` (or `/privacy-policy`) route/page. Confirm it lists what data is collected, why, how long it's retained, and who it's shared with (including third parties/SDKs found in Phase 2).
  - Fix: Generate a policy page reflecting actual data flows found in the codebase (forms, cookies, analytics, DB tables). Link it in the footer of every page.

- [ ] **Terms of Service**
  - Check: Look for a `/terms` route. Confirm it covers acceptable use, liability limitation, account termination, and governing law/jurisdiction.
  - Fix: Draft ToS matching the actual product; link in footer and at signup/checkout.

- [ ] **Refund Policy**
  - Check: If the app takes payment, look for a `/refund-policy` page and check it matches actual billing logic (subscription vs one-time, trial periods).
  - Fix: Draft policy matching real billing behavior. Link at checkout and in footer.

- [ ] **Cookie Policy**
  - Check: Confirm a `/cookie-policy` page exists and lists every cookie/tracker actually set (cross-reference with Phase 2 SDK audit).
  - Fix: Enumerate all cookies (name, purpose, duration, first/third-party) and publish.

- [ ] **Business Details**
  - Check: Search footer/contact page for legal entity name, registered address, and a working contact method (email or form).
  - Fix: Add if missing — required in most consumer-protection regimes (EU, UK) and builds trust.

---

## Phase 2 — Data & Privacy Compliance (GDPR / CCPA)

- [ ] **No Unnecessary Data Collection**
  - Check: Grep all form components (`<input>`, form schemas, API request bodies) for fields not used anywhere downstream (unused columns, dead form fields).
  - Fix: Remove unused fields. Every collected field must map to a stated purpose in the privacy policy.

- [ ] **Cookie Consent Banner**
  - Check: Load the site in a fresh/incognito session before interacting. Confirm no non-essential cookies (analytics, ads, tracking pixels) are set until the user actively clicks "Accept" — a banner that only *informs* without blocking is not compliant.
  - Fix: Gate all non-essential `<script>` tags / SDK init calls (e.g. `gtag`, Meta Pixel, Hotjar) behind a consent-check function. Use a maintained library (e.g. CookieYes, Osano, Cookiebot, or a self-built consent manager) rather than hand-rolling cookie logic.

- [ ] **Form Consent Checkboxes**
  - Check: Find every form that leads to marketing communication or data sharing with a third party. Confirm the consent checkbox is unchecked by default and consent text is specific (not bundled with unrelated ToS).
  - Fix: Un-check any pre-checked consent boxes. Separate "I agree to ToS" from "I consent to marketing emails."

- [ ] **Age Consent for Children's Data**
  - Check: Determine if the product is directed at or reasonably likely to be used by children under 13 (16 in EU). Check signup flow for an age gate.
  - Fix: If children's data is possible, add an age verification step and, if under-13 data is collected, implement verifiable parental consent (COPPA) or block collection outright — do not silently proceed.

- [ ] **Data Deletion Request Flow**
  - Check: Search backend/API routes for a `DELETE /user` or equivalent endpoint. Confirm it actually purges/anonymizes data (not just a soft `deleted_at` flag with data still queryable/exportable elsewhere).
  - Fix: Implement a real deletion (or anonymization) endpoint, expose it via account settings UI, and document the process + response time (typically ≤30 days) in the privacy policy.

- [ ] **Unsubscribe Link in Emails**
  - Check: Inspect every transactional/marketing email template for an unsubscribe link and confirm the link actually works (test it end-to-end).
  - Fix: Add `List-Unsubscribe` header + visible footer link to all marketing emails; wire it to a real preference-update endpoint.

- [ ] **Audit Third-Party SDKs**
  - Check: Grep `package.json` and `<script src=...>` tags for analytics/ad/tracking SDKs (Google Analytics, Meta Pixel, Hotjar, Segment, etc.). For each, check what data it collects (open its docs/network requests in devtools).
  - Fix: Cross-reference every found SDK against the privacy/cookie policy — every one must be disclosed. Remove SDKs that aren't actually used.

---

## Phase 3 — Consumer Protection (Deceptive Practice Law)

- [ ] **No Dark Patterns**
  - Check: Manually walk the cancel-subscription flow, unsubscribe flow, and any countdown/urgency banners. Flag anything that hides the cancel option, requires multiple confirmation steps not present on the signup side, or uses fake scarcity ("Only 2 left!" with no backing inventory data).
  - Fix: Make cancel as easy as signup. Remove fabricated urgency/scarcity messaging not backed by real data.

- [ ] **No Hidden Fees**
  - Check: Walk the full checkout flow. Confirm the price shown at the start matches the price charged at the end (no fees appearing only on the final confirmation screen).
  - Fix: Display all mandatory fees upfront, before the final payment step.

- [ ] **No Fake Reviews**
  - Check: Grep the codebase/CMS for hardcoded/seeded review or testimonial data. Confirm every displayed review traces to a real, verifiable user/order.
  - Fix: Remove fabricated reviews. If using incentivized reviews, disclose the incentive per FTC guidance.

- [ ] **No Unsupported Claims**
  - Check: Search marketing copy/landing pages for absolute or superlative claims ("clinically proven," "#1 rated," "guaranteed results") and check if a citation/source exists nearby.
  - Fix: Remove or substantiate with a linked source; soften unverifiable claims.

---

## Phase 4 — IP & Licensing

- [ ] **License Fonts/Images**
  - Check: List all fonts and images/icons used (check `/assets`, `/public`, CSS `font-family` declarations). For each, confirm a commercial-use license exists (or it's from a known-safe source like Google Fonts/OFL-licensed).
  - Fix: Replace unlicensed assets, or purchase/obtain proper licenses. Keep a license manifest file (`ASSET_LICENSES.md`) in the repo.

---

## Phase 5 — Accessibility (WCAG / ADA)

- [ ] **Alt Text on Images**
  - Check: Grep all `<img>` tags (and `next/image`, `<Image>` components) for missing or empty `alt` attributes on meaningful images.
  - Fix: Add descriptive `alt` text; use `alt=""` only for purely decorative images.

- [ ] **Color Contrast**
  - Check: Run an automated contrast checker (e.g. axe, Lighthouse accessibility audit, or WebAIM contrast checker) against text/background color pairs.
  - Fix: Adjust colors to meet WCAG AA (4.5:1 for normal text, 3:1 for large text).

- [ ] **Keyboard Navigation**
  - Check: Tab through the entire UI without a mouse. Confirm every interactive element (buttons, links, modals, custom dropdowns) is reachable and has a visible focus state, and modals can be closed with Escape.
  - Fix: Add `tabindex`/focus management to custom components; ensure no keyboard traps.

---

## Recommended Execution Order

1. Phase 1 (core documents) — nothing else matters legally without these
2. Phase 2 (data/privacy) — highest fine risk (GDPR/CCPA/COPPA)
3. Phase 3 (consumer protection) — active FTC/EU enforcement area
4. Phase 4 (licensing) — easy to fix, avoids takedowns
5. Phase 5 (accessibility) — growing lawsuit exposure, especially US ADA
