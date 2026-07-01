Subscription price-increase context:  
SaaS and mobile subscription price increase across direct billing, Apple App Store, and Google Play. Scope includes monthly and annual plans, active subscribers, renewal timing, consent/notice requirements, grandfathering, save offers, annual migration, cancellation recovery, refunds, support readiness, churn monitoring, and net revenue guardrails.

Audience / source of truth / risk boundary:  
Audience: Product, Growth, Finance, Support, Legal/Compliance, Data, Lifecycle, App Ops.  
Source of truth: billing system, app store subscription records, CRM, entitlement service, lifecycle messaging platform, support ticketing, analytics warehouse.  
Risk boundary: Do not ship increase unless notice, consent, cancellation, refund, support, and monitoring are ready per billing channel and region.

Retention and trust plan:

| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |
| Scope | Segment by plan, channel, region, tenure, usage, renewal date, price delta, support history | Billing + usage warehouse | Cohort blindspot | Pricing Lead |
| Direct billing | Apply increase at next renewal after required notice; consent if legally required | Legal matrix by region | Compliance breach | Legal + Billing |
| App Store | Follow Apple price-increase consent/notification rules; do not assume silent renewal | App Store Connect rules | Subscription lapse | App Ops |
| Google Play | Follow Play price-change migration and user notification/consent requirements | Play Console rules | Forced churn | App Ops |
| Grandfathering | Preserve legacy pricing only for high-tenure/high-LTV or contractual cohorts; set review date | LTV, tenure, NPS, contract terms | Revenue leakage | Finance |
| Phased increase | Use for loyal/high-risk cohorts or large price deltas | Churn forecast | Trust breach | Pricing |
| Save offers | Gate by risk, usage, tenure, and margin; test against holdout | Offer margin model | Training churn threats | Growth |
| Annual migration | Offer annual plan as value-preserving option before monthly increase | Annual uptake, cash-flow model | Bad-fit migration | Lifecycle |
| Cancellation recovery | Transparent flow: explain value, offer options, no obstruction | Cancel funnel data | Dark pattern risk | Product |
| Refunds | Clear policy by channel; store users routed to Apple/Google where applicable | Refund policy + platform rules | Support confusion | Support |
| Monitoring | Track net revenue, churn, refunds, complaints, payment failure, support load | Daily cohort dashboard | False revenue lift | Data |

State machine:

```text
increase_scoped
 -> cohorts_segmented
 -> value_message_prepared
 -> notice_delivered
 -> consent_recorded_if_required
 -> renewal_observed
 -> retention_learned

Failure states:
scope_gap -> pause launch
cohort_blindspot -> resegment
weak_value_story -> revise messaging
consent_gap -> hold affected channel/region
churn_spike -> activate mitigation
learning_gap -> complete post-change readback
```

Decision table:

| Scenario | Policy | Metric | Edge case / support note |
| --- | --- | --- | --- |
| High-tenure, high-LTV | Grandfather, phased increase, or loyalty credit | Logo retention, LTV | “We value your tenure; here is your transition path.” |
| Low-usage monthly | Lower-risk save offer or downgrade path | Cancel rate, reactivation | Highlight unused features, not guilt messaging |
| Heavy-use monthly | Value narrative + annual migration | Annual conversion, ARPU | Emphasize outcomes and product investment |
| Direct-billed renewal soon | Ensure notice window before renewal | Notice delivered, consent status | Delay increase if notice window missed |
| App Store | Use platform-compliant price consent/notification | Consent/lapse rate | Support cannot process Apple refunds directly |
| Google Play | Use Play Console price migration rules | Opt-in/renewal rate | Support routes cancellation/refund appropriately |
| Region with consent requirement | Explicit consent before increase | Consent recorded | No renewal at new price without consent |
| Large price delta | Phase, cap, or annual offer | Churn, complaint rate | Escalate if complaint spike exceeds guardrail |
| Save offer eligible | Time-boxed discount or annual credit | Save acceptance, margin | Holdout required to measure incrementality |
| Cancellation intent | Present transparent options: keep, switch, annual, cancel | Cancel completion, save rate | Cancellation must remain easy |

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:

- Cohort segmentation -> Segment by `plan_id`, old/new price, billing channel, tenure, usage depth, feature adoption, renewal date, region, support sentiment, historical discounting, payment failure risk.
- Value narrative -> Tie increase to concrete improvements: reliability, features shipped, support quality, infrastructure, roadmap investment, plan benefits. Avoid vague “rising costs” as sole justification.
- Notice timing -> Direct: send email/in-app notice before renewal per legal requirement. Apple/Google: use platform mechanisms plus supplemental education where allowed.
- Consent -> Record explicit consent where required; suppress price increase if consent missing.
- Grandfathering -> Contractual and high-tenure exceptions allowed with expiry/review date; no indefinite silent exceptions without owner.
- Annual migration -> Offer annual plan before renewal with clear savings versus new monthly price; disclose renewal terms.
- Save offers -> Eligibility based on churn risk, tenure, margin, and experiment cell. Examples: 3-month bridge discount, one-time loyalty credit, annual upgrade credit, downgrade option.
- Cancellation recovery -> Ask reason, show relevant option, allow immediate cancellation. No hidden buttons, forced calls, or misleading urgency.
- Refund path -> Direct refunds handled by policy; Apple refunds through Apple; Google Play refunds per Play policy/admin tooling. Track partial refunds and goodwill credits separately.
- Support scripts -> Provide macros for “why price changed,” “what value changed,” “how to keep old price if eligible,” “how to switch annual,” “how to cancel,” “how refunds work.”
- Churn monitoring -> Daily by cohort/channel for 30 days pre/post renewal, then weekly for 90 days.
- Net revenue guardrail -> Report gross uplift minus churn, refunds, payment failures, save-offer cost, support cost, store fee impact, and lost expansion.
- Stop-loss guardrail -> Pause or roll back cohort if churn, complaints, refund rate, app review sentiment, or support backlog exceeds agreed thresholds.

Event schema:

```text
subscription_price_increase_scoped
subscription_price_increase_cohort_segmented
subscription_price_increase_notice_delivered
subscription_price_increase_consent_recorded
subscription_save_offer_shown
subscription_save_offer_accepted
subscription_annual_migration_shown
subscription_annual_migration_accepted
subscription_cancellation_intent_started
subscription_cancellation_completed
subscription_refund_requested
subscription_refund_resolved
subscription_price_increase_renewal_observed
subscription_price_increase_retention_reviewed
```

Required properties:

```text
subscription_id, account_id, plan_id, billing_channel, region,
cohort_id, tenure_months, usage_band, old_price, new_price,
price_delta_pct, renewal_date, notice_version, notice_delivered_at,
consent_required, consent_status, save_offer_id, cancellation_reason,
refund_status, support_topic, churn_status, net_revenue_status, decision
```

Launch gates:

- Legal/platform rule matrix approved.
- Cohort and holdout design approved.
- Notices and support macros localized and accessible.
- Refund and escalation paths live.
- Dashboards validated.
- Rollback/pause owner assigned.
