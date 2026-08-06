---
name: produce-game-2d-map-assets
description: "Produce 2D map tiles/props packs: layered sheets, magenta prop extract, previews for title/Keel assets."
---

# Produce Game 2D Map Assets

When you need **2D map tiles, terrain sheets, or prop packs** for a game title,
run this job. Own art production and packing helpers; Keel pack owns shipping
shells and multi-platform emit.

## When to use

- Tileable terrain/water/walls and prop sheets for 2D/2.5D maps
- Extracting transparent props from solid-magenta packs
- Layered map previews for art direction QC

## Not this job

- Full game design thesis → `design-game`
- Character sprite cycles → `produce-game-2d-sprites`
- Marketing/store captures → `produce-product-assets`

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

### 2. Defaults
- Terrain: seamless, non-directional lighting when rotation may apply
- Props: isolated on `#FF00FF` for extract; no baked text
- Verify tile seams with real 2×2 (or larger) composites

### 3. Generate / assemble
- Use host image tools when available; keep style contract with sprites
- Prefer compositional assembly when generators fail seam/identity checks

### 4. Scripts

```bash
python3 skills/produce-game-2d-map-assets/scripts/extract_prop_pack.py --help
python3 skills/produce-game-2d-map-assets/scripts/compose_layered_preview.py --help
```

Read `--help` before inventing flags. Requires Pillow (and script-local deps).

### 5. Verify + deliver
- Seam QC, alpha edges, naming, residual defects
- Land with `source-authoring-standard` L1/L2/L3 when committing to a title repo

## Soft composition

- `produce-game-2d-sprites` — character/FX sheets sharing the same art contract
- `design-game` / `finish-product` — world thesis and final fidelity
- Keel pack documentation for packaging—not a second art pipeline

## Provenance

Extract/preview scripts adapted from MIT **agent-sprite-forge** (see
`scripts/LICENSE-agent-sprite-forge` and [SOURCE.md](SOURCE.md)). Method is
Sylphx-native and Keel-aligned.

## Output

Map Asset Pack: tile/prop paths, seam QC notes, extract parameters, residuals.
