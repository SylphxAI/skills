# Acme Mobile App — Launch Readiness Domain Review

- Review ID: `ACME-LR-2026-08-11`
- Method: `review-domain` skill → `launch-readiness` domain pack (METHOD, launch-readiness-patterns, release-health-watch)
- Subject: Acme mobile app launch, target next week
- Candidate identity: not supplied (no commit/build/content/config/policy digests)
- Decision owner / release authority: not supplied
- Evidence sources available: the supplied brief only. No repo, store console, telemetry, legal docs, or live systems were accessible. Per fail-closed honesty, anything not evidenced is recorded as unknown or blocked — never invented as a pass.

---

## 1. Frame

- **Subject**: launch admission for a mobile app that collects email and location, contains a payment flow, and is targeted to launch next week.
- **Surfaces**: store listing(s), onboarding/consent flow, checkout/payment, support routes, incident response, marketing communication.
- **Users/jobs at risk**: end users (payment failures, opaque handling of email/location, no support recourse); Acme (store rejection, refunds, ratings, regulator and reputation exposure).
- **Success criteria for this assessment**: one launch admission decision (`go | conditional-go | hold | no-go`) from exact evidence, plus severity-ranked findings, actions, residuals.
- **Non-goals**: implementing fixes, drafting the privacy notice, building the runbook. Those are handoff actions with owners and deadlines.
- **Evidence sources missing**: store submission state, build identity, telemetry, consent implementation, legal review, support channels, on-call tooling, marketing assets. Missing required evidence is a blocker or explicit handoff.

---

## 2. Evidence ledger — fact / inference / unknown

### Facts (stated in brief; taken as given)

| ID | Fact |
| --- | --- |
| F1 | Acme has a mobile app. |
| F2 | Launch is targeted for next week. |
| F3 | The app collects email and location. |
| F4 | No privacy notice is published. |
| F5 | No support plan exists. |
| F6 | No rollback runbook exists. |
| F7 | Two P1 crashes in the payment flow are open. |
| F8 | No incident responder is on call. |
| F9 | Marketing has promised a public beta in three weeks. |

### Inference (reasoned from facts; not independently verified)

| ID | Inference | Basis |
| --- | --- | --- |
| I1 | The app exposes a payment flow at launch (monetization is launch-scoped). | F7 assumes an in-scope payment flow. |
| I2 | Launch involves one or more app stores; store submission/approval is a dependency. | F1 mobile app; stores are the dominant mobile distribution channel. Specific stores unknown. |
| I3 | Email + location are personal data under one or more privacy regimes (e.g. GDPR, CCPA, APPI). | F3; which regimes apply depends on territories (unknown). |
| I4 | Store policies require a privacy policy for apps collecting personal data. | Well-known external platform policy; verification of the actual store's current rule is pending. |
| I5 | Open P1 payment crashes will likely reach users and cause payment/entitlement failure at launch if unfixed. | F2 + F7; impact cohort and repro rate unknown. |
| I6 | No on-call responder implies slow or absent response to launch incidents. | F8. |
| I7 | The three-week beta promise and next-week launch interact (sequencing or claim-mismatch risk). | F2 + F9; what "beta" means is unknown. |
| I8 | Marketing assets for the beta are being produced and may outrun product reality. | F9; unverified. |

### Unknown (required evidence, not supplied — not N/A)

| ID | Unknown |
| --- | --- |
| U1 | Stores, channels, territories, audiences, age modes. |
| U2 | Decision owner, change window, release authority. |
| U3 | Consent mechanism, data retention, sharing, deletion path for email/location. |
| U4 | Monetization model (paid app / IAP / subscription / ads) and whether payment is core-path. |
| U5 | P1 scope: repro rate, affected journeys, data-loss or refund impact, triage owners. |
| U6 | Whether a draft privacy notice exists; who owns legal/trust. |
| U7 | Whether any informal support channel exists. |
| U8 | Build/version identity; store submission state; whether review is already passed. |
| U9 | Whether crash/analytics telemetry exists for the launch funnel. |
| U10 | What "public beta" means (program, audience, content, timing). |
| U11 | Rollback/forward-fix options (store update cadence, feature/kill switches). |
| U12 | Contractual obligations: refunds, terms, paid entitlements. |
| U13 | Whether the P1s are known-reversible defects or security/data-loss-class. |

---

## 3. Gate matrix (pass / watch / blocked / not-applicable-with-proof)

| Area | Rule | Status | Basis |
| --- | --- | --- | --- |
| Launch objective & no-go criteria | `launch-1` | **blocked** | No objective or no-go criteria defined in evidence. |
| Product core promise | `launch-1` | **blocked** | No evidence of core promise working for target segment. |
| Monetization / payment | `launch-2` | **blocked** | Two open P1 crashes in payment flow (F7); payment grants unreliable → no-go for paid launch. |
| Distribution / store | `launch-3` | **blocked** | No metadata, privacy, review notes, test accounts, or store state (U8); privacy notice absent (F4). |
| Support | `launch-7` | **blocked** | No support plan (F5). |
| Analytics | `launch-6` | **blocked** | Telemetry existence unknown (U9); required to see launch funnel and failure signals. |
| Trust / legal | `launch-3` | **blocked** | Collects email + location (F3) with no published privacy notice (F4); privacy/legal class cannot be waived by business approval. |
| Operations — rollback/recovery | `launch-8` | **blocked** | No rollback runbook (F6), no restoration drill evidence; app stores may not permit instant rollback (`release-health-1`). |
| Operations — incident response | — | **blocked** | No incident responder on call (F8). |
| Promotion | `launch-9` | **blocked** | Beta promise (F9) unverified against shipped behavior; marketing readiness never substitutes product readiness. |
| Post-launch review | `launch-10` | **watch** | No fixed post-launch review window defined; small effort, define it. |

No gate can be marked not-applicable-with-proof: every blocked area is applicable to a personal-data-collecting, payment-bearing mobile launch.

---

## 4. Severity-ranked findings + actions

### F-01 — CRITICAL · Payment-flow P1 crashes open at launch window
- **Evidence class**: fact (F7). **Rules**: `launch-2`, release-health money plane ("immediate paid-flow stop or rollback").
- **Finding**: An unreliable payment path is a no-go for a paid launch. If unfixed, users hit checkout/entitlement failures in week one, refunds and store ratings follow.
- **Action**: Fix both P1s on the exact candidate build; prove with crash smoke + replay and a signed-off test pass. Owner: payment engineering lead. Deadline: before the re-admission review. Consequence: no-go persists; no partial exposure of the payment path.
- **Residual**: first-week checkout-failure cohort remains unknown until live telemetry exists.

### F-02 — CRITICAL · No published privacy notice while collecting email + location
- **Evidence class**: facts (F3, F4); store policy requirement is an external-authority inference (I4) pending live verification. **Rules**: `launch-3`, trust plane.
- **Finding**: Privacy/legal gaps are a hold/no-go class; generic business approval cannot waive them. Store submission is likely blocked without a privacy policy, and regulator exposure exists.
- **Action**: Publish a privacy notice at the store and in-app covering email/location collection, purpose, retention, sharing, and deletion; run a consent audit; verify store-side URL. Owner: legal/trust lead. Deadline: before store submission. Consequence: no store submission without it.
- **Residual**: adequacy against applicable regimes (U1 territories) needs external legal verification.

### F-03 — CRITICAL · No rollback runbook; recovery not provable
- **Evidence class**: fact (F6). **Rules**: `launch-8`, `release-health-1`.
- **Finding**: App stores may not permit instant rollback; a launch without a defined rollback/forward-fix/kill-switch path is unbounded on the failure side.
- **Action**: Write the rollback runbook (rollback vs forward-fix vs kill switch, per-flow), name the rollback owner, and run a restoration drill on the candidate build. Proof: drill pass recorded. Consequence: no admission without it.
- **Residual**: store review latency for forward fixes remains an external dependency.

### F-04 — HIGH · No incident responder on call
- **Evidence class**: fact (F8).
- **Finding**: Even a fixed build needs a responder; launch incidents without an on-call owner are discovered by users first.
- **Action**: Stand up an on-call roster and escalation route sized to blast radius; test alert delivery. Owner: engineering manager. Deadline: before re-admission. Consequence: hold on any full exposure.
- **Residual**: human judgment under first-week load is unproven until the first real incident.

### F-05 — HIGH · No support plan
- **Evidence class**: fact (F5). **Rules**: `launch-7`.
- **Finding**: With payment-flow defects pending, no support plan means refunds, escalations, and known-issue handling are undefined at the moment of highest user friction.
- **Action**: Define help center / macros / escalation / refund route / known-issues page and test the contact route. Owner: support lead. Deadline: before re-admission. Consequence: conditional-go blocker until P1s are also closed.
- **Residual**: support volume is unforecast; first-week theme triage is unproven.

### F-06 — HIGH · Marketing beta promise vs launch reality
- **Evidence class**: fact (F9). **Rules**: `launch-9`.
- **Finding**: A public promise of beta in three weeks must match shipped behavior; marketing readiness never substitutes for product, payment, support, or recovery readiness. The promise may outrun a slipped launch.
- **Action**: Align the beta claim with the admission record — either commit the shipped scope before the promise stands or correct/delay the campaign. Owner: marketing + release manager. Consequence: delay the campaign, not just the product.
- **Residual**: public claim already made; even a corrected claim leaves reputational cost.

### F-07 — MEDIUM · Analytics / observability unverified
- **Evidence class**: unknown (U9). **Rules**: `launch-6`.
- **Finding**: No launch watch is definable without crash and funnel telemetry; manual monitoring alone is not admission evidence.
- **Action**: Confirm crash reporting plus checkout/consent funnel events with live query proof. Owner: analytics owner. Deadline: before re-admission. Consequence: cannot define watch → no expansion beyond a bounded canary.
- **Residual**: baselines absent until first data; thresholds start as hypotheses needing owner acceptance.

### F-08 — MEDIUM · Distribution/store evidence absent
- **Evidence class**: unknown (U8). **Rules**: `launch-3`.
- **Finding**: Store metadata, screenshots, review notes, test accounts, and submission state are unverified; store submission is a no-go without them.
- **Action**: Produce and verify store assets and submission state against the actual store console. Owner: release manager. Deadline: before submission. Consequence: no store submission.
- **Residual**: store review timing is external and unforecastable.

### F-09 — LOW · No fixed post-launch review window
- **Evidence class**: unknown. **Rules**: `launch-10`.
- **Finding**: Without a fixed review, launch evidence will not convert into roadmap changes.
- **Action**: Schedule a post-launch review (e.g. +2 weeks after readback) with the owning test/runbook/gate updates. Owner: release manager.
- **Residual**: none material.

---

## 5. Verdict

**`no-go`** for the declared next-week launch.

Machine-readable reasons:

```text
verdict=no-go
declared_window=next_week
blocked_gates=monetization,trust_legal,support,operations_recovery,operations_oncall,distribution,promotion,analytics
money_plane_unreliable=true
privacy_disclosure_missing=true
recovery_plan_missing=true
oncall_missing=true
support_plan_missing=true
promotion_claim_unverified=true
candidate_identity_unknown=true
decision_owner_unknown=true
```

Re-admission path (each condition has owner, deadline, exact proof, consequence; none may be waived by generic business approval because privacy, payment, and recovery classes require owning authority):

| Cond | Owner | Deadline | Exact proof | Consequence if missed |
| --- | --- | --- | --- | --- |
| C-01 Both P1s fixed & verified on candidate build | Payment lead | Re-admission review | Crash smoke + replay pass, signed test record | no-go persists |
| C-02 Privacy notice published & store-verified; consent audit | Legal/trust | Before submission | Live store URL + audit record | no store submission |
| C-03 Rollback runbook + restoration drill passed | Release manager | Re-admission review | Drill record on candidate build | no admission |
| C-04 On-call roster live with tested escalation | Eng manager | Re-admission review | Schedule + alert test proof | hold on full exposure |
| C-05 Support plan live (macros, escalation, refunds) | Support lead | Re-admission review | Tested contact route | conditional-go blocked |
| C-06 Beta claim aligned with shipped scope | Marketing + release | Before campaign | Claim statement vs admission record | campaign delayed |
| C-07 Telemetry verified for payment + consent funnels | Analytics owner | Re-admission review | Live dashboard query proof | canary-only cap |

If all conditions pass, the earliest admission is a **conditional-go** at the next window with a bounded canary/staged rollout and the watch below — not a full `go`.

---

## 6. Launch watch (activation gated on re-admission)

Dashboard rows per the release-health contract; baselines do not exist yet, so thresholds start as internal hypotheses requiring owner acceptance before launch (never presented as platform policy):

| Plane | Signal | Segment | Owner | Stop/hold predicate |
| --- | --- | --- | --- | --- |
| Release mechanics | Store state + exact version readback | store, version | Release manager | hold until exact artifact readback correct |
| Reliability | Crash-free sessions in payment journey | version, OS, journey | Eng | hold/rollback on regression vs baseline |
| Money | Checkout success, entitlement grant, refund rate | version, channel, offer | Payment owner | immediate paid-flow stop on failure rise |
| Trust | Consent opt-in, deletion requests, privacy notice reach | version, region | Trust owner | stop affected exposure |
| Support | Ticket themes, duplicates, refunds | theme, version, locale | Support lead | link known issue, macro, fix owner |
| Commercial | Activation/conversion vs beta promise | channel, release | Marketing | inspect mechanism; never trade against hard floors |

No expansion on "no alert fired": expansion requires both no blocker and enough representative sample for the declared risk (`release-health-6`).

---

## 7. Residuals and watch items

- **External**: store review timing; platform enforcement of privacy-policy requirements; regulator interpretation of email/location handling.
- **Product**: first-week payment-failure cohort; beta promise fulfillment against shipped scope.
- **Ops**: forward-fix latency through store review; on-call judgment under load.
- **Assessment falsification** (what would flip this to conditional-go): evidence that (a) the P1s cannot reach users at launch, (b) a privacy notice is published and store-verified, (c) the rollback drill passes, (d) on-call is live, (e) telemetry is verified. Any of these absent keeps the `no-go`.

---

## 8. Closeout requirements

Close the record only after: the exact released identity is read back, all conditions C-01…C-07 are verified, triggered watch actions have recovery evidence, customer/support communication is truthful, and systemic blind spots have a durable owning correction (release-health-7, `launch-10`). Post-launch review completes the loop within a fixed window.
