# ADR governance product adoption

This repository is public. Portfolio ADR law is intentionally **lightweight**.

## Law

- Semantics: `documentation-standard` → lightweight ADR governance (ADR-0030)
- Structural checker (this repo only): `scripts/adr-lifecycle.mjs`
- Decision: [ADR-0030](../adr/ADR-0030-lightweight-adr-governance.md)
  (supersedes ADR-0029)

Product repositories **do not** need an ApplicableDecisionBundle resolver,
typed-scope policy engine, or local copy of Skills standards text.

## Minimal adopt

1. Put ADRs under a stable docs path in the owning repository.
2. Use small frontmatter: `id`, `status`, optional `date` / `decision_owner` /
   `supersedes` / `amends` / `scope` hints.
3. Optionally run a structural lint similar to `scripts/adr-lifecycle.mjs`
   (parse, identity, status, links, cycles).
4. Keep current-behavior truth in code/schema/tests (and product current-state
   surfaces), not ADR narrative status.
5. Let agents retrieve ADRs via ordinary search/RAG at a known commit.

## Explicitly not required

- Product-local ApplicableDecisionBundle adapters
- Forced decision_mode / decision_key / scope calculus CI
- Generated indexes as CI law
- Treating human garden cadence as portfolio law
