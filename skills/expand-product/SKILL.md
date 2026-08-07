---
name: expand-product
description: "Scale a validated product core with metrics and core-path proof."
---

# Expand Product

When the core already works and you need **reach, capacity, or leverage ×N**, run **one** expand cycle.

## When to use

- Core journey works; need more users, surfaces, regions, SKUs, throughput, automation
- Platformizing a repeated pattern

## Method

**Measure bottleneck → highest-slope change → implement → prove scale metric + core non-regression.**  
Do not scale a broken core.

### 1. Frame
- Validated core (what already works) and ×N target (metric or surface count)
- Constraints: cost, latency, compliance, ownership boundaries
- Non-goals: greenfield reinvention; pure cosmetics

### 2. Research
- Binding constraint (product, tech, ops, market)
- 1–2 scale strategies; pick highest expected slope / cost
- Note new operational burden the expand will create
- Stop when strategy choice is stable

### 3. Admit work
- **In:** changes that move the ×N metric or unlock the next scale gate
- **Out:** below-threshold polish; rewrites without scale slope
- Prefer one coherent scale bet

### 4. Implement
- When landing source: apply constraints from `docs/policies/source-authoring-standard/` — **L1** batch this cycle's admitted work, **L2** atomic valid commits, **L3** one revert-safe complete PR outcome per independent outcome (queue/squash unit).
- Scale bet on the correct layer
- Minimum observability for the new scale dimension when missing
- Avoid hacks that cannot survive the target ×N

### 5. Deliver / verify
- Movement on the scale metric (or declared proxy)
- Core journey non-regression check
- Write down new maintain/finish burden created

## Cycle done

1. Scale bet implemented and measured (or externally blocked with evidence)  
2. Core path still holds  
3. New burden is recorded  
4. Scope stayed on the framed ×N  

## Output

Core · ×N target · change · metrics · core check · new burdens

