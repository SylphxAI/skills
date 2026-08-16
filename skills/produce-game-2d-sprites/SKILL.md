---
name: produce-game-2d-sprites
description: "Produce engine-ready 2D game sprites/sheets with QC."
---

# Produce Game 2D Sprites

Produce engine-ready 2D characters, creatures, props, projectiles, effects,
animation sheets, HUD art, and icon sets.

## Method

1. Define subject, action, style, view, frame count, grid, loop behavior, size,
   naming, engine import needs, and expected files.
2. Open [engine-ready defaults](references/engine-ready-defaults.md) and the
   relevant mode or action in
   [modes, actions, and bundles](references/modes-actions-bundles.md).
3. Generate or edit assets with the host image tools. Use reference images and
   the [character consistency method](references/character-consistency.md) for
   recurring identity.
4. Use the package scripts for layout guides, chroma/alpha processing, sheet
   extraction, and optional video-to-sheet conversion when their documented
   inputs match the job. Read each script's `--help` first:
   [sprite processing](scripts/generate2dsprite.py),
   [layout guide](scripts/make_layout_guide.py), and
   [video conversion](scripts/video2dsprite.py).
5. Check subject isolation, transparent edges, cell size, frame alignment,
   scale, silhouette, pose continuity, action readability, palette, and import
   behavior. Use [animation loop QC](references/animation-loop-qc.md) for motion.
6. Deliver files in the product repository's established asset layout with the
   frame, pivot, timing, loop, and import metadata its runtime consumes.

## References

- [Prompt guidance](references/prompt-rules.md)
- [Character consistency](references/character-consistency.md)
- [HUD and icon art](references/game-ui-icons-and-hud-art.md)
- [Animation loop QC](references/animation-loop-qc.md)
- [Video-to-sprite pipeline](references/video-to-sprite-pipeline.md)
- [Source and license](SOURCE.md)

## Output

Return engine-ready asset paths, sheet/frame metadata, checks performed, and
material residuals.
