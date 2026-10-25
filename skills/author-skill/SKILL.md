---
name: author-skill
description: "Use when creating, refactoring, or auditing a reusable Agent Skill (SKILL.md and its colocated references/*.md): write concrete moment-based trigger descriptions, package opinionated methodology (how to think, discuss, build, choose tech stacks, score risks, and write) rather than neutral option lists or organization state, and validate positive/negative trigger test cases. Use author-item to write a work outcome ticket."
---

# Author a Reusable, Opinionated Agent Skill (`author-skill`)

Apply the documentation and plain-language standards in [references/docs.md](references/docs.md) and [`../clear-writing/SKILL.md`](../clear-writing/SKILL.md).

An Agent Skill packages **our chosen methodology** for a specific recurring scenario. In every domain—how we think and design, how we deliberate as a team, how we choose our technology stack, how we score risk, how we build and verify software, and how we write—there are competing schools of thought (School A, School B, School C). A skill is **not** a neutral textbook listing options; a skill states **which methodology we chose, why it wins from first principles, and how to execute it deterministically**.

## 1. Methodology vs. Organization State (The Hard Boundary)

Before putting anything into a skill or `references/*.md` file, separate **Methodology** from **State**:

| Layer | What Belongs Here | Where It Lives |
| --- | --- | --- |
| **Methodology (Skill)** | Opinionated, reusable methods and standards: how to think (`self-challenge`), how to discuss (`swarm-fuse`), how to develop & ship (`deliver-and-verify`, `unblock`, `refactor`), which technology stack paradigm we use (`stack.md`), how to score risks (`risk.md`), and how to write (`clear-writing`). | `skills/<name>/SKILL.md` and `skills/<name>/references/*.md` |
| **Organization State** | Current facts about a specific company or workspace: company size, active project roster, live server inventory, specific rows in an accepted-risk register, or workspace credentials/leases. | The workspace's own repository (`AGENTS.md`, `company/`) or the platform's **Organization Knowledge**—never inside a skill, and skills do not need special loader instructions to tell an agent to read its own workspace context. |

## 2. Stage 1: Define the Scenario Trigger and Positive/Negative Cases

1. **Write concrete, moment-based triggers in `description`:**
   - Models skip abstract meta-labels (*"Use before any non-trivial decision"*).
   - Start with `"Use when..."` and name the **exact observable prompts and task moments** when an agent must load the skill (e.g., *"Use when designing or comparing a system architecture, choosing a tech stack, reviewing a commercial contract, or asking 'is there a simpler way?'"*).
   - End with explicit disambiguation pointing neighbouring scenarios to their owning skill (`"Use X for ..., use Y for ..."`).
2. **Include Concrete `❌ Bad vs ✅ Good` Contrast and Step 0 Reference Routing:**
   - Weaker and faster worker models benefit most from concrete side-by-side `❌ Bad vs ✅ Good` examples and an explicit `Step 0` instruction naming which `references/*.md` file to read for each sub-scenario.
3. **Define positive and negative trigger test cases:**
   - Test across multiple harnesses and worker models (especially high-throughput worker models and strict tool-calling harnesses) using blind held-out prompts that were not read while drafting the description.

## 3. Stage 2: Structure `SKILL.md` and Colocated `references/`

Follow the open [Agent Skills specification](https://agentskills.io/specification):
- **Frontmatter:** `name` matches the directory name (lowercase-hyphen), and `description` is under 1,024 characters with no XML angle brackets (`<` or `>`).
- **Role-neutral & public-safe:** Never hardcode personal names, bot handles, private domains, internal machine paths (`/scratch/...`, `/home/...`), or private incident IDs.
- **Single Source of Truth (SSOT):** State a shared method once in its owning skill and link to it from sibling skills rather than pasting duplicate copies.
- **Colocated `references/`:** Place deep domain standards in `skills/<name>/references/*.md` and link each file from `SKILL.md` with a clear trigger explaining when to read it. Keep `SKILL.md` under 500 lines.

## 4. Stage 3: Verify Links, Format, and Trigger Discrimination

Before completing any skill change ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)):
1. **Run `python3 scripts/verify-skills.py`:** Confirm every YAML frontmatter parses via `PyYAML`, every `[...](references/...)` and `[...](../<skill>/SKILL.md)` link and `#heading` anchor resolves, zero orphan reference files exist, and zero private identifiers leak.
2. **Verify empirical trigger recall and precision:** Ensure the updated description improves or preserves hit rate on blind positive cases without firing on unrelated negative controls.
