---
name: decide-architecture-shape
description: Choose one architecture shape from viable options and record its tradeoffs. Use for material changes to ownership, system boundaries, state, interfaces, deployment, or migration paths.
---

# Decide Architecture Shape

Choose a coherent architecture that fits the product's real constraints and gives implementation one clear direction.

## Method

1. Define the decision, user outcome, current architecture, scope, constraints, and decision owner.
2. Map the relevant boundaries: responsibility, state ownership, interfaces, trust, deployment, failure domains, and external dependencies.
3. Identify the forces that distinguish viable shapes, such as consistency, latency, availability, security, operational simplicity, reversibility, and cost.
4. Develop a small set of materially different options, including continued use of the current shape when it remains viable.
5. Compare options against the same product scenarios, failure cases, migration needs, and long-term ownership model.
6. Choose one shape and explain why its tradeoffs fit the accepted outcome better than the alternatives.
7. Define the resulting component responsibilities, source of truth, interfaces, data flow, failure handling, and operational ownership.
8. Describe the migration and retirement path when the decision changes an existing authority or implementation.
9. Record the decision in the repository's existing architecture format when durable coordination benefits from it.

## Decision record

Include:

- context and decision owner;
- selected shape and responsibility map;
- important alternatives and tradeoffs;
- interfaces, state, trust, deployment, and failure behavior;
- migration, data preservation, recovery, and predecessor retirement;
- implementation consequences and open external dependencies.

Use `execute-hard-cutover` to perform an accepted replacement and `engineer-testable-requirements` to turn required behavior into acceptance criteria.
