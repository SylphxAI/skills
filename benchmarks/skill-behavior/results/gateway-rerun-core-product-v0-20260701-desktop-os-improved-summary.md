# Gateway Rerun: Desktop OS Integration Improved

This rerun checks whether the `desktop-os-integration` skill revision fixed the regression found in `gateway-shard-core-product-v0-20260701-platform-analytics.json` for `desktop-os-integration-release-001`.

It is **before/after iteration evidence**, not extra repository-level sample depth. The run has clean git provenance for commit `83b1b04bed8f7c6203e6b5fe2ac44e5372e5602e` and should supersede the earlier desktop OS task only in current-suite analysis.

## Result

- Samples: 1
- Unique task coverage: 1
- Average baseline score: 4.10
- Average skill-loaded score: 5.00
- Average delta: +0.90
- Skill win rate: 100.0%
- Non-regression rate: 100.0%
- Critical failure delta: +1 (1 baseline vs 0 skill-loaded)
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Claim tier supported by this file alone: Benchmarked

## Task row

| Task | Skill | Baseline | Skill-loaded | Delta | Preference |
| --- | --- | ---: | ---: | ---: | --- |
| `desktop-os-integration-release-001` | `desktop-os-integration` | 4.10 | 5.00 | +0.90 | skill |

## Interpretation

The previous run scored the skill-loaded answer at 4.45 with a critical failure: missing explicit regression test plan. After adding regression-test requirements to the skill workflow, output format, reference matrix, eval, and behavior example, the rerun scored the skill-loaded answer at 5.00 with no critical failures.

This supports the next step: add a current-suite composer that selects one current sample per task so the repository can report duplicate-free claim gates without treating reruns as extra sample depth.
