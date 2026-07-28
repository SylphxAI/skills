# Enact Work-Coordination Adapter Contract

## Resolve current product truth first

Enact evolves independently from this public procedure. Before issuing
commands or implementing a client:

1. inspect the live MCP `tools/list` or versioned REST/OpenAPI/schema surface;
2. bind the explicit Tenant, Workspace, and optional Project returned by
   `operating.scopes`;
3. use the product's current semantic command rather than copying stale argument
   shapes from documentation; and
4. preserve product, provider, and Skills authority boundaries.

Current product source locators for agents with repository access:

- `SylphxAI/enact:PROJECT.md` — product identity and authority boundary;
- `SylphxAI/enact:docs/runbooks/agent-work-loop.md` — agent operating
  loop and current MCP/REST mappings; and
- `SylphxAI/enact:docs/adr/ADR-0007-agent-first-target-work-model.md` —
  proposal, evidence, subscription, and effect successor model.

The product repository may require authorized access. External clients use
their live discovery/schema surface. These locators explain semantics; live
schemas own current field shape.

## Semantic surface

| Job | Preferred semantic surface | Important invariant |
| --- | --- | --- |
| Discover scope | `operating.scopes` | Never infer Project or Workspace from a repository |
| Propose or reuse Work | `work.propose_or_get` | Idempotent typed disposition |
| Predecessor create/list | `work.start`, `work.get`, `work.ready` | Explicit scope and idempotency |
| Claim responsibility | `work.claim` | Bind Agent Run; not a source lock |
| Compile run context | `context.compile` | Immutable execution context for the run |
| Record progress | `work.checkpoint`, `work.block` | Material delta and next safe action |
| Publish evidence | `evidence.publish`, `evidence.get` | Content identity; evidence does not manufacture Work |
| Link provider fact | `work.link_external` | Observation with provider identity and freshness |
| Coordinate Candidate review | Live typed review surface, or the product-declared review Work/Evidence contract | Exact Platform Candidate subject; independent principal when required |
| Read proof chain | `proof.readback` | Never invent a stronger delivery state |
| Shared external effect | `effect.acquire/renew/narrow/release/read` | Short-lived, proof-bound, owner-enforced fencing |
| Durable wait | `work.defer`, then `subscription.read/cancel` | Atomically defer Work and release capacity/effect leases until typed re-entry |
| Dependency relation | `dependency.map` | Reject invalid self/cyclic relations as product contract requires |
| Complete | `work.complete` | Required evidence and completion authority |

Treat MCP and REST as transports over one command path. A client may map names
to its runtime conventions, but it must not create transport-specific domain
semantics.

## Identity, claim, and effect separation

- Tenant, Workspace, and Project identify the commercial/product scope.
- Work identifies the durable objective and lifecycle.
- Proposal describes a candidate objective. Admission may reuse, reject, or
  create Work; it does not assign the proposer.
- Attempt and Agent Run identify one execution history.
- Claim leases responsibility and recovery authority for that Work/Attempt.
- `write_scope` expresses the maximum intended change envelope and collision
  visibility; it does not lock files or repositories.
- EffectLease protects an Enact-eligible scarce mutation boundary such as a
  schema migration, credential mutation, infrastructure mutation, or external
  provider mutation. Platform owns and fences source landing, promotion,
  deployment, and release; Enact must not issue authority for those effects.

Do not hold an EffectLease during ordinary source editing or passive waits. Do
not treat a successful preflight, acquisition, or health response as proof that
the external effect occurred.

## Session and review authority

A Codex, Claude, Grok, Spiron, or other agent session is an execution client. A
session-local goal, title, transcript, private message, or parent/child relation
must not become a second source of truth for Work priority, ownership, review,
or completion. The client resolves or proposes canonical Work, claims an
eligible Attempt, and compiles context from Enact before substantive mutation.

Do not model an Advisor as a permanent supervisor of one Executor. The producer
publishes one immutable Candidate to Platform and never chooses PR versus
direct trunk. Platform derives whether independent review is required and
projects that requirement into Enact as a typed Work obligation:

1. bind the immutable Platform Candidate reference and evidence set to the
   owning Work/Attempt without copying Candidate authority into Enact;
2. run deterministic verification first;
3. when independent judgment is required, create or resolve a review
   obligation for an eligible reviewer that has not consumed private sibling
   state;
4. publish the typed verdict, findings, attestation, or correction Work; and
5. release the reviewer after the verdict instead of retaining a watcher.

The same general-purpose agent may propose, execute, or review different Work.
It must not self-satisfy an independence requirement merely by changing its
local role label.

An external pull request is ingested by Platform as the same Candidate contract
and linked to Enact as a provider observation. A temporary compatibility PR
projection is controller-selected. Neither becomes a second Work queue, review
ledger, or completion authority, and agents do not keep a session alive to
supervise it.

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

The subscription dispatcher may wake the original agent or any eligible agent,
which recompiles context from durable state. A Work that is waiting must not
remain `scheduling=ready` with no active claim and no subscription. A client
must not keep a session alive as the durable polling mechanism. Long soak and
observation windows are separate bounded Work or controller-owned monitors.
Do not approximate the transition with separate `subscription.or_get`,
checkpoint, handoff, and run-finish calls: a state change caused by release can
consume the subscription, and partial failure can strand a ready Work or live
lease.
Release at the first external-only boundary: “brief”, “bounded”, “until the
last check”, and fixed-minute polling are still passive waits, not execution.
An executor must not cancel or reprioritize unrelated CI, force a deployment,
weaken a watermark, or use a break-glass bearer to manufacture an earlier wake;
each such effect requires separate admitted authority and provider readback.

## GitHub and other provider observations

The forge remains native owner of issue, pull request, commit, check, merge,
release, and repository state. Store an observation with at least:

- Enact Work id;
- provider and canonical repository/project identity;
- native object kind and external reference;
- source revision or provider version;
- observation time and freshness/readback state; and
- visibility classification.

Use provider APIs or connectors to refresh material state. A copied title,
label, comment, or authored JSON field is not equivalent to provider readback.
Keep public threads concise; tenant-private reasoning, model/cost telemetry,
credentials, and internal blockers remain in the appropriate private operating
state.

Provider references:

- GitHub REST API versioning and native resources:
  <https://docs.github.com/en/rest/about-the-rest-api/api-versions>
- GitHub checks API:
  <https://docs.github.com/en/rest/checks>
- Model Context Protocol architecture and client/server boundaries:
  <https://modelcontextprotocol.io/specification/2025-06-18/architecture>


## Authentication

- Canonical remote MCP auth is OAuth 2.0 for the protected resource
  `https://enact.sylphx.com/api/mcp` (RFC 9728 discovery on the Enact origin).
- The MCP client owns OAuth discovery, login, refresh, and revocation with the
  authorization server advertised by protected-resource metadata.
- Long-lived static bearers are break-glass operators only. Adapters must not
  require shell profile exports, process-wrapper injection, or replacement of
  vendor agent executables to authenticate ordinary sessions.
- MCP session identifiers are correlation only and never authorize Work
  mutation.

## Failure and recovery

- Missing MCP tools: diagnose installation, connection, authorization, and live
  schema; do not invent calls or silently fall back to uncoordinated work.
- Duplicate proposal: use the typed existing disposition; do not create a
  parallel Work item without a distinct objective.
- Stale claim: recover through lease/fencing semantics and preserve checkpoints.
- Provider unavailable: record unknown/stale observation and re-entry trigger;
  do not convert absence of readback into success or failure.
- Rework after completion: create a typed related follow-up, rework, or revert
  Work item; use audit correction only to correct a false historical record.
- External effect uncertainty: query the owning provider before retrying, then
  use the idempotency and fencing contract to avoid duplicate effects.

## Adapter conformance cases

Test explicit scope selection, idempotent propose/reuse, claim-run binding,
checkpoint/handoff recovery, stale-claim takeover, external observation
freshness, completion rejection without proof, provider outage, effect fencing,
effect release on waits, cross-tenant rejection, and parity between MCP and REST
for the same semantic command.
