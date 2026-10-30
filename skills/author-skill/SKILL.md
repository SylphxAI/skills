---
name: author-skill
description: "Use when creating, refactoring, or auditing a reusable Agent Skill (SKILL.md and its colocated references/*.md): write concrete moment-based trigger descriptions, package opinionated methodology (how to think, discuss, build, choose tech stacks, score risks, and write) rather than neutral option lists or organization state, and validate positive/negative trigger test cases. Use author-item to write a work outcome ticket."
---

# Author a Reusable, Opinionated Agent Skill (`author-skill`)

Apply the documentation and plain-language standards in [references/docs.md](references/docs.md) and [`../clear-writing/SKILL.md`](../clear-writing/SKILL.md).

A skill packages a chosen method for a recurring scenario: when to use it, why it fits, how to apply it and what result establishes success. State the evidence and conditions that would change the choice.

## 1. Methodology vs. Organization State (The Hard Boundary)

Before putting anything into a skill or `references/*.md` file, separate **Methodology** from **State**:

| Layer | What Belongs Here | Where It Lives |
| --- | --- | --- |
| **Methodology (Skill)** | Opinionated, reusable methods and standards: how to think (`self-challenge`), how to discuss (`swarm-fuse`), how to develop & ship (`deliver-and-verify`, `unblock`, `refactor`), which technology stack paradigm we use (`stack.md`), how to score risks (`risk.md`), and how to write (`clear-writing`). | `skills/<name>/SKILL.md` and `skills/<name>/references/*.md` |
| **Organization State** | Current facts about a specific company or workspace: company size, active project roster, live server inventory, specific rows in an accepted-risk register, or workspace credentials/leases. | The workspace's own repository (`AGENTS.md`, `company/`) or the platform's **Organization Knowledge**—never inside a skill, and skills do not need special loader instructions to tell an agent to read its own workspace context. |

## 2. Stage 1: Define the Scenario Trigger and Positive/Negative Cases

1. **Write concrete, moment-based triggers in `description`:**
   - Name the observable task moment instead of an abstract label.
   - Start with `"Use when..."` and name the **exact observable prompts and task moments** when an agent must load the skill (e.g., *"Use when designing or comparing a system architecture, choosing a tech stack, reviewing a commercial contract, or asking 'is there a simpler way?'"*).
   - End with explicit disambiguation pointing neighbouring scenarios to their owning skill (`"Use X for ..., use Y for ..."`).
2. **Include Concrete `❌ Bad vs ✅ Good` Contrast and Step 0 Reference Routing:**
   - Use a concrete `❌ Bad vs ✅ Good` pair when it explains a recurring mistake. Route each domain scenario to the reference it needs.
3. **Define positive and negative trigger test cases:**
   - Compare the description against held-out positive and negative prompts. Use the runtimes and models affected by the change when available, and record which checks actually ran.

## 3. Stage 2: Structure `SKILL.md` and Colocated `references/`

Follow the open [Agent Skills specification](https://agentskills.io/specification):
- **Frontmatter:** `name` matches the directory name (lowercase-hyphen), and `description` is nonempty and at most 1,024 characters.
- **Role-neutral examples:** Keep workspace identities, private domains, machine paths and incident records in the owning workspace. Preserve exact public API identifiers and attributed method sources.
- **Single Source of Truth (SSOT):** State a shared method once in its owning skill and link to it from sibling skills rather than pasting duplicate copies.
- **Colocated `references/`:** Place deep domain standards in `skills/<name>/references/*.md` and link each file from `SKILL.md` with a clear trigger explaining when to read it. The specification recommends keeping the main file under 500 lines; split details when that improves navigation and context use.

## 4. Stage 3: Verify Links, Format, and Trigger Discrimination

Verify the changed behavior ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)):
1. **Run `python3 scripts/verify-skills.py`:** Confirm every YAML frontmatter parses via `PyYAML`, every `[...](references/...)` and `[...](../<skill>/SKILL.md)` link and `#heading` anchor resolves, zero orphan reference files exist, and zero private identifiers leak.
2. **When the trigger changes, check discrimination:** Compare held-out positive cases and unrelated negative controls. Report the prompts, runtime and results; static examples alone establish only an editorial check.
