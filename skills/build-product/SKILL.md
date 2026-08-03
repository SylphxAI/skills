---
name: build-product
description: "Ship a missing product capability end-to-end on the correct ownership boundary; original-oracle verify."
---

# Build Product

When you need a **real capability** on a dogfood or market path, run **one** build cycle.

## When to use

- Direction is decided; a journey or capability is still missing
- Engine or product gaps block a customer path

## When not to use

- Mixed open betterment with no fixed objective → `better-product`
- Durable declared outcome to drive to completion → `pursue-product-objective`
- Still validating the idea → `prototype-product`
- Live reliability harm only → `maintain-product`
- Scale ×N only → `expand-product`
- Polish of an already integrated surface → `finish-product`

## Method

**Journey gap → correct ownership boundary → implement → original-oracle verify.**  
No permanent workarounds. Prefer durable work on the owning layer.

### 1. Frame
- Product, journey/capability, and **done look** for this cycle
- Constraints: platforms, auth, data, engine vs product boundary
- Non-goals: unrelated refactors, scale fantasy, cosmetic thrash

### 2. Research
- How the journey fails today (code, build, live, docs)
- Owning layer for each gap
- Load domain Skills only as needed via native discovery
- Stop when more reading will not change the plan

### 3. Admit work
- **In:** capacity-feasible gaps that unlock the framed capability (several OK)
- **Out:** below-threshold polish; speculative features; drive-by rewrites
- Large gaps → a still-meaningful vertical slice

### 4. Implement
- Correct boundary; no product hacks for shared floors that belong elsewhere
- Real paths over mocks unless the cycle is explicitly building a seam
- Update public docs/contracts when behavior changes

### 5. Deliver / verify
- Original oracles for this slice (run, smoke, API, pack, host as applicable)
- Separate local vs landed vs live claims if delivery is in scope
- List residuals without claiming whole-product completion

## Cycle done

1. Framed capability is usable under the stated oracle, or only externally blocked  
2. Ownership of changes is honest  
3. Residuals are listed  
4. No known ship-blocker for this slice was ignored  

## Output

Capability · changes · oracle evidence · residuals

