# Notification Strategy — Mobile Productivity App

## 1. Channel Matrix
| Use Case | Push | Email | In-App | Tier |
|---|---|---|---|---|
| Onboarding nudges | ✓ | ✓ | ✓ | Growth |
| Trial expiry reminders | ✓ | ✓ | ✓ | Critical |
| Abandoned workflow recovery | ✓ | ✗ | ✓ | Growth |
| Weekly summaries | ✗ | ✓ | ✓ | Engagement |
| Win-back messages | ✓ | ✓ | ✗ | Reactivation |
| Transactional alerts | ✓ | ✓ | ✓ | Critical |

**Rule:** Transactional always wins; never suppressed by quiet hours or marketing opt-outs.

## 2. Lifecycle Triggers & Cadence
- **Onboarding (D0–D2):** 3 nudges at D0, D+1h, D+24h — gated by first-value moment.
- **Trial (D7 free trial):** D-3, D-1, D0, D+1 (post-expiry grace).
- **Abandoned workflow:** +30 min, +24 h, +72 h after drop-off; context-aware.
- **Weekly summary:** Sunday 18:00 user-local.
- **Win-back:** D+7, D+30, D+90 inactive; max 3 attempts per dormancy cycle.

## 3. Frequency Caps (per user)
| Channel | Daily | Weekly |
|---|---|---|
| Push (marketing) | 4 | 20 |
| Email (non-transactional) | 1 | 2 |
| In-app banner | 1 / session | — |
| Global push cooldown | 30 min between categories | — |

Enforced server-side via user-level token bucket.

## 4. Quiet Hours
- Default window: **22:00–07:00** user-local.
- User-editable in 30-min increments.
- Bypass whitelist: security alerts, payment failures, calendar <2 h.

## 5. Localization
- Locales: en, es, fr, de, ja, pt-BR, zh, ar, hi.
- Templated copy with ICU placeholders for currency, dates, plurals.
- Tone profile per locale (formal/informal variants).
- RTL layout for ar, he, fa, ur.
- Send-time optimization per locale, not global UTC.

## 6. Opt-In Prompts
- **Push:** Two-step prompt *after* first value moment (D1), never at cold start; pre-prompt screen explains benefit with one-tap allow.
- **Email:** Default-on at signup; granular per-category.
- **SMS/SMS-marketing:** Hard opt-in, double confirmation, country compliance (TCPA, GDPR).

## 7. Unsubscribe Preferences
- Email footer link → preference center, not full unsubscribe.
- Categories: Product updates, Tips & tips, Weekly summary, Re-engagement.
- One-click unsubscribe compliant with RFC 8058.
- Push: Settings → Notifications; transactional category locked on, all others toggleable.
- In-app: "Snooze 24 h" + per-category muting.

## 8. Decision Rubric (Audit-Critical)
1. **Channel selection** → use case tier + user opt-in state.
2. **Timing** → quiet hours → locale optimal window → frequency cap.
3. **Personalization** → user locale, timezone, last-action, plan tier.
4. **Suppression** → transactional override > opt-out > quiet hours > frequency cap.
5. **Measurement** → CTR, opt-out rate (target <0.5%), DAU lift, conversion per cohort.

## 9. Compliance Guardrails
- GDPR, CAN-SPAM, CCPA, TCPA, DPDP-India.
- Consent log per channel, 7-year retention.
- DNT/GPC honored at sign-up.
- A/B tests use holdout ≥10% to prevent over-notification.

## 10. Defaults Summary
| Setting | Default |
|---|---|
| Push | Opt-in prompt D1 |
| Email marketing | On |
| SMS marketing | Off |
| Quiet hours | 22:00–07:00 |
| Weekly summary | Sunday 18:00 local |
| Frequency caps | 4 push/day, 2 email/wk |
