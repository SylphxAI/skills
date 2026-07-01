# Customer Success Playbook Patterns

## Customer Success Playbook Review state machine

```text
account_segmented -> trigger_detected -> playbook_started -> action_completed -> outcome_measured -> playbook_retired
       |                  |                  |                  |                  |
       v                  v                  v                  v                  v
 wrong_segment     false_signal       owner_missing      escalation_needed  no_impact
```

## Rule IDs

- `cs-playbook-1` — Define segment, lifecycle stage, desired customer outcome, leading indicators, lagging indicators, owner, and entry/exit criteria.
- `cs-playbook-2` — Separate onboarding, adoption, risk recovery, QBR, renewal, expansion, champion-change, and escalation playbooks.
- `cs-playbook-3` — Use triggers from product usage, support cases, NPS/CSAT, incidents, billing, executive change, renewal date, and feature adoption.
- `cs-playbook-4` — Specify customer touchpoints, internal tasks, collateral, success metrics, escalation paths, and handoff requirements.
- `cs-playbook-5` — Route recurring blockers to product, onboarding, docs, support, training, pricing, or implementation improvements.
- `cs-playbook-6` — Measure playbook impact on activation, adoption, retention, expansion, support load, health recovery, and customer value proof.
- `cs-playbook-7` — Review false positives, CSM workload, account coverage, automation quality, and customer experience.
- `cs-playbook-8` — Retire or revise playbooks that do not change outcomes or duplicate another lifecycle motion.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Low adoption | Run adoption playbook | Usage milestone gaps | Renewal surprise |
| Champion leaves | Rebuild stakeholder map | Relationship and org-change signal | Lost internal sponsor |
| QBR due | Lead with value and risks | Outcome evidence | Salesy meeting |
| Support spike | Coordinate support/product | Case cluster and severity | CS without fix path |
| Expansion signal | Check health before offer | Value proof and white space | Upsell into risk |

## Customer success checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `cs_playbook_triggered`, `cs_playbook_started`, `cs_task_completed`, `cs_escalation_opened`, `cs_health_score_changed`, `cs_playbook_outcome_recorded`, `cs_playbook_retired`.

Recommended properties: `account_id, segment, lifecycle_stage, playbook_type, trigger_source, health_score, renewal_days, owner_team, risk_reason, touchpoint_type, outcome_metric, escalation_status, decision`.
