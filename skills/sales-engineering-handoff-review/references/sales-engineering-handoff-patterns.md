# Sales Engineering Handoff Patterns

## Sales Engineering Handoff Review state machine

```text
discovery_captured -> solution_scoped -> proof_validated -> handoff_accepted -> kickoff_completed -> outcome_reviewed
       |                  |                |                  |                  |
       v                  v                v                  v                  v
 missing_context    scope_gap       weak_proof        owner_gap          expectation_gap
```

## Rule IDs

- `se-handoff-1` — Capture customer problem, environment, stakeholders, decision process, timeline, constraints, and success criteria before solution design.
- `se-handoff-2` — Separate demo configuration, POC proof, integration work, security answer, commercial promise, and implementation task.
- `se-handoff-3` — Convert every technical promise into commitment, caveat, evidence, owner, due date, and customer-visible status.
- `se-handoff-4` — Require customer-validated success criteria before labeling a POC as passed.
- `se-handoff-5` — Keep one handoff source of record linked from CRM, kickoff docs, support notes, and implementation plan.
- `se-handoff-6` — Flag risks around data migration, identity, integrations, permissions, performance, compliance, support, and roadmap gaps.
- `se-handoff-7` — Define post-sale ownership across AE, SE, implementation, CSM, support, product, and security.
- `se-handoff-8` — Review lost handoffs to improve discovery questions, demo scripts, POC templates, and qualification.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| POC success | Require criteria evidence | Customer validation | False confidence |
| Custom integration | Scope owner and caveat | API/data map | Implementation surprise |
| Security answer | Link approved evidence | Trust source | False control claim |
| Roadmap promise | Reject or formalize | Product approval | Delivery fiction |
| Kickoff gap | Delay or escalate | Handoff completeness | Bad onboarding |

## Sales engineering handoff checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `se_discovery_captured`, `se_solution_scoped`, `se_poc_success_criteria_set`, `se_poc_validated`, `se_handoff_accepted`, `se_commitment_recorded`, `se_kickoff_completed`.

Recommended properties: `opportunity_id, account_id, stage, solution_area, success_criteria, evidence_status, commitment_type, owner_team, risk_tier, implementation_owner, handoff_status, kickoff_date, decision`.
