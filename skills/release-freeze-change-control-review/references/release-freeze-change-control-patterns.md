# Release Freeze Change Control Review Patterns

## Release Freeze Change Control Review state machine

```text
freeze_declared -> change_requested -> severity_assessed -> approval_routed -> change_monitored -> exception_retired
       |                |                  |                   |                 |                  |
       v                v                  v                   v                 v                  v
 scope_gap       shadow_change       severity_blur       authority_gap     rollback_gap       freeze_debt
```

## Rule IDs

- `freeze-control-1` — Declare freeze scope by systems, environments, customer segments, dates, allowed change classes, approvers, and communication channels.
- `freeze-control-2` — Classify change requests by severity, customer impact, security/compliance urgency, reversibility, data risk, operational burden, and deadline pressure.
- `freeze-control-3` — Require evidence for tests, rollout plan, rollback plan, monitoring, support readiness, docs/comms, and owner availability during the freeze.
- `freeze-control-4` — Map approval authority by change class: product, engineering, SRE/ops, security, compliance, support, customer success, legal, or executive sponsor.
- `freeze-control-5` — Use narrow rollout, feature flags, kill switches, customer scoping, maintenance windows, and canaries where they reduce freeze risk.
- `freeze-control-6` — Log rejected changes with reason, alternative path, next eligible release window, and customer communication if relevant.
- `freeze-control-7` — Retire exceptions through post-change verification, incident/support review, metric readback, and debt backlog creation.
- `freeze-control-8` — Analyze repeated freeze exceptions to improve planning, release trains, test coverage, staffing, architecture, or customer deadline management.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Security hotfix | Allow with authority | Patch proof and rollback | Exposure persists |
| Feature request | Defer unless critical | Customer impact evidence | Freeze erosion |
| Store deadline | Narrow scope | Review timeline and comms | Review miss |
| Infrastructure change | Require ops approval | Runbook and canary | Outage |
| Repeated exception | Create debt item | Exception history | Process decay |

## Release freeze checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `release_freeze_declared`, `release_freeze_change_requested`, `release_freeze_severity_assessed`, `release_freeze_exception_approved`, `release_freeze_exception_rejected`, `release_freeze_change_deployed`, `release_freeze_change_verified`, `release_freeze_exception_retired`.

Recommended properties: `freeze_id, change_id, system_scope, change_class, severity, risk_tier, customer_scope, approver_role, rollout_scope, rollback_status, monitoring_signal, support_ready, communication_status, exception_expiry, decision`.
