# Responsive Layout Rules

## Rule IDs

- `responsive-1` — Start from content priority: what must remain visible, what can collapse, and what can move behind navigation.
- `responsive-2` — Use content stress points to choose breakpoints; device presets are test cases, not architecture.
- `responsive-3` — Navigation should adapt from bottom/tab/compact to sidebar/topbar without changing information scent.
- `responsive-4` — Tables need responsive alternatives: column priority, cards, horizontal scroll with affordance, or drill-down.
- `responsive-5` — Forms should keep labels, errors, help text, and primary actions connected at every width.
- `responsive-6` — Modals and drawers must have mobile full-screen behavior when constrained.
- `responsive-7` — Wide screens need line-length, density, and whitespace control; do not stretch content blindly.
- `responsive-8` — Hover-only affordances need touch and keyboard equivalents.
- `responsive-9` — Test with browser zoom, dynamic text, virtual keyboards, long localized strings, and empty/error states.
- `responsive-10` — Preserve layout stability when data loads, filters change, or side panels open.

## Layout state matrix

| State | What to decide |
| --- | --- |
| Compact phone | Primary action, bottom nav, full-screen overlays, one-column content |
| Large phone/tablet | Split opportunities, side sheets, multi-column forms only if hierarchy stays clear |
| Laptop | Main content plus contextual panel, denser tables, persistent nav |
| Wide monitor | Max widths, dashboards, multi-pane workflows, avoid long unreadable rows |
| Keyboard open | Sticky action placement, focused field visibility, scroll recovery |
| High zoom/text | Wrapping, clipping, icon-only labels, overflow menus |

## Acceptance checks

Run through: first load, logged-out, logged-in, loading, empty, error, long data, long language, permission denied, offline, keyboard-only, and touch-only.
