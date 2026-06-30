# Sales Qualification Discovery Patterns

## Sales Qualification Discovery Review state machine

```text
lead_received -> icp_checked -> discovery_scheduled -> pain_confirmed -> decision_process_mapped -> qualified
     |              |                  |                 |                       |
     v              v                  v                 v                       v
 no_fit        nurture            no_show          weak_pain              technical_validation
```

## Rule IDs

- `sales-qualification-1` — Define ICP fit, segment, use case, pain severity, business impact, urgency trigger, and success metric before creating an opportunity.
- `sales-qualification-2` — Map economic buyer, champion, technical evaluator, legal/procurement owner, blockers, and internal decision criteria.
- `sales-qualification-3` — Separate budget existence, willingness to pay, procurement process, payment timing, and discount pressure.
- `sales-qualification-4` — Use discovery to verify current workflow, cost of inaction, alternatives, required integrations, security needs, and rollout constraints.
- `sales-qualification-5` — Require a next commitment such as stakeholder meeting, technical validation, data sample, security review, or mutual action plan.
- `sales-qualification-6` — Record disqualification reasons honestly so product, marketing, pricing, and sales learn from no-fit demand.
- `sales-qualification-7` — Escalate product gaps, legal exceptions, security claims, and implementation promises to approved owners.
- `sales-qualification-8` — Review stalled opportunities for missing pain, missing authority, unclear process, competitor lock-in, or weak champion.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Inbound lead | Check ICP and use case before discovery | Segment, role, problem statement | Wasted sales capacity |
| Strong pain, no authority | Develop champion and map buyer | Buying committee evidence | Forecasting fake deal |
| Budget unclear | Ask budget/process questions | Procurement and timing notes | Late price surprise |
| Product gap | Classify blocker vs roadmap ask | Required workflow and owner review | Unsupported promise |
| Stalled deal | Diagnose missing commitment | Last action and decision date | Pipeline zombie |

## Discovery checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `lead_qualified`, `discovery_completed`, `opportunity_disqualified`, `decision_process_mapped`, `mutual_action_plan_created`, `technical_validation_requested`, `opportunity_stalled`.

Recommended properties: `account_id, segment, source, icp_fit, pain_severity, buyer_role, decision_stage, budget_status, authority_status, next_commitment, disqualification_reason, owner_team, forecast_risk, decision`.
