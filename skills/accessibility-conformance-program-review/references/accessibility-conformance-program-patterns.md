# Accessibility Conformance Program Patterns

## Accessibility Conformance Program state machine

```text
scope_defined -> standard_selected -> audit_run -> issues_triaged -> remediation_started -> release_gated -> evidence_updated -> reviewed
       |                   |           |                |                    |               |                |
       v                   v           v                v                    v               v                v
 vague_scope        unsupported_claim scanner_only  owner_missing      exception_needed gate_failed      stale_vpat
```

## Rule IDs

- `a11y-program-1` — Define product scope, WCAG target, platform standards, procurement needs, and known exclusions.
- `a11y-program-2` — Use automated checks plus keyboard, screen reader, focus, contrast, motion, zoom, touch, and cognitive workflow tests.
- `a11y-program-3` — Classify issues by user impact and core task blockage, not only technical rule.
- `a11y-program-4` — Design-system components need accessibility contracts, examples, and regression tests.
- `a11y-program-5` — VPAT/ACR and conformance claims need date, scope, evaluator, method, and exceptions.
- `a11y-program-6` — Release gates should block critical core-workflow regressions.
- `a11y-program-7` — Remediation needs owner, SLA, workaround, customer communication, and retest evidence.
- `a11y-program-8` — Training and design review should prevent repeated classes of defects.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| VPAT request | Scope and evidence review | Current ACR and exceptions | False conformance claim |
| Keyboard blocker | Block release | Core workflow test | Excluding keyboard users |
| Scanner-only audit | Add manual AT testing | Screen reader/focus proof | False confidence |
| Design system component | Component contract | Regression test | Repeated defect |
| Known exception | Record and mitigate | Owner and date | Permanent accessibility debt |

## Accessibility conformance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `accessibility_scope_defined`, `accessibility_audit_completed`, `accessibility_issue_triaged`, `accessibility_remediation_started`, `accessibility_release_gate_failed`, `accessibility_exception_recorded`, `accessibility_evidence_updated`, `accessibility_review_completed`.

Recommended properties: `surface`, `owner_team`, `segment`, `risk_tier`, `status`, `evidence_type`, `review_due_days`, `exception_type`, `decision`, `customer_impact`, `support_case_id`, `outcome`.
