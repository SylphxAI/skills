---
name: drive-to-delivery
description: Drive one accepted engineering or product objective to its requested terminal. Use when work spans several dependent actions and completion matters more than a plan or partial checkpoint.
---

# Drive To Delivery

Keep one accepted objective moving until its requested result is true or an external blocker requires new authority.

## Method

1. Bind the objective, terminal condition, repository ownership, permissions, constraints, and current state.
2. Inspect the active product and delivery path before choosing work. Preserve unrelated user changes.
3. Build a simple dependency order around the highest-value safe actions that can advance now.
4. Execute each action at its owning layer. Integrate related changes into one coherent outcome.
5. Run the path changed and repair failures while the objective remains open.
6. Keep local, landed, released, deployed, and live states distinct in decisions and updates.
7. Continue through source landing, release, deployment, or live verification when those states are part of the request and the required authority is available.
8. When an external result gates the next action, record the exact resume
   predicate, authority, and evidence surface. Continue independent safe work;
   otherwise return and resume from the event instead of holding an active
   executor or polling unchanged state.
9. Close when the requested terminal is met. Record an external blocker only after safe in-scope alternatives are exhausted.

When writing or placing product documentation, open
[documentation-standard](references/source-authoring-standard/references/documentation-standard/METHOD.md).

Open only the matching depth:

- [Product program](references/product-program/METHOD.md) when one outcome spans independently owned artifacts or a shared interface
- [Select next work](references/select-next-work/METHOD.md) when the user asks the agent to choose from an existing backlog
- [Open product betterment](references/open-product-betterment/METHOD.md) when the job is to find and land the highest-value available improvement

## Delivery shape

- Keep commits focused and valid.
- Keep each pull request independently revertible and complete for its accepted outcome.
- Rebase or merge current upstream changes before final validation when the repository requires it.
- Use the repository's native CI, release, and deployment surfaces.
- Report progress in the primary result instead of creating a parallel tracking artifact.
- Treat a pending external result as a dependency state, not work for an
  executor to simulate. Resume only from a material event or an explicitly
  requested observation.

## Output

Return the strongest truthful state, the user-visible or engineering result, the checks run at the changed layer, and any authority still required.
