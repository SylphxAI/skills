---
id: ADR-0016-architecture-and-verification-package-names
status: accepted
date: 2026-07-26
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - static-instruction-packages
---

# ADR-0016: Name architecture delivery and verification packages after their jobs

## Context

`multi-repository-migration` described a delivery method that also applies to
one substantial repository, so its name caused complete single-repository
architecture migrations to load only architecture invariants and omit cutover,
retirement, and stale-proof handling.

`frontier-verification-standard` selected verification methods by failure model
and blast radius. “Frontier” incorrectly suggested that the package established
state-of-the-art status or applied only to advanced products. Comparative
SOTA/frontier claims and risk-proportionate verification are separate jobs.

## Decision

1. Hard-rename `multi-repository-migration` to
   `converge-architecture`; do not keep a discoverable alias.
2. `engineering-standard` continues to own code-architecture invariants and the
   canonical terminal. `converge-architecture` owns substantial audit,
   slicing, real code movement, exact-candidate proof, authority cutover,
   predecessor retirement, and stale-proof handling for one or many
   repositories. A small local refactor remains engineering work and does not
   acquire a convergence ledger.
3. Hard-rename `frontier-verification-standard` to
   `risk-matched-verification-standard`; do not keep a discoverable alias.
   The package selects simulation, replay, eval, model, and canary methods in
   proportion to the actual failure model and residual uncertainty.
4. `evidence-and-claims-standard` owns comparative SOTA/frontier language. Such
   claims require an exact subject, comparison population, benchmark or utility
   function, constraints, observation date, uncertainty, and current evidence.
   “Modern,” “latest,” “high-upside,” and “uses advanced methods” do not imply
   global state of the art.
5. Update native routing cases, cross-package links, bundled commands, and
   generated catalog in the same candidate. Historical projection registries
   remain byte-accurate records of retired package sets and are not rewritten.

## Consequences

- A one-line whole-repository migration request loads both architecture
  invariants and convergence delivery.
- Small refactors and docs-only work do not inherit migration machinery.
- Verification rigor no longer masquerades as a maturity or market-rank claim.
- Cached installations using predecessor names require normal package
  reconciliation; Git history preserves lineage without maintaining dual
  discovery.

## Verification

- `tests/fixtures/method-injection-cases.json` retains non-blocking positive and
  near-neighbour evaluation cases.
- Architecture-convergence ledger validators retain their executable unit
  proof.
- A routing claim requires exact Skills revision native-runtime evaluation; repository
  CI verifies package/catalog integrity and executable runtime behavior, not
  the expected answer authored in the routing fixture.
