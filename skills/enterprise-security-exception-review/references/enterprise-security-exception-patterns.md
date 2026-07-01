# Enterprise Security Exception Patterns

## Enterprise Security Exception Review state machine

```text
request_received -> requirement_mapped -> risk_assessed -> decision_made -> exception_tracked -> reviewed
       |                    |               |                |                    |
       v                    v               v                v                    v
 evidence_gap        standard_met      unacceptable_risk  contract_blocked   expired_exception
```

## Rule IDs

- `security-exception-1` — Map the customer ask to the exact control, policy, product capability, data class, environment, and contractual claim.
- `security-exception-2` — Separate documentation gaps, standard controls already met, configurable controls, compensating controls, product gaps, and unacceptable risk.
- `security-exception-3` — Require accountable approval, risk owner, security review, legal/commercial review when terms change, expiry, and renewal trigger.
- `security-exception-4` — Document compensating controls with evidence, operating cadence, monitoring, support impact, and customer-visible limitations.
- `security-exception-5` — Track exceptions in a register with customer, scope, data impact, control ID, owner, expiry, decision, and remediation path.
- `security-exception-6` — Reject exceptions that create cross-tenant risk, violate law/contract, bypass audit obligations, or cannot be operated reliably.
- `security-exception-7` — Convert recurring exceptions into product roadmap, trust center docs, security questionnaire answers, or platform controls.
- `security-exception-8` — Review open exceptions before renewal, expansion, audit, incident, and material architecture change.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Documentation gap | Answer with approved evidence | Trust/security artifact | Unneeded exception |
| Configurable control | Enable standard setting | Product config proof | Custom risk accepted |
| Compensating control | Approve with expiry | Control evidence and owner | Forever exception |
| Contract redline | Route legal/security review | Clause and risk memo | Unsupported commitment |
| Cross-tenant risk | Reject or redesign | Architecture impact | Shared security breach |

## Security exception checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `security_exception_requested`, `security_requirement_mapped`, `security_exception_approved`, `security_exception_rejected`, `security_compensating_control_added`, `security_exception_expired`, `security_exception_remediated`.

Recommended properties: `account_id, requirement_type, control_id, data_class, exception_type, risk_tier, compensating_control, owner_team, expiry_days, contract_impact, remediation_status, decision`.
