# Skill Behavior Benchmark Summary

- Selection mode: current-suite
- Selection rule: prefer clean git provenance, then newest runner completion time, then run/file lexical order
- Superseded samples excluded: 57
- Superseded task IDs: app-store-launch-readiness-001, backup-restore-customer-data-001, board-metrics-operating-001, daily-reward-streak-economy-001, desktop-os-integration-release-001, developer-quota-credit-abuse-001, interface-craft-checkout-review-001, marketplace-payout-tax-hold-001, marketplace-payouts-creator-001, mobile-first-permission-onboarding-001, notification-lifecycle-growth-001, notification-permission-fatigue-recovery-001, payment-platform-webhook-ledger-001, payment-webhook-entitlement-race-001, product-analytics-revenue-funnel-001, promotion-campaign-subscription-001, refund-entitlement-support-001, release-freeze-control-001, skill-marketplace-creator-001, steam-demo-refund-review-risk-001, steam-launch-commercial-readiness-001, subscription-entitlement-cross-platform-001, subscription-price-increase-grandfathering-001, subscription-price-increase-retention-001, subscription-pricing-saas-001
- Samples: 28
- Unique task coverage: 28
- Average baseline score: 3.54
- Average skill-loaded score: 5.00
- Average delta: 1.46 (95% bootstrap CI 1.25 to 1.68)
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 29 (29 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 262, skill-loaded avg 2685, added 2423 (28/28 samples)
- Answer output tokens: baseline avg 1493, skill-loaded avg 1443, delta -50 (28/28 samples)
- Answer total tokens: baseline avg 1755, skill-loaded avg 4128, delta 2373 (28/28 samples)
- Quality efficiency: 0.60 score delta per 1k added input tokens
- Answer latency: baseline avg 24.05s, skill-loaded avg 19.25s, delta -4.79s (28/28 samples)
- Claim tier supported by this data: SOTA candidate
- Claim depth scope: suite
- Useful-claim gates: sampleDepth=pass, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=pass, suiteDepth=pass, modelOverlap=pass, ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 4.00 | 5.00 | 1.00 | skill |
| backup-restore-customer-data-001 | backup-restore-design | 4.00 | 5.00 | 1.00 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 3.00 | 5.00 | 2.00 | skill |
| daily-reward-streak-economy-001 | daily-reward-and-streak-review | 3.00 | 5.00 | 2.00 | skill |
| desktop-os-integration-release-001 | desktop-os-integration | 4.00 | 5.00 | 1.00 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 3.00 | 5.00 | 2.00 | skill |
| interface-craft-checkout-review-001 | interface-craft | 3.00 | 5.00 | 2.00 | skill |
| marketplace-payout-abuse-appeal-001 | marketplace-payouts-review | 3.00 | 5.00 | 2.00 | skill |
| marketplace-payout-compliance-release-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| marketplace-payout-provider-outage-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| marketplace-payout-tax-hold-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.00 | 5.00 | 1.00 | skill |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.00 | 5.00 | 2.00 | skill |
| notification-lifecycle-growth-001 | notification-strategy-review | 3.00 | 5.00 | 2.00 | skill |
| notification-permission-fatigue-recovery-001 | notification-strategy-review | 4.00 | 5.00 | 1.00 | skill |
| payment-platform-webhook-ledger-001 | payment-platform-readiness | 4.00 | 5.00 | 1.00 | skill |
| payment-webhook-entitlement-race-001 | payment-platform-readiness | 3.00 | 5.00 | 2.00 | skill |
| product-analytics-revenue-funnel-001 | product-analytics-instrumentation-review | 4.00 | 5.00 | 1.00 | skill |
| promotion-campaign-subscription-001 | promotion-campaign-review | 4.00 | 5.00 | 1.00 | skill |
| refund-entitlement-support-001 | refund-and-support-flow-review | 4.00 | 5.00 | 1.00 | skill |
| release-freeze-control-001 | release-freeze-change-control-review | 4.00 | 5.00 | 1.00 | skill |
| skill-marketplace-creator-001 | skill-marketplace-creator | 4.00 | 5.00 | 1.00 | skill |
| steam-demo-refund-review-risk-001 | steam-launch-readiness | 3.00 | 5.00 | 2.00 | skill |
| steam-launch-commercial-readiness-001 | steam-launch-readiness | 3.00 | 5.00 | 2.00 | skill |
| subscription-entitlement-cross-platform-001 | subscription-entitlement-review | 2.00 | 5.00 | 3.00 | skill |
| subscription-price-increase-grandfathering-001 | subscription-price-increase-retention-review | 4.00 | 5.00 | 1.00 | skill |
| subscription-price-increase-retention-001 | subscription-price-increase-retention-review | 4.00 | 5.00 | 1.00 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 3.00 | 5.00 | 2.00 | skill |
