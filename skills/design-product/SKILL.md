---
name: design-product
description: Design a coherent product blueprint when no more specific product-design owner applies. Use for an uncategorized or intentionally cross-type product; route app, game, and SaaS platform promises to their specialized design skills.
---

# Design Product

Turn a product opportunity into a coherent blueprint that can guide implementation and evaluation.

## When to use

- The product type is not yet known, or the promise intentionally spans types
  without one specialized design owner.
- A general product blueprint is the independently accepted artifact.

Use `design-app-product` for an application promise, `design-game-product` for
a play/mastery promise, and `design-saas-web-platform` for a public-to-
authenticated SaaS platform. Use `compose-product-portfolio` for product-unit
boundaries, `compose-product-program` for multi-domain delivery graphs, and
`build-product` for one accepted implementation slice.

## Method

1. Define the target users, job, current alternatives, product promise, desired outcome, constraints, and decision owner.
2. Describe the core value loop and the shortest journey from entry to first meaningful value and recurring value.
3. Map capabilities, user roles, information, content, states, permissions, failure behavior, recovery, and lifecycle events.
4. Define the product's primary surfaces and how they adapt across platforms, devices, locales, accessibility needs, and connectivity conditions.
5. Choose the architecture, state ownership, public interfaces, trust boundaries, external services, observability, and operational responsibilities that support the product promise.
6. Design activation, retention, collaboration, support, pricing or entitlement, distribution, privacy, safety, and exit behavior where they apply.
7. Use realistic end-to-end scenarios to expose missing states, contradictions, and ownership gaps.
8. Separate accepted product decisions, assumptions, open questions, and implementation choices.
9. Place the blueprint in the project's existing product documentation and hand implementation slices to the appropriate build skills.

## Output

Return the product promise, users, journeys, capability and state model, interface surfaces, architecture and ownership, business and operating model, lifecycle behavior, accepted decisions, and open questions.

## Boundary

This skill owns the generic product blueprint only. Specialized design skills
own their product-type semantics; implementation, distribution, operations, and
live behavior remain with their owning skills and repositories.
