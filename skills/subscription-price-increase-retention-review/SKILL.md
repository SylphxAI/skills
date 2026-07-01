---
name: subscription-price-increase-retention-review
description: Design and audit subscription price-increase retention programs for SaaS, mobile apps, games, and digital subscriptions covering cohort segmentation, value narrative, grandfathering, save offers, annual-plan migration, cancellation recovery, consent/notice timing, support scripts, refund paths, churn monitoring, revenue lift, fairness, and platform compliance. Use when price changes must protect trust and net revenue.
---

# Subscription Price Increase Retention Review

Use this skill to convert subscription price increase, retention plan, grandfathering, save offer, annual migration, churn risk, consent notice, cancellation recovery, support script, refund path, and price-change experiment questions into a concrete artifact with owners, gates, metrics, and recovery paths.

## Workflow

1. Identify affected plans, cohorts, tenure, usage, willingness-to-pay, discount/contract status, billing channel, region, renewal date, churn risk, platform rules, consent/notice requirements, grandfathering choices, save offers, support paths, churn forecast, and guardrail metrics.
2. Read `references/subscription-price-increase-retention-patterns.md`.
3. Classify the situation as broad price increase, cohort-specific increase, grandfathering sunset, annual-plan migration, packaging change, trial-to-paid price change, regional adjustment, or high-risk churn recovery.
4. Build explicit matrices before recommending offers:
   - cohort matrix: plan, tenure, usage/adoption, billing channel, region, renewal window, churn risk, support/refund history, and price-change treatment;
   - discount/contract matrix: list price, current discount, contract term, sales exception, grandfathered status, usage overage exposure, renewal clause, and migration offer;
   - channel rule matrix: direct, App Store, and Google Play notice/consent, cancellation, renewal, refund, receipt/webhook, and fallback states.
5. Decide launch sequence by renewal window: block unverifiable channels, delay cohorts too close to renewal unless notice is already valid, separate contract-governed accounts from self-serve automation, and pre-approve every exception owner.
6. Define cohort strategy, value narrative, notice timeline, consent path, grandfathering/save-offer policy, cancellation recovery, support macros, sales exception thresholds, refund handling, experiment/holdout plan, revenue/churn monitoring, and rollback/mitigation triggers.
7. Produce subscription price-increase retention review, state machine, decision table, event schema, cohort checklist, support plan, and net-revenue monitoring plan.

## Guardrails

- Do not optimize headline revenue lift while ignoring churn, refunds, support load, trust, or long-term LTV.
- Do not hide price increases in vague lifecycle messaging or make cancellation/recovery paths deceptive.
- Do not use save offers that train customers to threaten churn unless eligibility, fairness, and measurement are explicit.
- Do not assume store-billed and direct-billed subscriptions have identical consent, renewal, or cancellation behavior.
- Do not state platform price-change rules as universal facts. Mark App Store and Google Play behavior as channel-specific, region-sensitive, and subject to current store-console/API verification.
- Do not launch a store-billed cohort when the current no-action outcome, refund route, receipt/server-notification signal, or country exception is unknown.
- Do not skip renewal-date and no-action states; define what happens when notice is delivered, consent is pending, consent is accepted, consent is declined, no response is received, renewal succeeds, or renewal fails.
- Do not treat discounted, sales-exception, grandfathered, usage-heavy, and enterprise-contract customers as one cohort.
- Do not launch without pre-agreed mitigation triggers for churn, complaints, refund/support spikes, failed renewals, or sales escalations.

## Output format

```text
Subscription price-increase context:
Audience / source of truth / risk boundary:

Channel rule matrix:
| Channel | Notice/consent | Renewal/no-action outcome | Cancellation/refund route | Evidence to verify |
| --- | --- | --- | --- | --- |

Priority cohort matrix:
| Cohort | Channel/region/renewal window | Churn risk | Treatment | Guardrail |
| --- | --- | --- | --- | --- |

Discount, contract, and exception matrix:
| Segment | Current discount/contract | Price-change treatment | Migration/exception path | Approval owner |
| --- | --- | --- | --- | --- |

Support and sales scripts:
- <scenario> -> <plain-language message, allowed concession, escalation owner, approval threshold>

Offer governance:
| Offer | Eligible cohort | Exclusions | Expiry | Measurement | Abuse/fairness guardrail |
| --- | --- | --- | --- | --- | --- |

Retention and trust plan:
| Area | Decision | Evidence | Risk | Owner |
| --- | --- | --- | --- | --- |

Rollback and mitigation triggers:
- <metric breach> -> <pause, rollback, grandfather extension, save-offer change, sales exception, support escalation, owner>

Cohorts, value narrative, notices, save offers, cancellation recovery, support, refunds, metrics, and guardrails:
- <trigger> -> <policy, metric, edge case, support note>
```
