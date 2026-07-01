<think>
The user wants a comprehensive plan for subscription price-increase retention across multiple billing platforms (direct, App Store, Google Play). Let me structure this concisely within 650 words, focusing on the requested artifacts and key decisions.

Key components to cover:
1. Cohort segmentation
2. Grandfathering policy
3. Save offers
4. Annual migration
5. Cancellation recovery
6. Consent notices
7. Support scripts
8. Refunds
9. Churn monitoring
10. Net revenue guardrails

Let me make this audit-friendly with clear sections, tables, and decision rules.
</think>

# Subscription Price-Increase Retention Plan

## 1. Cohort Segmentation (Decision Matrix)

| Cohort | Definition | Strategy | Notice | Save Offer |
|---|---|---|---|---|
| **A. Loyal annual** | ≥12mo, auto-renew, no complaints | Grandfather 6–12mo + migration bonus | 60d email + in-app | 1 month free on annual prepay |
| **B. Price-sensitive monthly** | MRR <$25, high support tickets | Aggressive save offer first | 45d email | 40% off 3mo, downgrade path |
| **C. Power users** | High usage/expansion revenue | Hold price 90d, then migrate to tier-up | 60d email | Annual prepay discount + feature add |
| **D. Trial / new (<90d)** | Onboarding incomplete | No grandfather; offer annual lock | 30d in-app | 20% off year 1 |
| **E. At-risk / recently downgraded** | Downgraded in last 60d | Defer increase 90d | 45d email | Win-back bundle |
| **F. Dormant canceled** | Churned <90d, win-back list | Reactivation discount | 30d push | 50% off 3mo, no grandfather |

## 2. Grandfathering Policy

- **Default:** 12 months for annual subscribers, 3 months for monthly direct-billed.
- **Carve-outs:** Power users (C) = 6 months; Trials (D) = none.
- **Cap:** Grandfather rate locked; no further discounts stackable except migration bonus.
- **App Store / Google Play:** Honor platform rules — use subscription price changes (Apple/Google require notice; no retroactive billing on existing terms). Renewals after notice = new price.

## 3. Save Offers (Tiered)

| Offer Code | Discount | Term | Trigger |
|---|---|---|---|
| SAVE20 | 20% off | 3 months | Self-serve cancel click |
| SAVE40 | 40% off | 3 months | Post-cancel email (24h) |
| DOWNGRADE | 50% off lite tier | 6 months | Usage-based fit |
| ANNUAL50 | 50% off yr 1 | 12 months | Monthly → annual migration |

**Rule:** Only one save offer per subscriber per 12 months; offer expires in 7 days.

## 4. Annual Migration Mechanics

- Direct: Prorate difference; apply credit on next renewal.
- Apple: Cancel existing, prompt re-subscribe via offer code (managed by RevenueCat/Stripe).
- Google: Use `subscriptionOffers` with `basePlanId` migration flow; preserve tenure.
- **Target:** Migrate 25% of monthly → annual within 60d post-notice.

## 5. Cancellation Recovery Flow

1. Cancel-click → 2-step wall (reason + offer SAVE20).
2. If declined → confirmation modal with "pause for 1–3 months" option.
3. Post-cancel email at 24h, 7d, 30d (SAVE40 → DOWNGRADE).
4. Win-back at 60d and 90d (50% off 3mo).

## 6. Consent Notices (Audit-Ready)

- **Direct:** 60-day email + in-app banner at 45d and 14d; log timestamp + version.
- **Apple:** Use `priceIncreaseInfo` API; surface in App Store subscription management.
- **Google:** Set `priceChange` notification ≥7 days per policy; surface in Play subscription center.
- All notices include: old price, new price, effective date, cancellation right, save offer, link to FAQ.

## 7. Support Scripts (3-Tier)

| Tier | Trigger | Script Core |
|---|---|---|
| **L1** | Price inquiry | Validate entitlement; quote effective date; offer SAVE20 if not yet used. |
| **L2** | Cancel threat | Empathize; present annual migration (ANNUAL50) or downgrade; one concession max. |
| **L3** | Escalation/retention-risk | Manager approval for up to 2 months free; flag to CS-ops for win-back. |

## 8. Refund Policy

- Direct: Pro-rata refund within 14d of renewal per ToS; goodwill refund ≤1 month at L2 discretion.
- Apple/Google: **Defer to platform** — direct user to report-a-problem; do not process in-house.
- Log all refunds with reason code (R1-R8) for monthly churn attribution.

## 9. Churn Monitoring (Weekly Dashboard)

| Metric | Target | Alert Threshold |
|---|---|---|
| Voluntary churn (price-related) | <4.5% | +1.5pp WoW |
| Save-offer acceptance rate | ≥35% | <25% |
| Annual migration rate | ≥20% of monthly base | <12% |
| Refund rate | <2% of renewals | >3.5% |
| Net revenue per cohort | ≥+5% MoM | <0% |

## 10. Net Revenue Guardrails

- **Pre-rollout:** Baseline NRR per cohort (90d trailing).
- **Rollout:** Phased — 5% → 20% → 50% → 100% over 21 days, gated by guardrails above.
- **Kill switch:** If price-attributed churn exceeds 1.5× baseline NRR impact, pause rollout and reassess.
- **Re-baseline:** At 30/60/90 days post-full rollout; recalibrate save offers.
- **Reporting:** Weekly exec summary; cohort-level NRR, save acceptance, migration %; archived for audit.

**Compliance note:** Apple/Google price changes are forward-only; do not misrepresent grandfathering on platform-billed users.
