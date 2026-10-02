# Skill evals

`docs/vision.md` requires that a skill improves outcomes over the same model without it. A passing structural check does not show that, so this file records a graded comparison. It adds no manifest: tasks and rubrics live in `docs/evals/<skill>.md`, next to the vision.

## Method

1. Pick a skill. Write 5 small, self-contained tasks in `docs/evals/<skill>.md`, each with a 4-item pass or fail rubric written before any run.
2. Run each task twice with the same model (Claude Sonnet 5.5, text-only, no tools, "under 300 words"):
   - **with**: the full `skills/<skill>/SKILL.md` text in the prompt, with the line "Apply the skill above if it fits the task."
   - **bare**: the task only.
3. Grade each output item by item against the rubric, the same way for both arms. An item passes only if the output states it explicitly. A task passes at 3 of 4 items.
4. Record items passed (of 20 per skill and arm) and tasks passed (of 5).

Rerun by pasting the prompts from the eval files. No paid external model API was used.

## Results (2026-10-02, first run)

| Skill | Items with | Items bare | Tasks passed with | Tasks passed bare |
| --- | --- | --- | --- | --- |
| analyze-critically | 20/20 | 14/20 | 5/5 | 3/5 |
| handoff-work | 20/20 | 15/20 | 5/5 | 4/5 |
| build-product | 20/20 | 19/20 | 5/5 | 5/5 |
| Total | 60/60 | 48/60 | 15/15 | 12/15 |

Per-task items passed (with / bare):

| Task | analyze-critically | handoff-work | build-product |
| --- | --- | --- | --- |
| 1 | 4 / 2 | 4 / 3 | 4 / 4 |
| 2 | 4 / 3 | 4 / 3 | 4 / 4 |
| 3 | 4 / 2 | 4 / 3 | 4 / 3 |
| 4 | 4 / 4 | 4 / 2 | 4 / 4 |
| 5 | 4 / 3 | 4 / 4 | 4 / 4 |

## Where the skills helped

- **analyze-critically**: the clearest gain. The bare model gave good competing explanations and next checks, but only once (task 4) wrote rejection conditions before interpreting the evidence, and it never raised base rates or small samples on the Rust rewrite plan. The skill reliably added the up-front kill criteria.
- **handoff-work**: the bare model usually missed the confirmed-push proof (tasks 1, 2), the commit and push step itself (task 3), and hedged on pushing a non-compiling branch (task 4).

## Where the skills did not help

- **build-product**: no measurable benefit. The bare model already reused the named providers, kept state durable and planned a real-path check in 4 of 5 tasks. The only miss (task 3) was an event contract with no delivery semantics. A 19 versus 20 gap on 5 tasks is noise.
- **analyze-critically task 4**: the prompt ("what would change your mind?") already asks for the skill's core move; both arms scored 4/4.
- **handoff-work task 5**: the bare model scored 4/4.

## Caveats (read before citing these numbers)

- One run per cell, one model, one grader. Differences of one item are noise.
- The rubrics were written from each skill's own text, so with-skill answers are expected to hit them. This measures whether the skill transfers its stated method, not whether the method is the best one. The bare arm scoring 14 to 19 of 20 shows the rubrics are not trivially unreachable.
- The grader (the same agent that wrote the rubrics) could tell the arms apart, since with-skill answers cite the skill. Grading was by explicit rubric item, not by overall impression.
- Subagents inherit the host's project instructions, so the bare arm was not fully bare: several bare answers cite this organization's repository rules (no force push, merge queue). That contamination helped the bare arm and hides some of the skill effect; the handoff tasks may also have been influenced by the visible `git status` in that context.
- Only `SKILL.md` was supplied, not `references/`; no with-skill run could open a reference.
- Answers were capped at 300 words, which favors the dense skills and under-tests build-product's depth.
- 3 of 62 skills have evals. The other 59 have none.

## Adding an eval

Add `docs/evals/<skill>.md` with `## Task N` sections, each containing a `**Prompt:**` and a `**Rubric:**` with at least 3 numbered items. `tests/test_evals.py` checks this structure and that the skill exists.
