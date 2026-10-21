---
name: author-item
description: "Use when writing, filing, or revising a work outcome item or issue ticket before execution begins (Stage 1 ATDD): define the goal, observable positive and negative acceptance test cases, binding constraints, and non-binding references across product, engineering, commercial/partner, marketing/growth, or operational work without prescribing implementation steps, and rank work by Cost of Delay divided by Duration (CD3). Use when creating an item, shaping a feature/task brief into a ticket, or rewriting an over-constrained step-by-step ticket into a WHAT-only outcome. Use self-challenge when designing or comparing system architectures, tech stacks, or commercial terms; use deliver-and-verify to execute an authorized item; use author-skill to create or edit SKILL.md files."
---

# Author an Outcome Item (`author-item`)

Every unit of work—whether software engineering, product design, commercial/partner negotiation, marketing/growth campaign, or operational execution—is authored as a **WHAT-only outcome** using **Stage 1 Acceptance Test-Driven Development (ATDD)**. An item defines the destination and the observable acceptance tests that prove it works; the executing agent chooses the implementation path in its session.

## 1. Stage 1 ATDD: Write Acceptance Test Cases First

Before any plan or execution starts, author the item with four fields:

1. **Goal (`goal`)**:
   - One plain sentence stating who benefits and what changes in the real world (for users, customers, partners, or operators), plus the parent objective and economic value inputs (`cost of delay / duration`, see [references/priority.md](references/priority.md)).
   - If the request is a list of tasks or steps, extract the single outcome those steps were trying to achieve.
2. **Acceptance Test Cases (`acceptance`)**:
   - Write concrete, externally observable **positive test cases** (what must succeed on the real user/partner/operator surface) and **negative/invariant test cases** (what must be refused, prevented, or left unbroken).
   - Every acceptance criterion must be verifiable without reading the author's session transcript:
     - *Software / Product*: end-state database row, HTTP/UI response, latency/SLO bound, or `FAIL_TO_PASS` / `PASS_TO_PASS` behavior.
     - *Commercial / Partner*: signed/published terms, unit-economics floor, risk band, and partner-facing artifact state.
     - *Marketing / Growth*: live campaign asset, attribution/tracking event verified end-to-end, and CAC/ROAS guardrails.
     - *Operations / Support*: live runbook execution, operator API state read back before and after, and zero regression on active users.
   - Pass the **Three Universal Standard Tests** from [`../self-challenge/SKILL.md`](../self-challenge/SKILL.md):
     - **Category-Leader Benchmark**: When shaping a product feature, UX flow, commercial/growth mechanic, or platform capability, does the target acceptance match or beat the category leader? *(Skip for routine operational chores or internal bug fixes with no category benchmark.)*
     - **Zero-Unrequested-Mechanism Simplification**: Does the acceptance avoid demanding unrequested gates, queues, or internal scaffolding?
     - **One-Shot Direct Path**: Does it require the complete end state (including caller migration and old-path removal) rather than a half-step?
3. **Hard Constraints (`constraints`)**:
   - True non-negotiable boundaries only: law/compliance, data continuity for live users, budget/spend caps, security/secret boundaries, or external protocol/contract compatibility.
   - Never put file paths to edit, function names to write, or step-by-step instructions into `constraints`.
4. **Non-Binding References (`references`)**:
   - Prior commits, pull requests, incident logs, user/support signals ([references/quality-signals.md](references/quality-signals.md)), and **dated primary-source reads** whenever the outcome relies on an external specification, vendor release, or category-leader benchmark.
   - Any suggested approach or sketch from intake belongs here as a non-binding hint so the executing agent can replace it if live evidence shows a simpler path.

## 2. Granularity & Splitting Rules

- **One outcome = one coherent delivery**: Keep work that delivers one verified result together in one item.
- **Split only when**:
  1. Two outcomes verify independently and can run in parallel without colliding on the same files or live state, or
  2. A schema/foundation step must be live before the dependent cutover can safely run.
- Never split "implement X", "test X", "migrate callers of X", and "delete old X" into separate items—those are stages of one outcome.

## 3. Domain Reference Standards (Load When Needed)

- [references/work.md](references/work.md) — How outcome items are structured, ordered, leased, and verified
- [references/priority.md](references/priority.md) — Cost of delay divided by duration (CD3 / WSJF), interrupt thresholds, and SLA economics
- [references/quality-signals.md](references/quality-signals.md) — Turning production errors, user friction, and abandoned tasks into outcome items
