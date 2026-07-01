Subscription price-increase context:  
B2B SaaS price increase across legacy annual contracts, monthly self-serve, enterprise, grandfathered plans, and usage-overage customers. Objective: improve net revenue while protecting trust, retention, contract compliance, and support capacity.

Audience / source of truth / risk boundary:  
- Audience: Finance, Pricing, RevOps, Sales, CS, Support, Legal, Product, Billing Ops.  
- Sources of truth: CRM contracts, billing system, subscription ledger, coupon table, usage warehouse, support history, cancellation-risk model, renewal calendar.  
- Risk boundary: no cohort launches without verified contract terms, notice timing, renewal-window handling, support scripts, exception owners, and rollback triggers.

---

Channel rule matrix:

| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct self-serve billing | Email + in-app notice; confirm ToS/contract notice period; explicit consent if region/contract requires | If valid notice and no consent required, renews at new price; if consent required and no response, block increase or keep old price until resolved | In-product cancellation; internal refund/goodwill policy | ToS, billing logs, email delivery, region rules |
| Direct sales-assisted annual | Notice per order form/MSA; account-owner outreach before automated notice | Apply only at renewal or amendment unless contract permits mid-term change | Account owner + Finance/Legal review | CRM contract, renewal clause, notice clause |
| Enterprise | No automated price change without account-owner and Legal review | Apply at renewal, expansion, or amendment only | Contractual route; no support-chat promises | MSA, order form, renewal date, amendment rights |
| Reseller / partner, if applicable | Partner-specific notice and pass-through terms | Do not change until partner process verified | Partner escalation route | Partner agreement, reseller billing owner |

---

Priority cohort matrix:

| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Legacy annual contracts | Direct sales; T-120/T-90 renewal planning | Medium/high if surprise | Keep current term; migrate at renewal with account-owner outreach | Zero mid-term unauthorized changes |
| Monthly self-serve active users | Direct; T-60/T-30 notice | Medium | New price at next eligible renewal; offer annual lock-in before increase | Cancellation intent and downgrade spike |
| Monthly low-usage / dormant | Direct; T-60/T-30 | High | Delay increase or pair with downgrade/pause/enablement path | Churn above threshold pauses cohort |
| Enterprise customers | Direct contract; renewal-led | High revenue risk | Account-specific renewal strategy; no bulk automation | Sales escalation budget |
| Grandfathered plans | Direct; phased by renewal date | High trust risk | Sunset in phases; protected period; clear migration benefit | Complaint/refund spike |
| Usage-heavy overage customers | Direct; renewal + usage-cycle aware | Medium/high bill-shock risk | Separate base price change from overage policy; usage alerts and plan migration | Overage disputes, support tickets |
| Recent renewals / renewal within 30 days | Any direct channel | High surprise risk | Delay until next cycle or provide extended notice | Refund requests |
| Discounted/coupon users | Direct; discount-expiry dependent | Medium | Preserve discount through term; reprice after expiry with notice | Discount leakage and fairness |

---

Discount, contract, and exception matrix:

| Segment | Current discount/contract | Price-change treatment | Migration/exception path | Approval owner |
| --- | --- | --- | --- | --- |
| Legacy annual | Existing order form | No mid-term increase; renewal migration only | Renewal quote with phased step-up | Sales + RevOps |
| Enterprise | MSA/order form | Contract-specific | Amendment or renewal negotiation | Account owner + Legal |
| Self-serve coupon | Coupon expiry rules | Preserve until coupon/term ends | Annual lock-in or standard migration | Growth/Pricing |
| Grandfathered plan | Legacy protected price | Sunset with defined date or protected cohort | Comparable current plan, phased increase | Pricing council |
| Usage-overage heavy | Base + overage exposure | Do not compound bill shock blindly | Usage alerts, committed plan, overage review | Product + Finance |
| Hardship/nonprofit/education | Special terms | Manual review | Protected pricing or time-boxed credit | Support + Finance |
| Sales exception | Negotiated discount | Exclude from automation | Contract-owner review | Sales/RevOps |

---

Support and sales scripts:

- Monthly self-serve asks “why did price increase?” -> “We’re updating pricing to reflect product improvements and continued investment. Your new price starts on `<date>`. You can switch to annual before then to lock in savings, move to a lower plan, or cancel anytime before renewal.” Allowed: downgrade, annual migration, one approved save offer. Owner: Support.
- Low-usage user threatens cancellation -> “It sounds like the current plan may not be the right fit. We can help you move to a lower plan, review usage, or apply an eligible one-time transition offer.” Allowed: downgrade/save offer if eligible. Escalate repeated discounts to Retention owner.
- Legacy annual customer objects -> “Your current contract price remains through the current term. Your account owner will review renewal options before the new rate applies.” Allowed: no mid-term change. Owner: Account owner.
- Enterprise pricing question -> “Your agreement is managed through your account team. I’ll route this for contract review before any pricing commitment is made.” Allowed: escalation only. Owner: Sales + Legal.
- Grandfathered-plan complaint -> “We’re retiring this legacy plan on `<date>`. You’ll have a protected transition period and migration options.” Extensions require Pricing council approval.
- Usage-overage bill shock -> “The base subscription change is separate from usage charges. We can review usage controls, alerts, and whether a committed plan lowers your total cost.” Credits require Finance/Product approval.
- Refund request -> “We’ll review notice delivery, renewal date, and eligibility under our refund policy.” Exceptions above policy require Support lead approval.

---

Retention and trust plan:

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Value narrative | Tie increase to actual product improvements, reliability, support, security, roadmap | Release notes, adoption metrics | Weak story increases churn | Product Marketing |
| Notice timing | T-90 for enterprise/annual; T-60/T-30 for self-serve; avoid <30-day surprises | Renewal calendar | Refund/support spike | Billing Ops |
| Annual migration | Offer monthly users annual lock-in before increase | Conversion and margin model | Pull-forward discount leakage | Growth |
| Save offers | Eligibility-based, one-time, measured against holdout | Churn-risk model | Training users to threaten churn | Retention |
| Grandfathering | Time-boxed sunset or explicit protected cohort | Cohort size, margin exposure | Trust breach | Pricing council |
| Sales exceptions | Approved bands only; record reason and expiry | CRM fields | Uncontrolled discounting | RevOps |
| Refunds | Policy-based with goodwill path for notice failures | Notice logs | Chargebacks | Support lead |
| Reporting | Net revenue after churn, refunds, discounts, support load | Dashboard | False revenue lift | Finance |

---

Rollback and mitigation triggers:

- Churn or cancellation intent exceeds cohort threshold -> pause next cohort, extend notice, add downgrade/annual migration path; owner: Retention.
- Refunds, disputes, or failed renewals spike -> pause affected billing segment, audit notices, activate refund macro; owner: Billing Ops.
- Support volume or negative sentiment exceeds threshold -> freeze rollout, publish clarification, expand macros; owner: Support.
- Enterprise or sales escalations exceed exception budget -> stop automation for sales-owned accounts; owner: RevOps.
- Net revenue after churn/refunds/save offers/support load below control -> revise price step or rollback cohort; owner: Finance.
- Contract ambiguity found -> block account from change until Legal review; owner: Legal.

---

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:

- `T-120/T-90 annual renewal` -> account-owner review, renewal quote, contract validation.
- `T-60 self-serve notice` -> email + in-app notice, old/new price, effective date, cancellation and migration options.
- `T-30 reminder` -> annual lock-in, downgrade path, support contact.
- `Cancellation intent` -> show transparent downgrade/annual/save option; allow cancellation without friction.
- `Save offer shown` -> only if eligible; record offer, acceptance, margin impact, and churn outcome.
- `Renewal observed` -> track success, failure, refund, downgrade, churn, expansion.
- `Post-change review` -> cohort readback at 7/30/60/90 days.

Required events:  
`price_increase_scoped`, `cohort_segmented`, `notice_delivered`, `consent_recorded_if_required`, `save_offer_shown`, `save_offer_accepted`, `renewal_observed`, `refund_requested`, `support_contacted`, `retention_reviewed`.

Core reporting:  
Net revenue lift = uplift revenue − churn loss − downgrades − refunds − save-offer cost − support cost − payment failures. Track by cohort, plan, tenure, channel, region, renewal window, contract type, usage level, and account owner.
