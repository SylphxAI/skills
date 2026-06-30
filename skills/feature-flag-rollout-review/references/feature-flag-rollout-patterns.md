# Feature Flag Rollout Patterns

## Feature flag state machine

```text
flag_proposed -> flag_created -> internal_enabled -> canary_enabled -> staged_rollout -> full_enabled -> cleanup_due -> flag_removed
      |              |                |                 |                 |             |
      v              v                v                 v                 v             v
 rejected      owner_missing     guardrail_failed   rollout_paused   killed_off   cleanup_overdue
```

## Rule IDs

- `flag-rollout-1` — Classify the flag type: release, experiment, ops kill switch, permission, migration, config, or entitlement.
- `flag-rollout-2` — Define the exposure unit before targeting: user, account, workspace, device, session, region, environment, or cohort.
- `flag-rollout-3` — Every non-trivial flag needs owner, purpose, default state, dependency, metrics, and removal date.
- `flag-rollout-4` — Rollout gates must include product, reliability, support, payment, trust, and performance guardrails when relevant.
- `flag-rollout-5` — Kill switches must fail safe and be operable without a full deploy.
- `flag-rollout-6` — Experiment flags need stable assignment, holdouts, and analysis rules.
- `flag-rollout-7` — Permission/entitlement flags must not bypass billing, authorization, or compliance boundaries.
- `flag-rollout-8` — Migration flags need dual-read/write or data consistency checks before removal.
- `flag-rollout-9` — Support and customer-facing teams need visibility into exposure and known issues.
- `flag-rollout-10` — Flag debt is product risk; stale flags need cleanup ownership and CI/reporting.

## Decision table

| Scenario | Flag type | Rollout action | Guardrail | Cleanup |
| --- | --- | --- | --- | --- |
| New UI component | Release flag | Internal -> 5% -> 25% -> 100% | Errors, conversion, support | Remove after stable |
| Pricing test | Experiment flag | Stable randomized cohorts | Revenue, refunds, support, trust | Keep only winning config |
| Risky AI feature | Release plus kill switch | Staff -> beta -> opt-in | Safety, quality, latency, cost | Keep kill switch until mature |
| Data migration | Migration flag | Shadow/dual mode -> switch | Reconciliation and rollback | Remove after backfill proof |
| Enterprise beta | Permission flag | Named accounts | Support and contractual caveats | Convert to plan/entitlement |
| Incident mitigation | Ops kill switch | Disable quickly | Recovery metric | Keep documented emergency switch |

## Rollout checklist

- Flag name, type, owner, default, and removal date are documented.
- Targeting rules are understandable and auditable.
- Metrics and guardrails are live before exposure.
- Rollback can be executed by the right operator.
- Support, analytics, and release notes reflect exposure state.
- Cleanup issue exists before full rollout.

## Event schema

Track: `feature_flag_created`, `feature_flag_targeting_changed`, `feature_flag_exposed`, `feature_flag_guardrail_triggered`, `feature_flag_rollout_paused`, `feature_flag_kill_switch_used`, `feature_flag_full_rollout_completed`, `feature_flag_cleanup_due`, `feature_flag_removed`.

Minimum properties: flag key, type, owner, exposure unit, target rule, stage, variant, metric, guardrail result, decision, and cleanup deadline.
