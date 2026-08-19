---
name: author-skill
description: "Write or revise agent-facing instructions: an Agent Skill, CLAUDE.md, AGENTS.md, system prompt, or reusable prompt. Use when creating a skill, tightening a trigger, encoding a gotcha, rightsizing CLAUDE.md, or rewriting prompts that overconstrain a capable model. Do not use for user-facing product copy, store listings, or status updates."
---

# Author Skill

Capable models are overconstrained by absolute rules that are not always true, numbered recipes of ordinary work, and the same instruction repeated across system prompt, CLAUDE.md, and skills. Prefer one judgement heuristic that stays true: match surrounding code, naming, and idiom. Constrain only where a wrong call is expensive — money, deletion, credentials, safety, or a public contract.

A skill `description` is the trigger: what it does, when to use it, phrases a user would type, and nearby cases that should not fire. All "when" belongs there, not in the body.

The body encodes particular opinions or gotchas the model would otherwise miss. Do not write a numbered recipe of ordinary work, Complete-when checklists, or output noun piles. Do not add verification steps a capable model already runs. Prefer a script or a short template when the job is fragile or needs a format. Put long material in `references/` and say when to open each file. Say each fact once.

For a skill package: the folder name matches `name`; every local link resolves. A public skill carries reusable method only — not owner-only procedure, secrets, or private topology.

Open [context engineering](references/context-engineering.md) when writing a system prompt, CLAUDE.md, or AGENTS.md, or when deciding what belongs in a skill versus those layers.
