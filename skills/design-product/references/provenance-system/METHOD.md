# Design Provenance System

Make lineage queryable and verifiable without pretending that lineage proves
correctness. Read
[references/provenance-models.md](./provenance-models.md) before choosing
the data model, trust boundary, or interoperability format.

## Method

1. Define the provenance questions, claim boundary, consumers, retention, and
   decisions the record must support. Collect lineage that serves one of those
   queries or controls.
2. Identify entities, activities, agents, plans, sources, derivations,
   delegations, generations, usages, revisions, and environments. Give each a
   stable identity and namespace.
3. Model relations as an append-only graph or equivalent event history. Preserve
   source identifiers and represent corrections as new records linked to prior
   history.
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

- Provenance establishes lineage and custody. Claim owners evaluate truth,
  safety, authorization, and quality through their corresponding controls.
- Let the factual or completion claim owner decide whether the available
  sources support that claim.
- Let Git and the active repository own commit, candidate, worktree, and source
  state.
- Let the team's active tracker own claims, assignments, checkpoints, and
  handoffs, and let the product runtime own live work state.
- Use supply-chain or data-domain Skills for domain-specific admission rules;
  this skill owns their common lineage model and boundaries.
