# ADR governance product adoption

This repository is public. Its product is **agent working methods**, not ADR
tooling.

## Law

- Semantics: `documentation-standard` → lightweight ADR governance ([ADR-0030](../adr/ADR-0030-lightweight-adr-governance.md))
- Decision records for this repository: `docs/adr/*.md`
- No separate ADR lifecycle product, CLI, or installable adapter

## Minimal adopt (any product repo)

1. Keep ADRs as Markdown near the code they govern.
2. Use small frontmatter: `id`, `status`, optional `date` / `decision_owner` /
   `supersedes` / `amends` / `scope` hints.
3. Optionally lint structure in ordinary repo CI (parse, identity, status, links).
   Do **not** invent a retrieval control plane or force every repo to ship one.
4. Keep current-behavior truth in code/schema/tests, not ADR narrative status.
5. Let agents find ADRs with ordinary search/RAG at a known commit.

## Explicitly not required

- A named `adr-lifecycle` script as product surface
- ApplicableDecisionBundle / typed-scope engines
- Mandatory product-local ADR adapters beyond ordinary docs hygiene
