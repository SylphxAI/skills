# Video→sprite pipeline notes

Use this path when the host has video generation and ffmpeg. Export portable
RGBA sheets into the product repository's selected runtime layout.




# Video2dsprite pipeline

## End-to-end

```text
1. base still          image_gen / image_edit / existing PNG on #FF00FF
2. video               image_to_video  (6s default, 10s optional)
3. frames-raw          ffmpeg decode all frames (or fixed fps)
4. frames-clean        magenta flood-fill + light despill → RGBA
5. sample              even indices for N in {8,16,24,48}
6. normalize           crop alpha bbox → scale body height → feet line
7. export              sprite_XX.png, strip, grid, preview GIF
8. summary             README.txt
```

## Suggested folder layout

```text
<out_dir>/
  base/<name>-base.png
  video/<name>-6s.mp4
  frames-raw/frame_0001.png ...
  frames-clean/clean_0000.png ...
  sprite/
    sprite_01.png ...          # default small set if requested
    x16/sprite_01.png ...
    x24/...
    x48/...
    run-strip-8.png
    run-strip-16.png
    run-preview-24.gif
    ...
  prompt-used.txt
  README.txt
```

## ffmpeg extract

Processor shells out to `ffmpeg` when available:

```bash
ffmpeg -y -i video.mp4 -vsync 0 frames-raw/frame_%04d.png
```

If ffmpeg is missing, fail with a clear install message and preserve the source as the only frame authority.

## Chroma key

1. Treat near-magenta pixels as key candidates (hue distance + high magenta channel).
2. Flood-fill from image corners so interior magenta-ish costume bits are less likely to vanish.
3. Despill residual pink fringes toward neutral/transparent.
4. Write RGBA PNGs.

## Sampling

Even spacing including first and last:

```text
idx[i] = round(i * (total - 1) / (want - 1))  for i in 0..want-1
```

Export multiple `want` values in one run so the user can compare smoothness vs softness.

## Normalize (feet anchor)

1. Alpha bbox of cleaned frame
2. Scale so content height ≈ `body_height` (default 100 in a 128 cell)
3. Paste so bottom of content sits at `foot_y` (default 118)
4. Center horizontally

For `center` anchor, place bbox center at cell center instead.

## GIF duration defaults

| Frames | ms / frame (approx) |
| --- | --- |
| 8 | 80 |
| 16 | 60 |
| 24 | 40 |
| 48 | 25 |

Goal: roughly 0.6–1.2s visual loop for previews (not necessarily matching source video realtime).

## When not to use this pipeline

- Need hard pixel edges and fixed multi-row grids → `produce-game-2d-sprites`
- Map props / tilesets → `produce-game-2d-map-assets` + `produce-game-2d-sprites`
- Non-Grok agent without `image_to_video`
- User wants production-perfect hero kit with many actions — video path is locomotion experiment first



# Video2dsprite prompt rules

## Base still (`image_gen` / `image_edit`)

Required:

- Solid flat background `#FF00FF` (pure magenta), no gradient, no floor shadow if possible
- Full body, centered, generous margin on all sides
- Side or 3/4-side view for run/walk
- Same scale and costume the game already uses when a reference exists
- No text, UI, watermark, speech bubbles, second character

Good base pattern:

```text
Side-view full-body 2D game sprite of <subject>, <style>, standing ready pose,
facing right, centered in frame, feet near lower third, solid flat magenta
background #FF00FF only, no ground, no shadow, no text, crisp readable silhouette.
```

If matching a project sprite: use `image_edit` with the existing frame as reference and only change pose/background to magenta if needed. Prefer compositing a known good frame onto magenta in code when the art already exists.

## Video (`image_to_video`)

Write **one short present-tense shot** (1–2 sentences). Constraints:

| Preferred pattern | Quality boundary |
| --- | --- |
| Run/walk **in place** (treadmill) | Travel across the screen |
| Locked camera | Pan, zoom, orbit, handheld |
| Keep solid magenta background | Scenic BG, ground scroll, particles filling frame |
| Single continuous action | Combo attacks + movement + camera |
| Stable identity/clothes | Costume change mid-clip |

Run example:

```text
The same chibi ninja character runs in place facing right with a classic side-scroller
stride, arms trailing slightly back, body centered, camera locked, solid flat magenta
background only.
```

Walk / idle examples:

```text
The character walks in place facing right with a steady side-view walk cycle, camera locked, solid magenta background.
```

```text
The character idles in place with a subtle breathing bob and weight shift, camera locked, solid magenta background.
```

Attack (use carefully — identity drift is higher):

```text
The character performs a single short punch combo in place facing right, camera locked, solid magenta background, no screen-filling FX.
```

## Sampling guidance (post-video)

- Export multiple densities: 8 / 16 / 24 / 48 for comparison GIFs
- For engine integration: pick one smooth cycle (~12–16 frames) after watching previews
- If the 6s clip contains multiple run cycles, denser even sampling across the whole clip can look like a long multi-cycle animation — that is OK for previews, but for a game loop re-sample one cycle region manually if needed
