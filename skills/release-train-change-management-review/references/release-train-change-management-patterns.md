# Release Train Change Management Patterns

## Release train state machine

```text
change_proposed -> risk_classified -> train_scheduled -> readiness_checked -> release_cut -> staged_rollout -> monitored -> closed
       |                 |                 |                    |              |                 |             |
       v                 v                 v                    v              v                 v             v
 rejected          special_gate_needed  dependency_blocked  gate_failed   rollback_ready   rollout_paused postmortem_needed
```

## Rule IDs

- `release-train-1` — Classify change risk: routine, experiment, migration, billing, auth, security, API contract, infra, content/event, or emergency.
- `release-train-2` — Each train needs owner, calendar, scope, cutoff, freeze rules, dependency map, and release notes owner.
- `release-train-3` — High-risk changes need explicit rollback, staged rollout, monitoring, support brief, and customer communication.
- `release-train-4` — Public API/SDK changes need versioning, changelog, migration window, and developer outreach.
- `release-train-5` — Store/mobile/desktop releases need review lead time, phased rollout, crash monitoring, and rollback constraints.
- `release-train-6` — Games/live events need economy, fairness, time-zone, community, and compensation guardrails.
- `release-train-7` — Freeze exceptions need reason, expiry, approver, risk owner, and customer-impact note.
- `release-train-8` — Release health should use product, support, reliability, conversion, billing, and trust guardrails.
- `release-train-9` — Post-release review should close follow-up actions and retire temporary flags/docs.
- `release-train-10` — Emergency fixes still need audit trail and retrospective quality loop.

## Decision table

| Change type | Gate | Rollout | Communication |
| --- | --- | --- | --- |
| UI polish | Standard QA and metrics | Normal train | Changelog if user-visible |
| Billing migration | Reconciliation and rollback proof | Flagged staged rollout | Support brief and customer notice if impacted |
| Public API change | Version contract and migration docs | Parallel version window | Developer changelog and outreach |
| Mobile app release | Store review and crash guardrails | Phased release | Release notes and support known issues |
| Emergency security fix | Incident command | Fast patch with monitoring | Targeted disclosure path |

## Release checklist

- Change inventory and risk class are complete.
- Dependencies, freeze windows, and exception owners are explicit.
- Readiness gates cover tests, docs, support, metrics, rollback, and comms.
- Rollout stages and stop/rollback criteria are defined.
- Release notes and support known-issue docs are ready.
- Post-release review closes cleanup and incidents.

## Event schema

Track: `change_proposed`, `change_risk_classified`, `release_train_scheduled`, `release_readiness_failed`, `release_cut`, `release_rollout_started`, `release_guardrail_triggered`, `release_rolled_back`, `release_closed`.

Recommended properties: `release_id`, `change_type`, `risk_class`, `owner_team`, `surface`, `dependency_count`, `freeze_exception`, `rollout_stage`, `guardrail`, `rollback_available`, `support_brief_ready`, `customer_comms_required`, `outcome`.
