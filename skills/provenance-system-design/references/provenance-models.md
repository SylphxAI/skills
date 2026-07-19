# Provenance Models and Trust Boundaries

## Core graph

The W3C PROV model provides a portable vocabulary:

- **Entity:** data, content, model, artifact, decision, configuration, or state.
- **Activity:** transformation, execution, build, generation, review, or import.
- **Agent:** person, service, organization, model runtime, or delegated actor.
- **Relations:** generation, usage, derivation, attribution, association,
  delegation, revision, invalidation, and specialization.

Use this vocabulary as a semantic model even when the storage is relational,
event-based, document-oriented, or a graph projection. Storage shape is not the
authority boundary.

## Required identity and observation fields

For a material lineage record, bind:

| Field | Purpose |
| --- | --- |
| Subject id and type | The exact entity or activity described |
| Namespace and tenant | Collision and access boundary |
| Revision or digest | Immutable identity where available |
| Producer | Who or what emitted the record |
| Activity and plan | How and under which declared procedure it was produced |
| Inputs and outputs | Used and generated entities |
| Time semantics | Event time, observation time, and ordering limits |
| Trust class | Self-asserted, observed, verified, or attested |
| Source locator | How to inspect the owning record |
| Schema and policy version | How to interpret the record |

Avoid a single unqualified `created_by` field. Generation, attribution,
association, delegation, and observation answer different questions.

## Trust is not transitive by default

- A signed statement proves control of a signing key and integrity of signed
  bytes under a key policy; it does not prove the statement is true.
- A digest proves byte identity, not origin, safety, semantics, or execution.
- A lineage edge emitted by the subject is self-assertion until another trust
  mechanism establishes its producer and observation boundary.
- Reproducibility can corroborate a transformation but does not establish that
  its inputs were lawful, unbiased, or correct.
- Missing lineage is unknown unless the capture contract proves completeness.

Represent trust class and verifier separately from the provenance statement so
consumers can apply their own claim policy.

## Interoperability projections

| Domain | Projection | Preserve |
| --- | --- | --- |
| General lineage | W3C PROV-DM / PROV-O | entities, activities, agents, derivation and delegation |
| Software supply chain | SLSA provenance / in-toto attestations | build subject, materials, builder, invocation, predicate type |
| Data pipelines | OpenLineage | jobs, runs, datasets, inputs, outputs, facets |
| Digital media | C2PA | assertions, ingredients, actions, claim generator, signatures |

Document loss in each projection. Do not let an external format become a second
authoring source when the internal model contains richer semantics.

## Integrity and lifecycle tests

Test at least:

- identifier collision and cross-tenant reference rejection;
- idempotent duplicate ingestion;
- invalid cycles for relation types that must be acyclic;
- out-of-order events and clock uncertainty;
- missing input, producer, revision, or verifier;
- correction without destructive history rewrite;
- partial disclosure and redacted payload verification;
- replay from source events into projections;
- tampered digest, signature, or schema version; and
- representative lineage queries across more than one transformation hop.

## Primary sources

- W3C PROV-DM defines the general provenance data model:
  <https://www.w3.org/TR/prov-dm/>
- W3C PROV-O defines the interoperable OWL2 ontology:
  <https://www.w3.org/TR/prov-o/>
- SLSA provenance defines software build subjects, dependencies, builders, and
  build-process metadata:
  <https://slsa.dev/spec/v1.1/provenance>
- in-toto Attestation defines extensible statement and predicate envelopes:
  <https://github.com/in-toto/attestation>
- OpenLineage defines an open event model for data-job and dataset lineage:
  <https://openlineage.io/docs/spec/object-model/>
- C2PA specifies content credentials, assertions, ingredients, actions, and
  cryptographic binding for digital content:
  <https://c2pa.org/specifications/specifications/2.2/specs/C2PA_Specification.html>
