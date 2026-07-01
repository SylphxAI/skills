# Skill Behavior Benchmark Summary

- Samples: 1
- Unique task coverage: 1
- Average baseline score: 4.63
- Average skill-loaded score: 4.88
- Average delta: 0.25
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: 0 (0 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Answer input tokens: baseline avg 101, skill-loaded avg 1731, added 1630 (1/1 samples)
- Answer output tokens: baseline avg 2166, skill-loaded avg 2183, delta 17 (1/1 samples)
- Answer total tokens: baseline avg 2267, skill-loaded avg 3914, delta 1647 (1/1 samples)
- Quality efficiency: 0.15 score delta per 1k added input tokens
- Answer latency: baseline avg 58.16s, skill-loaded avg 56.54s, delta -1.61s (1/1 samples)
- Claim tier supported by this data: Benchmarked
- Claim depth scope: insufficient
- Useful-claim gates: sampleDepth=fail, winRate=pass, avgDelta=fail, criticalFailures=pass, overTrigger=pass
- SOTA-candidate gates: useful=fail, suiteDepth=fail(0/2 suites >=5), modelOverlap=fail(0/1 shared tasks), ciLowerAboveZero=fail, overTrigger=pass

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| refund-entitlement-support-001 | refund-and-support-flow-review | 4.63 | 4.88 | 0.25 | skill |
