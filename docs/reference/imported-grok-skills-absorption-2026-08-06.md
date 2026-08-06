# Imported skills + workspace-kit absorption (2026-08-06)

Intakes (fork session):

| Artifact | Role |
| --- | --- |
| `all-skills-complete.tar.gz` | Grok Build / agent-sprite-forge skill dump |
| `workspace-kit.tar.gz` | Runtime kit (TanStack Start, auth broker, PGLite, P2P, smoke scripts) |

Goal: absorb **useful mechanisms** into Sylphx Skills as **agent jobs** aligned
with **Keel** and portfolio doctrine—not a blind mirror of Grok Build / TanStack
Start templates.

## Authority map

| Domain | Authority |
| --- | --- |
| Shared engine/runtime/pack | **Keel** (`keel pack`, ports, AssetStage, title-audit) |
| Static methods / Skills | **SylphxAI/skills** |
| Product behavior | Title repos (Cubeage, …) |
| Vendor sandboxes (Grok auth broker, PGLite preview, `*.grok-sandbox.com`) | **Not** Sylphx defaults |

## Disposition — all-skills-complete packages

| Intake id | Disposition | Sylphx home |
| --- | --- | --- |
| `generate2dsprite` + scripts | **Rewrite job** | `produce-game-2d-sprites` |
| `video2dsprite` + script | **Optional path** inside sprites skill (host must have video tools) | same |
| `game-asset-core` | **Fold doctrine** | `produce-game-2d-sprites/references/engine-ready-defaults.md` |
| `game-animation-frames` | **Fold doctrine** | `…/references/animation-loop-qc.md` |
| `game-character-consistency` | **Fold doctrine** | `…/references/character-consistency.md` |
| `game-ui-icons` | **Fold doctrine** | `…/references/game-ui-icons-and-hud-art.md` |
| `game-tilesets` | **Fold doctrine** | `produce-game-2d-map-assets/references/tileset-and-prop-qc.md` |
| `generate2dmap` + scripts + refs | **Rewrite job** + notes | `produce-game-2d-map-assets` (+ layered-map-notes) |
| `controls` | **Distill** player-sign self-test | `design-game/references/player-controls-self-test.md` |
| `building-games` genre playbooks | **Portable checks** only (no Phaser/R3F default) | `design-game/references/genre-acceptance-checks.md` |
| `building-games` juice / feel | **Portable presentation doctrine** | `design-game/references/game-feel-juice.md` |
| `building-games` as runtime | **Reject** as engine authority | Keel owns runtime |
| `threejs` + llms dump | **Reject** as default stack | Keel/WebGPU native path |
| `auth` / `neon` / `og` / `xai-api` / `imagine` | **Reject** (Grok broker, Neon, xAI key, sandbox OG) | product auth/marketing skills already cover real jobs |
| `multiplayer-p2p` | **Trust boundary only** (no P2P kit) | `design-game/references/multiplayer-trust-boundary.md` |
| `design-ui` | **Defer install** — overlap `craft-product-interface`; no proven gap after cherry-read | keep craft-* as UI craft authority |

## Disposition — workspace-kit

| Kit piece | Disposition | Sylphx home |
| --- | --- | --- |
| `scripts/browser-smoke.mjs` + `browser-guard.mjs` | **Rewrite portable job** | `verify-local-web-preview` |
| Preview honesty / human communication rules | **Distill** | `verify-local-web-preview/references/preview-honesty.md` |
| AGENTS.md TanStack/Vite/auth stack | **Reject as portfolio default** | product repos choose stack; not Skills law |
| Better Auth + `auth.grok.me` broker + preview popup | **Reject** | not Sylphx default auth |
| PGLite embedded DB | **Reject** as platform default | |
| P2P multiplayer + Neon SQL signaling | **Reject** as kit | trust notes only under design-game |
| `created-with-grok-banner`, eslint/prettier kit config | **Reject** | |
| Full kit tree as installable template | **Reject** | titles use Keel pack / product scaffolds |

## Scripts policy

- Keep MIT-licensed postprocess scripts under skill `scripts/` with LICENSE + SOURCE.
- Smoke scripts: MIT-style adaptation noted in `SOURCE.md`; no vendor lock on path layout.
- Rewrite **method** for portable image/browser tools + Keel/title paths.
- Never hard-require Grok-only tools as the sole production path.
- Never hard-code host Goal API tool names inside Skills.

## Shipped (this absorption)

**Wave 1**

- `skills/produce-game-2d-sprites/`
- `skills/produce-game-2d-map-assets/`
- `skills/design-game/references/player-controls-self-test.md`

**Wave 2 (complete in-scope fold)**

- Sprites refs: animation-loop-qc, character-consistency, game-ui-icons-and-hud-art
- Map refs: tileset-and-prop-qc, layered-map-notes
- Design-game refs: game-feel-juice, genre-acceptance-checks, multiplayer-trust-boundary
- `skills/verify-local-web-preview/` (+ smoke/guard scripts, preview-honesty)
- Updated absorption matrix (this file)

## Explicit non-goals (residuals, not unfinished absorption)

- Installing Grok/TanStack sandbox as a Sylphx product template
- Genre playbooks that lock Phaser/R3F/Babylon as the only path
- Multiplayer product implementation skill (needs product networking authority)
- Cherry-merging full `design-ui` when `craft-product-interface` already covers craft
- Claiming multi-host skill-utilization promotion complete without host-capable oracles

## Follow-ups (optional later, outside this matrix)

- Deeper AssetStage/pack manifest contracts when titles demand
- Title-specific genre depth under Cubeage/Keel docs rather than Skills micro-forks
