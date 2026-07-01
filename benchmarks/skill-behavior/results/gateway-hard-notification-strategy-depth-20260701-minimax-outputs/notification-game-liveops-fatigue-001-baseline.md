# Mobile Game Notification Policy (v1.0)

## 1. Core Principles (Rank-Ordered)

1. **Player trust over short-term revenue.** No notification fires unless it passes a *relevance × consent × wellbeing* test.
2. **Minors first.** Any user ≤16 (or higher local age of digital consent) is treated as a protected class.
3. **Quiet hours are inviolable** unless the message is transactional and time-critical (e.g., event ends in <60 min, refund issued).
4. **Frequency is a finite resource.** A weekly cap is enforced globally; over-cap pushes downgrade to in-app banners only.
5. **Reactivation ≠ harassment.** Dormant players receive at most 2 messages/30 days.

## 2. User Segmentation & Consent

| Segment | Definition | Default State |
|---|---|---|
| `MINOR` | Self-declared or region-inferred ≤16 | Marketing OFF; only transactional + parent-linked social |
| `STANDARD` | Verified adult, opted in | Full rules below |
| `VIP` | LTV tier ≥4 OR guild officer | Higher event priority, same caps |
| `DORMANT` | No login ≥14 days | Reactivation lane only |
| `OPT_OUT` | Marketing disabled | Transactional only |

Consent captured at first-run (granular toggles), reaffirmed in Settings, and via soft in-app prompts at level 5/15/30.

## 3. Per-Notification-Type Policy

| Type | Max/Week | Quiet Hours OK? | Minor Allowed? | Trigger Condition |
|---|---|---|---|---|
| Energy-full reminder | 7 | No | Yes (non-promotional copy) | Energy ≥100% AND cap not hit |
| Daily reward streak | 1/day | No | Yes | Streak at risk AND player has logged in within last 36h |
| Guild raid invites | 3/day, 10/week | No (pre-event); Yes (≤2h warning) | Yes if guildmates ≥18 only | Invite from verified friend or guild; cap on unfulfilled invites |
| Event ending alert | 2/event | ≤2h: Yes (override allowed) | Yes | Event value ≥ regional threshold; ends in <24h and <2h |
| Friend gift | 5/week (aggregated) | No | Yes | ≥3 gifts unsent; never re-prompt same gift same day |
| IAP promotion | 3/week | No | **No** | A/B-tested offer ≤ top-quartile relevance score |
| Refund/Support | Unlimited | Yes (always) | Yes | Event-driven only; never promotional cross-sell |
| Reactivation | 2/30 days | No | **No for MINOR** | Dormant ≥14 days; final notice ≤45 days |

## 4. Quiet Hours (Regional Defaults)

- EU/UK: **21:00–08:00** local.
- North America: **21:00–08:00** local.
- APAC: **22:00–09:00** local; JP/KR stricter per local norms.
- MENA: per local weekday/weekend split.
- Server-side uses `device_tz` from OS; fallback to billing-region TZ.
- Transactional override allowed only for: raid start in ≤15 min, event ends in ≤60 min, refund processed.

## 5. Minor Protection Layer

- Default-off marketing and social solicitation.
- No IAP, friend-finding, or reactivation pushes.
- Guild raid invites filtered: only from guildmates who pass `age_verified = true` AND share server ≥7 days.
- Daily-reward reminder copy neutralized (no "limited," "missing out").
- Parent dashboard exposes notification log and toggles.
- Complies with COPPA, GDPR-K, UK Age-Appropriate Design Code, India DPDPA minors clause.

## 6. Anti-Spam / Churn Guardrails

- **Hard weekly cap:** ≤14 push notifications/week per user (Standard); ≤4 (Minor).
- **Daily soft cap:** ≤3 pushes/day; 4th only if ≥2 are event-critical.
- **Clustering:** ≥45 min between non-urgent pushes.
- **Dedupe:** identical payload not re-sent within 7 days.
- **Fatigue score:** per-user rolling 28-day model; score ≥0.7 auto-suppresses promotional lane for 7 days.
- **Negative-action suppression:** if user dismissed ≥3 same-type in 14 days, type auto-pauses 30 days.

## 7. Channel Strategy

| Channel | Use | Minors |
|---|---|---|
| Push | Time-sensitive (event, raid start, gift claim) | Restricted |
| In-app | Persistent prompts, soft suggestions | Primary |
| Email | Reactivation, transactional, weekly digest | Reactivation disabled for MINOR |
| SMS | Never used for marketing | Never |

## 8. Revenue-Event Alignment

- Event window: pre-event education via in-app; pushes reserved for T-24h and T-2h only.
- IAP promos capped at 3/week globally to avoid cannibalizing organic conversion.
- Energy reminders pause 24h after a high-value IAP purchase (avoid coercive loop).
- VIP gets earlier T-48h notice; same cap; no extra volume.

## 9. Opt-Out & Transparency

- One-tap unsubscribe from any push (deep-links to granular settings).
- "Why am I seeing this?" link on every push → reveals trigger and offers toggle.
- Quarterly notification audit summary surfaced to player (in-app).

## 10. Metrics & Audit Trail

- **North star:** 7-day retention delta between notified vs. non-notified cohorts.
- **Guardrails:** unsubscribe rate <0.8%/week; push→session CTR stable; fatigue-score distribution shift ≤5% WoW.
- **Event KPIs:** event conversion lift attributed to push (holdout-tested); IAP push → ROAS > 1.5x.
- **Audit log:** every push records `{user_id, segment, type, trigger, fatigue_score, quiet_hours_check, override_flag}` retained 24 months.

## 11. Review Cadence

- Weekly: guardrail dashboard, fatigue-score drift, minor-segment safety review.
- Monthly: A/B results, regional quiet-hours performance, opt-out drivers.
- Quarterly: full policy review; publish changes in changelog; A/B before tightening or loosening any cap.

## 12. Decision Authority

Any exception to caps, quiet hours, or minor rules requires approval from: Notification Lead + Legal + Trust & Safety; logged with business justification and expiry. No unilateral override by marketing.
