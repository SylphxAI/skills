---
id: ADR-0024-composable-product-portfolio-boundary
status: accepted
date: 2026-07-29
decision_owner: SylphxAI/skills
supersedes: []
amends: []
scope:
  - product-portfolio
---

# Separate product portfolio composition from code, commercial and runtime boundaries

## Context

A platform can accumulate unrelated user promises, state authorities and
operating lifecycles until every change touches one growing product. The
opposite reaction is also harmful: treating every feature or Capability as an
independent product, repository, website, service, database or runtime cell.
That replaces one monolith with permanent discovery, identity, entitlement,
network, compatibility, support and operational fragmentation.

The existing standards already own:

- Capability-first code and system architecture;
- pricing, packaging, entitlement and profit-center decisions;
- one product program's cross-domain build-to-run graph; and
- conditional runtime cells for demonstrated fault-isolation requirements.

No existing Procedure owns the recurring portfolio-level job of classifying
candidate units, selecting independently valuable products, designing the
connector graph, and proving that internal dogfooding uses customer-grade
contracts.

Industry terminology also requires a boundary correction. MACH composability
supports modular, independently evolvable components connected through
interoperable APIs. AWS cell architecture is a runtime availability and
blast-radius technique for workloads with high resilience requirements.
Neither says that every feature must become a separate product or that a
commercial product is a runtime cell.

## Decision

Add `compose-product-portfolio` as the single owner of a **Composable
Product Portfolio Contract**.

The Procedure:

1. classifies proposed surfaces as standalone products, embedded Capabilities,
   shared substrate, connectors, composed experiences or bundles;
2. applies explicit independent-product and hard-negative predicates;
3. keeps commercial product, Capability, module, contract, connector,
   repository, service, deployment, cell and trust boundaries orthogonal;
4. defines each selected product's independent promise, adoption, state,
   contract, lifecycle, operations and exit;
5. defines typed connector, shared-substrate, shell, bundle and cross-product
   workflow boundaries;
6. requires customer-grade internal dogfooding without direct database access,
   private imports or hidden authorization and entitlement bypasses; and
7. compares permanent portfolio complexity before extracting or merging units.

The new Procedure owns portfolio topology, not accepted product-local facts:

- `engineering-standard` continues to own code and system architecture;
- `commercial-decision-standard` owns pricing, SKU, entitlement, packaging,
  profit-center and internal-settlement decisions;
- `compose-product-program` owns one selected product program's lifecycle
  graph;
- product procedures own each product's promise and experience; and
- delivery procedures own release and observed delivery evidence.

One product may contain several Capabilities, share a repository or experience
shell, run in a modular monolith, and later deploy across many runtime cells.
A product can be independently valuable without a separate website, repository,
database, invoice, P&L or legal entity.

## Rejected directions

### One feature or Capability equals one product

Rejected because semantic modularity is required more often than commercial
and operational independence. A coherent embedded Capability can be strongly
modular without creating another customer concept and lifecycle.

### One product equals one repository, service, database, site or cell

Rejected because these boundaries change for different reasons and have
many-to-many mappings. Forcing alignment either couples independent products or
over-distributes cohesive systems.

### One large platform owns all product truth

Rejected because it obscures product promises, state ownership, lifecycle and
failure boundaries. A shared experience shell or substrate can compose
products but cannot become their semantic writer.

### Connectors own cross-product policy

Rejected because an integration layer containing business truth becomes a new
monolith and duplicates the participating products' authorities. A durable
cross-product workflow has an explicit process owner; connectors remain thin.

### Internal dogfooding may use privileged internals

Rejected because it proves only a private implementation path. Internal
connectivity and service identity may differ, but the supported semantic
contract, tenant and authorization boundary, failure behavior and lifecycle
remain customer-grade.

## Consequences

- Agents can distinguish a product portfolio decision from a folder or
  microservice refactor.
- Products can be composed into one suite without losing independent ownership
  or forcing separate customer experiences.
- Shared platform capabilities stay generic and cannot absorb product-specific
  semantics.
- Cheap agentic code generation is used to implement and verify the chosen
  design, not to pretend that public contracts and operational surfaces are
  free.
- Runtime cells retain their precise availability meaning.
- The portfolio can grow by adding or replacing valuable units without making
  unit count an optimization target.

## Verification

- The new Skill has positive, multilingual, compound, near-neighbour and
  abstention routing fixtures.
- Tests distinguish portfolio topology from code modularity, one-product
  lifecycle work, pricing-only work and runtime cell design.
- Engineering, commercial and product-lifecycle owners link the new Procedure
  without transferring their semantic authority.
- Repository catalog, integrity tests and package inspection pass on the exact
  candidate.

## Primary sources

- [MACH Alliance: MACH Explained](https://machalliance.org/mach-explained)
- [MACH Alliance Standards: Reference Architecture Introduction](https://github.com/machalliance/standards/blob/main/reference/architecture-intro.md)
- [AWS: Reducing the Scope of Impact with Cell-Based Architecture](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html)
- [Martin Fowler / Thoughtworks: Products Over Projects](https://martinfowler.com/articles/products-over-projects.html)
