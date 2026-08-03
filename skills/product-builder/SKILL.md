---
name: product-builder
description: "One build cycle: close shippable capability gaps with research, implement on correct boundaries, verify delivery path."
---

# Product Builder

Turn a decided direction into **shippable** product capability.
Improve the active product/workspace by closing **real capability gaps** on the path to dogfood or market.

**Primary class:** `workflow`. One **cycle** only.

## When to use

- Direction is decided; need working product surface
- Engine/title gaps block a customer journey

## When not to use

- Still validating the idea → `product-prototyper`
- Only live reliability harm → `product-maintainer`
- Only scale ×N → `product-expander`
- Only polish integrated experience → `product-finisher`

## Methodology

Delivery-oriented construction: **journey gap → correct boundary → implement → original-oracle verify**.  
No permanent workarounds. Prefer durable implementation on the owning layer (engine vs product).

## One cycle

### 1. Frame
- Name the **product**, **journey or capability**, and **done look** for this cycle (user-visible or API-visible).
- State constraints: platforms, auth, data, dual-project boundaries if any.
- Non-goals: unrelated refactors, scale fantasy, cosmetic thrash.

### 2. Research
- Trace how the journey fails today (code, build, live, docs).
- Identify **owning layer** for each gap (shared engine vs title vs ops).
- Pull only the domain methods needed (design/delivery/domain Skills via native discovery).
- Stop when the implementation plan would not change with more reading.

### 3. Admit work for this cycle
- **In:** all capacity-feasible gaps that unlock the framed capability (several OK).
- **Out:** pure polish below ship impact; speculative features; “while we’re here” rewrites.
- If a gap is large, admit a **vertical slice** that is still user/oracle meaningful.

### 4. Implement
- Implement on the **correct boundary**; no title-side hacks for engine floors.
- Keep changes reviewable; wire real paths (not mocks) unless the cycle explicitly builds a seam.
- Update docs/contracts when behavior is public.

### 5. Deliver / verify
- Prove the capability with **original oracles** for this slice (run, smoke, API, pack, host—as applicable).
- Distinguish local green vs landed vs live if delivery is in scope this cycle.
- List residuals that remain for other roles (maintain/expand/finish).

## Cycle done when

1. Framed capability is **usable** under the stated oracle, or blocked only by named external/authority limits.
2. Ownership/boundary of changes is honest.
3. Residuals are listed without claiming whole-product completion.
4. No known ship-blocker for this slice was ignored without a residual entry.

## Output (short)

- Capability · changes · oracle evidence · residuals by role

