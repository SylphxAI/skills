---
name: author-skill
description: Create or revise an Agent Skill package for one recurring job. Use when a skill needs a clearer trigger, a tighter method, or reusable references, scripts, or assets.
---

# Author Skill

Create a small, self-contained package that follows the [Agent Skills specification](https://agentskills.io/specification) and helps an agent complete one recognizable job.

## Method

1. Start from concrete requests that should activate the skill and the outcome users expect.
2. Choose one short, verb-led, lowercase hyphenated name. Match the folder name exactly.
3. Write a description that says what the skill does and when it applies. Include nearby contexts only when they improve selection.
4. Write the action, the home, and the done look ([owner `standards/docs.md`](https://github.com/SylphxAI/owner/blob/main/standards/docs.md) **Write the path**). Neighbour exclusions are one line; do not add a listing whose job is a kill list. Keep the body focused on specialized knowledge the agent needs after selection.
5. Add `references/` for detailed knowledge, `scripts/` for repeatable deterministic work, and `assets/` for files used in outputs. Include each resource only when it directly supports the job.
6. Link every optional resource from `SKILL.md` with a clear reason to open or run it.
7. Exercise the skill on a representative request and refine any instruction that causes ambiguity or unnecessary work.

## Package shape

```text
skill-name/
  SKILL.md
  references/   # optional
  scripts/      # optional
  assets/       # optional
```

Use YAML frontmatter containing only `name` and `description`. Keep detailed procedures in the body so hosts can load them after discovery.

## Portfolio fit

- Keep a separate skill when users request the job independently and accept its result independently.
- Place a subordinate technique in the applying skill's references.
- Merge skills that share the same job, outcome, and acceptance boundary.
- Preserve unique procedures and domain knowledge when reorganizing packages.

## Validation

- Confirm the folder name and frontmatter name match.
- Resolve every local link and run each included script on a representative input.
- Read the description beside its closest neighbours and confirm the intended request selects the intended skill.
- Return the package path, its one-line job, and the representative result.
