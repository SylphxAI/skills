# Skill Behavior Benchmark Summary

- Selection mode: current-suite
- Selection rule: prefer clean git provenance, then newest runner completion time, then run/file lexical order
- Superseded samples excluded: 46
- Superseded task IDs: app-store-launch-readiness-001, backup-restore-customer-data-001, board-metrics-operating-001, daily-reward-streak-economy-001, desktop-os-integration-release-001, developer-quota-credit-abuse-001, interface-craft-checkout-review-001, marketplace-payout-tax-hold-001, marketplace-payouts-creator-001, mobile-first-permission-onboarding-001, notification-lifecycle-growth-001, notification-permission-fatigue-recovery-001, payment-platform-webhook-ledger-001, product-analytics-revenue-funnel-001, promotion-campaign-subscription-001, refund-entitlement-support-001, release-freeze-control-001, skill-marketplace-creator-001, steam-demo-refund-review-risk-001, steam-launch-commercial-readiness-001, subscription-entitlement-cross-platform-001, subscription-price-increase-grandfathering-001, subscription-price-increase-retention-001, subscription-pricing-saas-001
- Samples: 25
- Unique task coverage: 25
- Average baseline score: 3.66
- Average skill-loaded score: 4.84
- Average delta: 1.18 (95% bootstrap CI 0.99 to 1.39)
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 22 (24 baseline vs 2 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 226, skill-loaded avg 1979, added 1753 (25/25 samples)
- Answer output tokens: baseline avg 1669, skill-loaded avg 1399, delta -270 (25/25 samples)
- Answer total tokens: baseline avg 1895, skill-loaded avg 3378, delta 1483 (25/25 samples)
- Quality efficiency: 0.68 score delta per 1k added input tokens
- Answer latency: baseline avg 30.11s, skill-loaded avg 24.14s, delta -5.97s (25/25 samples)
- Claim tier supported by this data: SOTA candidate
- Claim depth scope: suite
- Useful-claim gates: sampleDepth=pass, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=pass, suiteDepth=pass, modelOverlap=pass, ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 3.00 | 4.00 | 1.00 | skill |
| backup-restore-customer-data-001 | backup-restore-design | 4.00 | 5.00 | 1.00 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 3.00 | 4.00 | 1.00 | skill |
| daily-reward-streak-economy-001 | daily-reward-and-streak-review | 3.00 | 5.00 | 2.00 | skill |
| desktop-os-integration-release-001 | desktop-os-integration | 4.00 | 5.00 | 1.00 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 2.00 | 4.00 | 2.00 | skill |
| interface-craft-checkout-review-001 | interface-craft | 3.00 | 5.00 | 2.00 | skill |
| marketplace-payout-tax-hold-001 | marketplace-payouts-review | 4.60 | 5.00 | 0.40 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.00 | 5.00 | 2.00 | skill |
| notification-lifecycle-growth-001 | notification-strategy-review | 3.00 | 5.00 | 2.00 | skill |
| notification-permission-fatigue-recovery-001 | notification-strategy-review | 4.31 | 4.81 | 0.50 | skill |
| payment-platform-webhook-ledger-001 | payment-platform-readiness | 4.00 | 5.00 | 1.00 | skill |
| payment-webhook-entitlement-race-001 | payment-platform-readiness | 4.70 | 5.00 | 0.30 | skill |
| product-analytics-revenue-funnel-001 | product-analytics-instrumentation-review | 4.00 | 5.00 | 1.00 | skill |
| promotion-campaign-subscription-001 | promotion-campaign-review | 4.00 | 5.00 | 1.00 | skill |
| refund-entitlement-support-001 | refund-and-support-flow-review | 4.00 | 5.00 | 1.00 | skill |
| release-freeze-control-001 | release-freeze-change-control-review | 4.00 | 5.00 | 1.00 | skill |
| skill-marketplace-creator-001 | skill-marketplace-creator | 4.00 | 5.00 | 1.00 | skill |
| steam-demo-refund-review-risk-001 | steam-launch-readiness | 4.00 | 4.90 | 0.90 | skill |
| steam-launch-commercial-readiness-001 | steam-launch-readiness | 3.00 | 5.00 | 2.00 | skill |
| subscription-entitlement-cross-platform-001 | subscription-entitlement-review | 3.10 | 4.80 | 1.70 | skill |
| subscription-price-increase-grandfathering-001 | subscription-price-increase-retention-review | 4.30 | 5.00 | 0.70 | skill |
| subscription-price-increase-retention-001 | subscription-price-increase-retention-review | 4.00 | 5.00 | 1.00 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 3.40 | 4.50 | 1.10 | skill |
