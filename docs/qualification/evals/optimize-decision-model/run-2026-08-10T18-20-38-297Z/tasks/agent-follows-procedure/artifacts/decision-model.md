# Constrained Decision Model — Daily Support Ticket Assignment

## 1. Decision Boundary, Horizon, Baseline, Assumptions, Non-Goals

### Decision boundary
- **Decision owner:** Support Operations lead (control: assignment of tickets to three agents on a given day).
- **Controllable action:** Which of the day's "assignable" tickets is assigned to which agent (3 agents), including the choice of leaving a ticket in a *hold* pool (not assigned today).
- **At-most-one-review-owner rule:** Each ticket has at most one assigning agent who also acts as review owner. A ticket is *either* assigned to exactly one agent (who reviews it) *or* held for a later day. It cannot be assigned to more than one agent and cannot have a separate reviewer different from its assigned agent.

### Horizon and frequency
- **Decision frequency:** once per day (open of day).
- **Horizon:** single-day static assignment. The model produces a recommended assignment for today's ticket intake. Held tickets are carried to the next day's intake; no multi-day holding or capacity carry-over is modeled in this version (see Non-Goals).

### Baseline policy
- **Baseline (incumbent):** First-In-First-Out (FIFO) assignment with no priority weighting and no per-agent capacity enforcement. Tickets are assigned to the first available agent in a fixed rot, and excess tickets queue overnight.
- **Model objective vs baseline:** the model maximizes same-day processed throughput with priority-weighted screening, whereas baseline processes in arrival order only.

### Explicit assumptions
1. **Daily capacity is fixed and known** for each of the three agents (`cap_a`), measured in processed tickets per day, independent of ticket difficulty mix (uniform ticket effort).
2. **Ticket priority is a single integer class** (`p ∈ {1,2,3,4}` or similar), higher = more urgent; priorities are exogenous and known at decision time with no uncertainty.
3. **Any ticket, regardless of priority, consumes exactly one unit of an agent's capacity.** No partial processing, no preemption of an in-flight ticket, no overtime in the baseline model.
4. **Each assigned ticket is reviewed by the same agent to whom it is assigned** (single review owner = the assigning agent). No separate reviewer capability is modeled.
5. **All tickets available at start of day** are simultaneously visible; no arrivals throughout the day (arrivals treated as next-day intake).
6. **Assignment granularity:** a ticket belongs to exactly one agent on the day. `x_{i,a} ∈ {0,1}`.

### Non-goals
- **No multi-day optimization / backlogging carry-over** beyond simply not assigning the ticket today (held tickets are not capacity-constrained ahead, only deferred).
- **No skill-fit or skill matrix** between ticket domain and agent capability.
- **No ticket effort variability** (all unit effort).
- **No nonlinear response, learning curves, agent fatigue, or per-agent efficiency differences.**
- **No stochastic arrivals, priority changes, or churn within the day** in the decision model (uncertainty treated in the Sensitivity section and robust policy).
- **No separate reviewer pool or second reviewer capacity.**
- **No cost/penalty minimization** in primary objective (dominant objective is throughput); priority is a lexicographic secondary handled in the formulation.

---

## 2. Sets, Parameters, Units, Provenance

### Sets
- `A = {A1, A2, A3}` — the three agents (indices `a ∈ A`).
- `T` — the set of tickets assignable today, index `i ∈ T`, with `|T| = N`.
- `P = {1..p_max}` — priority classes.

### Parameters
| Parameter | Meaning | Units | Domain |
|---|---|---|---|
| `cap_a` | daily capacity of agent `a` | tickets/day | positive integer |
| `N` | number of tickets available today | tickets | non-negative integer |
| `prio_i` | priority of ticket `i` | class (unitless) | integer in `P` |
| `w_p` | weight for priority class `p` | unitless (screening weight) | `w_p > 0`, larger = higher priority |

### Provenance and data-quality rules
- `cap_a`: from agent-availability roster; source = support roster system; timestamp = day-before-close forecast. **Quality gate:** cap must be ≥ 0 and integer; reject non-numeric or negative caps (treat as missing → hold ticket for that agent if unresolvable, or re-request).
- `prio_i`: from ticket metadata flag set at creation by customer/automation; timestamp = ticket create time. **Quality gate:** prio must be in `P`; missing/unknown priority is rejected or treated as lowest priority with a noted data-quality residual.
- `N`: count of tickets in "open & queueable" status at day open; source = ticket platform query; timestamp = day-open query time.
- **Lineage/reproducibility:** a decision is reproducible if it is anchored to a snapshot of `(cap, prio, N, w)` with a snapshot identifier and the solver configuration in §6.

### Uncertainty and missingness
- In the deterministic model, all parameters are *known* at decision time (treat as point estimates).
- Data missingness handling: fill with documented defaults only; a ticket with missing priority is assigned low priority and flagged for review, never silently dropped.
- Priority weights `w_p` chosen by policy (see §4) — they are a policy choice, not measured data; declare the trade-off they encode.

---

## 3. Variables

All variables defined only for the modeled subset (tickets in `T`, agents in `A`).

- `x_{i,a} ∈ {0,1}` — 1 if ticket `i` is assigned to agent `a` today, else 0.
- `y_i ∈ {0,1}` — 1 if ticket `i` is held (not assigned today), else 0.

Derived (not independent decisions):
- `assigned_i := Σ_a x_{i,a}` — total assignment indicator for ticket `i` (0 or 1 under the constraint).

Held variable is the recourse/state for tickets that cannot be fit into capacity.

---

## 4. Objective

**Primary objective (throughput, priority-weighted):**

Maximize
`Σ_{i∈T} Σ_{a∈A} w_{prio_i} · x_{i,a}`

which is the sum over assigned tickets of their priority weights. This:
- **maximizes volume** subject to capacity (throughput), and,
- **as a weighted tie-breaker**, prefers assigning higher-priority tickets when capacity binds (since every assigned ticket contributes its `w_p`, and higher priority has larger `w`).

**Policy meaning of weights `w_p`:** the weight is not "dollars" or "minutes"; it is a screening policy coefficient that encodes the exchange rate between one low-priority ticket and `w_high/w_low` high-priority tickets. Because all tickets consume identical capacity units, the weights determine how many low-priority tickets the model will sacrifice to process one high-priority.

**Sensible default (policy, not measured):** use `w_p = p` with `p_max` top tier (i.e., `w = {1,2,3,4,...}`) or a stated lexicographically-primary preference. Document the chosen `w_p` with its trade-off in the artifact.

---

## 5. Constraints (Hard and Soft, Tolerances, Formulation)

### Hard constraints
**(C1) Every ticket has at most one owner (single review owner), and it is either assigned to exactly one agent or held:**
`Σ_{a∈A} x_{i,a} + y_i = 1  ∀ i ∈ T`

- Enforces "exactly one review owner per ticket": if assigned, `Σ x_{i,a} = 1` (one agent); if held, `y_i = 1`. This replaces the looser "at most one" with an explicit binary split to make "held" a first-class state.
- **Source/policy:** at-most-one-review-owner rule from the support operating policy.
- **Tolerance:** none. Hard.

**(C2) Agent capacity:**
`Σ_{i∈T} x_{i,a} ≤ cap_a  ∀ a ∈ A`

- **Source:** agent daily capacity roster.
- **Tolerance:** none (integer capacity). **Relaxable only by policy = soft capacity extension** — see (S1) below; in the primary model this is hard.

**(C3) Binary integrity:**
`x_{i,a}, y_i ∈ {0,1}`

These are the model-independent integrality constraints.

### Soft constraints and penalties
- **(S1) Capacity overrun as a soft option** (not in the primary baseline): introduce slack `s_a ≥ 0` with `Σ_{i∈T} x_{i,a} ≤ cap_a + s_a`, and penalize `Σ_a s_a` in the objective with a large negative coefficient `-M_pen`. Used only to diagnose infeasibility or to represent allowed controlled overtime under review-owner policy. Off by default; if enabled, document `M_pen` and the policy that authorizes it.
- No other soft constraints in the primary model.

### Tolerances
- Integrality tolerance of the integer solver (`abs_gap` and `mip_gap` settings) recorded in §6.
- Constraint feasibility tolerance (`feas_tol`) recorded from solver.
- These are solver numeric tolerances, not policy relaxations.

### Mathematical formulation (compact)
```
maximize   Σ_i Σ_a w_{prio_i} x_{i,a}
s.t.       Σ_a x_{i,a} + y_i = 1          ∀ i
           Σ_i x_{i,a} ≤ cap_a            ∀ a
           x_{i,a} ∈ {0,1}               ∀ i,a
           y_i ∈ {0,1}                    ∀ i
```

**Model family selection:** **Mixed-Integer Linear Program (MILP)** — linear objective/constraints with binary assignment variables; matches the combinatorial assignment semantics (single-day assignment) and scales to practical `N`. Justification: network-flow could represent coverage but awkwardly encodes the "held" state and weighting; MIP is the simplest faithful family here. Not LP because assignment requires integrality. Not stochastic/robust in the core because parameters are known today; uncertainty handled by sensitivity and robust operating policy.

---

## 6. Feasibility Evidence, Solver Configuration, Result, Bounds, Gap, Runtime

### Feasibility evidence
Because this artifact is a **model specification** (no live dataset/solver run executed in this document), feasibility and boundedness are demonstrated on synthetic fixtures:

- **Empty set:** `N=0` → all `cap_a ≥ 0`; trivially feasible with `x=y=0`; objective 0.
- **Minimum feasible (`N=1`):** single ticket, assign to any agent with `cap_a ≥ 1`; objective `w`.
- **Maximum `N ≤ Σ_a cap_a`:** all tickets assignable; each agent within cap; objective `Σ w` (all tickets), feasible.
- **Over-capacity (`N > Σ_a cap_a`):** by (C1) held tickets absorb the excess; still feasible, objective `< Σ w`. Feasibility is preserved because `y_i` is unbounded in count (no hold cap). **Diagnostic:** objective `(Σ w) - (held weighted sum)`; never infeasible due to capacity.
- **Infrastructure guard:** Infeasibility can only arise from data inconsistency (e.g., invalid `cap_a`, negative weight), which the data-quality gate rejects. Any true infeasibility triggers a conflict diagnostic (§ Sensitivity) and never silently drops a constraint.

### Solver configuration (reproducible)
- **Solver:** COIN-OR CBC (open-source) or HiGHS MIP. **Version:** record at run time (e.g., CBC 2.10.x / HiGHS 1.x).
- **Model file:** write CPLEX LP (`*.lp`) or MPS, or use Pyomo/OR-Tools binding; record the formulation file hash with the result.
- **Settings (to set):**
  - `mip_rel_gap = 0.0` (or 1e-4), `mip_abs_gap = 0`, `feas_tol = 1e-6`, `int_tol = 1e-6`.
  - `time_limit` = e.g., 60 s; `parallel`/`threads` deterministic seed = 1, 2, or 4 (record exact).
  - Random seed = fixed (record) for any presolve/pivot randomness.
- **Presolve:** on (default), record presolve reductions in the run log.

### Result record template (to fill at run time)
| Field | Value |
|---|---|
| Solver | CBC/HiGHS (version) |
| Termination status | Optimal / TimeLimit / Feasible |
| Objective (primal) | numeric |
| Best bound (dual) | numeric |
| Optimality/abs gap | numeric (or 0.00%) |
| Runtime | seconds |
| Resource limit | time_limit, memory peak |
| Incumbent | full `x`, `y` assignment table |
| Data snapshot id | `{date}_{N}_{caps_hash}` |

Because no live solver was run in this artifact, the "Result/Bounds/Gap/Runtime" cells are left as **to-fill placeholders**; this is stated, not fabricated. The model as specified is **feasible and bounded** for any integer `cap_a ≥ 0` and any finite `N`.

---

## 7. Independent Solution Verification

For every emitted solution, independently:

1. **Recompute objective** from `x`: `Σ_i Σ_a w_prio(i) x_{i,a}`; must equal solver-reported objective (within gap).
2. **Constraint residual check:** for each `a`, recompute `Σ_i x_{i,a}` and assert `≤ cap_a`; for each `i`, assert `Σ_a x_{i,a} + y_i = 1` and that `x,y ∈ {0,1}`.
3. **Single-review-owner probe:** confirm no ticket has two nonzero `x` entries (atomically guaranteed by C1 but re-verified).
4. **Tiny-fixture enumeration:** on a fixture of ≤ 6 tickets / 3 agents, enumerate all assignments (or brute-force the top-fit) and confirm the MILP matches the exhaustive optimum.
5. **Baseline & heuristic comparison:**
   - Baseline FIFO: report throughput and held set under FIFO versus model.
   - Simple heuristic (greedy highest-priority first fit): compare objective and assignment.
   - Claim only: model ≥ greedy ≥ baseline in objective (throughput-weighted) when capacity binds; on a non-binding day all three are equal.
6. **Honesty:** this artifact defines the verification procedure; the actual recomputed numbers belong to the run-time output and are not fabricated here.

---

## 8. Sensitivity, Stress Cases, Robust Policy, Fallback, Monitoring, Re-solve Conditions

### Sensitivity and stress cases
| Case | Perturbation | Model effect | Expected material behavior |
|---|---|---|---|
| Capacity shock | `cap_a` halved for one agent | Capacity binds harder; held set grows | Lower-weight & low-priority tickets pushed to `y`; objective declines |
| Capacity imbalance | one agent `cap=0` | That agent frozen; others take load | Assigned set ≤ sum of other caps; high-priority spared |
| Priority-tie flood | many tickets with same top priority | Weighted objective ties; solver arbitrates | Need a stable secondary tie-break (e.g., earlier arrival wins) — see **robust policy** |
| `N >> cap` stress | `N = 5× total capacity` | Heavily binding; only top-weighted survive | Held pool size = documented; objective ~ top-N capacity entries |
| Weight perturbation | `w_p` scale changed uniformly | Uniform scale — no assignment change (objective monotone in `w`); relative ratio change alters cut between classes | Document threshold `w_high/w_low` where the recommendation flips |
| Data error | one ticket marked wrong priority | One ticket misranked; others unaffected | Detect via audit of held/assigned list vs priority flags |
| Arrival-in-day | ticket arrives after decision | Core model does not cover it; falls to next day / robust re-solve | See re-solve conditions |

### Robust operating policy
1. **Stable tie-break:** adopt a fixed secondary ordering — among equal `w`, prefer earlier `ticket.create_time` (FIFO within a priority band). Implement as a preprocessing sort so the MILP's tie resolution is deterministic.
2. **Deterministic solver setup:** fixed seed + fixed time limit + fixed presolve; record all config so any re-run reproduces the same decision.
3. **Automatic fallback if solver fails/time-limits:**
   - If solver returns infeasible → run conflict/irreducible-inconsistent-subset diagnostic; fall back to greedy highest-priority-first-fit with capacity, then reduce to baseline FIFO only if even that fails.
   - If solver time-limits with a feasible incumbent → accept incumbent if within declared gap, else fall back to greedy first-fit.
4. **Data-failure fallback:** if any `cap_a` or `prio_i` fails quality gate → re-query; if unresolved, treat that agent as unavailable (cap=0) and hold its intended tickets, and continue.
5. **Human confirm:** the recommended assignment is a *recommendation*; a human release step before emails/work-item dispatch.

### Monitoring signals
- Daily objective vs capacity bind (utilization = assigned/total capacity).
- Held-pool size and held-priority distribution (are low-priority tickets building up forever?).
- Actual vs modeled processing time (drift in true ticket effort — signals the uniform-effort assumption is wrong).
- Solver runtime and gap trend (is the instance getting too big for the time limit?).
- Assignment quality complaints (rework, wrong-domain) — signals missing skill-fit non-goal is material.

### Re-solve conditions
- **Trigger** the daily open-of-day solve on every new decision date with fresh `N`, `cap`, `prio`.
- **Intra-day re-solve only if:** a capacity unit is lost mid-day (agent sick/offline) > threshold; a high-priority (top class) ticket arrives that would have been assigned today; or a large batch of arrivals (> `k%` of N) appears today. Otherwise defer to next-day.
- **Baseline lock:** do not silently change already-dispatched assignments; re-solve only affects un-dispatched/held tickets.

---

## 9. Unsupported Claims, Unresolved Model Risk, Implementation Handoff

### Unsupported claims (what this model does NOT establish)
- **No skill-fit/skill-matrix claim:** domain fit, quality, or agent-speed differences are not modeled; the model treats all agents as interchangeable (equal throughput per ticket).
- **No effort-variability claim:** all tickets are assumed unit effort; real tickets vary — this is a documented limitation, not measured behavior.
- **No stochastic-arrival claim:** priority and arrival are point estimates at day open; arrivals during the day are out-of-scope in the core formulation.
- **No long-run SLA / aging guarantee:** held tickets may age indefinitely across days; a priority *threshold* (not here) would be needed to force aging bounds. Has **no** guarantee that any ticket is eventually processed.
- **Weights `w_p` are a policy choice, not derived from measured value or cost:** the model claims only the logic, not that `w_p` reflects real business exchange rates.

### Unresolved model risk
1. **Uniform effort assumption is likely wrong** in reality → model may systematically under- or over-promise throughput; capacity read is a binding control knob.
2. **Priority is a weak proxy**; top-priority flood makes tie-break policy (FIFO within band) the de-facto scheduler.
3. **Aging of held tickets** is unmodeled; sustained overload yields unbounded hold — needs an aging/SLA constraint or a separate sub-model.
4. **Data quality of `cap_a`/`prio`** determines validity; missing priority default (low) can hide genuinely urgent tickets.
5. **Single-agent single-review-owner rule** may be stricter than reality (two reviewers routinely split work); relaxing it changes the model materially.
6. **Weight-ratio threshold sensitivity** (§8) is untested on real data (no live weights calibration done here).

### Implementation handoff
1. **Implement** the MILP in Pyomo (Couenne/CBC/HiGHS backend) or OR-Tools; bind it to the ticket-platform snapshot query (`N`, `prio`) and the roster (`cap_a`).
2. **Stand up** the daily open-of-day job: snapshot → validate → solve → emit assignments → human release → dispatch.
3. **Wire** the independent verifier (§7) as a re-computation in the same job; assert residuals before dispatch.
4. **Log** each run with data-snapshot id + solver config + objective/gap/runtime + assignment table (§6 template) for audit and reproducibility.
5. **Instrument** the monitoring signals (§8) in the same log; alert on hold-pool growth, gap-window, or verification failure.
6. **Owner:** Support Ops lead (decision owner) + Data/ML engineer (implementation). Operational sign-off required before the automated optimizer is trusted to act on live tickets — the constitution's floor applies: solver success ≠ model validity, and human confirmation remains the release gate.

---

## Appendix: Tiny worked example (illustrative, to be confirmed by enumeration at run time)

Let `A = {A1,A2,A3}`, `cap = (3,2,1)`, `N = 5` with
`prio = [3,3,2,1,3]`, weights `w = [1,2,3]`.

- Total capacity = 6 ≥ N=5 → all tickets assignable; objective = `3+3+2+1+3 = 12`.
- If `cap = (2,1,1)`, total = 4 < 5 → one ticket must hold. Highest-priority tie: two top `3`'s. Greedy/first-fit assigns a `3`,`3`,`2` (obj 8) and holds `1` and one `3` tie-break by arrival → objective `8 +` (whichever top holds) etc. Exact optimum to be re-verified by enumeration on the fixture at run time; not asserted as the verified result here.

---

*Artifact title: Constrained Decision Model — Daily Support Ticket Assignment. Method source: `optimize-decision-model` skill (`SKILL.md` + `references/optimization-modeling-method.md`).*
