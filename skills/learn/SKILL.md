---
name: learn
description: >-
  Use when reviewing completed work for lessons, receiving a user correction,
  finding a recurring detour or missed check, acting on a /hygiene finding,
  reviewing a cross-turn pattern flagged for promotion, or creating, refactoring,
  or auditing a reusable skill or its trigger cases.
  Use author-item to write a work ticket and deliver-and-verify to implement a fix.
  Do NOT use when closing routine work with no lesson or simply applying existing guidance.
---

# Route lessons to the right layer

State what happened, what should change next time, and the evidence for that change. Check the existing source first; update one authoritative home at the narrowest scope that can prevent recurrence. Do not persist one-off details, duplicate a rule, or promote speculation as fact.

| If the lesson changes… | Use… |
| --- | --- |
| A personal fact, preference, or working habit | Private `memory`; no approval needed. Automatic sleep consolidation (`dreaming.rs`, `pending_graduations`) can surface recurring patterns; a candidate is not approval to promote. |
| Shared factual, product, or runbook knowledge | Versioned `knowledge_docs`, retrieved through hybrid retrieval-augmented generation. Attach a `SimEvaluation` with before/after evidence from the same scenario and criterion, tied to the baseline revision and candidate digest. |
| A binding organization-wide norm | The organization constitution or shared rules (`org:instructions/agents`, `org:rulings/*`); request human or owner approval. |
| A reusable method across agent runtimes | The owning skill. Read [skill craft](references/skill-craft.md) to draft and validate it; request human or owner approval. Keep organization state out. |
| A role boundary, tool scope, or default | Role definitions or settings (`agent_definitions` / `AgentProfile`); request human or owner approval. |
| A bug, type or component boundary in one repository | File a `system_issue` with the owning repository and capture the invariant in a regression test or fail-closed continuous integration lint. Keep the repair walkthrough out of shared skills. |

Use the single Request workflow (`/requests`) for every promotion that needs human or owner approval. Include the destination, proposed change, evidence, and expected outcome. Leave shared state unchanged until approved; do not create a parallel proposal process or use another layer to bypass approval.
