# Agent Planning and Control Methods

## Select a planning family

| Environment | Useful family | Main control |
| --- | --- | --- |
| Immediate observations dominate and actions are cheap | ReAct-style interleaving | Short reason-act-observe steps with outcome checks |
| Goal is stable and dependencies are mostly known | Plan-and-Execute | Explicit plan, monitored execution, bounded replan |
| Work has reusable domain decomposition | HTN | Sound task methods, preconditions, and terminal actions |
| Actions have ordering constraints but parallelism matters | Partial-order / causal-link | Protect causal links; order only when required |
| Goals compete and commitment stability matters | BDI | Deliberate beliefs and desires; filter and reconsider intentions |
| Distant state is uncertain | Receding horizon | Execute a bounded prefix, observe, and optimize again |
| Many candidate plans or actions need selective exploration | Verifier-guided bounded search | Separate proposal, scoring, verification, pruning, and termination |
| State and actions are fully enumerable | State machine or workflow | Prefer deterministic transitions over a general planner |

Hybrids are normal. For example, use HTN to produce a partial-order plan, a
receding horizon to limit commitment, and reactive observation between steps.

## Agent Planning and Control Contract template

```text
Objective and utility:
Observed state and confidence:
Hard constraints and effect boundary:
Goals, priorities, and conflict rule:
Planning family and rationale:
Actions, preconditions, effects, cost, and reversibility:
Plan representation and validity predicate:
Candidate/frontier representation and proposal generator:
Scorer, independent verifier, dominance and pruning rules:
Execution observation and outcome verification:
Replan, cancel, degrade, escalate, and stop triggers:
Search/time/token/cost budgets and adaptive allocation rule:
Search termination and selected-plan proof:
Liveness, deadlock, oscillation, and safety tests:
```

## Verifier-guided bounded search

Use search only when a direct procedure or deterministic transition cannot
economically select a valid plan. Define:

1. **Candidate state** — what a partial and complete plan contains, including
   constraints, accumulated cost, uncertainty, and lineage.
2. **Proposal generator** — how successor candidates are produced and how
   diversity is preserved. Generation must not silently decide validity.
3. **Scorer and verifier** — heuristic ranking may allocate compute, but hard
   validity and terminal acceptance come from an independent predicate or
   verifier wherever feasible.
4. **Frontier and pruning** — dominance, duplicate detection, infeasibility,
   upper/lower bounds, and retained alternatives. Pruning must preserve the
   properties claimed for the search.
5. **Adaptive compute** — spend additional branches, depth, simulations, or
   verification only while expected decision improvement exceeds marginal
   cost and risk.
6. **Termination** — stop on a verified satisfactory candidate, exhausted
   frontier, declared budget, negligible expected improvement, or safety/effect
   boundary. Report whether the result is optimal, best found, or merely valid.

Test deceptive high scores, correlated generator/verifier failures, premature
pruning, duplicate candidates, frontier explosion, and no-valid-plan outcomes.

## Control invariants

- An intention is a defeasible commitment, not an immutable command.
- Every executable action has checked preconditions and observable success or
  failure semantics.
- Causal links identify which action establishes a condition another action
  depends on; protect them from intervening threats.
- Planning terminates under an explicit search or value boundary.
- Progress is measured in verified state change, not number of reasoning steps
  or tool calls.
- Replanning invalidates or reconciles obsolete commitments; it must not leave
  duplicate effects or orphaned work.
- Irreversible or externally consequential actions require the declared effect
  authority even when a planner recommends them.

## Test scenarios

At minimum exercise:

1. a nominal goal completed with verified effects;
2. a precondition that becomes false after planning;
3. an action returning success without the expected state change;
4. two independent actions eligible for parallel execution;
5. two goals competing for the same resource;
6. repeated replan oscillation;
7. a search tree exceeding its budget;
8. an irreversible action without authority; and
9. a stop state where further planning has negative expected value.

## Research basis

This method synthesizes:

- Georgeff and Rao's formal treatment of beliefs, goals, and intentions in BDI
  systems: <https://doi.org/10.1007/978-3-662-03678-5_8>
- Erol, Hendler, and Nau on HTN planning complexity:
  <https://doi.org/10.1007/BF02136175>
- Barrett and Weld's evaluation of partial-order planning:
  <https://doi.org/10.1016/0004-3702(94)90012-4>
- Yao and colleagues' ReAct pattern for interleaving reasoning and actions:
  <https://arxiv.org/abs/2210.03629>
- Mayne and colleagues' survey of constrained model-predictive control, the
  control-theoretic basis for receding-horizon operation:
  <https://doi.org/10.1016/S0005-1098(99)00214-9>
- Russell and Wefald's metareasoning account of bounded rational computation:
  <https://mitpress.mit.edu/9780262680623/do-the-right-thing/>

Named methods are design tools, not maturity badges. Select them only when
their control semantics solve an observed planning problem.
