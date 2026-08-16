---
name: produce-game-2d-map-assets
description: "Produce engine-ready 2D map tilesets, props, layers, collision metadata, and composed previews. Use for tilemaps and placement packs; use produce-game-2d-sprites for character or HUD art and produce-product-assets for store or marketing media."
---

# Produce Game 2D Map Assets

Produce engine-ready 2D map foundations, tilesets, props, layers, placement,
collision metadata, and visual previews for the selected game pipeline.

## Method

1. Open [map pipeline selection](references/map-pipeline-selection.md) and choose
   the map, visual, runtime-object, collision, and engine models.
2. Define camera, canvas, tile size, atlas layout, style, terrain, props,
   interaction, placement, collision, zones, exits, and expected files.
3. For layered maps, follow the
   [layered map contract](references/layered-map-contract.md). For prop packs,
   follow the [prop pack contract](references/prop-pack-contract.md).
4. Generate visual assets with the host image tools or user-supplied art.
   Runtime-controlled objects receive separate assets or editable layers.
5. Use the package scripts for extraction and preview composition when their
   documented input matches the job. Read each script's `--help` first:
   [extract prop pack](scripts/extract_prop_pack.py) and
   [compose layered preview](scripts/compose_layered_preview.py).
6. Check seams, alpha edges, alignment, scale, palette, render order, object
   isolation, collision, naming, and a composed gameplay preview using
   [tileset and prop QC](references/tileset-and-prop-qc.md).
7. Deliver the assets in the product repository's established asset and scene
   layout with placement and collision data.

## References

- [Layered map notes](references/layered-map-notes.md)
- [Map pipeline selection](references/map-pipeline-selection.md)
- [Layered map contract](references/layered-map-contract.md)
- [Prop pack contract](references/prop-pack-contract.md)
- [Tileset and prop QC](references/tileset-and-prop-qc.md)
- [Source and license](SOURCE.md)

## Output

Return asset paths, engine/scene data, preview paths, checks performed, and
material residuals.
