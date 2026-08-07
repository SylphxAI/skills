# Tileset and prop QC

## Seamless tiles

- Prompt for uniform stochastic texture: even density/lighting, pattern
  continues off every edge, no landmark motifs that tile forever.
- **Mandatory:** composite a real 2×2 (or larger) and inspect for seam lines,
  repeated recognizable clumps, and large-scale tone checkerboarding.

## Transition sets (e.g. grass→dirt)

- Author as one continuous paintable surface sliceable into cells—not sticker
  tiles with gaps.
- Typical 3×3: center pure fill; edges straight transitions; corners outer
  corners; verify directionality per cell.

## Rotation economy

When lighting is neutral (top-down, no gravity cues), one straight edge + one
outer corner can rotate in-engine. Prefer fewer rotation-safe masters plus
fill **variants** over four painted orientations. Side-view / gravity-lit tiles
need each orientation painted. Record which tiles are rotation-safe.

## Props

Isolated on `#FF00FF` for extract pipelines; lighting consistent with tileset;
no baked ground shadow. Run extract scripts with documented flags; inspect
alpha fringes and despill.
