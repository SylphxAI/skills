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
7. Classify the work. A causal-chain worker does not return at a pull request if the chain can still move. An independent-slice worker keeps going on a free write set. Publish or update a pull request for visibility. Return only if you would sit.
8. Continue through landing, release, deployment, or live verification when the requested terminal is that layer and this worker can still advance it.
9. Close when the requested terminal is met. Record an external blocker only after safe in-scope alternatives are exhausted.

When writing or placing product documentation, open
[documentation-standard](references/source-authoring-standard/references/documentation-standard/METHOD.md).
Destination is `docs/vision.md`. `NORTH-STAR.md` is an accepted destination
alias only. Company law: `SylphxAI/owner` `standards/docs.md` and
`decisions/ADR-008-DOC-LOCK.md`.

When this worker would wait on CI or own the outcome end-to-end, open
[work coordination](../select-next-work/references/work-coordination/METHOD.md).
Labor law: `SylphxAI/owner` `decisions/ADR-009-IMPLEMENT-TO-PR.md`
revision `2026-08-17.2`.

## Delivery shape

- Keep commits focused and valid.
- Keep each pull request independently revertible and complete for its accepted outcome.
- Rebase or merge current upstream changes before final validation when the repository requires it.
- Use the repository's native CI, release, and deployment surfaces without holding the implementer on those waits.
- Report progress in the primary result instead of creating a parallel tracking artifact.

## Output

Return the strongest truthful state, the user-visible or engineering result, the checks run at the changed layer, and any authority still required.
