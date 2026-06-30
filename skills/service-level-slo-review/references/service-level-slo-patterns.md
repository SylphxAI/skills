# Service Level SLO Patterns

## Service-level state machine

```text
journey_identified -> sli_defined -> slo_set -> monitoring_live -> budget_tracking -> breach_detected -> customer_communicated -> reviewed
       |                 |           |             |                 |                 |                       |
       v                 v           v             v                 v                 v                       v
 unclear_journey   weak_signal  overpromised   blind_spot       budget_exhausted  status_gap              promise_revised
```

## Rule IDs

- `service-level-1` — Start from user journeys, not servers: login, checkout, API request, import, sync, search, billing, support, or admin control.
- `service-level-2` — Separate SLI, SLO, SLA, support response target, RTO, RPO, maintenance window, and status-page promise.
- `service-level-3` — SLIs should include availability, latency, correctness, data freshness, durability, and support response where relevant.
- `service-level-4` — Use customer-visible measurement points and state exclusions clearly.
- `service-level-5` — Error budget policy should define rollout freezes, escalation, investment, and executive/customer communication triggers.
- `service-level-6` — SLAs require remedy/credit policy, contractual scope, exclusions, and support process.
- `service-level-7` — Status pages should distinguish full outage, partial degradation, dependency issue, maintenance, delayed data, and resolved.
- `service-level-8` — Maintenance windows need notice, rollback, customer impact, and post-maintenance proof.
- `service-level-9` — Sales/trust-center uptime claims must match measured SLO/SLA history.
- `service-level-10` — Review SLOs after incidents, major architecture changes, customer segment changes, and new paid plans.

## Decision table

| Promise | Internal metric | Customer communication | Risk |
| --- | --- | --- | --- |
| 99.9% API availability | Successful authenticated requests over 30 days | SLA page and status incidents | Excluding auth/DNS incorrectly |
| Import freshness under 15 minutes | p95 pipeline lag | Dashboard freshness banner | Silent stale metrics |
| Priority support in 4 hours | First qualified response | Plan page and support auto-reply | Counting bot response as human help |
| RPO under 24 hours | Backup success and restore tests | Trust center summary | No restore proof |
| Maintenance window | Planned impact minutes | Advance notice and status page | Unannounced degradation |

## SLO checklist

- Critical journeys and customers are listed.
- SLIs are customer-visible and monitored.
- SLO/SLA/support/RTO/RPO promises are separated.
- Error budget policy changes release and staffing decisions.
- Status, maintenance, and breach communications are ready.
- Trust/sales claims match measured evidence.

## Event schema

Track: `slo_defined`, `sli_measurement_started`, `slo_budget_burned`, `slo_breach_detected`, `sla_credit_reviewed`, `maintenance_scheduled`, `status_page_updated`, `service_level_review_completed`.

Recommended properties: `service`, `journey`, `sli_type`, `slo_target`, `window_days`, `plan`, `customer_segment`, `budget_remaining`, `breach_severity`, `status_state`, `maintenance_minutes`, `customer_comms_required`, `remedy_policy`.
