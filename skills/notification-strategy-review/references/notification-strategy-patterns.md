# Notification Strategy Patterns

## Message taxonomy

| Type | Examples | Consent/control |
| --- | --- | --- |
| Security | login alert, password change | Mandatory where legally/product necessary; no marketing content |
| Transactional | receipt, refund, backup complete | Necessary for service operation; keep factual and privacy-minimized |
| Utility | reminder, task due, build finished | User-configurable frequency and channel; redact sensitive payloads |
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
- `notify-16` — Frequency caps must be explicit at global, category, lifecycle-event, and channel levels; vague "avoid spam" guidance is not enough.
- `notify-17` — Suppression decisions should be deterministic and explainable: priority, dedupe key, cooldown, quiet hours, digest eligibility, conversion/support stop condition, and emergency override reason.
- `notify-18` — Fatigue incidents need cohort/channel/event readback before new campaigns: opt-out, unsubscribe, complaint/spam, uninstall, support-contact, conversion, and retention signals by lifecycle event.
- `notify-19` — Emergency overrides are only for security, safety, service continuity, or explicit user-requested critical alerts; marketing and habit nudges must never bypass caps or quiet hours.
- `notify-20` — Permission recovery after denial must be user-initiated or value-led through in-product education and preference centers; do not repeatedly trigger platform prompts or nag users into settings.
- `notify-21` — Sensitive notifications need privacy-minimized payloads: no secrets, health/finance details, precise location, private content, or account-risk specifics in lock-screen previews, SMS bodies, or email subjects.
- `notify-22` — Sensitive details should be behind auth-gated deep links with short-lived tokens or server-side lookup; push/SMS/email should carry only enough context to be useful.
- `notify-23` — Channel mechanics must be explicit where relevant: SMS STOP/HELP, email List-Unsubscribe, push token invalidation, browser/desktop permission recovery, bounce handling, and category/channel unsubscribe scope.
- `notify-24` — Role and severity routing matters for operational tools: admin, owner, member, on-call, support, and end-user audiences should not receive the same alert or escalation path.

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

## Frequency budget matrix

Use exact caps as starting defaults to review against product risk, region, user choice, and legal policy.

| Category | Default cap | Cooldown | Digest rule | Override |
| --- | --- | --- | --- | --- |
| Security | No marketing cap; event-based only | Dedupe identical event for 10 minutes | Never digest critical security | Critical security/account safety |
| Billing/failed payment | 1 per day per billing incident, 4 per incident before support review | Suppress 24h after open, payment update, cancel, or support ticket | Never digest imminent service loss; factual only | Grace ending or imminent access loss |
| Trial/renewal lifecycle | 2-3 total per lifecycle window | 48h between non-urgent reminders | Include in account digest when urgency >72h away | Renewal/account-risk notice where required |
| Utility reminders | User-configured; default max 2/day | Per task/reminder key after open/complete | Digest low-urgency reminders when >2 queued | User-requested exact-time reminder |
| Digest | User-selected daily/weekly; default weekly | Skip if no meaningful content | Digest is the aggregation surface | None |
| Win-back/marketing | Max 2/month and 3/90 days | 14-30 days after no engagement | Prefer email digest/roundup | None |
| Opt-out recovery | In-app only after a new value moment; max 1/30 days | 30 days after dismissal | Never cross-channel | None |

Global defaults:

- Max one non-transactional push per day and three non-transactional notifications per week unless the user requested reminders.
- Max three total notifications per day across push/email/in-app/SMS, excluding security and required transactional messages.
- If multiple low-priority messages compete, send a digest and suppress individual sends.
- Suppress all non-critical sends during quiet hours; queue at the next acceptable local time, not immediately at midnight.
- If a user opens, converts, pays, cancels, unsubscribes, files support, or completes the task, suppress remaining messages for the same dedupe key.

## Priority and suppression ladder

When a user is eligible for more than one message, choose in this order:

1. Security/account safety.
2. Billing/service continuity with truthful support context.
3. User-requested utility reminders.
4. Trial/renewal lifecycle education.
5. Digest summaries with meaningful content.
6. Win-back or marketing.
7. Opt-out recovery education.

Suppression algorithm:

```text
if consent_state blocks channel -> suppress(consent)
if preference_state disabled category -> suppress(preference)
if dedupe_key already satisfied -> suppress(dedupe)
if quiet_hours and not critical -> delay(quiet_hours)
if global_cap_hit or category_cap_hit -> digest_or_suppress(frequency_cap)
if cooldown_active -> suppress(cooldown)
if stale_trigger or conversion/support stop condition -> suppress(stale_or_resolved)
else schedule highest priority allowed channel
```

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
- Record `frequency_budget_id`, `cap_type`, `cap_remaining`, and `suppression_decision_version` for auditability.

## Privacy, redaction, and channel mechanics

| Content class | What can be shown outside the app | What must be hidden | Required deep-link behavior |
| --- | --- | --- | --- |
| Security/account risk | Generic alert and action needed | IP, precise location, token, session details, exploit specifics | Auth-gated session review; no token in URL |
| Billing/refund/support | Receipt/refund/support status summary | full card, bank, tax ID, private dispute details, support transcript | Auth-gated billing/support record |
| Health/family/location/private content | Generic "new update" or user-configured title | diagnosis, minor details, exact location, message body | Auth-gated detail view and user preview controls |
| Developer/ops incident | Service/build/deploy identifier if safe | secrets, env vars, stack trace with credentials, customer data | Auth-gated incident/build page |
| Marketing/promotion | Offer title when opted-in | sensitive inferred trait or private usage reason | Normal landing page; no emergency override |

Channel mechanics:

- SMS must support STOP/HELP and record `sms_opted_in`, `sms_unsubscribed`, and suppression scope.
- Email marketing/lifecycle messages should carry List-Unsubscribe or equivalent unsubscribe evidence; transactional email must not bundle promotion.
- Push/browser/desktop tokens need invalid-token cleanup, device scope, and denied-permission fallback.
- Lock-screen preview defaults should be conservative for shared devices; let users opt into richer previews per category.
- Support-facing evidence should show message version, consent state, delivery status, and suppression reason without exposing unnecessary payload content.

## Role and severity routing

| Severity | Examples | Audience | Channels | Override rule |
| --- | --- | --- | --- | --- |
| P0 security/safety/service continuity | active account compromise, customer-impacting outage, writes failing | owner/admin/on-call or affected user | reliable channel stack; may bypass quiet hours if evidence-backed | owner/audit required; expires quickly |
| P1 operational action needed | deployment failed, backup failed, quota critical | relevant admin/on-call/member who owns resource | desktop/browser/email/in-app by role preference | no marketing; quiet-hours bypass only if user opted into critical alerts |
| P2 utility/task reminder | build complete, task due, energy full, event reminder | user who requested or benefits | preferred utility channel or digest | no emergency override |
| P3 education/marketing | feature tip, plan upgrade, win-back, IAP offer | opted-in segment only | in-app/email; push only if explicitly opted in and low fatigue | never bypass caps/quiet hours |

## Permission and preference recovery

| Consent/preference state | Allowed action | Recovery path | Prohibited action |
| --- | --- | --- | --- |
| unknown / not asked | Explain concrete value in-product; ask only at a useful moment | preference preview, soft ask, user-triggered settings entry | generic first-launch prompt |
| soft asked / not now | Respect cooldown and continue in-app education only when relevant | show value example after user action | immediate repeat prompt |
| platform denied | Use in-app/email fallback and preference center | user-initiated instructions to OS/browser settings | repeated platform prompts or nag banners |
| granted but category off | Respect category preference | preference center with per-category examples | send through another category |
| unsubscribed / complaint | Stop marketing/lifecycle sends in that scope | confirmation and resubscribe only if user initiates | win-back through a different channel |

## Fatigue incident readback

When opt-outs, complaints, uninstalls, spam reports, or support contacts rise, pause new sends for the noisy cohort and read back:

| Dimension | Required split |
| --- | --- |
| Cohort | new users, trial users, paying users, dormant users, power users, region/timezone |
| Channel | push, email, in-app, SMS, desktop/browser, support outreach |
| Lifecycle event | onboarding, trial, renewal, failed payment, workflow recovery, digest, promotion, game/live event, security |
| Consent/preference state | unknown, soft asked, granted, denied, unsubscribed, complaint, bounced |
| Frequency bucket | global cap, category cap, lifecycle-event cap, cooldown, quiet-hours deferral, digest candidate, emergency override |
| Harm signal | opt-out, unsubscribe, complaint/spam, uninstall, support contact, muted category, negative review, notification-attributed churn |
| Decision | continue, pause, digest, reduce cap, change channel, change copy, suppress cohort, or emergency-only |

Use measurable guardrails such as `+Xpp opt-out vs holdout`, `>Yx complaint baseline`, `support contacts above budget`, `failed critical alert rate above threshold`, and `retention below control`.

## Event schema

Track: `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_suppressed`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `retention_after_notification`, `complaint_or_spam_signal`, `support_contact_after_notification`.

Important properties: `channel`, `category`, `campaign_id`, `trigger_event`, `lifecycle_state`, `dedupe_key`, `locale`, `region`, `timezone`, `quiet_hours_applied`, `frequency_bucket`, `priority`, `consent_state`, `preference_state`, `suppression_reason`, `unsubscribe_scope`, `delivery_status`, `message_version`.
Frequency properties: `frequency_budget_id`, `global_cap_remaining`, `category_cap_remaining`, `lifecycle_event_cap_remaining`, `cooldown_until`, `digest_candidate`, `override_reason`, `suppression_decision_version`.

Guardrail metrics:

- delivery rate and bounce/failure rate by channel;
- opt-in rate by ask context and lifecycle moment;
- opt-out, unsubscribe, complaint/spam, and support-contact rate by campaign;
- conversion and retention lift by cohort against a holdout;
- notification-attributed churn or app uninstall/progressive permission loss;
- dedupe/suppression rate showing avoided duplicate sends.
