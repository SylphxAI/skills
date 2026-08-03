---
name: engineer-agent-context
description: "Design agent context/memory contracts: ranking, compaction, invalidation, provenance, freshness, privacy."
---

# Engineer Agent Context

Produce a **Context and Memory Contract** that makes useful information
available without letting stale, untrusted, or excessive context silently
control behavior. Read
[references/context-and-memory-methods.md](references/context-and-memory-methods.md)
for memory classes, retrieval controls, and research sources.

## Method

1. Inventory each information class and owner: current task state, source
   evidence, decisions, episodic history, semantic knowledge, procedures,
   user preferences, secrets, and derived summaries.
2. Define the context assembly order and authority rules. Preserve the
   distinction between source facts, retrieved memory, inference, and generated
   summary.
3. Assign memory class, scope, retention, provenance, freshness, sensitivity,
   invalidation trigger, and deletion path to every durable item.
4. Set a retrieval budget and rank by task relevance, authority, freshness,
   expected decision value, diversity, and token cost. Require abstention when
   retrieval confidence is inadequate.
5. Compile only the minimum sufficient working context. Deduplicate repeated
   instructions and keep conflicting evidence visible rather than blending it.
6. Treat summarization and compaction as lossy transformations. Retain source
   locators, material uncertainty, unresolved commitments, and a way to recover
   omitted detail.
7. Define handoff as a typed state transfer, not a transcript dump. Bind the
   recipient to objective, current state, decisions, evidence, gaps, authority,
   and next safe action.
8. Test stale memory, poisoned retrieval, conflicting sources, missing context,
   privacy deletion, compaction loss, cross-tenant leakage, and recovery after
   interruption.

## Output

Create a **Context and Memory Contract** with:

- information classes, sources, owners, and authority order;
- working, episodic, semantic, and procedural memory responsibilities;
- write, retrieve, rank, compile, summarize, invalidate, and delete rules;
- token, latency, storage, and retrieval budgets;
- provenance, freshness, confidence, and conflict representation;
- handoff schema and recovery path;
- privacy, tenant, credential, and least-disclosure boundaries;
- quality and safety metrics; and
- adversarial and degradation tests.

## Design rules

- Keep source-of-truth data outside the context window; context is a bounded
  projection with lineage, not the authority itself.
- Never make an agent-generated summary the only durable copy of a fact,
  decision, or commitment.
- Do not equate vector similarity with relevance, correctness, authority, or
  permission.
- Prefer explicit invalidation and freshness checks over indefinitely
  accumulating memory.
- Separate memory useful for personalization from memory necessary for task
  correctness, and give each an appropriate consent and deletion contract.
- Measure decision utility and error, not retrieval volume or context length.

## Boundaries

- Use `design-prompt-architecture` for instruction hierarchy, skill metadata, and
  runtime constitutions.
- Use `review-agent-planning-system` for goals, plans, actions, and replanning.
- Use `work-coordination-standard` for portable claim, lease, checkpoint, and
  handoff semantics; use the matching product adapter for live operations.
- Use a product privacy or security skill for jurisdictional and threat-model
  requirements beyond this context contract.
