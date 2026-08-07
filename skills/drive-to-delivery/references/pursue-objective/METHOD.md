# pursue-product-objective (reference under `drive-to-delivery`)

> Not a listing skill. Open from `drive-to-delivery` when this depth applies.

# Pursue Product Objective

When a **declared product objective** exists, keep advancing the product until
that objective has **current evidence**. The terminal is the objective—not a
cycle report, not a single PR, not “feels improved.”

## When to use

- A durable product outcome is already declared (user or host)
- Work may span many implementation batches and PRs
- Stopping for a progress essay while the objective is unmet is wrong

## Host continuity (portable)

Some hosts keep a persistent objective/goal/mission.

- Use only that host’s APIs and names—**no hard-coded tool ids**.
- If replace is forbidden: work under the active objective; do not invent rewrites.
- If an objective can be set when empty: set the **declared product objective**
  (outcome + done evidence), not “finish this batch.”
- If no continuity surface exists: keep the objective in working notes and continue.
- Follow host budgets only when the user or host set them; do not invent caps.

## Backbone

```text
while objective evidence is incomplete:
  1. Restate objective + done evidence (do not shrink to “what fits one PR”)
  2. Discover what still blocks the objective (enough to decide, not omniscient)
  3. Admit every high-leverage unblocked change that advances the objective
  4. Implement that batch in the worktree (L1)
  5. Record atomic commits (L2); open revert-safe PR outcome(s) (L3)
  6. Verify with original oracles on the subjects you changed
  7. Continue—batch clear ≠ objective complete
```

Compose `../drive-to-delivery/references/source-authoring-standard/` (and delivery/engineering policy as needed)
for Git/PR rules. Summary of the three layers:

| Layer | Meaning here |
| --- | --- |
| **L1** | One discovery pass → implement **all** high-EV unblocked work you can toward the objective |
| **L2** | **Atomic commits**: one logical step each, tree valid at each preserved commit |
| **L3** | **PR = one complete, independently revertible outcome**; squash lands that unit on main |

- Prefer high leverage over easy polish; hard work gets an L0 shippable slice in
  the batch, not a soft skip.
- Park only with real external/authority/dependency/safety blocks and evidence.
- One session may produce **several** PRs when outcomes revert independently.
- One PR may contain **many** atomic commits for one outcome.
- Local green, commit count, and open PRs are checkpoints—not objective done.

## Research depth

When framing the next batch, know enough about:

- outcomes the objective requires
- primary journeys/surfaces in scope
- quality/competitive anchor or unknown+why
- hard floors that must not regress
- highest pains/bets still blocking the objective

Stop research when more reading will not change what you implement next.

## Objective terminal

Stop only when all hold:

1. Every requirement in the declared objective has **current** evidence.
2. In-scope journeys/floors are green or honestly N/A with reason.
3. No unblocked residual still required by the objective remains.
4. Claims match evidence class (local vs landed vs live as the objective needs).

Qualified hard wait only for true repeated impasse on real blockers (host rules).

## Output

- Objective text (same meaning)
- What batch shipped (commits/PRs as pointers, not scores)
- Met | blocked (qualified) | still open for the objective
