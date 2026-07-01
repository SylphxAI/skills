Notification objective:  
Help subscribers protect work continuity, remember time-sensitive account actions, and receive useful productivity summaries without fatigue or consent leakage.

Channels:  
In-app, push, email, SMS only for explicitly opted-in billing-critical recovery, desktop if applicable. Separate transactional/billing, lifecycle, utility, marketing, and security consent.

Lifecycle matrix:

| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Onboarding permission ask | User creates first task/project, sets due date, or sees reminder preview | Understand concrete value of reminders before enabling | In-app soft ask → platform push prompt only after positive intent | push: not_asked/soft_asked/granted/denied; reminder category default visible | Ask once per value moment; no repeated platform prompt after denial | Opt-in rate by ask context, denial rate, reminder activation |
| Trial active | Meaningful usage achieved; 3–5 days before expiry | Avoid surprise loss of access | Email + in-app; push only if opted into account reminders | Lifecycle/account consent required; no marketing consent reuse | Max 2–3 reminders; suppress after upgrade/cancel/no usage | Trial conversion, unsubscribe, support contacts |
| Trial final day | Trial expires within 24h and user has active work | Preserve access to projects/tasks | In-app + email; push if granted and high value | Account/lifecycle preference on | One final reminder; no fake urgency | Conversion, complaint rate, churn |
| Renewal reminder | Renewal approaching, especially annual plans | Avoid surprise billing | Email primary + in-app account notice | Transactional/account notification; marketing excluded | 1 notice for monthly if required/product policy; 2 for annual/high amount | Renewal completion, refund/support rate |
| Failed payment | Payment attempt failed | Prevent service disruption | Email + in-app; push if opted-in; SMS only explicit billing opt-in | Billing transactional allowed; SMS requires explicit opt-in | Escalate over 7–14 days; suppress after payment update, cancel, or support ticket | Recovery rate, support contacts, complaints |
| Grace period ending | Access loss imminent | Clear action to retain access | Email + in-app + opted-in push | Billing/account preference | Max 1/day; quiet hours except final service-risk notice | Payment recovery, churn |
| Weekly/daily digest | Meaningful completed/upcoming work exists | Review progress and plan next actions | Email or in-app; push only “digest ready” if chosen | Digest mode on; frequency selected | Suppress if no meaningful content; user-set cadence | Digest open, retention, opt-out |
| Abandoned setup/workflow | User started import/integration/project setup but did not finish | Resume useful work | In-app first; email/push fallback by consent | Lifecycle/utility preference on | 1–2 attempts; stale after 7–14 days | Completion lift, opt-out |
| Win-back | Inactive 14/30/60 days with prior value history | Relevant reason to return, not guilt | Email primary; in-app if returns; push only explicit lifecycle opt-in | Marketing/lifecycle consent depending content | Cap 2–3 messages per 90 days; suppress after non-engagement/unsub | Reactivation, unsubscribe, spam |
| Opt-out recovery | User disables notifications or denies push | Explain controls and alternatives | In-app preference education only | denied/unsubscribed respected | No repeated prompts; recovery only after new value moment | Re-enable rate, complaints |
| Quiet hours | User local night hours or configured DND | Respect attention | Delay non-urgent channels | Timezone known; quiet_hours set/default | Apply to all non-security/non-critical billing | Suppression/delay rate, retention |

Consent and regional control matrix:

| Channel/region | Permission timing | Required consent/preference | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push / all regions | After first concrete reminder value moment | Platform granted + category enabled | App notification settings + OS settings | In-app/email if consented | permission_result, ask_context |
| Email transactional/billing | At account creation or purchase | Service/account basis per regional policy | Manage non-essential; transactional limited as required | In-app account banner | consent_policy_version, region |
| Email lifecycle/marketing | After signup with clear category choice | Region-specific opt-in/opt-out | One-click unsubscribe | In-app only if allowed | unsubscribe_source, preference_state |
| SMS billing | Only when user adds phone and opts in | Explicit SMS opt-in | STOP handling and preference center | Email/in-app | sms_opted_in, stop_received |
| In-app | Default while authenticated | in_app_allowed unless category disabled | Preference center | None | impression/dismissal |
| Desktop | After desktop value moment | OS permission + category preference | App/OS controls | In-app/email | permission_result |

Taxonomy and channel policy:

- Security/account access -> login/password/device changes; user value: account safety; email/in-app, urgent; mandatory where appropriate; no marketing; suppress only duplicate same event.
- Billing transactional -> renewal, receipt, failed payment, grace ending; email/in-app, push/SMS only if opted-in and time-sensitive; factual, support-safe; suppress after payment, cancel, support escalation.
- Trial lifecycle -> expiry reminders; email/in-app, optional push; max 2–3; suppress after upgrade/cancel/opt-out.
- Utility reminders -> tasks, due dates, scheduled focus sessions; push/desktop/in-app by user choice; user-configurable cadence; dedupe by task/reminder ID.
- Digest -> daily/weekly summaries; email/in-app; push only to announce if chosen; suppress if no meaningful content.
- Engagement/win-back -> return prompts, feature updates, offers; email only unless explicit push lifecycle opt-in; strict campaign caps; suppress after unsubscribe, complaint, or repeated non-engagement.
- Opt-out recovery -> preference education after new value moment; in-app only; no dark patterns or repeated platform prompts.

Risks and guardrails:

- Early push ask before value -> gate prompt behind first task/reminder/project value moment.
- Consent mixing -> separate billing, lifecycle, utility, marketing, SMS, and push states.
- Fatigue from stacked lifecycle messages -> global and category caps; digest low-urgency nudges.
- Duplicate cross-channel reminders -> durable `dedupe_key`; cancel lower-priority sends after open/action.
- Quiet-hours violations -> local timezone scheduling; exempt only security or critical service-risk notices.
- Failed payment pressure -> factual copy, clear billing/support links, stop after cancel/support ticket.
- Win-back spam -> eligibility requires prior value; cap and sunset non-responders.
- Denied permission mishandling -> no repeated OS prompts; use in-app education and preference center.
- Open-rate optimization harms trust -> measure opt-outs, complaints, support contacts, churn, retention.

Events and trust metrics:

- `notification_eligible` with channel, category, lifecycle_state, trigger_event, consent_state, preference_state.
- `permission_prompt_shown` / `permission_result` with ask_context, platform, region.
- `notification_scheduled`, `notification_suppressed`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`.
- Required properties: `dedupe_key`, `campaign_id`, `priority`, `timezone`, `quiet_hours_applied`, `frequency_bucket`, `suppression_reason`, `delivery_status`, `message_version`.
- Preference events: `preference_changed`, `unsubscribe_clicked`, `sms_stop_received`, `complaint_or_spam_signal`.
- Outcome events: `conversion_after_notification`, `payment_recovered`, `trial_converted`, `retention_after_notification`, `support_contact_after_notification`, `notification_attributed_churn`.
- Trust metrics: delivery/failure rate, opt-in by ask context, opt-out/unsubscribe/complaint rate, support-contact rate, conversion and retention lift vs holdout, uninstall or permission-loss rate, dedupe/suppression rate.
