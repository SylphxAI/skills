# ADR Lifecycle product adoption

Portfolio law lives in Skills:

- Semantics: `documentation-standard` → **ADR Lifecycle and Retrieval Contract**
- Machine gate: `specification-control-plane-standard` + reference implementation
  `scripts/adr-lifecycle.mjs` in this repository
- Decision record: [ADR-0029](../adr/ADR-0029-adr-lifecycle-and-retrieval-contract.md)

Product repositories **do not copy** the Skills standard body. They adopt with a
local adapter.

## Done means (product repo)

1. **Semantic bind** — local ADR governance (README / MEMORY rule) states that
   Skills owns lifecycle/retrieval semantics; local adapter owns format and CI.
2. **Normalized records** — every ADR has machine-readable:
   - authored `status`: `proposed | accepted | rejected`
   - `decision_owner`
   - `typed_scope` (selector; AND across facets, OR within facet)
   - outgoing `amends` / `supersedes` / `relates`
   - `decision_mode` (+ `decision_key` when exclusive)
3. **Atomic cutover** — migrate existing ADRs in the same candidate as the
   checker; do not land a resolver that marks the whole corpus unknown.
4. **Admission** — new/semantic ADRs fail closed without normalized fields;
   structural exclusive conflicts and dangling relations fail CI.
5. **Retrieval** — agents use an ApplicableDecisionBundle (ordered source
   refs + unresolved disposition), not read-all and not merged prose law.
6. **Current behavior SSOT** — catalog/code/tests (or product equivalent), not
   ADR bodies, for “what the system does now.”

## Default serialization

Markdown + YAML frontmatter. Filename stem = stable `id` when collision-safe.

## Platform adapter note

Platform keeps:

- `docs/catalog/` as current-state SSOT
- MEMORY rules for cross-cutting invariants
- generated `docs/adr/REGISTRY.md` as a human/active projection

Those are local elaborations of the Skills contract, not a second law.

## Out of scope for Skills completion

Per-product migrate of historical ADR bodies, fleet-wide agent wire-up, and
Platform-only garden cadence remain product work.
