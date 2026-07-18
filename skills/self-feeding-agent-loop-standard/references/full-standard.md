# self-feeding-agent-loop-standard (canonical body)

**Authority:** binding Standard Skill package `self-feeding-agent-loop-standard` in `SylphxAI/skills` (`skills/self-feeding-agent-loop-standard/`).

**Cutover:** migrated from Doctrine `standards/self-feeding-agent-loop-standard.md` at digest `sha256:3133b018bb40c84437fd993ba7bd99bf737244ade3a366e619312874afa8f649` (doctrine `f7b1eb91cacf7b2495baf19ac5cd7e23941dc7d7`). Doctrine file is alias-only after cutover.

Author here; do not maintain a second prose SSOT.

---

# Self-Feeding Agent Loop Standard

## Purpose

Use this standard when agents are asked to find issues themselves and drive the
fix loop through other agents. This is a branch of the agent-first development
model: user-directed work remains the highest-priority lane, while the
self-feeding lane continuously discovers evidence-backed work and moves accepted
items through the active delivery profile's coordination, admission,
serialization, and verification controls as any other change. Forge-specific
terms below describe the current `github-delivery` profile; they are adapter
mechanics, not constitutional invariants.

The loop is a program system, not a motivational prompt. Its launch envelope and
role references are versioned, it runs with a bounded tick/readout contract, and
it improves only through ADR-linked doctrine changes. Source-controlled wording
does not make an entire runtime prompt exact or override outcome-owned
delegation.

This standard composes with:

- [`agent-first-development-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/agent-first-development-standard/references/full-standard.md)
  for GitHub-native coordination, issue/PR ownership, structured agent audit,
  collision handling, and machine gates;
- [`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md) for
  subagent use, execution graphs, and completion discipline;
- [`prompt-architecture.md`](https://github.com/SylphxAI/skills/blob/main/skills/prompt-architecture/references/full-standard.md) for role-prompt
  derivation and adapter boundaries;
- [`specification-control-plane-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/specification-control-plane-standard/references/full-standard.md)
  for work packets and high-risk eval/simulation/telemetry artifacts;
- [`delivery-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/delivery-standard/references/full-standard.md) for the done-state ladder.

## Operating Model

The standard topology is:

```text
Parent evaluator / process owner
  -> Coordinator Agent
     -> Reviewer agents discover evidence-backed issues
     -> Builder agents triage, fix, test, and request verification
     -> Reviewer verifies original reproduction path
     -> Builder closes only after verification and delivery proof
```

Under the current delivery profile, GitHub is the durable public coordination
surface: issues are intake, PRs are execution, labels and structured comments
are audit metadata, required checks are gates, and merge/deploy/readback
evidence proves done state. Chat-only state is not ownership. A successor
profile must preserve those functions and migrate their durable identities.

Child agents work as independent lanes. Reviewers and Builders must not read
each other's private run logs, hidden prompts, final reports, scratch files, or
parent chat context. The Coordinator must not act as a side-channel message
broker or feed one child's private output into another child's prompt. Handoff
state is only the target repository's Git/GitHub state: issues, comments, PRs,
branches, commits, checks, labels, and deployment/readback evidence.

## Ownership

This Skills package owns the reusable process shape, launch envelope, role
references, required readout fields, and improvement policy. Target
repositories own their local project facts, issue contents, implementation,
CI, deployment, and production proof.

Do not fork this loop into repo-local prompts. A repo or runtime adapter may set
assignment metadata, launch profile, tick count, and tool-specific spawn wiring,
but reusable role behavior changes belong here and require an ADR.

## Launch Envelope

The parent process, runtime adapter, or launcher script renders the compact
Coordinator envelope before spawn. The default renderer does not embed the long
Reviewer or Builder references. The Coordinator gives each qualified child an
outcome-owned brief and source pointers; the child loads only the role material
needed for its lane. Do not ask the Coordinator to reconstruct or copy a long
prompt during the tick. The owning runtime renderer is
[`scripts/render-self-feeding-agent-loop.py`](https://github.com/SylphxAI/doctrine/blob/main/scripts/render-self-feeding-agent-loop.py).

Every self-feeding loop launch must state:

- assigned project or projects;
- run mode: `bounded-tick` by default, or an explicitly named continuous mode;
- maximum coordinator ticks for this invocation;
- model/reasoning launch profile when the runtime supports model selection;
- allowed mutation scope: issue-only, branch/PR, deploy, or read-only dry run;
- delivery gate: local validation, PR only, merge queue, deploy/readback, or
  explicit blocker reporting;
- parent readout requirement.

For subagents that start from a fresh context, keep that context clean for
prompt-quality tests. Do not fork parent context into the Coordinator when the
goal is to test whether the prompt is self-contained.

If the runtime supports model overrides, the parent sets the Coordinator launch
profile and the Coordinator must pass the same launch profile to every child and
critical-review descendant. If the runtime cannot enforce descendant model
selection or inheritance, the Coordinator records an `out_of_model_stop` in the
tick report instead of silently weakening the test.

## Bounded Tick Contract

A self-feeding agent is not allowed to disappear into an unobservable infinite
loop.

Default behavior is one bounded tick:

1. validate runtime capabilities and assigned project context;
2. emit an immediate capability report if the runtime, repository, or launch
   envelope is not usable;
3. inspect enough Git/GitHub coordination state to identify bounded candidate
   outcomes, active ownership/collisions, integration backlog, and required
   capabilities;
4. run the delegation-opportunity scan and launch only qualified lanes whose
   expected gain exceeds coordination and integration cost inside the aggregate
   capacity envelope;
5. take only the role actions allowed by the template;
6. return a Coordinator Tick Report to the parent and stop.

A bounded tick must have a parent-observable timebox. If the tick cannot inspect
GitHub, start children, or receive child outputs before the timebox expires, the
Coordinator returns a partial tick report with exact blockers and next safe
action. It must not keep running silently past the timebox.

Read-only dry-run pilots default to `coordinator-only` unless the launch
envelope explicitly allows child fan-out. This proves the Coordinator prompt can
produce a parent readout before spending subagent capacity. Child fan-out is a
second pilot stage after the coordinator-only report is observable.

Continuous operation is allowed only when an external scheduler, monitor, or
parent thread has an explicit readout channel and WIP/capacity limits. Even in
continuous mode, every tick emits a machine-readable or parent-readable summary.

The tick report must include:

- assigned project(s);
- run mode and tick number;
- active Reviewers and Builders, with agent IDs where available;
- issue queue counts and ready-for-review counts;
- stale/suspected stale claims;
- stalled/suspected stalled PRs;
- new agents started and agents intentionally not replaced;
- prompt or workflow issues needing doctrine/user attention;
- exact blockers and next safe action.

## Launch Template And Role References

The canonical compact Coordinator envelope lives at
[`templates/self-feeding-agent-loop.md`](https://github.com/SylphxAI/doctrine/blob/main/templates/self-feeding-agent-loop.md).
Reviewer and Builder files under `templates/self-feeding/` are progressively
loaded role references, not child prompts embedded into every Coordinator
launch and not a mandatory per-task roadmap.

The default mode is `operational-outcome-owned`. An `evaluation-exact` mode is
unavailable unless the launch names a separate schema-valid `eval-manifest` v2,
an append-only prompt fixture or segment, and their exact digests. The default
renderer never loads that fixture. Adding such a mode requires its own fixture,
manifest, evaluator, negative controls, and ADR-linked admission; a `spec-only`
manifest would still grant no runtime or release authority.

Exact-byte comparison applies only when a declared, versioned process/eval
invocation binds this template or a named segment by digest. That evaluated
segment is a narrow exception to ordinary outcome-owned delegation, not a
general license to freeze a long role prompt. Structural role, mutation, and
delivery boundaries remain binding; runtime budgets, priority ordering,
roadmap, investigation, and replanning outside the evaluated segment remain
adaptive. No current self-feeding runtime invocation binds the whole
Coordinator, Reviewer, or Builder reference by digest.

Allowed substitutions are limited to the placeholders declared by the template:

- `{{ASSIGNED_PROJECTS}}`
- `{{RUN_MODE}}`
- `{{MAX_COORDINATOR_TICKS}}`
- `{{COORDINATOR_TICK_TIMEBOX}}`
- `{{LAUNCH_PROFILE}}`
- `{{MUTATION_SCOPE}}`
- `{{DELIVERY_GATE}}`
- `{{AGENT_ID}}` inside role-reference examples and machine-consumed comment
  shapes; the Coordinator assigns a stable value in the child brief

Do not add hidden project context above or below the template during prompt
quality tests. If a child needs project assignment, the assignment must be in the
child prompt itself, not inherited from parent chat history.

## Coordinator Rules

The Coordinator owns workflow health only. It does not implement fixes, review
code, create issues, close issues, rewrite child prompts, or make product,
architecture, pricing, public-contract, persistence, infrastructure, payment,
legal, or customer-policy decisions.

The Coordinator may:

- inspect the minimum coordination evidence needed to qualify a bounded
  Reviewer or Builder lane;
- start qualified Reviewer and Builder agents with outcome-owned briefs;
- pass launch-envelope facts and source pointers needed for the lane;
- inspect only the minimum GitHub coordination state needed for launch,
  collision/staleness, and child-agent health;
- compare child outputs after a bounded tick for parent health reporting, without
  passing those outputs to sibling agents;
- scale within declared soft limits;
- recover suspected stale claims and stalled PRs through the documented process;
- record prompt or workflow defects in the tick report;
- ask the parent/process owner for an owner-product decision or doctrine change.

The Coordinator must not silently mutate child prompts. If the prompt is wrong,
the correct action is a tick-report finding and a doctrine PR/ADR, not an
in-place one-off fix.

The Coordinator must not serialize the loop as Reviewer-output-then-Builder
handoff. When child fan-out is allowed, Reviewer and Builder lanes should start
from fresh contexts and independently inspect GitHub state. If a runtime cannot
isolate child contexts or would require sibling-output sharing, the Coordinator
records a workflow blocker instead of weakening the test.

There is no minimum child quota. Before every launch or replacement, qualify the
track under the Autonomous Execution Standard: bounded outcome, no hidden
sibling state, evidence contract, capability fit, net benefit, aggregate WIP and
integration capacity, and collision-safe ownership. An available slot is not
permission to spawn. Launch a qualified lane early once this evidence exists;
when none qualifies, keep the safe local coordination action moving and record
why no child started.

Child launch failures are workflow findings, not an invitation to spend the tick
debugging adapter syntax. The Coordinator may perform one bounded launch smoke
test when the adapter contract is ambiguous. If a child exits immediately,
produces no report, or the launch command is unclear, the Coordinator records a
`child_launch_blocked` finding with the exact failing command and returns the
Coordinator Tick Report within the tick timebox.

The Coordinator performs qualification before launch, but not deep child work.
It may inspect queue summaries, candidate issue/PR identity, active claims,
collision state, downstream capacity, and the evidence needed to bound the
lane. Code investigation, diagnosis, and implementation method belong to the
child. If qualification cannot complete inside the tick, return
`delegation_qualification_blocked` with the missing evidence instead of spawning
performatively or timing out in broad analysis.

The Coordinator must not manually retype or reconstruct long role references.
It sends a compact outcome-owned brief. A runtime may pass an exact segment only
when the launch names the governing eval artifact, segment identity, and digest;
otherwise inability to materialize a long exact prompt is not a blocker.

## Reviewer Rules

Reviewers discover evidence-backed issues and verify fixes they opened. They do
not implement fixes. They should prefer high-signal production, demo,
commercial, security, CI, observability, documentation, DX, and regression gaps.

Reviewers coordinate only through Git/GitHub state. They must not inspect sibling
agent outputs or ask Builders through private chat. In bounded pilots, a Reviewer
emits a useful report before the timebox expires, chooses investigation depth
from risk and evidence, and reports partial findings rather than timing out
silently. Fixed tool-call, file-count, priority, or roadmap budgets are not
binding unless a named digest-bound eval segment supplies them. Once evidence is
sufficient, reporting becomes the next action.

A Reviewer may open an issue only when it can provide a clear title, affected
boundary, current behavior, expected behavior, reproduction or inspection
evidence, impact, acceptance criteria, and duplicate check. If write permission
is missing, it returns an issue draft in its tick output and marks the blocker.

Major architecture, security, business-model, pricing, cross-project, or
strategic findings require a critical-review subagent or a durable review
artifact before issue creation when the runtime permits it.

## Builder Rules

Builders fix valid GitHub issues at the correct boundary. A Builder works on one
claimed issue at a time unless blocked, checks for active claims before starting,
posts claim/heartbeat metadata, and links a PR/branch when created.

Builders coordinate only through Git/GitHub state. They must not inspect sibling
agent outputs, wait for Reviewer private reports, or assert who authored an
issue/PR unless that provenance is independently verified from GitHub metadata.

A Builder must reproduce or verify the reported problem when practical, identify
root cause, update tests or gates, run the strongest practical validation, and
mark non-trivial issues ready for Reviewer verification before closure.

The done ladder is:

```text
issue triaged -> root cause found -> fix implemented -> validation green
  -> ready for review -> original reproduction verified -> PR merged
  -> deploy/release/readback where applicable -> issue closed
```

A local diff, issue comment, or green local test is not delivery done.

## Issue Admission And Backpressure

Self-discovery must not flood the backlog or CI system.

- Start zero or more qualified lanes; never create a one-Reviewer/one-Builder
  quota. Scale only from queue evidence, capability fit, aggregate WIP,
  integration capacity, and expected net value.
- Cap concurrent active Builders per repository by the declared soft limit.
- Do not open vague improvement issues.
- Group tightly related failures; split unrelated root causes.
- Prefer the issue or PR closest to the canonical contract when duplicates
  occur.
- If CI/runner capacity, merge queue latency, or issue noise becomes the
  bottleneck, reduce scale rather than creating more work.

## Decision Boundaries

The self-feeding loop may discover product, architecture, pricing, security,
public API, persistence, infrastructure, payment, legal, or customer-policy
questions, but it must not decide them by itself. It records the narrow decision,
tradeoff, and evidence as a prompt/workflow issue, ADR draft, GitHub issue, or
owner-product-decision blocker.

Recurring approval blockers must become machine policy gates — the gate
classes in
[`autonomous-execution-standard.md`](https://github.com/SylphxAI/skills/blob/main/skills/autonomous-execution-standard/references/full-standard.md).

## Improvement Policy

Every durable improvement to this loop requires an ADR or ADR amendment. The ADR
must state:

- observed prompt/process failure or frontier improvement;
- evidence from a pilot, issue, PR, CI run, or production signal;
- decision and rejected alternatives;
- exact template/standard/schema/gate changed;
- validation that proves the new loop is more observable, safer, faster, or more
  correct;
- migration/adoption class under the Doctrine Evolution Standard.

Small typo fixes that do not change behavior may share the ADR for the owning
prompt-change PR, but behavior changes must not be silently batched without a
recorded rationale.

## Pilot Acceptance Criteria

A pilot is successful only when the parent can prove, without hidden context:

- the parent rendered the template before spawn, and did not require the
  Coordinator to read a local template file;
- the Coordinator started with a fresh context and received the assigned project
  from the rendered prompt;
- the Coordinator launched only qualified bounded lanes, or reported the exact
  qualification/capacity reason for starting none;
- child briefs carried outcome, boundary, binding constraints, acceptance
  evidence, assigned project metadata, launch profile, and useful source
  pointers without freezing unbound method;
- at least one bounded Coordinator Tick Report was returned;
- any issue/PR action used GitHub-visible structured identity;
- no duplicate Agent-ID was spawned;
- no exact segment was claimed without a versioned eval identity and digest;
- no claim/PR/issue was left without owner or next action;
- any delivery claim was separated into issue, PR, merge, deploy, and behavior
  proof states.

If these are not true, the result is a prompt/process finding, not a failed
agent. Fix the doctrine loop and rerun the pilot.


## Package checklist (Skills cutover)

| Rule ID | Check |
| --- | --- |
| `self-feeding-01` | Strongest relevant subset applied |
| `self-feeding-02` | Facts in schema/test/ADR homes |
| `self-feeding-03` | Proof layers separated |
| `self-feeding-04` | Unknown authority fails closed |
| `self-feeding-05` | Tradeoffs owned |

- [ ] Full body obligations reviewed for applicability.
- [ ] Residual gaps have owner and follow-up.
