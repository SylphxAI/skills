# Layered map notes

Use when assembling multi-layer 2D map previews (terrain, props, overlays).

## Practical contract

- Keep layers separable files or named groups: base terrain, decals, props,
  collision/debug overlay (debug never ships in player art).
- Same pixel scale and origin across layers so `compose_layered_preview.py`
  (or title tools) stack without drift.
- Name layers and z-order in a tiny manifest next to the set.
- Preview is art-direction QC—not the runtime map format. Title/Keel owns
  runtime packing.

## Strategies (pick, do not invent five pipelines)

1. **Tile atlas + prop sheet** — default for grid maps.
2. **Hero backdrop + modular props** — for linear stages.
3. **Chunked biomes** — large worlds; keep per-biome style contracts tight.

Document chosen strategy, tile size, and residual seam/identity issues.
