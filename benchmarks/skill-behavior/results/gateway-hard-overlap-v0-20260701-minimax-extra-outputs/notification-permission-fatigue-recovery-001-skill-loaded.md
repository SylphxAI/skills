**Notification objective:** Drive activation, retention, and renewal for a subscription productivity app while respecting consent, quiet hours, and fatigue budgets; never substitute notifications for product value (notify-1).

**Channels:** Push (soft + platform), email (transactional + lifecycle), in-app (always available), SMS (billing/security only). Deduped per lifecycle event (notify-12).

---

### Lifecycle matrix

| Lifecycle state | Trigger | User value | Channel priority | Consent/preference | Frequency/suppression | Metric |
|---|---|---|---|---|---|---|
| Onboarding | First value moment reached | Preview useful reminders | In-app soft ask → platform push (notify-2) | Soft ask first; ask_context recorded | 1 ask / value moment; stop on denial | Permission grant rate |
| Trial expiring (T-7 → T-0) | Trial end date + real usage | Avoid surprise lockout | Email + in-app; push only opted-in | Lifecycle consent | 2–3 total / window; 48h cooldown (notify-16) | Trial→paid conversion |
| Renewal reminder | Subscription renews in ≤7d | Predictable billing | Email + in-app | Transactional-consent | 1 / renewal window | Renewal rate |
| Failed payment | Payment retry failed | Restore service | Email + in-app; push for urgency ≥72h | Billing-consent | 1/day, 4/incident; suppress on payment, cancel, support (notify-7) | Payment recovery rate |
| Win-back | 30/60/90d inactive + prior value | Honest reason to return | Email/in-app; push only if lifecycle-opted-in | Marketing-consent | Max 2/month, 3/90d; stop on engagement/unsubscribe | Reactivation; spam signal |
| Digest | ≥3 pending low-urgency items OR weekly | Reviewable summary | Email/in-app; push announces digest | User-selected cadence | Skip if no meaningful content | Digest CTR; retention |
| Security (login/pwd) | Account event | Account safety | Email mandatory; push if granted | Mandatory where legal | Event-driven; 10min dedupe (notify-17) | Compromise signal |

### Consent and regional control matrix

| Channel/region | Permission timing | Required consent | Opt-out | Fallback if denied | Evidence |
|---|---|---|---|---|---|
| Push (iOS/Android) | After first value moment (notify-2) | platform_granted + category_toggle | In-app toggle + system settings | In-app + email for same lifecycle | grant_rate by ask_context |
| Email lifecycle | First signup | lifecycle_subscribed | One-click header + footer; LIST-Unsubscribe | In-app only | unsubscribe_source |
| Email transactional | Account creation | necessary | Cannot fully opt out; suppress non-essential | In-app | delivery + complaint |
| SMS | Failed payment or 2FA only | sms_opted_in + region eligible | STOP keyword | Email | consent_policy_version |
| Regional (EU/UK/CA) | Pre-prompt disclosure | explicit + withdrawable | In-product + link | Suppress non-essential | legal_basis_owner |

---

### Taxonomy and channel policy
- **Security** → trigger=account_event; channel=email+push(if granted); priority=P0; never digest; dedupe 10min (notify-7).
- **Transactional** → trigger=billing/service state; channel=email+in-app; P1; factual only; stop on resolution.
- **Utility reminder** → user-configured; P1; per-task dedupe key; cooldown until open/complete.
- **Trial/renewal lifecycle** → P2; 2–3/window; 48h cooldown; digest eligible >72h urgency.
- **Failed payment** → P1; 1/day incident; suppress on payment/cancel/support ticket.
- **Digest** → P3; weekly default; skip empty.
- **Win-back/marketing** → P3; 2/month, 3/90d; stop on opt-out or conversion.
- **Opt-out recovery** → in-app only; 1/30d; never cross-channel (notify-13).

### Frequency and suppression budget
- **Global cap:** ≤3 non-transactional/week, ≤1 push/day; user-requested reminders exempt (notify-4, notify-16).
- **Category caps:** trial/renewal 2–3/lifecycle; billing 1/day-incident; win-back 2/month + 3/90d; reminders user-set.
- **Lifecycle-event cap:** 1 high-priority/day/event unless user-requested.
- **Cooldowns:** 48h trial; 24h billing after open; 14–30d win-back after non-engagement.
- **Quiet hours/digest:** honor user-local timezone; queue after quiet hours (not midnight); digest when ≥3 low-priority compete.
- **Emergency override:** security/account safety only; record `override_reason` and `suppression_decision_version` (notify-17).

### Suppression ladder (deterministic, notify-17)
1. Security → 2. Billing continuity → 3. User-requested utility → 4. Trial/renewal → 5. Digest → 6. Win-back/marketing → 7. Opt-out recovery. Gate each step on consent_state, preference_state, dedupe_key, quiet_hours, global/category cap, cooldown, stale-or-resolved stop condition.

### Risks and guardrails
- **Fatigue** → global + category + lifecycle caps, digest, quiet hours, cooldown (notify-4, notify-16).
- **Premature prompts** → soft ask only after value moment (notify-2).
- **Dark-pattern re-prompts** → denied-permission uses in-app education, never repeated platform prompts (notify-13).
- **Cross-channel spam** → `dedupe_key` per lifecycle event; suppress on convert/pay/cancel/open/support (notify-12).
- **Metric gaming** → measure retention, opt-out, complaint, support contact, churn — not only opens (notify-10, notify-15).
- **Regional risk** → block send if `consent_policy_version` unknown (notify-11).

### Trust metrics + event schema
Events: `notification_eligible`, `permission_prompt_shown`, `permission_result`, `notification_scheduled`, `notification_suppressed`, `notification_sent`, `notification_delivered`, `notification_opened`, `notification_dismissed`, `preference_changed`, `unsubscribe_clicked`, `conversion_after_notification`, `retention_after_notification`, `complaint_or_spam_signal`, `support_contact_after_notification`.

Required properties: `channel`, `category`, `trigger_event`, `lifecycle_state`, `dedupe_key`, `locale`, `region`, `timezone`, `quiet_hours_applied`, `consent_state`, `preference_state`, `suppression_reason`, `frequency_budget_id`, `cap_remaining`, `cooldown_until`, `digest_candidate`, `override_reason`, `suppression_decision_version`.

Guardrail KPIs (weekly): delivery + bounce by channel; opt-in rate by ask context; opt-out, unsubscribe, complaint, support-contact rate by campaign; conversion + retention lift vs holdout; notification-attributed churn and progressive permission loss; dedupe/suppression rate (avoided duplicate sends).
