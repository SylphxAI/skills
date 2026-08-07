---
id: ADR-0006-high-signal-agent-communication
status: accepted
date: 2026-07-19
decision_owner: SylphxAI
supersedes: []
amends: []
scope:
  - agent-communication
---

# ADR-0006: Make agent communication high-signal by default

## Context

Agent output is cheap to generate but expensive to transmit, review, retrieve,
maintain, and re-ingest. Existing guidance covered human-facing replies inside
autonomous execution but did not consistently govern agent handoffs, commits,
ADRs, documentation, or tool summaries. Unbounded narration slows execution and
pollutes future context; aggressive shortening can instead erase proof or
decisions.

## Decision

1. `write-high-signal-update` owns information density across agent-generated
   transient and durable communication.
2. The default is answer-first, delta-based, progressively disclosed output.
   A statement stays only when it changes interpretation, action, authority,
   evidence, risk, recovery, or a material trade-off.
3. No fixed word or token limit applies. Semantic completeness, not length,
   defines the lower bound.
4. Raw logs, transcripts, and duplicated source facts remain in their owning
   artifacts and are referenced precisely.
5. `write-high-signal-update` (see references/edit-preserving-voice) continues to own voice and locale;
   `documentation-standard` owns durable artifact placement;
   domain standards own technical content.
6. The compact answer-first invariant may be projected into always-on runtime
   constitutions; detailed methods remain in the Skill.

## Consequences

- Replies, progress updates, handoffs, commits, PRs, ADRs, specs, and tool
  summaries share one compression rule without one rigid template.
- Material evidence, uncertainty, risk, and contract semantics cannot be
  removed in the name of brevity.
- Existing duplicated general communication prose should link to this owner;
  surface-specific payload requirements stay with their domain standard.

## Verification

- Validate package structure, routing metadata, links, and catalog freshness.
- Check representative verbose inputs against answer-first, delta-only,
  durable-artifact, and no-evidence-loss cases.
