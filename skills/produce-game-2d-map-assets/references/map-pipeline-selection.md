# Map Pipeline Selection

Choose a product-level `map_mode`, then map it to the visual, object,
collision, and engine axes. Playable maps use runtime structure in addition to
their visual art. A baked image is complete by itself when the requested
product is a fixed background.

## Core Map Modes

Use these modes as the first decision layer:

- `tile_mode`: editable tile/grid maps. Use for Pokemon-like routes, top-down RPG towns, monster-taming exploration, platformer tilemaps, tactical maps, factory maps, and projects that already use Tiled, Godot TileMap, Unity Tilemap, or equivalent tilemaps.
- `scene_mode`: foundation/base map plus separate props. Use for tower defense, survivors-like arenas, cozy/top-down showcase maps, visual adventure scenes, and base-map-plus-props requests.
- `side_scroll_mode`: parallax side-scroller scenes. Use for Mega Man-like, action platformer, Metroidvania side rooms, runners, side-view shooters, and brawlers.
- `grid_mode`: rule-heavy grid scenes. Use for tactical RPGs, factory/automation games, board/card battlers, build grids, terrain-cost maps, and resource maps.
- `room_chunk_mode`: modular room/chunk generation. Use for roguelike rooms, dungeon chunks, procedural level assembly, and Metroidvania room networks.
- `baked_scene_mode`: fixed visual backgrounds for title screens, visual novel backgrounds, point-and-click scenes, boss arena concept art, showcases, and explicit flat-image requests.

After choosing a mode, define its `visual_model`, `runtime_object_model`,
`collision_model`, and `engine_target`.

## Playable Map Default

For a playable map, level, stage, room, prototype, or engine scene, deliver a
background or reference image together with explicit runtime structure:

- top-down maps: ground/base layer plus separate props, object placement, collision, zones, exits, and spawn data
- side-view scrolling/action stages: background/parallax layers plus an in-world stage reference mockup, platform objects or walkable lanes, terrain chunks, foreground occluders, hazards, doors, pickups, checkpoints, scene hooks, camera bounds, and collision
- tile/editor workflows: generated or supplied tileset art plus tile layers, object layers, collision, zones, and engine-native scene/map data

When the request mentions "game", "playable", "prototype", "level", "stage",
"side-view action", "side-scroller", "platformer", "Megaman-like", "RPG
exploration", "tower defense", or engine integration, start from the nearest
playable preset below. Select `baked_raster` for a fixed visual background.

## Mode Deliverable Contracts

### `tile_mode`

Deliver tileset art, map data, tile layers, object layers, collision, exits, and a preview. Good output formats include Tiled JSON, Godot TileMap, Unity Tilemap, or an equivalent engine-native format.

Use the `produce-game-2d-sprites` processing script for reusable transparent
props, NPCs, animated objects,
or scene objects outside the tile set. A pure terrain map can stay tileset +
map data + collision metadata.

### `scene_mode`

Deliver a foundation-only base map, an in-world dressed reference, final separate props/interactables/blockers, placement metadata, collision/zones/exits/camera bounds, and a composed QA preview.

This is the default for beautiful top-down demos, tower defense scenes, survivors-like arenas, and base-map-plus-props workflows.

### `side_scroll_mode`

Deliver scenery-only parallax layers plus separate playable foreground objects. Typical visual layers:

- `sky`
- `far_bg`
- `mid_bg`
- `near_bg`
- optional `foreground_overlay`

Then deliver platform tiles/objects, terrain chunks, hazards, doors,
checkpoints, pickups, exits, camera bounds, scroll factors, collision, scene
hooks, and a QA preview. Runtime object and tile layers own collision; parallax
layers own visual depth.

Choose one `stage_canvas` before generation. The primary parallax plates, stage reference, and QA preview must share the same pixel dimensions, aspect ratio, camera framing, horizon, and top-left anchor. Default to the project camera aspect ratio; when unknown, use a 16:9 side-scroller canvas such as `1536x864`.

For brawlers, use the same mode but replace jump-platform geometry with a walkable belt polygon, foreground/background props, enemy wave zones, and camera locks.

### `grid_mode`

Deliver grid dimensions, cell size, tiles/cells, terrain metadata, walkable/buildable flags, movement cost, resource or terrain effects, collision, object layers, and a preview with optional debug overlay.

Prioritize validation over beauty. The map must be readable by game logic.

### `room_chunk_mode`

Deliver reusable room/chunk art or tile/object layers, chunk dimensions, exits, connection sockets, collision, spawn markers, camera bounds, and seam validation. If multiple chunks exist, also deliver an assembled layout preview.

### `baked_scene_mode`

Deliver a fixed image plus optional coarse collision or zones. Select an
editable mode for maps whose objects or collision change at runtime.

## Visual Asset Source

Default to built-in image generation for visual assets. Base maps, in-world reference mockups, dressed references, stage references, prop sheets, prop sprites, tileset art, parallax layers, and battle backgrounds should come from `host image generation tools` unless the user supplies existing art or explicitly asks for procedural placeholders.

Scripts may slice, assemble, chroma-key, validate, compose previews, create
metadata, and emit engine files. Image generation or user-supplied art owns
the final creative visuals. Engine outputs such as Godot `.tscn`, Tiled JSON,
or Unity placement data wire those assets into the runtime.

## In-World Reference Mockups

Use an in-world reference mockup whenever object placement must be visually coherent but the final runtime needs separate objects.

- Top-down layered maps use `assets/map/<name>-dressed-reference.png`: base map plus proposed props rendered as natural game-world objects.
- Side-view scrolling/action stages use `assets/map/<name>-stage-reference.png`: background/parallax base plus proposed platforms or walkable lanes, hazards, pickups, doors, checkpoints, gates, and exits rendered as natural game-world objects or subtle in-world blockout geometry.
- Reference mockups must preserve exact camera, framing, dimensions, terrain/background, entrances, exits, and collision-relevant boundaries from the base image.
- Reference mockups should include at most 9 distinct visible runtime prop/object candidates unless the user explicitly asks for a larger pass. Repeated placements of the same object count as one candidate and should be repeated later in placement metadata.
- Reference mockups are planning artifacts. Runtime maps use separately authored assets, object placement, and explicit collision.
- Final output must still use separate props/platform objects, scene-object metadata, collision, zones, scene hooks, tile/object layers, or engine-native nodes.
- Character, enemy, boss, projectile, player, NPC, and animation sprites belong
  to `produce-game-2d-sprites`. Store actor spawn markers and encounter/arena
  hooks as metadata in the map deliverable.
- Render reference mockups as the natural game world, with scene objects in place and a clean image surface.
- Continue from the reference mockup to final runtime assets and metadata. A reference-only request ends with the concept image.

## Visual Reference Handoff

Reference mockups must be generated from the actual visible base/background image:

1. Save the base/background image first.
2. Immediately before the reference-mockup `host image generation tools` call, make the exact image visible in conversation context. For local files, call `read_file` on the saved image.
3. The next image prompt must explicitly say to use the visible image immediately above as the visual reference.
4. The prompt must name concrete features from the viewed image to preserve: camera framing, dimensions, horizon, terrain boundaries, road/water shapes, entrances, exits, major silhouettes, and landmark positions.
5. The prompt must ask for an in-world reference mockup rendered as a clean game scene.
6. The prompt should render visible scene objects: props, platforms, terrain chunks, hazards, gates, pickups, checkpoints, doors, exits, foreground occluders, or subtle blockout geometry.
7. Write player spawns, actor spawn markers, camera bounds, patrol hints, and encounter/arena triggers later as scene-hook metadata.

Use the visible image and concrete visual features as the reference. Make the
image visible in context immediately before generating the dressed or stage
reference.

## Layer Separation Contract

For any playable or editable layered map, keep runtime-controlled objects in
separate object, tile, or sprite layers. The first generated foundation image
contains terrain and scenery across top-down RPG maps, monster-taming maps,
tactical arenas, tower-defense lanes, side-view platformers, parallax stages,
tile/editor workflows, clean HD, pixel-inspired, and retro pixel art.

Allowed in the base/background/foundation layer:

- top-down or 3/4 maps: ground material, paths, roads, water, cliffs, low terrain markings, floor patterns, and terrain boundaries
- tactical or tower-defense maps: ground, lanes, roads, build pads, lane markings, terrain zones, and non-interactive floor detail
- side-view stages: sky, far/mid scenery, distant buildings, distant terrain silhouettes, atmosphere, and non-colliding depth
- tilemaps: tileset art and editable tile layers

Place these elements in runtime-controlled layers for playable maps:

- tall props, buildings, trees, rocks, crates, signs, doors, gates, pickups, chests, checkpoints, hazards, traps, turrets, tower objects, ladders, foreground occluders, destructibles, actors, enemies, NPCs, bosses, player characters, UI, labels, or any object that needs collision, interaction, replacement, reuse, y-sorting, animation, engine editing, or independent render order

If a generated base/background contains runtime-controlled objects, regenerate a cleaner foundation-only base or demote that image to a concept/reference artifact. Proposed objects belong in the in-world reference mockup, then in final separate props, platform objects, object layers, tile layers, collision, zones, and scene-hook metadata.

## Side-Scroll Parallax Contract

`side_scroll_mode` uses a layered parallax depth stack as a core stage-building method.

Typical layer responsibilities:

- `sky`: sky, moon/sun, far atmosphere; scroll factor near `0.0` to `0.1`.
- `far_bg`: mountains, skyline, far castle/factory silhouettes; slow scroll factor.
- `mid_bg`: readable landmarks and large distant structures; medium scroll factor.
- `near_bg`: near non-colliding scenery behind gameplay objects; faster scroll factor but still not collision.
- `foreground_overlay`: optional fog, chains, pipes, silhouettes, smoke, or framing elements that render above actors as visual, non-collision layers.

Generate parallax layers as scenery art. Place platforms, walkable floors,
ladders, hazards, gates, doors, pickups, checkpoints, and collision-critical
props in platform, object, or tile layers.

All primary parallax plates use the same `stage_canvas`. If image generation
returns inconsistent dimensions, regenerate or normalize the layer before
runtime use. Record display size, anchor, scale, repeat axis, and loop policy
when a repeatable strip uses a different source width.

The final side-scroller should feel deeper than a single flat image: distant layers move slowly, near layers move faster, and gameplay objects stay on their own runtime layer.

## Side-View Background Separation

For playable side-view scrolling/action stages, the general layer separation contract becomes stricter: the background is scenery-only. It should be a far/mid depth plate that separate runtime objects can stack over cleanly.

Allowed in the background:

- sky, clouds, mountains, distant city/castle silhouettes, far walls, smoke, weather, atmospheric depth, and non-colliding distant landmarks
- optional separate parallax midground/foreground layers when they are not gameplay geometry

Place these elements in foreground, object, or gameplay layers:

- walkable floors, platform tops, terrain chunks, ladders, spike traps, pickups, crates, doors, gates, checkpoints, near fences, near walls, foreground barricades, enemies, player characters, UI, labels, or any object that should be edited, collided with, reused, or rendered independently

If a generated side-view background contains foreground gameplay geometry,
use it as a concept reference and regenerate a scenery-only runtime
background. The final runtime background comes from the dedicated parallax or
scenery plates.

## Post-Reference Object Production

After a dressed reference or stage reference exists, continue into final runtime production:

1. Make both the original base/background and the dressed/stage reference mockup visible in conversation context. For local files, call `read_file` on both images immediately before object-list extraction or object/prop generation.
2. Create a concrete object list from the visible reference mockup while cross-checking the original base/background: object id, type, approximate position, approximate size, render layer, collision role, and asset strategy.
3. For each visible runtime object, generate a separate transparent asset, extract it from a generated pack, or represent it as a tile/object layer when the engine/editor pipeline is tile-based.
4. Every object/prop image prompt must explicitly state that the visible original base/background and visible reference mockup above are the visual context. The generated asset must match the original map style and correspond to an object visible in the reference mockup.
5. Generate or define final runtime art for the props, platforms, terrain chunks, hazards, pickups, doors, gates, checkpoints, exits, foreground occluders, and other visible scene objects.
6. Write placement metadata, object layers, collision data, scene hooks, camera bounds, exits, and zones.
7. Compose a QA preview from the original base/background plus the final runtime objects.

For playable maps, layered maps with props, side-view stages, engine scenes,
and editable-prop requests, complete the runtime assets and metadata after the
reference mockup.

For prop or object packs, derive the object list and prompt from the visible
reference mockup and original base/background.

## Visual Model

### `baked_raster`

Use when:

- the scene is static, decorative, fixed-screen, or visual-first
- the game needs a battle background, title scene, menu backdrop, cutscene, or quick prototype
- collision is absent or can be represented by a few invisible shapes
- the user explicitly asks for a single flat image or background

Deliver one image generated or edited through image generation, plus optional collision/zones metadata.

For platformers, RPG exploration, tower defense, and other interactive scenes,
use a layered visual model that gives props, platforms, hazards, exits, and
interactables independent runtime control.

### `layered_raster`

Use when:

- a hand-painted or generated base map is best, but tall objects need collision, occlusion, interaction, reuse, or later editing
- the scene is an RPG town, shrine, dungeon room, field, interior, or monster-taming exploration map
- y-sorted actors should walk in front of and behind props

Deliver an image-generated ground-only base image, separate image-generated props, placement metadata, collision/zones metadata, and a flattened preview.

The base image must be foundation-only: terrain, roads, water, floor markings, and boundaries are allowed; tall props, buildings, trees, signs, doors, chests, pickups, actors, hazards, and occluders must be separate assets or object/tile layers.

### `tilemap`

Use when:

- the engine/editor already uses Tiled, Godot TileMap, Unity Tilemap, or similar tooling
- the user asks for tiles, tilesets, tile collision, autotiling, or editable grid-perfect maps
- procedural generation, large maps, or editor workflows matter

Deliver image-generated or user-supplied tileset images, engine-native map
data, tile layers, object layers, and tile/object collision. Procedural drawing
is appropriate when the requested output is a procedural placeholder.

Preserve tile layers, object layers, collision-relevant props, pickups, doors,
hazards, and interactables as independent runtime elements.

### `layered_tilemap`

Use when:

- the game needs multiple tile layers such as ground, decor, walls, overhead, and foreground
- actors need to pass under selected tile layers
- collision and triggers are tile/object-layer driven

Deliver image-generated or user-supplied tileset art, layered tile data, and a render-order contract.

### `parallax_layers`

Use when:

- the map is a side-scroller, platformer, runner, shooter, side-view brawler, scrolling action stage, or scrolling backdrop
- background depth matters more than top-down collision

Deliver image-generated background, midground, foreground, and scroll-speed metadata.

For a playable side-view scrolling/action stage, parallax layers are only the scenery. Generate an in-world stage reference mockup from the visible background using the visual reference handoff, then continue through post-reference object production. The playable stage still needs separate runtime objects for platforms or walkable lanes, terrain chunks, hazards, pickups, doors, checkpoints, gates, exits, scene hooks, camera bounds, and explicit collision.

The runtime background owns scenery. Put collidable foreground geometry and
reusable gameplay objects into `platform_objects`, tile/object layers, or
engine-native nodes.

For `side_scroll_mode`, use named parallax layers (`sky`, `far_bg`, `mid_bg`,
`near_bg`, optional `foreground_overlay`) plus explicit scroll factors, shared
`stage_canvas`, and loop/repeat policy. An explicit flat-background request can
use one scenery plate.

## Runtime Object Model

- `none`: the map is just a background or tile layers.
- `separate_props`: props are independent sprites with a static draw order.
- `platform_objects`: platforms, walkable lanes, terrain chunks, walls, hazards, foreground blockers, and other collidable stage geometry are independent runtime objects with placement and collision data.
- `y_sorted_props`: props and actors sort by base `y`; use for top-down RPG scenes.
- `interactive_scene_objects`: doors, pickups, switches, checkpoints, gates, destructibles, signs, exits, and other non-character scene objects with interaction or state.
- `foreground_occluders`: selected overlays always draw over actors.
- `scene_hooks`: metadata-only markers such as player spawn, actor spawn markers, encounter zones, patrol hints, arena triggers, camera bounds, exit links, and checkpoint ids. Generated actor art is optional.

Use the simplest model that can express collision and occlusion correctly.

## Collision Model

- `none`: visual-only maps and simple backgrounds.
- `coarse_shapes`: a few rectangles/ellipses for fixed arenas or decorative maps.
- `precise_shapes`: explicit blockers and walk bounds for layered RPG maps.
- `tile_collision`: collision stored per tile or tile layer.
- `polygon_walkmesh`: irregular walkable regions or constrained path maps.
- `trigger_zones`: encounter/rest/exit/dialogue areas; often combined with another collision model.

Define collision with explicit prop-base blockers and walkable navigation
zones.

## Engine Target

- Generic runtime: PNG assets, placement/collision metadata, and project render code.
- Tiled: Tiled-compatible tilesets, layers, objects, and custom properties.
- Godot: TileMap/scene data and image-generated or existing visual assets.
- Unity: Tilemap/sprite assets and placement data for the selected scene workflow.
- Existing project schema: preserve its established asset, layer, and scene contracts.

## Presets

### Fixed Battle Background

- `visual_model`: `baked_raster`
- `runtime_object_model`: `none`
- `collision_model`: `none` or `coarse_shapes`
- Typical deliverables: one PNG, optional zones.

### RPG Exploration Scene

- `visual_model`: `layered_raster`
- `runtime_object_model`: `y_sorted_props`
- `collision_model`: `precise_shapes + trigger_zones`
- Typical deliverables: base map, prop images, placement JSON, collision JSON, preview.

### Monster Grassland

- `visual_model`: `layered_raster`
- `runtime_object_model`: `y_sorted_props + interactive_scene_objects + scene_hooks`
- `collision_model`: `precise_shapes + trigger_zones`
- Good prop-pack candidates: rocks, shrubs, flowers, signs, small logs.

### Tile-Based Dungeon

- `visual_model`: `layered_tilemap`
- `runtime_object_model`: `interactive_scene_objects + scene_hooks`
- `collision_model`: `tile_collision + trigger_zones`
- Select this preset when the engine or editor supports tilemaps.

### Side-View Scrolling Stage

- `visual_model`: `parallax_layers`
- `runtime_object_model`: `platform_objects + interactive_scene_objects + scene_hooks + foreground_occluders`
- `collision_model`: `precise_shapes` or engine-native platform/object collision
- Typical deliverables: shared `stage_canvas`, separate parallax layers (`sky`, `far_bg`, `mid_bg`, `near_bg`, optional `foreground_overlay`) matching that canvas, scroll factors, in-world stage reference mockup, separate platform/terrain sprites, foreground pieces, hazards, pickups, doors, checkpoints, gates, exits, scene-hook metadata, camera bounds, collision metadata, and a stage preview.

### Side-View Action / Platformer Stage

- `visual_model`: `parallax_layers` or `layered_tilemap` if the engine/editor already uses tiles
- `runtime_object_model`: `platform_objects + interactive_scene_objects + scene_hooks + foreground_occluders`
- `collision_model`: `precise_shapes` or engine-native platform/object collision
- Applies to Megaman-like, Castlevania-like, Contra-like, side-view action, runner, shooter, and brawler stages across pixel art and clean HD styles.
- Required deliverables: shared `stage_canvas`, background/parallax art that matches that canvas, in-world stage reference mockup, separate platform or terrain-chunk sprites, hazard sprites, scene object placement data, scene-hook metadata, pickups/doors/checkpoints/gates when present, collision data, camera bounds, and a QA preview.
- The stage reference should plan up to 9 distinct visible object candidates by default. Represent repeated placements in metadata so one authored prop can serve many positions.
- A playable stage includes independent geometry and runtime objects in addition to its full-stage visual preview.

## Escalation Heuristic

Start with the smallest playable bundle that works:

1. non-playable background: `baked_scene_mode`
2. beautiful top-down or tower-defense demo: `scene_mode`
3. editable top-down/platform/grid map: `tile_mode`
4. playable side-view scrolling/action stage: `side_scroll_mode`
5. tactical/factory/board rules-first scene: `grid_mode`
6. procedural/modular room assembly: `room_chunk_mode`

================================================================================
