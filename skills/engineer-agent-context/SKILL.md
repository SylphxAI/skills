---
name: engineer-agent-context
description: Design an agent's working context, durable memory, retrieval, compaction, and handoff behavior. Use when context quality, freshness, privacy, or token cost affects task correctness.
---

# Engineer Agent Context

Provide the minimum sufficient authorized context for the current decision while keeping durable facts at their owning sources.

## Method

1. Inventory task state, source facts, decisions, episodic history, semantic knowledge, procedures, user preferences, credentials, and derived summaries.
2. Name the source and owner of each information class and distinguish retrieved fact, inference, and generated summary.
3. Assign scope, retention, freshness, sensitivity, invalidation, and deletion behavior to durable memory.
4. Rank retrieval by task relevance, authority, freshness, decision value, diversity, permission, and token cost.
5. Assemble a small working context in authority order and preserve visible conflicts for resolution.
6. Treat summaries and compaction as lossy projections with source locators, uncertainty, commitments, and a recovery path to omitted detail.
7. Create handoffs around objective, current state, decisions, source locators, gaps, authority, changed files, checks, and next safe action.
8. Exercise stale memory, conflicting sources, poisoned retrieval, missing context, privacy deletion, tenant separation, compaction loss, and interruption recovery.

Read [Context and memory methods](references/context-and-memory-methods.md) for retrieval architecture, memory classes, privacy, and quality checks.

## Output

Use the host or product's existing context and memory mechanisms. Return the information classes, authority order, retrieval policy, freshness and deletion rules, privacy boundaries, compaction strategy, handoff shape, and checks performed.
