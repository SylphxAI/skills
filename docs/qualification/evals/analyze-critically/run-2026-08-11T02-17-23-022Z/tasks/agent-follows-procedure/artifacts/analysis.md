# Critical Analysis Brief: Why does the team keep delivering half-finished migrations?

**Decision under test:** whether to re-plan the migration.

## 1. Question and stakes

The question asks for the mechanism behind a recurring pattern; the decision asks
what to do next. These are separable. The analysis must distinguish:

- the mechanism that produces half-finished states (diagnosis), and
- whether re-planning is the lever that changes it (action).

Stakes:

- If the pattern is a planning/scope failure, re-planning is the right move.
- If it is a completion-contract, oracle, or incentive failure, re-planning alone
  repeats the failure with a new artifact: migrations still stop at
  merge/CI/source while dual paths, dangling callers, and fail-open predicates
  persist (each carrying operational and security risk, e.g. a worker at 0/0
  replicas while the sole claim still routes to it).
- If it is mostly an evidence/reporting illusion, re-planning is pure waste and
  delay.
- If it is driven by hard external blockers, the correct action is unblock or
  rescope, not re-plan.

Boundary: this workspace contained only `SKILL.md`; no migration repo, plan, or
GitOps state was available. The brief diagnoses from recorded prior incidents
(memory registry, 2026-07-31 .. 2026-08-10) and explicitly flags what must be
re-queried live before the decision is executed. No live claim is made here.

## 2. Observed facts and evidence quality

Evidence ledger. Memory-derived items are secondary, timestamped summaries from
prior runs and are **not** live-verified in this run.

| Item | Type | Quality | Effect on analysis |
|---|---|---|---|
| W4 serverless cutover: env set `SPIRON_WORKER_TASK_CONSUMERS=0` and worker `min_instances=0` while Platform sole-claim still called worker-bound `/internal/w4-stream-execute`; worker had 0/0 replicas, no Service endpoints | observation (prior-run summary, 2026-08-06) | secondary, single source | constrains: a cut can be complete at the env layer while the caller/claim boundary is untouched (cut-before-replace) |
| Platform Knative STZ wave: source merged, CI green, but controller image promotion and route materialization unproven; a wave 404'd or never reached idle; canary wave was not fleet completion | observation (prior-run, 2026-08-10) | secondary | constrains: "done" can be reported at the source/CI layer while the live layer is pending |
| physical-win-model: RPR/TS "smoke equality" was data absence (`cask_bucket_id_missing`, `FEATURE_SCHEMA=v8-rpr-ts`, `rpr_today=-1`); schema-present constants produced false "no effect" | observation (prior-run, 2026-08-10) | secondary | constrains: green validation can be an oracle artifact, not feature value |
| BetDice kernel audit: source gates passed; devnet/live claim unsupported; `declare_id!`/keypair/Anchor.toml/IDL misaligned | observation (prior-run, 2026-08-10) | secondary | constrains: an implementation cascade can stop before attested product proof |
| Keel R0: packaging/artifacts complete, functional capability unfinished | observation (prior-run, 2026-08-10) | secondary | constrains: finish at one layer (package) can be misread as product finish |
| PracticalBench: public leaderboard live, but uncapped evaluation still blocked on second anchor/rubric judge/valid CI; live site is only a proof slice | observation (prior-run, 2026-08-10) | secondary | constrains: a visible live surface is not a complete objective |
| Spiron Telegram incident: worker/stream repairs did not restore replies; final Gateway model-lane blocker; every custody/execution/dependency hop must be proven | observation (prior-run, 2026-08-10) | secondary | constrains: multi-hop migrations fail at the last dependency hop |
| Alpha Foundry: pods restarted cleanly (`exitCode=0`) but promotion env was disabled and tokens expired; activity did not equal promotion | observation (prior-run, 2026-08-10) | secondary | constrains: "something runs" can coexist with terminal failure |
| BaaS: peer stores proven live, but terminal clean-break remained incomplete (organic dens promotion/tip-link residual) | observation (prior-run, 2026-08-10) | secondary | constrains: one residual can block a terminal state even after live proof |
| The same "source/CI/merge is not completion" instruction recurs across many runs and teams | inference (registry synthesis) | derived, correlated source | updates ranking: the gap is persistent across domains, but the source is not independent |
| Recorded incidents span unrelated domains (serverless, kernel, model, catalog, packaging) yet share signatures | inference | derived | supports structural causes over random coincidence |
| Prior summaries were written by the same class of agents that exhibits the pattern | inference | correlated source | caps evidence quality; possible narrative bias toward "gap found" |
| "Finished migration" has a stable, shared, correct definition across the team | assumption | untested, high sensitivity | if false, H1 dominates and re-planning targets the wrong artifact |
| Recorded incidents are representative of the team's full migration portfolio (no survivorship bias) | assumption | untested, high sensitivity | if false, the base-rate hypothesis (H6) could dominate |
| The current migration exists, is mid-flight, and has a plan that could be re-planned | unknown | not verifiable in this workspace | a re-plan decision may be premature |
| Base rate: how many migrations reached terminal state vs stopped at source/CI/live | unknown | cheap to acquire (last N migrations) | the single most decision-relevant missing number |

Bounded search performed: full read of `./SKILL.md` (its local `references/`
links do not exist in this workspace; the installed skill copy at
`/home/codex/.codex/skills/analyze-critically/` was used for the method and
Bayesian-update references), plus a keyword scan of the memory registry
(`MEMORY.md`). No live repo, CI, or deployment state was inspected.

## 3. Competing hypotheses

Materially distinct explanations that would change the decision. Coexisting
contributors are noted; independence is not forced.

- **H1 — Completion-contract failure (DoD at the wrong layer).** "Finished" is
  defined per layer (source, CI, env flags, artifacts) rather than per terminal
  state (sole writer, exact live SHA, authenticated path, soak). Each layer is
  individually green while the whole is not; migrations are *declared* done one
  layer early.
- **H2 — Transition-planning failure (cut-before-replace).** Plans scope the
  "to" side or the "from" side but not the boundary: callers, claims, routes,
  env. Execution stalls or breaks at the boundary (consumers=0 with dangling
  worker-bound calls; sole claim still routing to a 0/0 service).
- **H4 — Oracle/verification artifact.** Validations pass on absent data or
  schema-present constants (`rpr_today=-1`), so the team genuinely believes the
  work is done. This is a measurement failure, not a lying or planning failure.
- **H3 — Incentive/attention failure.** Credit, review, and user attention attach
  to merge/CI/live-surface signals; terminal proof is expensive and unrewarded,
  so work stops at the rewarded signal. Re-planning does not change this.
- **H5 — External-blocker residual.** Stops sit at real walls (credentials,
  provider certification, model lane, second anchor, tokens). The team reports
  honestly; "half-finished" is a preserved blocker, and the plan may have been
  correctly scoped all along.
- **H6 — Base-rate illusion (status quo).** Recorded incidents are a
  survivorship sample; most migrations finish; the "keeps delivering
  half-finished" framing is an artifact of which incidents got recorded. No
  re-plan warranted.

H1 and H2 frequently co-occur: a per-layer DoD coexists with a plan that lacks
boundary steps. The leading composite is **H1+H2 with H4 as amplifier**; H3, H5,
and H6 are the main competing explanations that would flip the decision.

Prior basis: a weak reference-class prior (large migrations more often stop
early than finish; planning fallacy) that says nothing specific about this team.
Prior uncertainty is wide and is carried into the posterior range.

## 4. Discriminating evidence

Competing-hypothesis matrix (`favors`/`contradicts` where the observation
separates; `neutral` = adds little):

| Expected observation | H1 | H2 | H3 | H4 | H5 | H6 |
|---|---|---|---|---|---|---|
| Current migration has written DoD naming the terminal layer (sole writer, live SHA, soak) | contradicts if absent | neutral | neutral | neutral | neutral | neutral |
| Current plan names the transition boundary (callers, claims, routes, env) with replace-before-cut order | neutral | contradicts if absent | neutral | neutral | neutral | neutral |
| Validation suites contain negative controls / coverage checks, not just schema-present constants | neutral | neutral | neutral | contradicts if absent | neutral | neutral |
| Stop points consistently co-locate with documented external walls (credentials, cert, provider) | neutral | neutral | neutral | neutral | favors | neutral |
| Retrospective: 70-80%+ of last N migrations reach terminal state | weakens | weakens | weakens | weakens | weakens | favors |
| "Finished" migrations later required boundary rework (dangling callers, dual writers found post-hoc) | favors | favors | neutral | neutral | neutral | contradicts |
| Team produces terminal evidence (pod SHA, live request log, soak) on demand, but only after prompting | neutral | neutral | favors | neutral | neutral | neutral |
| Completion behavior changes when credit moves to terminal proof | neutral | neutral | favors | neutral | neutral | neutral |

Bayesian update notes:

- The most discriminating and cheapest evidence is the current migration's
  written DoD and transition plan (separates H1/H2 from H5/H6 at near-zero cost)
  plus the stopping state of the last 3-5 same-team migrations (base rate for
  H6).
- Dependence caveat: recorded incidents trace to the same class of agent runs
  and the same registry. Treat them as roughly 2-3 effective independent
  observations of the mechanism, not ten.
- Sensitivity: if the prior-run summaries are unreliable, the posterior reverts
  toward the weak prior and the conclusion range widens.

## 5. Strongest case for and against the leading conclusion

**Leading conclusion:** the dominant mechanism is a completion-contract and
transition-planning failure (H1+H2), with oracle artifacts (H4) as an amplifier -
migrations are planned and declared done at the layer that is easiest to verify,
not at the transition boundary and terminal live state.

Strongest case FOR:

- Recurring signatures across unrelated domains (serverless, kernel, betting
  model, catalog, packaging): (a) done declared at source/CI/env/artifact layer
  while the live layer is unproven; (b) cut-before-replace states with dangling
  callers and 0/0 replicas. A structural cause explains this better than
  independent coincidences.
- When the terminal gap was pushed on, it was almost always a real, findable,
  unexecuted item (image SHA, route materialization, feature coverage, model
  lane). The gap is genuine, which argues against H6 (no systematic failure) and
  against H5 as the general story (blockers were the exception, not the norm).
- The same completion instruction has had to be repeated across many runs and
  teams, which indicates persistence over time - structural, not one-off.

Strongest case AGAINST:

- Selection effect: the registry records problem incidents; there is no
  base-rate evidence that most migrations fail. "Keeps delivering half-finished"
  may overstate prevalence.
- Evidence is secondary and single-sourced (summaries by the same class of
  agents); correlated narrative bias is possible, and no single incident was
  independently re-verified in this run.
- H5 is alive: several incidents did have hard external blockers (Gateway model
  lane, second anchor, provider certification); for those, the right move is
  unblock or rescope, not re-plan.
- No evidence about the specific current migration was available. Deciding to
  re-plan from the general pattern without inspecting the current plan and DoD
  would repeat the very error the analysis diagnoses - deciding at the wrong
  layer.

## 6. Assumptions and failure paths

Assumptions (ranked by sensitivity):

1. Prior-run summaries faithfully record events (A1, highest; untestable here -
   verifiable by replaying one incident's logs/artifacts).
2. Recorded incidents are representative of the team's portfolio (A2; kills the
   prevalence claim if false).
3. "The team" in the question is the population that produced the recorded
   incidents (A3).
4. A terminal-state standard (sole writer, exact live proof, soak) is the correct
   definition of "finished" for these migrations (A4; where source+CI genuinely
   is the delivery boundary, H1 dissolves for those cases).
5. A current migration exists and is re-planable (A5; the workspace provided no
   repo).

Failure paths:

- Re-plan under H1+H2 when truth is H5: the new plan hits the same external wall;
  delay plus a new artifact, blocker still unresolved.
- Re-plan under H1+H2 when truth is H3: same stopping dynamics; merges still
  rewarded, terminal proof still unrewarded.
- Re-plan the plan but keep the same per-layer DoD: the re-plan itself becomes
  the next half-finished artifact - the self-referential trap for this team.
- Don't re-plan when truth is H1+H2: the next migration repeats cut-before-replace;
  dual paths and fail-open predicates persist and compound.
- Premortem on "re-plan": within 30 days, a plan document exists, its DoD still
  names source/CI, there is no transition-boundary checklist, and the migration
  is again declared done at merge. Leading indicator: whether the re-plan names
  per-layer evidence and a cutover order before any code is written.

## 7. Conclusion and calibrated confidence

- The pattern is real and structural in the recorded incidents: confidence in the
  mechanism (H1+H2 composite, amplified by H4) conditional on evidence fidelity
  is ~65% (range 55-75%).
- Confidence that the recorded incidents are representative of the team's full
  portfolio (no survivorship bias) is low: ~30-50%. The base-rate number is
  missing.
- Confidence that re-planning, specifically, is the correct next action for the
  current migration without first inspecting its DoD and transition plan is low:
  ~30-40%. The evidence supports changing the completion contract and the
  transition plan, not merely producing a new plan artifact.
- Overall: moderately confident in the diagnosis; not yet confident in the
  action. The honest default is that the re-plan decision should be conditional
  on a cheap discriminating step, not made from the general pattern.

Posterior basis: dependence-adjusted evidence (roughly 2-3 effective independent
observations) is consistently consistent with H1+H2 and inconsistent with H6;
H5 explains a minority of stops; H4 explains the "green but absent" cases. If A1
or A2 fails, the posterior reverts toward the weak prior and the decision range
widens.

## 8. What would change the conclusion

- Current migration's written DoD and transition plan: if it already names the
  terminal layer and replace-before-cut boundary, the diagnosis fails for this
  case - verify execution instead of re-planning.
- Base rate from the last N same-team migrations: if 70-80%+ reached terminal
  state, H6 dominates - re-planning is waste.
- Post-hoc rework audit of "finished" migrations: if none ever needed boundary
  rework, H1/H2 weaken and "half-finished" is observer framing.
- Blocker documentation at stop points: if stops consistently co-locate with
  documented external walls, H5 dominates - unblock or rescope, not re-plan.
- Incentive probe: tie credit/review to terminal proof; if completion rises
  sharply, H3 dominates - fix rewards, not plans.
- Single most decision-moving observation: the current migration's DoD and
  transition plan plus the stopping state of the last 3-5 same-team migrations -
  cheap, and it cleanly separates H1/H2 from H5/H6.
