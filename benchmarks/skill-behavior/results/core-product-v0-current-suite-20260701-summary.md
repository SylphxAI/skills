# Skill Behavior Benchmark Summary

- Selection mode: current-suite
- Selection rule: prefer clean git provenance, then newest runner completion time, then run/file lexical order
- Superseded samples excluded: 4
- Superseded task IDs: desktop-os-integration-release-001, mobile-first-permission-onboarding-001, subscription-entitlement-cross-platform-001, subscription-pricing-saas-001
- Samples: 20
- Unique task coverage: 20
- Average baseline score: 4.11
- Average skill-loaded score: 4.76
- Average delta: 0.65 (95% bootstrap CI 0.45 to 0.92)
- Skill win rate: 90.0%
- Non-regression rate: 100.0%
- Critical failure delta: 13 (13 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this data: Useful
- Claim depth scope: suite
- Useful-claim gates: sampleDepth=pass, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 4.50 | 4.90 | 0.40 | skill |
| backup-restore-customer-data-001 | backup-restore-design | 4.20 | 5.00 | 0.80 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 2.00 | 4.40 | 2.40 | skill |
| daily-reward-streak-economy-001 | daily-reward-and-streak-review | 3.90 | 4.90 | 1.00 | skill |
| desktop-os-integration-release-001 | desktop-os-integration | 4.10 | 5.00 | 0.90 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 4.30 | 4.80 | 0.50 | skill |
| interface-craft-checkout-review-001 | interface-craft | 3.80 | 4.60 | 0.80 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.80 | 4.80 | 0.00 | tie |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.70 | 4.60 | 0.90 | skill |
| notification-lifecycle-growth-001 | notification-strategy-review | 4.70 | 4.70 | 0.00 | tie |
| payment-platform-webhook-ledger-001 | payment-platform-readiness | 4.20 | 4.30 | 0.10 | skill |
| product-analytics-revenue-funnel-001 | product-analytics-instrumentation-review | 4.19 | 4.74 | 0.55 | skill |
| promotion-campaign-subscription-001 | promotion-campaign-review | 3.75 | 4.95 | 1.20 | skill |
| refund-entitlement-support-001 | refund-and-support-flow-review | 4.35 | 4.80 | 0.45 | skill |
| release-freeze-control-001 | release-freeze-change-control-review | 4.10 | 4.90 | 0.80 | skill |
| skill-marketplace-creator-001 | skill-marketplace-creator | 4.50 | 4.75 | 0.25 | skill |
| steam-launch-commercial-readiness-001 | steam-launch-readiness | 4.44 | 4.69 | 0.25 | skill |
| subscription-entitlement-cross-platform-001 | subscription-entitlement-review | 4.10 | 4.90 | 0.80 | skill |
| subscription-price-increase-retention-001 | subscription-price-increase-retention-review | 4.55 | 4.80 | 0.25 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 4.00 | 4.70 | 0.70 | skill |
