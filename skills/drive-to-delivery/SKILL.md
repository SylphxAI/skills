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
7. Execute only the claimed node. The default implementation terminal is a pull request submitted with the named local oracle; return there and release the lease even while the standing product outcome remains open.
8. Continue through landing, release, deployment, or live verification only when that layer is the explicit asked terminal of this claimed node and it can advance without waiting or crossing authority.
9. Close when the requested terminal is met. Record an external blocker only after safe in-scope alternatives are exhausted.

When writing or placing product documentation, open
[documentation-standard](references/source-authoring-standard/references/documentation-standard/METHOD.md).
Destination is `docs/vision.md`.

When this worker would wait on CI, open
[work coordination](../select-next-work/references/work-coordination/METHOD.md).

## Delivery shape

- Keep commits focused and valid.
- Keep each pull request independently revertible and complete for its accepted outcome.
- Rebase or merge current upstream changes before final validation when the repository requires it.
- Use the repository's native CI, release, and deployment surfaces without holding the implementer on those waits.
- Report progress in the primary result instead of creating a parallel tracking artifact.

## Output

Return the strongest truthful state, the user-visible or engineering result, the checks run at the changed layer, and any authority still required.
