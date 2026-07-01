
> benchmark:summarize
> node scripts/summarize-benchmark-results.mjs benchmarks/skill-behavior/results/gateway-rerun-core-product-v0-20260701-lumen-overlap-guidance.json

# Skill Behavior Benchmark Summary

- Samples: 4
- Unique task coverage: 4
- Average baseline score: 3.72
- Average skill-loaded score: 4.75
- Average delta: 1.02 (95% bootstrap CI 0.25 to 1.54)
- Skill win rate: 75.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 90, skill-loaded avg 1253, added 1163 (4/4 samples)
- Answer output tokens: baseline avg 1611, skill-loaded avg 1940, delta 329 (4/4 samples)
- Answer total tokens: baseline avg 1701, skill-loaded avg 3193, delta 1492 (4/4 samples)
- Quality efficiency: 0.88 score delta per 1k added input tokens
- Answer latency: baseline avg 44.60s, skill-loaded avg 66.32s, delta 21.71s (4/4 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=pass, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(0/2 suites >=5), modelOverlap=fail(0/4 shared tasks), ciLowerAboveZero=pass, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| interface-craft-checkout-review-001 | interface-craft | 4.50 | 4.50 | 0.00 | tie |
| promotion-campaign-subscription-001 | promotion-campaign-review | 3.63 | 5.00 | 1.38 | skill |
| subscription-pricing-saas-001 | saas-subscription-pricing | 3.63 | 4.63 | 1.00 | skill |
| mobile-first-permission-onboarding-001 | mobile-first-ui-review | 3.14 | 4.86 | 1.71 | skill |
