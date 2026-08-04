---
name: parallel-change-integration-standard
description: "Policy: parallel change integration—branches, rebase, collision, exact-SHA."
---
# Parallel Change Integration Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs only where
   the owning contract, configuration, ADR, or executable proof requires them.
   Do not add a prose-presence test to prove that this standard was followed.
3. Prefer schema/test/ADR homes over copying this body into product repos.
4. Read [CRDT convergence](../engineering-standard/references/crdt-convergence.md) when
   concurrent shared state requires algebraic merge rather than CAS selection.

## Composition and output

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Boundaries

- Does not grant deploy or credential capabilities.
- Does not replace product-local ADRs where those own decisions.

