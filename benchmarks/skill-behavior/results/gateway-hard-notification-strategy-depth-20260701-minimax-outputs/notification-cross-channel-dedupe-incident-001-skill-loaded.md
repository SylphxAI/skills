```text
Notification objective:
Stop duplicate/complaint-causing sends for trial-ending, renewal-reminder, failed-payment, and win-back across push/email/in-app/SMS; preserve critical billing/security signals; restore trust with fatigued cohorts.

Channels: push, email, in-app, SMS, support reply.

Lifecycle matrix:
| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Trial ending (T-72h) | expiry_imminent | Avoid surprise loss of access | email > in-app > push (opt-in only) > SMS (opt-in only) | must have marketing or lifecycle consent; suppress if paid/cancelled/support | max 1/user/lifecycle; cooldown 48h; respect quiet hours | conversion, opt-out |
| Renewal reminder | renewal_window_open | Plan ahead | email + in-app; push only if lifecycle_opt_in | suppress if auto-renew off, cancelled, paid | 1/cycle; digest if multiple | renewal rate |
| Failed payment | payment_failed | Restore access | email + in-app; push if billing_critical_opt_in; SMS only if sms_opted_in | suppress after pay/retry-success/cancel/support_ticket | 1/day, 4/incident max; 24h cooldown on open | recovery rate |
| Win-back | dormant ≥30d, prior value | Relevant return reason | email digest only; no push/SMS | suppress if unsubscribed/complaint/3x dormant | 2/month, 3/90d; never during quiet hours | reactivation, complaint |

Consent and regional control matrix:
| Channel/region | Permission timing | Required consent/preference | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push | post-value moment, never at launch | lifecycle_opt_in or category toggle | category or global | in-app + email | prompt_id, grant_time, denied_at |
| Email | on signup or after value moment | marketing_or_lifecycle flag | List-Unsubscribe header | in-app only | unsub_source, scope |
| SMS | explicit double opt-in only | sms_opted_in with STOP/HELP | STOP keyword, scope=marketing/lifecycle | email + in-app | opt-in proof, STOP audit |
| In-app | always allowed if app open | category preference | hide surface | none | render_event |
| Region: EU/UK/CA | post-purpose notice | explicit consent, policy version | one-click withdraw | suppress until re-opt | policy_version, basis |
| Region: US (transactional) | implicit for billing | separate from marketing | category-only | suppress marketing | consent_split=true |

Privacy/redaction and deep-link policy:
| Content type | Sensitive fields to exclude | Lock-screen/subject/SMS copy | Deep-link auth | Support-safe evidence |
| --- | --- | --- | --- | --- |
| Failed payment | card digits, bank, tax ID | "Payment needs attention — update to keep access" | signed token, server lookup | message_version, delivery, no payload body |
| Trial/renewal | plan price history, cohort tags | "Your trial ends in 3 days" | auth-gated | consent_state, suppression_reason |
| Win-back | inferred traits, usage details | "It's been a while — here's what's new" | auth-gated | campaign_id, opt-out audit |
| Security (excluded here) | tokens, IPs, location | generic only | short-lived auth | audit log only |

Role/severity routing:
| Audience role | Severity | Allowed channels | Escalation | Audit/owner |
| --- | --- | --- | --- | --- |
| Owner/payer (trial/renewal/billing) | P1 | email + in-app; push if opted-in; SMS if opted-in and imminent cutoff | none marketing-mixed | lifecycle + billing owners |
| Admin/owner (account security) | P0 | reliable stack, may bypass quiet hours | audit-required, expires | security on-call |
| On-call (ops incident) | P1 | desktop + email by role | no marketing | ops owner |
| End-user (win-back) | P3 | email digest only | never override | lifecycle owner |

Taxonomy and channel policy:
- failed_payment -> trigger payment_failed; email + in-app; priority high; 1/day, 4/incident; STOP on convert/cancel/support; dedupe_key payment_incident:<sub_id>:<attempt>.
- trial_ending -> T-72h email + in-app; no SMS unless opted-in and imminent; 1/lifecycle; suppress on convert/cancel; dedupe trial_expiry:<sub_id>:<date>.
- renewal_reminder -> email + in-app; 1/cycle; digest candidate; dedupe renewal:<sub_id>:<window>.
- win_back -> email digest; 2/month, 3/90d; suppress on unsubscribe/complaint/3 dormant; no push/SMS; dedupe dormant:<user_id>:<window>.
- security -> owner only; bypass quiet hours; never bundled.

Frequency and suppression budget:
- Global cap: 3 non-transactional/week, 1 non-transactional push/day; security/billing-imminent excluded.
- Category caps: trial 1/lifecycle; failed_payment 4/incident; win-back 2/month, 3/90d; renewal 1/cycle.
- Lifecycle-event cap: 1 high-priority/day/event unless user-requested exact reminder.
- Cooldowns: 48h trial non-urgent; 24h failed_payment after open; 14–30d win-back.
- Digest/quiet-hours: bundle low-urgency; respect user timezone 22:00–08:00; queue at next acceptable local time, not midnight; critical-alert opt-in only may bypass.
- Emergency override: security, safety, service continuity, imminent access loss within 24h with billing consent, user-requested exact reminders; log override_reason; never marketing/win-back/IAP.

Cross-channel dedupe and stop rules:
| Lifecycle event | Dedupe key | Priority order | Stop condition | Suppression reason | Owner |
| --- | --- | --- | --- | --- | --- |
| Failed payment | payment_incident:<sub>:<attempt> | email > in-app > push > SMS | paid, retry_ok, cancelled, support_ticket, unsub | resolved | billing |
| Trial ending | trial_expiry:<sub>:<date> | email > in-app > push > SMS | paid, cancelled, support_ticket, unsub | resolved | lifecycle |
| Renewal | renewal:<sub>:<window> | email > in-app | auto-renew off, paid, cancelled | resolved | lifecycle |
| Win-back | dormant:<user>:<window> | email digest | 3x dormant, unsub, complaint | fatigue | lifecycle |
| Cross-channel success stop | any open OR conversion on dedupe_key | — | satisfied | dedupe | lifecycle |

Preference and recovery model:
| State | Allowed action | Recovery path | Prohibited action |
| --- | --- | --- | --- |
| unknown/not_asked | in-app value preview, soft ask at value moment | preference center | launch prompt |
| platform_denied | in-app + email only | user-initiated settings help | repeat platform prompt |
| unsubscribed/complaint | suppress scope | confirm + user-initiated resubscribe | cross-channel win-back |
| granted but category off | respect toggle | per-category examples | send via other category |

Fatigue/incident readback:
| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| Trial T-7 | push+email+SMS | trial_ending+win_back | global cap exceeded, quiet-hours missed | opt-out +38pp, complaint 2.1x baseline, support +22% | pause SMS+push for cohort; email+in-app only; enforce dedupe | lifecycle |
| Paying post-failed | push+SMS | failed_payment+renewal | 4/incident, no support stop | support contacts +31%, churn +6pp | suppress on support_ticket; 1 push if billing_critical_opt_in | billing |
| Dormant 60–90d | email | win_back | 3 in 30d, no quiet hours | unsub +19pp | cap 2/30d; digest; honor tz | lifecycle |
| Region EU | SMS | trial_ending | consent missing | complaint spike | block SMS until explicit opt-in + policy_version | legal |

Recovery decision:
1. Pause all push and SMS sends for trial_ending, renewal_reminder, win_back across affected cohorts immediately; keep email + in-app with dedupe and quiet hours.
2. Cancel any scheduled send where dedupe_key indicates paid, cancelled, support_ticket, unsub, or already-opened.
3. Publish suppression list with reason, dedupe_key, and suppression_decision_version for audit and support reply.
4. High clicks do not justify duplicate sends; require dedupe_rate ≥80%, opt-out ≤baseline+5pp, complaint ≤baseline before re-enabling push/SMS.

Risks and guardrails:
- Duplicate cross-channel sends -> mandatory dedupe_key + success-stop.
- Marketing ↔ transactional conflation -> separate consent flags; no bundling.
- Quiet-hours bypass -> tz-aware scheduler; critical override only with logged reason.
- Post-conversion/support spam -> stop on paid/cancel/support_ticket; support-safe evidence.
- Permission denial churn -> in-app education; no repeated OS prompts.
- Win-back fatigue -> digest-only, scoped caps, complaint guardrail.

Events and trust metrics:
- Track: notification_eligible, scheduled, suppressed (with reason: dedupe/resolved/quiet_hours/cap/unsubscribed), sent, delivered, opened, dismissed, preference_changed, unsubscribe_clicked, conversion_after, retention_after, complaint_or_spam, support_contact_after.
- Required props: channel, category, trigger_event, lifecycle_state, dedupe_key, locale, region, timezone, quiet_hours_applied, frequency_budget_id, global_cap_remaining, category_cap_remaining, cooldown_until, override_reason, suppression_decision_version, consent_state, preference_state, unsubscribe_scope, message_version.
- Guardrails: delivery ≥98% transactional, opt-out ≤baseline+5pp per campaign, complaint ≤1.0x baseline, support_contact_after ≤budget, conversion/retention lift vs holdout, notification-attributed churn, dedupe_rate ≥80%.
```
