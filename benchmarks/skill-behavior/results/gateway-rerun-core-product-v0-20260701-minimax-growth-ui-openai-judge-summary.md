
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-minimax-growth-ui-openai-judge.json

# Skill Behavior Benchmark Summary

- Samples: 5
- Unique task coverage: 5
- Average baseline score: 3.28
- Average skill-loaded score: 4.70
- Average delta: 1.42 (95% bootstrap CI 1.02 to 1.82)
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 10 (10 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 253, skill-loaded avg 1508, added 1255 (5/5 samples)
- Answer output tokens: baseline avg 1600, skill-loaded avg 1210, delta -391 (5/5 samples)
- Answer total tokens: baseline avg 1854, skill-loaded avg 2718, delta 864 (5/5 samples)
- Quality efficiency: 1.13 score delta per 1k added input tokens
- Answer latency: baseline avg 23.92s, skill-loaded avg 20.19s, delta -3.74s (5/5 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(1/2 suites >=5), modelOverlap=fail(0/5 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| interface-craft-checkout-review-001 | interface-craft | 3.00 | 5.00 | 2.00 | skill |
| refund-entitlement-support-001 | refund-and-support-flow-review | 3.00 | 4.00 | 1.00 | skill |
| promotion-campaign-subscription-001 | promotion-campaign-review | 4.00 | 5.00 | 1.00 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 3.40 | 4.50 | 1.10 | skill |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.00 | 5.00 | 2.00 | skill |
