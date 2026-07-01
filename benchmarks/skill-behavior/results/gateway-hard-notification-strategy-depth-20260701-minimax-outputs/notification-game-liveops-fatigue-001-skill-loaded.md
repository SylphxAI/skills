```text
Notification objective:
Protect retention, trust, and event revenue for a global mobile game by sending only messages that earn attention; respect minors, quiet hours, consent, and fatigue budgets across push, in-app, email, and SMS.

Channels:
Push (iOS/Android), in-app inbox + banners, email (transactional + lifecycle), SMS (only for opted-in billing/security), system critical alerts (iOS Critical Alerts only for genuine security).

Lifecycle matrix:
| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |
| Onboarding | First core-loop completion | Learn what notifications enable | In-app soft ask → platform push | not_asked/soft_asked | 1 ask after value moment; suppress on deny | opt-in rate by ask context |
| Daily streak | Streak at risk (local timezone) | Save progress user built | Push if granted → in-app → email digest | granted+category on | 1/day; cooldown 20h; digest after 2 skipped | streak retention |
| Energy full | Energy at cap, idle ≥X min | Use or bank it | In-app first; push only if habit-enabled | granted+habit on | 1/day; quiet-hours defer; suppress if collected | session return rate |
| Guild raid | Invite or war start | Coordinate with friends | Push (granted) → in-app | guild opt-in | 2/raid; dedupe by raid_id | raid participation |
| Limited-time event | T-24h, T-2h, T-10m to close | Don't miss declared goal | Push (granted, low fatigue) → in-app → email | event category on | T-24h, T-2h, T-10m; never bypass quiet hours unless user-requested | event conversion |
| Friend gift | Gift available or sent | Friendly reciprocity | In-app + optional push | social opt-in | 1/day; suppress after open | gifting engagement |
| IAP promotion | Qualified offer window | Relevant value, not spam | Email > in-app; push only explicit | marketing opt-in | ≤2/week; ≤2/month; never to unsubscribed | ARPDAU lift vs holdout |
| Refund/support | User-initiated or system action | Resolve issue | Email (transactional) + in-app ticket | transactional | Stop after resolve; never bundle marketing | CSAT, time-to-resolve |
| Reactivation | Dormant ≥14d with prior value | Honest reason to return | Email > in-app; push only if lifecycle-opted | dormant segment | ≤2/month; ≤3/90d; stop on open or unsubscribe | 30-day return rate |

Consent and regional control matrix:
| Channel/region | Permission timing | Required consent | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |
| Push (global) | After first core-loop win | push_granted + category toggles | OS settings + in-game prefs | In-app inbox + email | permission_audit, age_flag |
| Email (global) | Account creation, double opt-in (EU/UK/CA minors gated) | email_subscribed + per-category | List-Unsubscribe header | In-app only | consent_policy_version |
| SMS | Only after explicit numeric opt-in; never for marketing in minors-region | sms_opted_in + age gate ≥18 (or regional rule) | STOP/HELP keywords | Email + in-app | sms_opt_in_log |
| In-app inbox | Always available | in_app_allowed | per-category toggles | None needed | category_pref |
| Minors (COPPA/GDPR-K/UK Age) | No marketing push/email; transactional only with guardian pathway | guardian_consent where required | guardian channel | In-app + parent email | age_verification_record |

Privacy/redaction and deep-link policy:
| Content type | Sensitive fields excluded | Lock-screen/subject/SMS copy | Deep-link auth | Support-safe evidence |
| --- | --- | --- | --- | --- |
| Energy/streak | balances, purchase history | "Your energy is full" + action | auth-gated deep link | dedupe_key, version |
| IAP/offer | price tiers tied to user wallet | generic offer title, no wallet numbers | auth-gated shop | campaign_id, eligibility |
| Guild raid | member list, scores | "Raid starting soon" | auth-gated raid | raid_id |
| Refund/support | card, ID, dispute text | "Refund updated" | auth-gated ticket | ticket_id, status only |
| Security | device, IP, token | generic alert | auth-gated session review | incident_id |

Role/severity routing:
| Audience role | Severity | Allowed channels | Escalation | Audit/owner |
| --- | --- | --- | --- | --- |
| Player | P2 utility (energy, streak, gift) | push (granted) → in-app | digest after cap | lifecycle owner |
| Player | P3 marketing | in-app/email; push if low-fatigue | none | growth owner |
| Guild leader/member | P1 raid coordination | push (granted) → in-app | 2/raid max | social owner |
| Account owner | P0 security/chargeback | email + in-app + optional SMS if opted-in | support escalation | trust & safety |
| Minors | All | in-app only; parent email for billing | guardian path | legal/compliance |

Taxonomy and channel policy:
- Energy-full → cap trigger, push if habit-enabled else in-app, P2, 1/day, dedupe by energy_cap_day.
- Daily streak → T-2h local, push (granted) → in-app, P2, 1/day, cooldown 20h, suppress after collect.
- Guild raid → raid_created/raid_ending, push+in-app, P1, 2/raid, dedupe raid_id.
- Event ending → T-24h/T-2h/T-10m, push (granted) → in-app, P2, 3/event, never emergency override for marketing urgency.
- Friend gift → gift_available/received, in-app + push optional, P2, 1/day, dedupe gift_window.
- IAP promotion → qualified offer, email>in-app, P3, ≤2/week, ≤2/month, suppress post-purchase/cap.
- Refund/support → ticket event, email (transactional), in-app, P0/P1 factual, stop after resolve.
- Reactivation → dormant ≥14d, email>in-app, P3, ≤2/month, ≤3/90d, stop on open/unsubscribe.

Frequency and suppression budget:
- Global cap: ≤3 non-transactional/day, ≤1 non-transactional push/day, ≤3 push/week, unless user-requested reminder.
- Category caps: utility 2/day; marketing 2/month; reactivation 3/90d; security/billing event-based.
- Lifecycle-event cap: streak 1/day, energy 1/day, raid 2/raid, event 3/event.
- Cooldowns: utility 20h; marketing 14d; reactivation 14d between sends.
- Digest/quiet hours: local timezone quiet hours 22:00–08:00; low-urgency queued to wake time, never 00:00; digest when ≥2 nudges compete.
- Emergency override: security, account-takeover, service continuity, user-requested exact reminders only. Marketing, energy, streak, IAP, leaderboard resets, live-event urgency NEVER override.

Cross-channel dedupe and stop rules:
| Lifecycle event | Dedupe key | Priority order | Stop condition | Suppression reason | Owner |
| --- | --- | --- | --- | --- | --- |
| Streak | streak:<uid>:<day> | push → in-app → email digest | collected, expired, opted-out | dedupe/consent/cooldown | lifecycle |
| Energy | energy_cap:<uid>:<day> | in-app → push → digest | collected, converted, denied | cooldown/quiet_hours | lifecycle |
| Raid | raid:<raid_id> | push → in-app | joined, ended, completed | dedupe | social |
| Event end | event:<event_id>:<phase> | push → in-app → email digest | purchased, ended, opted-out | cap_hit | growth |
| IAP offer | offer:<offer_id>:<uid> | email → in-app | purchased, refunded, opted-out | consent/cap | monetization |
| Reactivation | react:<uid>:<cohort> | email → in-app | opened, unsubscribed, returned | cap/dedupe | growth |

Preference and recovery model:
| State | Allowed action | Recovery path | Prohibited action |
| --- | --- | --- | --- |
| push unknown | educate in-product | soft ask after value moment | first-launch generic prompt |
| push denied | in-app + email fallback | user-initiated settings entry | repeat platform prompts |
| category off | respect toggle | preference center with examples | send via other category |
| unsubscribed/complaint | stop that scope | confirmation; resubscribe user-initiated | cross-channel win-back |
| minor | transactional + in-app only | guardian channel | marketing push/email/SMS |

Fatigue/incident readback, when applicable:
| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| New D1–D7 | push | onboarding/streak | global_cap | opt-out > +3pp vs holdout | digest + reduce cap | lifecycle |
| Minors | push/email | any marketing | category_cap | complaint above baseline | full suppression | legal |
| Dormant | email | reactivation | cap_3/90d | unsubscribe spike | pause cohort 30d | growth |
| Event buyers | push | event ending | lifecycle_cap | muting category | switch to in-app | growth |

Risks and guardrails:
- Minors receiving marketing → guardian pathway + transactional-only routing.
- Quiet-hour bypass for "limited-time urgency" → forbidden; use local-time event countdowns instead.
- IAP fatigue → ≤2/month cap, suppress post-purchase, never emergency override.
- Energy/streak spam → 1/day caps, cooldown, digest fallback, in-app-first default.
- Cross-channel duplication → deterministic dedupe_key per lifecycle event; success stop on open/convert/pay.
- Permission denial → in-product education + user-initiated settings; no repeated prompts.
- Sensitive payloads in lock-screen/SMS → redacted titles, auth-gated deep links.

Events and trust metrics:
Track per send: channel, category, trigger_event, lifecycle_state, dedupe_key, locale, region, timezone, quiet_hours_applied, frequency_bucket (global/category/lifecycle_event remaining), priority, consent_state, preference_state, suppression_reason, unsubscribe_scope, delivery_status, message_version, override_reason, suppression_decision_version.
Guardrails: delivery + bounce by channel; opt-in by ask context; opt-out, unsubscribe, complaint/spam, support-contact by campaign; conversion and retention lift vs holdout; notification-attributed churn, uninstall, progressive permission loss; dedupe/suppression rate.
```
