# Executive Business Review Operating System Review Patterns

## Executive Business Review Operating System Review state machine

```text
account_tiered -> review_prepared -> executives_aligned -> decisions_recorded -> actions_tracked -> renewal_signal_reviewed
       |               |                  |                    |                   |                  |
       v               v                  v                    v                   v                  v
 wrong_audience   weak_value_story    sponsor_gap        slideware_only      action_drift      renewal_surprise
```

## Rule IDs

- `ebr-os-1` — Segment accounts by strategic value, risk, renewal timing, executive access, implementation maturity, and expansion potential before setting cadence.
- `ebr-os-2` — Start from customer business outcomes and success measures, then map product adoption, usage quality, support load, and ROI evidence.
- `ebr-os-3` — Name the executive sponsor map on both sides: buyer executive, champion, admin, success owner, sales owner, product owner, and escalation owner.
- `ebr-os-4` — Separate factual performance evidence, interpretation, recommendations, asks, and commitments so the review does not become narrative theater.
- `ebr-os-5` — Route roadmap requests through a decision boundary with owner, evidence, status, alternative, and follow-up date.
- `ebr-os-6` — Capture renewal and expansion signals alongside blockers, unresolved incidents, procurement/security gaps, and adoption risks.
- `ebr-os-7` — Maintain an action register with accountable owner, due date, customer-visible next step, and escalation rule.
- `ebr-os-8` — Review program health through completion rate, action close rate, sponsor attendance, renewal surprise rate, expansion quality, and customer trust signals.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| First strategic review | Establish baseline | Goals, metrics, sponsor map | Vanity deck |
| Renewal risk | Lead with blockers | Risk register and recovery plan | Surprise churn |
| Expansion opportunity | Prove adoption first | Usage quality and ROI evidence | Premature upsell |
| Roadmap ask | Record boundary | Decision status and owner | False promise |
| Sponsor changed | Rebuild alignment | New sponsor briefing | Lost executive access |

## EBR operating checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `ebr_account_tiered`, `ebr_prepared`, `ebr_held`, `ebr_action_created`, `ebr_risk_logged`, `ebr_roadmap_ask_recorded`, `ebr_action_closed`, `ebr_renewal_signal_reviewed`.

Recommended properties: `account_id, tier, review_type, renewal_date, executive_attendees, sponsor_health, value_metric, adoption_status, risk_tier, roadmap_ask_status, action_owner, action_due_at, expansion_signal, renewal_signal, decision`.
