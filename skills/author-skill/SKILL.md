---
name: author-skill
description: "Use when creating, refactoring, or auditing a reusable Agent Skill (SKILL.md and its colocated references/*.md), or distilling a daily detour, rework, patrol blind spot, or verified reusable playbook into an auto-triggered skill: write concrete moment-based trigger descriptions so skills fire automatically without manual reminders, package opinionated methodology (how to think, discuss, build, choose tech stacks, score risks, and write) rather than neutral option lists or organization state, and validate positive/negative trigger test cases. Use author-item to write a work outcome ticket."
---

# Author a Reusable, Opinionated Agent Skill (`author-skill`)

Apply the documentation and plain-language standards in [references/docs.md](references/docs.md) and [`../clear-writing/SKILL.md`](../clear-writing/SKILL.md).

A skill is **asynchronous Agent-to-Agent (`A2A`) communication across time**: a past specialist sharing hard-won domain reality with a future frontier SOTA model. Just as live A2A messages between peers must never issue imperative orders or pre-chew solutions that stop the other agent from thinking, a skill must **never over-constrain a SOTA model with rigid scripts, checklists, or micro-rules that hijack its first-principles reasoning**—nor leave it with **zero boundaries** where default model priors (such as RLHF people-pleasing or `HTTP 200 OK` completion illusions) cause preventable harm.

## 0. The Five Laws of Modern SOTA Skill Engineering (`現代 SOTA Skill 編寫五大鐵律`)

Before adding or editing any line in a skill, test it against all five laws ($\bigcap V_i$):

| Law | ❌ Over-Constrained (`過分約束 / 命令式預嚼` — Kills SOTA Thinking) | ❌ Under-Constrained (`完全無約束 / 空泛口號` — Zero Protection) | ✅ SOTA Skill Sweet Spot (`鎖邊界、給變量、傳現象、解放思考`) |
| --- | --- | --- | --- |
| **1. Boundary vs. Process (`鎖死硬邊界與目標，解放中間思考`)** | Scripting rigid step-by-step recipes, fixed paragraph templates, or mechanical quotas (*"use at most 1 emoji per 3 turns"*, *"always reply in 3 paragraphs"*). | Vague slogans (*"be warm to VIPs"*, *"write safe migrations"*) that leave hard limits unstated. | Lock **3 things only**: (a) **Objective & Counter-Metric** (what to maximize vs. what never to sacrifice), (b) **Mandatory Ground-Truth Inputs** (`Step 0` live data to read before deciding), and (c) **Hard Invariants** (non-negotiable red lines). Leave intermediate reasoning and expression 100% free to the SOTA model. |
| **2. A2A Phenomenon & Lens vs. Imperative Order (`傳遞盲點現象與決策視角，唔落死命令`)** | Issuing blind imperative commands (*"Always do X, then Y, then Z"*) without explaining the underlying trap or assumptions. | Leaving the model to rediscover known platform traps or RLHF blind spots by trial and error. | Frame guidance as **counter-intuitive phenomena, causal trade-off variables, and Socratic lenses**: explain *why* default model intuition fails here (e.g., why RLHF transparency leaks third-party privacy, or why `200 OK` hides broken media rendering) and *what invariant must hold*, so the model derives the right action for any new context. |
| **3. Pre-Training Delta Only (`預訓練差值原則`)** | Explaining textbook computer science, standard language syntax, or obvious common sense that SOTA models already know in their weights. | Omitting non-obvious domain economics, asymmetric company-interest rules, or platform-specific gotchas. | Write **only the Delta from SOTA pre-training**: counter-intuitive business truths, asymmetric payoff rules, systematic LLM blind spots, and verified failure modes where a SOTA model actually failed without the signal. |
| **4. Ban Anonymized Bug Postmortems (`嚴禁將單一 Bug 維修步驟剝名當通用 Skill`)** | Taking a 30-line bug fix from one service (e.g., archive vs. git bundle recovery or controller child cleanup), stripping the repo name, appending a synthetic transfer line (*"a queue worker uses this; a text formatter does not"*), and dumping all 30 lines into a shared skill. | Never extracting the underlying 1-sentence verification principle. | Keep subsystem-specific procedures in that repository's tests or `docs/runbooks/`. A shared skill accepts only **universal 1–3 sentence principles or decision equations** that genuinely govern diverse domains without needing a 30-line procedural walkthrough. |
| **5. Subtraction-First Evolution & Contrastive Examples (`減法進化與高反差例子`)** | Appending a new paragraph after every incident until `SKILL.md` or `references/*.md` balloons into a 500-line wall of text that dilutes attention. | Deleting hard-won invariants without preserving their mechanism. | **Distill & Prune (`越進化越精煉`)**: synthesize narrow rules into one deeper principle, replace long prose lectures with **one sharp `❌ Bad vs ✅ Good` contrast pair**, and state the **assumptions & falsification signal** so future agents know when to challenge and evolve the skill itself. |

## 1. Methodology vs. Organization State & Four-Layer Guidance Architecture

Before putting anything into a skill or `references/*.md` file, separate **Methodology** from **State** across the four guidance layers:

| Layer | Role | What Belongs Here |
| --- | --- | --- |
| **Layer 1: Public Routing Card (`description`)** | Peer discovery | Concise domain goal and boundary so peers route work with zero overlap. |
| **Layer 2: Private Execution Prompt (`instructions`)** | Standing role charter | Role measure, counter-metric guardrail, and standing domain duties—never temporary tasks or episodic incident logs. |
| **Layer 3: Universal Constitution (`AGENTS.md`)** | Workspace invariants | Universal rules and organization state loaded into every session. |
| **Layer 4: Auto-Triggered Methodology (`skills/<name>/`)** | Mistake-prevention & playbook engine | Opinionated, reusable methods (`challenge`, `swarm-fuse`, `deliver-and-verify`, `unblock`, `refactor`, `patrol`, `clear-writing`) loaded **automatically on demand** when the live moment matches the YAML `description`. |

### Auto-Triggered Skill Architecture & Daily Mistake-to-Skill Loop

A well-authored skill **never requires a human or peer reminder** (*"remember to read skill X"*). Because the agent runtime injects every skill's YAML `description` into `<skills>` at the start of every session, the model matches the live task moment directly against `"Use when <observable moment/symptom/action>..."` clauses:
- **Diagnose any unapplied rule as a skill or trigger defect:** If a skill failed to fire or a mistake recurred, never blame the worker for "forgetting"—either (a) the governing rule is missing from the entry skill's `SKILL.md` (or unlinked from its `Step 0` reference routing), or (b) the skill's YAML `description: "Use when..."` states an abstract label instead of the concrete observable entry moment or symptom the worker actually sees before acting.
- **Upgrade the existing entry skill in place (`90%` default):** Prefer refining the existing entry skill (`deliver-and-verify`, `challenge`, `patrol`, `unblock`, `customer-support`, `ambassador`, `game-economy`) in place over creating an isolated micro-skill that workers will not trigger at the start of a task.
- **Continuous daily distillation triggers (Done Gate):** Whenever daily work hits (1) a **Detour / Retry** (tried approach A, failed, found root cause B), (2) **Rework / Correction** (missed a premise, boundary, or constraint caught during review or operations), (3) a **Patrol Blind Spot**, or (4) a **Verified Reusable Playbook** (such as a zero-token file-watch trigger daemon for webhook-less external channels), distill the general rule into the owning skill in place and verify its YAML `description: "Use when..."` covers the entry moment before declaring the task complete.

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
- **Refine the authoritative rule in place (`原地提煉升級舊規則，嚴禁疊床架屋貼膠布`):**
  Rewrite the existing method when experience reveals a flaw; remove conflicting
  old text and link consumers to its one authoritative home (`SSOT`). Do not append an
  incident-specific exception beneath a contradictory rule, and never duplicate
  the same block across sibling skills.
- **Anti-over-engineering & anti-pendulum distillation (`反 Over-Engineering 與反矯枉過正`):**
  Proactive daily reflection (`自省與持續進化`) must leave skills and systems **simpler
  and sharper**, never more bureaucratic. Never add pre-send human/peer approval
  gates that block real-time execution, never invent multi-daemon wrappers when a
  single direct check suffices, and never swing to the opposite extreme (`矯枉過正`,
  such as turning warm customer companionship into cold legalistic refusals after
  a privacy mistake). Preserve the positive business goal while cutting only the
  failure mode ($\bigcap V_i$), and prune verbose or superseded clauses whenever
  adding a new insight.
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
   - Add or update the skill's colocated `trigger-cases.json` (version 1, `positive` and `negative` lists): at least three positive prompts and three negative controls, each quoting its applicable description clause. Negative controls name the routed skill, or `null` for an explicit no-skill/direct-work boundary.
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
