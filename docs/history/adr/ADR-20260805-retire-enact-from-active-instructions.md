---
id: ADR-20260805-retire-enact-from-active-instructions
status: accepted
date: 2026-08-05
decision_owner: SylphxAI
supersedes:
  - ADR-0020-enact-authoritative-work-and-review-pools
  - ADR-0021-forge-agnostic-coordination
amends:
  - ADR-0027-repository-native-trunk-and-simple-auto-deploy
  - ADR-20260720-agent-owned-installation-and-constitution
  - ADR-20260731-thin-dual-layer-progressive-instruction-system
  - ADR-20260731T191027Z-continuous-product-quality-loop
  - ADR-20260801-package-classes-and-standard-composition
  - ADR-20260803-agent-native-queued-trunk
scope:
  - static-instruction-packages
  - runtime-constitution
  - work-coordination
  - tool-discovery
---

# Retire Enact from active instructions and coordination

## Context

Earlier records coupled static instructions, an external Enact MCP surface, and
work coordination. That coupling is no longer an active runtime contract. It
creates a particularly harmful failure mode: an agent can mistake a stale host
advertisement, an old generated instruction block, or a historical ADR for
permission or a required coordination path.

The active instruction surface must be unambiguous. Static Skills teach
portable methods; the active product repository chooses its own contracts;
Git/GitOps and runtime providers retain their native facts. Tool discovery only
reports an available capability. It does not select a provider, create an
obligation, or grant authority.

## Decision

1. **Enact is retired from active instructions.** No active runtime
   constitution, install contract, Skill package, or product workflow may
   require, configure, invoke, defer through, or treat Enact as an authority.

2. **Host-advertised integrations are non-authoritative.** A tool name,
   installed adapter, historical configuration, or discovered MCP server is
   capability metadata only. An integration may be used only when the active
   product repository explicitly declares it as part of its current contract.
   A host that still advertises the retired integration must remove that
   registration; agents must not use it as a fallback while that work is
   pending.

3. **Coordination remains portable and product-selected.**
   `work-coordination-standard` describes claim, checkpoint, handoff, and
   recovery semantics without selecting a ledger or adding a service. The
   active product/runtime may use native Codex coordination, repository-declared
   state, or another explicitly declared owner; it must not infer a hidden
   coordination dependency from historic text.

4. **Historical records remain evidence, not current instructions.**
   This ADR supersedes the Enact-specific coordination decisions and amends the
   related installer, runtime, portfolio, and delivery records. Historic ADRs
   preserve their rationale but carry an explicit current-reading notice.

## Consequences

- A stale `sylphx-enact` tool descriptor is a host-configuration residual, not
  a reason to re-enable or depend on it.
- The generic runtime constitution prevents an arbitrary advertised tool from
  becoming a new authority by implication.
- Product-specific coordination decisions remain at their owning repository;
  the static instruction package does not create a second control plane.
- No historical document or backup configuration may be treated as an
  operational fallback.

## Verification

- `runtime/`, `INSTALL.md`, and installed Skill packages contain no active
  Enact-specific procedure or enrollment path.
- The runtime constitution and work-coordination policy state that a discovered
  tool does not select authority or a dependency.
- This ADR marks the superseded and amended records so an ordinary source read
  reaches the current decision before any historic text.
- A host owner separately verifies removal of any active Enact registration;
  source documentation alone cannot prove or mutate that host state.
