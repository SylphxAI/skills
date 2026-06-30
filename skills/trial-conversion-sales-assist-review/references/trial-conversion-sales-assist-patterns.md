# Trial Conversion Sales Assist Patterns

## Trial Conversion Sales Assist Review state machine

```text
trial_started -> activation_checked -> fit_scored -> intent_detected -> routed -> conversion_action -> outcome_measured
      |                  |             |               |          |                    |
      v                  v             v               v          v                    v
 not_activated      low_fit       no_intent       suppress    extension_needed    churn_or_refund
```

## Rule IDs

- `trial-conversion-1` — Define activation milestones, PQL score, firmographic fit, account aggregation, role, usage depth, collaboration, integration setup, and buying intent signals.
- `trial-conversion-2` — Separate self-serve upgrade, product-led sales assist, enterprise routing, customer-success help, nurture, trial extension, and disqualification.
- `trial-conversion-3` — Use outreach triggers that help users reach value: setup help, template, demo, procurement pack, admin invite, integration support, or pricing clarity.
- `trial-conversion-4` — Suppress outreach for low fit, no consent, existing owner conflicts, recent support frustration, abuse signals, or user preference limits.
- `trial-conversion-5` — Measure activation, conversion, sales accepted rate, time-to-value, paid retention, refund rate, support load, complaint rate, and experiment guardrails.
- `trial-conversion-6` — Coordinate in-product prompts, lifecycle email, sales tasks, support macros, pricing page, and CRM state.
- `trial-conversion-7` — Define extension rules by value progress, blocker type, procurement timing, and support/implementation need.
- `trial-conversion-8` — Feed lost/expired trial reasons into onboarding, pricing, docs, product education, and sales qualification.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Activated self-serve user | Show upgrade path, not sales spam | Activation and plan fit | Unwanted outreach |
| High-fit account intent | Route to sales assist | PQL and firmographics | Missed enterprise deal |
| Blocked setup | Offer help or extension | Blocker and support signal | Trial expires before value |
| Low fit/no consent | Suppress and nurture safely | Consent and fit score | Spam/privacy risk |
| Conversion experiment | Track quality guardrails | Paid retention/refunds/support | Low-quality paid users |

## Trial conversion checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `trial_started`, `trial_activation_milestone_reached`, `pql_score_updated`, `trial_sales_assist_routed`, `trial_upgrade_prompt_shown`, `trial_extension_granted`, `trial_converted_paid`, `trial_expired`.

Recommended properties: `user_id, account_id, segment, plan, activation_score, pql_score, firmographic_fit, intent_signal, routing_path, consent_state, suppression_reason, trial_day, conversion_outcome, decision`.
