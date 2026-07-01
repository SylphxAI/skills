```text
Subscription price-increase context:
Audience: existing mobile subscribers (direct web, App Store, Google Play) across multiple launched countries.
Source of truth: billing system of record + store receipt/server-notification; pricing council owns cohort eligibility; legal owns notice/copy.
Risk boundary: team has not verified store consent rules, no-action outcomes, renewal-price proof, or refund routing. Until verified, store cohorts are LAUNCH BLOCKED except via pre-approved holdout.

Channel rule matrix:
| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct web | ToS/contract + email + in-app; consent if local law requires | Renewal at new price on next cycle unless cancelled | Internal billing; prorated refund per ToS | Notice logs, invoice ledger, payment events |
| App Store | `verify before rollout` per country + subscription group | `verify before rollout` — old vs new price on auto-renew | Apple refund route via App Store Connect / support macro | App Store Connect config, App Store Server Notification v2, territory evidence |
| Google Play | `verify before rollout` per country + base plan | `verify before rollout` — old vs new price, grace/account-hold behavior | Google refund route; user cancels in Play | Play Console base plan/offer config, RTDN events, country evidence |

Consent and renewal state table:
| Channel | Consent required? | Consent pending | Accepted | Declined | No response | Renewed old/new price | Payment failed/disputed | Required evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Direct | Per ToS + local law (verify per region) | Notice timestamp logged | Consent event recorded | Old price or cancel per policy | New price on renewal per policy | Invoice ledger | Retry/grace/chargeback path | ToS, notice log, invoices |
| App Store | `verify before rollout` per territory | Store subscriber status as verified | App Store Server Notification confirms new price | Store-managed cancel/old-price state as verified | `verify before rollout` | App Store Server Notification proves renewal price | Store refund/dispute evidence | Receipt + App Store Server Notification, territory doc |
| Google Play | `verify before rollout` per territory | Play price-change state as verified | RTDN confirms new price | Cancel/old-price/account-hold state as verified | `verify before rollout` | RTDN proves renewal price | Grace/account-hold/refund evidence | Play Console + RTDN, territory doc |

Priority cohort matrix:
| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Enterprise / sales-exception / contract | Direct, all regions | Contract-bound | Hold automation; account-owner + Legal review | Any unapproved contract touched = stop |
| Grandfathered legacy plan | Direct + stores, per region | High trust risk | Sunset in phases; preserve protected cohort until policy confirmed | Complaint/refund >Yx baseline = pause |
| Annual self-serve, T-90/T-60 | Direct + stores (post-verify) | Medium | Phase 1 launch cohort | Churn +Xpp vs holdout |
| Annual self-serve, T-30 | All channels | High surprise risk | Delay unless notice already valid + verified | Renewal-week surprise >threshold = rollback |
| Monthly self-serve, T-60+ | Direct + stores (post-verify) | Medium | Phase 2 after Phase 1 readback | Net revenue below control = pause |
| Monthly self-serve, T-30 or renewal week | All channels | Highest | DELAY launch for this cohort | Included only after refund/support path pre-approved |
| Trial-to-paid (active) | Stores | Medium | Hold; do not reprice mid-trial | Trial complaint spike = block |
| Discounted coupon / promo active | Direct + stores | Margin leakage risk | Preserve coupon through current term; migrate at expiry | Coupon stacking = block |
| Education / nonprofit / hardship | Direct | Trust risk | Protected pricing or manual exception | Any auto-bill change = block |
| Usage-heavy / overage-exposed | Direct | Bill-shock risk | Separate base-price increase from overage review | Overage complaint >Yx = pause |

Discount, contract, and exception matrix:
| Segment | Current state | Treatment | Migration/exception path | Approval owner |
| --- | --- | --- | --- | --- |
| Legacy discounted self-serve | Coupon/promo live | Preserve through term, then migrate | Migration offer with clear effective date | Growth/Pricing |
| Sales-exception / negotiated | Contract record | No auto-change | Account-owner renewal review | Sales/RevOps |
| Enterprise annual contract | MSA + order form | Apply at renewal/amendment only | Legal + account owner amendment | Legal + Account owner |
| Grandfathered legacy plan | Protected cohort | Phase sunset only after council approval | Loyalty credit or migration benefit | Pricing council |
| Overage-heavy user | Usage spike history | Base increase separate from overage | Usage alert + plan migration | Product + Finance |
| Education / nonprofit / hardship | Verified status | Protected pricing or manual exception | Support-led exception | Support + Finance |

Offer governance:
| Offer | Eligible cohort | Exclusions | Expiry | Measurement | Abuse/fairness guardrail |
| --- | --- | --- | --- | --- | --- |
| Annual migration discount | Monthly T-60+ self-serve | Enterprise, contract, hardship, already-discounted | Set per cohort; max 1/account/cohort | Holdout vs exposed; retained revenue, later churn | Plain-language eligibility; cancel without penalty |
| Phased loyalty credit | T-90/T-60 annual, tenure ≥12mo | Hardship, contract, grandfathered sunset cohort | Time-boxed; single use | Net revenue, complaint rate | No repeat stacking |
| Pause / downgrade path | All eligible self-serve | Enterprise, contract | Per policy | Save-offer accept vs downgrade vs cancel split | Accessible, no friction, reversible |
| One-time retention discount | High churn-risk, eligible margin floor | Abusive repeat, contract, hardship, unsupported store channel | Single use, cooldown N days | Holdout; save cost vs retained revenue | Frequency cap; reason code required |
| Grandfather extension | Protected cohort only | Non-protected | Council-set window | Trust/complaint signal | Pricing council approval only |

Launch sequencing decision (renewal-week users):
- Rule: renewal-week (T-7 to T+7) cohorts are DELAYED across all channels unless (a) verified notice/consent is already live, (b) refund + support path pre-approved, (c) store no-action outcome verified per territory. This is a launch-block condition, not a discount lever.

Support and sales scripts:
- Renewal-week surprise → confirm notice version + effective date; offer refund/goodwill per policy; route to support lead if above threshold.
- Monthly low-usage cancellation threat → acknowledge fit; downgrade/pause/annual option; one save offer only if eligible and within cap; cancel without friction.
- Grandfathered sunset complaint → explain sunset, protected period, migration benefit; escalate extension only via pricing council.
- Contract / enterprise question → no price commitment in chat; account-owner review; pause automated notice for that account.
- Refund / dispute after notice → clarify notice, route via store refund for store-billed, internal billing for direct; log reason code.

Rollback and mitigation triggers:
- Churn / downgrade / cancellation intent >+Xpp vs holdout in any cohort → pause next tranche, extend notice, open downgrade path.
- Refunds + disputes + support tickets >Yx baseline by channel → freeze that channel, activate refund macro, owner review.
- Net revenue after churn/refunds/credits/support/sales concessions below holdout control → roll back cohort or redesign step before scaling.
- Store-billed no-action or consent unverifiable for a launched country → block that territory until console/API evidence captured.
- Unapproved contract or grandfathered cohort touched → stop automation immediately; Sales/Legal or pricing council review.
- Metrics clear all blockers for N days → resume next tranche from T-90/T-60 only.

Net revenue and LTV readback:
| Cohort / channel | Gross uplift | Churn | Downgrades | Refunds | Save cost | Support cost | Failed renewals | Sales concessions | Trust signal | Projected LTV/NRR | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Direct annual T-90/T-60 | Lift vs control | Δpp vs holdout | Δ vs control | Δ vs control | Credit $ | Ticket $ | Count | $ | Complaint rate | Δ LTV | Continue / pause |
| Direct monthly T-60+ | Lift vs control | Δpp vs holdout | Δ vs control | Δ vs control | Credit $ | Ticket $ | Count | $ | Complaint rate | Δ LTV | Continue / pause |
| App Store (post-verify only) | Lift vs control | Δpp vs holdout | n/a | Store refund Δ | n/a | Ticket $ | Count | n/a | Store review + complaint | Δ LTV | Continue / pause / block |
| Google Play (post-verify only) | Lift vs control | Δpp vs holdout | n/a | Play refund Δ | n/a | Ticket $ | Count | n/a | Play review + complaint | Δ LTV | Continue / pause / block |
| Contract / enterprise | n/a (held) | n/a | n/a | n/a | n/a | Ticket $ | n/a | Concession $ | Escalations | Renewal-cycle LTV | Manual review |
| Grandfathered sunset | $ retained | Δpp | Δ | Δ | Credit $ | Ticket $ | Count | n/a | Trust NPS | Cohort LTV | Council decision |

Launch decision (today):
1. Direct web — proceed with T-90/T-60 annual cohort behind holdout; verify local notice/consent per country before T-30 expansion.
2. App Store + Google Play — HELD until evidence captured for: consent requirement per country, no-action renewal price, refund route, App Store Server Notification / RTDN renewal-price proof. Each unverified territory = launch block.
3. Renewal-week (T-7 to T+7) cohorts — DELAYED on every channel until the four evidence items above are verified and refund/support policy pre-approved.
```
