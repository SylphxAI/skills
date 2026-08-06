# parallel-change-integration-standard

> **Sylphx company method** (folder inside `sylphx-methods`; open from INDEX).
> Former package class in old catalog → now progressive documentation under this skill's `references/` tree.
>
> **Job summary:** Policy: parallel change integration—branches, rebase, collision, exact-SHA.

Open deeper files in this folder only when needed.

---

# Parallel Change Integration Standard

Policy constraints—compose onto matching host jobs.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates.

## Method

Compose `source-authoring-standard` three layers when implementing: L1 batch, L2 atomic commits in the PR, L3 one revert-safe outcome per PR (queued squash unit).


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

