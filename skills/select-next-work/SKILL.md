---
name: select-next-work
description: "Select/claim next high-value Work from evidence under WIP limits."
---

# Select Next Work

When you must **pick and advance the next Work from evidence** without the user
naming the ticket, run **one tick** of this method.

## When to use

- Queue/ledger/capacity signals exist (or must be established)
- Job is continuous selection + claim under WIP/backpressure
- Continuous selection + claim under queue/capacity signals

## Method (one tick)

1. Resolve org/project and live Work authority.
2. Inspect queue, claims, capacity, material signals.
3. Deduplicate; keep only independently useful bounded outcomes.
4. Claim/launch only positive-net lanes under WIP and cost backpressure.
5. Checkpoint material state; emit a compact tick report; **end the tick**.
6. Continuous mode needs external scheduler/wake + bounded WIP + readout—not an immortal chat session.

### Progressive disclosure

- [references/full-standard.md](references/full-standard.md) — full selection method, authority map, tick shape, backpressure.

### composition (no meta-router)

- `../adopt-repo-standards/references/policies/work-coordination-standard/` — portable ledger semantics
- `drive-to-delivery` — **inside** each claimed bounded Work (this package does not close that objective)
- `../adopt-repo-standards/references/policies/delivery-standard/` / `../adopt-repo-standards/references/policies/evidence-and-claims-standard/` — when ticks claim delivery outcomes
- `run-open-product-betterment` — only when the continuous job is specifically multi-aspect product betterment (compose; do not merge packages)

## Output

A **bounded tick report** plus durable Work/claim/checkpoint effects when authority surfaces exist.

## Boundaries

- Grants no deploy or credential capabilities.
- One **tick** selects/claims; closing a claimed multi-phase objective uses the delivery method for that Work.
- This package is method text, not a runtime scheduler.
