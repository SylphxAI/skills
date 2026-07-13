---
name: interface-craft
description: "Design, build, reshape, polish, or review one bounded product interface or coherent user flow with distinctive visual direction, production-quality interaction states, responsive mobile/desktop behavior, keyboard/touch/pointer/controller input, baseline accessibility, purposeful motion, UX writing, low-end performance, and rendered verification. Use when the primary artifact is a screen, component family, shell, HUD, form, onboarding or checkout flow, dashboard, settings surface, or frontend implementation—not a whole App/Game blueprint, brand identity, extracted design system, formal accessibility certification, marketing strategy, or pricing decision."
---

# Interface Craft

Make one bounded interface or coherent flow useful, distinctive, resilient, and implementation-ready. Design is not decoration: every visual or interaction choice must improve comprehension, task completion, trust, feedback, identity, or performance.

## Atomic boundary

This skill owns one **Interface Craft Pack** for a declared surface or flow. It may set a local direction, implement it, polish an existing implementation, or review it. It owns the interface manifestation—not the whole product promise or specialist truth behind it.

It may create minimal local tokens or primitives needed for internal consistency. It does not extract or govern a product-wide design system, invent a brand identity, certify formal accessibility conformance, decide prices or marketing claims, produce promotional media, or design the complete capability portfolio and loops of an App or Game.

## Resolve the mode

- **Direction** — define an original visual and interaction direction for a greenfield bounded surface or flow; do not edit unless implementation is requested.
- **Build** — design and implement the requested surface or flow in the target codebase.
- **Polish** — improve an existing implementation directly while preserving approved product behavior and visual-system constraints.
- **Review** — remain read-only unless asked to fix; return evidence-backed, ranked findings.

If intent is ambiguous, use Review for existing artifacts and Direction for a greenfield concept. A request to “build,” “implement,” “fix,” or “polish” requires code changes and verification, not a plan-only answer.

## Evidence and authority

Use this priority order:

1. user brief and approved product, commercial, policy, and content truth;
2. rendered product behavior, code, tests, assets, content, brand rules, components, tokens, and platform conventions;
3. baseline accessibility, input, responsiveness, and performance requirements;
4. this skill’s distilled interface method;
5. external references as pattern evidence only, never as identity to copy.

Label assumptions and evidence gaps. Never fabricate product behavior, testimonials, prices, entitlements, availability, metrics, compliance, or validation. If the current implementation can be rendered, inspect it before redesigning it.

## Resource router

Load only the references needed for the declared surface, but always read the verification reference for Build or Polish.

| Need | Read |
| --- | --- |
| Greenfield direction, hierarchy, visual language, density, tokens, or non-generic styling | [Interface direction and craft rules](references/interface-craft-rules.md) |
| Compact/wide layouts, mobile web/native, safe areas, text expansion, or input parity | [Responsive, mobile, and input](references/responsive-mobile-and-input.md) |
| Forms, loading, empty, offline, permission, error, success, destructive, or recovery behavior | [States, forms, and recovery](references/states-forms-and-recovery.md) |
| Semantics, focus, assistive technology, motion, feedback timing, or low-end performance | [Accessibility, motion, and performance](references/accessibility-motion-and-performance.md) |
| Labels, help, errors, onboarding, checkout, landing, or pricing-surface copy | [UX writing and truth-bound surfaces](references/ux-writing-and-truth.md) |
| Render matrix, screenshots, browser/device checks, tests, and completion evidence | [Visual verification and delivery](references/visual-verification-and-delivery.md) |

## Workflow

1. **Freeze scope and mode.** Name the route/screen/component family, user and primary job, platform, input modes, supplied truth, constraints, non-goals, and acceptance criteria. Split unrelated surfaces; keep one coherent flow together.
2. **Inspect before choosing.** Read the relevant implementation and local instructions. Render existing work when possible. Inventory existing layout, type, color, spacing, components, copy, states, responsive behavior, and test conventions.
3. **State the direction.** Define a one-sentence design thesis, primary archetype, density, hierarchy, content order, semantic color and type roles, interaction rhythm, one justified signature move, and explicit anti-patterns. Preserve the product’s established grammar unless change is requested.
4. **Build the state contract.** Enumerate default, focus, hover where applicable, active, disabled with reason, pending, success, error, empty, zero-result, offline, permission-denied, destructive, and recovery states that the surface can actually enter. Specify truthful transitions and retained user input.
5. **Build the adaptation contract.** Cover compact/medium/wide stress points, long and RTL strings, zoom/text scaling, safe areas and virtual keyboard, and every applicable pointer, keyboard, touch, screen-reader, voice, or controller path. Recompose by task priority; do not shrink desktop.
6. **Implement the coherent slice.** In Build or Polish, change the target files, reuse established primitives, and apply the same semantic pattern to siblings inside the declared surface. Keep frequent interactions quiet, prevent duplicate or irreversible actions, preserve URLs/history when useful, and avoid unrelated refactors.
7. **Render and challenge.** Exercise the viewport × state × input matrix with representative content. Inspect screenshots or the live render; check focus order, contrast, reduced motion, text expansion, layout stability, console/runtime errors, slow/offline behavior where relevant, and low-end budgets.
8. **Report proof.** Separate implemented, rendered, mechanically tested, manually inspected, assumed, and unverified. Name files and commands exactly; do not call a mockup production-ready or a local render deployed.

## Output contract

Return only the fields useful to the selected mode.

### Direction

- scope, user job, supplied truth, assumptions, and non-goals;
- design thesis, archetype, anti-patterns, hierarchy, content and state map;
- color/type/spacing/layout/motion roles and one signature move;
- responsive, input, accessibility, performance, and recovery contract;
- implementation acceptance criteria and unresolved evidence.

### Build or Polish

- direction and material decisions;
- files/components changed and behavior implemented;
- state and responsive/input coverage;
- rendered evidence and validation commands with exact results;
- remaining risks or unavailable verification.

### Review

Use 3–8 high-signal findings rather than cosmetic noise:

```text
P1 — <surface or file:line> — <rule ID>
Issue: <observable behavior>
Impact: <task, trust, access, or performance consequence>
Fix: <specific correction>
Verify: <render, state, input, accessibility, or test check>
```

Then provide the smallest coherent fix sequence. Do not claim file-level facts without code, renders, or interaction evidence.

## Hard gates

Reject or revise work that:

- outputs only advice after a Build or Polish request;
- copies a named product’s identity or defaults to interchangeable AI styling;
- makes every surface a card, uses decoration as hierarchy, or adds motion without meaning;
- omits reachable states, recovery, retained input, or duplicate-submit protection;
- treats responsive as scaling, hover as the only affordance, or one viewport/input as universal;
- removes semantics, visible focus, contrast, text scaling, reduced-motion meaning, or baseline assistive-technology access;
- invents brand, marketing, pricing, policy, entitlement, or product truth to fill a UI;
- silently expands a local surface into a design-system extraction or whole-product redesign;
- claims formal accessibility conformance, device coverage, performance, or visual quality without the corresponding evidence;
- calls a screenshot, plan, or unrendered code complete.

## Routing boundaries

- Use `app-design-blueprint` when deciding a whole app’s promise, workflows, capability portfolio, retention, commerce, social systems, and cross-platform architecture.
- Use `game-design-blueprint` when deciding a whole game’s player promise, mechanics, loops, progression, economy, challenge, social systems, and game feel. Use this skill for a bounded HUD, menu, store, inventory, onboarding, or control surface.
- Route design-system extraction/governance and formal accessibility certification to their owning specialist when available; this skill still implements baseline quality on its bounded surface.
- Consume approved pricing and marketing decisions. Route unresolved tier/value/price decisions to `saas-subscription-pricing`, campaign/message strategy to `marketing-automation-blueprint`, and promotional captures/media to `product-asset-production`.

## Completion check

The pack is complete only when the declared surface has a coherent direction, truthful state model, responsive and input behavior, baseline accessibility, purposeful feedback, appropriate performance, and mode-appropriate evidence. For Build or Polish, another agent must be able to locate the changed files, reproduce validation, and inspect the rendered states without reopening the design intent.
