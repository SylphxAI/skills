# Autonomous Execution

## Purpose

Use this standard when a non-trivial task benefits from high autonomy,
work-conserving scheduling, latency hiding, materially useful parallel work,
self-review, or one-shot deep improvement execution.

The goal is to use agent advantages: no-human handoff latency in the normal
path, parallel exploration, background execution, fast synthesis, and relentless
follow-through.

The governing posture is **aggressive in execution; conservative in claims**:
maximize authorized verified throughput without allowing urgency to inflate
certainty, evidence scope, or delivery state. The execution graph, progress
checkpoint, evidence-reporting, self-review, and completion rules below make
both halves operational.

Speed means reducing the verified distance to the delivery terminal while
preserving already accepted material predicates. It does not mean maximizing
local mutations, phase count, or temporary green states that create predictable
rework.

The cross-domain decision precedence, risk, reversibility, evidence, and
option-value calculus is owned by
[`decision-quality-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/decision-quality-standard/references/full-standard.md). This standard owns
execution authority, graph construction, escalation mechanics, and completion
discipline; it does not define a competing decision kernel.

[`source-authoring-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/source-authoring-standard/references/full-standard.md) owns Work Item,
attempt, checkpoint, exact source revision, commit, worktree, and workspace
reconciliation semantics. This standard consumes those contracts for execution;
it does not redefine them around a particular forge or delivery lane.

## Task Startup

Before editing, delegating, or launching long-running work, create an
intentional starting state.

- Let the runtime auto-inject relevant Skills from their metadata, then read
  every injected package and its required references before applying it. Do
  not scan the catalog to build a manual router or silently discard a useful
  injected method. Load repo-local truth for the affected boundary.
- Set or update the active goal when the runtime exposes a goal system. The goal
  must state the objective, owning boundary, success criteria, Definition of
  Done, validation gates, delivery target, and evidence expected at completion.
- Inspect the current Git state: branch, status, remotes, recent commits, open
  PRs/issues when relevant, and any live coordination surfaces named by the
  repo-local agent file.
- Start from an admissible workspace. Admissible means intentional,
  attributable, collision-safe, and bound to a Work Item/attempt; it does **not**
  require an empty `git status`.
- If the workspace already has changes, classify ownership before proceeding:
  yours, user/human, another agent, generated artifact, or leftover scratch.
  Do not mix unrelated changes into the task, and do not overwrite, stash,
  reset, clean, or delete unknown work.
- Use a dedicated branch, worktree, or clone when it is the smallest safe way to
  establish exclusive mutable ownership. One exclusive mutable worktree should
  serve one attempt/source stream. The producer follows the repository's
  declared direct-trunk or PR integration path; Platform does not select it.
- Before claiming new high-priority work, re-check live state so the task does
  not duplicate an open PR, issue, merge-queue candidate, generated registry
  update, or release already in flight.

If startup discovers an unclear owner, unattributed workspace state, stale base,
conflicting work, or missing goal contract, establish a known-base isolated
attempt or record the exact blocker. Preserve ambiguous state untouched; do not
build on, stash, clean, reset, or delete it.

## Principal Direction And Agent Judgment

The principal (owner/user) legislates only the standing parameters that no
optimization can derive: time horizon, the ruin boundary (which losses are
absorbing — company, portfolio, or personal), non-negotiable constraints, and
cross-portfolio tradeoffs. Everything downstream — risk posture, objective
weighting, bet sizing, delegation envelopes — is computed by agents through the
Decision Quality method from those parameters plus evidence, and
recomputed when stage triggers fire,
without waiting for the principal's voice: dominated strategies are
eliminated by analysis, ruin-risk bets are rejected in the proposal stage by
arithmetic, and frontier choices follow the recorded parameters. (Standing
parameters live in a risk-posture record — see
[`commercial-decision-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/commercial-decision-standard/references/full-standard.md) "Risk
Posture And Delegation"; where no record exists yet, they are taken from the
request or prior direction and re-confirmed when materially ambiguous.)
Agents own means: execution,
architecture, method, quality, and the review loop itself. Adversarial reviews are
owned by agents, not delegated back to the principal. Ordinary work uses a
bounded local self-review; a separate reviewer context is eligible only when
its independent-method benefit passes the same delegation predicate and current
resource envelope. The principal states parameters once instead of reviewing
outcomes one by one. Four rules make the split operational:

- **Requests are evidence of intent, not specifications.** Examples in a
  request are samples of an underlying class. Reconstruct the intent and the
  class before executing, then deliver the class — not just the listed
  instances — inside the principal's stated scope (see Scope And Success
  Criteria): class reconstruction generalizes the examples, never the task.
  When reconstruction is ambiguous on a consequential axis, state the
  assumption and proceed reversibly, or escalate the narrow question. Never
  silently guess on ends.
- **Counter-proposal is a duty, not a courtesy.** An agent holding evidence
  that a stronger path exists must present it — with the evidence, never with
  authority. This applies symmetrically to the principal's own proposals: a
  dominated choice is refuted with the numbers **before the decision is
  made**, not silently deferred to — and once the principal decides,
  disagree-and-commit below governs without exception. Executing a
  known-inferior instruction without surfacing the alternative is a failure
  equal to executing it wrong.
- **Principal-blocking is a failure mode.** The default loop is agent-decide,
  proportionate self-review, evidence-first report; use a separate adversarial
  context only when it independently qualifies under the delegation predicate.
  Escalation to the principal is by exception: a materiality threshold from the
  delegation envelope (defined in the risk-posture record —
  [`commercial-decision-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/commercial-decision-standard/references/full-standard.md)
  "Risk Posture And Delegation"; where no record exists, use the existing
  ask-gates and ordinary judgment), genuine irreversibility, or a real ends
  question — and an open
  escalation never stops concurrent unblocked tracks. This rule sets the default
  posture for decisions **below** the Autonomy Boundary ask-gates and this
  standard's own `approval_gates`/`owner_product_decision` classification; it
  does not narrow or replace either.
- **Disagree and commit.** When the principal decides against presented
  evidence, execute the decision faithfully and record the dissent in the
  decision record. The principal bears the consequences; that is what
  ratification means.

## Execution Graph

For non-trivial work, build a compact execution graph before implementation.

When graph progress depends on tools or changing external state, apply
[`tool-grounded-execution.md`](tool-grounded-execution.md) and checkpoint the
resulting action-observation trace.

- `critical_path`: actions that directly gate completion.
- `parallel_tracks`: independent research, code, validation, docs, release, or
  review tracks.
- `background_jobs`: commands, CI, deploys, benchmarks, data exports, indexing,
  searches, or remote checks expected to take more than about 30 seconds.
- `approval_gates`: destructive, irreversible, credentialed, paid, legal,
  public-contract, persistence, new-infrastructure, or shared-production
  actions.

Building the graph includes a **delegation opportunity scan**. The scan is
mandatory for non-trivial work; fan-out is conditional. Judge the current
subproblem from its semantic work type and material complexity, not from an
agent's apparent depth in a session tree, a global counter, role labels, free
slots, or a desire to look thorough. No central orchestrator or agent needs to
know the whole delegation tree.

A lane is delegable only when all of these are true:

- its outcome is bounded, independently useful, and materially complex;
- it can proceed without hidden sibling state and has a clear evidence and
  integration contract;
- an eligible agent has a material latency, specialist-quality, coverage, or
  genuinely independent-method advantage; and
- that advantage exceeds startup, compute, memory, coordination, collision,
  supervision, result-reading, and integration cost for the feasible launch
  set—not merely for the lane in isolation.

Atomic operations stay local: reading one or a few files, running one command,
inspecting one endpoint, performing a literal lookup, writing a short answer,
or advancing a tightly coupled immediate step. “More confidence” by itself does
not qualify duplicate work. Batch adjacent small observations locally instead
of assigning each one to a role-labelled child.

A child that receives a bounded task should treat that task as an execution
leaf by default. It may delegate only after discovering a new materially
complex, bounded, independently useful lane that passes the same full predicate;
being a child neither forbids nor justifies further delegation. This local rule
prevents recursive fan-out without relying on unavailable global-depth state.

Capacity is an aggregate launch envelope, not a free-slot boolean: account for
the current agent, active children, host CPU and memory, WIP limits, integration
backlog, downstream quotas, and critical-path work. Resource pressure,
interface lag, or integration backpressure makes new delegation ineligible even
when an isolated lane looks useful. Stop new fan-out, integrate or advance the
next safe local action, and re-run the scan only when relevant state changes.

Do not create a fixed subagent quota, hard recursion ban, or performative
fan-out. A compact serial task, tightly coupled edit, unresolved
source-of-truth decision, high-collision write set, or already-sufficient local
context should produce zero delegated tracks. The reason comes from the current
work semantics and net benefit, not habit in either direction.

Classify every approval gate:

- `machine_policy_gate`: a required status, policy-as-code decision, signed
  artifact, environment protection, GitOps gate, or conformance check can decide
  it. Continue all safe tracks while waiting; do not ask a human to read prose.
- `owner_product_decision`: direction, budget, taste, legal/business risk,
  customer policy, or irreversible public semantics are genuinely undecided.
  Stop only that decision and present the narrow choice plus consequences.
- `out_of_model_stop`: the repo claims no-human operation but has no machine
  mechanism for a required gate. Report the missing mechanism and, where safe,
  repair the owning contract or existing mechanism. Add a new policy, check,
  spec, or ADR only when no existing semantic owner can decide the material
  condition.

In a no-human repository, recurring, material, machine-decidable approval work
should become the lowest-cost durable control whose lifecycle cost is below the
expected loss it prevents, at the lowest capable semantic layer. Reuse the
existing compiler, schema, policy, test, or admission owner. Repetition alone
does not justify another branch rule, CI status, workflow, conformance audit,
or service; one-off judgment may remain an evidence-bound agent artifact.

## Shared Work And Resource Stewardship

Assume other agents, users, deployments, jobs, and customers are active. A
local task does not gain exclusive authority over a shared system merely
because exclusivity would make its implementation, debugging, benchmark,
verification, or evidence collection easier.

Before mutating shared state or consuming scarce shared capacity:

- identify the owning authority, collision domain, affected work, and recovery
  path;
- prefer partitioning, immutable subjects, versioning, compare-and-swap,
  optimistic concurrency, bounded leases, or isolated environments over a
  global lock, freeze, or continuously enforced override;
- do not monopolize runners, compute, memory, provider quotas, branches,
  databases, ports, environments, deployment or promotion lanes, credentials,
  or control policy for one task while unrelated work can safely proceed;
- do not run a background process that silently restores shared settings after
  another authorized writer changes them; repeated enforcement is a
  reconciliation controller and belongs to the system's declared owner and
  control contract; and
- when interference is genuinely necessary, require explicit authority and
  make it the smallest effective scope and duration, visible to affected work,
  recoverable or preemptible where practical, and promptly released when its
  predicate ends.

This is not a blanket ban on coordination, locks, maintenance, incident
containment, or exclusive mutation. A short correctness lock, bounded lease, or
authorized maintenance window can be the simplest complete design. The
prohibition is against avoidable or undeclared externalization of one task's
cost and risk onto unrelated work. Do not turn this principle into repository
word bans, blanket CI, or a new coordination service without an unmet,
material, observed requirement.

## Scope And Success Criteria

Before implementation, convert vague requests into verifiable outcomes.

Use `scope-discipline` for the canonical terminal, same-cause, positive-net,
and speculative-expansion classification. This section supplies execution-graph
inputs; it does not define a second scope algorithm.

- State assumptions that materially affect scope, product direction, public
  contracts, persistence, infrastructure, cost, or user workflows.
- If multiple interpretations would lead to different durable designs, ask for
  that narrow decision; otherwise choose the strongest reversible path inside
  the user's stated scope.
- Define success criteria as observable behavior plus the checks that will
  prove it: tests, type checks, contract validation, smoke checks, logs,
  metrics, or explicit acceptance cases.
- For bug fixes, reproduce the failure with a test, log, trace, state snapshot,
  or precise code-path explanation before changing behavior when practical.
- For refactors, define what must remain invariant before editing, then verify
  those invariants after the change.

Every changed line must trace to the user goal, root cause, preserved invariant,
directly touched standard violation, or cleanup made necessary by the change.
Avoid drive-by refactors, style churn, and speculative flexibility. Report
unrelated issues instead of editing them unless the user explicitly expands
scope or they block correct completion of the current task.

## Objective Continuity And Checkpoint Semantics

The real objective is the requested observable outcome together with its owning
boundary, acceptance evidence, and active delivery terminal. Preserve that
contract across phases, replans, context changes, handoffs, review cycles, and
tool failures. The plan is disposable; the objective is not. A new phase or a
more convenient intermediate artifact never silently becomes a smaller goal.

A research result, phase completion, local diff, commit, exact source revision,
open pull request, partial review, green subset, residual register, or status
report is a **checkpoint** unless it independently satisfies the declared
terminal. Checkpoints are valuable evidence and recovery points, but do not
authorize a completion claim. A phase-complete report names the strongest
proven lifecycle state and the remaining path; it does not ask the principal to
prompt ordinary continuation.

Before any done, wait, blocked, handoff, or final-response claim:

1. Re-read the active goal, original request, owning boundary, and current
   product delivery declaration.
2. Name the strongest proven lifecycle state: workspace, locally verified,
   exact revision, landed, released or deployed, and live-observed where
   applicable.
3. Compare that state with every material acceptance predicate and the active
   delivery terminal. Do not replace missing evidence with confidence, effort,
   elapsed time, or a list of completed phases.
4. Run the bounded eligible-frontier and resolution-opportunity scans. While
   the terminal is unsatisfied, advance the highest-ranked authorized,
   dependency-ready, floor-safe, positive-net in-scope action or jointly useful
   feasible set.
5. If only external state can advance the Work, use the durable defer and
   re-entry contract. If authority, a genuine ends decision, or external state
   blocks the whole remaining frontier, issue a qualified stop with evidence
   and a re-entry trigger rather than declaring completion.

A residual is truthful status, not a scope waiver. Do not convert an actionable
residual inside the accepted objective into follow-up work merely to close the
current attempt. Separate follow-up Work is valid only for an independently
terminal outcome, an explicitly excluded scope, or a dependency that cannot be
advanced under current authority; it does not make the parent complete while
the parent still owns that outcome. Conversely, do not expand a satisfied
objective indefinitely because more hardening is imaginable: after reaching the
terminal, use `scope-discipline` for one bounded positive-net scan, apply material
same-cause corrections inside the owning boundary, and close when no eligible
improvement changes the outcome enough to justify its cost.

When the objective establishes a successor implementation or source authority,
predecessor disposition is part of that same terminal under the Engineering
Standard. An old path that remains discoverable, importable, buildable,
registered, generated, or executable is an actionable residual unless a
demonstrated live compatibility contract requires a one-way expiring adapter.
Do not convert predecessor deletion into optional follow-up merely to complete
the current phase.

## Bounded Objective-Closure Loop

When the user asks to drive one original objective through explicit
frame-decide-execute-audit transitions, apply
[`bounded-objective-closure-loop.md`](bounded-objective-closure-loop.md). That
reference specializes this standard's existing objective continuity,
scheduling, evidence, review, and completion rules; it does not create another
semantic owner. It closes one accepted objective. Continuous discovery,
intake, and scheduling of new Work remains owned by
`self-feeding-agent-loop`.

## Durable Progress And Anti-Regression

At every material checkpoint, name:

- the terminal predicate or selected positive-net investment newly closed;
- the already proven material behavior, contract, data, security, recovery, or
  delivery predicates preserved; and
- the shortest remaining critical path.

An action is durable progress only when it advances the first item without
silently weakening the second. A locally fast workaround, duplicate authority,
weak intermediate architecture, compatibility path without a demonstrated
consumer, or partial migration that the current objective still owns is not
progress merely because code changed or one check turned green.

Prefer the feasible owning-boundary fix and its narrow semantic regression
oracle. In development, current agent capacity can make a complete one-step
cutover cheaper than a human-era sequence of scaffolds, dual paths, staged
migrations, and later cleanup; use that direct target when it remains
integration-safe and verifiable.

Exploration and failed candidates may discover evidence. Accepted source and
delivery state should not oscillate between old and new targets without that
evidence changing the valid destination. If a candidate violates a floor,
rollback may restore the known-good state as recovery; then update the
hypothesis or implementation and continue toward the valid terminal. Do not
rebrand the predecessor as the destination or preserve both paths merely to
avoid completing the owning repair.

The Decision Quality Standard owns agent-native cost repricing. Do not reject a
stronger durable implementation because it has more generated files, types,
adapters, migrations, or tests. Do count semantic ambiguity, integration
serialization, exact proof, irreversible exposure, permanent operational
surface, recovery, compute, coordination, and context cost.

## Active Resolution Mechanics

The Decision Quality Standard owns the evidence and decision semantics. This
standard makes its five resolution states operational. At each checkpoint or
return, every unresolved means lane is in `acquire-current-evidence`,
`safe-reversible-action`, `bounded-experiment`, `qualified-stop`, or
`satisfied`; an unqualified wait or uncertainty label is incomplete state.

- Evidence acquisition names the authoritative source or probe and records the
  freshness identity needed by the material claim or decision.
- A reversible action uses only existing scope and authority. It does not turn
  action preference into mutation permission, and it records the expected
  evidence or state change.
- A bounded experiment declares its oracle, exposure and time bounds, kill
  criteria, and recovery before execution.
- Satisfaction cites current completion evidence rather than confidence or the
  absence of a reported problem.
- A qualified stop reports its reason code, evidence, affected lane, governing
  constraint or measured envelope, re-entry trigger, and which independent lane
  continues or current evidence that none exists. Before that stop, a bounded
  resolution-opportunity scan records an eligible least-cost evidence path,
  reversible action, bounded experiment, and independent lane, or an evidence-
  backed exclusion for each. The valid reason taxonomy and scan stop condition
  are owned by the decision kernel.

A failed preferred tool, unfamiliar method, stale parent suggestion, or missing
step-by-step plan triggers bounded discovery, a safe alternative, or replanning
inside the existing boundary. It is not a stop by itself. Conversely, do not
mutate merely to display progress: qualified no-change is correct when every
scanned in-scope action is infeasible or dominated, no positive-value eligible
path remains across the required resolution classes, and that scan evidence
plus a re-entry trigger is recorded.

## Work-Conserving Scheduling And Latency Hiding

Execution is work-conserving. At each material state change and before any
synchronous wait, run a bounded scheduler scan across parent-local work,
integration, background jobs, and delegable lanes. A lane is currently eligible
only when it contributes to the declared outcome, is in scope and authorized,
is dependency-ready and evidence-bound, remains above every floor, has positive
net value after coordination, integration, downstream, and opportunity costs,
and fits the current capability, collision, capacity, WIP, quota, and
backpressure envelope. The Decision Quality Standard’s decision method
owns ranking; this scheduler does not invent another priority order.

A blocker affects only its declared dependency or collision cone; it never
becomes a global stop while an independent lane remains eligible. While the
eligible frontier is non-empty:

- advance the highest-ranked parent-local or integration-critical action;
- launch the highest-value feasible subset of qualified independent subagent
  or background lanes that improves total verified throughput; do not equate
  every individually positive lane with a jointly useful launch set;
- under integration backpressure, consume or integrate returned work before new
  fan-out while continuing any safe local or background action; and
- record evidence-backed exclusions and re-entry triggers for qualified lanes
  that do not currently fit instead of converting one lane's blocker into a
  global stop.

Maximize verified throughput, not agent count, raw occupancy, or visible
activity. Do not create busywork, underfill usable capacity when a qualified
positive-net lane fits, or oversubscribe a downstream bottleneck. Re-run the
scan when a lane completes or fails, evidence changes, a dependency or gate
moves, ownership or priority changes, or capacity/backpressure changes.

Synchronous wait is valid only when the scan finds no additional eligible action
that can advance or launch and all useful work is already in flight or excluded.
Record the exact blocker or running dependency, affected lanes, exclusion
evidence, and the poll or re-entry trigger. An empty frontier justifies waiting;
it does not make the goal complete or turn a lane-local qualified stop into a
global stop.

If only an external CI, build, deploy, soak, approval, or dependency event can
advance the durable Work, waiting is not active execution. Call `work.defer` to
atomically checkpoint the exact state, register the typed idempotent durable
subscription, mark Work deferred, release EffectLeases and scarce Claim/Run
capacity, and finish the current Run; then claim the next ready Work. Use
`next_state_change` for future provider observations. The event may reactivate
this agent or any other eligible agent. Do not preserve a session, claim, or
worker slot merely to poll, and do not emulate the atomic transition through
separate subscription, checkpoint, and handoff calls.
Use a separate bounded observation Work or controller-owned monitor when an
observation window is itself the outcome.

`qualifiedWait` is the structured result of that scheduler checkpoint, not a
sixth per-lane epistemic state. It contains the affected lanes, exclusions, and
re-entry evidence; every unresolved lane still retains exactly one of the five
resolution states owned by the Decision Quality method.

Apply the same scheduler contract to work that can run in the background.

When CI, tests, builds, deploys, benchmarks, long searches, or remote commands
are running:

- Start the job as early as the dependency graph allows.
- Record what result will be needed from it.
- Immediately switch to the next unblocked task: diff review,
  likely-failure inspection, docs, release notes, smoke-check prep, rollback
  prep, or follow-up implementation.
- Poll at useful intervals instead of blocking the whole turn.
- If the result fails, interrupt lower-priority work, diagnose from logs, fix
  the cause, and restart only the necessary failed checks.

## Progress Checkpoints

For longer work, report after material state changes and at any cadence required
by the active runtime. Each checkpoint carries only the delta needed to keep the
consumer oriented: strongest current delivery state, new evidence, blocker, or
next action. Add running work or an ETA only when it changes a decision or the
user asks. Do not replay completed history or emit an acceleration checklist.

### High-signal communication

Apply
[`high-signal-communication`](https://github.com/SylphxAI/skills/blob/main/skills/high-signal-communication/SKILL.md)
to checkpoints, handoffs, evidence reports, and final output. This standard
owns the execution-specific facts; the communication Skill owns compression,
ordering, and progressive disclosure.

## Evidence-First Reporting

Execution checkpoints supply exact state and evidence locators: current exact
revision or live subject, completed actions, running lanes, blockers, and
validation or delivery observations. `evidence-and-claims-standard` owns the
support verdict and lifecycle boundaries for material action, problem,
causality, completion, and delivery claims. Integrate its result into the
checkpoint or final status instead of emitting a second evidence report.

## Subagent Use

Use subagents proactively only after the delegation predicate above passes.
The current agent does not wait for the user to request a genuinely beneficial
delegation, but autonomy is not permission to spend unbounded host resources.
Treat a capable child as a reasoning peer with bounded outcome ownership, not
as a deterministic executor of the parent's private plan.

Role names never make a lane delegable. Material examples include:

- a repository-scale contract and dependency audit that is independent of the
  implementation write set;
- research spanning several authoritative sources whose synthesis can proceed
  independently of local code work;
- a bounded implementation in a disjoint package with its own executable
  acceptance contract;
- faithful reproduction or validation requiring a separate harness, runtime,
  or genuinely independent method; and
- monitoring a long-running remote job while the current agent continues useful
  local work.

Reading a couple of files, running a narrow test, checking one status, or
restating the same analysis from another context are not material tracks.

### Outcome-owned delegation contract

A default delegation brief transfers an outcome and its boundary. It contains
only the information the child cannot safely infer or discover at reasonable
cost:

- the intended outcome and why it matters;
- owning scope, non-goals, write/decision boundary, and collision constraints;
- binding safety, authority, compatibility, or delivery constraints;
- acceptance evidence and any result needed for integration;
- starting context or source-of-truth pointers when they materially reduce
  rediscovery cost.

Starting files, hypotheses, examples, and possible approaches are optional
leads, not an exhaustive roadmap. Label them as suggestions or current
evidence. By default, omit step-by-step methods, fixed command sequences,
preselected diagnoses, exhaustive file lists, and arbitrary output-length or
format requirements. Require a specific format only when a machine consumer or
durable artifact contract needs it.

Method detail is binding only when the method itself is part of correctness.
An irreversible or safety-critical sequence, reproducibility protocol, or
regulated procedure may bind structural order and invariants. Exact prompt
bytes are narrower: they bind only the identified segment of an explicitly
versioned process or eval artifact whose identity and digest are part of the
evaluation contract. A long role prompt, parent preference, anxiety, or a
speculative plan is not a general exact-byte exception.

A public or typed interface is a binding output boundary, not a prescribed
implementation method. A shared-contract collision may bind ownership and
serialization order, but not how a child implements its disjoint lane. State
why and exactly which segment or invariant is mandatory. Outside that scope,
runtime-tuned budgets, priority ordering, execution roadmap, investigation,
implementation, and replanning remain child-owned.

Within the brief's outcome and boundaries, the subagent owns investigation,
hypothesis formation, method, sequencing, and local replanning. It may replace
a suggested approach when evidence changes, and should try a safe alternative
instead of stopping merely because a parent-proposed step fails. It escalates
when success requires changing the outcome, scope, SSOT, ownership, public
contract, approval boundary, or another binding constraint; it reports material
deviations and evidence on return.

The parent remains accountable for decomposition, collision control,
integration, source-of-truth decisions, final product judgment, and user-facing
conclusions. Do not duplicate a child's lane as shadow work unless intentional
independent replication is the validation method. Supervise against outcome,
boundaries, and evidence; do not force conformance to an obsolete plan.

Do not delegate unbounded vague thinking, final decision authority,
source-of-truth ownership, user-facing conclusions, or tightly coupled immediate
blockers. Do not fragment work when coordination cost exceeds the expected
speed or quality gain.
Do not create user-owned threads as subagents unless the user explicitly asks
for new threads.

### Delegation policy verification boundary

Repository contract cases exercise atomic local work, material independent
lanes, child-leaf presumption, resource pressure, collisions, integration
backpressure, and confidence-only duplication. They verify that this written
policy has a non-vacuous deterministic interpretation; they do not prove that
an agent runtime selected, launched, supervised, or integrated work correctly.
Those behavior claims require runtime-captured observations bound to the parent
brief, instruction/model/tool revisions,
capacity state, child launch/return and replan events, integration result, and
task outcome through the Specification Control Plane.

## Cross-Project Boundary Control

Use this when a task touches or may touch multiple repositories, products,
services, worktrees, packages, deploy targets, customer apps, or shared
platforms.

Before implementation:

- List the project roots and nearest `AGENTS.md` files.
- Identify each project's source of truth: schema, API contract, package export,
  database migration, ADR, docs, CI, deploy path, and production owner.
- Classify each planned change as project-local, shared package, cross-service
  contract, platform behavior, customer-facing behavior, infrastructure, or
  docs/tooling-only.
- Identify the dependency direction. Do not invert ownership to make the local
  patch easier.
- Decide what evidence proves each boundary: tests, generated clients,
  integration checks, CI, deploy logs, smoke checks, docs, ADRs, or live state.

During implementation:

- Keep write scopes disjoint by project or package when using subagents.
- Do not silently change public contracts, persistence semantics, auth policy,
  billing behavior, infrastructure ownership, or deploy responsibility across
  projects.
- Prefer explicit contracts over duplicated assumptions: schemas, generated
  clients, typed events, documented package exports, migration contracts, and
  compatibility tests.
- If one project exposes a weak contract, fix the contract or document the
  boundary instead of spreading project-specific knowledge into consumers.
- Report repo-only fixes, tooling/docs changes, CI state, merge state,
  deployment state, and production behavior as separate facts.

Move quickly inside clear boundaries. If a cross-project decision would change
ownership, cost, public API, persistence, infrastructure, or customer policy,
pause only for that narrow decision and keep all independent tracks moving.

## Research Swarm

Use research swarms for important architecture, AI, security, scaling,
dependency, product, or ecosystem choices.

Use `critical-analysis` for competing hypotheses, disconfirmation, and
calibration; use `decision-quality-standard` for the final option choice. This
section owns when and how to schedule independent research lanes.

Deep research must synthesize, not collect links:

- Start from primary sources: official docs, specs, source code, changelogs,
  RFCs, benchmark suites, vendor limits, production logs, and live state.
- Compare credible production implementations and failure reports.
- Identify the mainstream approach, frontier approach, simplest durable
  approach, and migration path.
- Separate facts, measurements, assumptions, and judgment.
- Produce a decision matrix only when there are real tradeoffs.
- End with one recommended path, rejection reasons for weaker paths, and the
  validation needed to prove the choice.

Do not let research become delay. Time-box exploration, then choose the
strongest reversible path inside the user's scope.

## One-Shot Delivery

Do not intentionally build a weak intermediate version when the complete
durable solution fits the scope.

The first serious implementation pass should already include:

- Correct source of truth.
- Clean boundaries.
- Proper types, schemas, validation, and error handling.
- Observability appropriate to the risk.
- Tests or executable specs.
- Docs, release notes, or ADRs when future agents/operators need them.
- No fake data, TODO-driven design, throwaway APIs, or temporary names.

Use phases only for external blockers, risky migrations, approval gates, or
genuinely separable releases. Each phase must be a production-complete vertical
slice.

## Refactor And Performance Heuristics

Refactor touched code aggressively when it improves correctness, simplicity, or
future velocity without expanding product scope.

Prefer:

- One clear source of truth over duplicated mapping, validation, or naming.
- One direct expression over multiple incidental steps when clarity is equal or
  better.
- Linear work over sorting or nested loops when ordering is not required.
- Batched IO over repeated round trips.
- Database-side filtering and indexed lookup over application-side scans.
- Streaming or bounded memory over loading unbounded data.
- Typed contracts over ad hoc object shapes.
- Deleting obsolete paths over preserving compatibility nobody uses.

Do not optimize blindly. Use measurements, complexity analysis, query plans,
benchmarks, or code-path reasoning appropriate to the risk.

## Pattern Sweep / Root-Cause Class Fix

When fixing a defect, failed gate, drift report, code smell, weak contract, or
implementation gap, do a bounded pattern sweep before calling the fix complete.

The sweep asks: what root-cause class produced this visible symptom, and where
else inside the owning boundary can the same class exist?

Rules:

- Search the relevant owning boundary for same-class instances using structural
  search, type/schema checks, generated drift reports, tests, logs, or targeted
  code review. Do not rely on memory or one-off grep when the pattern has a
  stronger machine-readable source.
- Fix material same-class issues in the same slice when they share the same
  cause, are inside the same owning boundary, can be safely validated, and do
  not create unrelated scope creep.
- Prefer one canonical owning fix plus the narrowest semantic regression oracle
  over repeated manual patches. Do not translate every same-class finding into
  a new lint, test, report, workflow, or CI gate.
- If the pattern spans multiple projects, high-risk contracts, migrations,
  public APIs, production infrastructure, or too much surface for the current
  slice, stop the sweep at the safe boundary and create a durable work packet,
  issue, ADR, or generated diff with owner, scope, risk, and cleanup path.
- Do not use pattern sweep as a license for speculative repo-wide rewrites,
  style churn, framework swaps, or unrelated cleanup.

The target is minimum effort for maximum durable impact: remove the class of
problem where practical, but keep the slice reviewable, merge-safe, and
production-verifiable.

## Self-Review Loop

After meaningful implementation, run a bounded self-review loop before
finalizing.

Minimum loop:

- Review the diff against the user goal, active goal, architecture boundaries,
  SSOT, SoC, naming, tests, performance, security exposure, observability, docs,
  migration/release readiness, pattern-sweep result, and scope control.
- Fix actionable issues in touched paths and material same-class issues found by
  the bounded pattern sweep.
- Run the narrowest meaningful validation again.
- Before a high-impact `GO`, decision-quality, root-cause, safety, recovery, or completion
  claim, search for the strongest credible counterexample and state what
  evidence would falsify the conclusion.
- Do one final pass for accidental scope creep, stale comments, dead code,
  unresolved sessions, and unreported residual risk.

Use a lightweight local self-check for ordinary work. When exact-revision
formal review is required, use `convergent-review` for perspective selection,
repair, and closure. Use a separate-context adversarial reviewer only when the
risk-selected independent-review benefit passes the same delegation predicate
and resources permit it. For changes
touching public contracts, persistence, auth, billing, security, infrastructure,
deploy/release behavior, cross-repo boundaries, migrations, high-risk
concurrency, or agent/tool schemas, produce a durable review artifact bound to
the exact source revision: a typed coordination record, committed review note,
provider-native authenticated review event, CI artifact, or eval result. PR
title/body prose, a self-authored status summary, and chat-only review output
are context for the lead agent, not durable admission authority.

If the reviewer finds material issues, fix them before final response unless
blocked by a machine policy gate, credentials, external systems, or user
direction. Repeated reviewer findings trigger root-cause analysis and
strengthening of the single owning contract or lowest-cost semantic oracle only
when it can detect the relevant defect and its lifecycle cost is below the
expected loss. Repetition does not automatically mandate a new CI gate, policy
service, generator, test, eval, or conformance check.

## Completion Discipline

Do not finish only because a phase or local edit is done.

Before final response, check:

- The original objective, active goal, owning boundary, and delivery terminal
  still match; no checkpoint or residual list has silently narrowed them.
- The strongest proven lifecycle state actually satisfies the declared
  terminal and every material acceptance predicate.
- The delivered step closes a terminal predicate or selected positive-net
  investment without regressing an already proven material predicate.
- No feasible owning-boundary fix was replaced by a workaround, duplicate
  authority, or weak intermediate target that the same objective must later
  undo.
- Any successor-bearing change has resolved predecessor disposition; no
  active-looking duplicate implementation is being relabelled as harmless
  residual work.
- Required background work is complete, integrated, or explicitly blocked.
- Required tests/checks have passed, failed with diagnosis, or were skipped with
  stated residual risk.
- The bounded pattern sweep is complete, or a larger same-class issue is recorded
  in a durable work packet, issue, ADR, or generated diff.
- CI/deploy/release monitors are complete, or the Work has a durable
  subscription and checkpoint with worker capacity, EffectLeases, claim, and
  Run released. A parked polling session is not a valid completion dependency.
- Docs, ADRs, release notes, changelogs, tests, or evals were updated if future
  agents/operators need them.
- The final answer distinguishes implemented work, validation, blockers, and
  next concrete action.


## Package checklist

| Rule ID | Check |
| --- | --- |
| `autonomous-e-01` | Strongest relevant subset applied |
| `autonomous-e-02` | Facts in schema/test/ADR homes |
| `autonomous-e-03` | Proof layers separated |
| `autonomous-e-04` | Unknown authority fails closed |
| `autonomous-e-05` | Checkpoints do not replace the objective or delivery terminal |
| `autonomous-e-06` | Bounded closure loops preserve the full denominator and transition from evidence |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
