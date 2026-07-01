<think>
The user wants a promotion campaign design for a mobile productivity subscription app. The requirements include:
1. Annual-plan discount
2. Win-back segment
3. Creator affiliate codes
4. In-app paywall
5. Email
6. Push notification
7. Fraud risk
8. Campaign calendar
9. Success metrics

The answer budget is 650 words maximum. I need to be concise and audit-friendly, prioritizing artifacts and key decisions.

Let me structure this efficiently. I'll create a clean, scannable document with the key deliverables. Since they want "artifacts," I should focus on tables and structured lists rather than prose.

Let me plan the sections:
1. Campaign Overview (brief)
2. Offer Structure (annual discount tiers)
3. Segment Strategy (win-back focus)
4. Creator Affiliate Codes (structure)
5. Channel Tactics (paywall, email, push)
6. Fraud Risk Controls
7. Campaign Calendar (12-week or condensed)
8. Success Metrics & KPIs

I'll keep it tight and tabular where possible. Let me draft:

**Campaign Overview**
- Name: "Flow365 Annual" 
- Goal: Lift annual subs by X%, reduce churn
- Window: 8-12 weeks

**Offer Structure (Annual Discount)**
Tier table

**Win-Back Segment**
Segmentation rules

**Creator Affiliate Codes**
Code structure, commission, terms

**In-App Paywall**
A/B variants

**Email + Push**
Cadence and triggers

**Fraud Risk Controls**
Mitigations

**Campaign Calendar**
Week-by-week

**Success Metrics**
KPIs with targets

Let me write this out tightly. I need to countwords carefully.
</think>

# Flow365 Annual — Promotion Campaign Brief

**Window:** 8 weeks · **Owner:** Growth · **App:** Flow365 (mobile productivity)

## 1. Offer Structure — Annual Discount

| Tier | Plan | Price | Discount | Hook |
|---|---|---|---|---|
| Standard | Annual | $59.99/yr | 40% off $99.99 | Default landing offer |
| Boost | Annual + AI Pack | $89.99/yr | 35% off $139.99 | Featured in-app |
| Legacy | Annual | $49.99/yr | 50% off (lapsed users only) | Win-back exclusive |

All tiers: 7-day full refund window, no auto-upgrade, cancel anytime. Trial → annual with **30-day money-back guarantee** (campaign-only) to lower barrier.

## 2. Win-Back Segment

Segmentation rules (eligible users only — no active sub, no refund <90d, not on do-not-contact list):

| Cohort | Definition | Offer | Window |
|---|---|---|---|
| W1 — Recent | Churned 31–90d, used core feature | Legacy $49.99 | Wk 1–4 |
| W2 — Dormant | Churned 91–180d | Legacy $49.99 + 1 mo AI free | Wk 2–6 |
| W3 — Cold | Churned 181–365d | $39.99 flash (cap 15% of cohort) | Wk 4–6 |
| W4 — Power-User Lost | Churned w/ 10+ sessions/mo history | Personal email + concierge offer | Wk 1–8 |

## 3. Creator Affiliate Codes

- **Format:** `CODE` = 6-char, uppercase, vanity prefix per creator (e.g., `MAYAFLOW`).
- **Discount:** Creator-funded 25% off annual; platform absorbs 15% (total ~40%). Revenue share: 20% of net to creator, paid ≥$50 threshold, 60-day lock.
- **Caps:** Per-code max 500 redemptions; per-creator max 2,000. Soft-cap alert at 80%.
- **Tracking:** Server-side attribution via code + device ID, 30-day click window.
- **Disclosure:** "Affiliate link" tag in app store, emails, and in-app per FTC/ASA.

## 4. In-App Paywall

Three A/B variants (50/25/25 split):
- **A — Control:** Monthly default, annual as secondary.
- **B — Annual-first:** Annual prominent, "Save 40%" badge, toggle to monthly.
- **C — Annual + Social proof:** B + creator testimonial strip + "X teams joined this week."

Free trial = 14 days, no card on file required. Soft paywall on 3rd core-feature hit.

## 5. Email & Push

| Channel | Trigger | Audience | Frequency Cap |
|---|---|---|---| 
| Email | Offer launch | All eligible | 1/wk |
| Email | Win-back | W1–W4 | 1/10d |
| Email | Cart abandon | Trial → paywall drop | 1×/24h |
| Push | Price drop | Active trialing | 1/3d |
| Push | Win-back | W1–W3 | 1/7d, quiet hours 22:00–08:00 local |
| In-app | Reactivation | Win-back return | 1×/session |

## 6. Fraud Risk Controls

| Risk | Mitigation |
|---|---|
| Promo abuse (multi-account) | Device-ID + account-merge dedupe; email + payment fingerprint |
| Affiliate self-referral | Block codes on creator's own devices/IP; tax form required |
| Stolen-card signups | 3DS2, velocity limit (≤3 subs/device/24h), AVS |
| Refund farming | 30-day guarantee but flag 2+ refunds/device/12mo |
| Bot traffic on affiliate links | Server-side click verification, CAPTCHA at >2 clicks/min/IP |
| Incentive circular (creator pays creator) | Quarterly creator network audit |

## 7. Campaign Calendar

| Wk | Monday | Wednesday | Friday |
|---|---|---|---|
| 1 | Email launch (all) · Push opt-in | Paywall B/C live | Creator onboarding wave 1 |
| 2 | Win-back W1+W2 send | Affiliate links live | — |
| 3 | Push to trialing | Email cart-abandon | Creator wave 2 |
| 4 | Win-back W3 flash | — | Mid-campaign review |
| 5 | Push nudge (price-rise tease) | Email to cold segment | — |
| 6 | Win-back final send | Paywall variant winner pinned | Creator wave 3 |
| 7 | Last-chance email (48h) | Push finale | — |
| 8 | Wrap email · Retention handoff | Post-mortem | — |

## 8. Success Metrics

| Metric | Baseline | Target |
|---|---|---|
| Annual conversion rate | 2.1% | **3.2%** |
| Win-back reactivation (W1+W2) | 4.0% | **7.5%** |
| Affiliate-attributed signups | — | **≥8% of annual subs** |
| Trial-to-paid (annual) | 38% | **48%** |
| 30-day refund rate | 6% | **≤8%** (allowance for guarantee) |
| Promo-abuse incidents | — | **<0.3% of redemptions** |
| LTV/CAC (annual) | 2.4× | **≥3.0×** |

**Decision gates:** Kill switch if fraud >0.5% or refund >10% rolling 7-day. Variant B/C promoted at W4 if +5% conversion lift, p<0.05.
