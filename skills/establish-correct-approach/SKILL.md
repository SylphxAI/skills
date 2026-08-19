---
name: establish-correct-approach
description: Identify the current supported method only when the approach or owning authority is genuinely unclear. Do not use as a gate before ordinary implementation of a known path.
---

# Establish Correct Approach

Name one current owner-aligned method and hand it to implementation.

Skip this skill when the owning path is already known and the official
contract has not changed. Ordinary implementation belongs to the skill that
owns that job.

## Method

1. State the exact change and the decision the method must resolve. If that
   decision is already settled, stop and implement.
2. Identify live authorities: the owning repository, current runtime behavior, official documentation, current CLI or SDK, public schema, and deployed contract when relevant.
3. Read the smallest current sources that can settle ownership and supported usage.
4. Compare the canonical owner path, continued current behavior, and materially different standard alternatives.
5. Prefer the method that uses the active semantic owner, supported public surface, one source of truth, and ordinary recovery path.
6. Understand the purpose and current consumers of existing structure before replacing it.
7. Stop research when additional sources can no longer change the chosen method.
8. Hand the selected method, authority links, constraints, and open external dependency to the matching implementation skill.

When a temporary mitigation is unavoidable, record its owning violation,
scope, expiry, removal predicate, owner, and verification while keeping the
supported method as the destination. Do not relabel a permanent bypass as
compatibility.

Read [owner-aligned method selection](references/owner-aligned-method.md) for
selection criteria and [method sources](references/method-sources.md) for
research techniques.

## Output

Return the selected method, current sources, considered alternatives,
decisive reasons, and the condition that would change the answer.
