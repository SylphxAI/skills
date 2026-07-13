# Visual Verification and Delivery

Build and Polish modes require rendered evidence. Source inspection, lint, type checks, and unit tests are necessary where relevant, but none proves the final pixels, responsive composition, focus path, or reachable states alone.

## Verification ladder

Use the narrowest available rung first, then widen to the declared surface:

1. **Static contract** — formatting, lint, types, imports, token/component consistency, semantic structure.
2. **Behavior** — unit/component tests for transitions, validation, duplicate prevention, recovery, keyboard behavior, and reduced-motion branching.
3. **Representative render** — launch the real route/story/preview with realistic fixtures; inspect console and network failures.
4. **Visual matrix** — capture and inspect representative viewport × state × input cells, including long content and at least one failure/recovery path.
5. **Accessibility/input smoke** — keyboard critical task, focus entry/return, accessibility tree, announcements, contrast, zoom/text scaling, touch or controller path as applicable.
6. **Performance/resilience** — low-end profile or representative device, slow/offline condition, startup and interaction budgets, layout stability, repeated navigation.
7. **Broader regression** — targeted package/app suite and existing visual regression only after the bounded slice passes.

Do not substitute a design-tool mockup for a product render. Do not substitute a browser desktop screenshot for mobile, native, console, television, or controller evidence when those targets are declared.

## Render matrix

Choose cells based on reachable risk, not a fixed screenshot count.

| Axis | Minimum representative choices |
| --- | --- |
| Viewport | compact, medium, wide; add landscape/split/TV distance when applicable |
| Content | shortest, typical, longest supported locale, dense, empty |
| State | default, focus, pending, success, error/recovery; add offline, permission, destructive where reachable |
| Input | pointer, keyboard, touch, controller, screen reader, voice/assistive as declared |
| Preference | default, reduced motion, text scaling/zoom, light/dark or high contrast when supported |
| Runtime | cold/warm, slow network, cached/offline, background/foreground where relevant |

Record skipped cells with an exact non-applicability or evidence-gap reason. “Looks fine” is not a result.

## Visual inspection checklist

- Hierarchy: primary job and action are obvious; supporting information does not compete.
- Geometry: alignment, spacing rhythm, reading width, wrapping, truncation, overflow, safe areas, and overlay fit are intentional.
- State truth: selected, disabled, loading, optimistic, success, error, offline, permission, and destructive states are visually distinct and semantically aligned.
- Content: realistic names, values, units, long strings, localization, and user data do not break the layout.
- Inputs: focus is visible; hover is not essential; touch/controller targets and movement are reliable; virtual keyboard does not hide work.
- Accessibility: semantics, labels, contrast, color independence, announcements, zoom/text scaling, reduced motion, and media alternatives pass the bounded checks.
- Motion/feedback: transition origin and destination are coherent, input is never blocked, and frequent effects remain quiet.
- Performance: no avoidable flash, layout shift, jank, oversized media, blocking font/SDK work, stale state, or runtime/console failure.
- Distinctiveness: the direction reflects the product subject and does not collapse into generic cards, gradients, glass, decorative icons, or copied identity.

## Evidence record

```text
Surface / revision:
Mode: Direction | Build | Polish | Review
Environment and fixture:
Rendered route/story and command:
Matrix cells inspected:
Screenshots or recordings:
Static/test commands and exact results:
Keyboard/assistive/device checks:
Performance/resilience observations:
Failures found and corrections made:
Unavailable evidence and residual risk:
Delivery state: local | committed | PR | merged | released | deployed | live-verified
```

Never advance the delivery state without direct evidence. A local render proves neither merge nor deployment; a merged change proves neither release nor live behavior.

## Review evidence

Review mode may stop at findings, but each finding needs an observable source: exact file/line, rendered state, screenshot region, accessibility tree, trace, test failure, or reproducible interaction. Rank by blocked task, irreversible harm, access failure, trust/confusion, recovery failure, responsive/input break, performance, then cosmetic consistency.

## Completion rules

- `ic-proof-1` — Build/Polish is incomplete without a real implementation diff and at least one representative render, unless the environment makes rendering impossible and that blocker is stated precisely.
- `ic-proof-2` — A happy-path screenshot cannot close state, responsive, input, accessibility, or performance acceptance by itself.
- `ic-proof-3` — Report commands exactly as run and distinguish passing, failing, skipped, unavailable, and not applicable.
- `ic-proof-4` — If verification reveals a repeated pattern inside the declared surface, fix consistent siblings; do not silently expand into unrelated product areas.
- `ic-proof-5` — Preserve pre-existing failures and unrelated changes as separate facts; never claim they were caused or fixed without evidence.
- `ic-proof-6` — For Review, do not edit. For Direction, do not claim implementation. For Build/Polish, do not stop at recommendations.
