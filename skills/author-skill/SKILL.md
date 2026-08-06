---
name: author-skill
description: "Create or revise an Agent Skill: one job, trigger description, concise procedure, optional scripts/references. Use when packaging a reusable specialized workflow."
---

# Author Skill

Build skills that match the open Agent Skills model: one specialized job, progressive disclosure, real task value.

## When to use

- Creating a new skill folder
- Rewriting a skill that is too broad, too vague, or unused
- Extracting a repeated correction loop into a reusable package

## Before you write

Only create a skill if all of these hold:

1. The job is **recurring**.
2. The agent **fails or drifts** without the skill (real gap).
3. There is **one primary outcome**.
4. The content is **specific** (commands, gotchas, formats) — not generic textbook advice.
5. Adding it keeps the catalog inside the host **listing budget**.

If any fail: put a short note in always-on AGENTS.md, leave a doc, or do nothing.

## Package layout

```text
skill-id/
  SKILL.md              # required
  agents/openai.yaml    # display metadata (this repo)
  references/           # optional depth (one level deep)
  scripts/              # optional deterministic helpers
  assets/               # optional templates
```

- `skill-id`: lowercase kebab
- Frontmatter: only `name` (matches folder) and `description`

## Description (routing key)

Write 1-3 sentences covering **what** and **when**.

Good: Extract text/tables, fill forms, merge PDFs. Use when working with PDF files or forms.

Bad: Helps with documents.

Rules:

- Agent-facing phrasing
- Concrete triggers and artifacts
- Stay well under 1024 characters; prefer shorter under catalog pressure
- No synonym dumps or foreign skill ids

## Body

Keep under about 500 lines. Prefer short procedure over essays.

Recommended skeleton: When to use, Workflow, Gotchas, Validation, Output.

Rules:

- Imperative steps
- Defaults, not menus
- Only what the model lacks
- Link references with when-to-open guidance
- Prefer scripts for fragile/deterministic steps; validate then continue

## agents/openai.yaml

```yaml
interface:
  display_name: "Human Title"
  short_description: "Same job as description, short"
  default_prompt: "Run this skill on the active workspace."
```

## Validate in this repo

1. Frontmatter name equals folder id
2. Local links resolve
3. `npm run build:catalog && npm test`
4. Smoke: would name+description load for the right ask and abstain for near-misses?

## Anti-patterns

- Mega-skills that mix unrelated jobs
- Generic policy essays
- Always-on material disguised as a skill
- Keyword pollution / neighbour skill dumps
- Creating a skill to route to other skills
- Keeping a skill for completeness with no agent gap

## Output

- Path to the package
- One-line job
- What was cut or refused
- Catalog/test result

## Related depth

- Folded curator/distill/eval material: [references/](references/) (`curate-skill-repository`, `distill-source-to-skill`, `design-skill-evals`)
- Org-wide methods library skill: `consult-sylphx-methods` → its `references/INDEX.md`

## Archived depth

If the thinner entry is insufficient, read [pre-v3-entry-method.md](references/pre-v3-entry-method.md).

