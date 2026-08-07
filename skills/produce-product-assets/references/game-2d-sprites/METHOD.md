# produce-game-2d-sprites (reference under `produce-product-assets`)

> Not a listing skill. Open from `produce-product-assets` when this depth applies.

# Produce Game 2D Sprites

When you need **real 2D sprite or animation sheet assets** (not code-drawn
placeholders) for a game or title, run this job. Own the production pipeline and
engine-ready defaults; the title or Keel pack owns runtime wiring.

## When to use

- Character/NPC/creature/prop/projectile/FX sprites or sheets
- Walk/run/attack/idle cycles and transparent PNG/GIF exports
- Game HUD icons/buttons/panels delivered as **art assets**
- Recurring character identity across a multi-image set
- Preparing assets for Keel pack / title `assets/` trees

## Sylphx / Keel alignment

| Concern | Owner |
| --- | --- |
| Asset files + QC | this skill |
| Title content layout under pack | product app repo |
| Pack shell / player / multi-platform emit | **Keel** (`keel pack` / `keel-pack`) |
| Runtime ECS/input/render | Keel ports + title |

Prefer title paths such as:

```text
<title-repo>/assets/sprites/<name>/
<title-repo>/assets/sheets/<name>/
```

Document exact paths in the delivery pack. Do not invent a second pack standard.

## Host image tools (portable)

Use **whichever image generation/edit tools the host exposes**. Do not hard-require
one vendor.

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
- Scope this run to the asset set (not whole-game thesis)

### 2. Engine-ready defaults

Apply [references/engine-ready-defaults.md](references/engine-ready-defaults.md)
unless the brief overrides:

- Isolated subject on solid keyable `#FF00FF` when chroma paths follow
- No baked ground scene, cast shadow under subject, or text/labels
- Sheet cells: uniform size, no divider lines, consistent pose scale/position
- Animation: loopable cycle when motion is requested
- Recurring character: edit-chain from prior base

### 3. Generate

- Prompt in visual language (2–5 vivid sentences + style words)
- Prefer reference images when identity continuity matters
- Keep style contract across a set (palette, outline weight, view angle)

Prompt craft: [references/prompt-rules.md](references/prompt-rules.md).  
Identity sets: [references/character-consistency.md](references/character-consistency.md).  
HUD/icon art: [references/game-ui-icons-and-hud-art.md](references/game-ui-icons-and-hud-art.md).

### 4. Postprocess / package

```bash
python3 skills/produce-product-assets/references/game-2d-sprites/scripts/generate2dsprite.py --help
python3 skills/produce-product-assets/references/game-2d-sprites/scripts/make_layout_guide.py --help
python3 skills/produce-product-assets/references/game-2d-sprites/scripts/video2dsprite.py --help
```

Read `--help` before inventing flags. Pillow/numpy (and ffmpeg for video path)
as required by each script.

### 5. Verify

- Blind describe → pass/fail checklist including defaults
- Motion: [references/animation-loop-qc.md](references/animation-loop-qc.md) flip test
- Deliver files + manifest + residual defects

### 6. Land

When committing into a product repo, compose atomic commits and a revert-safe PR outcome
three layers (L1 batch → L2 atomic commits → L3 one revert-safe PR outcome).

## Provenance

Scripts adapted from MIT **agent-sprite-forge** (see
`scripts/LICENSE-agent-sprite-forge` and [SOURCE.md](SOURCE.md)). Method is
Sylphx-native and Keel-aligned.

## Output

Engine-ready asset paths, QC notes, residuals, and evidence of host tools used
or gaps.

## Absorbed depth

- [references/modes-actions-bundles.md](references/modes-actions-bundles.md) — asset types, actions, bundles
- [references/video-to-sprite-pipeline.md](references/video-to-sprite-pipeline.md) — optional video→sheet path

Ship into title `assets/` for Keel packs; do not couple to foreign app-builder runtimes.
