# Experiment Design Patterns

## Experiment state machine

```text
problem_framed -> hypothesis_written -> metrics_selected -> instrumentation_ready -> experiment_launched -> data_mature -> decision_review -> action_taken
        |                  |                    |                      |                 |              |
        v                  v                    v                      v                 v              v
 no_test_needed      hypothesis_unclear   guardrail_blocker      launch_aborted   underpowered   rollback_or_iterate
```

## Rule IDs

- `experiment-1` — Start from the product decision; if the decision will not change, do not run the experiment.
- `experiment-2` — Write the mechanism: why the change should move the metric.
- `experiment-3` — Pick one primary metric and a short list of guardrails before launch.
- `experiment-4` — Define the unit of randomization and analysis: user, account, device, session, region, or time window.
- `experiment-5` — Exclude users only with a predeclared reason; hidden filtering creates false confidence.
- `experiment-6` — Use holdouts for lifecycle, pricing, notifications, or marketplace ranking where spillover matters.
- `experiment-7` — Do not peek repeatedly without a decision rule; early movement is not proof.
- `experiment-8` — Segment readouts should explain heterogeneity, not cherry-pick winners.
- `experiment-9` — Guardrails around trust, payments, retention, support, fairness, and performance can veto a primary metric win.
- `experiment-10` — Every experiment ends with a learning artifact, even when the result is inconclusive.

## Decision table

| Situation | Best design | Decision rule | Risk control |
| --- | --- | --- | --- |
| UI copy or layout change | A/B test | Ship if primary improves and guardrails hold | Segment by device/source |
| Notification cadence | Holdout or randomized policy | Ship only if retained action rises without fatigue | Frequency cap and unsubscribe guardrail |
| Pricing/package change | Cohort or market test | Use retained revenue and support load | Avoid unfair hidden price discrimination |
| Marketplace ranking | Interleaving, holdout, or staged rollout | Balance conversion, quality, creator fairness | Monitor concentration and complaints |
| High-risk payment/auth change | Staged rollout with rollback | Expand only if error/support rates stable | Kill switch and support macro |
| Low-traffic product | Qualitative pilot or pre/post | Treat as directional learning | Do not overclaim statistical proof |

## Experiment checklist

- Decision, hypothesis, owner, and non-goals are explicit.
- Primary metric, guardrails, analysis window, and stopping rule are written before launch.
- Exposure, eligibility, sample pollution, and instrumentation QA are reviewed.
- Support, rollback, and communication paths exist for harmful variants.
- Results include confidence, caveats, segments, decision, and follow-up.

## Event schema

Track: `experiment_spec_created`, `experiment_metric_defined`, `experiment_instrumentation_verified`, `experiment_exposure_started`, `experiment_guardrail_triggered`, `experiment_sample_matured`, `experiment_decision_recorded`, `experiment_variant_shipped`, `experiment_rolled_back`, `experiment_learning_logged`.

Minimum properties: experiment ID, variant, exposure unit, eligibility, segment, primary metric, guardrails, owner, decision rule, result, caveat, and action.
