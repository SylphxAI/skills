```text
Subscription price-increase context:
Audience: SaaS (B2B + B2C) and mobile-app subscribers on three billing channels — direct (web), Apple App Store, Google Play. Includes free→paid, monthly, annual, and grandfathered legacy plans. Two renewal cycles overlap (annual renewals next 60–120 days; monthly renewals continuous).
Source of truth: billing-subscriber-of-record (BSOR) reconciled nightly with Stripe, StoreKit 2 App Store Server Notifications, and Google Play Real-Time Developer Notifications (RTDN). Cohort definitions in CDP; price catalog in pricing-CMS; consent ledger in event-store.
Risk boundary: protect net revenue and trust; do not exceed 4% net MRR erosion post-rollout; avoid store-policy violations on auto-renewable subscriptions (ARS); no dark-pattern cancel flows; no save offers to users outside eligibility.

Retention and trust plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Cohort segmentation | 5 axes: tenure (<3mo, 3–12mo, 1–2yr, 2yr+), usage depth (P25/P50/P75 MAU), billing channel, region (EU/UK/CA/US/RoW), plan tier | CDP + product analytics | Cohort blindspot | Growth PM |
| Value narrative | Tiered by tenure/usage; cite shipped features (last 12mo) and roadmap signal | Release log, NPS themes | Weak value story | Lifecycle Marketing |
| Notice timing | T-60, T-30, T-7 days pre-renewal; in-app + email + receipt | Store + email logs | Consent gap | Lifecycle + Legal |
| Consent path | Direct: explicit accept-to-continue. iOS: App Store price-consent API. Android: price-change consent flow (user must accept) | BSOR consent flag | Compliance issue | Legal + Mobile Eng |
| Grandfathering | 12mo lock for tenure ≥2yr and annual plans in good standing; expires at next renewal | Tenure + payment history | Trust breach | Pricing Lead |
| Save offers | 20% off 3mo or pause 1mo; only P50+ tenure or price-sensitive cohort; one per account | WTP model, A/B holdout | Margin leakage | Retention PM |
| Annual migration | 2 free months on annual switch for monthly cohort; billed via direct or store as allowed | Pricing experiment | Offer confusion | Pricing Lead |
| Cancellation recovery | Transparent 2-step cancel; pause-offer mid-flow; clear refund link | Cancel-flow logs | Dark pattern | UX + Legal |
| Support scripts | Macros for "why price up", "I want refund", "switch to annual", "store can't change price" | Knowledge base | Refund confusion | Support Lead |
| Refund path | Direct: prorated within 14d, full within 48h if notice missed. Store: route user to Apple/Google refund page; do not process in-house | Policy doc | Chargeback spike | Billing Ops |
| Churn monitoring | Daily cohort dashboard; alert if 7d churn >1.5x baseline or save-eligible churn >3% | Event stream | Churn spike | RevOps |
| Revenue guardrail | Net MRR (uplift – churn – refund – save-cost – support cost) must stay ≥0 vs control | Holdout 10% per channel | Hidden loss | Finance + Growth |
| Holdout / experiment | 10% holdout per channel; 4-week read, then 8-week cohort read | A/B platform | Mis-read | Growth Analytics |
| Accessibility | Notices WCAG 2.2 AA; screen-reader tested; plain language | A11y audit | Exclusion | Design + A11y |
| Regional rules | EU/UK: clear, prominent consent before renewal. CA: 60-day notice. US: ARS rules | Legal matrix | Regulatory | Legal |

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:
- Tenure ≥2yr, annual, good standing -> grandfather 12mo, thank-you note, highlight loyalty perks; risk: trust if lapse; save offer: not eligible; support: "loyalty hold" macro; refund: per policy; event: subscription_price_increase_consent_recorded.
- Tenure 1–2yr, monthly, P50+ usage -> migrate to annual with 2 free months; notice T-30/T-7; save offer only if decline; risk: annual lock-in perceived as trap; support: "switch-to-annual" macro; refund prorated if within 14d.
- Tenure 3–12mo, low usage (P25) -> improve value story first, offer 1mo pause before price change; risk: churn spike if forced; save offer eligible on cancel page; refund: standard; metric: reactivation within 30d.
- New (<3mo) on monthly -> full price at next renewal; 45-day heads-up; risk: cancellation; no grandfather; save offer: 20% off 3mo on cancel; support: "value-realization" macro.
- App Store iOS -> use App Store price-consent API; users who decline auto-cancel at period end; do not process refunds (route to Apple); event: store_consent_status; risk: App Review rejection if notice buried.
- Google Play Android -> price-change consent screen; declined = cancel at renewal; RTDN reconciles; no in-house refund; risk: missed RTDN delay.
- Direct-billed EU/UK -> explicit pre-tick consent + 60-day email; right-of-withdrawal honored; risk: ombudsman complaint; refund path 14d.
- Save offer shown -> log subscription_save_offer_shown + reason; if accepted log subscription_save_offer_accepted; cap 1 per account per 12mo; ineligible for high-LTV cohort.
- Cancel intent -> log cancellation_reason; show pause (if eligible), annual switch, downgrade tier, then cancel; no pre-selected boxes; no friction delay.
- Support contact spike on price topic -> activate "price-increase" macro set; triage: refund route, plan switch, complaint to Legal; track support_topic taxonomy daily.
- Refund requested within 14d of price change -> auto-approve if notice missing; else route to Billing Ops; event refund_status.
- Churn alert -> if 7d churn >1.5x baseline by cohort, pause roll-out to that cohort, run readback.
- Net revenue guardrail -> if net MRR negative vs control at week 4 OR week 8, halt further cohorts; pricing + Growth decide remediation.
- Post-rollout readback at 4wk and 12wk -> update cohort rules, value narrative, and save-offer eligibility based on evidence; archive decision in retention review.
```

Word count: ~640.
