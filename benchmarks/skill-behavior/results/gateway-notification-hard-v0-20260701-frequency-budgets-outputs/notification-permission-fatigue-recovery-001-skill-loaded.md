Notification objective:  
Help users complete productivity work, avoid surprise access/billing issues, and receive useful summaries without fatigue or coercive re-permission prompts.

Channels:  
In-app, push, email. SMS only for explicit billing/security opt-in or regionally approved high-risk service continuity. No marketing via transactional channels.

Lifecycle matrix:
| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Onboarding | User creates first task/project, schedules reminder, or enables deadline | Shows why notifications help their own workflow | In-app soft ask → platform push prompt if accepted; email preference setup | `not_asked`, `soft_asked`, `platform_prompted`, `granted`, `denied` | Ask once after value moment; if denied, no repeat prompt; in-app education max 1/30d after new value moment | Push opt-in by ask context, reminder completion |
| Trial expiry | Trial user with meaningful usage, T-7/T-3/T-1 days | Avoid losing access to tasks, automations, history | Email + in-app; push only opted-in lifecycle/account alerts | Email subscribed; push granted; category enabled | 2–3 total/window, 48h cooldown; suppress on conversion/cancel/support ticket | Trial conversion, unsubscribe, support contacts |
| Renewal reminder | Paid subscription renewal T-14/T-3/T-1, especially annual | Avoid surprise charge/access change | Email + in-app; push only opted-in account reminders | Account/billing preference enabled where required | 2–3/window; digest if >72h away; suppress after renewal/cancel | Renewal success, complaints, refund requests |
| Failed payment | Payment failed, grace period active | Prevent service interruption | Email + in-app; push/SMS only urgent and opted-in | Billing/service consent; SMS explicit opt-in | 1/day per incident, max 4 before support review; suppress 24h after open/payment/support | Payment recovery, support burden, churn |
| Weekly digest | Meaningful completed/upcoming tasks, usage summary | Review progress and plan week | Email or in-app; push only “digest ready” if opted in | Digest enabled; frequency daily/weekly/off | Skip if no meaningful content; digest low-priority queued nudges | Digest engagement, task return rate, opt-outs |
| Win-back | Inactive 21–45d with prior value history | Relevant reason to return, saved work, new useful feature | Email; in-app if returns; push only explicit lifecycle opt-in | Marketing/lifecycle allowed | Max 2/month and 3/90d; 14–30d cooldown; stop after no engagement/unsub | Reactivation, unsubscribe, spam |
| Opt-out/denial recovery | User denied push or disabled category, later creates reminder/deadline | Explain missed value and offer controls | In-app only | Denied/unsubscribed respected | Max 1/30d after new value moment; never repeated platform prompt directly | Preference recovery, dismissals |
| Security/transactional | Login, password, receipt, refund, export complete | Account truth and service record | Required factual email/in-app; push if enabled | Separate from marketing consent | Event-based; no upsell; dedupe identical 10m | Delivery, support-safe audit |

Consent and regional control matrix:
| Channel/region | Permission timing | Required consent/preference | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push/all | After first concrete value moment: reminder/deadline/project activity | Platform permission + category toggle | OS settings + in-app category off | In-app/email preference education | `permission_prompt_shown`, `permission_result`, ask context |
| Email/US | At signup for transactional; marketing/lifecycle preference separately | Transactional allowed; marketing/lifecycle opt-out | One-click unsubscribe; category center | In-app only for noncritical | `email_subscribed`, `unsubscribe_scope` |
| Email/EU/UK/strict regions | Consent/legal basis by category before non-transactional | Explicit marketing consent; account notices separate | Immediate unsubscribe/suppression | In-app account center | `region`, `consent_policy_version`, legal owner |
| SMS/all | Never default; only explicit billing/security opt-in | Phone verified + SMS opt-in + category | STOP and preference center | Email/in-app billing notices | `sms_opted_in`, STOP logs |
| In-app/all | Available while logged in | Category preferences; no blocking critical tasks | Dismiss/category off | None needed | `dismissed`, `preference_changed` |

Taxonomy and channel policy:
- Security/account -> login/password/export risk; user safety; email/in-app, optional push; highest priority; event-based; no marketing; dedupe 10m.
- Transactional/billing receipt -> receipt/refund/subscription change; factual record; email/in-app; event-based; unsubscribe not for required service notices; suppress upsell.
- Failed payment -> payment failure/grace ending; avoid disruption; email/in-app, push/SMS only opted-in urgent; 1/day, max 4/incident; stop on payment/cancel/support.
- Trial/renewal lifecycle -> expiry/renewal window; avoid surprise loss/charge; email/in-app, optional push; 2–3/window; dedupe by subscription/date.
- Utility reminders -> user-created reminders/deadlines; task completion; push/in-app/email by user choice; default max 2/day; exact-time override when user requested.
- Digest -> activity summary; progress/planning; email/in-app; weekly default; skip empty; aggregate low-priority nudges.
- Win-back/marketing -> inactivity with prior value; return to saved work/new feature; email only by default; max 2/month, 3/90d; stop after unsubscribe/no engagement.
- Opt-out recovery -> after new value moment; explain value/control; in-app only; max 1/30d; never dark-pattern platform reprompt.

Frequency and suppression budget:
- Global cap: max 1 non-transactional push/day; max 3 total notifications/day across push/email/in-app/SMS, excluding security and required transactional.
- Category caps: utility default 2/day unless user configured; trial/renewal 2–3/window; failed payment 1/day, 4/incident; win-back 2/month and 3/90d; opt-out recovery 1/30d.
- Lifecycle-event cap: one high-priority message per dedupe key/day unless user-requested exact reminder.
- Cooldowns: 48h lifecycle; 24h billing after open/action; 14–30d win-back; 30d denial recovery.
- Digest/quiet-hours rules: quiet hours default 9pm–8am local; delay noncritical to next reasonable window; digest when >2 low-priority items compete; skip empty digest.
- Emergency override: security, account safety, imminent service loss/grace ending, or user-requested exact-time reminder only.

Risks and guardrails:
- Permission ask too early -> ask only after reminder/deadline/project value moment.
- Fatigue from lifecycle + billing overlap -> priority ladder and cross-channel dedupe.
- Consent mixing -> separate transactional, billing, lifecycle, marketing, SMS, push preferences.
- Duplicate push/email/in-app -> durable `dedupe_key`; suppress after any channel succeeds or user acts.
- Dark-pattern denial recovery -> in-app education only after new value moment, max 1/30d.
- Optimizing clicks over trust -> require opt-out, complaint, churn, support-contact guardrails.

Events and trust metrics:
- Track `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_suppressed`, `notification_sent`, `delivered`, `opened`, `dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `retention_after_notification`, `complaint_or_spam_signal`, `support_contact_after_notification`.
- Include `channel`, `category`, `trigger_event`, `lifecycle_state`, `dedupe_key`, `region`, `locale`, `timezone`, `consent_state`, `preference_state`, `suppression_reason`, `frequency_budget_id`, `cap_remaining`, `cooldown_until`, `quiet_hours_applied`, `delivery_status`.
- Trust metrics: delivery/bounce, opt-in by ask moment, opt-out/unsubscribe/complaint, support contacts, conversion/retention lift vs holdout, notification-attributed churn/uninstall, dedupe/suppression rate.
