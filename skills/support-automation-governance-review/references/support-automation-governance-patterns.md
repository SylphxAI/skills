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


## Merged from support-deflection-knowledge-base-review

# Support Deflection Knowledge Base Patterns

## Deflection state machine

```text
help_needed -> query_entered -> article_ranked -> answer_viewed -> issue_resolved -> feedback_captured -> content_improved
      |              |              |                |               |                  |
      v              v              v                v               v                  v
 no_query       zero_results   stale_article    unresolved       escalated          product_gap_opened
```

## Rule IDs

- `support-deflection-1` — Separate deflection for education, troubleshooting, billing/refund, account access, incident, policy, integration, and bug reports.
- `support-deflection-2` — Measure resolution quality, recontact, escalation, churn/refund, and sentiment, not just ticket avoidance.
- `support-deflection-3` — Articles need owner, last reviewed date, product version, audience, prerequisites, steps, expected result, and escalation path.
- `support-deflection-4` — Help search needs synonyms, top failed queries, zero-results recovery, and article ranking QA.
- `support-deflection-5` — Chatbots/macros must cite source, know escalation triggers, and avoid policy invention.
- `support-deflection-6` — High-stakes issues should offer clear human handoff and preserve diagnostic context.
- `support-deflection-7` — Support diagnostics should collect safe logs, status, environment, and steps without exposing secrets.
- `support-deflection-8` — Contact drivers should feed product fixes, onboarding, in-product education, and help-center updates separately.
- `support-deflection-9` — Incident and known-issue articles need expiry and status updates.
- `support-deflection-10` — Deflection experiments need guardrails for frustration and accessibility.

## Decision table

| Contact driver | Self-service asset | Escalation trigger | Product loop |
| --- | --- | --- | --- |
| Password reset | Recovery article and diagnostics | MFA/device loss or suspicious activity | Account recovery UX |
| Refund request | Policy article and status lookup | Payment dispute or exception | Refund flow clarity |
| Integration error | Error catalog and SDK example | Repeated request ID failures | SDK docs/errors |
| Incident question | Status/known issue article | Data loss or SLA impact | Incident comms |
| Feature confusion | How-to and in-product hint | Repeated confusion | UX/product copy fix |

## Knowledge base checklist

- Top contact drivers and failed searches are reviewed.
- Articles have owners, freshness, audience, and escalation path.
- Search synonyms and zero-results recovery are tuned.
- Automation cites verified sources and hands off safely.
- Metrics include recontact, resolution, sentiment, churn/refund, and accessibility.
- Product feedback loop closes repeated support causes.

## Event schema

Track: `help_query_submitted`, `help_zero_results`, `help_article_viewed`, `help_article_feedback_submitted`, `support_deflection_succeeded`, `support_escalation_started`, `chatbot_answer_given`, `knowledge_article_updated`, `product_gap_created_from_support`.

Recommended properties: `surface`, `query_class`, `contact_driver`, `article_id`, `article_age_days`, `rank`, `resolved`, `recontacted`, `escalated`, `automation_used`, `source_cited`, `sentiment`, `product_area`, `support_case_id`.
