# Surfaces and elevation (portable)

## Concentric radius

When nested rounded surfaces sit close together:

```text
outerRadius ≈ innerRadius + padding
```

If padding is large (≳24px), treat layers as separate surfaces and pick radii
independently. Same radius on parent and padded child is a common “off” tell.

## Elevation language

Pick **one** elevation system and stick to it:

| Level | Typical use | Treatment |
| --- | --- | --- |
| Canvas | App/game background | Flat or barely perceptible wash |
| Surface | Cards, panels, sheets | Slight lift or border only |
| Overlay | Modal, popover, pause menu | Stronger separation; dim scrim optional |
| Float | Toast, tooltip | Light shadow or hairline; short-lived |

Prefer thin neutral borders + single soft shadow over stacked glass/neon.

## Optical alignment

- Icon+text buttons: slightly less padding on the **icon** side (~2px) so optical
  center feels balanced.
- Optical vertical center for mixed text/icon often beats pure geometric center.

## Image and media frames

- Media in chrome: consistent corner radius with neighboring controls.
- Avoid default gray “broken image” boxes in ship UI—real content or intentional empty state.
- Game stage vs chrome: stage usually edge-to-edge in its slot; chrome sits in
  safe margins (notches/TV overscan when those platforms are in scope).

## Keel

Surfaces map to ThemePack **SurfaceStyle** / role ids and View layout—not a
second free-form CSS class SSOT. Pack owns the outer player shell.
