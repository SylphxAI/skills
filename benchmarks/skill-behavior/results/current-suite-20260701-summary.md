
> benchmark:summarize:current
> node scripts/summarize-benchmark-results.mjs --current-suite benchmarks/skill-behavior/results/gateway-calibration-interface-craft-20260701.json benchmarks/skill-behavior/results/gateway-hard-product-v0-20260701.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-desktop-os-improved.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-entitlement-improved.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-marketplace-payout-guidance.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-overlap-guidance.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-overlap-marketplace-ops.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-refund-guidance.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-growth-ui-openai-judge.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-revenue-trust-judge-schema.json benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-pricing-mobile-improved.json benchmarks/skill-behavior/results/gateway-rerun-hard-product-v0-20260701-marketplace-payouts-audit.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-growth-pricing-mobile.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-lifecycle-retention.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-marketplace-ops.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-platform-analytics.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-refund-budgeted.json benchmarks/skill-behavior/results/gateway-shard-core-product-v0-20260701-revenue-trust.json

# Skill Behavior Benchmark Summary

- Selection mode: current-suite
- Selection rule: prefer clean git provenance, then newest runner completion time, then run/file lexical order
- Superseded samples excluded: 26
- Superseded task IDs: app-store-launch-readiness-001, board-metrics-operating-001, desktop-os-integration-release-001, developer-quota-credit-abuse-001, interface-craft-checkout-review-001, marketplace-payout-tax-hold-001, marketplace-payouts-creator-001, mobile-first-permission-onboarding-001, notification-lifecycle-growth-001, payment-platform-webhook-ledger-001, promotion-campaign-subscription-001, refund-entitlement-support-001, release-freeze-control-001, skill-marketplace-creator-001, subscription-entitlement-cross-platform-001, subscription-price-increase-retention-001, subscription-pricing-saas-001
- Samples: 25
- Unique task coverage: 25
- Average baseline score: 3.82
- Average skill-loaded score: 4.72
- Average delta: 0.90 (95% bootstrap CI 0.64 to 1.20)
- Skill win rate: 96.0%
- Non-regression rate: 100.0%
- Critical failure delta: 13 (13 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 188, skill-loaded avg 1399, added 1211 (25/25 samples)
- Answer output tokens: baseline avg 1707, skill-loaded avg 1500, delta -206 (25/25 samples)
- Answer total tokens: baseline avg 1895, skill-loaded avg 2899, delta 1005 (25/25 samples)
- Quality efficiency: 0.74 score delta per 1k added input tokens
- Answer latency: baseline avg 46.68s, skill-loaded avg 30.14s, delta -16.53s (25/25 samples)
- Claim tier supported by this data: Useful
- Claim depth scope: suite
- Useful-claim gates: sampleDepth=pass, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=pass, suiteDepth=pass, modelOverlap=fail(10/20 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| app-store-launch-readiness-001 | app-store-distribution-readiness | 4.00 | 4.13 | 0.13 | skill |
| backup-restore-customer-data-001 | backup-restore-design | 4.20 | 5.00 | 0.80 | skill |
| board-metrics-operating-001 | board-metrics-operating-review | 1.25 | 4.50 | 3.25 | skill |
| daily-reward-streak-economy-001 | daily-reward-and-streak-review | 3.90 | 4.90 | 1.00 | skill |
| desktop-os-integration-release-001 | desktop-os-integration | 4.10 | 5.00 | 0.90 | skill |
| developer-quota-credit-abuse-001 | developer-quota-credit-abuse-review | 4.63 | 5.00 | 0.38 | skill |
| interface-craft-checkout-review-001 | interface-craft | 3.00 | 5.00 | 2.00 | skill |
| marketplace-payout-tax-hold-001 | marketplace-payouts-review | 4.50 | 4.64 | 0.14 | skill |
| marketplace-payouts-creator-001 | marketplace-payouts-review | 4.14 | 5.00 | 0.86 | skill |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.00 | 5.00 | 2.00 | skill |
| notification-lifecycle-growth-001 | notification-strategy-review | 4.20 | 4.40 | 0.20 | skill |
| notification-permission-fatigue-recovery-001 | notification-strategy-review | 4.50 | 4.80 | 0.30 | skill |
| payment-platform-webhook-ledger-001 | payment-platform-readiness | 4.00 | 5.00 | 1.00 | skill |
| payment-webhook-entitlement-race-001 | payment-platform-readiness | 4.70 | 5.00 | 0.30 | skill |
| product-analytics-revenue-funnel-001 | product-analytics-instrumentation-review | 4.19 | 4.74 | 0.55 | skill |
| promotion-campaign-subscription-001 | promotion-campaign-review | 4.00 | 5.00 | 1.00 | skill |
| refund-entitlement-support-001 | refund-and-support-flow-review | 3.00 | 4.00 | 1.00 | skill |
| release-freeze-control-001 | release-freeze-change-control-review | 4.00 | 5.00 | 1.00 | skill |
| skill-marketplace-creator-001 | skill-marketplace-creator | 2.63 | 4.25 | 1.63 | skill |
| steam-demo-refund-review-risk-001 | steam-launch-readiness | 4.43 | 4.93 | 0.50 | skill |
| steam-launch-commercial-readiness-001 | steam-launch-readiness | 4.44 | 4.69 | 0.25 | skill |
| subscription-entitlement-cross-platform-001 | subscription-entitlement-review | 3.10 | 4.80 | 1.70 | skill |
| subscription-price-increase-grandfathering-001 | subscription-price-increase-retention-review | 4.30 | 4.84 | 0.54 | skill |
| subscription-price-increase-retention-001 | subscription-price-increase-retention-review | 4.00 | 4.00 | 0.00 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 3.40 | 4.50 | 1.10 | skill |
