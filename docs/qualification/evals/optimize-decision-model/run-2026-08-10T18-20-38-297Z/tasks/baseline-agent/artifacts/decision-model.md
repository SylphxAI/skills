# Decision Model: Support Ticket Assignment Across Three Agents

## 1. Decision boundary

- **Owner:** Support operations lead (humans own the policy; the model recommends an assignment).
- **Decision:** How many tickets to assign to each of **three agents** in a single day.
- **Controllable action:** `x_{ij} = 1` if ticket `i` is assigned to agent `j` on the current day, `0` otherwise. The day's per-agent counts follow from the assignment.
- **Horizon:** One day, solved each morning from the day's open queue; a re-solve trigger covers intraday intake (Section 9).
- **Frequency:** Daily, with an intraday update when intake or agent availability shifts materially.
- **Baseline policy (to beat):** First-in-first-out round-robin assignment ignoring both per-ticket priorities and per-agent skill/capacity — assigns in arrival order, cycling agents without regard to workload balance.
- **Terminal artifact:** A recommended assignment, the implied per-agent ticket counts, and an auditable copy of inputs, model version, and solver output.

## 2. Entities, sets, indices

| Symbol | Meaning |
|--------|---------|
| `I` | Open tickets `{1..n}` in scope for the day |
| `J` | Agents `{1..3}` |
| `i ∈ I`, `j ∈ J` | Indices |
| `P` | Priority levels `{high, medium, low}` |

Scope rule: tickets admitted into `I` are those not yet closed, not blocked on a third party (customer/external vendor), and not awaiting an unassignable dependency. A ticket outside `I` is not assigned by the model.

## 3. Parameters, units, provenance, uncertainty

| Symbol | Meaning | Units | Source / note |
|--------|---------|-------|---------------|
| `w_i` | Priority weight of ticket `i` | dimensionless, per-level | `w_{high} > w_{medium} > w_{low}`; policy-owned constants |
| `s_ij` | Processing time of ticket `i` by agent `j` | hours (h) | Estimated at intake; agent-specific skill effect |
| `c_j` | Daily capacity of agent `j` | hours (h) | Declared availability minus fixed overhead; refreshed daily |
| `u_j` | Max tickets assignable to agent `j` (WIP guard) | tickets/day | Top-of-queue safety bound (Section 4) |
| `n_j` | Max tickets per priority handled by `j` | tickets/day | Optional load-balancing bound per priority |

**Uncertainty flags (no hidden precision):**
- `s_ij` are estimates; real durations vary. Default to the median recent duration for the ticket type × agent pair, and record variance for scenario work.
- `c_j` is an availability assumption and can be pre-empted by meetings, incidents, or leave. Missing or stale `c_j` is a hard reject for that agent (do not assume full capacity from a blank field).
- Priority weights and `u_j`/`n_j` bounds are **policy inputs**, not facts. They must be approved by the owner before a solve and recorded in the model metadata.

**Data quality rules:** Reject a ticket with a missing or non-reconcilable unit (e.g., no duration unit, blank priority, or priority not in `P`). Reject an agent with no declared capacity. Solver must not fabricate defaults for missing inputs.

## 4. Decision variables and domains

- `x_ij ∈ {0,1}` — assign ticket `i` to agent `j` (pure assignment).
- `z_i ∈ {0,1}` — ticket `i` is **deferred** today (not assigned to any agent this day).
- `y_ij ≥ 0` — slack on agent `j`'s capacity in hours (only in the relaxed feasibility diagnostic, Section 8; not a free production lever).

No other variables are needed. This is a **mixed-integer program** (binary assignment), not a continuous LP, because assignment is an on/off choice and the per-agent ticket-count WIP guards are discrete. Model family chosen for the operational semantics (assignment + discrete capacity + priority), not because a solver is installed.

## 5. Objective

**Primary (single objective, business units — weighted completed tickets):**
Maximize the weighted number of tickets completed within the day:

```
maximize  Σ_{i∈I} Σ_{j∈J} p_ij · x_ij
```

where `p_ij = w_i · r_ij`, with `r_ij ∈ (0,1]` a per-ticket-per-agent **fit score** encoding how much of ticket `i`'s processing agent `j` can (a) own competently and (b) resolve without hand-off. Fit is a service-quality term, not throughput.

**Why weighted and not raw count:** maximizing raw closed tickets lets the optimizer game the objective by cherry-picking only fast, low-priority tickets and deferring high-priority ones. Weighting by `w_i` makes the objective prefer completing high-priority tickets per unit of effort, which is the real outcome (customers' urgent issues resolved).

**Countermetric (non-aggregable veto, from the objective-contract discipline):**
- **High-priority starvation:** the model never permanently de-prioritizes `high` tickets to chase the score. Enforced as a hard constraint in Section 6, not just a soft preference.
- **Unfair spread:** also tracked that no agent is given an extreme share (guarded by WIP bounds in Section 6).

**Weights are policy, not estimated.** `w_high : w_medium : w_low` must be set by the owner (e.g., `4 : 2 : 1` is a defensible default start) and treated as tunable; the model's answer is subject to sensitivity analysis on these weights (Section 8). The fit `r_ij` honors the principle that the model cannot set social or business exchange rates.

## 6. Constraints

**Hard constraints (each bound to an operational rule):**

1. **Exclusive assignment:** `Σ_j x_ij + z_i = 1` for all `i` — each ticket is assigned to exactly one agent or deferred for the day. No double-assignment.
2. **Capacity in hours:** `Σ_i s_ij · x_ij ≤ c_j` for all `j` — each agent's total estimated hours cannot exceed daily capacity.
3. **Per-agent WIP guard:** `Σ_i x_ij ≤ u_j` for all `j` — an agent is not handed more tickets than they can plausibly start today, independent of hours. This is a safety and context-switching bound; `u_j` is a top-of-queue cap.
4. **Per-agent, per-priority bound (optional but recommended):** `Σ_{i: priority(i)=p} x_ij ≤ n_{j,p}` for all `j,p` — prevents one agent from absorbing the entire high-priority load and spreads priority classes. Drop only with explicit owner sign-off, never silently.
5. **High-priority non-starvation (policy floor):** all `high` tickets must be assigned before any `medium` or `low` ticket is assigned, unless no agent has remaining capacity to fit them (`z_i` allowed only for `high` when every `j` is at capacity). This is the protected floor that the optimizer cannot trade away.

**Soft preferences (no hidden weights):**
- Prefer assigning a lower-`p_ij` ticket to the agent with best fit when two feasible assignments have equal objective value (tie-break, does not change the optimum).
- Any relaxation must be deliberate and logged (see relaxation rules, Section 8). The model never silently deletes a constraint to force feasibility.

**Reason each is hard vs soft:**
- (1) single-owner is a factual integrity rule — hard.
- (2) capacity is a physical/available-time reality — hard, but `c_j` is an estimate, so it is a "hard-with-stated-tolerance" (we solve against the estimate, and the operational check in Section 7 re-verifies against actual throughput).
- (3),(4) are load-balancing policy — hard but tunable by owner.
- (5) is a protected floor — hard by policy, non-negotiable.

## 7. How to solve and how to check

### 7a. Solve configuration (reproducible)

Recommendation: use a standard MILP solver that handles pure assignment at this scale well (e.g., OR-Tools CP-SAT, HiGHS, CBC, or Gurobi if licensed). Reuse one deterministic configuration.

- **Reproducibility block (recorded with every run):** solver name + version, formulation version, seed (for stochastic variants), termination status, incumbent objective value, best bound, optimality gap, solver tolerance, runtime, and resource limit (e.g., 30 s or 0.1% gap).
- **Model metadata:** link the exact input snapshot, model version, solver config, and emitted decision by a run ID so the whole decision is reproducible/auditable.

### 7b. Independent verification (do not trust solver output alone)

1. **Formulation self-check on tiny fixtures:** enumerate all feasible assignments by hand/breadth-first for a small case (e.g., 3 tickets × 3 agents) and confirm the solver's optimum matches the enumeration.
2. **Independent re-computation:** outside the solver, recompute the objective value `Σ p_ij x_ij` and each constraint residual (assignment-exclusive, capacity hours, WIP counts, per-priority counts, non-starvation) from the emitted `x`.
3. **Baseline and heuristic comparison:** compare against (a) the current round-robin baseline and (b) a simple greedy "highest `p_ij` within remaining capacity" heuristic. The optimizer must beat or tie both; report the delta and why.
4. **Feasibility diagnostics:** exercise empty queue, minimum (1 ticket), maximum (all agents saturated), conflicting (priorities vs capacities) and impossible cases. On infeasibility, extract an irreducible conflict/MIS (irreducible infeasible set) rather than deleting a constraint. Controlled relaxations are logged as their own diagnostic runs (e.g., relax WIP `u_j` or per-priority `n_{j,p}`) — never as a silent recovery.
5. **Sensitivity/stress:** perturb capacities `c_j`, durations `s_ij`, weights `w_i`, and the priority cut `w_high : w_medium : w_low`; run adverse-but-plausible correlated scenarios (e.g., one agent out for the day, a burst of high-priority tickets, double-duration outlier). Record at what threshold the recommended assignment changes and whether any agent becomes the bottleneck.

### 7c. Operational check of throughput

A solved model is not proof of delivery. After the day, compare **actual completed tickets vs predicted**, per agent and per priority, against the capacity and duration estimates. If actual completion systematically misses the prediction, recalibrate `s_ij` and `c_j` before trusting the next solve (Section 9).

## 8. Objective-contract caveats (gaming / Goodhart)

- **Proxy risk:** "weighted completed tickets" is a proxy for the real outcome *customers' urgent issues actually resolved*. A solver could inflate the score by (a) only ever taking fast low-effort high tickets, (b) completing tickets with hand-offs counted twice, or (c) deferring everything else. The non-starvation floor and the fit term `r_ij` oppose (a); a rule that a ticket counts toward completion only once and only when fully resolved opposes (b); the deferral accounting in verification opposes (c).
- **Gaming via scope:** an optimizer must not be rewarded for *shrinking* scope by re-categorizing tickets to a "fast" bucket. The `z_i` deferral and the rule that priority is set at intake (not by the model) keep the model from gaming its own input.
- **Burden shifting:** the WIP and per-priority guards stop one agent from absorbing all hard/high work; the fairness countermetric flags extreme spreads for owner review.
- Protected floor: the high-priority non-starvation constraint is a non-aggregable veto — no weighting trade can ever starve it.

## 9. Operating handoff, re-solve, monitoring

- **Input assembly:** pull the open-queue snapshot, per-ticket priority + duration estimate + fit, and per-agent capacity each morning. Store the snapshot with the run ID.
- **Re-solve triggers (within the day):** intake grows materially, an agent's availability drops (`c_j` changes), or a scheduled re-balance time arrives; each re-solve recomputes from the current admitted-set `I` and runs the same verification block.
- **Monitoring:** track per-agent actual-vs-estimated duration, capacity utilization, high-priority time-to-first-response, deferred counts, and cross-re-solve churn (tickets moved between agents). If churn climbs, tighten re-solve triggers.
- **Fallback if solver or inputs fail:** degrade to the greedy heuristic applied to the *same* verified fixture policy, clearly labeled "fallback, not optimal", and keep running the single-owner + capacity + non-starvation rules. Never ship the round-robin baseline as the default on failure without the owner knowing.
- **Recalibration:** when drift is observed (Section 7c), update `s_ij` and `c_j`; weight and bound changes require owner approval and trigger re-sensitivity.

## 10. Non-goals & unresolved model risk

- Non-goals: scheduling *when* within the day each ticket is worked, sequencing queues per agent, multi-day lookahead, or assigning multiple partial agents to one ticket. These are out of scope for this decision model.
- Unresolved risk: `s_ij` and `c_j` are the biggest drivers and are estimates. The model is only as good as those inputs; the operational check (7c) is the closing loop. Priority weights and WIP bounds encode policy and must be audited, not assumed.
- A green solver status proves only that the encoded model was solved; it does not prove the model represents reality. Feasible-but-wrong inputs remain feasible-but-wrong, and the owner retains the authority and responsibility for the final assignment under the reviewable policy above.
