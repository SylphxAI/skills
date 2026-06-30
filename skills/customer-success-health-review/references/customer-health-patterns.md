# Customer Health Patterns

## Customer health state machine

```text
new_account -> onboarded -> activated -> adopted -> value_proven -> renewal_ready -> expanded
     |             |            |           |              |
     v             v            v           v              v
stalled_setup  low_activation  risk_watch  intervention  churned_or_downsold
```

## Rule IDs

- `cust-health-1` — Define the customer outcome and account segment before scoring.
- `cust-health-2` — Separate activation, adoption, business outcome, sentiment, support burden, renewal risk, and expansion fit.
- `cust-health-3` — Every score band must trigger a playbook with owner, action, and success proof.
- `cust-health-4` — Weight leading indicators more heavily before renewal risk becomes visible.
- `cust-health-5` — Track data confidence; unknown is not green.
- `cust-health-6` — Segment thresholds by company size, plan, product type, and use case.
- `cust-health-7` — Support tickets can signal engagement or pain; interpret with severity and recurrence.
- `cust-health-8` — Expansion readiness requires outcome proof, stakeholder map, and low operational friction.
- `cust-health-9` — Renewal save motions should solve the root problem, not only discount.
- `cust-health-10` — Feed account health patterns into onboarding, product, pricing, docs, and support.

## Decision table

| Account signal | Health state | Owner action | Risk | Proof of recovery |
| --- | --- | --- | --- | --- |
| Setup incomplete after kickoff | Stalled setup | CSM or onboarding automation | Activation failure | First value milestone reached |
| High usage but many severe tickets | Adopted with friction | Product/support review | Support-driven churn | Ticket recurrence drops |
| Low usage, high executive interest | Risk watch | Discovery and enablement | Value not distributed | More active users/use cases |
| Champion left before renewal | Renewal risk | Stakeholder remap | Political churn | New owner engaged |
| Strong outcome, low admin burden | Expansion ready | Expansion discovery | Over-selling | Customer confirms next use case |
| Unknown telemetry | Data quality risk | Instrumentation/support check | False green | Signals available and reviewed |

## Health score checklist

- Score uses dimensions, not one blended magic number only.
- Each signal has source, freshness, data quality, and expected direction.
- Playbooks define owner, channel, message, deadline, and exit condition.
- Dashboard separates health, renewal risk, and expansion fit.
- Review cadence tightens near onboarding milestones and renewal windows.

## Event schema

Track: `account_onboarded`, `activation_milestone_reached`, `feature_adopted`, `business_outcome_logged`, `support_severity_reported`, `health_score_changed`, `risk_playbook_started`, `risk_playbook_resolved`, `qbr_completed`, `renewal_risk_flagged`, `expansion_signal_created`.

Minimum properties: account segment, plan, use case, owner, score dimensions, previous state, next action, data confidence, renewal date, and success proof.
