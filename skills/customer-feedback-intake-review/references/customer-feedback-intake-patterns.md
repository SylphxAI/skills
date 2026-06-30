# Customer Feedback Intake Patterns

## Feedback state machine

```text
feedback_received -> classified -> deduplicated -> enriched -> routed -> triaged -> decision_linked -> customer_updated -> archived
       |                 |              |             |          |           |                 |                  |
       v                 v              v             v          v           v                 v                  v
 spam_or_noise     needs_clarifying duplicate_of   privacy_redacted no_owner backlog_only  roadmap_rejected   stale_signal
```

## Rule IDs

- `feedback-intake-1` — Capture source, customer segment, product area, job-to-be-done, severity, frequency, evidence, and follow-up permission.
- `feedback-intake-2` — Separate bug, UX confusion, missing capability, pricing objection, churn reason, praise, risk signal, and research lead.
- `feedback-intake-3` — Dedupe by underlying user problem, not by requested solution wording.
- `feedback-intake-4` — Enrich feedback with account value, plan, usage, cohort, region, platform, and support cost where allowed.
- `feedback-intake-5` — Route by product area owner and decision cadence, not by whoever heard the request first.
- `feedback-intake-6` — Use evidence scoring: frequency, severity, strategic fit, revenue/user impact, confidence, effort, and risk.
- `feedback-intake-7` — Close the loop with truthful status: received, clarifying, planned, shipped, not planned, workaround, or needs research.
- `feedback-intake-8` — Protect privacy by redacting secrets, health/financial identifiers, private customer names, and sensitive ticket data.
- `feedback-intake-9` — Feed support macro changes, help-center gaps, roadmap discovery, and product analytics instrumentation separately.
- `feedback-intake-10` — Review stale themes and rejected ideas so backlog size does not become false proof of demand.

## Decision table

| Feedback pattern | Triage action | Product artifact | Customer response |
| --- | --- | --- | --- |
| Many users confused by setup | Usability investigation | Flow review and help-center update | Acknowledge friction and ask for examples |
| One enterprise asks for custom feature | Discovery lead | Opportunity score and account context | No delivery promise; offer workaround/research call |
| App reviews mention crashes | Incident/bug path | Severity issue and release health check | Public response plus fix tracking |
| Cancellations cite price | Monetization research | Pricing objection cluster | Thank, log reason, avoid discount reflex |
| Repeated support macro use | Product/support loop | Macro update or product gap issue | Clarify status and escalation path |

## Intake checklist

- Feedback sources and owner map are documented.
- Taxonomy separates problem type, product area, and requested solution.
- Dedupe and evidence scoring prevent anecdote-driven planning.
- Privacy redaction and access boundaries exist.
- Roadmap, support, research, and analytics loops are distinct.
- Customers receive accurate status without false commitments.

## Event schema

Track: `feedback_received`, `feedback_classified`, `feedback_deduplicated`, `feedback_enriched`, `feedback_routed`, `feedback_decision_linked`, `feedback_customer_updated`, `feedback_archived`.

Recommended properties: `feedback_id`, `source`, `feedback_type`, `product_area`, `segment`, `plan`, `severity`, `frequency_bucket`, `revenue_impact_bucket`, `evidence_score`, `duplicate_cluster_id`, `owner_team`, `decision_status`, `privacy_redacted`, `followup_allowed`.
