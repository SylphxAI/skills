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

### General, reusable and future-proof skill evolution

Turn a live lesson into a reusable, future-proof skill
(`由具體事件提煉通用、可持續演進嘅 Future-Proof Skill`): identify the governing
behavioral, economic or architectural mechanism, its assumptions, and the
observable evidence that would change the method. Strip episodic proper nouns:
customer/player names, mascot/persona names, internal agent names and raw
database IDs. Keep the incident and product bindings, including persona names,
support addresses and channel IDs, in the company or product repository.

Use role names and explicit placeholders such as `<ambassador_name>` and
`<account_id>` in synthetic examples. Preserve attributed method authors,
standard names and exact public API identifiers. Test the extracted rule on a
different product and an unrelated negative case: if it still needs the original
person, product or incident to make sense, the mechanism has not been distilled.
Update the owning method as new evidence changes its assumptions; remove the
superseded rule and reconcile sibling skills in the same change.

- **Derive formulas and governing variables**
  (`寫推算公式與決策變量，唔寫死單一產品數字`). State the relevant population,
  units, objective and measured inputs; calibrate a threshold from cohort,
  economy or service data. An arbitrary percentage or currency threshold from
  one product never becomes a standing rule. Keep product values in product
  configuration; label numerical examples as synthetic. Preserve a number when
  an actual specification or binding obligation sets it, with that source.
- **State the causal reason and falsification signal**
  (`寫明背後因果理由與推翻條件`). Explain why the rule improves the objective,
  its assumptions and which measured signal changes the action. When evidence
  cannot establish the cause, label the mechanism a hypothesis.
- **Refine the authoritative rule in place**
  (`原地提煉升級舊規則，嚴禁疊床架屋貼膠布`). Rewrite the existing method when
  experience reveals a flaw; remove conflicting old text and link consumers to
  its one authoritative home. Do not append an incident-specific exception
  beneath a contradictory rule.
- **Run a cross-product transfer test** (`跨領域盲測驗證`). Remove names and
  apply the decision to a different product or domain, such as a business SaaS
  tool and a competitive card game. The same governing mechanism must select
  the appropriate action under each domain's inputs; a domain-specific method
  states the boundary rather than pretending to apply universally.

For example, replace “a named player received another named player's order
details” with “resolve the recipient from authoritative conversation context and
bind the outbound request to that recipient; a public account ID alone does not
prove ownership.” The mechanism survives changes of player, persona and product.

## 2. Stage 1: Define the Scenario Trigger and Positive/Negative Cases

1. **Write concrete, moment-based triggers in `description`:**
   - Name the observable task moment instead of an abstract label.
   - Start with `"Use when..."` and name the **exact observable prompts and task moments** when an agent must load the skill (e.g., *"Use when designing or comparing a system architecture, choosing a tech stack, reviewing a commercial contract, or asking 'is there a simpler way?'"*).
   - End with explicit disambiguation pointing neighbouring scenarios to their owning skill (`"Use X for ..., use Y for ..."`).
2. **Include Concrete `❌ Bad vs ✅ Good` Contrast and Step 0 Reference Routing:**
   - Use a concrete `❌ Bad vs ✅ Good` pair when it explains a recurring mistake. Route each domain scenario to the reference it needs.
3. **Define positive and negative trigger test cases:**
   - Add or update the skill's entries in `tests/skill-trigger-cases.json`: at least three positive prompts and three negative controls, each quoting its applicable description clause. Negative controls name the routed skill, or `null` for an explicit no-skill/direct-work boundary.
   - Compare the description against held-out positive and negative prompts. Use the runtimes and models affected by the change when available, and record which checks actually ran. Deterministic corpus checks establish coverage and text consistency, not model routing accuracy.

## 3. Stage 2: Structure `SKILL.md` and Colocated `references/`

Follow the open [Agent Skills specification](https://agentskills.io/specification):
- **Frontmatter:** `name` matches the directory name (lowercase-hyphen), and `description` is nonempty and at most 1,024 characters.
- **Role-neutral examples:** Keep workspace identities, private domains, machine paths and incident records in the owning workspace. Preserve exact public API identifiers and attributed method sources.
- **Single Source of Truth (SSOT):** State a shared method once in its owning skill and link to it from sibling skills rather than pasting duplicate copies.
- **Colocated `references/`:** Place deep domain standards in `skills/<name>/references/*.md` and link each file from `SKILL.md` with a clear trigger explaining when to read it. Keep the main file under 500 lines (the repository's enforced budget, following the specification's recommendation); split details into references.

## 4. Stage 3: Verify Links, Format, and Trigger Discrimination

Verify the changed behavior ([`../prove-it/SKILL.md`](../prove-it/SKILL.md)):
1. **Run `python3 scripts/verify-skills.py`:** Confirm every YAML frontmatter parses via `PyYAML`, every `[...](references/...)` and `[...](../<skill>/SKILL.md)` link and `#heading` anchor resolves, zero orphan reference files exist, and zero private identifiers leak.
2. **When the trigger changes, check discrimination:** Compare held-out positive cases and unrelated negative controls. Report the prompts, runtime and results; static examples alone establish only an editorial check.
