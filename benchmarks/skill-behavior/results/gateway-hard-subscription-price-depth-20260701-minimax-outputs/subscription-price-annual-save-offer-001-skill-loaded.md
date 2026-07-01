**Subscription price-increase context**
Audience: prosumer self-serve subscribers on direct billing, $12 → $18 monthly (+50%); annual migration target at current or equivalent new price. Source of truth: billing ledger + plan/entitlement store; renewal date ledger; support ticket system. Risk boundary: protect NRR/LTV and trust; cap margin leakage; no deceptive save offers.

**Channel rule matrix**

| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |
| Direct (web) | Email + in-app ≥30 days pre-renewal; ToS allows unilateral price change with notice | Auto-renews at $18 on next cycle unless cancelled | Self-serve cancel; prorated refund only if within published window; goodwill by policy | ToS clause, notice log, invoice ledger |
| App Store | `verify before rollout` per country/territory | `verify before rollout` | Apple refund route only | App Store Connect console/API |
| Google Play | `verify before rollout` per country/base plan | `verify before rollout` | Google refund route only | Play Console, RTDN/API |

Block store-billed cohorts until console/API evidence is captured.

**Consent and renewal state table**

| Channel | Consent pending | Accepted | Declined | No response | Renewed old/new price | Payment failed | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Direct | T-30 notice delivered | Continue at $18 | Cancel pre-renewal | Auto-renew $18 unless cancelled | Invoice/payment ledger | Dunning: retry → grace → cancel | Notice log, invoice, payment event |
| App Store | `verify before rollout` | `verify before rollout` | `verify before rollout` | `verify before rollout` | Receipt/SN | Store dispute path | Receipt/server notification |
| Google Play | `verify before rollout` | `verify before rollout` | `verify before rollout` | `verify before rollout` | RTDN | Grace/account-hold | RTDN/API |

**Priority cohort matrix**

| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |
| Power users (high usage, ≥12mo) | Direct, T-60–T-90 | Low | Migrate to annual at effective ≤ new monthly ×10; loyalty credit one-time if eligible | Complaint <2× baseline |
| Low-usage (<3 sessions/mo) | Direct, T-30–T-60 | High | Downgrade or pause option; no discount; value email | Churn <threshold to set vs holdout |
| Students/nonprofits | Direct, any | Medium | Protected pricing tier (verify eligibility); exempt from $18 until renewal | Hardship approval queue |
| Coupon users | Direct, by coupon expiry | Medium | Preserve coupon through its term; transition to new price post-expiry with 30-day notice | Margin floor |
| Cancellation-intent (last 30d) | Direct, immediate | High | Exit-survey reason capture; transparent cancel path; no reactive discount by default | Complaint/refund <threshold |
| Recent support contact (last 30d) | Direct, any | Medium | Proactive outreach with value narrative + downgrade path before notice | Ticket re-open rate |

**Offer governance (resolves CEO vs finance tension)**

| Offer | Eligible cohort | Exclusions | Expiry | Measurement | Fairness/abuse guardrail |
| --- | --- | --- | --- | --- | --- |
| Annual migration lock-in | All except contracts | Coupon-stacking if margin <floor | Until next renewal cycle | Holdout 10%, retained ARR, conversion % | No hidden penalty for staying monthly |
| One-time loyalty credit (1mo) | Power users ≥12mo, ≤$5 value | Repeat churn threats, already discounted | 14-day window, one per account | Lift vs matched holdout | Cap frequency per account_id |
| Phased increase (T-90: $15, then $18) | Mid-tenure 3–12mo | Contracts, coupons | Single transition | Churn delta vs step | Plain-language schedule |
| Pause subscription (1–3 mo) | Low-usage, hardship signal | Power users w/ usage spike | Once per 12mo | Reactivation % | Auto-resume at $18 unless cancelled |
| Hardship extension | Verified students/nonprofits | All others | 12mo, re-verify | Cohort retention | Manual approval, logged |

**Rollback and mitigation triggers**

- Voluntary churn in power-user cohort >+Xpp vs holdout → pause next tranche, extend notice, expand downgrade path.
- Refund/dispute rate >Y× baseline → freeze affected cohort, activate goodwill macro, support lead review.
- Support ticket or complaint sentiment >threshold to set → freeze cohort, publish clarification, route to owner.
- Save-offer redemption rate >budget cap → revoke reactive offers, route to retention owner.
- Net revenue (uplift − churn loss − refunds − credits − support cost − concessions) below control → roll back or redesign step.
- Store-billed no-action/consent unknown → block channel until verified.

**Support and sales scripts**

- Power user questions increase → "Your plan moves from $12 to $18 on [date]. You can lock in via annual at [price], which keeps effective monthly below $18. No action needed to stay; cancel anytime in Settings."
- Low-usage wants to cancel → "Understood. Before you go: pause for up to 3 months, or switch to [lighter plan]. Cancellation takes effect immediately; refund per policy."
- Coupon user asks why price changed → "Your coupon stays valid through [date]. From [date +1] the new list price applies; we'll remind you 30 days before."
- Cancellation-intent user (support) → "Thanks for telling us. I can pause or downgrade. I can't offer a discount just to keep you, but hardship cases can be reviewed."
- Hardship/student → route to eligibility form; pricing team approves within 48h.

**Net revenue and LTV readback**

| Cohort/channel | Gross uplift | Churn loss | Refunds/credits | Support cost | Failed renewals | Sales concessions | Complaint signal | Projected NRR/LTV | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Power users / direct | $6×active | Δ vs holdout | Loyalty credit cost | Δ ticket volume | Dunning rate | 0 (auto) | Sentiment score | NRR vs control | Continue if net ≥0 |
| Low-usage / direct | $6×active | Δ vs holdout | 0 | Δ ticket volume | Dunning rate | 0 | Sentiment score | NRR vs control | Continue only with downgrade path live |
| Students/nonprofits / direct | 0 (protected) | Δ vs holdout | 0 | Δ ticket volume | Dunning rate | 0 | Sentiment score | Trust metric | Exempt; re-verify yearly |
| Coupon / direct | Post-expiry uplift | Δ vs holdout | Coupon term honored | Δ ticket volume | Dunning rate | 0 | Sentiment score | Margin floor | Continue if coupon margin ≥floor |
| Cancellation-intent / direct | $6×active | Δ vs holdout | 0 | Δ ticket volume | Dunning rate | 0 | Sentiment score | Exit-reason rate | Continue; no reactive discount |
| Support-contact / direct | $6×active | Δ vs holdout | Goodwill per policy | Δ ticket volume | Dunning rate | 0 | Re-open rate | Trust metric | Continue with proactive outreach |

**Guardrails** — No offer without eligibility + holdout + cap. No dark patterns in cancel/recovery. Direct-billed only at launch; store channels blocked pending verification. Every exception logs reason_code, approval_owner, expires_at, cohort_id, net_revenue_impact.
