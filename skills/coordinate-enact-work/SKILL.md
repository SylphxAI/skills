---
name: coordinate-enact-work
description: "Coordinate live Enact Work with authenticated tools: propose, claim, run, evidence, effects, defer/wake."
---

# Coordinate Enact Work

Use Enact as live **work coordination** authority without turning it into the
owner of source, provider, or static instruction facts. Read
[references/enact-adapter-contract.md](references/enact-adapter-contract.md)
for current semantic tools, REST mappings, provider observations, and source
locators. Resolve exact fields from the live MCP schema or versioned product API.

## Product identity (ADR-0045)

```text
Organization
└── Project
    ├── Work / Claim / Attempt / Run
    ├── Decisions / Incidents / Knowledge
    └── Optional external resources (Git, CI, services, …)
```

- **Organization** is the commercial boundary (membership, billing, isolation).
- **Project** is the durable work unit. A Project may have zero, one, or many
  repositories.
- **Repository ≠ Project.** Never invent Organization/Project from a repo name.
- **GitHub / GitLab / forges are optional connectors.** Enact Work Graph must
  run without any forge. Connector loss yields stale observations, not a dead
  work ledger.
- Residual `tenant_id` / `workspace_id` keys may appear on cutover APIs only;
  do not teach them as product vocabulary.

## Operating method

0. **Availability gate (OAuth-first).** Enact is in-scope when the MCP client
   can reach `https://enact.sylphx.com/api/mcp` and list tools after OAuth
   against protected-resource metadata
   (`/.well-known/oauth-protected-resource`). Verify `work.propose_or_get` (or
   equivalent) is in the live tool list. If tools are missing, complete MCP
   OAuth login/reconnect first — do not open a PR or land source as a substitute
   for the work loop. Long-lived bearer tokens are **break-glass only**.
1. Discover explicit **Organization** and **Project** with `org.list` /
   `project.list` or `operating.scopes`. Never infer identity from a repository
   name or label.
2. **Before substantive objective work**, call `work.propose_or_get`
   (idempotent propose, admission, eligible claim). Bind the claim to the
   actual agent run and compile execution context. Pure read-only answers may
   skip Work; any follow-on implementation of a shared/collision-prone
   objective must open or join Work first.
3. Treat a Work claim as responsibility for an **objective/attempt**, not a
   file, path, branch, worktree, or PR lock. Overlapping source changes in the
   same repo remain legal; Git/repository policy resolves source collision, Enact
   prevents two agents claiming the **same Work**.
4. Publish material evidence and checkpoint progress, blockers, handoffs, and
   the next safe action. Store provider-native facts as linked observations with
   source identity, version, observation time, and freshness.
5. Acquire an EffectLease only around an **Enact-eligible** scarce mutation
   (schema, credential, infrastructure, or external provider mutation that
   Enact fences). The repository owns source integration and Platform owns
   deploy/release — do not use EffectLease to authorize those. Bind required proof,
   verify owning-provider readback, and release promptly.
6. At the first external-only boundary, call `work.defer` with the exact typed
   dependency or outcome condition. It atomically checkpoints, creates the
   durable resume subscription, marks the Work deferred, releases EffectLeases
   and Claim/Run capacity, and finishes the current Run. Use
   `next_state_change` for a future provider observation. Do not poll CI
   in-session or assemble defer from separate handoff calls.
7. Complete only when declared terminal and required delivery evidence are
   accepted by Enact. Otherwise checkpoint, block with a re-entry path, or
   create a related follow-up/rework item.

## Work ↔ Git (critical)

| Action | Work required? |
| --- | --- |
| Start substantive agent objective (multi-agent risk) | **Yes** — propose/claim in Enact |
| Local `git commit` / WIP / private checkpoint | **No Git gate** — checkpoint *to Enact* when material |
| Land source | Git works independently; privately link the exact revision to Work when a Work exists |
| Public PR body / commit trailer | **Must not require raw `wi_…`** |
| Ingress via PR vs direct-trunk | **Both valid** — prefer DT for internal ordinary (guidance only) |

**Direction of integration:** Enact and Platform **connect out** to Git. Git is not
the work ledger. Do **not** write `Work: wi_…` into public commits or PR bodies
as an admission mechanism. Historical trailers may exist; new work must not add
them.

**Forge-agnostic (ADR-0021):** product repositories must not carry
`enact-work-lineage` workflows or required forge checks for coordination.
Missing Enact MCP is OAuth/config failure for Enact-coordinated work — reconnect;
never substitute a GitHub lineage check. Git and external contribution remain
independently operable.

- **Internal agent:** claim Work when required → implement → land through the
  repository's native direct-trunk or PR path → privately link exact revision →
  checkpoint/release.
- **External contributor:** ordinary PR, no Enact OAuth and no Work id in body.
  A connector may later link the resulting provider fact.

## Fact ownership

- Enact owns Organization/Project operating state, Work, claims, runs,
  checkpoints, decisions, incidents, threads, and linked observations.
- Skills owns static standards, procedures, profiles, and adapters.
- The product repository owns code, tests, code-coupled ADRs, and desired state.
- The repository/forge owns source integration. Platform owns artifacts,
  deployment policy, promotion, rollback, and delivery readback.
- Forges own commits, issues, pull requests, checks, releases, and their native
  states; deployment and telemetry providers own runtime facts.
- Enact stores observations and projections of external facts, never a
  competing native truth.

## Output and handoff

For operations, update the live Work item and return only its id, current state,
claim or blocker, next safe action, and evidence locators. Do not create a second
task queue in GitHub issues/PRs or a parallel prose status file.

For integration design, produce one **Enact Coordination Adapter
Contract** covering scope identity, semantic operations, auth scopes, idempotency,
provider observation mapping, failure recovery, privacy, and conformance tests.

## Boundaries

- `work-coordination-standard` owns portable ledger semantics; this package owns
  the Enact product mapping.
- Missing tools are configuration/OAuth failure — reconnect; do not invent calls.
- Never place tokens, private strategy, raw reasoning, or tenant-private state
  (including raw Work ids as a required public field) in public GitHub issues,
  PR bodies, or commit trailers.
