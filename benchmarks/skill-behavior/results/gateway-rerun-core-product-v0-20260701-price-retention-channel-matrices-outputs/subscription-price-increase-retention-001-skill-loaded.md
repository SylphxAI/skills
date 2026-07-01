**Subscription price-increase context:**
Audience: SaaS web/app subscribers and mobile in-app subscribers on monthly and annual plans across direct billing, App Store, and Google Play. Source of truth: billing system of record + store receipts + entitlement service. Risk boundary: protect net revenue and trust over headline ARPU; block launch where channel consent/refund rules are unverified.

**Channel rule matrix:**

| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct billing | Email + in-app notice T-60/T-30/T-7; explicit consent gate if contract requires; ToS/contract update posted | Auto-renews at new price on renewal_date unless cancelled; proration rule defined | Internal billing; prorated refund within X days; goodwill ladder | Contract clause, ToS version, dunning policy |
| App Store | Apple subscription price-change flow; territory opt-in vs opt-out behavior; subscription-group settings | Auto-renews at old or new price per territory; store-managed cancellation | Apple refund request; support macro for store-managed billing | App Store Connect price-change console state per territory |
| Google Play | Play base plan price-change/migration flow; offer setup; RTDN | Auto-renews at new price; account hold / grace per Play policy | Google refund request; support macro | Play Console base-plan config + RTDN evidence |

Mark App Store and Google Play behavior as `verify before rollout` for each territory before go-live.

**Priority cohort matrix:**

| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Annual, 2+ yr tenure, high usage | Direct, any; renewal T-60 | Low | Phased 2-step increase + loyalty credit | Save-offer rate < baseline +5pp |
| Monthly, 1-2 yr, core user | All channels; T-30 | Medium | Full increase + 1-yr migration incentive (10-15% off) | Migration take-rate ≥25% |
| Monthly, low usage (<3 sessions/mo) | All channels; T-30 | High | Pause increase 60 days, value nudge, save offer at consent | No surprise-charge complaints |
| New (<90 days) on promotional price | Direct + stores; varies | Medium-high | Increase at promo end, no save offer; clear T-30 notice | Complaint rate <0.5% |
| Trial-to-paid | Store-billed | High | Increase at paid conversion only; grandfather until next renewal | Store receipt review |
| High-risk (cancellation intent, support escalation, payment failure) | Any | Critical | Hardship save (freeze 90 days or 20% off 6 mo), single use | Manual approval log |
| Enterprise/contract | Direct only | Low | Contract amendment, no auto-increase | Legal sign-off |

**Retention and trust plan:**

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Value narrative | Tie increase to named feature/quality gains; no vague "improvements" | Release notes, usage uplift | Trust breach | Product Marketing |
| Notice timeline | T-60 email, T-30 in-app, T-7 final; each includes old→new, effective date, cancel path | Send logs | Missed notice | Lifecycle |
| Grandfathering | Annual + 2yr tenure: 1 cycle phased; others: full at renewal | Cohort table | Margin leakage | Pricing |
| Annual migration | Offer 10-15% off annual lock-in at consent; one-time per account | Experiment read | Discount abuse | Lifecycle |
| Save offers | Eligibility gated: low usage, high-risk, or tenure ≥1yr; one use; expiry 14 days | Save-offer log | Churn-training | Retention |
| Cancellation recovery | Transparent cancel flow: reason capture → offer if eligible → confirm; no dark patterns | Funnel events | Deceptive UX | Product |
| Refund | Direct: prorated within policy; stores: route to Apple/Google; goodwill ladder | Refund log | Chargeback spike | Support |
| Support macros | Channel-specific scripts: notice version, refund route, save eligibility | Macro library | Inconsistent answers | Support Ops |
| Churn monitoring | Daily cohort churn, save accept, refund, complaint; pause rollout if churn +X% vs control | BI dashboard | Slow kill-switch | Analytics |
| Net revenue guardrail | Net revenue = uplift − churn − refunds − save cost − support load; review weekly | Finance readback | ARPU illusion | Finance + Growth |

**Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, guardrails:**
- Annual/2yr cohort → phased increase + loyalty credit → renew at step 1 → guardrail: churn delta < +2pp.
- Monthly core → full increase + annual migration incentive → migration take-rate ≥25% → edge: refund window policy.
- Low-usage → 60-day value nudge + save offer at consent → if no engagement, allow at old price once → support note: do not promise permanence.
- Trial-to-paid → increase at conversion, grandfather first paid cycle → store receipt verify.
- High-risk → hardship save (freeze 90d or 20%/6mo) → single-use flag → manual log → guardrail: <1% of base.
- Notice delivered T-60/T-30/T-7 → consent pending/accepted/declined/no-response states modeled per channel → no-response: store default applies, direct renews at new price with cancel window.
- Save offer shown → eligibility + expiry enforced → accept or decline logged → no infinite loop.
- Cancellation intent → reason + eligible offer (if any) + clean confirm → no friction screens.
- Support contact → macro returns notice version, save eligibility, refund route by channel → escalate goodwill only via policy.
- Refund → direct prorated, store-routed, goodwill ladder → chargeback rate monitored.
- Events: `subscription_price_increase_notice_delivered`, `…consent_recorded`, `subscription_save_offer_shown/accepted`, `…renewal_observed`, `…retention_reviewed` with `subscription_id, cohort_id, billing_channel, old_price, new_price, renewal_date, churn_status, net_revenue_status`.
- Kill-switch: roll out in 10% waves; pause if cohort churn +X pp or complaint rate +0.5 pp; review weekly; require store-console/API evidence per territory before each wave.
