Board metrics context:  
Audience / source of truth / risk boundary:  
- Audience: CEO, CFO, CRO, CPO, CTO, VP CS, board, investors.  
- Cadence: monthly operating review; quarterly board pack; final lock 5 business days after finance close.  
- Source-of-truth principle: no manually curated board metric without formula, source system, owner, timestamp, variance explanation, and signoff.  
- Risk boundary: separate accounting, billing, CRM, product analytics, support, incident, hiring, and forecast data. Reconcile, do not blend.

Operating metrics plan:

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| ARR / MRR | Confirm revenue base, new, expansion, contraction, churn | Billing system, revenue waterfall, customer/account mapping | ARR inflation, duplicate subscriptions, timing mismatches | CFO |
| NRR / GRR | Decide if retention supports growth plan | Cohort retention by start month, segment, ACV band, product, geo | Aggregate retention hides SMB or enterprise weakness | CFO + VP CS |
| Churn cohorts | Identify churn drivers and recovery actions | Logo/revenue churn, reason codes, tenure, usage before churn, CS touchpoints | Misclassified churn; weak save motion | VP CS |
| CAC | Validate efficiency by channel and segment | Sales/marketing spend, bookings, payback, CAC ratio | Blended CAC hides channel deterioration | CFO + CRO |
| Gross margin | Decide pricing, infra, support, services actions | Revenue, COGS, cloud spend, support cost, services delivery cost | GM overstated by excluding true delivery costs | CFO + CTO |
| Pipeline | Assess next-quarter and annual forecast confidence | CRM stages, coverage, conversion, sales cycle, commit/best case | Stage hygiene and sandbagging | CRO |
| Product usage | Confirm adoption, activation, expansion signals | Product analytics, WAU/MAU, feature adoption, account health | Event drift after releases | CPO |
| Support load | Decide staffing, product quality, self-serve actions | Tickets, backlog, SLA, deflection, top issue themes | Support debt masked by averages | VP CS |
| Incidents | Assess reliability and customer risk | Incident logs, severity, MTTA/MTTR, affected ARR, RCA completion | Recurring incidents without ownership | CTO |
| Burn / runway | Decide spend, hiring, financing timing | Cash, P&L, headcount plan, vendor commitments, scenario model | Cash runway optimism | CFO |
| Forecast variance | Explain plan miss or beat | Price / volume / mix / churn / expansion / cost / timing bridge | Vanity narrative, no operating correction | CEO + CFO |
| Owner signoff | Lock metric trust | Signed metric pack by owner before board release | Last-minute spreadsheet edits | CEO office |
| Board asks | Tie metrics to decisions | Decision memo: hiring, pricing, GTM, product, fundraising, risk | Board discussion without resolution | CEO |
| Action follow-up | Close prior decisions | Action register, due dates, evidence links | Action drift | Chief of Staff |

Definitions, sources, owners, variance narrative, board asks, risks, and follow-up actions:

- `ARR/MRR review` -> formula: contracted recurring revenue normalized to monthly/annual value; exclude one-time services; source: billing + finance close; owner: CFO; edge case: discounts, ramps, pauses, FX, usage-based revenue must be labeled.
- `NRR/GRR review` -> NRR = starting ARR cohort + expansion - contraction - churn / starting ARR; GRR excludes expansion; source: billing/customer table; owner: CFO + VP CS; segment by SMB/MM/enterprise, product, geo, acquisition cohort.
- `Churn cohort review` -> report logo churn, gross revenue churn, voluntary/involuntary churn, downgrade, non-renewal, and contraction by cohort; source: billing + CRM reason codes + CS notes; owner: VP CS.
- `CAC review` -> CAC = fully loaded sales and marketing expense / new ARR, shown by channel and segment; include payback and CAC ratio; source: GL + CRM; owner: CFO + CRO.
- `Gross margin review` -> report subscription GM, services GM, blended GM; include cloud, support, onboarding, third-party costs; source: GL, cloud billing, support systems; owner: CFO.
- `Pipeline review` -> pipeline coverage, stage conversion, weighted pipeline, commit, best case, sales cycle, slipped deals; source: CRM; owner: CRO; caveat: exclude stale opps and non-board-approved stage definitions.
- `Product usage review` -> activation, WAU/MAU, key feature adoption, depth of use, seat utilization, usage by retained vs churned accounts; source: product analytics/warehouse; owner: CPO.
- `Support load review` -> ticket volume per customer/ARR, SLA attainment, backlog, reopen rate, top defect themes; source: Zendesk/Intercom/Jira; owner: VP CS.
- `Incidents review` -> Sev1/2 count, uptime, MTTA, MTTR, affected customers/ARR, RCA status, repeat causes; source: incident platform; owner: CTO.
- `Burn/runway review` -> net burn, gross burn, ending cash, runway at current plan and downside case; source: finance close and treasury; owner: CFO.
- `Forecast variance` -> bridge actual vs plan by new ARR, expansion, contraction, churn, pricing, timing, cost, hiring, cloud, support, one-time events, and data-quality changes; owner: CEO + CFO.
- `Owner signoff gate` -> each metric owner signs by T+3; CFO locks financial metrics by T+4; CEO approves final narrative by T+5.
- `Board asks` -> every pack must include explicit decisions: hiring approvals, GTM investment, pricing changes, product reliability spend, fundraising timing, risk acceptance, or plan reset.
- `Action follow-up` -> every board question becomes an action with owner, due date, evidence link, and status: open, blocked, closed, deferred.

State machine:  
`metrics_scoped -> sources_reconciled -> owners_signed_off -> narrative_reviewed -> board_decisions_recorded -> actions_closed`

Failure modes:  
`metric_sprawl | reconciliation_gap | owner_gap | vanity_narrative | decision_gap | action_drift`

Board action register:

| Action | Owner | Due | Evidence | Status |
| --- | --- | --- | --- | --- |
| Freeze metric dictionary v1 | CFO | Next close - 3 days | Approved definitions | Open |
| Reconcile billing to ARR bridge | CFO | Next close | Revenue waterfall | Open |
| Validate CRM stage hygiene | CRO | 10 business days | Pipeline audit | Open |
| Audit product event drift | CPO | 15 business days | Event QA report | Open |
| Complete incident RCA backlog | CTO | 30 days | RCA links + prevention plan | Open |
| Create churn recovery plan by cohort | VP CS | Next board meeting | Cohort action plan | Open |

Event schema to track:  
`board_metric_defined`, `board_metric_source_reconciled`, `board_metric_owner_signed_off`, `board_variance_explained`, `board_question_logged`, `board_decision_recorded`, `board_action_created`, `board_action_closed`.

Required properties:  
`board_cycle_id, metric_name, metric_owner, source_system, metric_version, reporting_period, segment, variance_type, plan_delta, confidence_status, board_question_id, action_owner, action_due_at, decision`.
