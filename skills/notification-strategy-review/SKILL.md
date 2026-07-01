---
name: notification-strategy-review
description: Design or audit notification strategy across push, email, in-app messages, SMS, lifecycle messaging, reminders, games, SaaS, mobile apps, and desktop utilities. Use when planning permission prompts, notification taxonomy, user controls, retention campaigns, quiet hours, deliverability, fatigue, event triggers, or support-safe messaging.
---

# Notification Strategy Review

Use this skill to make notifications useful enough to deserve attention.

## Workflow

1. Identify channel, user lifecycle stage, product promise, message objective, user intent, region, consent state, preference state, and fatigue risk.
2. Read `references/notification-strategy-patterns.md`.
3. Classify messages by utility, urgency, consent, lifecycle trigger, frequency, fallback channel, and failure risk.
4. Build lifecycle, consent/region, and suppression matrices before proposing campaigns.
5. Design permission timing, preferences, fallback, measurement, support recovery, and experiment guardrails.
6. Produce a notification taxonomy, lifecycle journey map, channel/frequency policy, suppression rules, consent/preference model, event schema, and trust metrics.

## Guardrails

- Do not use notifications to compensate for weak product value.
- Do not mix transactional, security, marketing, and engagement consent.
- Give users controls, quiet hours, and clear unsubscribe paths.
- Do not send duplicate push/email/in-app messages for the same lifecycle event unless escalation value is explicit.
- Do not ask platform push permission before the user has seen a concrete notification value moment.
- Do not optimize opens/clicks without delivery, opt-out, unsubscribe, complaint, retention, and long-term trust guardrails.

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

Taxonomy and channel policy:
- <message type> -> trigger, user value, channel, priority, frequency, control, suppression/dedupe rule

Risks and guardrails:
- <risk> -> <guardrail>

Events and trust metrics:
- <event> with channel, category, trigger_event, consent_state, preference_state, suppression_reason, dedupe_key, delivered/opened/dismissed/unsubscribed/complaint/retention outcome
```
