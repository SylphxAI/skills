---
name: produce-game-2d-sprites
description: "Produce engine-ready 2D character, VFX, HUD, and icon sprites, including animation sheets and loop QC. Use when the user asks for a sprite sheet, idle/walk/attack cycle, chroma-key frames, video-to-sprite, or a game atlas. Do not use for map tilesets, 3D models, or marketing screenshots."
---

# Produce Game 2D Sprites

Use the package scripts for layout, chroma/alpha, sheet extraction, and video-to-sheet. Read each script's `--help` first. A sheet that does not loop, pivot, or name on the engine contract is concept art.

- [sprite processing](scripts/generate2dsprite.py)
- [layout guide](scripts/make_layout_guide.py)
- [video conversion](scripts/video2dsprite.py)

Open [engine-ready defaults](references/engine-ready-defaults.md) and [modes, actions, and bundles](references/modes-actions-bundles.md) for the selected action. Open [character consistency](references/character-consistency.md) for recurring identity. Open [animation loop QC](references/animation-loop-qc.md) for motion. See [script source](references/source.md) for license.

Use `produce-game-2d-map-assets` for tiles and maps. Use `produce-product-assets` for store and campaign art.
