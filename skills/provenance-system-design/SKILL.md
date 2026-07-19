---
name: provenance-system-design
description: "Design or audit machine-readable provenance, lineage, derivation, attribution, and chain-of-custody across data, artifacts, models, agent actions, decisions, builds, or transformations, producing a Provenance Contract. Use when a system must answer what was used, generated, changed, by whom or what, under which process, and how the result can be traced or reproduced. Do not use merely to judge whether one claim is true, summarize Git history, or coordinate live work."
---

# Provenance System Design

Make lineage queryable and verifiable without pretending that lineage proves
correctness. Read
[references/provenance-models.md](references/provenance-models.md) before choosing
the data model, trust boundary, or interoperability format.

## Method

1. Define the provenance questions, claim boundary, consumers, retention, and
   decisions the record must support. Do not collect lineage without a query or
   control that will use it.
2. Identify entities, activities, agents, plans, sources, derivations,
   delegations, generations, usages, revisions, and environments. Give each a
   stable identity and namespace.
3. Model relations as an append-only graph or equivalent event history. Preserve
   source identifiers and represent corrections as new records; do not overwrite
   history silently.
4. Bind each observation to producer, subject, time, revision or digest,
   collection method, and trust domain. Separate self-assertion, external
   observation, independently verified evidence, and cryptographic attestation.
5. Define capture points at transformation boundaries. Minimize sensitive data,
   support redaction or cryptographic erasure where required, and keep integrity
   metadata only as long as justified.
6. Select interoperable projections where useful: W3C PROV for general lineage,
   SLSA or in-toto for software supply chain, OpenLineage for data jobs, and C2PA
   for content credentials. Keep one semantic owner behind projections.
7. Test missing links, cycles, duplicate events, clock skew, stale identity,
   replay, tampering, partial disclosure, cross-tenant access, and reconstruction
   of representative lineage questions.

## Output

Produce one **Provenance Contract** containing:

- questions, scope, consumers, and authority boundary;
- entity, activity, agent, plan, and relation model;
- identifiers, namespaces, versions, digests, and time semantics;
- capture points, producers, trust classes, and validation rules;
- correction, replay, deduplication, retention, deletion, and privacy behavior;
- interoperable projections and loss mapping;
- required queries, integrity checks, adversarial tests, and known limits.

## Boundaries

- Provenance establishes lineage and custody; it does not by itself prove that
  content is true, safe, authorized, or high quality.
- Use `evidence-and-claims-standard` to decide whether provenance and other
  evidence support a factual or completion claim.
- Use `source-authoring-standard` for commit, candidate, worktree, and source
  reconciliation semantics.
- Use `work-coordination-standard` for portable claim, lease, checkpoint, and
  handoff semantics; use the matching product adapter for live work state.
- Use supply-chain or data-domain Skills for domain-specific admission rules;
  this skill owns their common lineage model and boundaries.
