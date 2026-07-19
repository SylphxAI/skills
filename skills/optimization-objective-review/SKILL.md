---
name: optimization-objective-review
description: "Design or audit a metric, KPI, score, reward, ranking, completion predicate, gate, evaluator, or automated optimization target for Goodhart effects, reward hacking, specification gaming, and harmful trade-offs, producing an Optimization Objective Contract. Use when agents, models, teams, or automation will actively optimize a measurable target. Do not use for ordinary analytics instrumentation, one product experiment, or a decision that has no optimization mechanism."
---

# Optimization Objective Review

Make the measured target improve the real outcome even after an optimizer learns
its weaknesses. Read
[references/optimization-objective-methods.md](references/optimization-objective-methods.md)
for proxy-failure patterns and evaluation methods.

## Method

1. State the true outcome, affected parties, decision or action controlled by
   the objective, optimizer capabilities, time horizon, and unacceptable harm.
2. Decompose the objective into observable proxies, constraints, countermetrics,
   and unmeasured assumptions. Mark which fields are causal goals versus
   diagnostic indicators.
3. Model how a capable optimizer can improve the score without improving the
   outcome: regressional, extremal, causal, and adversarial Goodhart effects;
   data leakage; selective reporting; evaluator exploitation; and burden shifting.
4. Test candidate objectives on historical counterexamples, synthetic attacks,
   distribution shifts, subgroup outcomes, and plausible optimizer strategies.
   Include hidden or orthogonal checks when public checks are gameable.
5. Choose the smallest objective set that remains decision-useful. Prefer a
   constrained multi-measure contract over one composite score when aggregation
   would hide a floor violation.
6. Bind action thresholds, abstention or escalation conditions, uncertainty,
   sampling and freshness rules, auditability, and consequences of missing data.
7. Define launch, monitoring, recalibration, and retirement triggers. A changed
   objective, evaluator, population, model, or incentive requires revalidation.

## Output

Produce one **Optimization Objective Contract** containing:

- real outcome, optimizer, population, action, horizon, and protected floors;
- proxy and causal map with assumptions;
- primary measures, constraints, countermetrics, and non-aggregable vetoes;
- gaming and Goodhart threat model;
- test corpus, hidden checks, distribution and subgroup tests;
- thresholds, uncertainty, missing-data behavior, and human or agent escalation;
- monitoring, recalibration, change control, and retirement rules.

## Boundaries

- This skill owns the optimization contract, not general telemetry collection.
- Use `product-analytics-instrumentation-review` to implement product events and
  measurement plumbing.
- Use `product-experiment-review` when estimating the causal effect of a product
  intervention on users.
- Use `skill-eval-designer` when the optimized artifact is specifically a Skill
  routing or behavior evaluation.
- Use `decision-quality-standard` to choose among material business or technical
  options after the objective supplies trustworthy evidence.
- Use `decision-optimization-modeling` for decision variables, mathematical
  constraints, solver execution, and independent solution verification. This
  Skill owns the real-outcome, proxy, Goodhart, gaming, and protected-floor
  contract that the decision model consumes.
- When both Skills apply but a standalone objective audit was not requested,
  integrate the material objective-contract fields into the Constrained
  Decision Model rather than emitting a duplicate report.
- Do not claim that more metrics eliminate value judgments. Preserve explicit
  floors and decision ownership.
