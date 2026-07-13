# Accessibility, Motion, and Performance

This reference defines the baseline implementation floor for one bounded interface. It does not establish formal conformance, legal compliance, a VPAT, or product-wide certification. Those require declared standards, representative scope, specialist testing, defect disposition, and current evidence.

## Baseline accessibility matrix

| Boundary | Implementation floor | Verification evidence |
| --- | --- | --- |
| Structure | semantic landmarks, headings, lists, tables, labels, buttons, and links | DOM/accessibility tree inspection |
| Name/role/state | accessible names match visible intent; expanded, selected, invalid, busy, and pressed states exposed | browser accessibility inspection and screen-reader smoke test |
| Keyboard/focus | complete path, visible focus, no trap, deliberate overlay entry/return, sensible order | keyboard walkthrough for critical task |
| Perception | measured text/control/focus contrast; color not sole carrier; meaningful media alternatives | contrast measurement and rendered inspection |
| Reflow | zoom/text scaling, long strings, RTL, and dynamic content remain operable | viewport and locale stress render |
| Dynamic feedback | errors, progress, results, and material changes announced without disruptive repetition | live-region/status behavior check |
| Motion/sensory | reduced-motion path preserves meaning; flashing and autoplay risks controlled | preference-mode render and timing inspection |
| Complex representation | chart, map, canvas, game, audio, video, or AI output has the best meaningful alternate representation feasible | content-specific keyboard/screen-reader/device check |

Use native semantics before custom roles. Never repair visual order with a contradictory tab order. If a surface cannot support a full alternate interaction, state the exact limitation and the specialist/product decision required.

## Motion purpose table

| Purpose | Suitable treatment | Failure mode |
| --- | --- | --- |
| Immediate feedback | brief state change at the control | animation delays input or hides failure |
| Spatial continuity | shared origin/destination, interrupted safely | objects teleport or closing loses focus origin |
| Hierarchy reveal | one staged relationship | every child animates independently |
| Progress | determinate progress when knowable; stable skeleton otherwise | decorative spinner masks stalled work |
| Direct manipulation | input-linked, reversible, physically coherent | gesture locks user into choreography |
| Rare reward | expressive but optional celebration | confetti on routine or high-risk tasks |

- `ic-motion-1` — Motion must explain change, focus attention once, confirm action, or reinforce direct manipulation; otherwise remove it.
- `ic-motion-2` — Frequent interactions are short and quiet. Navigation, purchase, authentication, recovery, and destructive flows prioritize clarity.
- `ic-motion-3` — Animation is interruptible and does not block input. Reversing an action should reverse or settle immediately.
- `ic-motion-4` — `prefers-reduced-motion` removes non-essential movement while preserving state, hierarchy, and completion feedback.
- `ic-motion-5` — Animate transform and opacity where possible; avoid layout-triggering animation, content jumps, and font/icon swaps that shift geometry.
- `ic-motion-6` — Audio, haptics, particles, flashes, and camera movement never carry unique meaning and expose appropriate mute, intensity, or safety alternatives.

## Performance budgets

Set budgets from the target platform, existing project contracts, and representative low-end devices. Do not invent universal numbers. Measure the user-perceived path:

```text
launch/navigation -> useful shell -> primary content -> interactive task -> feedback -> settled state
```

Record target and observed values for applicable startup/render milestones, input latency, frame stability, layout shift, memory, asset weight, network requests, and long-task blocking. The exact metric and tool may differ by web, native, desktop, game UI, or embedded surface; the obligation to measure does not.

When approved budgets or audience telemetry do not yet exist, declare a provisional fixture from the weakest supported platform, a realistically dense content case, and a constrained network profile. Label every assumption, record the exact fixture, and use the result to expose risk—not to claim that the product meets an approved performance target.

## Performance checklist

- Keep the first useful path free of nonessential SDK, font, media, analytics, and personalization blocking.
- Reserve final geometry for images, charts, skeletons, ads, and asynchronously loaded regions.
- Load only assets, code, data, and interaction machinery needed for the current route; prefetch only when evidence and budgets justify it.
- Compress and size media for rendered use; avoid decoding oversized images or autoplaying expensive effects on low-end modes.
- Virtualize or paginate only where data volume requires it while preserving search, focus, selection, and assistive access.
- Avoid event storms, duplicate requests, runaway observers, expensive blur/glass layers, large shadows, and continuous offscreen animation.
- Degrade fidelity, not truth: reduce particles, blur, texture, animation, or media resolution before removing state clarity or input feedback.
- Test slow network, warm and cold paths, resize/orientation, background/foreground where relevant, and repeated navigation for leaks or stale state.

## Evidence boundary

Passing lint or component tests does not prove visual, keyboard, screen-reader, motion, or low-end quality. A single manual walkthrough does not prove product-wide conformance. Report each evidence class separately and name unavailable devices, assistive technologies, performance profiles, or content variants as residual risk.
