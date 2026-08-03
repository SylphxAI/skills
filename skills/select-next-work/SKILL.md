---
name: select-next-work
description: "Select and claim the next high-value Work from evidence/ledger (not product betterment matrix)."
---

# Select Next Work

**Primary class:** `workflow` (continuous next-Work selection method with embedded
predicates). **Package id** is job-named (workflow). Do not treat this package as pure
policy or always-on law. See
[ADR-20260801](https://github.com/SylphxAI/skills/blob/main/docs/adr/ADR-20260801-package-classes-and-standard-composition.md).

**When you need to:** pick and advance the **next** Work from evidence without the user naming the ticket.

**Not for:** product betterment cycles (`better-product` / job skills), or one declared product objective (`pursue-product-objective` / `drive-to-delivery`).

## Progressive disclosure

1. Read [references/full-standard.md](references/full-standard.md) for the full
   next-Work selection method, authority map, tick shape, and backpressure rules.

## Soft composition (native discovery has no dependency graph)

Open composed packs when the tick touches their domain:

- `work-coordination-standard` for portable ledger semantics
- `coordinate-enact-work` when authenticated Enact tools are present (live ops)
- `drive-to-delivery` **inside** each claimed bounded Work (one
  objective to terminal) — this package does not replace that closure loop
- `delivery-standard` / `evidence-and-claims-standard` when ticks claim delivery
  outcomes
- `better-product` when the continuous selection is specifically product
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
  (`drive-to-delivery`).
- Does not replace product betterment matrix ownership
  (`better-product`).
- Does not replace portable semantics (`work-coordination-standard`) or live
  Enact schema (`coordinate-enact-work`).
- Skill text is not a runtime scheduler.

## When not to use

- One bounded objective already accepted and only needs closure.
- Multi-aspect product betterment as the primary product job without Work OS
  selection concerns → `better-product`.
- Portable ledger design without continuous OS → `work-coordination-standard`.
- Live Enact tool calls alone → `coordinate-enact-work`.
