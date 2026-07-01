# Release Evidence Pack Patterns

## Release Evidence Pack Review state machine

```text
scope_declared -> evidence_collected -> gaps_reviewed -> approval_recorded -> release_started -> proof_verified -> pack_archived
       |                |                |                   |                 |                |
       v                v                v                   v                 v                v
 scope_drift       weak_evidence    owner_gap          approval_gap       rollback_needed archive_missing
```

## Rule IDs

- `release-evidence-1` — Define release scope, changed systems, user journeys, customer segments, risk tier, and required evidence before approval.
- `release-evidence-2` — Separate code tests, QA, migrations, performance, security, privacy, accessibility, docs, support, rollout, observability, and rollback evidence.
- `release-evidence-3` — Link evidence to durable sources: CI runs, test reports, screenshots, migration dry runs, dashboards, runbooks, tickets, and approval records.
- `release-evidence-4` — Record known risks with owner, decision, guardrail, rollback trigger, monitoring signal, and expiry.
- `release-evidence-5` — Prove feature flags, staged rollout, kill switch, rollback, data compatibility, and customer communication where relevant.
- `release-evidence-6` — Include support macros, help docs, release notes, status page posture, and customer success handoff for user-facing changes.
- `release-evidence-7` — Verify post-release behavior from customer-visible signals, not only deployment success.
- `release-evidence-8` — Archive evidence packs for audits, incidents, customer requests, and future release learning.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Migration release | Require dry-run evidence | Migration report | Data risk |
| Security-sensitive change | Add security proof | Review and test links | Unverified exposure |
| Feature flag rollout | Require guardrail metrics | Flag config and dashboard | No containment |
| Support impact | Add macros/docs | Support readiness | Ticket spike |
| Known risk | Approve only with owner | Risk record | Unowned failure |

## Release evidence checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `release_evidence_scope_declared`, `release_evidence_artifact_collected`, `release_evidence_gap_found`, `release_evidence_approved`, `release_started`, `release_post_verification_passed`, `release_evidence_pack_archived`.

Recommended properties: `release_id, change_type, risk_tier, evidence_type, evidence_url, owner_team, gate_status, known_risk, rollout_scope, rollback_status, post_verification_status, approval_status, decision`.
