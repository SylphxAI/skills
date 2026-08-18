---
name: compose-product-program
description: Compose a multi-work product program into one owner map, dependency graph, release handoff, and completion decision. Use when one outcome spans several lifecycle domains or independently owned artifacts; use compose-product-portfolio for product boundaries and drive-to-delivery for one objective.
---

# Compose Product Program

Compose one cross-domain product outcome without becoming the semantic owner of
the product, its data, or its delivery systems.

## When to use

- A product outcome spans design, data, commerce, operations, distribution,
  support, or other independently owned work.
- Several artifacts must arrive in a compatible order with explicit handoffs.
- A release or launch decision needs one dependency graph and one owner map.

Use `compose-product-portfolio` when the question is whether something is a
product, embedded capability, shared substrate, connector, composed experience,
or bundle. Use `drive-to-delivery` for one accepted objective. Use the
specialist owner for implementation, distribution, assets, payments, or live
operations.

## Method

1. Frame the primary user outcome, target terminal, constraints, ruin boundaries,
   non-goals, and decision owner. Label facts as given, observed, assumed,
   hypothesis, or decision.
2. Build a canonical owner map. Assign one source for the product promise,
   capability semantics, data and identity, commerce, trust, assets, channel
   release, support, operations, and delivery state. Reference those sources;
   do not copy their live facts into this program.
3. Sweep every selected capability across lifecycle, failure, recovery,
   security, privacy, accessibility, localization, support, migration, and
   withdrawal. Give each a complete target or an exact non-applicability reason.
4. Draw an acyclic dependency graph. Each edge names its producer, consumer,
   contract, version or revision, acceptance test, failure behavior, and next
   owner action. Use asynchronous reconciliation when peers must converge
   without lockstep availability.
5. Route each artifact to its specialist owner. The program owns coverage,
   ordering, collision boundaries, and handoff acceptance; it does not rewrite
   a sibling artifact or create a second control plane.
6. Keep delivery layers separate: local, candidate, landed, released,
   deployed, and live. Bind release and live claims to the exact source or
   artifact observed by the owning system.
7. Close the brief when every selected capability has an owner, target,
   dependency, acceptance path, recovery path, and next action. Leave missing
   authority as a named blocker instead of filling it with prose.

Read [program composition method](references/program-composition-method.md) when
the program spans multiple release channels, locales, SDKs, or external
certification boundaries.

Read [behavior examples](references/behavior-examples.md) when checking native
discovery boundaries or the Product Program Brief artifact shape.

## Output

Return one **Product Program Brief** containing:

- objective, constraints, ruin boundaries, non-goals, and terminal;
- canonical artifact and owner map with exact paths or revisions;
- selected capability matrix with target, lifecycle, failure, recovery, and
  delivery state;
- dependency DAG, collision boundaries, handoff acceptance tests, and release
  order;
- specialist handoffs, external authority gates, unresolved blockers, and the
  next owner action for each incomplete item.

## Boundaries

- `compose-product-portfolio` owns product-unit topology and peer connectors.
- `build-product` owns product implementation and its source contracts.
- `build-distribution-readiness` owns exact channel artifacts and publication
  readback; `produce-product-assets` owns finished media and asset QA.
- Product repositories and host owners own runtime, deployment, customer data,
  native discovery, and live behavior.
- This skill creates a human-readable brief only. It does not create a
  generated manifest, qualification gate, installer, scheduler, or proof
  control plane.
