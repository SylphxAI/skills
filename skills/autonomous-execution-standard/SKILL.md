---
name: autonomous-execution-standard
description: "Objective-continuous execution for non-trivial or multi-phase work: preserve the original objective, full-scope acceptance map, proven predicates, and delivery terminal; research, execute, verify, repair, or replan without repeated prompts; keep eligible lanes moving; delegate only when net-positive; make evidence-bounded completion claims. Use when work must not stop at a phase, local diff, commit, open PR, partial validation, or one blocked lane. Not for a short answer, a few file reads, one command, a tightly coupled local edit, or a continuous process that keeps discovering new Work (self-feeding-agent-loop-standard)."
---
# Autonomous Execution Standard

**Requirement:** apply this standard when the task matches its scope.

Read [references/full-standard.md](references/full-standard.md) for the full
method and predicates. Read
[references/tool-grounded-execution.md](references/tool-grounded-execution.md)
when the task needs tool-grounded iteration, checkpoint, recovery, or
termination semantics. Read
[references/bounded-objective-closure-loop.md](references/bounded-objective-closure-loop.md)
when the user explicitly asks for loop engineering, a full-scope autonomous
closure loop, or repeated research-execute-audit transitions for one objective.

## Method

1. Read [references/full-standard.md](references/full-standard.md) for the full method and predicates.
2. Apply the strongest relevant subset; record material tradeoffs in ADR/tests as required.
3. Prefer schema/test/ADR homes over copying this body into product repos.


## Composition and output

Apply this standard as constraints on the artifact requested by the user or
owned by the primary procedure. Do not emit a separate per-standard compliance
report merely because this Skill was injected.

Integrate only material obligations, deviations, evidence, and gaps into the
primary artifact or final status. When conformance assessment is itself the
requested job, produce one standalone domain conformance record from this
standard.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not replace product-local ADRs where those own decisions.

## When not to use

- Product-specific live coordination operations → the matching adapter Skill
  and that product's current API or tool schema.
- Unrelated commercial packaging alone → commercial-decision-standard when in scope.
