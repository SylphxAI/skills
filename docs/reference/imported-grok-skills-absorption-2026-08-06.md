# Imported Grok/app-builder skills absorption (2026-08-06)

Intake: `all-skills-complete.tar.gz` (fork session). Goal: absorb **useful
mechanisms** into Sylphx Skills as **agent jobs** aligned with **Keel** and
portfolio doctrine—not a blind mirror of Grok Build / TanStack Start templates.

## Authority map

| Domain | Authority |
| --- | --- |
| Shared engine/runtime/pack | **Keel** (`keel pack`, ports, AssetStage, title-audit) |
| Static methods / Skills | **SylphxAI/skills** |
| Product behavior | Title repos (Cubeage, …) |
| Vendor sandboxes (Grok auth broker, PGLite preview, `*.grok-sandbox.com`) | **Not** Sylphx defaults |

## Disposition of intake packages

| Intake id | Disposition | Sylphx home |
| --- | --- | --- |
| `generate2dsprite` + scripts | **Rewrite job** | `produce-game-2d-sprites` |
| `video2dsprite` + script | **Optional path** inside sprites skill (host must have video tools) | same |
| `game-asset-core` / animation / tiles / UI icons / character-consistency | **Fold doctrine** into sprites/map references (not five micro-skills) | references under produce-* |
| `generate2dmap` + scripts | **Rewrite job** | `produce-game-2d-map-assets` |
| `controls` | **Distill** player-sign self-test | `design-game/references/player-controls-self-test.md` |
| `building-games` + genre playbooks | **Do not absorb as engine authority** (TanStack/R3F/Phaser-first). Extract only playbook ideas into `design-game` later if needed; Keel owns runtime. | reject-as-runtime |
| `threejs` + llms dump | **Reject** as default stack; Keel/WebGPU path is native. Optional read-only dump not installed. | reject |
| `auth` / `neon` / `og` / `xai-api` / `imagine` / `multiplayer-p2p` | **Reject** (Grok broker, Neon, xAI key, sandbox-only) | reject |
| `design-ui` | **Overlap** `craft-product-interface` / finish; cherry-pick later if gaps proven | defer |

## Scripts policy

- Keep MIT-licensed postprocess scripts under skill `scripts/` with LICENSE + SOURCE.
- Rewrite **method** for portable image tools + Keel/title paths.
- Never hard-require Grok-only tools as the sole production path.

## First wave shipped

- `skills/produce-game-2d-sprites/`
- `skills/produce-game-2d-map-assets/`
- `skills/design-game/references/player-controls-self-test.md`

## Follow-ups (not this wave)

- Genre playbooks rewritten for Keel titles (not Phaser/R3F defaults)
- Deeper AssetStage/pack manifest contracts when titles demand
- Multiplayer only via product-owned networking—not P2P sandbox skill
