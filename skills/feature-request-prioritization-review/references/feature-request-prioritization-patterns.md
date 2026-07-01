# Feature Request Prioritization Patterns

## Feature Request Prioritization Review state machine

```text
request_received -> normalized -> clustered -> scored -> decision_made -> communicated
       |              |           |        |                |
       v              v           v        v                v
 duplicate       evidence_gap  bug_route strategic_review  revisit_scheduled
```

## Rule IDs

- `feature-request-1` — Normalize requests into user/job/problem, not proposed solution alone.
- `feature-request-2` — Capture source, segment, persona, workflow, frequency, severity, revenue/retention risk, workaround, evidence quality, and customer examples.
- `feature-request-3` — Cluster duplicates and related problems across support, sales, CS, research, analytics, reviews, and community.
- `feature-request-4` — Separate bugs, UX confusion, compliance/security needs, integrations, package gaps, enhancements, and strategic bets.
- `feature-request-5` — Score impact, confidence, effort, risk, dependency, strategy fit, support burden, and learning value.
- `feature-request-6` — Assign decision owner, status, rationale, revisit trigger, and communication owner.
- `feature-request-7` — Close the loop with requesters using approved language that avoids false roadmap commitments.
- `feature-request-8` — Review prioritization bias from enterprise logos, internal politics, noisy channels, and underrepresented segments.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Large customer ask | Score evidence and strategy fit | ARR plus segment/job evidence | Logo-driven roadmap |
| Many tickets | Cluster and identify root problem | Ticket taxonomy and frequency | Patch symptoms |
| Compliance blocker | Route elevated review | Legal/security requirement | Missed deal or risk |
| Low-confidence idea | Run discovery/experiment | Evidence gap | Premature build |
| Rejected request | Explain rationale and alternative | Decision record | Trust damage |

## Feature request checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `feature_request_received`, `feature_request_clustered`, `feature_request_scored`, `feature_request_decision_made`, `feature_request_committed`, `feature_request_rejected`, `feature_request_revisit_scheduled`.

Recommended properties: `request_id, source_type, segment, persona, product_area, request_type, evidence_count, impact_score, confidence_score, effort_score, risk_score, decision_status, owner_team, decision`.
