---
name: composable-product-portfolio
description: "Multi-product portfolio seams: share vs isolate, composition rules—not a single-product blueprint or one-repo layout."
---

# Composable Product Portfolio

Turn a growing platform into a coherent portfolio without turning every feature
into a product. Optimize for independently useful units, narrow semantic
ownership, simple public surfaces, and composition through explicit contracts.

Read
[references/composable-product-portfolio-method.md](references/composable-product-portfolio-method.md)
before classifying or separating product units.

## Atomic boundary

This Skill owns one **Composable Product Portfolio Contract**:

- portfolio-level customer jobs and product-unit boundaries;
- classification of proposed surfaces as product, embedded capability, shared
  substrate, connector, composed experience or bundle;
- the product and connector graph;
- standalone-use, operational, commercial and dogfooding obligations;
- decisions to keep together, extract, merge, replace or retire units; and
- proof that composition does not create a hidden monolith or a fragmented
  distributed system.

It does not own product-local domain semantics, source modules, prices,
entitlements, deployment topology, runtime cells, or delivery evidence. Those
remain with their owning product and matching Standards or Procedures.

## Core invariants

1. A product unit is defined by a coherent customer job and durable product
   promise, not by code size, a menu item, a Capability name, or a desire for
   another website.
2. Product, Capability, module, repository, public site, service, database,
   deployment and runtime cell are orthogonal boundaries. Map them explicitly;
   never force them one-to-one.
3. A standalone product is independently adoptable and operable. It may still
   appear in a shared shell, bundle or suite.
4. A connector is a thin adapter over an owned public contract. It translates,
   authenticates, routes and reconciles; it does not become the owner of
   cross-product business truth.
5. Internal dogfooding uses the same supported semantic contract, lifecycle,
   failure behavior and observability as external consumption. Private
   connectivity or service identity may differ; hidden APIs, direct database
   access and customer-impossible privileges may not.
6. Simplicity means the smallest number of independently meaningful units and
   public concepts that preserve ownership and option value. It does not mean
   one giant application or one deployment per feature.

## Workflow

1. State the portfolio objective, target customers, recurring jobs, existing
   products, proposed capabilities, experience surfaces, shared dependencies
   and commercial constraints. Separate current implementation from desired
   product semantics.
2. Classify every candidate surface on independent axes: customer value,
   semantic ownership, state authority, onboarding and use, lifecycle and
   support, release and failure, commercial posture, and deployment topology.
3. Apply the extraction predicates in the reference. Keep a capability inside
   its product unless independent value and lifecycle are strong enough to
   repay the permanent discovery, identity, entitlement, support, compatibility
   and operational costs.
4. Define each selected product unit's promise, buyer/user, owned Capabilities,
   authoritative state, public contracts, standalone entry point, lifecycle,
   SLO, support/recovery, pricing or entitlement posture, and exit/retirement
   path.
5. Draw the directed connector graph. Assign one contract and state owner per
   edge; specify authentication, authorization, tenancy, versioning,
   idempotency, quotas, metering, failure, retry/reconciliation, observability,
   privacy and replacement behavior.
6. Define shared substrate and composed experiences separately. Shared
   identity, billing, catalog, discovery or UI may reduce friction but must not
   silently acquire another product's domain truth.
7. Define dogfooding proof. Every internal producer-consumer edge must pass the
   same supported contract and negative backdoor tests as a customer edge.
8. Record keep/extract/merge/retire decisions with evidence, rejected
   alternatives, migration only when requested, and exact handoffs to
   commercial, engineering, lifecycle and delivery owners.

## Output contract

Produce one **Composable Product Portfolio Contract** containing:

1. portfolio objective, customer jobs, constraints and success measures;
2. candidate classification matrix and explicit orthogonal boundary map;
3. product-unit registry with promise, owner, Capabilities, state authority,
   standalone journey, lifecycle, SLO/support, commercial posture and exit;
4. typed connector graph with contract ownership and complete edge semantics;
5. shared-substrate, experience-shell and bundle boundaries;
6. dogfooding matrix and evidence required to reject privileged internal paths;
7. keep/extract/merge/replace/retire decisions with expected value and permanent
   cost;
8. anti-fragmentation and shared-critical-path review;
9. accepted ADR and implementation handoffs without duplicating their facts;
   and
10. assumptions, unresolved evidence and next discriminating actions.

## Hard gates

Reject or redesign a portfolio that:

- equates a feature, Capability, module, repository, site, service, database or
  runtime cell with a product without applying the independent product test;
- creates a standalone product with no standalone customer job, onboarding,
  supported contract, lifecycle, support/recovery or measurable outcome;
- puts cross-product business policy, orchestration truth or authoritative data
  inside a connector, API gateway, shared UI or integration database;
- lets one product read or write another product's database or internal module
  instead of using its supported contract;
- requires every product to have a separate repository, website, deployment,
  database, profit-and-loss statement or cell;
- calls a shared navigation shell, dashboard or bundle the semantic owner of
  the products it presents;
- duplicates entitlement, catalog, price, identity or product semantics across
  bundles and products;
- makes an optional peer product or control plane a synchronous global
  dependency without a declared failure and static-stability model;
- claims dogfooding while internal consumers use hidden endpoints, privileged
  database access, unmetered semantics, bypassed authorization or failure modes
  unavailable to customers; or
- maximizes unit count, repositories, services or connectors instead of
  customer value, evolvability and total lifecycle economics.

## Routing boundaries

- `engineering-standard` owns Capability, module, contract, state, process,
  cell, deployment and trust architecture inside and between implementations.
- `commercial-decision-standard` owns accepted pricing, packaging, SKU,
  entitlement, profit-center and internal-settlement decisions.
- `product-lifecycle-architect` owns the cross-domain build-to-run delivery
  graph for one selected product program, not the portfolio's product-unit
  topology.
- `product-lifecycle-architect` may compose a selected bundle after this Skill
  has resolved which products remain independently owned.
- `saas-web-platform-blueprint`, app/game blueprints and other product
  procedures own each product's promise and experience.
- `software-distribution-readiness` and `delivery-standard` own release and
  externally observed delivery evidence.

## Completion check

The contract is complete when every candidate surface has one justified
classification, every selected product has an independently usable lifecycle,
every cross-product edge has one typed owner and failure contract, shared
substrate owns no hidden product truth, and the design proves both composition
and resistance to unnecessary fragmentation. The contract is a design and
decision handoff; it is not implementation or live-delivery proof.
