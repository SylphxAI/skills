---
name: design-skill-evals
description: Design a focused evaluation for an Agent Skill's routing or task performance. Use when a team explicitly wants to compare skill-assisted results, reproduce a regression, or test a material skill change.
---

# Design Skill Evals

Create the smallest useful evaluation for a specific claim about one skill.

## Method

1. State the claim: the skill, target users, recurring job, expected improvement, and material harm to detect.
2. Choose a few realistic prompts from the target job, including a typical case and the closest important edge or neighbour.
3. Keep prompt text and task inputs identical across compared runs.
4. Compare skill-assisted output with an appropriate baseline when the claim concerns added value. Use repeated skill runs when the claim concerns consistency.
5. Judge the requested artifact or observable decision with direct product criteria. Prefer deterministic checks for properties that code can inspect reliably.
6. Include one meaningful safety, permission, data-loss, or wrong-route condition when it is relevant to the job.
7. Run the evaluation on the native host and environment represented by the claim.
8. Record results, important failures, and the exact skill revision in the task or experiment report already used by the team.
9. Revise the skill or narrow the claim when results reveal a real gap.

## Evaluation design

- Use natural user language and realistic inputs.
- Keep oracles independent from the wording and layout of `SKILL.md`.
- Measure only properties that can change the product or user decision.
- Match evaluation cost to the importance and uncertainty of the claim.
- Treat the result as information for the named claim and revision.

## Output

Return the claim, prompts and inputs, run conditions, artifact-level checks, relevant harm condition, comparison result, and resulting skill change or conclusion. Ordinary skill maintenance remains complete through standard package validation and the changed task path.
