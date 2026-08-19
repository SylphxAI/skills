---
name: design-product
description: "Design a product blueprint for an app, game, SaaS, or other digital product. Use when promise, users, journeys, capabilities, system shape, and operating model need one coherent design. Shape-specific depth lives in references."
---

# Design Product

Turn a product opportunity into a coherent blueprint that can guide implementation and evaluation.

## Method

1. Define the target users, job, current alternatives, product promise, desired outcome, constraints, and decision owner.
2. Describe the core value loop and the shortest journey from entry to first meaningful value and recurring value.
3. Map capabilities, user roles, information, content, states, permissions, failure behavior, recovery, and lifecycle events.
4. Define the product's primary surfaces and how they adapt across platforms, devices, locales, accessibility needs, and connectivity conditions.
5. Choose the architecture, state ownership, public interfaces, trust boundaries, external services, observability, and operational responsibilities that support the product promise.
6. Design activation, retention, collaboration, support, pricing or entitlement, distribution, privacy, safety, and exit behavior where they apply.
7. Use realistic end-to-end scenarios to expose missing states, contradictions, and ownership gaps.
8. Separate accepted product decisions, assumptions, open questions, and implementation choices.
9. Place the blueprint in the project's existing product documentation and hand implementation slices to `build-product`.

## References

Open only the pack the current product shape needs:

- [Space exploration](references/space-exploration/METHOD.md) when materially different concepts must be generated before a direction is chosen
- [App product](references/app-product/METHOD.md) for application journeys, reach, and desktop or mobile surfaces
- [Game product](references/game-product/METHOD.md) when the promise is play, mastery, progression, or live game operations
- [SaaS web platform](references/saas-web-platform/METHOD.md) for public-acquisition-to-authenticated-service platforms
- [Product portfolio](references/product-portfolio/METHOD.md) for multi-product boundaries, shared capabilities, and bundles
- [Marketing automation](references/marketing-automation/METHOD.md) for authorized journeys and messaging
- [Provenance system](references/provenance-system/METHOD.md) for traceable sources and transformations
- [Semantic taxonomy](references/semantic-taxonomy/METHOD.md) for a usable product vocabulary

Privacy lifecycle, pricing, payments, and interface craft stay on their own listings.

## Output

Return the product promise, users, journeys, capability and state model, interface surfaces, architecture and ownership, business and operating model, lifecycle behavior, accepted decisions, and open questions.
