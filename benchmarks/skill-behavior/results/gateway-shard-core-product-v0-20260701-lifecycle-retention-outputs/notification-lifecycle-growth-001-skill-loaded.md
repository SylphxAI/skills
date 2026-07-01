Notification objective:  
Help users complete onboarding, recover unfinished work, understand weekly progress, manage trial/payment status, and receive service-critical updates without creating notification fatigue.

Channels:  
Push, email, in-app. No SMS unless separately introduced for high-risk security or billing issues with explicit consent.

Taxonomy:
- Security / account alert -> trigger: new login, password change, email change, suspicious activity; user value: protects account; channel: email + push if enabled + in-app audit log; frequency: uncapped but deduped by incident; control: mandatory for safety, no marketing content.
- Transactional service alert -> trigger: export complete, sync failure, payment receipt, refund, subscription change, critical data issue; user value: confirms important product/service state; channel: email for receipts/account, push/in-app for app state; frequency: event-based, deduped; control: required where service-critical, factual only.
- Onboarding nudge -> trigger: user has not completed first key action after signup; user value: helps reach first productivity outcome; channel: in-app first, then push/email only after opt-in/consent; frequency: max 3 nudges over 7 days; control: mute onboarding tips.
- Abandoned workflow recovery -> trigger: draft/task/project setup started but not completed; user value: resume work with one tap; channel: push or email depending on consent, in-app on return; frequency: 1 reminder within 1–24 hours depending value decay; control: disable workflow reminders.
- Trial expiry reminder -> trigger: trial ending in 7 days, 3 days, 1 day, and expired; user value: avoids surprise loss of premium features; channel: email + in-app, push if opted in; frequency: max 4 per trial; control: subscription emails must include preferences/unsubscribe where legally applicable, but billing-critical notices remain available.
- Weekly summary -> trigger: weekly activity digest available; user value: shows completed tasks, streaks, focus time, missed priorities; channel: email by default if consented, push teaser optional, in-app archive; frequency: 1/week; control: choose day/time or disable.
- Win-back message -> trigger: inactive 14/30/60 days, not recently unsubscribed, no open support issue; user value: highlights unfinished value, new relevant feature, or saved work; channel: email primarily, push only if opted in and recent app user; frequency: max 1 per 30 days, max 3 total in 90 days; control: clear unsubscribe.
- Feature/lifecycle education -> trigger: user repeatedly uses adjacent feature but not advanced feature; user value: helps improve productivity; channel: in-app, email for deeper guide; frequency: max 1/week; control: mute product tips.
- Permission opt-in prompt -> trigger: after user schedules a reminder, creates first task/project, or enables weekly summary; user value: explains what they will receive; channel: in-app pre-prompt then native push prompt; frequency: ask once, re-ask only after clear value moment and cooldown; control: “Not now” respected.

Risks and guardrails:
- Notification fatigue -> global cap: max 1 push/day and 3 push/week excluding security/critical transactional; max 2 lifecycle emails/week; category caps enforced.
- Mixing consent types -> separate preferences for security, transactional, reminders, summaries, tips, marketing/win-back.
- Bad permission timing -> request push only after demonstrated utility, not on first launch.
- Quiet-hours violation -> default quiet hours 9pm–8am user local time; allow user override; critical security/transactional may bypass only when necessary.
- Localization issues -> localize copy, dates, times, currency, trial terms, unsubscribe language; schedule by user timezone.
- Annoying abandoned-flow reminders -> send only when work is recoverable and meaningful; no reminder for trivial or already-completed flows.
- Misleading trial/billing copy -> include exact expiry date, price, renewal terms, cancellation path, and support link.
- In-app interruption -> banners/cards preferred; modals only for critical account, billing, or blocking sync issues.
- Deliverability/spam risk -> authenticated email, suppression lists, bounce handling, complaint monitoring, campaign caps.
- Support confusion -> every transactional/billing email includes account identifier, receipt/reference ID, timestamp, and support link.

Events:
- notification_eligible
- permission_prompt_shown
- permission_result
- notification_scheduled
- notification_sent
- notification_delivered
- notification_opened
- notification_dismissed
- preference_changed
- unsubscribe_clicked
- conversion_after_notification
- complaint_or_spam_signal
- trial_started
- trial_expiring
- trial_converted
- trial_expired
- onboarding_step_completed
- workflow_abandoned
- workflow_recovered
- weekly_summary_generated
- user_inactive
- account_security_event
- transactional_event_created

Measurement and experiments:
- Primary metrics: onboarding completion, workflow recovery rate, trial conversion, weekly active retention, paid retention.
- Negative metrics: opt-outs, push permission denial, email unsubscribe, spam complaints, dismissals, support tickets, app uninstalls after notification.
- Experiments:
  - Push permission timing: after first task created vs after first reminder scheduled.
  - Onboarding cadence: 2 nudges vs 3 nudges in first week.
  - Trial reminder framing: “avoid losing premium features” vs “review before renewal.”
  - Weekly summary timing: Monday morning vs Friday afternoon by locale.
  - Abandoned workflow delay: 1 hour vs next morning respecting quiet hours.
