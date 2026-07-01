# Notification Strategy Review — Subscription Productivity App

## 1. Core Policy Matrix

| Lifecycle Stage | Channel | Timing | Consent Gate | Suppression Rule |
|---|---|---|---|---|
| Onboarding permission ask | In-app contextual | Day 0, post-value moment | Implicit (in-context) | Skip if declined |
| Trial expiry (T-3, T-1, T-0) | Push + Email | T-72h, T-24h, T-0 | Trial opt-in | Respect quiet hours |
| Renewal reminder (T-7) | Email | 7 days pre | Subscription consent | Digest if >3/wk |
| Failed payment recovery | Push + Email | T+0, T+2, T+5, T+9 | Transactional (no consent) | Max 4 attempts |
| Win-back | Email + Push | D+7, D+21, D+45 | Marketing consent | Stop on any engagement |
| Digest mode | Push (single) | User-set time | Toggle | Replaces individual alerts |

## 2. Per-Topic Audit Decisions

**Onboarding permission ask** — Defer to first value moment ("completed 3 tasks"), not at launch. Use soft ask (pre-permission screen explaining benefit). Audit metric: ask-to-grant rate target ≥55%.

**Trial expiry reminders** — 3-touch sequence (T-3, T-1, T-0). Content must disclose price + cancellation path. Email is the legal record; push drives urgency. Audit: include unsubscribe in marketing variant, mandatory in transactional.

**Renewal reminders** — Single email T-7 (platform mandate: App Store/Play require ≥7-day notice). Surface price change separately per Apple/Google policy.

**Failed payment recovery** — Treat as transactional, not marketing. 4-touch retry ladder; final attempt includes link to update payment. Do not include cross-sell. Critical for involuntary churn (40–60% of churn).

**Win-back** — Branched on churn reason: payment-issue vs. low-engagement. Different creatives, same cadence. Cap at 3 touches over 45 days.

## 3. Quiet Hours & Digest Mode

- **Quiet hours**: Default 22:00–08:00 local time, user-editable. Bypass only for: security alerts, payment failures, calendar-tied reminders (if user opted into "time-sensitive").
- **Digest mode**: Coalesces non-urgent notifications into single daily push at user-chosen time. Does not apply to transactional or time-sensitive categories. Audit risk: must not suppress legally-required notices.

## 4. Fatigue Controls

- **Per-user weekly cap**: 12 push, 5 email (marketing). Enforce server-side.
- **Priority hierarchy**: Transactional → Time-sensitive → Engagement → Marketing. Higher priority bypasses fatigue only if explicitly tagged.
- **Dedup window**: 10 min global; 1 hr per category.
- **Engagement-based throttling**: If 7-day open rate <5%, auto-pause marketing; switch to digest-only.

## 5. Opt-Out & Recovery

- **Granular preferences**: Per-category opt-out (not all-or-nothing). Single tap in notification settings.
- **Recovery mechanism**: 30-day re-engagement email post full opt-out; one-time only; no push.
- **Audit artifact**: Maintain `notification_preferences` table with timestamped changes for compliance.

## 6. Platform Permission Denial Handling

| Denial State | Strategy |
|---|---|
| First denial (pre-prompt) | In-app value reinforcement; retry in 7 days |
| First denial (system) | Continue in-app + email only; log |
| Permanent denial | Switch to email-primary; surface recovery path in settings deep link to OS settings |
| iOS Provisional | Honor automatically; upgrade only on engagement |

## 7. Compliance & Audit Artifacts Required

1. **Consent log**: per-user, per-channel, timestamped, with version of policy text shown.
2. **Suppression audit**: every suppressed notification must log rule triggered.
3. **Platform policy checklist**: App Store 5.1.1(iv), Play billing disclosure, GDPR/CCPA consent receipts.
4. **Frequency report**: weekly dashboard showing actual vs. cap by cohort.

## 8. Key Risk Flags

- **Risk 1**: Marketing tags on transactional notifications → regulatory + platform removal risk. *Mitigation*: two-channel review gate.
- **Risk 2**: Trial/renewal reminders during quiet hours in user's timezone → perceived spam. *Mitigation*: timezone-aware scheduling.
- **Risk 3**: Opt-out not honored in <24h → GDPR/TCPA violation. *Mitigation*: real-time preference propagation SLA <60s.
- **Risk 4**: Permission denial recovery loop harassing user → App Store guideline 5.1.1 risk. *Mitigation*: max 2 recovery touchpoints per quarter.

## 9. Recommended KPIs

- Permission grant rate ≥55%
- Trial-to-paid conversion lift ≥10%
- Involuntary churn recovery ≥25%
- Opt-out rate <3% monthly
- Notification-driven DAU/MAU ratio tracked weekly

**Decision needed**: Confirm whether "calendar-tied reminders" qualify as transactional (bypass quiet hours) or engagement (respect quiet hours). Recommend transactional with explicit opt-in.
