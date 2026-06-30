# Notification Strategy Patterns

## Message taxonomy

| Type | Examples | Consent/control |
| --- | --- | --- |
| Security | login alert, password change | Mandatory where legally/product necessary; no marketing content |
| Transactional | receipt, refund, backup complete | Necessary for service operation; keep factual |
| Utility | reminder, task due, build finished | User-configurable frequency and channel |
| Lifecycle | onboarding nudge, trial ending | Consent-aware, limited cadence |
| Marketing | promotion, win-back, launch | Explicit opt-out and campaign caps |
| Social/game | friend invite, guild event, energy full | Strong preference controls and quiet hours |

## Rule IDs

- `notify-1` — Every notification needs a user-value sentence; if only the business benefits, do not send it.
- `notify-2` — Ask push permission after the user reaches a moment where notifications are visibly useful.
- `notify-3` — Separate channels and consent: push, email, SMS, in-app, desktop, and support messages have different expectations.
- `notify-4` — Cap frequency per category and globally; fatigue is a product debt, not just an unsubscribe metric.
- `notify-5` — Time messages by user locale, quiet hours, urgency, and decay of value.
- `notify-6` — Include preference controls from the first meaningful notification surface.
- `notify-7` — Transactional messages should be factual, traceable, and support-friendly.
- `notify-8` — Promotions need eligibility, expiration, fulfillment, and refund/support semantics.
- `notify-9` — In-app messages should not block critical tasks unless the interruption is critical.
- `notify-10` — Measure downstream value and negative signals, not only opens and clicks.

## Event schema

Track: `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `complaint_or_spam_signal`.

Important properties: `channel`, `category`, `campaign_id`, `trigger_event`, `locale`, `timezone`, `quiet_hours_applied`, `frequency_bucket`, `consent_state`, `message_version`.
