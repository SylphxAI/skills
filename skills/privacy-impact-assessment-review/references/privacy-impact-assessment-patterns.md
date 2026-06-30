# Privacy Impact Assessment Patterns

## Privacy Impact Assessment Review state machine

```text
feature_proposed -> data_mapped -> risk_classified -> mitigation_defined -> owner_approved -> launched -> reviewed
       |               |                 |                    |                 |
       v               v                 v                    v                 v
 no_purpose      data_gap         high_risk_review     mitigation_missing   launch_blocked
```

## Rule IDs

- `privacy-impact-1` — Map data subject, data field, source, purpose, legal basis, retention, sharing, vendor, region, security control, and user control.
- `privacy-impact-2` — Apply minimization: delete fields, reduce precision, aggregate, pseudonymize, anonymize, or process locally where possible.
- `privacy-impact-3` — Check notice, consent/preference, opt-out, DSAR, deletion, portability, correction, and support workflows.
- `privacy-impact-4` — Elevate AI/profiling, automated decisions, sensitive data, children, employees, regulated domains, cross-border transfers, and large-scale monitoring.
- `privacy-impact-5` — Review vendors/subprocessors for contract, security, retention, region, data use restrictions, and incident notification.
- `privacy-impact-6` — Define privacy risks by likelihood, severity, affected users, reversibility, transparency, and mitigation evidence.
- `privacy-impact-7` — Gate launch on owner approval, policy copy, security controls, retention jobs, access limits, telemetry review, and support readiness.
- `privacy-impact-8` — Reopen the PIA when purpose, data fields, vendors, model use, retention, region, or user population changes.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| New data field | Justify purpose or remove | Purpose and user value | Over-collection |
| AI profiling | Elevate review and explainability | Model use and impact | Opaque user harm |
| Vendor processing | Check contract and retention | DPA/subprocessor evidence | Unauthorized reuse |
| Cross-border transfer | Document basis and safeguards | Region/data map | Regulatory breach |
| Feature change | Reopen PIA | Changed purpose or data | Stale privacy record |

## PIA checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `privacy_assessment_started`, `privacy_data_map_completed`, `privacy_risk_classified`, `privacy_mitigation_added`, `privacy_launch_blocked`, `privacy_owner_approved`, `privacy_assessment_reopened`.

Recommended properties: `feature, data_class, data_subject, purpose, legal_basis, vendor, region, risk_tier, mitigation_status, retention_days, user_control, owner_team, launch_gate, decision`.
