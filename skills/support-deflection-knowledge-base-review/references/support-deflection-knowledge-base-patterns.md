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
