---
name: notification-strategy-review
description: Design or audit notification strategy across push, email, in-app messages, SMS, lifecycle messaging, reminders, games, SaaS, mobile apps, and desktop utilities. Use when planning permission prompts, notification taxonomy, user controls, retention campaigns, quiet hours, deliverability, fatigue, event triggers, or support-safe messaging.
---

# Notification Strategy Review

Use this skill to make notifications useful enough to deserve attention.

## Workflow

1. Identify channel, user lifecycle stage, product promise, message objective, user intent, region, consent state, preference state, content sensitivity, audience role, and fatigue risk.
2. Read `references/notification-strategy-patterns.md`.
3. Classify messages by utility, urgency, consent, lifecycle trigger, frequency, fallback channel, and failure risk.
4. Build lifecycle, consent/region, privacy/redaction, role/severity, and suppression matrices before proposing campaigns.
5. Define an explicit frequency budget: global cap, category cap, lifecycle-event cap, quiet-hours behavior, cooldown, digest threshold, and emergency override rule.
6. Define deterministic cross-channel dedupe with `dedupe_key`, channel priority, success stop condition, support/billing stop condition, stale-event expiry, and suppression reason.
7. If notifications are already causing fatigue, complaints, opt-outs, or support contacts, produce an incident readback before adding sends: cohort × channel × lifecycle event × consent state × frequency bucket × complaint/unsubscribe/support signal.
8. Design permission timing, preferences, fallback, measurement, support recovery, and experiment guardrails.
9. Produce a notification taxonomy, lifecycle journey map, channel/frequency policy, suppression rules, consent/preference model, incident/readback plan, event schema, and trust metrics.

## Guardrails

- Do not use notifications to compensate for weak product value.
- Do not mix transactional, security, marketing, and engagement consent.
- Give users controls, quiet hours, and clear unsubscribe paths.
- Do not send duplicate push/email/in-app messages for the same lifecycle event unless escalation value is explicit.
- Do not ask platform push permission before the user has seen a concrete notification value moment.
- Do not repeatedly ask after denial; use in-product education, preference-center recovery, and a user-initiated path back to OS/browser settings.
- Do not optimize opens/clicks without delivery, opt-out, unsubscribe, complaint, retention, and long-term trust guardrails.
- Do not describe fatigue management as "cap frequency" without naming concrete global, category, lifecycle-event, cooldown, and digest rules.
- Do not use emergency override for marketing, habit nudges, win-back, IAP promotions, daily rewards, energy reminders, leaderboard resets, or live-event urgency. Reserve it for security, safety, service continuity, or explicit user-requested exact reminders, and log the override reason.
- Do not continue a sequence after the user converts, cancels, pays, resolves the workflow, contacts support, unsubscribes, or complains.
- Do not expose secrets, health/finance details, precise location, private message content, or sensitive account state in lock-screen previews, push payloads, SMS bodies, or email subjects; use auth-gated deep links for details.
- Do not infer consent across channels or categories; email, SMS, push, in-app, desktop/browser, transactional, and marketing controls must stay separate.

## Output format

```text
Notification objective:
Channels:

Lifecycle matrix:
| Lifecycle state | Trigger | User value | Channel priority | Consent/preference state | Frequency/suppression | Metric |
| --- | --- | --- | --- | --- | --- | --- |

Consent and regional control matrix:
| Channel/region | Permission timing | Required consent/preference | Unsubscribe/opt-out | Fallback if denied | Evidence |
| --- | --- | --- | --- | --- | --- |

Privacy/redaction and deep-link policy:
| Content type | Sensitive fields to exclude | Lock-screen/subject/SMS copy | Deep-link auth | Support-safe evidence |
| --- | --- | --- | --- | --- |

Role/severity routing:
| Audience role | Severity | Allowed channels | Escalation | Audit/owner |
| --- | --- | --- | --- | --- |

Taxonomy and channel policy:
- <message type> -> trigger, user value, channel, priority, frequency, control, suppression/dedupe rule

Frequency and suppression budget:
- Global cap:
- Category caps:
- Lifecycle-event cap:
- Cooldowns:
- Digest/quiet-hours rules:
- Emergency override:

Cross-channel dedupe and stop rules:
| Lifecycle event | Dedupe key | Priority order | Stop condition | Suppression reason | Owner |
| --- | --- | --- | --- | --- | --- |

Preference and recovery model:
| Consent/preference state | Allowed action | Recovery path | Prohibited action | Evidence |
| --- | --- | --- | --- | --- |

Fatigue/incident readback, when applicable:
| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |

Risks and guardrails:
- <risk> -> <guardrail>

Events and trust metrics:
- <event> with channel, category, trigger_event, consent_state, preference_state, suppression_reason, dedupe_key, delivered/opened/dismissed/unsubscribed/complaint/retention outcome
```
