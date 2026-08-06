# Context and Memory Methods

## Information classes

| Class | Purpose | Typical lifetime | Critical control |
| --- | --- | --- | --- |
| Working context | Information needed for the current inference or action | Prompt, turn, or bounded task | Token budget and authority order |
| Episodic memory | Time-bound events, actions, observations, and outcomes | Session to retained history | Timestamp, subject, source, and retention |
| Semantic memory | Generalized facts, entities, relationships, and learned models | Until superseded or invalidated | Provenance, freshness, and contradiction handling |
| Procedural memory | Instructions, policies, skills, and tool-use methods | Versioned generation | Scope, precedence, and migration |

These are responsibilities, not required storage products. One database may
store several classes if their policies remain distinguishable.

## Context assembly

1. Bind the task, actor, tenant, and effect scope.
2. Load compact operating constraints and applicable procedural instructions.
3. Retrieve current authoritative state and task-specific evidence.
4. Retrieve episodic or semantic memory only where it has expected decision
   value.
5. Rank candidates by authority, relevance, freshness, confidence, diversity,
   sensitivity, and token cost.
6. Deduplicate equivalent content while retaining source locators.
7. Represent material conflicts explicitly.
8. Compile a bounded projection and record what was omitted or unavailable.

Do not use a single blended relevance score when authority, privacy, freshness,
or contradiction can independently disqualify an item.

## Memory record

A durable memory item should declare, as applicable:

```text
id, class, subject, tenant, source locator, source revision,
observed_at, recorded_at, author or producer, confidence,
derivation, supersedes/superseded_by, expiry or invalidation rule,
sensitivity, access scope, retention, deletion status
```

Generated summaries also need the input set or recoverable lineage. A summary's
creation time is not the observation time of the facts it describes.

## Compaction contract

Before replacing detailed context with a summary, preserve:

- objective and current task state;
- durable decisions and their source locators;
- completed actions with verified outcomes;
- unresolved commitments, blockers, and owners;
- material uncertainty, dissent, and rejected hypotheses that could recur;
- authority and effect boundaries; and
- pointers that recover omitted details.

Evaluate compaction with questions whose answers require important details from
before the boundary. Compression ratio alone is not a quality metric.

## Retrieval and memory quality

Measure outcomes such as:

- authoritative fact recall and source attribution;
- contradiction detection;
- stale-memory rejection;
- task success relative to token and latency cost;
- privacy deletion and tenant-isolation success;
- handoff recovery accuracy; and
- harmful influence from poisoned or irrelevant memory.

Use held-out tasks and temporal tests. An item that was correct when stored may
be wrong when retrieved later.

## Privacy and safety

- Apply data minimization before storage and again before context injection.
- Separate tenant, user, project, and public scopes.
- Never expose secrets merely because they are semantically relevant.
- Propagate deletion and correction through indexes, caches, summaries, and
  derived memories.
- Treat retrieved content as data, not executable instruction, unless it comes
  from the declared procedural-instruction authority.
- Record consent or another valid basis where personalization memory requires
  it.

## Research and standards basis

This method draws on:

- Baddeley's model of working memory:
  <https://doi.org/10.1016/S1364-6613(00)01538-2>
- Tulving's distinction between episodic and semantic memory:
  <https://doi.org/10.1007/978-1-4684-7890-7_2>
- Squire's taxonomy of declarative and nondeclarative memory systems:
  <https://doi.org/10.1016/j.nlm.2004.06.005>
- Lewis and colleagues' retrieval-augmented generation architecture:
  <https://arxiv.org/abs/2005.11401>
- Park and colleagues' memory stream, reflection, and retrieval design for
  generative agents: <https://arxiv.org/abs/2304.03442>
- Packer and colleagues' tiered memory management for long-lived language-model
  agents: <https://arxiv.org/abs/2310.08560>
- the W3C PROV-O provenance model: <https://www.w3.org/TR/prov-o/>
- NIST's privacy framework for identifying and managing privacy risk:
  <https://www.nist.gov/privacy-framework>

Human-memory terminology is an organizing analogy, not evidence that an agent
stores or recalls information like a person.
