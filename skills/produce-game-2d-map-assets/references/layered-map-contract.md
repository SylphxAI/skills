# Layered Raster Map Contract

The product repository selects the runtime and owns playable geometry. A
playable layered title ships structured map artifacts; a flat-background title
may use one baked image.

Use this contract for hand-painted or generated 2D RPG scenes, monster-taming exploration maps, shrine/town/dungeon maps, and any top-down scene where actors must interact with props.

## Layer Types

1. `base`: one raster image containing only terrain and ground-level details.
2. `props`: transparent sprites anchored in map coordinates.
3. `actors`: player, NPCs, monsters, pickups, and moving objects.
4. `foreground`: optional transparent sprites that must cover actors.
5. `collision`: structured metadata, not pixels.
6. `zones`: structured metadata for encounters, rest, triggers, exits, and dialogue.
7. `preview`: flattened QA artifact only.

## Base Map Prompt Pattern

Default to clean HD maps for gameplay readability unless the user explicitly asks for pixel art:

```text
Create a clean hand-painted top-down 2D RPG game map.
This is a BASE GROUND MAP ONLY for a layered raster exploration scene.
Style: clean HD game asset style, sharp readable terrain shapes, crisp silhouettes, smooth painted surfaces, low texture noise, controlled accent lighting.
Use smooth hand-painted HD forms, crisp silhouettes, controlled texture, clear spacing, and restrained environmental detail.
Include terrain, paths, grass/water/floor materials, ground markings, floor patterns, and flat anchor pads.
Keep the base layer to ground terrain and low non-collidable detail. Place buildings, gates, fences, lanterns, trees, signs, barrels, actors, UI, and text in their appropriate separate layers.
Leave clear empty spaces where props will be placed later.
Make walkable paths and zone boundaries easy to trace.
```

If the user wants a pixel-adjacent look, use `clean modern pixel-art-inspired`
with broad clean clusters, restrained dithering, and restrained microtexture.
Use `16-bit pixel art`, `retro JRPG pixel art`, or similar terms only when the
user explicitly asks for a retro pixel look.

## Prop Generation

Use `produce-game-2d-sprites` when the map needs reusable transparent props.
Choose one of two approaches:

- One-by-one props: safest for large, important, irregular, animated, or identity-critical props.
- Prop packs: faster for sets of small/medium static environmental props.

Read [prop-pack-contract.md](prop-pack-contract.md) before batching props.

## Dressed Reference Pass

For generated layered raster maps, use a dressed reference pass before final prop extraction:

1. Generate the base as ground-only terrain.
2. Make the base visible to built-in `host image generation tools`. When the base is a local file, call `read_file` first and pass the resulting visual reference to generation.
3. Ask for a dressed-reference version of the same map by adding props only.
4. Preserve exact camera, framing, dimensions, terrain, paths, water, anchor pads, collision-relevant boundaries, and map edges.
5. Use the dressed reference to choose prop identities and placement coordinates, but compose the final runtime preview from the original base plus extracted transparent props.

The dressed reference is a planning artifact. Build the runtime map from separate props whenever collision, y-sort, occlusion, or reuse applies.

Prompt shape:

```text
Use the image just shown as the exact base map reference.
Create a dressed-reference version of the same map by adding props only.
Preserve exactly: camera, framing, image size, terrain, paths, water, anchor pads, rocks, map boundaries, and all walkable routes.
Preserve the exact terrain crop, scale, rotation, pixels, and design.
Add these props naturally on top of the existing map: <list>.
Props should feel intentionally placed along paths, landmarks, encounter-zone edges, rest points, and entrances.
No UI, no text, no labels, no watermark.
```

## One-By-One Prop Prompt Pattern

```text
Create a single <prop> prop for a top-down 2D RPG map.
Use the same selected map art style: clean HD hand-painted by default, pixel-inspired only when requested, retro pixel only when explicitly requested.
Mostly front-facing top-down RPG object view: upright objects are vertical and centered, with only a small visible top face and restrained diagonal rotation.
Full object visible, centered, crisp but not chunky outlines.
Background must be 100% solid flat #FF00FF magenta, no gradients, no texture, no shadows, no floor plane.
No text, labels, UI, or watermark.
Entire prop must fit fully inside the image with generous magenta margin on all sides; no part may touch or cross the image edge.
```

Recommended processing:

```bash
python /path/to/generate2dsprite.py process \
  --input <raw.png> \
  --target asset \
  --mode single \
  --rows 1 \
  --cols 1 \
  --cell-size 256 \
  --output-dir assets/props/<prop> \
  --fit-scale 0.9 \
  --align feet \
  --component-mode largest \
  --component-padding 8 \
  --min-component-area 200 \
  --threshold 100 \
  --edge-threshold 150 \
  --edge-clean-depth 2
```

Use a larger `--cell-size` for buildings, trees, gates, statues, or large signs.

## Prop Metadata

Use explicit map-space dimensions:

```json
{
  "props": [
    {
      "id": "torii",
      "image": "assets/props/torii/prop.png",
      "x": 836,
      "y": 850,
      "w": 380,
      "h": 306,
      "sortY": 850,
      "layer": "props"
    }
  ]
}
```

Anchor conventions:

- `x`: center of the prop's base/feet.
- `y`: bottom of the prop in map coordinates.
- `w`, `h`: rendered size in map units.
- `sortY`: y-depth used for render ordering. Use base `y` for normal props.
- `layer`: `props` for y-sorted objects, `foreground` for always-over actors overlays.

## Render Order

Recommended order:

```text
base map
ground effects / zone glimmers
renderables sorted by sortY:
  props
  actors
foreground overlays
debug collision
HUD/UI
```

If an NPC must always appear above the player, draw that NPC after the y-sorted pass or set a high `sortY`.

## Collision Metadata

Keep collision readable and hand-editable:

```json
{
  "mapSize": { "width": 1672, "height": 941 },
  "spawn": { "x": 836, "y": 782 },
  "walkBounds": [
    { "id": "main-courtyard", "type": "ellipse", "x": 838, "y": 548, "rx": 604, "ry": 304 }
  ],
  "blockers": [
    { "id": "torii-left-pillar", "type": "rect", "x": 704, "y": 668, "w": 52, "h": 176 }
  ],
  "zones": {
    "grass": { "type": "rect", "x": 180, "y": 306, "w": 382, "h": 302 },
    "rest": { "type": "circle", "x": 760, "y": 548, "radius": 122 }
  }
}
```

Guidelines:

- Use blockers for prop bases, not full sprite silhouettes.
- Keep entrances open by testing path centers.
- Use ellipses for lanterns, rocks, trees, and basins.
- Use rectangles for fences, walls, buildings, gates, bridges, and posts.
- Use polygons only when rects/ellipses produce poor walkability.

## Preview Composition

Use `skills/produce-game-2d-map-assets/scripts/compose_layered_preview.py` to
flatten a base map and placement JSON:

```bash
python3 skills/produce-game-2d-map-assets/scripts/compose_layered_preview.py \
  --base assets/map/shrine-base.png \
  --placements data/shrine-props.json \
  --output assets/map/shrine-layered-preview.png
```

The script assumes prop placement uses center-bottom anchoring unless a prop explicitly sets another anchor.

## QA Checklist

- Spawn point is walkable.
- Main path centers are walkable.
- Gate centers are walkable if the player should pass through.
- Gate pillars block.
- Fences block but entrances remain open.
- Interactables block at their base but can be approached.
- Encounter/rest zones are reachable.
- Actors sort correctly when walking in front of and behind tall props.
- The flattened preview matches the in-game layered render closely enough for visual review.

## Delivery shape

- Generate props as independent transparent assets.
- Keep layered sources whenever collision or occlusion matters.
- Keep text, signs, UI, NPCs, and monsters in their owning layers.
- Preserve clear padding around each prop sprite.
- Define collision from gameplay geometry.
- Update collision and critical-point tests with related art changes.
