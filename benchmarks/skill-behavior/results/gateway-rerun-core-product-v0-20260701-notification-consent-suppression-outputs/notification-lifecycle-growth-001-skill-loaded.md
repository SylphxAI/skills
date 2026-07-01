<think>
The user wants a notification strategy for a mobile productivity app. I need to use the skill format provided and keep it under 650 words. Let me build concise, audit-friendly artifacts covering all requested elements.
</think>

```text
Notification objective:
Help users complete valuable work without burying them in noise. Notifications earn attention by tying every send to a verifiable user value moment, respecting consent and quiet hours, and stopping the moment a lifecycle event resolves.

Channels: push, email, in-app, SMS (recovery only when legal/region allows), in-product preference center, support macros.
```

### Lifecycle matrix

| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency / suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Onboarding | First task created or value moment reached | Show what a useful notification looks like | In-app soft ask -> platform push prompt | not_asked -> soft_asked -> granted/denied | Max 1 prompt/day, 2 attempts total | Permission opt-in rate, D1 retention |
| Trial expiry | T-7, T-3, T-1 days, payment failure | Avoid surprise lockout | Email > in-app; push only to opted-in high-value users | email subscribed, lifecycle_push opted-in | Stop on conversion, cancellation, or opt-out | Trial-to-paid lift |
| Abandoned workflow | Draft/task idle > X hours, still recoverable | Finish work the user already started | In-app first; push/email if consented and decay high | preference allowed, quiet hours respected | Max 3 nudges / workflow / 7 days | Completion rate per dedupe key |
| Weekly summary | Active week with N>=3 meaningful events | Reflect on progress | Email digest + in-app; push only to announce digest | digest enabled | Skip if no meaningful activity | Open-to-engaged-session rate |
| Win-back | Inactive 30/60/90 days with prior value | Honest return reason, no fake urgency | Email > in-app; push only if lifecycle opted-in | consent active | Cap 3 messages, stop on re-engagement or unsubscribe | Reactivation rate vs control |
| Transactional / security | Receipt, sync conflict, login from new device | Account truth and safety | Factual channel required (push/email/in-app) | mandatory where applicable | No marketing content; quiet hours off for security | Delivery rate, support contacts |
| Renewal / payment fail | Failed payment, card expiring | Prevent silent service loss | Email + in-app; push if opted-in and urgent | consent active | Stop on success, cancel, or support escalation | Recovery rate |

### Consent and regional control matrix

| Channel / region | Permission timing | Required consent | Unsubscribe / opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push (iOS/Android) | After first value moment, contextual soft ask then platform prompt | explicit_granted | in-product toggle + OS settings | In-app + email + preference center | per-device prompt result, rationale log |
| Email | At signup with category split (transactional vs lifecycle vs digest) | subscribed, category-level | one-click header + footer + preference center | In-app only | double-opt-in where required (e.g., DE, CA) |
| In-app | Always available after signup | allowed by default, respect snooze | dismissable, snooze, category toggle | n/a (primary surface) | frequency cap, fatigue survey |
| SMS | Only for time-critical payment/security if region permits | explicit opt-in + verified phone | STOP keyword honored | Email + in-app | consent timestamp, region |
| Regional (EU/UK, US, APAC) | unknown -> block marketing sends | consent_policy_version on record | honor immediately | route to transactional only | policy_owner, legal_basis |

### Taxonomy and channel policy

- Onboarding nudge -> trigger: first value moment; value: preview useful alerts; channel: in-app soft ask -> push prompt; priority: P2; frequency: 1/day, max 2; control: contextual; suppression: deny -> education only.
- Trial expiry -> trigger: T-7/T-3/T-1; value: no surprise lockout; channel: email>in-app, push if opted-in; priority: P1; frequency: 3 sends; control: reminder toggles; suppression: convert/cancel/opt-out.
- Abandoned workflow -> trigger: idle threshold; value: finish real work; channel: in-app -> push/email fallback; priority: P2; frequency: 3/7d; control: per-category; suppression: complete/stale; dedupe_key: `workflow:<id>:<step>`.
- Weekly summary -> trigger: meaningful weekly activity; value: progress review; channel: email digest + in-app; priority: P3; frequency: weekly; control: digest off/topic mix; suppression: empty week or digest disabled; dedupe_key: `summary:<week>`.
- Win-back -> trigger: dormancy 30/60/90; value: relevant reason to return; channel: email>in-app; priority: P3; frequency: 3 over 90d; suppression: re-engage/unsub; no fake urgency.
- Transactional / security -> trigger: account/event truth; value: factual account state; channel: required channel(s); priority: P0 for security; control: cannot fully opt out; suppression: none; never bundle marketing.
- Preference reminders -> trigger: quiet hours conflict or near fatigue cap; value: user control; channel: in-app; priority: P3; frequency: on threshold only; suppression: already asked.

### Risks and guardrails

- Premature OS permission ask -> Soft ask only inside the value moment; never on first launch.
- Channel crosstalk -> dedupe_key per event; one canonical send lifecycle-stage surface.
- Fatigue -> category + global caps (e.g., max 2 push/day, max 5 in-app/week), quiet hours by timezone, snooze.
- Marketing in transactional -> block bundling; security/event messages stay factual.
- Denied push recovery -> education and preference center, not repeated OS prompts.
- Mis-targeting by region -> unknown region blocks marketing; record consent_policy_version.
- Metric gaming -> never optimize open/click alone.
- Silent suppression after unsubscribe or complaint -> immediate global effect on that campaign family.

### Events and trust metrics

Track per send: `channel`, `category`, `campaign_id`, `trigger_event`, `lifecycle_state`, `dedupe_key`, `locale`, `region`, `timezone`, `quiet_hours_applied`, `frequency_bucket`, `priority`, `consent_state`, `preference_state`, `suppression_reason`, `unsubscribe_scope`, `delivery_status`, `message_version`.

Lifecycle events: `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_suppressed`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `retention_after_notification`, `complaint_or_spam_signal`, `support_contact_after_notification`.

Guardrail metrics: delivery + bounce by channel; permission grant rate by ask context; opt-out, unsubscribe, complaint/spam, and support-contact rate per campaign; conversion/retention lift vs holdout; notification-attributed churn and permission revoke rate; dedupe suppression rate showing avoided duplicates.
