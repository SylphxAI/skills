# Responsive, Mobile, and Input

Responsive design is task-preserving recomposition across space, text, device posture, and input—not desktop scaled down. Declare only the platforms and inputs in scope, then verify each applicable path.

## Adaptation matrix

Build the matrix from content stress points rather than familiar device names.

| Axis | Compact stress | Wide stress | Required response |
| --- | --- | --- | --- |
| Navigation | destinations no longer fit | context becomes distant | prioritize, collapse, or switch model while keeping current location visible |
| Content | labels wrap; data competes | reading lines become too long | reorder by task, constrain reading width, use columns only when relationships benefit |
| Actions | keyboard or safe area covers controls | primary action drifts from context | keep one primary reachable, unobscured, and near its decision |
| Tables/data | columns become illegible | scan distance grows | choose priority columns, cards, drill-down, or horizontal region with visible affordance |
| Overlays | modal exceeds viewport | empty space weakens focus | use full-screen/sheet on compact, bounded dialog on wide; preserve focus and escape |
| Text/locale | 200% zoom, long or RTL strings | labels detach from values | wrap/reflow, mirror directional layout, and size text containers from content |
| Virtual keyboard | viewport shrinks and fields disappear | surface absent | scroll focused control and error into view; preserve entered data and submit access |

Use at least compact, medium, and wide observations when those layouts exist. Add landscape, split view, fold/hinge, browser chrome, or television distance only when the declared platform needs them.

## Input parity

- Every action available by pointer has an applicable keyboard or controller
  route; essential hover information also appears through focus or activation.
- Touch targets are at least 44 × 44 CSS pixels where practical, separated enough to prevent destructive slips, even when the visible icon is smaller.
- Focus order follows the visual and task order. Opening an overlay moves focus intentionally; closing returns it to a meaningful origin.
- Keyboard shortcuts stay distinct from text entry, expose discoverable labels, respect platform conventions, and offer remapping where the product requires it.
- Controller focus has a visible position, deterministic movement, no unreachable islands, sensible wrap rules, and recovery after content changes.
- Gestures have visible affordances and non-gesture alternatives. Direct manipulation remains interruptible, reversible where feasible, and does not steal browser or OS navigation accidentally.
- Mobile inputs use the correct input mode, autocomplete, paste, password-manager, scanner, or file-picker affordance without blocking secure user choice.
- Voice and assistive-control labels match visible action names so commands are predictable.
- Use pointer cursors consistently for clickable controls where the platform convention supports them, alongside visible shape, label, state, and focus signals.
- For paths, hashes, account numbers, and long identifiers whose beginning and end both carry meaning, truncate from the middle and preserve a route to the complete value.
- Match collection semantics to behavior: use lists for sequences, tables for tabular relationships, and native controls inside them by default. Use composite listbox, tree, or grid patterns only when their selection and navigation contracts are actually implemented. Pagination or virtualization must preserve sequence context, focus, selection, and assistive access.

## Platform adaptation checklist

- Respect notches, rounded corners, status bars, home indicators, taskbars, title bars, browser bars, and safe-area insets.
- Keep critical controls clear of system gestures and the on-screen keyboard.
- Preserve meaningful state in the URL on web when sharing, reload, back/forward, or support diagnosis benefits.
- Keep browser theme color, favicon, installed-app icon, and shell treatment consistent with the active product theme where the platform exposes them.
- Define hover, pressed, focus-visible, selected, disabled, and drag states for inputs that can produce them. Give touch its own direct state model.
- Keep current navigation visible in long or nested surfaces. Back behavior matches platform expectations and preserves or explicitly resolves work.
- Verify zoom and text scaling without horizontal page scrolling for ordinary content; test the longest supported locale and RTL direction when selected.
- Validate lifecycle, input, entitlement, and distribution separately for every selected mobile, desktop, handheld, television, or console target.

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
