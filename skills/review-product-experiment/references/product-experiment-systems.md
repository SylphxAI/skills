# Product Experiment Systems

## Current source check

Before sizing or launching, retrieve the current treatment specification,
governed metric definitions, assignment and exposure contracts, baseline and
variance data, traffic and identity model, active experiment map, product release
calendar, policy/consent constraints, and domain-owner decision. Record exact
version, period, scope, owner, and freshness.

List any missing baseline, variance, effect threshold, guardrail, or assignment
capability in prose. Set sample size and thresholds from authorized inputs, and
start the experiment after the statistical plan can consume the current inputs.

## Experiment state model

```text
decision_framed -> treatment_owned -> estimand_defined -> design_selected
design_selected -> authority_verified -> spec_sealed -> preflight_passed
preflight_passed -> exposure_active -> mature_or_paused -> analysis_sealed
analysis_sealed -> decision_applied -> artifacts_cleaned -> learning_reused

invalid_assignment -> stop_and_diagnose
guardrail_breach -> pause_or_stop
insufficient_precision -> inconclusive_not_winner
material_change -> invalidate_or_reseal
```

## Estimand contract

An estimand states exactly what causal effect the decision needs:

| Field | Question |
| --- | --- |
| Population | who is eligible before assignment? |
| Treatment/control | what exact experiences differ, by version? |
| Assignment unit | person, account, workspace, device, seller, region, time block? |
| Analysis unit | at what unit is uncertainty computed? |
| Exposure | assignment, eligibility, render, delivery, or actual opportunity? |
| Outcome | which governed metric and direction? |
| Window | when does the outcome mature, and from which anchor? |
| Effect | intention-to-treat, treatment-on-treated, non-inferiority, or policy effect? |
| Interference | can one unit's treatment affect another unit's outcome? |
| Missingness | what makes outcomes or exposures absent, and is it treatment-related? |

Default to intention-to-treat for product decisions because it preserves
assignment and includes real noncompliance. Treatment-on-treated requires a
credible identification strategy; comparing accepters with non-accepters is not one.

## Design selection

| Product condition | Candidate design | Assumptions and warning |
| --- | --- | --- |
| Independent stable users/accounts | individual or account randomization | identity and cross-device contamination controlled |
| Team/collaboration spillover | cluster randomization | analyze at cluster level; enough clusters required |
| Shared marketplace/inventory/system | switchback or market/time cluster | time trends, carryover, supply interference modeled |
| Search/ranking comparison | randomized policy, interleaving, or switchback | trust, position effects, shared supply guardrails |
| Lifecycle/notification | persistent holdout or randomized policy | delivery opportunity, fatigue, cross-channel contamination |
| Price/package treatment | authorized cohort/market design | fairness, contracts, channel rules, long maturity |
| Low traffic or rare outcome | qualitative pilot or precision-bounded observation | label directional evidence with its actual evidence class |
| Irreversible or unacceptable harm | no experiment | use policy, simulation, expert evidence, or safer proxy |
| Operational rollout only | staged release owned by delivery | no causal claim unless assignment/comparison is designed |

Switchbacks alternate policies across predeclared time blocks and need washout,
calendar balance, carryover analysis, and correct time-cluster uncertainty.
Interleaving can efficiently compare ranking preferences but does not establish
all long-term ecosystem outcomes.

## Operating method

- Start from a reversible decision and specify actions
  for positive, negative, harmful, invalid, and inconclusive evidence.
- Require an owned treatment artifact; product, pricing, ranking, and policy
  owners supply their design decisions to the experiment.
- Seal population, assignment, exposure, analysis unit,
  outcome, window, estimand, and interference assumptions before exposure.
- Select randomization level and design from the product
  dependency graph; account for spillover, shared inventory, and carryover.
- Use current baseline/variance and business effect
  threshold to size for precision; derive sample and runtime from these current inputs.
- Keep one decision metric, invariant checks, harm
  guardrails, and diagnostics distinct; every metric has owner and maturity.
- Preserve assignment integrity through stable IDs,
  pre-assignment eligibility, sticky allocation, exposure semantics, and ITT.
- Stop and diagnose sample-ratio mismatch or broken
  exposure before interpreting outcomes.
- Predeclare sequential, peeking, early-stop, multiple-
  comparison, segment, missingness, and attrition treatment.
- Report effect size and uncertainty with practical
  importance; a threshold-crossing statistic alone is not the decision.
- Treat guardrail breach as a predeclared action even
  when the primary metric improves.
- Keep novelty, seasonality, release changes, bots,
  crossover, and concurrent experiments visible in the learning memo.
- Automate only sealed preflight, pause, maturity,
  analysis, decision, and cleanup rules against authoritative state.
- Engineering owns flags, allocation, deployment,
  rollback, and live proof; consume exact artifacts rather than duplicating them.
- End every experiment with a durable decision and
  reusable learning, including invalid and inconclusive outcomes.

## Assignment and exposure integrity

The machine-readable assignment contract includes experiment and treatment
versions, namespace, allocation, eligibility revision, assignment unit/key,
variant, sticky/crossover rule, start/end, mutual exclusions, exposure
definition, and owner.

Validate before outcome analysis:

- eligibility was computed before assignment and did not use future outcomes;
- assigned ratios match the sealed plan within its approved check;
- identity merging, shared accounts, devices, bots, QA traffic, and employees are
  handled by a predeclared rule;
- exposure means the unit had a real opportunity to experience the treatment;
- exposure loss, late delivery, noncompliance, crossover, and attrition are
  measured by treatment and remain visible after assignment;
- overlapping tests and product releases are compatible or recorded as conflicts;
- treatment bytes/configuration match the sealed versions.

Sample-ratio mismatch is a validity incident, not a metric to explain away.
Pause interpretation until assignment, eligibility, logging, and identity are
reconciled.

## Metric and maturity contract

| Metric role | Purpose | Decision treatment |
| --- | --- | --- |
| Decision metric | measures the mechanism-relevant outcome | one primary practical decision |
| Invariant | remains stable when assignment/system is healthy | invalidates or diagnoses |
| Harm guardrail | safety, trust, privacy, accessibility, money, reliability, support | can pause or veto |
| Diagnostic | explains mechanism or implementation | does not become winner post hoc |
| Long-term countermetric | catches novelty, fatigue, churn, ecosystem harm | wait for maturity or retain holdout |

Every metric states formula/version, source, unit, eligibility, direction,
baseline period, window, latency, missingness, minimum practical effect,
guardrail action, and owner. Clicks, opens, and short-term conversion are rarely
sufficient when retained value, refunds, support, trust, or supply health matter.

The sample plan consumes current baseline, variance, desired practical effect,
allocation, unit clustering, expected eligibility/exposure, outcome maturity,
and an approved error or precision policy. Report assumptions and sensitivity,
and derive statistical thresholds from the experiment's current decision
context.

## Analysis and decision quality

The sealed analysis should report:

1. Candidate, treatment, data, query, and metric versions.
2. Assignment/exposure integrity, sample-ratio check, contamination, missingness,
   attrition, crossover, and concurrent changes.
3. Eligible, assigned, exposed, and observable populations by variant.
4. Effect size, uncertainty, practical threshold, and maturity.
5. All predeclared guardrails and invariant checks.
6. Predeclared segments with uncertainty and interaction evidence; no winner mining.
7. Novelty, carryover, network, seasonal, and external-validity limits.
8. Applied decision state and cleanup/follow-up action.

Conclude that the experiment is invalid, stopped for harm, actionable in either
direction, shows no practical difference, or remains inconclusive. Treat an
inconclusive result as unresolved product evidence.

## Failure decision table

| Evidence | Decision | Why |
| --- | --- | --- |
| Assignment/exposure invalid | stop, repair, rerun if still decision-relevant | outcomes lack trusted comparison |
| Guardrail breaches | pause/stop and invoke domain recovery | user-harm guardrails prevail over the primary win |
| Estimate precise and below practical threshold | no practical difference | keep complexity proportional to the effect |
| Direction positive but imprecise | inconclusive or continue only under sealed rule | optimism is not evidence |
| Predeclared segment interaction | bounded segment decision if valid and operable | heterogeneous treatment effect may matter |
| Post-hoc segment winner | hypothesis for a new test | selection invalidates confirmatory claim |
| Early proxy wins, long-term outcome immature | wait or keep governed holdout | novelty and delayed harm unresolved |

## Experiment operations

```text
spec_submitted -> schema_and_authority_check -> conflict_check -> preflight
preflight -> launch_blocked | exposure_allowed
exposure_allowed -> invariant_or_guardrail_monitor -> pause_or_continue
continue -> maturity_reached -> sealed_analysis -> decision_rule_applied
decision_rule_applied -> treatment_handoff -> experiment_artifacts_expired
```

Automation validates a well-formed spec and named authority, detects conflicts
or sample-ratio mismatch, pauses on a guardrail breach, closes at maturity,
executes the sealed analysis, applies an explicitly authorized decision, and
cleans up.
Automation uses the predeclared metrics, estimand, eligibility, and owner
authority throughout the experiment. Causal conclusions come from the declared
experimental design.

## Owner handoffs

| Need | Owner artifact |
| --- | --- |
| Treatment content and policy | exact domain-specialist decision |
| Events, identity, metric computation, QA | `review-product-analytics-instrumentation` |
| Assignment service, flags, exposure logs | owning engineering project |
| Deployment, rollback, health, live readback | owning release-path artifact |
| High-risk rights/safety/privacy/AI review | current domain evidence plus applicable binding Skills |
| Price/package architecture | `price-saas-subscription` |
| Notification policy | `review-notification-strategy` |
| Marketplace seller intervention | `review-marketplace-seller-performance` when published |

Each handoff has a stable artifact/version, exact requirement, blocked decision,
acceptance condition, and result reference. Resolve only immutable artifact versions.
