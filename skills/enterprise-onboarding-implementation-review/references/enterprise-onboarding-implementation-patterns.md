# Enterprise Onboarding Implementation Patterns

## Enterprise Onboarding Implementation Review state machine

```text
sold -> kickoff_complete -> discovery_complete -> implementation_plan_approved -> configured -> validated -> live -> adoption_handoff
  |           |                    |                         |              |           |
  v           v                    v                         v              v           v
 scope_gap  missing_owner      security_blocked          integration_blocked  go_live_blocked  adoption_risk
```

## Rule IDs

- `enterprise-onboarding-1` — Translate the sales promise into measurable success criteria, in-scope workflows, out-of-scope requests, and acceptance evidence.
- `enterprise-onboarding-2` — Map executive sponsor, business owner, technical owner, security/procurement contact, champion, and support path before scheduling work.
- `enterprise-onboarding-3` — Break implementation into milestones with dependencies, due dates, owners, customer actions, internal actions, and escalation thresholds.
- `enterprise-onboarding-4` — Treat SSO/SCIM, data migration, integrations, environments, permissions, and audit requirements as separate readiness tracks.
- `enterprise-onboarding-5` — Run go-live validation on real workflows, roles, data, notifications, reporting, support routes, and rollback/recovery expectations.
- `enterprise-onboarding-6` — Prepare training, admin enablement, internal launch comms, and post-live office hours before broad rollout.
- `enterprise-onboarding-7` — Move adoption ownership from implementation to customer success with usage targets, health signals, and unresolved risk register.
- `enterprise-onboarding-8` — Capture repeat blockers as product, docs, support, security, or sales qualification improvements.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Technical dependency | Make owner and due date visible | Integration/API/SSO requirements | Silent customer delay |
| Data migration | Define sample, mapping, validation, rollback | Source data and acceptance test | Bad data corrupts first impression |
| Go-live request | Gate on workflow validation | Checklist and sign-off | Launch without support readiness |
| Late stakeholder | Escalate before milestone slip | RACI and decision log | Executive surprise |
| Scope expansion | Classify as change request or backlog | Contract and success criteria | Implementation becomes custom services |

## Implementation readiness checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `implementation_kickoff_completed`, `implementation_dependency_blocked`, `sso_configured`, `data_migration_validated`, `go_live_approved`, `customer_live`, `adoption_handoff_completed`.

Recommended properties: `account_id, segment, implementation_type, owner_team, milestone, dependency_type, risk_tier, status, target_go_live_date, blocker_age_days, success_metric, customer_owner, support_case_id, decision`.
