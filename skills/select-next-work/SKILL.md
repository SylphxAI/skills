---
name: select-next-work
description: "Select/claim next high-value Work from evidence/ledger (not product betterment matrix)."
---

# Select Next Work

When you must **pick and advance the next Work from evidence** without the user
naming the ticket, run **one tick** of this method.

## When to use

- Queue/ledger/capacity signals exist (or must be established)
- Job is continuous selection + claim under WIP/backpressure
- Not the same as open product betterment or one fixed product objective

## When not to use

- One bounded objective already accepted → `drive-to-delivery` (or product jobs / `pursue-product-objective`)
- Multi-aspect product betterment matrix as the primary job → `better-product`
- Portable ledger **design** without continuous selection → `work-coordination-standard`
- Live Enact tool I/O alone → `coordinate-enact-work`

## Method (one tick)

1. Resolve org/project and live Work authority.
2. Inspect queue, claims, capacity, material signals.
3. Deduplicate; keep only independently useful bounded outcomes.
4. Claim/launch only positive-net lanes under WIP and cost backpressure.
5. Checkpoint material state; emit a compact tick report; **end the tick**.
6. Continuous mode needs external scheduler/wake + bounded WIP + readout—not an immortal chat session.

### Progressive disclosure

- [references/full-standard.md](references/full-standard.md) — full selection method, authority map, tick shape, backpressure.

### Soft composition (no meta-router)

- `work-coordination-standard` — portable ledger semantics
- `coordinate-enact-work` — authenticated Enact live ops
- `drive-to-delivery` — **inside** each claimed bounded Work (this package does not close that objective)
- `delivery-standard` / `evidence-and-claims-standard` — when ticks claim delivery outcomes
- `better-product` — only when the continuous job is specifically multi-aspect product betterment (compose; do not merge packages)

## Output

A **bounded tick report** plus durable Work/claim/checkpoint effects when authority surfaces exist.

## Boundaries

- Does not grant deploy, credential, or MCP capabilities.
- Does not drive one already-accepted objective to terminal by itself.
- Skill text is not a runtime scheduler.
