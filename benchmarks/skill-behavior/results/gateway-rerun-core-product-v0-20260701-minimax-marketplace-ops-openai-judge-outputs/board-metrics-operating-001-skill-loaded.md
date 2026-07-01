# Board Metrics Operating Review — SaaS

## Board metrics context

- **Audience:** Board of directors + CEO/CFO/COO/CPTO/VP Sales/VP CS.
- **Decision calendar:** Monthly operating review (M+5 close), quarterly board pack (Q+15), fundraising/audit gates on demand.
- **Source of truth boundary:** Accounting/GAAP (NetSuite) | Billing (Stripe + Zuora) | CRM (Salesforce) | Product analytics (Amplitude/Snowflake) | Support (Zendesk) | Incident (PagerDuty) | Finance forecast (Anaplan). No manual paste between layers; reconciliation rows mandatory.
- **Risk boundary:** Metric sprawl, reconciliation gaps, owner gaps, vanity narrative, decision drift, action drift.

## Operating metrics plan

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| ARR / MRR | Allocate growth $ vs. efficiency | Stripe+Zuora reconciled to NetSuite bookings | FX, mid-month cancellations | VP Finance |
| NRR / GRR | Approve expansion vs. save plays | Cohort-by-tenure, logo + revenue churn | Logo-vs-revenue churn drift | VP CS |
| Churn cohorts | Target save segments | Tenure × plan × segment matrix | Survivorship bias | VP CS + Data |
| CAC / Payback | Set channel mix & hiring | Salesforce + paid spend, 12-mo blended | Self-attribution | VP Sales + CMO |
| Gross margin | Approve infra / vendor spend | AWS + 3rd-party COGS vs. ARR | Stock comp, hosting allocation | CFO |
| Pipeline | Approve quarter commit | Salesforce coverage 3.0×, stage slippage | Slippage under-reporting | VP Sales |
| Product usage (DAU/WAU/PAU, feature adoption) | Product bets, deprecations | Amplitude on Snowflake | Event-schema drift | CPTO |
| Support load | Headcount / tier change | Zendesk tickets/SLA/CSAT | Severity inflation | VP CS |
| Incidents (Sev1/2, MTTR) | Reliability investment | PagerDuty + status page | Under-logging | SRE Head |
| Burn & runway | Hiring freeze / unlock | NetSuite cash + Anaplan forecast | One-time skews | CFO |
| Forecast variance | Plan refresh, re-baseline | Plan vs. actual driver bridge | Single-driver attribution | CFO + FP&A |

## Definitions, sources, owners, variance narrative, asks, risks, actions

- **ARR/MRR** (board-metrics-1,2) — ARR = MRR × 12; excludes professional services and one-time. Source: Zuora → Snowflake. Variance: price +2%, volume +5%, mix -3%, churn -1%, FX flat. Action: re-anchor Q+1 plan.
- **NRR/GRR** — NRR = (start ARR + expansion - churn - contraction) / start ARR; GRR excludes expansion. Cohort view by start quarter. Action: flag accounts with >20% contraction.
- **Churn cohorts** — Tenure 0-12 / 12-24 / 24+; segment SMB/Mid/Ent. Flag any cohort with >5 ppt YoY deterioration.
- **CAC & payback** — Blended + paid + organic; payback months = CAC / (ARPA × gross margin). Reconcile Salesforce-opps to cash collected.
- **Gross margin** — (Revenue - hosting - 3P COGS - support headcount - payment fees) / Revenue. Hosting allocation reviewed quarterly.
- **Pipeline** — Coverage, stage conversion, slipped deals, commit/upside ratio. Show weighted by stage probability only; never by rep forecast.
- **Product usage** — DAU/MAU, PAU (power actions), feature adoption. Reconcile Amplitude user IDs to Stripe customer IDs weekly.
- **Support load** — Tickets/ARR, FRT, CSAT, backlog. Threshold: backlog > 7 days → hiring ask.
- **Incidents** — Sev1/2 count, MTTR, % SLO met, customer-impact minutes. Show rolling 90-day trend.
- **Burn & runway** — Monthly burn = (cash prior - cash current) - financing; runway = unrestricted cash / avg burn. Flag <12 mo.
- **Forecast variance** — Bridge: start plan → price → volume → mix → churn → cost → FX → one-time → end actual. Owner attribution mandatory.

**Board asks (this cycle):** (a) approve hiring plan to reach coverage target; (b) ratify hosting tier upgrade; (c) approve save playbook budget for at-risk cohort; (d) acknowledge FX hedge decision.

**Risk register:** metric-drift from billing migration; CRM stage process change; event-schema break in product analytics; finance close timing.

## State machine
`metrics_scoped → sources_reconciled → owners_signed_off → narrative_reviewed → board_decisions_recorded → actions_closed`. Failure paths: `metric_sprawl | reconciliation_gap | owner_gap | vanity_narrative | decision_gap | action_drift`.

## Event schema (tracked)
`board_metric_defined`, `board_metric_source_reconciled`, `board_metric_owner_signed_off`, `board_variance_explained`, `board_question_logged`, `board_decision_recorded`, `board_action_created`, `board_action_closed`. Properties: `board_cycle_id, metric_name, metric_owner, source_system, metric_version, reporting_period, segment, variance_type, plan_delta, confidence_status, board_question_id, action_owner, action_due_at, decision`.

## Action register (top items)

| ID | Action | Owner | Due |
| --- | --- | --- | --- |
| A1 | Reconcile Stripe↔NetSuite gap $X | VP Finance | T+5 |
| A2 | Save plan for flagged NRR cohort | VP CS | T+14 |
| A3 | Hiring plan re-baseline | CFO + CHRO | T+10 |
| A4 | Amplitude↔Stripe user ID fix | CPTO | T+7 |
| A5 | Hosting tier upgrade PR | SRE Head | T+21 |
| A6 | Forecast bridge refresh | FP&A | T+3 |
