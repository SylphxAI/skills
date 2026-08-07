# Responsive, Mobile, and Input

Responsive design is task-preserving recomposition across space, text, device posture, and input—not desktop scaled down. Declare only the platforms and inputs in scope, then verify each applicable path.

## Adaptation matrix

Build the matrix from content stress points rather than familiar device names.

| Axis | Compact stress | Wide stress | Required response |
| --- | --- | --- | --- |
| Navigation | destinations no longer fit | context becomes distant | prioritize, collapse, or switch model while keeping current location visible |
| Content | labels wrap; data competes | reading lines become too long | reorder by task, constrain reading width, use columns only when relationships benefit |
| Actions | keyboard or safe area covers controls | primary action drifts from context | keep reachable and near its decision; avoid overlap and duplicate primaries |
| Tables/data | columns become illegible | scan distance grows | choose priority columns, cards, drill-down, or horizontal region with visible affordance |
| Overlays | modal exceeds viewport | empty space weakens focus | use full-screen/sheet on compact, bounded dialog on wide; preserve focus and escape |
| Text/locale | 200% zoom, long or RTL strings | labels detach from values | wrap/reflow, mirror directional layout, avoid fixed-height text containers |
| Virtual keyboard | viewport shrinks and fields disappear | not applicable | scroll focused control and error into view; preserve entered data and submit access |

Use at least compact, medium, and wide observations when those layouts exist. Add landscape, split view, fold/hinge, browser chrome, or television distance only when the declared platform needs them.

## Input parity

- `ic-input-1` — Every action available by pointer has an applicable keyboard or controller route; hover cannot contain unique essential information.
- `ic-input-2` — Touch targets are at least 44 × 44 CSS pixels where practical, separated enough to prevent destructive slips, even when the visible icon is smaller.
- `ic-input-3` — Focus order follows the visual and task order. Opening an overlay moves focus intentionally; closing returns it to a meaningful origin.
- `ic-input-4` — Keyboard shortcuts avoid text-entry collisions, expose discoverable labels, respect platform conventions, and offer remapping where the product requires it.
- `ic-input-5` — Controller focus has a visible position, deterministic movement, no unreachable islands, sensible wrap rules, and recovery after content changes.
- `ic-input-6` — Gestures have visible affordances and non-gesture alternatives. Direct manipulation remains interruptible, reversible where feasible, and does not steal browser or OS navigation accidentally.
- `ic-input-7` — Mobile inputs use the correct input mode, autocomplete, paste, password-manager, scanner, or file-picker affordance without blocking secure user choice.
- `ic-input-8` — Voice and assistive-control labels match visible action names so commands are predictable.
- `ic-input-9` — Use pointer cursors consistently for clickable controls where the platform convention supports them, but never use cursor shape as the only interaction signal.
- `ic-input-10` — For paths, hashes, account numbers, and long identifiers whose beginning and end both carry meaning, truncate from the middle and preserve a route to the complete value.
- `ic-input-11` — Match collection semantics to behavior: use lists for sequences, tables for tabular relationships, and native controls inside them by default. Use composite listbox, tree, or grid patterns only when their selection and navigation contracts are actually implemented. Pagination or virtualization must preserve sequence context, focus, selection, and assistive access.

## Platform adaptation checklist

- Respect notches, rounded corners, status bars, home indicators, taskbars, title bars, browser bars, and safe-area insets.
- Do not place critical controls behind system gestures or the on-screen keyboard.
- Preserve meaningful state in the URL on web when sharing, reload, back/forward, or support diagnosis benefits.
- Keep browser theme color, favicon, installed-app icon, and shell treatment consistent with the active product theme where the platform exposes them.
- Define hover, pressed, focus-visible, selected, disabled, and drag states only for inputs that can produce them; do not make touch emulate hover.
- Keep current navigation visible in long or nested surfaces. Back behavior must match platform expectations and never discard work silently.
- Verify zoom and text scaling without horizontal page scrolling for ordinary content; test the longest supported locale and RTL direction when selected.
- Do not assume a responsive HTML5 surface is automatically native-quality on mobile, desktop, handheld, television, or console. Lifecycle, input, entitlement, and distribution remain separate platform concerns.

## Responsive acceptance record

```text
Viewport/posture: compact | medium | wide | landscape | split | other
Content stress: shortest, typical, longest locale, empty, dense
Input: pointer | touch | keyboard | controller | voice/assistive
Navigation model:
Primary action placement:
Overlay/keyboard/safe-area behavior:
Zoom/text-scale/RTL result:
Observed defects and evidence:
```

An interface passes only when the same user job remains understandable and completable in every declared cell. Pixel identity is not the goal; semantic and task continuity are.
