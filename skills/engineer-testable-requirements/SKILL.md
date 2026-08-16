---
name: engineer-testable-requirements
description: Turn product, system, or operational needs into testable requirements and acceptance criteria. Use when a team needs precise observable behavior before design, implementation, or review.
---

# Engineer Testable Requirements

Express the required outcome clearly enough for design, implementation, and acceptance to share the same meaning.

## Method

1. Define the subject, users and affected parties, system boundary, operating contexts, outcomes, and decision owner.
2. Gather current needs from users, contracts, policies, incidents, interfaces, existing behavior, and operational knowledge.
3. Separate binding constraints, user needs, requested preferences, assumptions, and open decisions.
4. Model representative normal, alternate, degraded, recovery, misuse, migration, and retirement scenarios that apply to the system.
5. Write each requirement as one necessary observable behavior or quality. Keep design choices open until an accepted constraint or decision selects them.
6. Add acceptance criteria with a triggering condition, observable result, and verification method. Base quantities and limits on a named product, technical, legal, or operational reason.
7. Resolve conflicts with the decision owner and record the selected tradeoff where implementers will find it.
8. Review the set for consistency, feasibility, missing lifecycle behavior, and clear ownership.
9. Connect each accepted requirement to its source need and downstream design or test using the repository's existing documentation system.

## Useful techniques

Open only the technique that matches the requirement:

- [Formal modeling](references/formal-modeling.md) for state machines, protocols, and invariants.
- [Generative testing](references/generative-testing.md) for behavior across broad input spaces.
- [Metamorphic and differential testing](references/metamorphic-and-differential-testing.md) when an exact expected output is difficult to enumerate.
- [CRDT convergence](references/crdt-convergence.md) for replicated data with convergence requirements.

## Output

Use the project's existing PRD, specification, issue, or requirements document. Include scope, terms, scenarios, requirements, acceptance criteria, assumptions, constraints, owners, and unresolved decisions at the level the work needs.
