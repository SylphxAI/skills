# Product Led Sales Routing Patterns

## Product Led Sales Routing Review state machine

```text
product_signal_received -> account_matched -> score_computed -> route_selected -> action_taken -> outcome_measured
        |                    |                |                |              |
        v                    v                v                v              v
 low_fit              match_conflict     suppress        capacity_blocked  feedback_needed
```

## Rule IDs

- `pls-routing-1` — Define activation, collaboration, integration, usage depth, admin behavior, expansion, enterprise intent, and support-friction signals.
- `pls-routing-2` — Match users to accounts, workspaces, domains, opportunities, customers, territories, owners, and partner relationships before routing.
- `pls-routing-3` — Separate PQL, PQA, expansion signal, procurement signal, support-assist signal, and abuse/noise signals.
- `pls-routing-4` — Route by user value and sales capacity: self-serve, nurture, sales-assist, AE, CS, partner, support, or suppress.
- `pls-routing-5` — Sync product events, lifecycle messaging, CRM tasks, owner assignment, SLA, and outcome status with clear source of truth.
- `pls-routing-6` — Use suppression for low fit, active support incidents, existing sales motion, opt-out, competitor/test domains, students, and risky accounts.
- `pls-routing-7` — Measure route acceptance, meeting quality, conversion, paid retention, expansion, support load, complaint rate, and false-positive routing.
- `pls-routing-8` — Review routing thresholds after pricing, onboarding, ICP, sales capacity, product packaging, or lifecycle changes.

## Decision table

| Scenario | Primary decision | Required evidence | Failure mode |
| --- | --- | --- | --- |
| High activation, SMB | Self-serve or light assist | Usage and plan fit | Sales overreach |
| Enterprise domain intent | Route to AE with context | Account match and firmographics | Missed enterprise deal |
| Existing customer expansion | Route CS/AE jointly | Account owner and health | Account conflict |
| Support frustration | Suppress sales and help first | Support state | Tone-deaf outreach |
| Capacity constrained | Raise threshold | Sales SLA and accepted rate | Low-quality tasks |

## Product-led routing checklist

- Owner, scope, audience, and decision impact are explicit.
- Source-of-truth records, evidence, and review cadence are documented.
- User/customer communication and support handoff are defined where relevant.
- Privacy, security, accessibility, trust, and commercial boundaries are checked.
- Metrics and event tracking prove whether the system is working.
- Stale records, exceptions, and unresolved gaps have escalation paths.

## Event schema

Track: `product_sales_signal_received`, `product_account_matched`, `pql_score_computed`, `product_sales_route_selected`, `sales_task_created`, `product_sales_route_suppressed`, `product_sales_outcome_recorded`.

Recommended properties: `user_id, account_id, workspace_id, signal_type, activation_score, fit_score, intent_score, account_match_confidence, route, owner_team, suppression_reason, sales_sla_status, conversion_outcome, decision`.
