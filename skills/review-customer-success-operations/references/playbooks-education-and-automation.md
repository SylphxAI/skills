# Playbooks, Education, and Automation

## Playbook contract

Every playbook records:

```text
playbook_id, version, segment, lifecycle_state, trigger, confidence,
customer_value, prerequisites, exclusions, steps, channels, cadence,
automation_authority, human_or_owner_authority, artifacts, success_evidence,
countermetrics, stop_and_suppression, escalation, recovery, learning_handoff
```

## Trigger decision table

| Signal | Validate before action | Useful response | Unsafe response |
| --- | --- | --- | --- |
| Setup stalled | dependency, owner, migration/support blocker | targeted unblock path | generic “need help?” spam |
| Critical workflow absent | intended cadence and role | job-specific guidance/practice | treating rare valid use as churn |
| Support severity spike | root cause and customer impact | coordinated support/product recovery | CSM reassurance without fix |
| Champion leaves | relationship and decision map | rebuild stakeholder coverage | immediate upsell outreach |
| Value disputed | agreed outcome and measurement | joint evidence review and reset | quote activity metrics as proof |
| Renewal approaching | contract truth plus outcome state | evidence-led decision plan | manufactured deadline pressure |
| Expansion signal | new outcome, authority, healthy base | validate fit and scope | sell into unresolved risk |

## Education architecture

Design by role and job, not by feature menu. Provide a short path to first useful result, production-readiness path, scenario practice, verification, searchable reference, troubleshooting, accessibility/localization, versioning, and proof of proficiency. Connect docs, product guidance, academy, office hours/community, implementation, and support without duplicating canonical facts.

Training events include assigned, started, practiced, verified, expired/stale, and outcome-linked states. Completion alone does not prove competence or value.

## Business review artifact

A QBR/EBR should contain outcome contract, evidence since last review, gaps/root causes, reliability/support/trust issues, adoption by workflow and role, agreed decisions, commitments/owners/dates, risks, and next proof. Use current canonical contract, billing, security, support, and product evidence; do not copy or embellish it.

## Automation ladder

1. observe and explain only;
2. draft internal next action;
3. automate reversible low-risk tasks and self-service guidance;
4. send bounded communications with consent, frequency, suppression, and exact approved claims;
5. escalate decisions or commitments to named authority;
6. continuously test outcomes, drift, fatigue, bias, and false alarms; degrade safely.

Automation never impersonates a known person, invents customer intent, expands commercial authority, or hides that a response is automated where disclosure matters.
