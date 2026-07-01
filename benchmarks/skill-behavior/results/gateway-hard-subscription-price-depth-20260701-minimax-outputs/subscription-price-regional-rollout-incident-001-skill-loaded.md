```text
Subscription price-increase context:
Audience: global design-tool subscribers in first launched country/territory tranche.
Source of truth: billing system of record + contract/ToS + App Store/Play Console evidence; pricing council minutes.
Risk boundary: do not trade trust or NRR for headline ARPU lift; stop automation on any protected-cohort breach until evidence clears.
Decision today: PAUSE next tranche; run readback; remediate grandfathered/discounted/education/enterprise cohorts before resuming.

Channel rule matrix:
| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct (web) | Email + in-app banner; ToS update timestamp; explicit consent not required where notice is clear | Renew at new price on next cycle unless cancelled in window | Self-serve cancel + prorated refund per ToS | Notice logs, consent ledger, invoice/payment events |
| App Store | `verify before rollout` per territory, subscription-group setting, App Store price-change flow | `verify before rollout` — store-managed; do not assume | Apple refund route; support explains store billing | App Store Connect config, receipt + server notification, territory evidence |
| Google Play | `verify before rollout` per country, base plan/price-change API state | `verify before rollout` — RTDN confirms; do not assume | Google refund route; support explains Play billing | Play Console base plan, RTDN/API, country evidence |
| Enterprise invoice | Contract notice clause; no auto-change mid-term | No change until renewal/amendment | Per MSA; account-owner handled | MSA/order form, renewal clause, legal sign-off |

Consent and renewal state table:
| Channel | Consent not required | Consent pending | Accepted | Declined | No response | Renewed old/new price | Payment failed/disputed | Required evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Direct | Yes, with valid ToS notice | Banner/email timestamped | Click-through log if offered | Cancel preserves old price | Renew at new price on cycle | Invoice ledger proves price | Retry → grace → dunning | Notice log, invoice, payment events |
| App Store | `verify before rollout` | Store-managed | Receipt + server notification | Store cancellation | `verify before rollout` (BLOCKER) | Receipt proves price | Refund/dispute evidence | App Store Connect + receipt |
| Google Play | `verify before rollout` | Play-managed | RTDN/API | Cancel/account-hold | `verify before rollout` (BLOCKER) | RTDN proves price | Grace/account-hold evidence | Play Console + RTDN |
| Enterprise | No — contract governs | n/a | Amendment signed | n/a | Renewal per MSA | Invoice per contract | Per MSA | Signed amendment |

Priority cohort matrix:
| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Enterprise contract (all) | Direct/invoice; mid-term or near renewal | High + legal | Freeze auto-notice; account-owner + Legal review; no change until renewal/amendment | Zero unapproved contract touches |
| Grandfathered legacy plan | All channels; in window or just-renewed | High + trust | Extend grandfathering; suppress new packaging until migration offer ready | Complaint rate `>Yx baseline` → pause |
| Discounted/coupon self-serve | Mostly direct; renewal windows T-30/T-7 | High | Preserve coupon through current term; transparent migrate date | Margin leakage log + fairness review |
| Education/nonprofit | All channels | High + mission | Hold protected pricing; manual exception queue | Eligibility proof + Support owner |
| Usage-heavy overage | Direct + App Store/Play | Medium | Separate base-price from overage messaging; offer usage alert + plan migration | Overage shock complaints `>threshold` |
| New standard monthly | Direct/App/Play; T-90/T-60 first | Lower | Proceed with verified notice only after readback clears | Net revenue vs holdout |

Live rollout incident readback (first tranche):
| Region | Channel | Plan/package | Discount/contract cohort | Signal breach | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Launched country A | Direct + App Store + Play | Legacy/grandfathered | Grandfathered, coupon, education, enterprise | Cancellations, refunds, social complaints, sales escalations all `>Yx baseline`; trust signal breached | PAUSE next tranche; freeze automation for protected cohorts; activate readback | Rollout owner |
| Launched country A | Direct | New standard monthly | None | Within `+Xpp vs holdout` | Hold; do not scale | Pricing + Growth |
| Launched country A | App Store / Play | Legacy | Grandfathered/coupon | Store no-action outcome unknown | BLOCKER — verify console/API before any further notice | Product + Legal |
| Launched country A | All | Tax-inclusive display | All | Localized complaints re tax/language | Pause country until tax display + locale corrected | Product + Growth |

Discount, contract, and exception matrix:
| Segment | Current discount/contract | Price-change treatment | Migration/exception path | Approval owner |
| --- | --- | --- | --- | --- |
| Enterprise annual contract | MSA + order form | No mid-term change | Amendment at renewal; account-owner led | Account owner + Legal |
| Sales exception / negotiated | Opportunity record | Hold; manual review | Renewal migration inside approved band | Sales/RevOps |
| Grandfathered legacy plan | Protected pricing policy | Extend protected window; phased sunset | Migration benefit + loyalty credit | Pricing council |
| Coupon/discount self-serve | Coupon source on file | Preserve through current term | Clear effective date; one migrate offer | Growth/Pricing |
| Education/nonprofit | Verified status | Protected pricing | Manual exception queue | Support/Finance |
| Hardship | Support history | Hold; manual review | Pause/downgrade + goodwill | Support lead + Finance |
| Usage overage | Usage-based add-on | Separate base-price change | Usage alert + plan migration | Product + Finance |

Support and sales scripts:
- Enterprise contract asks why price changed → "Your current contract price is unchanged through [term]. We'll discuss renewal options with your account owner before any change." Action: route to account owner; no in-chat concession. Approval: Sales/Legal for any non-standard term.
- Grandfathered plan sunset complaint → "Your plan is protected until [date]. We've extended that window by [N] months and will offer a migration benefit before any change." Action: extend per policy; log reason code. Approval: Pricing council for any extension beyond policy.
- Education/nonprofit trust breach → "Thanks for flagging. We're holding education pricing while we correct the notice." Action: restore prior pricing; refund differential if charged; log. Approval: Support/Finance.
- Discounted/coupon monthly threatens cancel → "Your current coupon price stays through [term]; here's the new price effective [date] and downgrade/pause options." Action: one pre-approved save offer if eligible; otherwise clean cancel. Approval: Retention owner for repeat/high-discount.
- Overage bill shock → "Base price and overage are separate. Here's usage alert + plan options." Action: usage credit only per policy. Approval: Finance/Product above threshold.
- Refund/escalation after notice → "Notice version [X], effective [date], refund route is [Y]." Action: goodwill per policy; log reason code. Approval: Support lead above published threshold.

Offer governance:
| Offer | Eligible cohort | Exclusions | Expiry | Measurement | Abuse/fairness guardrail |
| --- | --- | --- | --- | --- | --- |
| Grandfather extension (N months) | Legacy protected | Enterprise, active coupon stacks | Set per cohort | Holdout vs treatment; complaint/refund delta | Plain-language notice; no dark-pattern cancel |
| Loyalty credit (one cycle) | Tenure 2y+, low risk | Enterprise, repeat-churn threat | Single use; expires at next renewal | Retained revenue, later churn | Cap per account; fairness review |
| Annual migration discount | T-60 self-serve | Already-discounted stacking | Until renewal cutoff | Migration rate, NRR | Margin floor enforced |
| Downgrade/pause | Any non-contract | Enterprise mid-term | Per published policy | Save rate vs churn | Accessible, reversible, no penalty |

Retention and trust plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Pause next tranche | Yes | Signal breaches above | Lost uplift | Rollout owner |
| Restore protected cohorts | Yes | Complaint + refund logs | Margin | Pricing council |
| Correct tax/locale display | Required | Localized complaints | Compliance | Product |
| Verify App Store/Play | BLOCKER | Console/API evidence | Compliance | Product + Legal |
| Public clarification | Issue within 48h | Social sentiment | Trust | Comms + Support |
| Holdout on next tranche | Keep 10% control | Random assignment | Revenue readback | Growth Analytics |

Rollback and mitigation triggers:
- Enterprise/contract or sales-exception touched by automation → stop, account-owner/Legal review before any notice.
- Grandfathered/education complaint rate `>Yx baseline` or `+Xpp vs holdout` → pause cohort, extend protected window, restore prior price.
- Country/localization complaint spike `>Yx baseline` → pause country, correct tax display and language with verified evidence.
- Refund/dispute/support `>Yx baseline` → freeze channel, activate refund/goodwill macro, route escalations.
- Sales escalations above approved exception budget → stop self-serve automation for affected accounts.
- Net revenue after churn/refunds/credits/support/concessions below holdout → roll back cohort or change offer before scaling.
- Store no-action or consent behavior unverifiable → block that channel until console/API evidence captured.
- Resume only when all blocking thresholds clear for `N` consecutive days; restart from T-90/T-60 cohorts.

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:
- Enterprise mid-term → no auto-change; renewal-led migration; account-owner script.
- Grandfathered sunset → extend protected window; phased sunset; migration benefit; Pricing council approval.
- Coupon/discount → preserve through current term; transparent effective date; one migration offer.
- Education/nonprofit → protected pricing; manual exception; Support/Finance approval.
- Overage-heavy → separate base vs overage messaging; usage alert; Product/Finance credit policy.
- Tax-inclusive display → correct locale, currency rounding, and effective date; localized clarification.
- Notice template → old price, new price, effective date, reason (value + tax-inclusive), cancellation route, refund route, support contact; accessible, plain language.
- Save offers → bounded per offer register; holdout measured; no stacking with coupons; abuse guardrail.
- Cancellation recovery → transparent, reversible, accessible; never required to view offer; reason captured.
- Refunds → prorated/goodwill per ToS; reason code + approval owner logged.
- Metrics → notice delivered, consent, renewal success, cancel intent, save shown/accepted, refund, complaint, churn, expansion, NRR by cohort/channel.
- Guardrails → see rollback triggers above.

Net revenue and LTV readback (first tranche):
| Cohort/channel | Gross uplift | Churn | Refunds/credits | Save cost | Support cost | Failed renewals | Sales concessions | Complaint/trust | Projected LTV/NRR | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Enterprise (all) | 0 (held) | Baseline | Baseline | 0 | Elevated | 0 | 0 | Elevated | Flat | Keep frozen; renew at term |
| Grandfathered | Low | `+Xpp vs holdout` | `>Yx baseline` | Loyalty credits | Elevated | Low | 0 | High | Below control | Extend grandfather; pause sunset |
| Discounted/coupon | Low | `+Xpp vs holdout` | `>Yx baseline` | Migration offer | Elevated | Low | 0 | High | Below control | Preserve coupon; defer migrate |
| Education/nonprofit | Low | `+Xpp vs holdout` | Refund diff | 0 | Elevated | 0 | 0 | High | Below control | Restore protected price |
| Standard monthly (new) | Within band | Within band | Within band | 0 | Baseline | Low | 0 | Baseline | On plan | Hold; do not scale |
| App Store / Play legacy | Unknown | Unknown | Unknown | 0 | Elevated | Unknown | 0 | Elevated | Unverifiable | BLOCK until console/API evidence |

Net call: PAUSE next tranche, restore protected cohorts, verify store behavior, publish clarification, then resume T-90/T-60 only when readback thresholds clear.
```
