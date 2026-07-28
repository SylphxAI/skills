# Enact Work-Coordination Adapter Contract

## Resolve current product truth first

Enact evolves independently from this public procedure. Before issuing
commands or implementing a client:

1. inspect the live MCP `tools/list` or versioned REST/OpenAPI/schema surface;
2. bind the explicit **Organization** and **Project** returned by
   `org.list` / `project.list` / `operating.scopes` (prefer Organization/Project
   vocabulary; residual `tenant_id` / `workspace_id` are cutover aliases only);
3. use the product's current semantic command rather than copying stale argument
   shapes from documentation; and
4. preserve product, provider, and Skills authority boundaries.

Current product source locators for agents with repository access:

- `SylphxAI/enact:PROJECT.md` — product identity and authority boundary;
- `SylphxAI/enact:docs/adr/ADR-0045-organization-project-commercial-spine.md` —
  commercial spine (Organization → Project; no Workspace product surface);
- `SylphxAI/enact:docs/runbooks/agent-work-loop.md` — agent operating loop; and
- `SylphxAI/platform:docs/adr/ADR-5127-platform-candidate-plane.md`,
  `ADR-01KYM9PBWRK1DR3T1R3M3NT001-public-work-id-retirement.md`, and
  `ADR-01KYM9PATHN3VTRXADM1SS1001-path-neutral-admission.md` — private lineage
  and path-neutral PR/DT admission.

## Semantic surface

| Job | Preferred semantic surface | Important invariant |
| --- | --- | --- |
| Discover scope | `org.list`, `project.list`, `operating.scopes` | Never infer Project from a repository |
| Create org/project | `org.create`, `project.create` | GitHub binding optional and separate |
| Propose or reuse Work | `work.propose_or_get` | Idempotent; requires organization (+ project preferred) |
| Claim responsibility | `work.claim` | Bind Agent Run; not a source lock |
| Compile run context | `context.compile` | Immutable execution context for the run |
| Record progress | `work.checkpoint`, `work.block` | Material delta and next safe action |
| Publish evidence | `evidence.publish`, `evidence.get` | Content identity; evidence does not manufacture Work |
| Link provider fact | `work.link_external` / observations | Observation with provider identity and freshness |
| Coordinate Candidate review | Live typed review surface, or the product-declared review Work/Evidence contract | Exact Platform Candidate subject; independent principal when required |
| Read proof chain | `proof.readback` | Never invent a stronger delivery state |
| Shared external effect | `effect.acquire/renew/narrow/release/read` | Enact-eligible scarce mutations only; not Platform deploy |
| Durable wait | `work.defer`, then `subscription.read/cancel` | Atomically defer Work and release capacity/effect leases |
| Dependency relation | `dependency.map` | Reject invalid self/cyclic relations as product contract requires |
| Complete | `work.complete` | Required evidence and completion authority |

## Identity, claim, and effect separation

- **Organization** and **Project** identify commercial/product scope.
- Work identifies the durable objective and lifecycle.
- Proposal describes a candidate objective. Admission may reuse, reject, or
  create Work; it does not assign the proposer.
- Attempt and Agent Run identify one execution history.
- Claim leases responsibility and recovery authority for that Work/Attempt —
  not files or PRs.
- `write_scope` expresses the maximum intended change envelope and collision
  visibility; it does not lock files or repositories.
- EffectLease protects an Enact-eligible scarce mutation boundary such as a
  schema migration, credential mutation, infrastructure mutation, or external
  provider mutation. Platform owns and fences source landing, promotion,
  deployment, and release; Enact must not issue authority for those effects.

## Session and review authority

A Codex, Claude, Grok, Spiron, or other agent session is an execution client. A
session-local goal, title, transcript, private message, or parent/child relation
must not become a second source of truth for Work priority, ownership, review,
or completion. The client resolves or proposes canonical Work, claims an
eligible Attempt, and compiles context from Enact before substantive mutation.

Do not model an Advisor as a permanent supervisor of one Executor. When
independent judgment is required, publish the typed verdict, findings,
attestation, or correction Work through Enact. The producer
publishes one immutable Candidate to Platform and never chooses PR versus
direct trunk as correctness. Platform derives whether independent review is
required and projects that requirement into Enact as a typed Work obligation.

An external pull request is ingested by Platform as the same Candidate contract
and linked to Enact as a provider observation — **without requiring a public
Work id in the PR body**. PR and direct-trunk are both valid ingresses.

## Private coordination lineage (not public forge text)

| Surface | Work id allowed? |
| --- | --- |
| Enact MCP / API | Yes (native Work records) |
| Candidate publish API (private) | Yes (`work_item_id` + `producer_attempt_id`) |
| Platform DB Candidate row | Yes (private) |
| Public commit trailer / PR body | **No — not required; do not add for admission** |
| GitHub status description | **No raw `wi_…`** — pass/fail only |

## Durable external wait and worker release

Work completion and worker occupancy are independent. When the next transition
depends only on CI, build, promotion, deployment, soak, approval, another Work,
or another external event:

1. call `work.defer` with the exact candidate/evidence, current delivery state,
   remaining terminal predicate, next safe action, and typed re-entry
   condition;
2. use `next_state_change` when the awaited fact is a future provider
   observation, so the current subject cursor is captured atomically;
3. verify the returned checkpoint disposition is `external_wait`, the Work is
   `scheduling=deferred`, the resume subscription is pending, EffectLeases and
   Claim are released, and the current Agent Run is finished; and
4. claim other ready Work.

The subscription dispatcher may wake the original agent or any eligible agent.
A Work that is waiting must not remain `scheduling=ready` with no active claim
and no subscription. Do not approximate the transition with separate `subscription.or_get`,
checkpoint, handoff, and run-finish calls. Release at the
first external-only boundary: “brief”, “bounded”, “until the last check”, and
fixed-minute polling are still passive waits, not execution.

## GitHub and other provider observations

The forge remains native owner of issue, PR, commit, check, merge, and release
state. Store observations with Enact Work id, provider identity, native object
ref, revision, observation time, and freshness. Keep public threads free of
tenant-private reasoning and raw Work-id admission ceremony.

## Authentication

- Canonical remote MCP auth is OAuth 2.0 for
  `https://enact.sylphx.com/api/mcp` (RFC 9728).
- Connector install requires explicit OAuth consent — agents must not silently
  obtain third-party forge credentials.
- Static bearers are break-glass only.

## Failure and recovery

- Missing MCP tools: fix OAuth/config; do not invent free-function calls.
- Duplicate proposal: reuse typed disposition.
- Stale claim: recover through lease/fencing; preserve checkpoints.
- Provider unavailable: stale observation; Work Graph continues.
- Missing public `wi_` in Git: **not an error**. Missing private Candidate
  Work binding when landing/admission requires lineage: fail closed at Platform.
- Ordinary work on a PR: **not an error** (path-neutral admission).

## Adapter conformance cases

Test Organization/Project scope selection, idempotent propose/reuse, claim-run
binding, checkpoint/handoff recovery, private Candidate lineage without public
Work trailers, external PR intake without Work id in body, path-neutral PR and
DT ingress, completion rejection without proof, provider outage, effect fencing
excluding Platform delivery, cross-tenant rejection, and MCP/REST parity.

A Work that is waiting must not remain `scheduling=ready` with no active claim and no subscription.

When independent judgment is required, publish the typed verdict, findings, attestation, or correction Work.
