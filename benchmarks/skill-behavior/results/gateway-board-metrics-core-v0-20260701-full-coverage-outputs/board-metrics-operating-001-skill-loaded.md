Board metrics context:
- Audience: SaaS board + CEO/CFO/CRO/CPO/VP CS; monthly operating review, quarterly board pack.
- Source of truth: billing + finance close (revenue), CRM (pipeline), product analytics (usage), support/IR (incidents, tickets).
- Risk boundary: GAAP revenue ≠ MRR ≠ bookings; reconcile or carve out explicitly.

Current-period board snapshot (illustrative, blocked from release):

| Metric | Actual | Plan | Prior | Variance | Status | Owner | Signoff | Confidence | Decision implication |
| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- | --- |
| ARR | illustrative_not_source_of_truth:$48.2M | $52.0M | $45.1M | -$3.8M (-7.3%) | Miss | CFO | blocked | low | Reforecast Q-close; defer 2 hires |
| MRR | illustrative_not_source_of_truth:$4.02M | $4.33M | $3.76M | -$0.31M | Miss | RevOps | blocked | low | Bridge new/expansion/churn |
| NRR | illustrative_not_source_of_truth:108% | 112% | 110% | -4 pts | Watch | VP CS | blocked | low | CS capacity, save plays |
| GRR | illustrative_not_source_of_truth:91% | 94% | 92% | -3 pts | Miss | VP CS | blocked | low | Churn cohort review |
| Logo churn | illustrative_not_source_of_truth:2.4%/mo | 1.8% | 2.0% | +0.6 pts | Miss | VP CS | blocked | low | Reason-code mix required |
| CAC (blended) | illustrative_not_source_of_truth:$14.2k | $12.0k | $12.8k | +18% | Miss | CRO | blocked | low | Channel + paid mix |
| Payback | illustrative_not_source_of_truth:16 mo | 12 mo | 14 mo | +4 mo | Miss | CRO | blocked | low | GTM spend reset |
| Gross margin | illustrative_not_source_of_truth:74% | 78% | 76% | -4 pts | Miss | CFO | blocked | low | Infra + services drag |
| Pipeline coverage | illustrative_not_source_of_truth:2.6x | 3.5x | 3.1x | -0.9x | Miss | CRO | blocked | low | Stage hygiene audit |
| Product usage (WAU) | illustrative_not_source_of_truth:62% | 70% | 68% | -8 pts | Miss | CPO | blocked | low | Activation drop in 2024 cohort |
| Support tickets/cust | illustrative_not_source_of_truth:4.1 | 3.0 | 3.4 | +21% | Miss | VP CS | blocked | low | Headcount + deflection |
| Sev1/2 incidents | illustrative_not_source_of_truth:3 | 1 | 2 | +2 | SLO breach | CTO | blocked | low | Reliability spend ask |
| Net burn | illustrative_not_source_of_truth:$1.85M/mo | $1.50M | $1.60M | +23% | Miss | CFO | blocked | low | Runway shorten |
| Runway | illustrative_not_source_of_truth:14 mo | 18 mo | 17 mo | -4 mo | Watch | CFO | blocked | low | Fundraise timing |
| Forecast variance | illustrative_not_source_of_truth:-7.3% | 0% | -2.1% | -5.2 pts | Miss | FP&A | blocked | low | Plan reset decision |

Operating metrics plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Revenue | Reforecast Q | ARR bridge + pipeline coverage | Plan credibility | CFO |
| Retention | Save plan for 2023 SMB cohort | Cohort + reason codes | Renewal compression | VP CS |
| GTM | Trim paid, lift PLG | CAC by channel | Pipeline slip | CRO |
| Product | Fix activation gap | Cohort usage | Roadmap dilution | CPO |
| Reliability | Approve 2 SRE hires | Sev count, MTTR | Burn ↑ | CTO |

Metric dictionary and reconciliation map:
- ARR: MRR × 12 from billing; reconciles to GAAP deferred revenue at quarter close; CFO owns.
- MRR: billed recurring + recognized usage; carve out one-time; RevOps.
- NRR/GRR: (start + exp - contr - churn)/start; GRR excludes expansion; VP CS.
- Churn cohorts: by start quarter, plan, segment, geo, channel; reason codes required.
- CAC/payback: fully loaded S&M / new ARR; segment-level; CRO.
- Gross margin: (rev - COGS)/rev; COGS = infra + support + payment + third-party + services; CFO.
- Pipeline: stage-weighted CRM; stale-stage flag; RevOps admin.
- Product usage: WAU/MAU + activation event; identity-join caveat; CPO.
- Support load: tickets/cust, FRT, CSAT; VP CS.
- Incidents: Sev1/2 count, MTTA/MTTR, customer ARR impacted; CTO.
- Burn/runway: unrestricted cash / avg 3-mo net burn; CFO.
- Forecast variance: plan-to-actual driver tree (price, volume, mix, churn, cost, timing, one-time, data); FP&A.

Variance narrative:
- illustrative_not_source_of_truth: New ARR shortfall $2.1M → SMB channel conversion -22%, tied to PLG deprecation; action: CRO re-enable self-serve trial.
- illustrative_not_source_of_truth: Expansion beat +$0.4M → enterprise seat adds; action: enable land-and-expand overlay.
- illustrative_not_source_of_truth: Churn cohort deterioration in 2023 SMB → onboarding NPS drop; action: VP CS 90-day save motion.
- illustrative_not_source_of_truth: Hosting cost +$0.6M → egress + new region; action: CFO renegotiate CDN.
- illustrative_not_source_of_truth: Pipeline slip 2.6x → stale mid-funnel; action: RevOps hygiene sweep.
- illustrative_not_source_of_truth: Sev repeat cause auth outage → 2 SRE hires; CTO ask.
- illustrative_not_source_of_truth: Hiring timing shifted $0.25M/mo burn; CFO reforecast.
- Data quality gap: CRM forecast bias; FP&A rebase.

Owner signoff ledger:
| Pack | Owner | Source | Reviewer | Status | Caveat | Release |
| --- | --- | --- | --- | --- | --- | --- |
| Revenue/ARR | CFO | Billing | Finance close | blocked | usage carve-out | block |
| Pipeline | CRO | RevOps | FP&A | blocked | stale stages | block |
| Product usage | CPO | Data | Data owner | blocked | identity join | block |
| Support/incidents | VP CS/CTO | SupOps/IR | COO | blocked | severity inflation | block |
| Burn/runway | CFO | Acct/treas | FP&A | blocked | one-time vendor | block |

Board decisions and asks:
- Approve: Q reforecast reset; evidence: ARR gap; owner: CFO; due: 14d.
- Approve: 2 SRE hires; evidence: Sev count; owner: CTO; due: 7d.
- Defer: 4 go-to-market hires; trigger: CAC/payback miss; owner: CRO.
- Accept-risk: fundraising window opens at 14-mo runway; owner: CFO/CEO.
- Diligence: churn reason-code audit; owner: VP CS.

Definitions, sources, owners, variance, board asks, risks: event schema `board_metric_defined|board_metric_source_reconciled|board_metric_owner_signed_off|board_variance_explained|board_question_logged|board_decision_recorded|board_action_created|board_action_closed` with `board_cycle_id, metric_name, metric_owner, source_system, reporting_period, variance_type, confidence_status`.

Action register:
| Action | Owner | Due | Evidence | Status | Next review |
| --- | --- | --- | --- | --- | --- |
| Replace illustrative with source values | All owners | 5d | Billing/CRM/data extracts | open | Next board |
| Q reforecast | CFO | 14d | Driver bridge | open | Next board |
| SRE hire req | CTO | 7d | Job req + comp band | open | Ops weekly |
| Stale-stage sweep | RevOps | 10d | Stage-aged report | open | Weekly |
| Churn reason-code audit | VP CS | 21d | Cohort reasons | open | Monthly |
| Fundraise decision | CEO/CFO | 60d | Diligence pack | open | Quarterly |

Release status: blocked until source-tied actuals, plan, prior, variance, owner signoff, and confidence replace illustrative values.
