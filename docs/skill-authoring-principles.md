# Skill Authoring Principles

A good skill is not simply long or short. A good skill changes agent behavior on a recurring task with the least context needed.

## What public high-quality skills have in common

Observed patterns from strong public skill collections and optimization systems:

- **Trigger clarity**: the frontmatter description says exactly when the agent should load the skill.
- **Compact `SKILL.md`**: the main file contains the operating mode, workflow, routing, guardrails, and output format.
- **Deep references**: detailed rules, examples, decision tables, and edge cases live in `references/` and are loaded only when relevant.
- **Rule IDs**: reviewable rules have stable IDs so outputs can cite them.
- **Executable helpers**: fragile or repetitive work lives in `scripts/`.
- **Eval loop**: test prompts prove the skill improves output and does not over-trigger.

## Length rule

Do not ask "should this skill be detailed?" Ask "where should the detail live?"

- Put **routing and method** in `SKILL.md`.
- Put **domain depth** in references.
- Put **deterministic operations** in scripts.
- Put **quality expectations** in evals.

A 300-line `SKILL.md` can be worse than a 70-line `SKILL.md` with three excellent reference files.

## What detail means

High-quality detail is not more prose. It is:

- state machines;
- decision tables;
- edge cases;
- failure modes;
- event schemas;
- examples of bad and good outputs;
- explicit tradeoffs;
- safety and policy guardrails.

## SkillOpt lesson

Treat skills as trainable documents. Improve them through bounded edits and gates:

1. Run the skill on realistic tasks.
2. Compare against baseline or expected output.
3. Reflect on failures.
4. Add, delete, or replace a small number of rules.
5. Accept the edit only if validation improves.

This keeps skills from becoming bloated advice dumps. Every new rule should earn its place.

## Review rubric

A skill is ready to publish when:

1. Metadata triggers on the right user requests.
2. `SKILL.md` gives a clear workflow without flooding context.
3. References contain the hard domain details.
4. The skill gives different, better output than a base model.
5. It has at least one positive prompt, one negative prompt, and expected behavior.
6. It rejects unsafe, manipulative, or policy-risky shortcuts.
