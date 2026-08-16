# Character identity consistency

The product is **identity across images**, not any single frame.

## Defaults

- Generate a **base** (hero pose / turnaround anchor) first; every later view,
  state, damage, equipment, or palette variant is an **edit-chain** from that
  base, preserving the same character identity through an edit or derived variant.
- Freeze silhouette, proportions, palette family, outline weight, and view
  angle contract unless the brief changes them.
- Turnarounds (front/side/back): same height line, foot plant, and lighting
  language; only camera yaw changes.
- State variants (hurt, powered, wet): geometry-stable; change only the state
  treatment.
- Palette swaps: recolor from the base while preserving the costume silhouette.

## Verify

1. Place variants side by side.
2. Blind-describe identity traits; fail if face/body/costume drift.
3. One targeted edit retry; if identity still drifts, flag and keep the best
   base rather than averaging failures.

Deliver a short identity note (palette hex, distinctive marks) with the set.
