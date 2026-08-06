---
name: produce-game-2d-map-assets
description: "Produce 2D map tiles/props packs: layered sheets, magenta…"
---

# Produce Game 2D Map Assets

When you need **2D map tiles, terrain sheets, or prop packs** for a game title,
run this job. Own art production and packing helpers; Keel pack owns shipping
shells and multi-platform emit.

## When to use

- Tileable terrain/water/walls and prop sheets for 2D/2.5D maps
- Transition tilesets and rotation-safe masters
- Extracting transparent props from solid-magenta packs
- Layered map previews for art direction QC

## Sylphx / Keel alignment

| Concern | Owner |
| --- | --- |
| Tiles/props files + extract scripts | this skill |
| Title map data / world layout | title repo |
| Pack / player / platform emit | **Keel pack** |

Suggested paths:

```text
<title-repo>/assets/tiles/<set>/
<title-repo>/assets/props/<set>/
```

## Method

### 1. Frame

- Tile size, atlas layout, prop density, style match to characters/UI
- Seamless vs hero-prop distinction
- Naming + manifest requirements

### 2. Defaults and QC

- Terrain: seamless, non-directional lighting when rotation may apply
- Props: isolated on `#FF00FF` for extract; no baked text
- Verify tile seams with real 2×2 (or larger) composites

Depth: [references/tileset-and-prop-qc.md](references/tileset-and-prop-qc.md),
[references/layered-map-notes.md](references/layered-map-notes.md).

### 3. Generate / assemble

- Use host image tools when available; keep style contract with character art
- Prefer compositional assembly when generators fail seam/identity checks

### 4. Scripts

```bash
python3 skills/produce-game-2d-map-assets/scripts/extract_prop_pack.py --help
python3 skills/produce-game-2d-map-assets/scripts/compose_layered_preview.py --help
```

Read `--help` before inventing flags. Requires Pillow (and script-local deps).

### 5. Verify + deliver

- Seam QC, alpha edges, naming, residual defects
- Land with atomic commits and a revert-safe PR outcome L1/L2/L3 when committing to a title repo

## Provenance

Extract/preview scripts adapted from MIT **agent-sprite-forge** (see
`scripts/LICENSE-agent-sprite-forge` and [SOURCE.md](SOURCE.md)). Method is
Sylphx-native and Keel-aligned.

## Output

Tile/prop paths, preview composites, QC notes, residuals.

## Absorbed depth (Keel-native)

- [references/map-pipeline-selection.md](references/map-pipeline-selection.md)
- [references/layered-map-contract.md](references/layered-map-contract.md)
- [references/prop-pack-contract.md](references/prop-pack-contract.md)

Default `engine_target` for Sylphx work is **Keel title assets + World geometry**, not Phaser/Godot/Unity.
