---
name: control-plane-work-coordination
description: "Connect, operate, or audit agent work through the Sylphx Control Plane operating graph using explicit Tenant, Workspace, and optional Project identity; Work proposals, claims, runs, checkpoints, evidence, effects, subscriptions, and external-provider observations. Use when implementing a Control Plane client or adapter, binding a repository or agent workflow to Control Plane, recovering a missing MCP work loop, or verifying Control Plane work provenance. Do not use for portable work-ledger design, ordinary Git operations, or static Skills authoring."
---

# Control Plane Work Coordination

Use Control Plane as live operating-state authority without turning it into the
owner of source, provider, or static instruction facts. Read
[references/control-plane-adapter-contract.md](references/control-plane-adapter-contract.md)
for current semantic tools, REST mappings, GitHub observations, and source
locators. Resolve exact fields from the live MCP schema or versioned product API.

## Operating method

1. Discover an explicit Tenant and Workspace, plus Project when relevant, with
   `operating.scopes`. Never infer identity from a repository name or label.
2. Prefer `work.propose_or_get` for idempotent propose, admission, and eligible
   claim. Use `work.start` plus `work.claim` only for the supported predecessor
   path. Bind the claim to the actual agent run and compile its execution context.
3. Treat a Work claim as responsibility for an attempt, not a repository path
   lock. Coordinate overlapping source candidates through their source and
   delivery mechanisms.
4. Publish material evidence and checkpoint progress, blockers, handoffs, and
   the next safe action. Store provider-native facts as linked observations with
   source identity, version, observation time, and freshness.
5. Acquire an EffectLease only around a scarce external effect such as landing,
   migration, deploy, release, credentialed action, or provider mutation. Bind
   required proof, verify the owning provider readback, and release promptly.
6. Use a durable subscription when execution releases capacity while awaiting a
   dependency or outcome generation. Do not hold a shared-effect lease while
   waiting for CI, deployment, or observation.
7. Complete only when the declared terminal and required delivery evidence are
   accepted by Control Plane. Otherwise checkpoint, block with a re-entry path,
   or create a related follow-up/rework item.

## Fact ownership

- Control Plane owns tenant/workspace/project operating state, Work, claims,
  runs, checkpoints, decisions, incidents, threads, and linked observations.
- Skills owns static standards, procedures, profiles, and adapters.
- The product repository owns code, tests, code-coupled ADRs, and desired state.
- GitHub or another forge owns commits, issues, pull requests, checks, releases,
  and their native states; deployment and telemetry providers own runtime facts.
- Control Plane stores observations and projections of external facts, never a
  competing native truth.

## Output and handoff

For operations, update the live Work item and return only its id, current state,
claim or blocker, next safe action, and evidence locators. Do not create a second
task queue or a parallel prose status file.

For integration design, produce one **Control Plane Coordination Adapter
Contract** covering scope identity, semantic operations, auth scopes, idempotency,
provider observation mapping, failure recovery, privacy, and conformance tests.

## Boundaries

- `work-coordination-standard` owns portable ledger semantics; this package owns
  the Control Plane product mapping.
- MCP and REST are adapters over the same product command path. Do not create
  MCP-only effects or duplicate domain rules in clients.
- Missing tools are a configuration or transport failure. Reconnect and verify
  the live tool list; do not invent free-function calls or silently bypass the
  work loop.
- Never place tokens, private strategy, raw reasoning, or tenant-private state in
  public GitHub issues or committed adapter examples.
