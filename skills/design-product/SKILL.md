---
name: design-product
description: "Design one product blueprint: promise, users, journeys, capabilities, system shape, and operating model. Use for an app, game, or SaaS product. Provenance, taxonomy, and multi-product portfolio are separate skills."
---

# Design Product

Turn a product opportunity into a coherent blueprint another builder can
implement.

## Method

1. Define users, job, current alternatives, product promise, desired outcome,
   constraints, and decision owner.
2. If materially different concepts are still live, open
   [space exploration](references/space-exploration/METHOD.md) before locking
   a direction.
3. Describe the core value loop and the shortest path from entry to first
   meaningful value and recurring value.
4. Map capabilities, roles, information, states, permissions, failure,
   recovery, and lifecycle events.
5. Define primary surfaces and how they adapt across platforms, devices,
   locales, accessibility, and connectivity.
6. Choose architecture, state ownership, public interfaces, trust boundaries,
   external services, observability, and operational responsibilities.
7. Design activation, retention, collaboration, support, pricing, distribution,
   privacy, safety, and exit where they apply.
8. Open only the shape pack the product actually is:
   [app](references/app-product/METHOD.md),
   [game](references/game-product/METHOD.md), or
   [SaaS web platform](references/saas-web-platform/METHOD.md).
9. Open [marketing automation](references/marketing-automation/METHOD.md) only
   when authorized journeys and spend are part of this product's design.
10. Separate accepted decisions, assumptions, open questions, and
    implementation choices. Hand slices to `build-product`.

Use `design-provenance-system` for lineage. Use `design-semantic-taxonomy` for
a shared vocabulary. Use `compose-product-portfolio` for product boundaries
across several products. Use `design-privacy-lifecycle` for personal data.
Use `price-saas-subscription` and `build-payment-readiness` for packaging and
money. Use `craft-product-interface` for one flow.

## Output

Return promise, users, journeys, capability and state model, surfaces,
architecture and ownership, business and operating model, accepted decisions,
and open questions.
