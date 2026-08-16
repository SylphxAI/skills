---
name: review-notification-strategy
description: "Review notification strategy and produce one actionable assessment."
---

# Review Notification Strategy

Use this skill to make notifications useful enough to deserve attention.

## Scope

Own one cross-channel Notification Policy artifact: taxonomy, user value,
permission/consent/preferences, channel priority, frequency/fatigue,
suppression/dedupe, privacy/redaction, deliverability, event schema, incident
readback, and measurement. Retention strategy, each offer, each daily loop, and
provider implementations remain with their owning artifacts.

Name the draft and its revision, then consume sibling decisions by owner and explicit
contract. Let deterministic delivery tooling seal serialized versions and
digests later; use owner-supplied identifiers during design.

## Operating model

Construct the complete policy and the provider adapters, preference states,
region/age modes, templates, dedupe, caps, quiet hours, deliverability,
observability, support, and kill switches for every selected/applicable channel
now. Build adapters only for declared channels and providers. Separate
construction from send authority. A dormant channel initializes no SDK,
requests no permission, collects no identifier, and sends no message.
Unknown/stale authority disables the affected send.

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

## Current sources

Retrieve current push/browser/email/SMS/desktop platform, consent, marketing,
transactional/security, child/age, privacy, sensitive-content, unsubscribe,
sender/deliverability, and territory authority at execution. Static text is a
route, not a compliance verdict.

## Principles

- Notifications carry product value. Weak product value is a product job.
- Transactional, security, marketing, and engagement consent stay separate.
- Users get controls, quiet hours, and a clear unsubscribe path.
- One lifecycle event gets one message unless escalation value is named.
- Platform push permission follows a concrete value moment the user has seen.
- After denial, recovery is in-product education, the preference center, and a user-initiated path to OS/browser settings.
- Optimize with delivery, opt-out, unsubscribe, complaint, retention, and trust alongside opens and clicks.
- Fatigue management names global, category, lifecycle-event, cooldown, and digest rules.
- Emergency override is for security, safety, service continuity, or explicit user-requested exact reminders, with a logged reason.
- Sequences stop after convert, cancel, pay, resolve, support contact, unsubscribe, or complaint.
- Lock-screen previews, push payloads, SMS bodies, and email subjects stay free of secrets, health/finance detail, precise location, private message content, and sensitive account state. Details live behind auth-gated deep links.
- Consent is per channel and category.
- Dormant means provider queues cancelled, uncancellable work expired, retries suppressed, callbacks reconciled, and zero sends through the drain window.

## Output

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
| Consent/preference state | Allowed action | Recovery path | Policy constraint | Evidence |
| --- | --- | --- | --- | --- |

Fatigue/incident readback, when applicable:
| Cohort | Channel | Lifecycle event | Frequency bucket | Harm signal | Decision | Owner |
| --- | --- | --- | --- | --- | --- | --- |

Risks and guardrails:
- <risk> -> <guardrail>

Events and trust metrics:
- <event> with channel, category, trigger_event, consent_state, preference_state, suppression_reason, dedupe_key, delivered/opened/dismissed/unsubscribed/complaint/retention outcome
```

## Done

Complete only when every lifecycle event has value, authority, priority,
dedupe/suppression, privacy, cap, stop, degradation, support, metric, and owner;
denial/opt-out and emergency override are tested; and all channels can be
disabled without a client release, with provider queues drained or expired and
observed zero-send readback.
