# Prop Pack Contract

The product repository selects the runtime and owns playable geometry. A
playable layered title ships structured map artifacts; a flat-background title
may use one baked image.

Prop packs batch multiple small static map props into one generated sheet, then extract each cell into a transparent prop PNG. Square prop packs are for compact props only, not for floors, platforms, bridges, walls, or other wide/collision-critical scene objects.

Use prop packs to reduce repeated image-generation calls and prompt overhead. They trade per-prop control for speed, so use them only when the props can share one style, scale, perspective, and quality bar.

## When To Use

Good candidates:

- rocks, shrubs, flowers, mushrooms, logs
- crates, barrels, sacks, pots
- small signs, lamps, lanterns, fences, posts
- floor ornaments, small statues, ruins, debris
- repeated environmental dressing for one biome

Choose a specialized asset format for:

- buildings, gates, trees with wide canopies, bridges
- floors, walkable platforms, terrain chunks, ledges, wall runs, rails, ladders, road segments, fence rows, long spike traps, pipes, conveyors, ramps, slopes, or any long horizontal object
- hero objects, key story artifacts, readable statues
- animated props or props with multiple states
- props requiring exact silhouette, scale, or identity
- props that are too wide/tall for equal square cells
- props that must line up exactly with collision, walkable edges, build pads, doorways, gate openings, checkpoints, hazards, exits, or engine editor handles

## Asset strategy selection

Classify every object before choosing a generation shape:

- `compact_prop`: small/medium, roughly square or vertical, decorative or simple blocker, no exact edge alignment requirement.
- `wide_or_long_object`: expected aspect ratio wider than about `1.6:1`, such as floors, platforms, bridges, ledges, wall runs, fence rows, long traps, rails, pipes, roads, conveyors, or long signs.
- `tall_or_large_object`: expected aspect ratio taller than about `1.6:1` or visually dominant, such as buildings, gates, large trees, towers, doors, banners, statues, or shrine pieces.
- `collision_bearing_object`: must align with collision, walkable edges, build pads, hazards, doors, gates, checkpoints, exits, or engine handles.
- `tileset_or_strip_piece`: should repeat or assemble from caps, middles, corners, slopes, tops, sides, or tile pieces.

Only `compact_prop` objects may use square `2x2`, `3x3`, or `4x4` prop packs. Everything else must use one-by-one generation, a strip/tileset workflow, custom wide cells, or engine-native tile/object layers.

Use one strategy class per sheet. Small rocks, crates, lamps, and grass can share a compact-prop sheet; platforms, floor pieces, gates, ladders, and spike hazards use their specialized formats.

## Sheet Size Selection

- `2x2`: 4 props, safest batch size.
- `3x3`: 9 props, best default for compact small/medium environmental sets.
- `4x4`: 16 props, only for very simple small props with strong margins.
- `1x3 platform strip`: non-actor left cap, middle repeat, right cap for walkable floors/platforms.
- `1x4 platform strip`: non-actor left cap, middle repeat, right cap, plus one slope/corner/end variant. This is not an animation-frame format.
- `custom_wide_pack`: several related wide props using explicit wide cells such as `768x256`, `1024x384`, or another non-square cell size.

Use `3x3` by default only when the user asks for a set of compact map props and does not specify count.
Use one-by-one, platform strips, custom wide packs, or tile/object layers instead of a square pack for hero props, wide gates, buildings, wide trees, floors, platforms, bridges, walls, long hazards, ladders, or anything that must line up exactly with collision.

If a square pack fails because a wide or tall object touches the cell edge, preserve the QC boundary, reclassify the object, and regenerate it one-by-one, in a platform strip or custom wide pack, or through a tile/object-layer workflow.

## Prompt Pattern

For `3x3` and `4x4` packs, create a layout-only guide first with
`produce-game-2d-sprites`:

```bash
python3 skills/produce-game-2d-sprites/scripts/make_layout_guide.py \
  --rows <ROWS> \
  --cols <COLS> \
  --cell-width 384 \
  --cell-height 384 \
  --output assets/props/raw/<name>-layout-guide.png
```

Make the guide visible before image generation. Tell the model to use it only for invisible slot count, spacing, centering, and safe padding. The output contains only the requested assets on the intended background, with guide geometry kept invisible.

```text
Create exactly one <ROWS>x<COLS> prop sheet for a top-down 2D RPG map.
Each cell contains one separate static environmental prop from this list, in row-major order:
1. <prop>
2. <prop>
...
All props share the same biome, palette, camera angle, selected map art style, and scale.
Use clean hand-painted HD 2D game asset style by default: crisp silhouettes, smooth surfaces, low texture noise, and controlled accent lighting. Use pixel art when the user selects that style.
Use a mostly front-facing top-down RPG object view: upright objects are vertical and centered, with only a small visible top face. Reserve strong diagonal rotation and diamond-shaped crates or barrels for an explicitly selected isometric style.
Full object visible, centered in its own cell, crisp but not chunky outlines.
Each prop must fit fully inside the central 50% to 60% of its cell with generous flat magenta gutters on all four sides.
No prop, branch, roof, sign, glow, cable, smoke, sparkle, shadow, or fragment may touch or cross a cell edge.
This square prop sheet contains compact props. Floors, platforms, bridges, wall runs, ladders, long hazards, gates, doors, buildings, wide trees, roads, ramps, slopes, and objects needing exact collision or walkable-edge alignment use a strip, tileset, custom pack, or one-by-one workflow.
Background must be 100% solid flat #FF00FF magenta in every cell, no gradients, no texture, no shadows, no floor plane.
No text, labels, UI, watermark, numbers, arrows, borders, grid lines, or readable letters.
```

If a cell should stay empty, explicitly say `empty magenta cell`.

## Platform Strip Prompt Pattern

For repeatable floors, platforms, bridges, or terrain chunks, use a strip or tileset-like atlas with wide cells and a layout guide:

```text
Create exactly one 1x3 platform strip asset sheet for a 2D game map.
Cells, left to right:
1. left end cap of the platform
2. seamless middle repeat segment
3. right end cap of the platform

Each cell is a wide non-square cell, intended for platform/floor collision alignment.
Every segment must have a perfectly horizontal walkable top edge at the same y-position across all cells.
The middle segment must tile seamlessly left-to-right.
No segment may touch or cross its cell edge except intentional seamless side edges on the middle repeat cell.
Use solid flat #FF00FF magenta background, no floor plane, no shadows, no labels, no UI, no guide lines.
```

Reserve `1x4` for non-actor platform strips that need a slope, corner, broken variant, or underside piece. Generate unique, large, or especially important platforms one-by-one on a wide canvas. Use character and animation workflows for characters, enemies, creatures, NPCs, summons, and animated body assets.

## Extraction

The extract script includes built-in solid-magenta chroma cleanup. Prefer a
hard-key first; if fringe remains after visual QC, regenerate the sheet with a
flatter `#FF00FF` background or tighten thresholds via the script flags.

```bash
python3 skills/produce-game-2d-map-assets/scripts/extract_prop_pack.py \
  --input assets/props/raw/forest-props-sheet.png \
  --rows 3 \
  --cols 3 \
  --labels mossy-rock,shrub,fallen-log,small-lantern,wooden-sign,flower-patch,stump,crate,grass-tuft \
  --output-dir assets/props \
  --component-mode largest \
  --component-padding 8 \
  --min-component-area 200 \
  --reject-edge-touch
```

Output shape:

```text
assets/props/<label>/prop.png
```

When a target engine consumes an inventory file, add
`--manifest assets/props/forest-prop-pack.json`. That file contains source cell
coordinates, crop boxes, alpha bounds, extracted image size, component counts,
and `edge_touch` flags.

When large props touch cell edges, regenerate with precise occupancy wording
such as `each prop fits inside the central 50% of its cell`. Keep only complete,
intentional assets in the accepted pack.

## Placement

After extraction, create placement JSON:

```json
{
  "props": [
    {
      "id": "mossy-rock-1",
      "image": "assets/props/mossy-rock/prop.png",
      "x": 420,
      "y": 512,
      "w": 96,
      "h": 72,
      "sortY": 512,
      "layer": "props"
    }
  ]
}
```

Then compose a QA preview with
`skills/produce-game-2d-map-assets/scripts/compose_layered_preview.py`.

## QC Rules

Accept the pack when:

- every accepted prop has `edge_touch: false`
- labels match the requested cells
- each prop contains the requested object on its intended clean background
- prop identity remains object-like and consistent
- each prop fits the intended placement scale
- a square pack contains only compact props; specialized shapes use their
  corresponding strip, tileset, custom-pack, or one-by-one workflow

For noisy particles or edge debris, reprocess with `--component-mode largest`. For intentional multi-part props, use `--component-mode all` and increase the prompt margin.
