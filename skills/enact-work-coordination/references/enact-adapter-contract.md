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
- `SylphxAI/platform:docs/adr/ADR-5127-platform-candidate-plane.md` plus
  `ADR-01KYM9PRIVATE-public-work-id-retirement.md` — private Candidate lineage
  (no public `Work: wi_…` admission).

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
| Durable wait | `work.defer` | Atomically defer Work and release capacity |
| Complete | `work.complete` | Required evidence and completion authority |

## Identity, claim, and effect separation

- **Organization** and **Project** identify commercial/product scope.
- Work identifies the durable objective and lifecycle.
- Proposal describes a candidate objective. Admission may reuse, reject, or
  create Work; it does not assign the proposer.
- Claim leases responsibility for that Work/Attempt — not files or PRs.
- `write_scope` is the maximum intended change envelope, not a lock.
- EffectLease protects Enact-eligible scarce mutations only. **Platform owns
  source landing, promotion, deployment, and release.** Enact must not issue
  authority for those effects.

## Session and review authority

A session is an execution client. Session-local goals must not become a second
Work ledger. The producer publishes one immutable Candidate to Platform and
never chooses PR versus direct trunk.

An external pull request is ingested by Platform as the same Candidate contract
and linked to Enact as a provider observation — **without requiring a public
Work id in the PR body**.

## Private coordination lineage (not public forge text)

| Surface | Work id allowed? |
| --- | --- |
| Enact MCP / API | Yes (native Work records) |
| Candidate publish API (private) | Yes (`work_item_id` + `producer_attempt_id`) |
| Platform DB Candidate row | Yes (private) |
| Public commit trailer / PR body | **No — not required; do not add for admission** |
| GitHub status description | **No raw `wi_…`** — pass/fail only |

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

## Adapter conformance cases

Test Organization/Project scope selection, idempotent propose/reuse, claim-run
binding, checkpoint/handoff recovery, private Candidate lineage without public
Work trailers, external PR intake without Work id in body, completion rejection
without proof, provider outage, effect fencing excluding Platform delivery,
cross-tenant rejection, and MCP/REST parity.
