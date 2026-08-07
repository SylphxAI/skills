---
name: prototype-product
description: "Run a cheap real prototype with kill/continue criteria."
---

# Prototype Product

When you need to **learn** whether something is worth building, run **one** prototype cycle.

## When to use

- New idea, mechanic, IA, or demand is uncertain
- You need go / kill / pivot evidence before investing in a durable build

## Method

Lean experiment: **hypothesis → cheapest probe → observe → decision**.  
Throwaway fidelity is fine. Learning quality beats permanence.

### 1. Frame
- One-sentence **hypothesis** or open question
- Users/players, **success signal** (what would change your mind), non-goals, time box
- Separate “must learn” from “nice to build”

### 2. Research
- Only until it changes the probe: analogs, prior art, in-repo history
- 2–3 probe options; pick the **lowest-cost** falsifying/supporting test
- Stop when more reading will not change the experiment

### 3. Admit work
- **In:** build the probe + observation path
- **Out:** production hardening, multi-region, abstract platforms, pixel-perfect systems
- Keep the set finishable inside the time box

### 4. Implement
- When landing source: apply constraints from `docs/policies/source-authoring-standard/` — **L1** batch this cycle's admitted work, **L2** atomic valid commits, **L3** one revert-safe complete PR outcome per independent outcome (queue/squash unit).
- Minimum interactive or observable slice in the real workspace when possible
- Mark throwaway and placeholders explicitly
- Do not fake future production architecture unless the hypothesis is about that architecture

### 5. Deliver / verify
- Run or show the slice
- Record observation + **decision**: go | kill | pivot | need-another-probe
- Evidence is observation + decision, not “code exists”

## Cycle done

1. Hypothesis and success signal were explicit  
2. A real probe ran (or a concrete external blocker is named)  
3. go / kill / pivot / next-probe is written with evidence pointers  
4. Non-learning production work was not smuggled in  

## Output

Hypothesis · probe · evidence · decision · suggested next work kind (build / expand / another prototype)

