---
name: self-feeding-agent-loop-standard
description: "Workflow: continuous work-selection OS that generates next Work from evidence without human prompt churn. Not driving one bounded objective to terminal (autonomous-execution-standard), multi-aspect product betterment alone (continuous-product-quality), or live Enact API ops alone (enact-work-coordination)."
---

# Self-Feeding Agent Loop (workflow)

**Primary class:** `workflow` (continuous work-selection OS with embedded
predicates). **Package id** keeps the historical `*-standard` suffix for
stability; do not treat this package as pure policy or always-on law. See
[ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

**When matched:** run this workflow for continuous discovery → claim → tick
behavior.

## Progressive disclosure

1. Read [references/full-standard.md](references/full-standard.md) for the full
   continuous-work OS method, authority map, tick shape, and backpressure rules.

## Soft composition (native discovery has no dependency graph)

Open composed packs when the tick touches their domain:

- `work-coordination-standard` for portable ledger semantics
- `enact-work-coordination` when authenticated Enact tools are present (live ops)
- `autonomous-execution-standard` **inside** each claimed bounded Work (one
  objective to terminal) — this package does not replace that closure loop
- `delivery-standard` / `evidence-and-claims-standard` when ticks claim delivery
  outcomes
- `continuous-product-quality` when the continuous OS is specifically product
  betterment across aspects (compose; do not merge packages)

## Method (summary)

1. Resolve organization/project and live Work authority.
2. Inspect queue, claims, capacity, and material signals.
3. Deduplicate and qualify independently useful bounded outcomes.
4. Claim/launch only positive-net lanes under WIP and cost backpressure.
5. Checkpoint material state; emit a compact tick report and stop the tick.
6. Continuous mode requires external scheduler/wake, bounded WIP, and readout —
   not an immortal chat session.

## Primary artifact

A **bounded tick report** plus durable Work/claim/checkpoint effects (when
authority surfaces exist). Not a separate per-standard compliance report merely
because this package loaded.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not drive one already-accepted objective to terminal by itself
  (`autonomous-execution-standard`).
- Does not replace product betterment matrix ownership
  (`continuous-product-quality`).
- Does not replace portable semantics (`work-coordination-standard`) or live
  Enact schema (`enact-work-coordination`).
- Skill text is not a runtime scheduler.

## When not to use

- One bounded objective already accepted and only needs closure.
- Multi-aspect product betterment as the primary product job without Work OS
  selection concerns → `continuous-product-quality`.
- Portable ledger design without continuous OS → `work-coordination-standard`.
- Live Enact tool calls alone → `enact-work-coordination`.
