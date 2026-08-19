---
name: bound-request-scope
description: Define a request's objective, boundaries, terminal condition, and cut lines. Use when scope is ambiguous, expanding, or mixing several independently accepted outcomes.
---

# Bound Request Scope

Create enough shared clarity for useful work to begin and stay focused.

## Method

1. State the requested outcome in one sentence from the user's point of view.
2. Name the owning system, repository, product surface, and decision authority.
3. Define the terminal condition: local change, landed source, release, deployment, live behavior, or another explicit result.
4. List the work included because it is required for that terminal.
5. List adjacent outcomes that have independent acceptance and can remain separate.
6. Mark hard cut lines around permissions, destructive effects, public contracts, credentials, infrastructure, money, and sensitive data.
7. Resolve only facts that could change the chosen path. State assumptions and unknowns beside the decisions they affect.
8. Select the smallest complete path that reaches the terminal through existing product boundaries and standard tools.

## Working contract

Keep the result compact and usable in the current task:

```text
Objective:
Terminal:
In scope:
Adjacent work:
Constraints and authorities:
Assumptions or unknowns:
Chosen path:
```

Refresh the contract when the user changes the objective or a discovered fact changes the path.

Completing an already accepted multi-step objective is `drive-to-delivery`.
Choosing the next backlog item is `select-next-work`.
