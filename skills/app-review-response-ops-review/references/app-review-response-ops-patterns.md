# App Review Response Ops Patterns

## App Review Response Ops Review state machine

```text
notice_received -> policy_classified -> evidence_collected -> response_sent -> review_resubmitted -> approved -> prevention_logged
       |                  |                   |                |                   |             |
       v                  v                   v                v                   v             v
 unclear_policy     wrong_fix          evidence_gap     reviewer_stalled     rejected_again recurrence_unowned
```

## Rule IDs

- `app-review-response-1` — Capture store, policy citation, reviewer text, build/version, metadata, screenshots, privacy labels, commerce setup, and launch deadline.
- `app-review-response-2` — Separate metadata fixes, binary behavior changes, privacy disclosures, payment/IAP setup, content policy, legal compliance, and reviewer misunderstanding.
- `app-review-response-3` — Build an evidence package with reproduction steps, screenshots/video, account credentials if allowed, policy mapping, and changed files or metadata.
- `app-review-response-4` — Draft concise reviewer responses that state what changed, how to verify it, and why the app complies without adversarial language.
- `app-review-response-5` — Coordinate release sequencing, expedited review, phased rollout, marketing dates, support macros, and customer communication.
- `app-review-response-6` — Use appeals only when evidence supports policy compliance or reviewer misunderstanding, not as a substitute for fixing real defects.
- `app-review-response-7` — Track recurrence by policy area and update pre-submit QA, metadata checklists, privacy labels, entitlement tests, and release docs.
- `app-review-response-8` — Escalate legal, safety, payments, privacy, or platform-strategy issues before changing product behavior.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Metadata mismatch | Fix metadata and screenshots | Store listing diff | Repeat rejection |
| IAP issue | Verify commerce setup | Purchase flow evidence | Revenue launch block |
| Privacy label issue | Update disclosure or behavior | Data map | Policy escalation |
| Reviewer misunderstanding | Respond with evidence | Repro steps/video | Unnecessary product change |
| Launch deadline | Sequence fallback release | Criticality and comms | Surprise delay |

## App review response checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `app_review_notice_received`, `app_review_policy_classified`, `app_review_evidence_collected`, `app_review_response_sent`, `app_review_resubmitted`, `app_review_approved`, `app_review_recurrence_prevented`.

Recommended properties: `store, app_id, build_version, policy_area, issue_type, evidence_status, response_status, appeal_status, resubmission_status, approval_status, launch_impact, owner_team, recurrence_category, decision`.
