Board metrics context:
Audience: Board of Directors and Executive Team. 
Source of truth: Billing system (ARR/MRR), CRM (Pipeline/CAC), Product DB (Usage), Support DB (Tickets/Incidents), GL (Margin/Burn/Runway). 
Risk boundary: Metric sprawl, mixed GAAP vs cash recognition, and vanity retention narratives hiding churn.

Operating metrics plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Revenue (ARR/MRR) | Reconcile billing vs CRM | Billing system extracts | Recognition mismatch | CFO |
| Retention (NRR/GRR) | Segment by ARR cohorts | Cohort analysis tables | Hidden enterprise churn | Head of CS |
| GTM (CAC/Pipeline) | Track fully-loaded CAC | CRM & Finance GL | Skyrocketing acquisition costs | CRO |
| Margin & Cash (Burn/Runway) | Separate COGS from OpEx | GL & Billing | Hidden hosting/support costs | VP Finance |
| Product & Ops (Usage/Support) | Tie usage to incident load | App DB & Ticketing | Silent product attrition | CTO / Head of Product |
| Forecast (Variance) | Bridge plan vs actuals | Driver tree model | Narrative spin on missed targets | CEO / CFO |

Definitions, sources, owners, variance narrative, board asks, risks, and follow-up actions:
- ARR/MRR definition -> Source of truth is billing system, synced to CRM. Owner signoff required by CFO. Edge case: Exclude non-recurring professional services fees from MRR.
- NRR & GRR calculation -> Cohort view required by customer segment (SMB vs Enterprise). Owner signoff required by Head of CS. Edge case: Identify single massive expansion deals masking underlying base churn.
- CAC & Pipeline reporting -> Calculate fully-loaded CAC using GL sales/marketing spend. Pipeline sourced from CRM. Owner signoff required by CRO. Edge case: Exclude stale CRM stage durations that artificially inflate pipeline coverage.
- Gross margin, Burn & Runway -> Gross margin excludes R&D and S&M. Burn calculated from GL cash flow. Runway = current cash / avg monthly burn. Owner signoff required by VP Finance. Edge case: Distinguish GAAP gross margin from cash margin.
- Product usage & Support load -> Source of truth is product analytics DB and support ticketing system. DAU/WAU tracked against support load and incident counts. Owner signoff required by CTO. Edge case: Exclude internal employee traffic from usage metrics.
- Forecast variance narrative -> Require driver-tree bridge (volume, price, mix, churn, timing) for any metric missing plan by >5%. Guardrail: No vanity narratives allowed; missed targets must state operational drivers.
- Board asks -> Trigger: Strategic enterprise expansion. Action: Request board approval for additional $2M ARR sales headcount based on NRR cohort data and pipeline coverage.
- Action follow-up -> Trigger: Board decision logged. Action: Assign specific owner and due date in the board action register (e.g., CRO to present revised enterprise pricing model by next cycle). Guardrail: No board meeting concludes without documented actions and owners.
