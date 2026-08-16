---
name: establish-correct-approach
description: Identify the current supported method for a change when the approach or owning authority is genuinely unclear. Use before implementation when official contracts, APIs, or industry practice may have changed.
---

# Establish Correct Approach

Name one current owner-aligned method and hand it to implementation.

## Method

1. State the exact change and the decision the method must resolve.
2. Search installed skills for an existing job-specific method.
3. Identify live authorities: the owning repository, current runtime behavior, official documentation, current CLI or SDK, public schema, and deployed contract when relevant.
4. Read the smallest current sources that can settle ownership and supported usage.
5. Compare the canonical owner path, continued current behavior, and materially different standard alternatives.
6. Prefer the method that uses the active semantic owner, supported public surface, one source of truth, and ordinary recovery path.
7. Understand the purpose and current consumers of existing structure before replacing it.
8. Stop research when additional sources can no longer change the chosen method.
9. Hand the selected method, authority links, constraints, and open external dependency to the matching implementation skill.

Read [owner-aligned method selection](references/owner-aligned-method.md) for
selection criteria and [method sources](references/method-sources.md) for
research techniques.

## Output

Return the selected method, current sources, considered alternatives,
decisive reasons, and the condition that would change the answer.
