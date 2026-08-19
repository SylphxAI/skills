---
name: drive-to-delivery
description: "Drive one accepted engineering or product objective to its requested terminal. Use when work spans several dependent actions and completion matters more than a plan or partial checkpoint."
---

# Drive To Delivery

Keep one accepted objective moving until its requested result is true or an
external blocker requires new authority.

## Method

1. Bind the objective, terminal condition, repository ownership, permissions,
   constraints, and current state.
2. Inspect the active product and delivery path before choosing work. Preserve
   unrelated user changes.
3. Build a simple dependency order around the highest-value safe actions that
   can advance now. If several independently owned artifacts must arrive
   together, name each owner, handoff, and compatibility condition in that
   order. Do not become the semantic owner of those artifacts.
4. Execute each action at its owning layer. Integrate related changes into one
   coherent outcome.
5. Run the path changed and repair failures while the objective remains open.
6. Keep local, landed, released, deployed, and live states distinct.
7. Continue through landing, release, deployment, or live verification when
   those states are part of the request and authority is available.
8. When an external result gates the next action, record the resume predicate
   and evidence surface. Continue independent safe work; do not poll unchanged
   state.
9. Close when the requested terminal is met. Record an external blocker only
   after safe in-scope alternatives are exhausted.

When writing or placing product documentation, open
[documentation-standard](references/source-authoring-standard/references/documentation-standard/METHOD.md).

If the user asks what to do next from an existing backlog, select the strongest
unblocked independently useful outcome and claim it in the team's existing
tracker. Do not invent a second coordination ledger.

## Delivery shape

- Keep commits focused and valid.
- Keep each pull request independently revertible and complete for its outcome.
- Use the repository's native CI, release, and deployment surfaces.
- Report progress in the primary result, not a parallel tracking artifact.

## Output

Return the strongest truthful state, the user-visible or engineering result,
the checks run, and any authority still required.
