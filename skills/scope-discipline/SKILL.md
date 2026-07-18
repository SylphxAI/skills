---
name: scope-discipline
description: "Keep planning, implementation, migration, architecture, and review work rigorous, agent-native, high-leverage, and finishable. Use when a task risks over-engineering, under-engineering, human-era cost assumptions, repeated review expansion, speculative hardening, missed future-proofing, or a completion bar that keeps moving."
---

# Scope Discipline

Finish the requested outcome with the fastest effective path and the strongest
positive-net durable result. Time, compute, attention, future velocity, and
option value all matter. Avoid both expanding ceremony and false economy.

## Method

### Bind the task

Before substantial work or review, state:

- the original objective;
- the owning boundary;
- the observable terminal condition;
- the material risk floor already implied by the task; and
- what is explicitly outside scope.

Keep this contract stable. Change it only when the user changes the objective or
current evidence proves the original terminal unsafe, impossible, or internally
contradictory.

### Stay grounded

- Separate verified fact, inference, and hypothesis. Never invent a blocker,
  attack, dependency, requirement, or completed result.
- Acquire only the evidence needed to decide or prove the material claim. More
  observation is not automatically more truth.
- Reproduce the real failure and fix its owning cause. Do not ship a workaround,
  but do not use "root cause" as permission to redesign unrelated systems.
- If evidence disproves the current plan, replan directly. Do not preserve sunk
  work, ceremony, or a preferred mechanism.

### Execute for time-to-value

- Choose the shortest path that can produce the required durable outcome and
  decisive evidence.
- Work from the critical path. Parallelize independent positive-value work, but
  do not create coordination work merely to keep agents busy.
- Compare every extra mechanism or proof step with its marginal risk reduction,
  delay, compute cost, and opportunity cost. Above the declared floor, stop when
  the added protection costs more than the risk it materially removes.
- Prefer a narrow test that exercises the claim over a broad suite that does not.
- Do not add multi-day soak, smoke, canary, or observation windows unless the
  requested behavior is time-dependent, current evidence identifies a
  time-dependent failure, or the declared production risk requires that window.
  Use the shortest window capable of falsifying the claim.
- Never convert an optional monitoring period into a blocker for already proven
  source, migration, or non-production work.

### Reprice work for the agent-native cost model

Treat historical human effort estimates as hypotheses, not constraints. Reprice
each option using current agents, tools, automation, parallelism, and reusable
artifacts before choosing an architecture or delivery path.

Agent-native costs often make these comparatively cheap:

- generating coherent modules, contracts, adapters, migrations, and tests;
- exhaustive search, file-by-file review, and parallel semantic comparison;
- maintaining explicit boundaries and mechanically consistent projections; and
- exploring several candidates before selecting the strongest verified one.

Real costs still include ambiguity, conflicting semantics, shared-write and
integration bottlenecks, dependency propagation, slow proof, external effects,
irreversible state, operational surfaces, and long-term maintenance. File count,
typing effort, or human review hours alone are not valid reasons to choose a
weaker architecture. Conversely, agent generation speed does not justify fake
layers, unused abstractions, or a larger ongoing operational surface.

Prefer a richer architecture when clear semantic boundaries, maintainability,
parallel ownership, migration safety, future velocity, or option value exceed
its agent-native lifecycle cost. Prefer the simpler design when extra structure
adds no durable capability or makes future change harder.

### Compress calendar time with agent-native proof

Do not estimate or sequence work from human typing, reading, or review capacity.
When the bottleneck is parallelizable analysis or implementation, shard it
across as many agents as remain positive-value and integration-safe.

Replace passive calendar waiting with active proof where possible:

- exhaustive file, symbol, contract, and call-site review;
- independent semantic cross-checks and candidate comparison;
- static analysis, model checking, property and mutation testing;
- differential tests against the old implementation;
- historical traffic or event replay;
- accelerated simulation, synthetic load, fault injection, and virtual clocks;
- shadow execution and short progressive exposure with automatic rollback.

These are examples, not a closed checklist. Search the currently available
agent, tool, analysis, synthesis, simulation, and execution frontier for a
faster credible proof rather than replaying a historical human workflow.

Distinguish **proof time** from **observation time**. More agents and compute can
compress proof time dramatically. Require real wall-clock observation only when
the material claim itself depends on elapsed time or external behavior that
cannot be reproduced credibly, such as long-horizon resource degradation,
rare production exposure, regulated waiting periods, or real customer response.

Any blocking soak, smoke, canary, or A/B window must state:

1. the exact time-dependent hypothesis;
2. why replay, simulation, parallel review, or accelerated testing cannot answer it;
3. the minimum evidence-bearing duration or sample size;
4. early-stop and rollback conditions; and
5. which independent work continues meanwhile.

Tradition, round numbers, and "extra confidence" do not justify a three-day,
seven-day, or three-month delay. If exact-tree analysis, tests, migration proof,
and rollback establish the declared terminal in a day, cut over in a day.

Scale agents to remove real work, not to multiply ceremony. Stop adding agents
when coordination, shared proof, integration, or external effects become the
actual bottleneck; then optimize that bottleneck directly.

### Exhaust active proof before waiting or working around

Before accepting a workaround, calendar delay, or passive production wait,
perform this proof-opportunity scan in order:

1. inspect exact source, contracts, history, and current state;
2. shard files, symbols, capabilities, and call paths for parallel semantic review;
3. add or strengthen unit, contract, property, mutation, and differential tests;
4. use static analysis, model checking, virtual clocks, replay, and simulation;
5. use synthetic load, fault injection, shadow execution, or a reversible short canary;
6. require real traffic or wall-clock time only for the residual hypothesis none
   of the earlier methods can test credibly.

For every skipped level, name the concrete reason it cannot resolve the claim.
"Safer to wait" and "production will tell us" are not evidence. Production
smoke is a final boundary check, not a substitute for understanding and testing
the code.

A workaround is admissible only when the owning fix is currently impossible
because of a demonstrated external constraint. Keep it bounded, visible, owned,
expiring, and paired with the replacement path. Never use a workaround merely
because active proof or root-cause work is inconvenient.

### Bind proof to the lifecycle stage

Identify the current stage before choosing evidence or rollout:

| Stage | Default proof and delivery posture |
| --- | --- |
| Development | Exhaustive agent review, static analysis, tests, replay, simulation, and local/integration environments. Do not wait for nonexistent real traffic. |
| Internal dogfood without external users | Complete development proof, then short synthetic/live smoke with fast rollback. Calendar soak is non-blocking unless the behavior is inherently time-dependent. |
| Internal beta with real users | Treat user safety and data as real production concerns; use bounded exposure, telemetry, rollback, and the shortest statistically or operationally meaningful window. |
| Public production | Use risk-proportionate progressive delivery and live readback after pre-production proof. Long-term monitoring continues after delivery unless a named time-dependent hypothesis makes it terminal. |

Do not import a later stage's waiting ritual into an earlier stage. Conversely,
do not call real users "internal" to waive safety, privacy, data integrity, or
recovery floors.

For product experiments, separate software correctness from customer-response
uncertainty. Agents, replay, and simulation should close correctness first.
Real-user A/B evidence is required only when the unresolved decision genuinely
depends on human behavior, and its duration follows sample/information needs,
not a conventional number of weeks.

### Control expansion

Classify every proposed addition or review finding:

1. **Terminal blocker** — directly prevents the declared outcome or violates its
   existing correctness, security, or delivery floor. Fix it.
2. **Same-cause defect** — the same root cause exists in the touched owner
   boundary and leaving it would make the fix false. Include the bounded fix.
3. **Positive-net in-boundary improvement** — useful architecture, cleanup, automation, or
   future-proofing inside the owner boundary. Evaluate it in the bounded high-value
   scan; implement it now when its durable benefit clearly exceeds its full
   agent-native lifecycle cost.
4. **Independent or speculative expansion** — has a different owner/lifecycle,
   or depends on an undeclared adversary, scale, infrastructure, product, or
   authority model. Defer or reject it from the task.

A reviewer may fail a candidate only for categories 1 or 2 and must name the
pre-existing acceptance criterion or floor that is violated. A newly imagined
criterion cannot retroactively fail otherwise correct work.

An executor applies the same classification before implementing anything not
directly required by the task. "It may be useful later" is not enough; name the
durable benefit, total lifecycle cost, evidence, and why now is the highest-value
time to do it.

### Run one bounded high-value opportunity scan

Passing the primary terminal proves the requested outcome; it does not forbid
high-value improvement. Before final closure, run one bounded scan for adjacent
opportunities inside the same owner boundary.

Estimate net value as durable outcome, future velocity, and option value minus
implementation, integration, verification, operational, maintenance, risk, and
opportunity costs. Re-estimate every term using current agent capabilities.

Implement an opportunity in the current slice when all are true:

- it materially improves correctness, architecture, maintainability,
  extensibility, performance, future velocity, or option value;
- current agent-native implementation and verification cost is low relative to
  that durable benefit;
- it does not create a separate product, authority system, operational service,
  or unbounded migration;
- it can be verified now without an unjustified calendar wait; and
- it preserves or strengthens the declared terminal.

Use parallel agents for independent positive-net opportunities when integration
capacity permits. Stop the scan after the relevant boundary is covered; do not
recursively search the whole portfolio. Defer opportunities with weak evidence,
diminishing returns, a different owner, a separate lifecycle, or a larger
opportunity cost.

The target is the strongest net-value result under the real objective and current
capability frontier. It does not mean maximum layers, maximum safety mechanisms,
maximum tests, or theoretical perfection.

## Guardrails

- Prefer an existing primitive, direct implementation, deletion, or one local
  check before adding a service, repository, control plane, generator, workflow,
  trust system, or recurring reconciler.
- Match the threat model to the declared environment. Do not design for hostile
  principals when the task assumes trusted internal agents unless security or
  authority isolation is itself the requested outcome.
- Add gates only when they test a material claim and have a failure mode the
  current task must prevent.
- Keep the proof surface smaller than, or proportionate to, the behavior being
  protected. A small content or code change must not silently become a new
  authorization platform or operational service.
- Do not create machinery whose lifecycle is larger than the problem it solves.
- Include high-return future-proofing found by the bounded high-value scan. Do not use
  future-proofing as a label for speculative abstraction or unrelated scope.

### Bound review

Perform one primary implementation review and, for genuinely high-risk changes,
one independent adversarial review. Integrate material findings, then re-run the
declared checks. Do not recursively create new review systems to defend against
the reviewer, the gate, or the agent itself.

When a review discovers an independent concern, preserve it as a short follow-up
item only if it has concrete value. Do not implement it merely to make the report
look exhaustive.

### Close decisively

When the declared terminal conditions pass:

1. run the bounded high-value opportunity scan once;
2. implement and verify the selected positive-net improvements;
3. stop when remaining ideas are lower-value, speculative, or outside boundary;
4. report the delivered outcome, evidence, and deliberate exclusions; and
5. mark the task complete.

Never report `FAIL` solely because a stronger unrelated system could be built.
Never stop merely because the minimum terminal passed when an obvious,
high-return, in-boundary improvement is cheap to deliver now. Completion is the
point where the requested outcome and selected positive-net improvements are
verified, not the point where imagination runs out.

## When not to use

- Do not use this skill to waive a correctness, security, legal, credential,
  destructive-action, or public-contract floor already present in the task.
- Do not use it as a substitute for domain engineering, incident response, or
  delivery procedures; use it alongside them to keep their application bounded.
- Do not label necessary root-cause work as over-engineering merely because the
  direct fix is difficult.

## Output

Return a compact closure note:

- **Objective** — the bounded outcome.
- **Terminal** — pass or the exact original blocker.
- **Evidence** — checks that exercise the required claim.
- **Selected investments** — high-return adjacent improvements included now.
- **Excluded expansion** — optional work deliberately kept outside scope.
