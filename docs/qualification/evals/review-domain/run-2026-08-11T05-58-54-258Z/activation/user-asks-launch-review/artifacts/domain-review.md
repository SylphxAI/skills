# Domain Review — Mobile App Launch Readiness

Launch Admission Record (pre-launch review) · reviewed 2026-08-11

## 1. Frame

| Field | Value |
| --- | --- |
| Subject | Mobile app launch, currently planned for next week (week of 2026-08-17) |
| Surfaces at risk | Store submission/review, checkout/payment, personal data (email + location), user trust, revenue, reputation |
| Candidate identity | Not provided — fill in: app name, version/build, stores, territories, audience |
| Decision owner | Not named — must be assigned before re-admission |
| Change window | One week to close blockers or slip the launch |
| Evidence sources | Operator statement (2026-08-11); no repo, builds, telemetry, store consoles, or policy artifacts provided |
| Evidence status | Fact / inference / unknown are separated per finding; absence of evidence is recorded, not treated as a pass |
| Non-goals | Implementation of fixes; store submission itself; marketing assets |

**Verdict: NO-GO for the planned launch window.** Four launch-blocking gaps exist (privacy notice, payment crashes, rollback runbook, on-call coverage) plus a support gap. This is a hold, not a softer conditional-go: the payment and privacy items belong to the no-waiver class (money, personal data, external store authority) and cannot be shipped on verbal risk acceptance. Earliest re-admission is a **conditional-go** after every blocker below is closed with exact proof and the launch watch is standing (Section 6).

## 2. Gate matrix

| Area | Launch question | Status |
| --- | --- | --- |
| Trust / legal | Privacy notice published and consistent with actual collection (email, precise location) | **Blocked** |
| Monetization / payment | Checkout, grant, entitlement, refund paths reliable | **Blocked** |
| Operations | Rollback / forward-fix, incident response, ownership | **Blocked** |
| Support | Contact routes, macros, escalation, known issues | **Blocked** |
| Distribution | Store metadata, privacy policy URL, disclosures, review notes | **Blocked** (privacy policy URL is mandatory for both stores) |
| Analytics / launch watch | Funnel + failure signals, thresholds, owners, auto-stop | **Watch** — evidence not provided; cannot pass without it |
| Product / UI-UX | Core promise, onboarding, error states | Not assessed — no evidence requested/provided |
| Promotion | Claims match shipped behavior | Not in scope — no promotion evidence provided |

## 3. Findings ranked by severity

Severity scale: **S1 = launch blocker** (store-blocking, money, personal data, or irreversible harm) · **S2 = high** (containable only with proof and conditions) · **S3 = watch** (evidence gap or finite exposure).

### F1 — S1 · No published privacy notice while collecting email and location

- **Fact:** app collects email and location; no published privacy notice.
- **Inference (high confidence):** email is personal data and precise location is a sensitive permission in both stores. Apple Guideline 5.1.1 requires a publicly accessible privacy policy linked in App Store Connect and inside the app; Google Play requires a privacy policy URL and a completed Data Safety form for all apps, regardless of data collection. Neither store submission is possible without these.
- **Impact:** store review rejection or inability to submit; regulatory exposure (GDPR/CCPA and equivalents); consent and deletion obligations unmet; user trust damage on launch day.
- **Required proof:** live public privacy policy URL; App Privacy details and Google Play Data Safety form matching actual collection; legal review of email/location collection, consent, retention, and deletion; in-app policy link.

### F2 — S1 · Two open P1 crashes in the payment flow

- **Fact:** two P1-severity crashes in payment are open at review time.
- **Inference:** the app has a paid flow; an open P1 in payment means checkout, grant, or restore is unreliable — charge-without-grant, double-charge, or grant-without-charge outcomes, plus refund liability and store-review risk.
- **Impact:** money exposure for users and company; "payment grants unreliable" is a no-go for paid launch per the launch-readiness gate table; the security/payment/data-loss exception class cannot be waived by business approval.
- **Required proof:** root cause for both crashes; fixes merged with regression tests; closed crash reports; verified crash-free/checkout-success telemetry in a bounded canary before any paid exposure.

### F3 — S1 · No rollback runbook

- **Fact:** no rollback runbook exists.
- **Inference:** recovery is not real for the blast radius. App stores do not permit instant rollback, so recovery must be a tested combination of staged rollout, feature/config kill switches, forward-fix, and backend migration replay.
- **Impact:** any critical regression becomes an unbounded outage; data, money, and trust harm cannot be contained; MTTR has no defined ceiling.
- **Required proof:** written, owned runbook; recorded restore/recovery drill with measured time; kill switches verified per critical flow.

### F4 — S1 · No on-call responder

- **Fact:** no on-call responder exists.
- **Inference:** even a perfect runbook has no executor; the open payment P1s are already unattended, and the launch watch (once defined) could not act on its own thresholds. 24/7 coverage for the launch window is unconfirmed.
- **Impact:** incidents detected but not responded to; alert-to-action gap at the exact moment of maximum exposure.
- **Required proof:** named responder roster with schedule; tested escalation path; incident communication template.

### F5 — S2 · No support plan

- **Fact:** no support plan exists (no help center, macros, escalation, or contact routes evidenced).
- **Inference:** users hitting the payment crashes or privacy questions have no path to resolution; refunds/chargebacks cannot be handled; store expectations for a support email/URL are unmet; complaints surface publicly as ratings and reviews.
- **Impact:** reputation and refund liability; support duplicates become the main launch-day signal with no one assigned to them.
- **Required proof:** support contact routes, known-issues page, macros for payment/refund/account topics, escalation matrix with owners and SLAs.

### F6 — S2 · Launch observability and rollout controls not evidenced

- **Fact:** no analytics, rollout plan, thresholds, or ownership provided. This is an evidence gap, not proof of absence.
- **Inference:** a launch without failure signals cannot be admitted: no crash-free baseline, checkout success rate, refund rate, or support-duplicate countermetric; no segmentation by version/platform/region; no auto-stop predicate.
- **Required proof:** dashboard rows with baseline, thresholds, segments, owners, and automatic stop for at least: crash-free sessions, checkout failures, entitlement/restore errors, refunds, and support duplicates.

## 4. Residuals (after all Section 5 actions are complete)

1. **External authority:** store review timelines and approval are outside our control; a launch date cannot be guaranteed even with everything else green. Store approval is not self-attestable.
2. **Payment edge cases:** fixing the two P1 reproductions does not prove the whole money flow. Residual risk remains in refunds, restore, entitlement drift, and chargebacks; bounded canary + telemetry is the compensating control.
3. **Root-cause depth:** two visible crashes may mask a systemic payment-stack issue; verification only proves the fixed reproductions, not absence of others.
4. **Location consent friction:** permission prompts and consent flows may reduce activation; a policy that is legally clean can still hurt conversion. Watch the funnel, not just compliance.
5. **Email deliverability/abuse:** collection without a stated purpose and double-opt-in posture invites abuse and deliverability problems; residual ops load on support.
6. **Regulatory variance:** one published policy does not remove jurisdiction-specific risk (GDPR, CCPA/CPRA, and others); retention/deletion obligations need an owner.
7. **Slip cost:** moving the window has commercial cost (marketing alignment, earned momentum); this must be accepted explicitly by the decision owner, not absorbed silently.

## 5. Actions ranked

| # | Action | Owner (role) | Deadline | Exact proof | Consequence if missed |
| --- | --- | --- | --- | --- | --- |
| A1 | Publish privacy notice; complete App Privacy details + Google Play Data Safety form; legal review of email/location collection, consent, retention, deletion; add in-app policy link | Legal / privacy lead | Before store submission | Live policy URL; store-console disclosures; legal sign-off | No store submission; launch slips |
| A2 | Root-cause and fix both payment P1s; add regression tests; verify in bounded canary before any paid exposure | Payment engineering lead | Before any paid exposure | Closed crash reports; test run; canary checkout/entitlement telemetry | Paid flows disabled in build; launch slips |
| A3 | Write and drill rollback/forward-fix runbook: staged rollout, kill switches, migration replay, restore drill | Ops / platform lead | Before launch | Runbook + recorded drill with measured recovery time | No-go stands |
| A4 | Staff on-call: named roster, schedule, escalation, incident comms template; test the page path | Engineering manager | Before launch | Roster + alert test evidence | No-go stands |
| A5 | Stand up support plan: contact routes, help center, known-issues page, payment/refund macros, escalation with SLAs | Support lead | Before launch | Live routes + macro set | Conditional-go withheld |
| A6 | Define launch watch: baselines, segments, thresholds, owners, automatic stop for crash, checkout, restore, refund, support duplicates | Data / engineering | Before launch | Watch rows + stop predicates | Expansion withheld (canary only) |
| A7 | Assign decision owner; record launch objective and no-go criteria; schedule post-launch review within a fixed window | Launch owner | Immediately | Written launch decision record | No accountable authority for go/no-go |

Scope note: if the product can ship **without paid flows enabled**, F2's blast radius shrinks but F1, F3, F4, F5, and F6 still stand — the privacy gap alone keeps the verdict at no-go for store submission.

## 6. Re-admission checklist (what would falsify this assessment)

A **conditional-go** replaces the no-go only when all of the following are evidenced:

1. Public privacy policy URL live and consistent with actual email/location collection; store disclosures submitted; in-app link present.
2. Both payment P1s closed with root cause and verified telemetry in a bounded cohort.
3. Rollback/forward-fix drill completed with measured recovery time and named owner.
4. On-call roster live with tested escalation.
5. Support routes and payment/refund macros live.
6. Launch watch standing with thresholds, segmentation, owners, and automatic stop.
7. Decision owner has signed a written record of the launch objective, no-go criteria, and post-launch review date.

Re-admission is still **conditional**, not a full go, because store approval remains an external authority floor: the team cannot self-certify the store side. Final closeout also requires live readback of the exact released build (version/config), not a green CI exit.
