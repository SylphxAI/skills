---
name: semantic-taxonomy-design
description: Design, evolve, or audit a large shared semantic vocabulary, concept scheme, capability catalog, knowledge organization system, or cross-domain taxonomy. Use when stable concept identity must be separated from mutable labels and concepts need governed broader, narrower, related, faceted, polyhierarchical, mapped, versioned, or deprecated relationships. Produce a Semantic Vocabulary Contract. Do not use for a small domain-local enum or reason-code list, an API or database schema, a folder layout, or a component or architecture dependency tree.
---

# Semantic Taxonomy Design

Model shared meaning as an evolvable concept graph, not as a path-shaped ID or
an uncontrolled label collection. Read
[references/semantic-vocabulary-method.md](references/semantic-vocabulary-method.md)
before choosing relation semantics or lifecycle rules.

## Workflow

1. Define the decisions, search, navigation, policy, interoperability, or
   reasoning jobs the vocabulary must support. Identify publishers, consumers,
   language scope, update cadence, and compatibility boundary.
2. Assign opaque, durable concept identifiers. Treat preferred names, alternate
   names, descriptions, paths, and ownership as mutable properties; a rename or
   reparent must not create a new concept.
3. Define each concept with scope notes, inclusion and exclusion criteria, and
   examples sufficient to distinguish close neighbors. Record provenance and
   responsible maintainer.
4. Model semantic hierarchy with broader and narrower relations, lateral
   association with related relations, and independent dimensions with facets.
   Permit polyhierarchy when one concept genuinely has multiple broader
   concepts; do not force every relation into one tree.
5. Define preferred, alternate, and hidden labels per language. Establish
   normalization and collision policy without treating equal strings as equal
   concepts.
6. Map external vocabularies explicitly as exact, close, broader, narrower, or
   related mappings. Keep mapping confidence and source version; never replace
   an internal identity with a third-party label.
7. Add only the formal axioms needed by consumers. Use OWL classes, properties,
   restrictions, or disjointness when machine inference is a real requirement;
   do not make a lightweight navigation vocabulary an ontology by default.
8. Specify additive change, replacement, split, merge, deprecation, removal,
   alias, and compatibility rules. Preserve resolvable tombstones and explicit
   successors for retired identifiers.
9. Validate identifiers, labels, definitions, links, cycles, mappings,
   deprecations, scheme boundaries, and consumer queries before release.

## Artifact

Produce a **Semantic Vocabulary Contract** containing:

- purpose, consumers, namespace, schemes, identity and language policy;
- concept record schema: ID, labels, definition, notes, examples, provenance,
  facets, semantic relations, mappings, lifecycle, and replacement;
- relation semantics and allowed graph shapes, including polyhierarchy;
- versioning, compatibility, deprecation, migration, and publication rules;
- integrity constraints, representative fixtures, and consumer query tests;
- unresolved ambiguities, governance owner, and evolution procedure.

## Boundaries

- Keep a small domain-owned status, enum, or reason-code vocabulary inside its
  domain model unless it has cross-domain discovery or mapping requirements.
- Use schema-design methods for wire formats, fields, types, cardinality, and
  storage constraints. A semantic vocabulary may be referenced by a schema but
  does not replace one.
- Use architecture or dependency modeling for modules, components, deployment,
  or allowed dependency direction. Those edges are not broader/narrower
  semantics.
- Use labels for discovery and filtering, facets for independent dimensions,
  and semantic relations for meaning. Do not encode all three in one slash-
  separated path.
