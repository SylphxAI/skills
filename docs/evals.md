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
| build-product (tasks 1-5) | 20/20 | 19/20 | 5/5 | 5/5 |

Per-task items passed (with / bare):

| Task | analyze-critically | handoff-work | build-product |
| --- | --- | --- | --- |
| 1 | 4 / 2 | 4 / 3 | 4 / 4 |
| 2 | 4 / 3 | 4 / 3 | 4 / 4 |
| 3 | 4 / 2 | 4 / 3 | 4 / 3 |
| 4 | 4 / 4 | 4 / 2 | 4 / 4 |
| 5 | 4 / 3 | 4 / 4 | 4 / 4 |

## Results (2026-10-03, round 2)

Same method and grader. Skills picked for what a user reaches for most often (scope a request, decide a release, retire an old path); the README names no other skill than analyze-critically.

| Skill | Items with | Items bare | Tasks passed with | Tasks passed bare |
| --- | --- | --- | --- | --- |
| bound-request-scope | 19/20 | 13/20 | 5/5 | 2/5 |
| launch-readiness | 20/20 | 16/20 | 5/5 | 4/5 |
| execute-hard-cutover | 19/20 | 10/20 | 5/5 | 2/5 |
| build-product (tasks 6-10, event contracts) | 19/20 | 16/20 | 5/5 | 5/5 |

Per-task items passed (with / bare):

| Task | bound-request-scope | launch-readiness | execute-hard-cutover | build-product 6-10 |
| --- | --- | --- | --- | --- |
| 1 (6 for build-product) | 3 / 2 | 4 / 3 | 3 / 1 | 4 / 3 |
| 2 (7) | 4 / 2 | 4 / 3 | 4 / 3 | 4 / 3 |
| 3 (8) | 4 / 3 | 4 / 4 | 4 / 1 | 4 / 3 |
| 4 (9) | 4 / 4 | 4 / 4 | 4 / 1 | 4 / 3 |
| 5 (10) | 4 / 2 | 4 / 2 | 4 / 4 | 3 / 4 |

build-product tasks 6-10 had a third arm, the shipped `SKILL.md` alone without its `references/event-contracts.md`: 15/20 items, 3 of 5 tasks passed (per task 4, 2, 2, 3, 4 in order). The "with" column above is `SKILL.md` plus that reference.

## Results (2026-10-03, build-product rewrite)

The round 2 finding was that `SKILL.md` alone added nothing and the value sat in `references/event-contracts.md`. `SKILL.md` (0.8.3) now names the triggers (events, webhooks, queues, entitlements, billing state, sync between systems), says to read the reference before designing, and puts the three most-missed rules inline: classify the event kind first, name the crash, duplicate and reorder fixtures, define replay for poison messages. Tasks 6-10 were rerun with the new `SKILL.md` only (reference not pasted; the prompt said it was unavailable) and bare, same prompts, rubric, 300-word cap and grading.

| Arm | Items | Tasks passed | Per task 6, 7, 8, 9, 10 |
| --- | --- | --- | --- |
| `SKILL.md` + reference (round 2) | 19/20 | 5/5 | 4, 4, 4, 4, 3 |
| `SKILL.md` only, before | 15/20 | 3/5 | 4, 2, 2, 3, 4 |
| `SKILL.md` only, after | 17/20 | 5/5 | 3, 4, 3, 4, 3 |
| Bare (this run) | 14/20 | 3/5 | 3, 2, 2, 3, 4 |

Misses of the new skill-only arm: task 6 (no compatibility rule for the schema), task 8 (did not say CloudEvents leaves payload, ordering and idempotency to the product schema), task 10 (no authorization of the download link). Every answer classified the event kinds, named the three fixtures and described quarantine with replay and resync. Bare missed the fixtures (task 6), the kind classification and distinct owners (tasks 7, 8), and replay (task 9). All skill-only answers said they could not open the reference and flagged their answer as unchecked against it, so the inline rules carried the gain.

Caveats: one run per cell; the bare arm scored 14 here against 16 in round 2 with the same prompts, so run-to-run noise is about two items and the 17 vs 19 gap to the reference arm is inside it. The inline rules mirror rubric items 6.4, 8.4 and 9.4 by design, so part of the gain is teaching to the rubric.

## Where the skills helped

- **analyze-critically**: the clearest gain. The bare model gave good competing explanations and next checks, but only once (task 4) wrote rejection conditions before interpreting the evidence, and it never raised base rates or small samples on the Rust rewrite plan. The skill reliably added the up-front kill criteria.
- **handoff-work**: the bare model usually missed the confirmed-push proof (tasks 1, 2), the commit and push step itself (task 3), and hedged on pushing a non-compiling branch (task 4).
- **execute-hard-cutover**: the largest gain (19 vs 10). The bare model accepted a bounded shim, a gradual dual-issue period or a dated cleanup (tasks 1, 3, 4); the skill's rule (switch once, retire in the same delivery, one writer) changed the plan each time. Where the prompt itself is hostile to a shim (config, instruction files) the bare model already did it.
- **bound-request-scope**: bare answers gave sensible splits but rarely stated a one-sentence objective or a named terminal layer, and left the cut lines implicit on the vague "make onboarding better" request.
- **launch-readiness**: modest gain (20 vs 16). The bare model already asked for the exact SHA and refused to confirm; it missed an explicit go/no-go/hold word on task 1 and mis-scoped task 5 as "plan and schedule" instead of a decision on one candidate.
- **build-product, event contracts (tasks 6-10)**: a small gain only with the reference (19 vs 16). The items the bare model never hit were all reference content: classifying the fact before choosing a transport (task 8), naming event kinds (task 7), named fixtures for crash, duplicate and reorder (task 6), and replay for poison messages (task 9).

## Where the skills did not help

- **build-product, `SKILL.md` alone (before the rewrite)**: no gain. The tasks 1-5 result (20 vs 19) and the skill-only arm on tasks 6-10 (15 vs 16 bare) showed that the four-line body added nothing the bare model lacks, and one answer said it had not opened the reference. The rewrite above addresses this: skill-only now scores 17/20 against 14/20 bare.
- **bound-request-scope task 4, launch-readiness tasks 3 and 4**: the prompts already name the trap (a typo with scope creep, a canary, a live outage); both arms scored full.
- **hard-cutover task 5** (merge two instruction files) and **handoff-work task 5**: bare scored 4/4.
- **build-product task 10**: bare 4/4 against 3/4 with the reference; the with-skill answer did not address authorization of the download link.

## Caveats (read before citing these numbers)

- One run per cell, one model, one grader. Differences of one item are noise.
- The rubrics were written from each skill's own text, so with-skill answers are expected to hit them. This measures whether the skill transfers its stated method, not whether the method is the best one. The bare arm scoring 10 to 19 of 20 shows the rubrics are not trivially unreachable.
- The grader (the same agent that wrote the rubrics) could tell the arms apart, since with-skill answers cite the skill. Grading was by explicit rubric item, not by overall impression. Some items were judged leniently on the bare side (for example naming rollback and the coordinator as incident routing); a strict grader would lower the bare scores, not raise them.
- Subagents inherit the host's project instructions, so the bare arm was not fully bare: many bare answers cite this organization's repository rules (one outcome per deploy, merge queue, "a second mechanism is a second fact to keep true", pre-launch rules). That contamination helped the bare arm and hides some of the skill effect, most visibly on bound-request-scope and execute-hard-cutover. The handoff tasks may also have been influenced by the visible `git status` in that context.
- The with-skill arm for build-product tasks 6-10 was given `references/event-contracts.md` as well as `SKILL.md`; the other skills got `SKILL.md` only, so their references (database cutover, launch-readiness patterns, release health watch) were not tested.
- Task 6-10 prompts were written after reading the reference, to probe it; they are harder than tasks 1-5 by design.
- Answers were capped at 300 words, which favors the dense skills and under-tests build-product's depth.
- 6 of 62 skills have evals. The other 56 have none.

## Adding an eval

Add `docs/evals/<skill>.md` with `## Task N` sections, each containing a `**Prompt:**` and a `**Rubric:**` with at least 3 numbered items. `tests/test_evals.py` checks this structure and that the skill exists.
