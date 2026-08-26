---
name: author-skill
description: "Write or revise agent-facing instructions: an Agent Skill, CLAUDE.md, AGENTS.md, system prompt, subagent prompt, or reusable prompt. Use when creating a skill, writing a subagent, tightening a trigger, encoding a gotcha, rightsizing CLAUDE.md, or rewriting prompts that still use MUST/NEVER recipes a capable model no longer needs. Do not use for user-facing product copy, store listings, or status updates."
---

# Author Skill

Skills exist because model knowledge lags. Training still produces 2024-style MUST/NEVER recipes, numbered ordinary work, and subagent prompts that copy the parent system prompt. Current capable models need particular gotchas and judgement, not a second textbook. A longer body is not a better skill.

Prefer one heuristic that stays true: match surrounding code, naming, and idiom. Constrain only where a wrong call is expensive — money, deletion, credentials, safety, or a public contract.

A skill `description` is the trigger: what it does, when to use it, phrases a user would type, and nearby cases that should not fire. All "when" belongs there, not in the body.

The body encodes opinions or facts the model would otherwise miss. Do not write a numbered recipe of ordinary work, Complete-when checklists, or output noun piles. Do not add verification steps a capable model already runs. A subagent prompt is the same job at a narrower scope — gotchas for that job, not a dump of the parent system prompt. Prefer a script or a short template when the job is fragile or needs a format. Put long material in `references/` and say when to open each file. Say each fact once.

For a skill package: the folder name matches `name`; every local link resolves. A public skill carries reusable method only — not owner-only procedure, secrets, or private topology. Restore a deleted job only when the requestable artifact and a unique mechanism still exist.

Open [context engineering](references/context-engineering.md) when writing a system prompt, CLAUDE.md, AGENTS.md, or subagent prompt, or when deciding what belongs in a skill versus those layers.

Use `curate-skill-repository` for portfolio-wide overlap, recovery, or retirement.
