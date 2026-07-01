<think>
The user wants a notification strategy for a mobile productivity app. Let me create a concise, audit-friendly strategy that covers all the requested elements. Word budget is 650 words. I need to prioritize artifacts and rubric-critical decisions.

Let me structure this:
1. Strategy overview (brief)
2. Notification taxonomy with triggers, content, channels, timing
3. Frequency caps
4. Quiet hours & localization
5. Opt-in flow
6. Unsubscribe preferences
7. Channel matrix
8. Key metrics

Let me draft this tightly.
</think>

# Mobile Productivity App — Notification Strategy

## 1. Strategy Principles
- **User-initiated default**: All notifications off until explicit opt-in.
- **Value-per-touch**: Every message must answer "what's in it for me NOW?"
- **Channel hierarchy**: In-app → Push → Email (escalate by urgency, not persistence).
- **Respect context**: Quiet hours, locale, frequency caps, and user role.

## 2. Notification Taxonomy

| Type | Trigger | Channel | Timing | Cadence Cap |
|---|---|---|---|---|
| **Onboarding nudge** | Signup, step incomplete | In-app → Push D1 → Email D3 | Real-time, then D+1, D+3 | 5 total / 14d |
| **Trial expiry** | Account created; tiers at D-7, D-3, D-1, D0 | Push + Email (paired) | Local 10:00 user TZ | 4 total |
| **Abandoned workflow** | Workflow started, idle >30 min | In-app immediate; Push T+2h; Email T+24h | Session-aware | 1 per workflow |
| **Weekly summary** | Sunday 09:00 local | Email + optional Push | Locked weekly | 1/week |
| **Win-back** | D-7, D-30, D-90 inactive | Email only (no push) | Variable | 3 max/year |
| **Transactional** | Bill, share, security | Email mandatory; Push opt | Real-time | No cap (required) |

## 3. Opt-In Prompt Flow
1. **Onboarding step 3** (after first "aha"): soft ask — "Stay on track?" → master toggle.
2. **Post-first-value** (D+2 if completed): category granular prompt (Productivity, Account, Tips).
3. **OS-level prompt**: triggered only after in-app consent captured.
4. One re-prompt max in 30 days if dismissed.

## 4. Frequency Caps & Throttling
- **Per-user weekly cap**: 8 push, 4 in-app, 3 marketing email.
- **Per-event cool-down**: same topic not repeated within 72h.
- **Stacked protection**: if both trial-expiry push AND abandoned-workflow push eligible in same hour → priority queue (transactional > lifecycle > marketing).
- **Per-channel suppression**: user-categorized "marketing off" still allows transactional + security.

## 5. Quiet Hours & Localization
- **Default quiet hours**: 22:00–07:00 user-local time.
- **User-adjustable** in Settings (granular by channel and category).
- **Transactional bypass** quiet hours only for: failed payment, security alerts, shared doc mention by direct collaborator.
- **Locale**: copy matrix (EN, ES, PT-BR, FR, DE, JA, ZH); date/time/currency localized; DST-safe scheduling via `user.timezone`, not device country.
- **Cultural rules**: avoid nudges on local public holidays (holiday calendar table).

## 6. Unsubscribe Preferences
- **One-click unsubscribe** header in every email (no login).
- **Preference center** (web + in-app): per-category + per-channel toggles.
- **Floor**: transactional & security cannot be off for email/Push; all other categories individually controllable.
- **Confirmation**: instant "Saved" toast + 24h propagation SLA across channels.
- **Cool-down after unsubscribe**: 7 days no marketing to that channel.

## 7. Channel Decision Matrix
| Scenario | In-app | Push | Email |
|---|---|---|---|
| App open + foreground | ✓ | ✗ | ✗ |
| App backgrounded | ○ | ✓ | ○ |
| User inactive >7d | ✗ | ✗ | ✓ |
| Time-sensitive (24h) | ✓ | ✓ | ✓ |
| Long-form recap | ✗ | ✗ | ✓ |

## 8. Key Metrics (audit weekly)
- **Consent rate** target ≥ 60% opt-in to ≥1 category.
- **Push opt-in rate** ≥ 35% post-prompt.
- **Notification-to-action rate** ≥ 8% (CTOR).
- **Unsubscribe rate** ≤ 0.5%/send; >1% triggers copy + frequency review.
- **Quiet-hour violation rate** = 0% (hard SLO).
- **Localization coverage** = 100% of active user locales.

## 9. Audit Trail
Each send logs: `user_id, category, template_id, channel, locale, tz, trigger_event_id, dedupe_key, send_ts, delivery_ts, open_ts, action_ts`. Retention: 13 months for marketing, 24 months for transactional.

## 10. Review Cadence
- Weekly: frequency-cap & complaint review.
- Monthly: A/B test on copy + send-time.
- Quarterly: taxonomy audit, locale gap analysis, regulatory review (GDPR/PIPEDA/CCPA).
