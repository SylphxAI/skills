# Risk Register Governance Patterns

## Risk state machine

```text
risk_identified -> triaged -> owner_assigned -> control_mapped -> mitigation_planned -> monitored -> reviewed -> closed
       |              |              |                  |                    |             |           |
       v              v              v                  v                    v             v           v
 duplicate       out_of_scope    owner_missing     evidence_missing      accepted      escalated   expired_review
```

## Rule IDs

- `risk-register-1` — Separate risk, assumption, issue, incident, dependency, and decision.
- `risk-register-2` — Score severity, likelihood, detectability, time horizon, and reversibility; use the score to change action.
- `risk-register-3` — Every material risk needs owner, mitigation, control evidence, trigger, review date, and residual risk.
- `risk-register-4` — Acceptance requires authority, rationale, expiry, and customer/business impact note.
- `risk-register-5` — Include product, market, technical, operational, privacy/security, legal, trust/safety, AI, revenue, and support domains.
- `risk-register-6` — Link risks to roadmap decisions, experiments, launch gates, support runbooks, and incident reviews.
- `risk-register-7` — Escalate when risk crosses severity threshold, review expires, mitigation misses, or assumption is falsified.
- `risk-register-8` — Avoid vanity registers; stale or unowned risk entries should block launch readiness claims.
- `risk-register-9` — Evidence can be test, metric, audit, customer proof, contract clause, runbook, dashboard, or eval result.
- `risk-register-10` — Review cadence should match volatility and blast radius.

## Decision table

| Risk state | Action | Required evidence | Owner |
| --- | --- | --- | --- |
| High severity, no control | Block launch or reduce scope | Mitigation plan and control proof | Accountable decision owner |
| Medium risk, reversible | Ship with monitoring | Guardrail metric and rollback | Feature owner |
| Accepted risk | Record acceptance | Rationale, expiry, residual impact | Authorized owner |
| Expired review | Re-triage | Current metric/customer impact | Risk owner |
| Falsified assumption | Reopen decision | Evidence and options | Decision owner |

## Governance checklist

- Risk domains and scoring dimensions are explicit.
- Owners, controls, evidence, mitigations, and review dates exist.
- Accepted risks have authority and expiry.
- Register links to roadmap, launch gates, incidents, and support.
- Stale/unowned risks trigger escalation.
- Review cadence is realistic for blast radius.

## Event schema

Track: `risk_identified`, `risk_triaged`, `risk_owner_assigned`, `risk_mitigation_updated`, `risk_control_verified`, `risk_accepted`, `risk_escalated`, `risk_review_expired`, `risk_closed`.

Recommended properties: `risk_id`, `domain`, `severity`, `likelihood`, `detectability`, `reversibility`, `owner_team`, `control_type`, `evidence_type`, `review_date`, `accepted_by`, `residual_risk`, `linked_decision`, `outcome`.
