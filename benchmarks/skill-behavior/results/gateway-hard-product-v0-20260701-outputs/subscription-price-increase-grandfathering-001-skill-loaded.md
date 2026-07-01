Subscription price-increase context:  
B2B SaaS price increase affecting legacy annual contracts, monthly self-serve, enterprise customers, grandfathered plans, and usage overages. Includes migration offers, cancellation-risk handling, notice timing, support/sales exception paths, and revenue-retention reporting.

Audience / source of truth / risk boundary:  
- Audience: Finance, RevOps, Product Marketing, Customer Success, Sales, Support, Legal, Billing Ops, Data.  
- Source of truth: CRM contract terms, billing platform, subscription ledger, product-usage warehouse, support history, renewal calendar, consent/notice logs.  
- Risk boundary: Do not apply increases without contractual/legal eligibility, adequate notice, billing-channel compliance, support readiness, and cohort-level churn monitoring.

---

## Retention and trust plan

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Scope | Separate increases by contract type: legacy annual, monthly self-serve, enterprise, grandfathered, overage-based | Plan catalog, contract terms, renewal dates | Misbilling or contract breach | RevOps + Legal |
| Cohorts | Segment by plan, tenure, ARR, usage depth, overage frequency, renewal window, NRR, support sentiment, CSM coverage | Billing + CRM + usage data | Blind increase causes churn spike | Data + CS Ops |
| Value narrative | Tie increase to concrete improvements: uptime, security, integrations, support, analytics, limits, compliance | Product changelog, roadmap, adoption data | Perceived cash grab | Product Marketing |
| Notice timing | Monthly self-serve: minimum 30–60 days before renewal. Annual/enterprise: align to renewal/amendment windows, target 90–120 days | Contract terms, billing channel rules | Surprise renewal, disputes | Legal + Billing Ops |
| Grandfathering | No indefinite silent grandfathering. Use phased sunset, migration credit, or renewal-based repricing | Legacy plan margin and feature gap | Trust breach for loyal customers | Pricing + Finance |
| Migration offers | Offer upgrade path to current packages with temporary credit, annual prepay incentive, or usage bundle | WTP, feature adoption, overage patterns | Discount leakage | Sales Ops + Growth |
| Overage pricing | Communicate overage changes separately with calculators and usage alerts | Usage distribution, top overage accounts | Bill shock | Product + Billing |
| Enterprise exceptions | Require approval matrix for freezes, ramps, custom terms, or delayed increases | ARR, strategic value, churn risk | Inconsistent discounting | Sales Leadership |
| Cancellation recovery | Use transparent save offers based on eligibility, not dark patterns | Cancellation reason, usage, ARR | Trains users to threaten churn | Growth + CS |
| Support readiness | Launch macros, escalation queues, refund rules, and objection handling before notice send | QA of help center and scripts | Support spike and inconsistent answers | Support Ops |
| Reporting | Track gross uplift, churn, contraction, refunds, credits, support cost, NRR, GRR, logo retention | Cohort dashboard | Headline ARR lift hides NRR damage | Finance + Data |

---

## State machine

```text
increase_scoped
 -> cohorts_segmented
 -> legal_contract_check_complete
 -> value_message_prepared
 -> migration_offer_ready
 -> notice_delivered
 -> consent_or_ack_recorded_if_required
 -> renewal_observed
 -> retention_learned

Failure states:
scope_gap -> pause launch
cohort_blindspot -> enrich data before notice
consent_gap -> suppress billing change
churn_spike -> activate save / rollback review
support_spike -> activate war room
learning_gap -> block next wave
```

---

## Cohorts, notices, offers, recovery, support, refunds, metrics, and guardrails

- Legacy annual contracts -> Apply at renewal only unless contract allows mid-term change. Provide 90–120 days’ notice, renewal quote, migration option, and CSM outreach for high-ARR accounts. Metric: renewal rate, NRR, objection rate.
- Monthly self-serve users -> Notify 30–60 days before next billing cycle. Show old price, new price, effective date, plan changes, cancellation path, and support link. Metric: notice open rate, cancellation intent, renewal success.
- Enterprise customers -> Use account-specific commercial review. CSM/AE delivers value narrative and revised order form. Exceptions require approval by Sales VP + Finance. Metric: GRR, expansion, delayed-renewal pipeline.
- Grandfathered plans -> Sunset by cohort. Options: phased increase, migration to current plan with temporary credit, or limited-term grandfather extension for high-risk accounts. Metric: migration rate, support complaints, churn.
- High-usage / overage-heavy accounts -> Provide usage report, forecast calculator, annual bundle, or committed-use tier. Avoid surprise overage hikes. Metric: overage revenue, downgrade/churn, bill-shock tickets.
- Low-usage accounts -> Do not lead with price increase only. Offer right-sized plan, adoption help, or annual discount. Metric: activation lift, retention versus control.
- High-tenure loyal customers -> Consider phased increase or loyalty credit with expiry. Metric: churn delta versus non-phased cohort.
- High-support-friction accounts -> CSM review before notice; suppress automated campaign if unresolved escalations exist. Metric: complaint rate, refund rate.
- Region / billing channel differences -> Validate notice, tax, invoice, cancellation, and consent rules separately for direct-billed, reseller, marketplace, and app-store-like channels. Metric: compliance exceptions.

---

## Decision table

| Scenario | Policy | Required approval | Recovery path |
| --- | --- | --- | --- |
| Contract prohibits increase | Defer to renewal/amendment | Legal | Correct quote, apologize, suppress billing change |
| Renewal within 30 days | Do not auto-increase unless notice already valid | Billing Ops + Legal | Extend legacy price one cycle |
| Strategic enterprise at churn risk | Custom ramp or delayed increase | Sales VP + Finance | Executive outreach |
| Grandfathered plan with feature gap | Migration credit for 3–12 months | Pricing + Finance | CSM-led migration |
| Monthly user threatens cancellation | Eligible save offer or annual migration | Growth policy rules | Log reason, avoid repeated offers |
| Billing error or unclear notice | Refund/credit difference | Support Lead + Billing | Incident review |

---

## Support and sales scripts

- Support macro: “Your price is changing from `[old_price]` to `[new_price]` on `[effective_date]`. This reflects `[specific value drivers]`. You can review options here: `[migration/cancel/help link]`.”
- Save-offer macro: “Based on your account, you may be eligible for `[offer]` through `[expiry]`. This is optional and does not limit your ability to cancel.”
- Enterprise AE talk track: “We are aligning legacy pricing to current packaging and service investment. Here is your usage, value received, new commercial structure, and available migration path.”
- Escalation triggers: legal complaint, disputed notice, invoice shock, ARR above threshold, public/social complaint, accessibility issue, or refund demand.

---

## Event schema and reporting

Track events:  
`subscription_price_increase_scoped`, `subscription_price_increase_cohort_segmented`, `subscription_price_increase_notice_delivered`, `subscription_price_increase_consent_recorded`, `subscription_save_offer_shown`, `subscription_save_offer_accepted`, `subscription_price_increase_renewal_observed`, `subscription_price_increase_retention_reviewed`.

Properties:  
`account_id, subscription_id, plan_id, billing_channel, cohort_id, old_price, new_price, contract_type, renewal_date, notice_version, consent_required, migration_offer_id, save_offer_id, cancellation_reason, refund_status, support_topic, churn_status, net_revenue_status`.

Reporting:  
- Weekly pre-renewal: notice coverage, suppressed accounts, exception volume.  
- Weekly post-launch: churn, contraction, uplift, refunds, credits, complaints, support tickets.  
- Monthly executive readout: ARR uplift, NRR, GRR, logo retention, save-offer cost, migration rate, enterprise exceptions, cohort lessons.
