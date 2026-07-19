# Semantic vocabulary method

Use SKOS as the default conceptual model for shared controlled vocabularies and
knowledge organization systems. Add OWL semantics only when consumers require
formal axioms and inference beyond labels, notes, hierarchy, association, and
mapping.

## Concept identity and labels

A concept has a durable identifier independent of its current name or position.
Represent human language as properties of that concept:

- one preferred label per concept per language;
- zero or more alternate labels for synonyms and common variants;
- hidden labels for misspellings, deprecated terms, or search-only variants;
- definitions, scope notes, examples, editorial notes, provenance, and change
  notes as distinct fields rather than one overloaded description.

Do not derive the concept ID from a preferred label or hierarchy path. Label
collision may indicate ambiguity, homonymy, or duplication; resolve it using
definitions and scope, not string equality alone.

## Relations and facets

Use relation types deliberately:

- **broader/narrower** — hierarchical semantic relation;
- **related** — associative relation that is not hierarchical;
- **facet membership or typed property** — an independent classification
  dimension such as lifecycle, channel, risk, or implementation kind;
- **exact/close/broad/narrow/related mapping** — alignment across concept
  schemes, not an internal hierarchy shortcut.

A vocabulary is usually a graph. Allow polyhierarchy when justified. Keep
`broader` distinct from transitive ancestry: SKOS exposes transitive super-
properties for hierarchical closure without asserting every ancestor as a
direct parent. Never use `related` for a relation already implied by
hierarchical ancestry.

Facets avoid combinatorial trees. Model “payments + mobile + regulated” as one
concept plus independent facets or typed relations, not duplicated branches
under every possible path.

## When OWL is warranted

Use OWL 2 when a consumer needs formal classes, properties, class expressions,
property characteristics, disjointness, equivalence, restrictions, or
machine-derived entailments. State the intended OWL profile and inference
boundary. Avoid adding strong axioms merely to make the model look rigorous:
an incorrect disjointness or equivalence assertion can make valid data
inconsistent or propagate false conclusions.

## Lifecycle

Version the published vocabulary and record change provenance. Classify changes:

- label, note, or metadata correction with stable identity;
- additive concept or relation;
- semantic broadening or narrowing;
- reparenting or facet change;
- split into multiple successors;
- merge into one survivor;
- deprecation with replacement or explanation;
- removal only after the compatibility and retention contract permits it.

Never reuse an identifier for a different meaning. Keep deprecated identifiers
resolvable with status, dates, reason, and successor mapping. A split or merge
requires consumer migration guidance because exact equivalence rarely survives.

## Minimum concept record

```text
id
scheme
preferred_labels[language]
alternate_labels[language][]
hidden_labels[language][]
definition
scope_notes[]
examples[]
broader_ids[]
related_ids[]
facets{type: values[]}
mappings[{scheme, id, relation, source_version, confidence}]
status
successor_ids[]
provenance{source, maintainer, created_at, changed_at}
```

## Integrity tests

Automate at least:

- globally unique, immutable, well-formed identifiers;
- no dangling concept, relation, mapping, or successor references;
- at most one preferred label per language and concept;
- explicit policy for missing labels, label collisions, and language fallback;
- no self-links, hierarchical cycles, or simultaneous hierarchical ancestry and
  `related` relation between the same concepts;
- inverse broader/narrower consistency and valid scheme boundaries;
- allowed facet types and values with no path-derived hidden semantics;
- mapping relation validity and source-version presence;
- deprecated concepts remain resolvable and have a reason plus successor or an
  explicit no-replacement statement;
- representative search, navigation, policy, and mapping queries return the
  intended concepts after every change.

Test real consumer questions, not only graph validity. A structurally valid
vocabulary can still fail discovery or conflate meanings.

## Sources

- W3C, **SKOS Simple Knowledge Organization System Reference**, W3C
  Recommendation, 18 August 2009, <https://www.w3.org/TR/skos-reference/>.
  Defines concepts, concept schemes, lexical labels, documentation properties,
  semantic relations, mapping properties, collections, and integrity
  conditions.
- W3C, **OWL 2 Web Ontology Language Document Overview (Second Edition)**,
  W3C Recommendation, 11 December 2012,
  <https://www.w3.org/TR/owl2-overview/>. Defines the OWL 2 document family,
  modeling constructs, profiles, semantics, and reasoning use cases.
