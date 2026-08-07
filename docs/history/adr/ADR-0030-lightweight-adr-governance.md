---
id: ADR-0030-lightweight-adr-governance
status: accepted
date: 2026-07-31
decision_owner: SylphxAI
supersedes:
  - ADR-0029-adr-lifecycle-and-retrieval-contract
amends: []
scope:
  - documentation-authority
---

# ADR-0030: Lightweight ADR governance (no retrieval control plane)

## Context

ADR-0029 introduced a deterministic ApplicableDecisionBundle resolver, typed
scope calculus, exclusive decision keys, unresolved dispositions, and product
adapter obligations. That machinery is implementation-correct under its own
rules, but it is overbuilt relative to observed need:

- no runtime/agent consumer called the resolver outside tests;
- installed Skills packages do not ship the ADR corpus or resolver;
- task_scope production was undefined, so determinism depended on untrusted
  classification inputs;
- CI validated a self-referential taxonomy rather than product-material facts;
- industry ADR baselines (MADR / adr-tools) already cover status, supersession,
  and decision prose without a query language.

This repository remains public. Portfolio law should stay small, copyable, and
honest about what agents actually run.

## Decision

1. **Supersede ADR-0029.** The ApplicableDecisionBundle retrieval control plane
   is withdrawn as portfolio law.

2. **Keep lightweight ADR governance.**
   - Material durable decisions use ADRs in the owning repository.
   - ADRs record why; code/schema/tests remain current-behavior authority.
   - Generated projections are non-authoritative.
   - Minimal frontmatter: `id`, `status`, optional `date`, `decision_owner`,
     `supersedes`, `amends`, and optional `scope` hints.
   - Status values: `proposed | accepted | rejected | superseded`.
   - Structural CI only: parseable YAML, identity, legal status, dangling
     relation checks, cycle checks, supersession pointer completeness.

3. **No mandatory product adapters.** Product repositories may adopt the same
   minimal frontmatter and structural lint. They must not be required to host a
   local ApplicableDecisionBundle resolver or typed-scope policy engine.

4. **Retrieval stays ordinary.** Agents use native search/RAG over ADR markdown
   at a known commit. Future knowledge/context systems may index ADRs as derived
   consumers; they own ranking and query provenance, not ADR authoring law.

5. **Repo integrity only.** Any structural ADR checks belong inside ordinary
   repository CI (for example this repository's `npm test`). There is no
   separate ADR lifecycle product or installable checker.

## Consequences

- Large derived machinery (bundle schemas, INDEX gates, exclusive lineage
  calculus, disposition digests) is removed or demoted.
- ADR authoring cost drops to industry-comparable baseline.
- Real retrieval improvements can be invented later where a consumer exists,
  under the knowledge/context owner rather than every product repo.

## Verification

- Ordinary repository integrity (`npm test`) accepts the ADR corpus.
- Documentation-standard describes the lightweight contract only.
- No separate ADR lifecycle script or product-repo resolver obligation.
