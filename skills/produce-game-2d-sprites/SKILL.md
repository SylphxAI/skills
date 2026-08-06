---
name: produce-game-2d-sprites
description: "Produce engine-ready 2D game sprites/sheets: generate, chroma postprocess, loop QC, Keel pack paths."
---

# Produce Game 2D Sprites

When you need **real 2D sprite or animation sheet assets** (not code-drawn
placeholders) for a game or title, run this job. Own the production pipeline and
engine-ready defaults; the title or Keel pack owns runtime wiring.

## When to use

- Character/NPC/creature/prop/projectile/FX sprites or sheets
- Walk/run/attack/idle cycles and transparent PNG/GIF exports
- Preparing assets for Keel pack / title `assets/` trees

## Not this job

- Whole-game thesis/blueprint → `design-game`
- Marketing/store media pack → `produce-product-assets`
- Interface craft for app chrome → `craft-product-interface`
- Grok-only sandbox auth or TanStack Start scaffolds (not Sylphx defaults)

## Sylphx / Keel alignment

| Concern | Owner |
| --- | --- |
| Asset files + QC | this skill |
| Title content layout under pack | product title repo |
| Pack shell / player / multi-platform emit | **Keel** (`keel pack` / `keel-pack`) |
| Runtime ECS/input/render | Keel ports + title |

Prefer title paths such as:

```text
<title-repo>/assets/sprites/<name>/
<title-repo>/assets/sheets/<name>/
```

Document exact paths in the delivery pack. Do not invent a second pack standard.

## Host image tools (portable)

Use **whichever image generation/edit tools the host exposes** (e.g. Codex
imagegen, Claude image tools, Grok Imagine). Do **not** hard-require one vendor.

If the host lacks image tools:

1. Prefer code-built geometry for exact text/structure, or  
2. Postprocess existing source art with scripts below, or  
3. Report the tool gap honestly—do not fake engine-ready sheets.

Optional denser motion harvest (`scripts/video2dsprite.py`) needs a host with
**image→video** plus **ffmpeg**. If missing, stay on still-sheet generation +
postprocess.

## Method

### 1. Frame
- Subject, style, frame count/grid, loop vs one-shot, size class, naming
- Success signal (e.g. clean chroma, loop, consistent scale across cells)
- Non-goals: full game systems, marketing stills, 3D mesh production

### 2. Engine-ready defaults (apply unless user overrides)
- Isolated subject on **solid keyable background** default `#FF00FF` for chroma paths
- No baked ground scene, no cast shadow under subject, no text/labels
- Sheet cells: uniform size, no divider lines, consistent pose scale/position
- Animation: loopable cycle when motion is requested
- Recurring character: edit-chain from prior base—do not regenerate identity cold

Full checklist: [references/engine-ready-defaults.md](references/engine-ready-defaults.md).

### 3. Generate
- Prompt in visual language (2–5 vivid sentences + style words)
- Prefer reference images when identity continuity matters
- Keep style contract across a set (palette, outline weight, view angle)

Prompt craft notes: [references/prompt-rules.md](references/prompt-rules.md).

### 4. Postprocess with scripts
From this package (Pillow/numpy; ffmpeg for video path):

```bash
python3 skills/produce-game-2d-sprites/scripts/generate2dsprite.py --help
python3 skills/produce-game-2d-sprites/scripts/make_layout_guide.py --help
python3 skills/produce-game-2d-sprites/scripts/video2dsprite.py --help
```

When running from a product checkout, copy or invoke scripts by absolute path
under the installed Skills tree. Treat script flags as local truth—read
`--help` before inventing options.

### 5. Verify (blind read-back)
- Describe the image **before** re-reading the spec
- Pass/fail every stated property and every applicable default
- Flag defects honestly; ~2 retries max per proven failure mode, then escalate
  (compositional assembly) or ship with explicit residual

### 6. Deliver
- Organized files + short manifest (names, grid, chroma, loop notes)
- When landing into a title repo: compose `source-authoring-standard`
  (**L1** batch, **L2** atomic commits, **L3** revert-safe PR outcome)

## Soft composition

- `produce-product-assets` — marketing/store/capture packs (not gameplay sheets)
- `design-game` / `finish-product` — thesis and final-fidelity bar
- `source-authoring-standard` — when committing into a product repo
- Keel pack docs in the active Keel pin — packaging/runtime, not art generation

## Provenance

Postprocess scripts adapted from MIT **agent-sprite-forge** (see
`scripts/LICENSE-agent-sprite-forge` and [SOURCE.md](SOURCE.md)). Method text is
Sylphx-native: portable hosts, Keel packaging authority, no Grok-only gate as
the sole path.

## Output

Sprite Production Pack: paths, grid/chroma contract, loop QC, residuals, next
title/Keel wiring notes.
