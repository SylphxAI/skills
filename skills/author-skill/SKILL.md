---
name: author-skill
description: "Create or revise one Agent Skill package. Use when writing a new skill, tightening a trigger, or encoding a gotcha the model misses. Do not use for repository-wide merge, split, or retirement work."
---

# Author Skill

Create one package for one recurring job. The folder name matches `name`. The description says what the skill does and when to use it, including phrases a user would type and nearby cases that should not trigger.

The body encodes particular opinions or gotchas a capable model would otherwise miss. Do not write a numbered recipe of ordinary work. Do not write Complete-when checklists or output noun piles. Do not route by naming sibling skills except one line when two names would otherwise collide.

Prefer a script or a short template when the job is fragile or needs a format. Put long material in `references/` and say when to open each file. Add `scripts/` only for repeatable deterministic work.

Do not constrain judgement except where a wrong call is expensive: money, deletion, credentials, safety, or a public contract.

Confirm the folder and frontmatter names match, and that every local link resolves. A public skill carries reusable method only — not owner-only procedure, secrets, or private topology.
