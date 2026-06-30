# Moderation Trust Patterns

## Moderation state machine

```text
content_submitted -> automated_screen -> visible_or_limited -> review_queue -> reviewer_decision -> user_notified -> appeal_window -> final_state
        |                  |                    |                |                 |              |
        v                  v                    v                v                 v              v
blocked_upload      needs_more_info       urgent_queue     policy_escalation   corrected       reinstated
```

## Rule IDs

- `mod-trust-1` — Define content type, surface, actor, and harm class before selecting enforcement.
- `mod-trust-2` — Separate quality review, policy review, spam/fraud review, and safety escalation queues.
- `mod-trust-3` — Automation may prioritize, label, or temporarily limit, but high-impact enforcement needs confidence and appeal.
- `mod-trust-4` — Use an enforcement ladder: educate, edit/request changes, limit visibility, suspend capability, remove, terminate.
- `mod-trust-5` — Give creators/users actionable reasons unless disclosure would increase abuse or create safety risk.
- `mod-trust-6` — Keep reviewer evidence: policy version, content snapshot, signals, reviewer, decision, notification, appeal.
- `mod-trust-7` — Ranking penalties must be explainable internally and separated from policy bans.
- `mod-trust-8` — Appeals need a different reviewer path for high-impact decisions.
- `mod-trust-9` — Track false positives, false negatives, queue age, repeat offenders, and moderator disagreement.
- `mod-trust-10` — Update policy examples from real cases without exposing private user data.

## Decision table

| Scenario | Visibility | Enforcement | Appeal | Evidence |
| --- | --- | --- | --- | --- |
| First-time low-quality submission | Draft or limited | Request edits | Not needed unless rejected | Checklist gaps |
| Spam listing or fake review | Hidden pending review | Remove, rate-limit actor | Yes for trusted actor | Pattern, accounts, links |
| Harassment or targeted abuse | Hide or limit quickly | Warning to suspension | Yes unless emergency | Content snapshot and target report |
| Copyright or ownership dispute | Limit disputed asset | Route to dispute process | Yes with proof | Claim, counter-proof, timestamps |
| Policy ambiguity | Hold for senior review | No permanent action yet | Not applicable | Policy version and rationale |
| Repeat marketplace fraud | Remove and commerce-limit | Manual account review | Yes with strong evidence | Transactions, victims, prior cases |

## Queue checklist

- Separate urgent safety, fraud, policy ambiguity, creator quality, and appeal queues.
- Define SLA by user harm and business risk, not by FIFO alone.
- Give moderators canonical policy examples and allowed actions.
- Provide safe macros for approve, request changes, reject, restrict, suspend, and reinstate.
- Audit decision consistency and rollback mistaken enforcement.

## Event schema

Track: `content_submitted`, `moderation_signal_added`, `content_limited`, `review_queue_entered`, `review_decision_made`, `user_notified_of_enforcement`, `appeal_opened`, `appeal_decided`, `content_reinstated`, `actor_restricted`, `policy_example_updated`.

Minimum properties: content type, surface, actor type, policy version, signal source, confidence, queue, reviewer role, action, appeal status, and user-visible reason code.
