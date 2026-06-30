# Behavior Eval Rubric

Sylphx Skills should prove that a skill changes agent behavior, not merely that a folder is valid. A behavior example is a lightweight, human-readable eval artifact that shows the difference between generic output and skill-shaped output.

## Required eval layers

| Layer | Artifact | Gate |
| --- | --- | --- |
| Trigger schema | `evals/<skill>.eval.yaml` | `scripts/validate-evals.mjs` |
| Catalog visibility | README + `skills.sh.json` | `scripts/validate-catalog.mjs` |
| Reference depth | `skills/<skill>/references/*.md` | `scripts/validate-reference-quality.mjs` |
| Behavior example | `examples/behavior/<skill>.md` | `scripts/validate-behavior-examples.mjs` |

## Trigger quality rubric

A skill trigger is strong when:

1. **Specific** — it names concrete task contexts, not broad vibes.
2. **Bounded** — it does not trigger on unrelated work.
3. **Useful** — loading the skill changes workflow, output shape, or risk handling.
4. **Actionable** — it tells the agent what to inspect, produce, or guard against.
5. **Safe** — it does not steer dark patterns, unsafe automation, or copied content.

## Behavior example rubric

Each behavior example must include:

- the positive prompt that should trigger the skill;
- a weak baseline pattern to avoid;
- the skill-shaped output pattern expected when the skill is loaded;
- a negative trigger that should not load the skill;
- the expected behavior assertions from the eval file.

The example is not a benchmark score. It is a compact review target for maintainers and contributors.

## Forward-testing protocol

Use forward-testing for tricky or high-impact skills.

1. Start from the skill path and a realistic user prompt.
2. Do not leak expected answers beyond the skill itself and the task.
3. Compare the output against the behavior example and reference rules.
4. Edit the smallest rule or reference that fixes the failure.
5. Add or update the eval and behavior example if the failure reveals a reusable pattern.
6. Keep the change only when validation remains green and the skill is more precise.

## Anti-patterns

- Adding more prose when a decision table, state machine, or event schema would be clearer.
- Writing examples that praise the skill instead of showing changed behavior.
- Accepting a skill that triggers on generic words such as review, product, or improve without domain context.
- Allowing behavior examples to drift from eval prompts.
