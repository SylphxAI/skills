---
name: author-skill
description: "Create or revise a reusable Agent Skill (SKILL.md and its colocated references/): write concrete moment-based trigger descriptions, positive and negative trigger test cases, role-neutral workflows, and durable reference standards. Use when adding, refactoring, or auditing skills and their reference documentation. Use author-item to write a work outcome item."
---

# Author a reusable, scenario-driven Agent Skill

Apply the documentation and plain-language standards in [references/docs.md](references/docs.md).

An Agent Skill packages reusable judgement and domain reference standards for a **specific recurring scenario**. It is **role-neutral** and **platform-portable**: any agent (whether an orchestrating owner or an execution worker, in any harness or platform) can discover it from its `description` and apply it the moment that scenario arises. Always-on organizational identity or session-specific operating rules belong in `AGENTS.md`, never in a skill.

## Stage 1: Define the scenario boundary and trigger test cases

Before writing or editing a skill:
1. **Verify a skill is the right layer:**
   - *Always-on rule needed on every turn?* Put it in `AGENTS.md`, not a skill.
   - *Domain reference standard (architecture, auth, commercial, growth, risk)?* Place it in `references/<topic>.md` inside the skill that executes or evaluates that domain—never in a disconnected top-level `standards/` directory.
   - *Recurring scenario with a distinct method?* Create or update `skills/<name>/SKILL.md`.
2. **Write concrete moment-based triggers in `description`:**
   - Models skip abstract descriptions like *"Use before any non-trivial decision"*.
   - State the **exact observable moments** when the agent must load the skill (e.g., *"when writing acceptance criteria (Stage 1), before committing to a plan/design/agreement (Stage 2), before reporting work as done (Stage 3), or when a task has waited 30+ minutes"*).
   - Name neighbouring skills for likely false-positive matches so the selector separates them cleanly.
3. **Define positive and negative trigger test cases:**
   - List 3–5 concrete user/task prompts across domains (commercial, operations, growth, product, engineering) that **must** select this skill, and 2–3 prompts that **must** select a neighbouring skill or no skill.

## Stage 2: Structure the skill and its colocated `references/`

Follow the open [Agent Skills specification](https://agentskills.io/specification):
- **Frontmatter:** `name` matches the directory name (lowercase-hyphen), and `description` is under 1,024 characters.
- **Role-neutral & public-safe:** Never hardcode one permanent seat (e.g., write *"the facilitator"* or *"the outcome's single writer"*, not a specific person or bot), and never include private credentials, internal machine paths (`/scratch/...`, `/home/...`), or private incident IDs in a public skill catalog.
- **Single source of truth:** State a shared method (such as the Three-Stage ATDD loop) once in its owning skill and link to it from sibling skills rather than pasting duplicate copies that drift.
- **Colocated `references/`:** Place detailed domain standards in `skills/<name>/references/*.md` and link each file from `SKILL.md` with a one-line trigger explaining when to read it. Keep `SKILL.md` under 500 lines so the agent loads only the core method first and reads specific `references/*.md` files on demand.

## Stage 3: Verify links, format, and trigger discrimination

Before completing the skill change ([prove-it](../prove-it/SKILL.md)):
1. **Validate every relative link:** Confirm every `[...](references/...)` and `[...](../<skill>/SKILL.md)` link resolves to an existing file and heading anchor.
2. **Test the trigger descriptions against the Stage 1 positive/negative cases:** Ensure no vague escape hatch (such as *"not for mechanical execution"*) allows a model to bypass a required verification checkpoint.
3. **Verify harness discovery:** Confirm the skill loads cleanly through the repository's plugin manifests (`.claude-plugin/`, `.codex-plugin/`) and direct `skills/` directory mounts.
