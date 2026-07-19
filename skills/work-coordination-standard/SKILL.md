---
name: work-coordination-standard
description: "Portable work-ledger semantics for claims, attempts, checkpoints, handoff, proof links, stale-claim recovery, privacy, and cross-project coordination. Use when designing or auditing durable agent work coordination that must survive sessions, runtimes, or provider boundaries. Do not use as a one-off checklist, a product-specific API guide, or a substitute for operating the selected live coordination system."
---
# Work Coordination Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

For allocation and shared-state patterns, also read
[references/coordination-protocols.md](references/coordination-protocols.md).

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.


## Composition and output

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Product-specific live operations → the matching coordination adapter Skill
  and that product's current API or tool schema.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
