# subscription-price-increase-retention-review behavior example

skill: subscription-price-increase-retention-review

## Positive prompt

> Plan subscription price-increase retention for SaaS and mobile subscribers across direct, App Store, and Google Play billing with cohort segmentation, grandfathering, save offers, annual migration, cancellation recovery, consent notices, support scripts, refunds, churn monitoring, and net revenue guardrails.

## Weak baseline

A weak generic answer would:

- give broad advice without loading the skill workflow;
- skip the skill reference structure and stable rule IDs;
- miss the concrete artifacts expected for this domain;
- fail to separate risks, tradeoffs, and validation checks.

## Skill-shaped output

A strong answer after loading the skill should:

- Defines affected plans/cohorts, price sensitivity, billing channels, consent/notice timing, value narrative, grandfathering, save offers, cancellation recovery, support scripts, refund paths, experiments, and net-revenue/churn monitoring.
- Builds explicit cohort and channel-rule matrices covering billing channel, region, renewal window, churn risk, direct billing, App Store, Google Play, consent/no-action states, cancellation, refunds, and verification evidence.
- Separates discounted, grandfathered, sales-exception, enterprise-contract, usage-overage, hardship, and standard cohorts with approval owners and migration/exception paths.
- Includes support and sales scripts with allowed concessions, escalation owners, approval thresholds, and exception audit fields.
- Defines rollback and mitigation triggers for churn, downgrade, complaints, refunds, failed renewals, support load, sales escalations, and net-revenue guardrail breaches.
- Separates broad increase, cohort-specific increase, grandfathering sunset, annual migration, packaging change, trial-to-paid change, regional adjustment, and churn recovery paths.
- Flags headline-revenue bias, hidden price messaging, platform rule assumptions, dark-pattern cancellation, save-offer leakage, churn/support/refund blind spots, and missing cohort readback.

It should also produce the artifact shape requested by `skills/subscription-price-increase-retention-review/SKILL.md`, such as a review, state model, decision table, event schema, checklist, or implementation-ready plan.

## Negative trigger

> Run release freeze change control.

The skill should not load for this prompt unless the user adds an explicit subscription-price-increase-retention-review context.

## Expected behavior

- Defines affected plans/cohorts, price sensitivity, billing channels, consent/notice timing, value narrative, grandfathering, save offers, cancellation recovery, support scripts, refund paths, experiments, and net-revenue/churn monitoring.
- Builds explicit cohort and channel-rule matrices covering billing channel, region, renewal window, churn risk, direct billing, App Store, Google Play, consent/no-action states, cancellation, refunds, and verification evidence.
- Separates discounted, grandfathered, sales-exception, enterprise-contract, usage-overage, hardship, and standard cohorts with approval owners and migration/exception paths.
- Includes support and sales scripts with allowed concessions, escalation owners, approval thresholds, and exception audit fields.
- Defines rollback and mitigation triggers for churn, downgrade, complaints, refunds, failed renewals, support load, sales escalations, and net-revenue guardrail breaches.
- Separates broad increase, cohort-specific increase, grandfathering sunset, annual migration, packaging change, trial-to-paid change, regional adjustment, and churn recovery paths.
- Flags headline-revenue bias, hidden price messaging, platform rule assumptions, dark-pattern cancellation, save-offer leakage, churn/support/refund blind spots, and missing cohort readback.
