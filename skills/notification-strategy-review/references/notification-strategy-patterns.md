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
- `notify-11` — Regional consent and channel permissions need explicit states: unknown, not_asked, soft_asked, platform_prompted, granted, denied, provisional/limited where available, unsubscribed, bounced, complaint, and suppression_required.
- `notify-12` — Cross-channel deduplication needs a durable key per lifecycle event so push, email, in-app, and SMS do not repeat the same nudge after one channel succeeds.
- `notify-13` — Denied-permission recovery should use in-product education and preference centers, not repeated platform prompts or dark patterns.
- `notify-14` — Commercial recovery messages need lifecycle intent, honest urgency, billing/support context, and stop conditions.
- `notify-15` — Guardrail metrics must include delivery, retention, opt-in, opt-out, unsubscribe, complaint/spam, support contacts, and notification-attributed churn.

## Lifecycle matrix

| State | Trigger | Allowed intent | Preferred channel | Stop/suppression condition |
| --- | --- | --- | --- | --- |
| Onboarding | User completes value moment or creates first task/project | Explain useful notification value and ask permission contextually | In-app soft ask, then platform push prompt | Stop if denied; switch to in-app/email preference education |
| Trial ending | Trial has real usage and expiry is approaching | Help user avoid surprise loss of access | Email + in-app; push only if opted-in and high value | Suppress after conversion, cancellation, or explicit opt-out |
| Abandoned workflow | Draft/task/import/setup is incomplete and still recoverable | Help user finish work they started | In-app first, push/email fallback by consent | Suppress after completion, stale task, or max attempts |
| Weekly summary/digest | User has meaningful activity to summarize | Deliver reviewable value, not generic engagement | Email or in-app digest; push only to announce digest availability | Suppress when no meaningful content or user chooses digest off |
| Renewal/payment recovery | Renewal approaching or payment failed | Prevent service disruption with factual billing help | Email + in-app; push for urgent opted-in service risk | Stop after payment updated, cancellation, or support escalation |
| Win-back | User is inactive and has prior value history | Offer relevant reason to return without guilt or fake urgency | Email/in-app; push only if explicitly opted into lifecycle updates | Stop after unsubscribe, repeated non-engagement, or win-back cap |
| Transactional/security | Receipt, refund, backup, login, password, critical service state | Keep user informed about account/service truth | Required factual channel; no marketing content | Do not include upsell; respect legal/channel requirements |

## Consent, region, and preference matrix

Use region as a product routing dimension even when legal review owns final policy.

| Dimension | Required product state | Design rule |
| --- | --- | --- |
| Channel consent | push_granted, push_denied, email_subscribed, email_unsubscribed, sms_opted_in, in_app_allowed | Never infer consent across channels. |
| Regional consent | region, locale, consent_policy_version, legal_basis_or_policy_owner | Make regional rule visible and block launch if unknown. |
| Preference center | category toggles, digest mode, quiet hours, channel choices | Offer controls before fatigue becomes a complaint. |
| Denied permission | denied_at, ask_context, recovery_eligible_at | Use education/preferences; do not repeatedly prompt. |
| Unsubscribe/complaint | unsubscribe_source, complaint_type, suppression_scope | Apply immediately and suppress adjacent campaigns. |

## Cross-channel suppression and dedupe

Create a `dedupe_key` per lifecycle event, for example `trial_expiry:<subscription_id>:<renewal_date>` or
`workflow_recovery:<workflow_id>:<step>`.

Suppression rules:

- If a user converts, completes, renews, pays, cancels, unsubscribes, complains, or opens a support ticket, cancel lower-priority reminders for the same dedupe key.
- Send at most one high-priority message per lifecycle event per day unless the user requested reminders.
- Prefer digesting low-urgency nudges when multiple lifecycle events compete.
- Apply quiet hours by user timezone except for user-requested or critical transactional/security messages.
- Escalate channels only when value decays with time and the user has granted that channel.

## Event schema

Track: `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_suppressed`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `retention_after_notification`, `complaint_or_spam_signal`, `support_contact_after_notification`.

Important properties: `channel`, `category`, `campaign_id`, `trigger_event`, `lifecycle_state`, `dedupe_key`, `locale`, `region`, `timezone`, `quiet_hours_applied`, `frequency_bucket`, `priority`, `consent_state`, `preference_state`, `suppression_reason`, `unsubscribe_scope`, `delivery_status`, `message_version`.

Guardrail metrics:

- delivery rate and bounce/failure rate by channel;
- opt-in rate by ask context and lifecycle moment;
- opt-out, unsubscribe, complaint/spam, and support-contact rate by campaign;
- conversion and retention lift by cohort against a holdout;
- notification-attributed churn or app uninstall/progressive permission loss;
- dedupe/suppression rate showing avoided duplicate sends.
