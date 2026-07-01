<think>
The user wants a concise, audit-friendly plan for subscription price-increase retention across multiple billing channels. They want specific artifacts: cohort segmentation, grandfathering, save offers, annual migration, cancellation recovery, consent notices, support scripts, refunds, churn monitoring, and net revenue guardrails. Budget is 650 words.

Let me structure this tightly:

1. Scope & channels
2. Cohort segmentation
3. Grandfathering matrix
4. Save offers ladder
5. Annual migration
6. Cancellation recovery
7. Consent notices (legal)
8. Support scripts
9. Refunds
10. Churn monitoring
11. Net revenue guardrails

I'll use tables and bulletpoints to maximize information density. Stay under 650 words.
</think>

# Price-Increase Retention Plan — SaaS + Mobile Subscriptions

## 1. Scope & Channels
| Channel | Owner | Price-change method | Notice lead time |
|---|---|---|---|
| Direct (web) | Billing | Recurly/Stripe price schedule on renewal | 45 days |
| Apple App Store | AppOps | Subscription price increase via App Store Connect | 30–60 days (Apple enforced) |
| Google Play | AppOps | Play Console price change (subscriber retention hold opt-in) | 30–60 days |

All three channels must converge on a **single customer-facing price and message**; timing differences are absorbed internally.

## 2. Cohort Segmentation
| Cohort | Definition | Strategy |
|---|---|---|
| A — New (<90d) | First 3 renewals | No grandfathering; price at new rate |
| B — Loyal (12m+, <2% ticket rate) | Long tenure, low contact | Full grandfathering 6 months |
| C — At-Risk | Opened cancel modal, contacted support, downgraded in last 90d | Targeted save offer, no grandfathering |
| D — Annual / Multi-year | Pre-paid plans | Locked price until renewal; A/B "renew at new price" vs "upgrade plan tier" |
| E — Discount / Promo / Trial-to-paid | Active coupon, intro price | Honor promo end; do not raise until promo expires |
| F — Complainer / Refund history | ≥2 refunds or escalation in 12m | No special concession; standard notice |

## 3. Grandfathering Matrix
- Cohorts B and D: keep current price for **6 months** OR **next renewal cycle**, whichever is longer.
- Cohort D annual: held until plan anniversary; offer one-time migration to new plan with loyalty credit.
- Cohorts A, C, E, F: no grandfathering.
- Audit log entry per subscriber: cohort, grandfathered_until, last_notice_sent.

## 4. Save Offers (Apply before charging new price)
| Trigger | Offer | Cap |
|---|---|---|
| Cancel-modal entry | Pause 1–3 months (keep old price) | 1×/12m |
| Cancel confirm | 20% off for 3 months OR 50% off 1 month | 1×/lifetime |
| Direct charge failure | 1 free month retry, then full new price | 1×/12m |
| High-LTV at-risk | Plan tier upgrade at old price for 6m | CSM approval |

Stack rules: one offer per cancellation event; never combine with promo pricing.

## 5. Annual Migration
- Email 60 days pre-renewal with: (a) new annual price, (b) "lock current rate for another year" one-click option, (c) tier-upgrade comparator.
- Channels: in-app banner (T-30), email (T-60/30/7), support CRM flag.
- App Store/Play: do not auto-migrate annual subs; surface in app and via receipt email (Apple transactional rules).

## 6. Cancellation Recovery
1. Reason capture (price / value / budget / competitor / unused).
2. Branch: price-sensitive → save offer ladder; value/unused → feature education; competitor → CS callback.
3. If save declined → grace period 7 days to reactivate at old price.
4. Win-back: 30-day email, 60-day 25% off, 90-day suppression.

## 7. Consent / Notice Wording (audit-safe)
- Direct: "On [date], your subscription will renew at $[new]/[period]. You may cancel anytime before [date] to avoid the change. Existing terms remain in effect until then."
- Apple: align with App Store subscription notification requirements; cannot suppress Apple's notice.
- Google Play: enable "Subscriber retention" hold and honor in-app; use approved price-consent template.
- Store timestamp + version of notice text per subscriber.

## 8. Support Scripts (CS macros)
- **Price Increase Inquiry**: acknowledge → confirm effective date → present 3 options (stay, switch to annual at locked rate, downgrade tier) → log disposition.
- **Cancellation Threat**: empathy → confirm value delivered → offer pause or save per matrix → if declined, confirm cancellation + grace-period reactivation window.
- **Refund Request**: per refund policy below; never condition refund on accepting price increase.

## 9. Refunds
- Pro-rata refund of unused, paid-in-full period within 14 days of charge (or local minimum).
- Apple/Play refunds: route through store; honor any approved refund without retaliation on price.
- Document: refund_id, original_charge_id, reason_code, policy_version.

## 10. Churn Monitoring (daily during raise window, weekly thereafter)
- **Primary**: voluntary MRR churn %, by cohort × channel.
- **Secondary**: cancel-modal save rate, reactivation within grace period, downgrade vs cancel ratio, support tickets tagged `price_increase`.
- **Guardrails**: anomaly alert if 7-day rolling voluntary churn > **1.5×** the 90-day baseline, or save-offer acceptance drops below **25%**.

## 11. Net Revenue Guardrails
| Metric | Pre-raise baseline | Raise window | Kill-switch threshold |
|---|---|---|---|
| Net MRR | X | must stay ≥ X × 1.00 | < baseline for 14 consecutive days |
| Logo churn (price-sensitive cohort) | Y% | ≤ Y% + 1.5pp | > Y% + 3pp |
| Save-offer acceptance | n/a | ≥ 25% | < 15% over 14 days |
| Refund rate | Z% | ≤ Z% + 0.5pp | > Z% + 1pp |

**Decision rule**: if any two kill-switch thresholds breach simultaneously, pause further grandfathering expirations and convene Pricing+CS+CFO review before continuing the rollout. All decisions logged with owner, timestamp, and supporting metrics for audit.
