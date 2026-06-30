# Content Policy Appeals Patterns

## Policy enforcement state machine

```text
content_submitted -> eligibility_checked -> policy_screened -> review_needed -> enforcement_decided -> notice_sent -> appeal_opened -> appeal_decided -> case_closed
       |                    |                 |                |                    |              |               |                |
       v                    v                 v                v                    v              v               v                v
 rejected_format       blocked_actor     auto_allowed     reviewer_needed       no_action     appeal_expired  decision_reversed transparency_logged
```

## Rule IDs

- `content-appeals-1` — Define policy rules with examples, non-examples, severity, intent, harm, and enforcement range.
- `content-appeals-2` — Separate detection, review, decision, notice, appeal, restoration, repeat-offender, and transparency states.
- `content-appeals-3` — High-stakes enforcement needs evidence package, reviewer rationale, audit log, and appeal path.
- `content-appeals-4` — Notices should explain violated rule, affected content, action taken, next step, and appeal option without leaking abuse signals.
- `content-appeals-5` — Appeals need SLA, independent review where possible, additional evidence, and reversal/restoration workflow.
- `content-appeals-6` — Automation needs confidence thresholds, human review triggers, false-positive monitoring, and rollback.
- `content-appeals-7` — Repeat-offender ladders should distinguish mistake, negligence, abuse, evasion, and severe harm.
- `content-appeals-8` — Creator marketplaces need monetization, ranking, payout, and listing state handling after enforcement.
- `content-appeals-9` — Moderator QA should sample decisions, measure consistency, and update policy examples.
- `content-appeals-10` — Transparency metrics should report volume, action type, appeal rate, reversal rate, and policy-change drivers.

## Decision table

| Case | Enforcement | Appeal path | Restoration concern |
| --- | --- | --- | --- |
| Minor listing metadata issue | Warning or edit request | Simple correction | Preserve ranking if fixed quickly |
| Harmful content high confidence | Remove and restrict | Human appeal | Reporter privacy and repeat-offender state |
| Ambiguous satire/parody | Human review | Independent review | Context and region-specific norms |
| AI-generated spam | Bulk action with sampling | Limited appeal for false positives | Automation drift and evasion |
| Policy changed after publish | Grace period or notice | Policy clarification | Trust and creator comms |

## Appeals checklist

- Policy rules include examples and severity ladder.
- Enforcement notices are specific but safe.
- Evidence package and audit logs exist.
- Appeal SLA, reviewer independence, and reversal path are defined.
- Restoration updates ranking, monetization, notifications, and user trust state.
- QA and transparency reporting feed policy improvement.

## Event schema

Track: `content_submitted`, `content_policy_flagged`, `content_enforcement_decided`, `content_notice_sent`, `content_appeal_opened`, `content_appeal_decided`, `content_restored`, `policy_rule_updated`, `moderation_qa_completed`.

Recommended properties: `surface`, `content_type`, `policy_rule`, `severity`, `detection_source`, `confidence_bucket`, `reviewer_type`, `action`, `appeal_submitted`, `appeal_outcome`, `reversal_reason`, `repeat_offender_state`, `monetization_affected`, `transparency_bucket`.
