# Legal & Compliance Checklist — Mobile App (iOS / Android)

**Purpose:** Reduce legal exposure (privacy law, consumer protection law, accessibility law, IP) and avoid App Store / Play Store rejection or account suspension.

**How to use this file (for an executing agent):**
For each item below: (1) run the "Check" step against the actual app codebase/store listing, (2) if it fails, apply the "Fix" step, (3) mark the item `[x]` when verified fixed. Store review guidelines change — re-verify anything store-policy-related against current Apple/Google docs before shipping.

---

## Phase 1 — Core Legal Documents

- [ ] **Privacy Policy**
  - Check: Confirm a privacy policy URL is set in App Store Connect / Play Console AND linked inside the app (settings/about screen). Confirm it lists all data collected, including from SDKs (see Phase 2).
  - Fix: Publish a policy reflecting actual data flows; add the URL to both store listings and an in-app link.

- [ ] **Terms of Service**
  - Check: Confirm a ToS link exists in-app (settings/about) and, if there's a signup flow, is linked at signup.
  - Fix: Draft/link ToS covering acceptable use, liability, and account termination.

- [ ] **Refund Policy**
  - Check: If the app sells digital goods/subscriptions, confirm it uses Apple's/Google's native in-app purchase (IAP) system — required for digital content — rather than external payment links, and that any custom refund policy text does not contradict Apple's/Google's own refund terms (which govern IAP refunds).
  - Fix: Route all digital purchases through StoreKit (iOS) / Google Play Billing (Android). State clearly that refunds for IAP go through the store, not the developer directly.

- [ ] **Business Details**
  - Check: Confirm developer name/support contact is accurate in App Store Connect / Play Console, and an in-app "Contact / Support" screen exists.
  - Fix: Add missing developer/business info; add a support contact screen.

---

## Phase 2 — Data & Privacy Compliance (GDPR / CCPA / Store-Specific)

- [ ] **No Unnecessary Data Collection**
  - Check: Grep permission requests (`Info.plist` usage-description keys on iOS, `AndroidManifest.xml` `<uses-permission>` on Android) and form/API fields for anything not tied to a used feature.
  - Fix: Remove unused permissions and unused data fields. Each requested permission needs a real, active feature behind it.

- [ ] **iOS Privacy Manifest & Data Labels**
  - Check: Confirm a `PrivacyInfo.xcprivacy` file exists (required by Apple for apps using certain "required reason" APIs and third-party SDKs) and that App Store Connect's "App Privacy" nutrition-label answers match what the app actually does.
  - Fix: Generate/update the privacy manifest; correct any mismatched privacy label answers.

- [ ] **Android Data Safety Section**
  - Check: Compare Play Console's "Data Safety" form answers against actual SDK/network behavior (see SDK audit below).
  - Fix: Update the Data Safety form to match reality — mismatches are a common cause of app removal.

- [ ] **App Tracking Transparency (iOS)**
  - Check: If any SDK does cross-app/cross-site tracking (most ad SDKs), confirm the ATT prompt (`AppTrackingTransparency` framework) is shown before tracking begins, using Apple's required prompt — not a custom pre-prompt that pressures the user.
  - Fix: Gate tracking-SDK initialization behind `ATTrackingManager.requestTrackingAuthorization` and respect the user's choice.

- [ ] **Age Consent for Children's Data**
  - Check: Determine if the app is in/likely to appeal to a children's category. Check for an age gate at first launch/signup.
  - Fix: If children may use the app, add age verification and either avoid collecting personal data from under-13 users (COPPA) or implement verifiable parental consent. Do not serve behavioral/targeted ads to users flagged as children.

- [ ] **In-App Account Deletion**
  - Check: If the app supports account creation, confirm there's an in-app path to fully delete the account and data (Apple and Google both require this when account creation is offered in-app — a "contact support to delete" flow alone is not sufficient).
  - Fix: Add a self-service "Delete Account" flow in settings that actually purges/anonymizes backend data.

- [ ] **Unsubscribe / Notification Opt-Out**
  - Check: Confirm push notifications and any marketing emails have an in-app toggle to opt out, separate from disabling all notifications at the OS level.
  - Fix: Add granular notification preferences in settings.

- [ ] **Audit Third-Party SDKs**
  - Check: List every SDK in the dependency manifest (`Podfile`/`Package.swift` on iOS, `build.gradle` on Android) — especially analytics, ads, crash reporting, attribution. For each, check what data it transmits.
  - Fix: Cross-reference every SDK against the privacy policy, iOS privacy manifest, and Android Data Safety form — all three must match. Remove SDKs not actually in use.

---

## Phase 3 — Consumer Protection

- [ ] **No Dark Patterns**
  - Check: Walk the subscription cancellation flow end-to-end. Confirm cancellation is reachable in a similar number of steps as subscribing, with no forced retention screens that block progress (a single "are you sure" offer is fine; a maze of screens is not).
  - Fix: Simplify cancellation; remove manipulative retention flows.

- [ ] **No Hidden Fees**
  - Check: Walk the full IAP purchase flow. Confirm the price shown before purchase matches what's actually charged.
  - Fix: Ensure pricing shown pre-purchase is final; disclose any recurring billing clearly before the buy button.

- [ ] **No Fake Reviews**
  - Check: Confirm no seeded/fabricated reviews are shown inside the app (e.g. a "reviews" carousel not sourced from the actual store listing).
  - Fix: Only display real, sourced reviews; disclose incentivized reviews if used.

- [ ] **No Unsupported Claims**
  - Check: Search app store listing copy and in-app marketing screens for unverifiable superlative claims.
  - Fix: Remove or substantiate with a source.

---

## Phase 4 — IP & Licensing

- [ ] **License Fonts/Images/Icons**
  - Check: List bundled fonts, images, and icon packs (check asset catalogs / `res/drawable` / `Assets.xcassets`). Confirm commercial-use rights for each.
  - Fix: Replace unlicensed assets; keep a license manifest in the repo.

---

## Phase 5 — Accessibility

- [ ] **Screen Reader Labels (VoiceOver / TalkBack)**
  - Check: Grep UI components for missing `accessibilityLabel` (iOS) / `contentDescription` (Android) on interactive and meaningful image elements.
  - Fix: Add descriptive labels; mark purely decorative elements as accessibility-hidden.

- [ ] **Color Contrast**
  - Check: Run contrast checks on text/background pairs used in the UI (design tokens or rendered screenshots).
  - Fix: Adjust to meet WCAG AA (4.5:1 normal text, 3:1 large text).

- [ ] **Touch Target Size**
  - Check: Measure tappable elements against platform minimums (44x44pt iOS / 48x48dp Android).
  - Fix: Increase hit area/padding on undersized touch targets.

- [ ] **Dynamic Type / Font Scaling**
  - Check: Test the app with the OS's largest accessibility text size setting. Confirm text doesn't clip or overlap.
  - Fix: Use scalable text styles instead of fixed pixel/point font sizes; adjust layouts to reflow.

---

## Recommended Execution Order

1. Phase 1 (core documents + IAP-compliant billing) — required for store approval
2. Phase 2 (data/privacy + privacy manifest/Data Safety accuracy) — top cause of store rejection/removal
3. Phase 3 (consumer protection) — active enforcement area
4. Phase 4 (licensing) — easy to fix, avoids takedowns
5. Phase 5 (accessibility) — required by both Apple and Google review guidelines, and a growing lawsuit area
