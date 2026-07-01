Notification objective:  
Help subscribers get productivity value, avoid unwanted billing/payment surprises, recover access when payment fails, and re-engage churned users without creating notification fatigue.

Channels:  
Push, email, in-app, SMS only for high-risk billing/payment if explicitly consented, desktop notifications, support/service messages.

Taxonomy:
- Onboarding permission ask -> trigger: after user creates first task/project, schedules first reminder, or enables a workflow; user value: receive timely reminders and productivity updates; channel: in-app pre-prompt, then OS push prompt; frequency: once, with one delayed re-ask after demonstrated value; control: “Allow reminders,” “Email only,” “Not now”
- Productivity reminders -> trigger: user-created due dates, recurring tasks, calendar-linked deadlines; user value: avoid missing commitments; channel: push/desktop/email based on preference; frequency: user-configurable, capped globally; control: per-reminder, digest mode, quiet hours, pause all
- Digest mode -> trigger: daily/weekly summary of tasks, overdue items, goals, team updates if applicable; user value: reduce interruptions while staying informed; channel: email, in-app, optional push summary; frequency: daily/weekly/user-selected; control: digest schedule, included categories, disable
- Trial expiry reminders -> trigger: trial ending at T-7, T-3, T-1, final day; user value: avoid surprise loss of premium features; channel: email + in-app, push only if opted into lifecycle notices; frequency: max 3–4 total; control: opt out of lifecycle/marketing, keep transactional billing notices
- Renewal reminders -> trigger: upcoming renewal, especially annual plans or legally required notices; user value: avoid surprise charge and manage subscription; channel: email mandatory/transactional where required, in-app optional; frequency: per policy/legal requirements, e.g. T-30/T-7/T-1 for annual; control: cannot suppress required billing notices, can manage marketing/lifecycle
- Failed payment recovery -> trigger: payment authorization failure, retry scheduled, grace period ending, account downgrade risk; user value: maintain access and prevent data/workflow disruption; channel: email + in-app, push optional, SMS only with explicit consent; frequency: retry-aligned, capped, stop immediately after success; control: update payment, contact support, manage billing
- Renewal confirmation/receipt -> trigger: successful payment, refund, plan change, cancellation; user value: clear billing record; channel: email; frequency: event-based; control: transactional, no marketing content
- Win-back campaigns -> trigger: canceled, churned, inactive after cooldown; user value: relevant feature improvement, discount, or recovery of previous workflow; channel: email, in-app if logged out/in, paid retargeting only with consent/compliance; frequency: capped campaign sequence, e.g. 2–3 messages over 30–60 days; control: unsubscribe, suppress if support dispute/refund issue
- Opt-out recovery -> trigger: user disables push/email category; user value: choose lower-noise alternatives; channel: in-app preferences only, not nagging via disabled channel; frequency: show once contextually when feature needs notifications; control: category-level re-enable, digest fallback
- Platform permission denial handling -> trigger: OS push denied or notification permission unavailable; user value: still receive reminders through chosen fallback; channel: in-app education, email/digest fallback; frequency: do not repeatedly prompt; control: instructions to enable in settings, “use email instead”
- Security/account notices -> trigger: login from new device, password/email change, suspicious activity; user value: protect account; channel: email, optional push; frequency: event-based; control: mandatory where necessary, no promotional content

Risks and guardrails:
- Asking permission too early -> ask only after the user sets a reminder, imports calendar, or sees a preview of notification value
- Mixing transactional and marketing consent -> separate billing/security/service notices from lifecycle and promotional opt-ins
- Billing surprise or legal exposure -> send factual renewal, receipt, cancellation, refund, and failed-payment notices with plan, amount, date, and support links
- Notification fatigue -> global caps, category caps, digest mode, quiet hours, cooldowns after dismissals, and suppression after repeated non-engagement
- Quiet-hours violations -> respect locale/timezone; only security or urgent account-risk messages bypass quiet hours
- Failed payment over-messaging -> align to payment retry schedule, stop on payment success, suppress if user canceled or contacted support
- Win-back annoyance -> enforce churn cooldown, cap sequences, exclude users with complaints/refunds, include one-click unsubscribe
- Permission denial dead-end -> provide fallback channels and settings guidance without repeated OS prompt attempts
- Opt-out dark patterns -> make unsubscribe and category controls clear; never require disabling all communication to stop marketing
- In-app interruption -> do not block task creation, task completion, or billing management unless action is critical
- Poor measurement incentives -> measure task completion, retained reminders, payment recovery, complaints, unsubscribes, dismissals, and support tickets, not only opens/clicks

Events:
- `notification_eligible`
- `permission_prompt_shown`
- `permission_result`
- `notification_scheduled`
- `notification_sent`
- `notification_delivered`
- `notification_opened`
- `notification_dismissed`
- `preference_changed`
- `unsubscribe_clicked`
- `conversion_after_notification`
- `complaint_or_spam_signal`
- `quiet_hours_applied`
- `digest_enabled`
- `digest_sent`
- `payment_failed`
- `payment_recovered`
- `trial_expiry_notice_sent`
- `renewal_notice_sent`
- `subscription_canceled`
- `winback_suppressed`

Experiment plan:
- Test permission timing: app launch vs after first reminder created vs after first successful reminder preview; success metric: opt-in rate plus 30-day reminder engagement and disable rate
- Test digest defaults: immediate notifications vs daily digest suggestion for low-engagement users; success metric: lower opt-outs without reduced task completion
- Test failed-payment cadence: standard retry notices vs fewer high-clarity notices; success metric: recovery rate, support tickets, complaints
- Test trial expiry messaging: feature-loss framing vs workflow-continuity framing; success metric: paid conversion and refund/complaint rate
- Test win-back eligibility: broad churn segment vs high-intent segments only; success metric: reactivation net of unsubscribes/spam complaints
