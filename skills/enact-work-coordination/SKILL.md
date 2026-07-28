---
name: enact-work-coordination
description: "Connect, operate, or audit agent work through the Sylphx Enact operating graph using explicit Tenant, Workspace, and optional Project identity; Work proposals, claims, runs, checkpoints, evidence, effects, subscriptions, and external-provider observations. Use when implementing an Enact client or adapter, binding a repository or agent workflow to Enact, recovering a missing MCP work loop, or verifying Enact work provenance. Do not use for portable work-ledger design, ordinary Git operations, or static Skills authoring."
---

# Enact Work Coordination

Use Enact as live operating-state authority without turning it into the
owner of source, provider, or static instruction facts. Read
[references/enact-adapter-contract.md](references/enact-adapter-contract.md)
for current semantic tools, REST mappings, GitHub observations, and source
locators. Resolve exact fields from the live MCP schema or versioned product API.

## Operating method

0. **Availability gate (OAuth-first).** Enact is in-scope when the MCP client
   can reach `https://enact.sylphx.com/api/mcp` and list tools after OAuth
   against protected-resource metadata
   (`/.well-known/oauth-protected-resource`). Verify `work.propose_or_get` (or
   equivalent) is in the live tool list. If tools are missing, complete MCP
   OAuth login/reconnect first — do not open a PR or land source as a substitute
   for the work loop. Long-lived bearer tokens (`SYLPHX_ENACT_AGENT_TOKEN`,
   `SYLPHX_ENACT_BEARER_TOKEN_ENV`, `~/.codex/secrets/sylphx-enact-agent.token`)
   are **break-glass only**: do not shell-autoload them, do not wrap/replace
   vendor agent binaries to inject them, and do not bypass OAuth
   discovery/refresh/revocation for ordinary sessions.
1. Discover an explicit Tenant and Workspace, plus Project when relevant, with
   `operating.scopes`. Never infer identity from a repository name or label.
2. **Before substantive mutation**, call `work.propose_or_get` (idempotent
   propose, admission, eligible claim). Use `work.start` plus `work.claim` only
   for the supported predecessor path. Bind the claim to the actual agent run
   and compile its execution context. Pure read-only answers may skip Work;
   any follow-on implementation must open or join Work first.
3. Treat a Work claim as responsibility for an attempt, not a repository path
   lock. Coordinate overlapping source candidates through their source and
   delivery mechanisms.
4. Publish material evidence and checkpoint progress, blockers, handoffs, and
   the next safe action. Store provider-native facts as linked observations with
   source identity, version, observation time, and freshness.
5. Acquire an EffectLease only around an Enact-eligible scarce effect such as a
   schema migration, credential mutation, infrastructure mutation, or external
   provider mutation. Platform independently owns and fences Candidate landing,
   deploy, and release. Bind required proof, verify owning-provider readback,
   and release promptly.
6. At the first external-only boundary, call `work.defer` with the exact typed
   dependency or outcome condition. It atomically checkpoints, creates the
   durable resume subscription, marks the Work deferred, releases EffectLeases
   and Claim/Run capacity, and finishes the current Run. Use
   `next_state_change` for a future provider observation. Do not assemble this
   transition from `subscription.or_get`, checkpoint, handoff, and run-finish
   calls: the release can otherwise consume the subscription or leave ready
   Work claimable before the provider moves. A self-selected short or bounded
   polling window is not an exception. Do not hold a shared-effect lease while
   waiting for CI, deployment, or observation, and do not manipulate unrelated
   CI capacity or delivery admission to make the wait shorter.
7. Complete only when the declared terminal and required delivery evidence are
   accepted by Enact. Otherwise checkpoint, block with a re-entry path,
   or create a related follow-up/rework item.

## Fact ownership

- Enact owns tenant/workspace/project operating state, Work, claims,
  runs, checkpoints, decisions, incidents, threads, and linked observations.
- Skills owns static standards, procedures, profiles, and adapters.
- The product repository owns code, tests, code-coupled ADRs, and desired state.
- Platform owns Candidate identity/admission, landing CAS, verification
  watermarks, artifacts, promotion, deployment, rollback, and delivery readback.
- GitHub or another forge owns commits, issues, pull requests, checks, releases,
  and their native states; deployment and telemetry providers own runtime facts.
- Enact stores observations and projections of external facts, never a
  competing native truth.

## Output and handoff

For operations, update the live Work item and return only its id, current state,
claim or blocker, next safe action, and evidence locators. Do not create a second
task queue or a parallel prose status file.

For integration design, produce one **Enact Coordination Adapter
Contract** covering scope identity, semantic operations, auth scopes, idempotency,
provider observation mapping, failure recovery, privacy, and conformance tests.

## Boundaries

- `work-coordination-standard` owns portable ledger semantics; this package owns
  the Enact product mapping.
- MCP and REST are adapters over the same product command path. Do not create
  MCP-only effects or duplicate domain rules in clients.
- Missing tools are a configuration, transport, or OAuth enrollment failure.
  Reconnect / complete MCP OAuth and verify the live tool list; do not invent
  free-function calls or silently bypass the work loop.
- Authentication is owned by the MCP client and authorization server. Do not
  modify vendor-managed agent executables, npm symlinks, or shell startup to
  inject credentials.
- Never place tokens, private strategy, raw reasoning, or tenant-private state in
  public GitHub issues or committed adapter examples.
