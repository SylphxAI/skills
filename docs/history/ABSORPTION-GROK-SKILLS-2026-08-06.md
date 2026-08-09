# Absorption: external skills dump + workspace-kit (2026-08-06)

> Historical record (2026-08-06), archived. Not current authority. See
> [docs/MODEL.md](../MODEL.md) and [docs/CURATION-LEDGER.md](../CURATION-LEDGER.md).

## Company stance

Sylphx agents build with **company products**:

| Product | Role for agents |
| --- | --- |
| **Keel** | Agent-native client runtime (game + app + website + CLI); World/System/Intent/Port/Asset |
| **Sylphx Platform** | Deploy, BaaS/primitives, dogfood hosting |
| **Sylphx Skills** | Requestable job skills + progressive references (see [docs/MODEL.md](../MODEL.md)) |
| **Cubeage titles** | Games/apps as Keel consumers |
| **Spiron / MCP / gateway** | Memory, tools, model routing as product surfaces |

Agents must **not** adopt foreign app-builder stacks as the product SSOT.

## Sources absorbed

- `skills-dump.tar.gz`: generate2dmap, generate2dsprite, video2dsprite, design-ui, building-games materials
- `workspace-kit.tar.gz`: inspected and **rejected as product template**

## Absorbed (rewritten Keel-native)

| Source idea | Destination |
| --- | --- |
| Map modes / layered contract / prop packs | `produce-game-2d-map-assets/references/*` |
| Sprite modes/actions/bundles + video pipeline | `produce-game-2d-sprites/references/*` |
| Game loop/feel/genre principles (engine-agnostic) | `build-product/references/keel-app/references/game-craft-absorbed.md` |
| Pointers from design-game library | historical pointer — `sylphx-methods` is retired; method depth lives under job skills |

## Explicitly rejected (do not reintroduce)

| Material | Why |
| --- | --- |
| Grok workspace-kit (React/Vite/auth/PGlite multiplayer kit) | Parallel product stack; Sylphx uses Keel + Platform |
| Three.js / R3F / Babylon / Phaser as default engines | Keel wgpu/World is SSOT for titles |
| Godot/Unity/Tiled as default export targets | Only if a title explicitly requires those exporters |
| Host-private tool ids as skill authority (`image_gen` only, `.grok/skills` paths) | Skills stay host-portable; use host image tools generically |
| “Created with Grok” banners / kit marketing chrome | Not Sylphx brand or architecture |

## Already covered (no duplicate skill)

- Premium UI anti-slop / tokens / motion → existing `build-product` (see references/craft-interface) references (already Keel-oriented)
- Local preview smoke → `verify-local-web-preview` (may reuse script ideas; kit not imported wholesale)

## Listing budget

No new catalog skill ids. Depth added under existing task skills + library pointers.
