# Support Automation Governance Patterns

## Support Automation Governance Review state machine

```text
intent_detected -> source_retrieved -> confidence_checked -> automation_responded -> escalation_offered -> qa_reviewed
       |                 |                  |                     |                    |
       v                 v                  v                     v                    v
 wrong_intent      stale_source       low_confidence        unsafe_action      no_handoff
```

## Rule IDs

- `support-automation-1` — Map each automated flow to contact driver, stakes, source material, allowed action, confidence threshold, and escalation trigger.
- `support-automation-2` — Separate answer generation, macro suggestion, ticket routing, account action, billing/refund action, and incident or abuse triage.
- `support-automation-3` — Require citations or source links for knowledge-grounded answers and freshness owners for each source.
- `support-automation-4` — Use stricter thresholds and human review for payments, account access, security, privacy, legal, abuse, vulnerable users, and enterprise accounts.
- `support-automation-5` — Track unresolved rate, recontact rate, escalation rate, CSAT, refund/churn impact, hallucination reports, and agent override rate.
- `support-automation-6` — Give users a clear path to human help when automation is uncertain, repetitive, policy-sensitive, or emotionally charged.
- `support-automation-7` — QA samples by contact driver, segment, language, channel, and risk class, not only aggregate automation success.
- `support-automation-8` — Feed automation failures into product defects, docs gaps, macro changes, and support training.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| Refund action | Require policy and audit | Order and entitlement proof | Unauthorized refund |
| Low confidence answer | Escalate to human | Confidence and source state | Hallucinated answer |
| Incident contact | Bypass deflection | Status and severity | User trapped |
| Stale article | Suppress or caveat | Freshness owner | Wrong guidance |
| High recontact | Review automation | Contact metrics | Deflection theater |

## Support automation governance checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `support_automation_intent_detected`, `support_automation_source_retrieved`, `support_automation_confidence_checked`, `support_automation_response_sent`, `support_automation_escalated`, `support_automation_qa_failed`, `support_automation_rollback_started`.

Recommended properties: `contact_id, intent, channel, automation_type, source_id, source_freshness, confidence, action_type, escalation_reason, customer_segment, recontact, csat, qa_result, decision`.
