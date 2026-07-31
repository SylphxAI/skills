# ADR Lifecycle product adoption

This repository is public. The ADR Lifecycle and Retrieval Contract is portfolio
law for Sylphx product repositories; it is not a private control plane.

## Where the law lives

- Semantics: `documentation-standard` → **ADR Lifecycle and Retrieval Contract**
- Machine gate: `specification-control-plane-standard` plus the reference
  implementation `scripts/adr-lifecycle.mjs` in this repository
- Decision record: [ADR-0029](../adr/ADR-0029-adr-lifecycle-and-retrieval-contract.md)

Product repositories **do not copy** the Skills standard body. They adopt with a
local adapter (parser, CI invocation, optional generated index).

## Done means (product repo)

1. **Semantic bind** — local ADR governance states that Skills owns
   lifecycle/retrieval semantics; the product owns format and CI wiring only.
2. **Normalized records** — every ADR has machine-readable:
   - authored `status`: `proposed | accepted | rejected`
   - `decision_owner`
   - `typed_scope` (selector; AND across facets, OR within facet)
   - outgoing `amends` / `supersedes` / `relates`
   - `decision_mode` (+ `decision_key` when exclusive)
3. **Atomic cutover** — migrate existing ADRs in the same change as the checker;
   do not land a resolver that marks the whole corpus unknown.
4. **Admission** — new or semantic ADRs fail closed without normalized fields;
   structural exclusive conflicts and dangling relations fail CI.
5. **Retrieval** — agents use an ApplicableDecisionBundle (ordered source refs +
   unresolved disposition), not read-all and not merged prose as law.
6. **Current behavior SSOT** — code, schemas, tests, and any product
   current-state surface — not ADR bodies — for “what the system does now.”

## Default serialization

Markdown + YAML frontmatter. Prefer a collision-safe stable `id` (this
repository uses the ADR filename stem).

## Local adapter examples (optional)

A product adapter may keep local elaborations without creating a second law, for
example:

- a generated Active/status index (human projection)
- a current-state catalog or equivalent product surface
- short local rules for cross-cutting invariants that are not material ADRs

Those stay product-owned. Skills still owns lifecycle semantics.

## Intentionally out of Skills scope

- Migrating another product’s historical ADR bodies
- Product-specific CI workflows beyond the reference checker shape
- Treating human garden cadence as portfolio law
