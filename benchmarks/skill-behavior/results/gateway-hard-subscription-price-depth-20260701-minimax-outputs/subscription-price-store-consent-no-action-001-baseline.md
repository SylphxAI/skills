# Launch Decision Plan — Mobile Subscription Price Increase

**Scope:** Active subscribers on Direct Web, App Store, Google Play across multiple countries.

---

## 1. Decision Matrix — Consent by Cohort

| Channel | Country | Consent Required | Mechanism | Owner |
|---|---|---|---|---|
| Web (direct) | All | **Yes** | Email + in-app notice; explicit Accept/Decline before next renewal | Product/Legal |
| App Store | All | **Platform-managed** | Apple's subscription price-increase policy auto-notifies; no opt-in from us | Apple |
| Google Play | All | **Yes (per Google policy)** | Google Play in-app consent dialog; without consent user stays at old price until end of term | Google |
| Google Play | EEA / UK / KR / JP (jurisdictions with consumer protections) | **Yes + local notice** | Country-specific in-app dialog meeting local e-commerce law (KR ECA, EU CRD) | Legal/Compliance |

**Rubric-critical:** Only Web and Google Play cohorts require *our* consent collection. Apple is fully platform-managed; document but do not implement a custom consent flow.

---

## 2. No-Action Handling

- **Web:** No acceptance → renewal does **not** proceed at new price. Cycle either cancels at term-end or remains at old price per contract. Log decision to audit trail.
- **App Store:** No action → Apple does **not** renew existing subscribers at the new price. Platform behavior; we observe via renewal webhook.
- **Google Play:** No consent → subscriber stays at current (old) price indefinitely until explicit renewal/churn per Google policy. Verify with Google Account Manager.

**Default rule:** No silent price switch in any channel. Renewable at new price only on explicit/managed consent.

---

## 3. Renewal Evidence — Old vs New Price

Receipt/server notification evidence captured per cohort:

| Channel | Evidence Source | Event to Capture |
|---|---|---|
| Web | Billing webhook (e.g., Stripe `invoice.created`) | plan price, prior plan ID, renewal timestamp |
| App Store | App Store Server Notifications v2 | `SUBSCRIBED` / `DID_RENEW` with `price` field; `original_transaction_id` continuity |
| Google Play | RTDN | `SUBSCRIPTION_PRICE_CHANGE_CONFIRMED`, then `SUBSCRIPTION_RENEWED` |

**Audit query per user:** confirm renewal event contains new price AND original subscription identifier is preserved (no re-subscription). Reconciled daily; mismatch rate target **< 0.5%**.

---

## 4. Refund Routing

| Channel | Refund Path | Tool |
|---|---|---|
| App Store | Original payment method via Apple | App Store Connect |
| Google Play | Original Google Payments method | Play Console |
| Web | Original processor (card/wallet) | Stripe / PSP dashboard |
| Tax/VAT delta | Prorated refund if user renewed at old price inadvertently | Finance GL line item per jurisdiction |

All refunds journalized with: user ID, transaction ID, plan version (old/new), refund amount, tax component.

---

## 5. Renewal-Week Inclusion

**Decision: Include renewal-week users (within 7 days of next renewal).**

- Reason: Price change applies at the next renewal. Excluding creates a cohort mismatch between the consent list and the actually-billed list — audit risk.
- Rule: New price applies at the next scheduled renewal regardless of whether that renewal is < 7 days away. Communications already in band.

---

## 6. Go/No-Go Gate

| # | Criterion | Threshold | Owner |
|---|---|---|---|
| 1 | Consent flows end-to-end tested in all 3 channels | 100% pass | QA |
| 2 | Apple/Google price change approved in store review | Approved | Partner Mgmt |
| 3 | Server notification capture rate | ≥ 99.5% | Backend |
| 4 | Country-specific legal sign-off | All target markets cleared | Legal |
| 5 | Soft-launch (Web, 1 country) accept rate | ≥ 80% | Growth |
| 6 | Finance refund validation end-to-end | Pass | Finance |
| 7 | CS scripts + escalation paths ready | 5 FAQs × 3 channels | CX |

---

## 7. Staged Rollout

1. **Soft-launch:** Web, single country, 7 days.
2. **Platform channels:** Enable Apple + Google price change after App/Play review approval (no prior soft-launch needed — platform-managed).
3. **Full rollout:** After 7-day metric gate — accept rate ≥ 80%, renewal mismatch < 0.5%, refund resolution < 5 days.
4. **Post-launch audit:** 30-day reconciliation of new vs old cohort revenue.

---

## 8. Audit Artifacts Bundle

1. Signed-off decision matrix (Legal + Product + Finance).
2. Consent logs (timestamp, version, user action per cohort).
3. Server notification capture logs (Apple v2, Google RTDN, web billing).
4. Per-user renewal-event evidence (old/new price reconciled).
5. Refund journal entries with tax/VAT components.
6. App Store / Play Console review approvals.
7. Jurisdiction-specific legal sign-off forms.
8. Soft-launch metrics and anomaly log.
9. Customer support ticket archive.
10. Retention policy: **7 years**; immutable storage; review access logged.

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Auto-renewal at old price due to consent miss | Server-side renewal guard; abort + notify on price mismatch |
| App/Play review rejection of price increase | Sandbox-validate; staged region-by-region submission |
| Refund volume exceeds platform window | Finance pre-approves out-of-platform credit path |
| Country-specific regulator challenge | Pre-cleared notice; opt-out cancellation free of charge |

---

**Recommendation:** Proceed to staged rollout, gated on items 1–4 of the Go/No-Go table. Hold platform-channel enabling until store review approval lands. Include renewal-week users.
