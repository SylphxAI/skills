```text
Notification objective:
Help users return to valuable work without overwhelming them. Notifications must recover work-in-progress, surface time-sensitive state, and reinforce product utility — never substitute for it.

Channels:
Push (mobile OS), email (transactional + digest), in-app (banner + modal). SMS reserved for security only.

Taxonomy:
- Onboarding nudge -> trigger: first session + 24h inactivity post-day-1 setup; user value: completes setup so app becomes useful; channel: in-app then push; frequency: max 3 in 7 days; control: dismissible, auto-suppress on completion
- Trial expiry reminder -> trigger: T-3d, T-1d, T-0 (trial end); user value: avoid losing work or paid conversion surprise; channel: push + email; frequency: 3 over trial; control: preference for "remind me at T-X"
- Abandoned workflow recovery -> trigger: app backgrounded mid-step > 30 min; user value: resume where left off; channel: push with deep link; frequency: 1 per session, cap 3/week; control: snooze 4h, mute per workflow
- Weekly summary -> trigger: Sunday 09:00 user-local; user value: progress visibility; channel: email (primary), in-app on next open; frequency: weekly; control: pause, switch to monthly, disable
- Win-back -> trigger: 14d inactive, then 30d, then 60d; user value: highlight new capability tied to prior work; channel: email only after day 14, push opt-in only; frequency: max 3 attempts; control: one-tap unsubscribe
- Transactional alert -> trigger: backup failed, sync conflict, share received; user value: data integrity / collaboration; channel: push + email mirror; frequency: event-driven, no cap; control: category-level toggle
- Security alert (login/new device) -> trigger: auth event; user value: account safety; channel: push + email; frequency: always; control: cannot disable, only "trusted device" suppression
- Marketing/promo -> trigger: campaign launch; user value: relevance to workflow; channel: email only; frequency: max 2/month; control: granular topic opt-out, never piggybacks on transactional

Risks and guardrails:
- Permission fatigue -> guardrail: defer push prompt until user completes first workflow OR triggers 2nd session (notify-2); show soft in-app primer with "what you'll get" preview
- Consent mixing -> guardrail: separate transactional, utility, and marketing consent buckets; never bundle (notify-3)
- Frequency overload -> guardrail: global cap 6 push/user/week, per-category caps above, suppress next send if user dismissed last 2 of same category (notify-4)
- Wrong-time sends -> guardrail: enforce user-local quiet hours (default 22:00–07:00); only security bypasses; respect timezone changes (notify-5)
- Preference discoverability -> guardrail: surface prefs from first notification ("manage what you get"), plus Settings entry point always visible (notify-6)
- Transactional clarity -> guardrail: factual copy, include action + reference ID; never include marketing content; support can replay from event log (notify-7)
- Promo legitimacy -> guardrail: eligibility, expiration date, fulfillment path, refund/support link on every promo (notify-8)
- In-app interruption -> guardrail: in-app modals only for blocking-critical (security, destructive confirm); everything else is banner with auto-dismiss (notify-9)
- Vanity metrics -> guardrail: track conversion_after_notification, retention D7/D30, complaint_or_spam_signal, and unsubscribe_clicked alongside opens (notify-10)

Events:
- notification_eligible, permission_prompt_shown, permission_result, notification_scheduled, notification_sent, notification_delivered, notification_opened, notification_dismissed, preference_changed, unsubscribe_clicked, conversion_after_notification, complaint_or_spam_signal

Required properties: channel, category, campaign_id, trigger_event, locale, timezone, quiet_hours_applied, frequency_bucket, consent_state, message_version.

Localization:
Copy owned per locale; do not auto-translate. Date/time formatting + quiet hours derived from device locale, confirmed by user on first launch. Currencies, weekday anchors (weekly summary), and trial-expiry phrasing localized. A/B test subject lines per locale independently.

Experiment plan (90-day):
1. Permission timing — day-1 vs after-first-workflow; primary metric D7 retention, guardrail opt-in rate
2. Weekly summary cadence — weekly vs biweekly; metric session_starts_attributed
3. Abandoned recovery copy — "resume" vs "you left 3 tasks"; metric return_within_2h
4. Win-back channel ladder — email-only vs email+push (push only with explicit consent)
5. Quiet hours default — 22–07 vs user-set; metric complaint_rate and night-time push opt-out

Audit checks (monthly):
- Any notification without a logged user-value sentence (notify-1)
- Transactional messages free of marketing tokens (notify-7)
- Frequency caps enforced in pipeline, not just client UI (notify-4)
- Unsubscribe one-click, honored within 24h (notify-6)
```
