---
id: ADR-0018-selective-originality-and-frontend-performance-methods
status: accepted
date: 2026-07-27
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - originality-frontend
---

# ADR-0018: Add only independently requested originality and frontend performance methods

## Context

An audit of `MengTo/Skills` found useful practices, but bulk installation would
duplicate existing interface, asset, architecture, review, and engineering
owners. A large imported portfolio would increase routing collisions and
context pressure without creating independent artifacts.

Two jobs were not yet first-class routes:

1. comparing a declared subject with supplied references and returning a
   reproducible originality-risk review; and
2. reproducing and repairing a frontend runtime performance failure with
   comparable source and runtime proof.

`design-system-extractor`, `craft-product-interface`, and `produce-product-assets`
contain adjacent rules but do not own the first artifact.
`craft-product-interface` carries a baseline performance floor, while
`engineering-standard` owns general implementation quality; neither provides
the second dedicated diagnostic and remediation record.

## Decision

1. Add `review-reference-originality` as the single owner of a Reference
   Originality Review. It evaluates design risk, not legal infringement.
2. Add `remediate-frontend-performance` as the single owner of a Frontend
   Runtime Performance Remediation Record. It requires reproduction, causal
   diagnosis, owner-level repair, and comparable before/after evidence.
3. Keep both Skill entrypoints thin and place detailed methods in one reference
   each. Add no scripts, meta-router, benchmark service, or imported demo code.
4. Preserve adjacent ownership: design extraction, interface craft, asset
   production, binding engineering invariants, operational observability, and
   legal conclusions remain separate.
5. Use original synthesis with exact upstream lineage rather than copying the
   external packages wholesale.
6. Add native routing fixtures for positive, multilingual, compound, and
   near-neighbour requests. Fixtures validate authored semantic boundaries;
   they do not prove every runtime model will inject a package.

## Consequences

- Agents can request either missing artifact directly without loading a broad
  external portfolio.
- Ordinary interface work and general defect repair retain their existing
  owners.
- Runtime performance guidance no longer needs to be inferred from one
  interface reference.
- The public repository preserves provenance while keeping its own terminology,
  evidence contract, and audience boundaries.

## Verification

- `tests/fixtures/method-injection-cases.json` remains a non-blocking evaluation
  corpus.
- Exact Skills revision native-runtime evaluation is required before claiming actual
  package injection or routing behavior.
- `npm test` and `npm pack --dry-run` verify package/catalog integrity,
  executable runtime behavior, and publication contents rather than the
  authored routing answer.
