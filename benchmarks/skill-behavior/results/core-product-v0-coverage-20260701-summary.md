# Core Product v0 Coverage Milestone

The public benchmark corpus now has at least one scored result for every `core-product-v0` task. This is an evidence milestone, not a Useful or SOTA claim.

## Coverage

- Unique task coverage: 20 / 20
- Result files: 9
- Duplicate rerun task IDs: `mobile-first-permission-onboarding-001`, `subscription-entitlement-cross-platform-001`, `subscription-pricing-saas-001`
- Claim tier supported: Benchmarked

## Duplicate-free unique-suite snapshot

Using one non-rerun result per task, the duplicate-free 20-task snapshot reports:

- Samples: 20
- Unique task coverage: 20
- Average baseline score: 4.15
- Average skill-loaded score: 4.64
- Average delta: +0.49
- Skill win rate: 80.0%
- Non-regression rate: 90.0%
- Critical failure delta: 9 fewer failures with skill-loaded outputs
- Positive trigger recall: 100.0%
- Negative-control over-trigger rate: 0.0%
- Useful-claim gates: sampleDepth=pass, winRate=pass, avgDelta=fail, criticalFailures=pass, overTrigger=pass

Because average delta is below +0.50 and historical unique coverage includes regressions, the repository remains **Benchmarked**, not Useful.

## Current known weak spots

- `desktop-os-integration`: latest unique run regressed because skill-loaded output missed an explicit regression test plan.
- `notification-strategy-review`: tied a strong baseline; future tasks should include harder edge cases.
- `marketplace-payouts-review`: tied a strong baseline; future tasks should include harder payout dispute, tax, reserve, and clawback cases.
- Low-delta but non-regressing areas: payment ledger, price increase retention, skill marketplace, Steam launch.

## Next SOTA work

1. Improve `desktop-os-integration` from the observed failure mode.
2. Rerun `desktop-os-integration-release-001` as before/after evidence.
3. Add a duplicate-aware current-suite composition tool or report so fixed reruns can supersede older samples without double-counting.
4. Only consider a Useful claim after duplicate-free current-suite evidence passes all gates.
