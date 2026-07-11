---
name: notification-strategy-review
description: Design or audit notification strategy across push, email, in-app messages, SMS, lifecycle messaging, reminders, games, SaaS, mobile apps, and desktop utilities. Use when planning permission prompts, notification taxonomy, user controls, retention campaigns, quiet hours, deliverability, fatigue, event triggers, or support-safe messaging.
---

# Notification Strategy Review

Use this skill to make notifications useful enough to deserve attention.

## Atomic boundary

Own one cross-channel Notification Policy artifact: taxonomy, user value,
permission/consent/preferences, channel priority, frequency/fatigue,
suppression/dedupe, privacy/redaction, deliverability, event schema, incident
readback, and measurement. Do not own the whole retention strategy, one offer,
one daily loop, or provider implementation.

Begin with the [shared product artifact envelope](references/product-artifact-envelope.schema.json)
and consume sibling artifacts by ID/version/digest.

## Agent-first invariant

Construct all provider adapters, preference states, region/age modes, templates,
dedupe, caps, quiet hours, deliverability, observability, support, and kill
switches now. Separate construction from send authority. A dormant channel
initializes no SDK, requests no permission, collects no identifier, and sends no
message. Unknown/stale authority disables the affected send.

## Workflow

1. Identify channel, user lifecycle stage, product promise, message objective, user intent, region, consent state, preference state, content sensitivity, audience role, and fatigue risk.
2. Read `references/notification-strategy-patterns.md`.
3. Classify messages by utility, urgency, consent, lifecycle trigger, frequency, fallback channel, and failure risk.
4. Build lifecycle, consent/region, privacy/redaction, role/severity, and suppression matrices before proposing campaigns.
5. Define an explicit frequency budget: global cap, category cap, lifecycle-event cap, quiet-hours behavior, cooldown, digest threshold, and emergency override rule.
6. Define deterministic cross-channel dedupe with `dedupe_key`, channel priority, success stop condition, support/billing stop condition, stale-event expiry, and suppression reason.
7. If notifications are already causing fatigue, complaints, opt-outs, or support contacts, produce an incident readback before adding sends: cohort × channel × lifecycle event × consent state × frequency bucket × complaint/unsubscribe/support signal.
8. Design permission timing, preferences, fallback, measurement, support recovery, and experiment guardrails.
9. Define withdrawal before activation: stop new eligibility, cancel queued or
   provider-scheduled sends where supported, expire all remaining work, drain
   callbacks, reconcile provider/internal state, and prove observed zero-send.
10. Produce a notification taxonomy, lifecycle journey map, channel/frequency policy, suppression rules, consent/preference model, incident/readback plan, event schema, and trust metrics.

## When not to use

- Use `daily-reward-and-streak-review` when the primary artifact is the return
  loop state machine; notifications are only its delivery intent.
- Use `promotion-campaign-review` for one offer/event audience, economics,
  fulfillment, and rollback system.
- Use `marketing-automation-blueprint` for the whole multi-channel acquisition,
  lifecycle, creative, spend, attribution, and shutdown control plane.
- Use `app-design-blueprint` or `game-design-blueprint` when notification
  semantics depend on unresolved whole-product value and progression.

## Source verification

Retrieve current push/browser/email/SMS/desktop platform, consent, marketing,
transactional/security, child/age, privacy, sensitive-content, unsubscribe,
sender/deliverability, and territory authority at execution. Static text is a
route, not a compliance verdict.

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
- Do not call a channel dormant merely because new scheduling stopped. Cancel
  provider queues, expire uncancellable work, suppress retries/fallbacks,
  reconcile delivery callbacks, and observe zero sends through the bounded
  drain window.

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

Provider withdrawal and drain:
| Channel/provider | Stop-new authority | Queued/scheduled cancellation | Expiry/dead-letter | Callback reconciliation | Zero-send observation | Owner |
| --- | --- | --- | --- | --- | --- | --- |

Withdrawal state:
- active -> withdrawing -> provider_cancelled_or_expired -> callbacks_reconciled -> observed_zero_send -> dormant
- <failure/timeout> -> quarantined, owner, evidence, recovery action

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

## Completion check

Complete only when every lifecycle event has value, authority, priority,
dedupe/suppression, privacy, cap, stop, degradation, support, metric, and owner;
denial/opt-out and emergency override are tested; and all channels can be
disabled without a client release, with provider queues drained or expired and
observed zero-send readback.
