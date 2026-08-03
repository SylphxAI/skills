---
name: product-expander
description: "One expand cycle: pick a leverage scale bet, research bottleneck, implement ×N change, verify scale and core non-regression."
---

# Product Expander

Multiply what already works: reach, capacity, platforms, markets, or throughput.
Improve the active product/workspace by **scaling a validated core**, not by inventing a new product from zero.

**Primary class:** `workflow`. One **cycle** only.

## When to use

- Core journey works; need ×N users, surfaces, regions, SKUs, performance, automation
- Platformize a repeated title pattern

## When not to use

- Core still hypothetical → `product-prototyper`
- Core path missing → `product-builder`
- Only outages/regressions → `product-maintainer`
- Only burrs on current surface → `product-finish`

## Methodology

Leverage scaling: **measure bottleneck → highest-slope change → implement → prove scale metric + non-regression of core**.  
Expanding a broken core is out of scope.

## One cycle

### 1. Frame
- Name the **validated core** (what already works) and the **×N target** (metric or surface count).
- State constraints: cost, latency, compliance, dual-project boundaries.
- Non-goals: greenfield reinvention, pure cosmetics.

### 2. Research
- Locate the binding constraint (product, tech, ops, market motion).
- Compare 1–2 scale strategies; pick highest expected slope / cost.
- Identify maintain burden this expand will create (feed-forward).
- Stop when strategy choice is stable.

### 3. Admit work for this cycle
- **In:** changes that move the ×N metric or unlock the next scale gate.
- **Out:** below-threshold polish; speculative rewrites without scale slope.
- Prefer one coherent scale bet over many tiny unrelated tweaks.

### 4. Implement
- Implement the scale bet on the correct layer.
- Include minimum observability for the new scale dimension when missing.
- Avoid title-only hacks that cannot survive the target ×N.

### 5. Deliver / verify
- Show movement on the **scale metric** (or a faithful proxy declared up front).
- Re-check **core journey** non-regression.
- Explicitly list **new maintain/finish burden** created for other roles.

## Cycle done when

1. Scale bet is implemented and measured (or externally blocked with evidence).
2. Core path still holds under stated oracle.
3. New operational/product burden is written down (not denied).
4. Work stayed on the framed ×N, not a silent product reboot.


## Sibling roles

| Need | Skill |
| --- | --- |
| Learn / decide | `product-prototyper` |
| Ship capability | `product-builder` |
| Cut live harm | `product-maintainer` |
| Scale validated core | `product-expander` |
| Remove material burrs | `product-finish` |

Parallel product work: other agents may run other role Skills in the same
period. Keep this cycle inside **this** role’s admit rules and cycle-done.

## Output (short)

- Core · ×N target · change · metrics · core check · new burdens

