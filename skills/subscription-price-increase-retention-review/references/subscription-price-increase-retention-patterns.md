# Subscription Price Increase Retention Review Patterns

## Subscription Price Increase Retention Review state machine

```text
increase_scoped -> cohorts_segmented -> channel_rules_verified -> value_message_prepared -> notice_delivered -> renewal_observed -> retention_learned
       |                 |                       |                         |                        |                 |
       v                 v                       v                         v                        v                 v
 scope_gap        cohort_blindspot        channel_blocked          weak_value_story           churn_spike      learning_gap
```

## Rule IDs

- `price-retention-1` — Segment cohorts by plan, tenure, usage depth, feature adoption, price sensitivity, billing channel, region, renewal date, and support history.
- `price-retention-2` — Model net revenue through uplift, churn, refunds, payment failures, save-offer cost, support load, annual migration, and long-term LTV.
- `price-retention-3` — Align value narrative to real product improvements, customer outcomes, plan differences, and future investment without exaggeration.
- `price-retention-4` — Map consent, notice, cancellation, renewal, refund, and platform-disclosure requirements for each billing channel and region.
- `price-retention-5` — Define grandfathering, phased increases, annual migration, loyalty credits, save offers, and hardship exceptions with eligibility and expiry.
- `price-retention-6` — Prepare cancellation recovery flows that are transparent, reversible, accessible, and measurable without dark patterns.
- `price-retention-7` — Instrument notice delivered, consent accepted, renewal success, cancellation intent, save offer shown, save accepted, refund, support contact, complaint, churn, and expansion.
- `price-retention-8` — Run post-change readback by cohort and channel, then update pricing, packaging, support, and lifecycle messaging based on evidence.
- `price-retention-9` — Treat renewal-date windows as a first-class rollout dimension: T-90/T-60/T-30/T-7 notice states, renewal cutoff, grace period, failed payment, and post-renewal refund window.
- `price-retention-10` — Keep App Store and Google Play behavior in a verification matrix instead of assuming one consent model; record current console/API rule, country exception, receipt/RTDN signal, and user no-action outcome.
- `price-retention-11` — Discounted, grandfathered, enterprise-contract, sales-exception, usage-overage, and hardship customers need separate treatment, approval owners, and migration paths.
- `price-retention-12` — Rollback and mitigation triggers must be defined before launch: churn, downgrade, complaint, refund, failed-renewal, support-load, sales-escalation, and net-revenue breaches each need an owner and action.
- `price-retention-13` — Save offers need governance: eligibility, exclusions, expiry, frequency cap, cost, abuse/fairness guardrail, and holdout measurement.
- `price-retention-14` — Launch sequencing should be renewal-window aware: block unverifiable store channels, delay too-close renewals, protect active contracts, then scale only after cohort readback clears.

## Mandatory matrices

### Cohort matrix dimensions

Use these fields before choosing grandfathering or save offers:

| Dimension | Required split | Why it matters |
| --- | --- | --- |
| Plan and packaging | legacy, current, annual, monthly, trial, usage overage | Prevents accidental entitlement or overage repricing surprises. |
| Tenure and loyalty | new, 3-12 months, 1-2 years, 2+ years, enterprise contract | Separates fairness/loyalty treatment from pure ARPU. |
| Usage/adoption | low usage, core user, power user, seat expansion, dormant | Avoids charging more before value is realized. |
| Billing channel | direct, App Store, Google Play, reseller/enterprise | Drives notice, consent, renewal, refund, and support route. |
| Region | tax/regulatory region, language, local notice law | Prevents one global notice from becoming a compliance gap. |
| Renewal window | T-90/T-60/T-30/T-7, renewal week, grace, just-renewed | Controls sequencing and refund exposure. |
| Churn risk | cancellation intent, downgrade history, support sentiment, payment failures | Protects net revenue instead of headline uplift. |
| Discount/contract status | coupon, negotiated discount, sales exception, grandfathered plan, enterprise contract, hardship credit | Prevents accidental margin leakage, contract breach, or unfair treatment. |

### Discount, grandfathering, and exception segmentation

| Segment | Default treatment | Required evidence | Approval owner |
| --- | --- | --- | --- |
| Legacy discounted self-serve | Preserve discount through current term, then migrate with clear effective date | coupon/source, discount expiry, renewal date, price delta | Growth/Pricing |
| Sales exception / negotiated discount | Do not auto-change until contract owner approves | opportunity/contract record, exception reason, renewal clause | Sales/RevOps |
| Enterprise annual contract | Apply at renewal or amendment only | MSA/order form, notice clause, renewal window | Account owner + Legal |
| Grandfathered plan | Sunset in phases or preserve explicit protected cohort | grandfathering policy, cohort size, margin exposure | Pricing council |
| Usage-heavy overage customer | Separate base-price increase from overage policy | usage distribution, overage bill shock, expansion path | Product + Finance |
| Hardship/nonprofit/education | Consider protected pricing or manual exception | eligibility proof, support history, mission risk | Support/Finance |

### Channel rule matrix

Do not rely on generic platform memory. Fill this matrix with current store-console/API evidence before launch:

| Channel | Verify | User states to handle | Support/refund route |
| --- | --- | --- | --- |
| Direct billing | Contract/ToS notice, email/in-app delivery, explicit consent if required, renewal invoice timing, payment retry behavior | notice sent, consent pending, accepted, declined, no response, renewal succeeded, payment failed, cancellation requested | internal billing policy, prorated/goodwill refund rules, chargeback escalation |
| App Store | Current Apple price-change flow, territory behavior, subscription-group settings, receipt/server-notification signal, user no-action outcome | platform notice shown, consent required/not required, accepted, declined, no response, store cancellation, renewal at old/new price as verified | Apple refund route, support macro explaining store-managed billing |
| Google Play | Current Play price-migration/price-change flow, base plan/offer setup, region timing, RTDN signal, user no-action outcome | platform notice shown, accepted, declined, no response, renewal/cancel state, grace/account-hold state | Google refund route, support macro explaining Play-managed billing |

If the current platform rule is unknown, write `verify before rollout` and make launch blocked for that channel.

### Offer governance and experiment design

Save offers protect net revenue only when they are bounded. Use an explicit offer register:

| Field | Required decision |
| --- | --- |
| Eligibility | Cohort, tenure, usage, churn risk, billing channel, region, and margin floor. |
| Exclusions | Enterprise contracts, abusive repeat churn threats, unsupported store channel, hardship/manual-review cohorts, and already-discounted plans when stacking would break margin. |
| Offer type | Annual migration, phased increase, temporary loyalty credit, downgrade path, pause, grandfather extension, or one-time retention discount. |
| Expiry and frequency cap | Expiration date, renewal cutoff, maximum uses per account, and cooldown before another save offer. |
| Measurement | Holdout or matched cohort, offer shown/accepted, retained revenue, refund/support cost, complaint rate, and later churn. |
| Fairness control | Plain-language eligibility, accessible cancellation, no hidden penalty for declining, and exception owner for hardship cases. |

### Launch sequence

1. Freeze source-of-truth cohorts and exclude any account with missing billing channel, renewal date, contract term, or discount provenance.
2. Verify channel rules for direct billing, App Store, Google Play, reseller, and enterprise contracts; mark unknown store behavior as a launch blocker.
3. Stage by renewal window: T-90/T-60 cohorts first, then T-30 only if notice is already valid; delay renewal-week and just-renewed cohorts unless a refund/support policy is pre-approved.
4. Send value narrative and notice with exact old price, new price, effective date, cancellation route, refund route, and support contact.
5. Observe consent, renewal, payment failure, cancellation intent, refund, complaint, and support load by cohort before opening the next tranche.
6. Pause or roll back when guardrails breach; do not compensate with broader discounts unless the offer register and finance owner approve it.

### Live rollout incident readback

When a price change is already live and noisy, the first artifact is not a new campaign plan; it is an evidence readback and go/no-go decision.

| Dimension | Required split |
| --- | --- |
| Region | launched country/territory, currency, tax display, language/localization, regional price delta |
| Channel | direct, App Store, Google Play, reseller, enterprise invoice |
| Plan/package | legacy plan, current plan, new package, annual, monthly, add-on/overage exposure |
| Protected cohort | grandfathered, coupon/discount, education/nonprofit, hardship, sales exception, enterprise contract |
| Renewal window | T-90/T-60/T-30/T-7, renewal week, grace/account-hold, just-renewed/refund window |
| Signal breach | cancellation, downgrade, failed renewal, refund, dispute, complaint/social sentiment, support tickets, sales escalation |
| Commercial readback | gross uplift, churn loss, refunds/credits, support cost, sales concessions, net revenue, projected LTV/NRR |

Use a decision table with explicit owners:

| Condition | Decision | Owner |
| --- | --- | --- |
| Contract or sales-exception breach risk | Stop automation; account-owner/legal review before any new notice | Sales/Legal |
| Grandfathered or education trust breach | Pause cohort; extend protected period or restore prior price while policy is corrected | Pricing council + Support |
| Country/localization complaint spike | Pause that region; correct tax-inclusive display, language, and effective date | Product/Growth |
| Refund/dispute/support spike above threshold | Freeze affected channel; activate refund/goodwill macro and support escalation queue | Support/Billing |
| Net revenue below control after churn/refunds/credits/support/sales concessions | Roll back or redesign price/packaging before scaling | Finance/Pricing |
| Metrics recover and no blocker remains | Resume next tranche from T-90/T-60 cohorts only | Rollout owner |

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| High-tenure cohort | Consider phased increase | LTV and loyalty analysis | Trust breach |
| Low-usage cohort | Improve value or save | Usage and churn risk | Churn spike |
| Store-billed users | Check platform consent | Channel rule matrix | Compliance issue |
| Renewal within 30 days | Delay or issue urgent verified notice | Renewal-window matrix | Surprise charge/refund spike |
| No consent response | Define channel-specific no-action outcome | Store-console/API evidence | Wrong cancellation/renewal assumption |
| Save offer | Gate eligibility | Offer experiment | Margin leakage |
| Support spike | Activate macros | Issue taxonomy | Refund confusion |
| Discount cohort | Segment before announcement | Discount source, contract term, renewal clause | Unfair or invalid price change |
| Guardrail breach | Pause or rollback cohort | Live guardrail dashboard | Trust/revenue damage compounds |

## Rollback and mitigation triggers

Set thresholds before launch; do not invent them after backlash.

| Guardrail breach | Example mitigation |
| --- | --- |
| Logo churn, downgrade, or cancellation intent exceeds cohort threshold | Pause next cohort, extend notice, offer downgrade/migration path. |
| Refunds, failed renewals, or payment disputes spike | Pause affected billing channel, review notice/consent, activate refund macro. |
| Support tickets or complaint sentiment exceed threshold | Freeze rollout for noisy cohort, publish clarification, route escalations to owner. |
| Sales escalations exceed approved exception budget | Stop self-serve automation for affected accounts, move to account-owner review. |
| Net revenue after churn/refunds/save costs/support load is below control | Roll back cohort or change offer/price step before scaling. |
| Store-billed no-action or consent behavior is unverifiable | Block that channel until console/API evidence is captured. |

## Support and sales exception scripts

Keep scripts plain-language, specific, and non-defensive. Define what each role can offer without ad hoc discounting.

| Scenario | Message focus | Allowed action | Approval threshold |
| --- | --- | --- | --- |
| Legacy annual contract asks why price changed | Renewal date, contract term, value narrative, account-owner review | Keep current contract through term; discuss renewal migration | Account owner for any non-standard renewal price |
| Monthly self-serve low-usage user threatens cancellation | Acknowledge fit concern, explain downgrade/pause/annual option | Downgrade path, one save offer if eligible, cancel without friction | Retention owner for repeated or high-discount offers |
| Grandfathered plan sunset complaint | Explain sunset timeline, protected period, migration benefit, support path | Extend grandfathering only for approved protected cohort | Pricing council for extension beyond policy |
| Usage-heavy overage bill shock | Separate base price from overage, review usage controls | Usage alert, plan migration, overage credit only if policy allows | Finance/Product for credits above threshold |
| Enterprise or sales exception request | Route to account owner; do not promise price in support chat | Temporary hold on automated notice, contract review | Sales/Legal for contract amendment or exception |
| Refund or support escalation after notice | Clarify notice version, effective date, cancellation/refund route | Goodwill or refund per policy; log reason code | Support lead for exceptions above published policy |

Example threshold pattern:

- Support can explain, downgrade, cancel, or apply a pre-approved one-time save offer.
- Sales can propose renewal migration inside approved discount bands.
- Pricing/Finance approves margin-impacting exceptions, hardship cohorts, or broad grandfathering extensions.
- Legal/account owner approves contract amendments and enterprise exceptions.
- Any exception must record `reason_code`, `approval_owner`, `expires_at`, `cohort_id`, and `net_revenue_impact`.

## Price-increase retention checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `subscription_price_increase_scoped`, `subscription_price_increase_cohort_segmented`, `subscription_price_increase_notice_delivered`, `subscription_price_increase_consent_recorded`, `subscription_save_offer_shown`, `subscription_save_offer_accepted`, `subscription_price_increase_renewal_observed`, `subscription_price_increase_retention_reviewed`.

Recommended properties: `subscription_id, account_id, plan_id, billing_channel, cohort_id, old_price, new_price, notice_version, consent_required, renewal_date, save_offer_id, cancellation_reason, refund_status, support_topic, churn_status, net_revenue_status, decision`.
