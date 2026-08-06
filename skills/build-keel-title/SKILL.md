---
name: build-keel-title
description: "Implement a Keel external title/game/app: Title day-1, examples routing, pack shell, doctor floors."
---

# Build Keel Title

When you need to **implement or extend a playable product on Keel** (game, hybrid
app with a stage, multi-platform client)—not a generic Three/Phaser web toy—run
this job. Own **correct engine boundaries and a working title slice**; design
thesis and marketing live elsewhere.

## When to use

- Scaffolding or extending a Cubeage/external **title repo** on Keel
- Replacing canvas/Three/Phaser prototypes with Keel Title + pack
- Wiring HUD/chrome + stage + systems + intents on the engine grammar
- Pack/profile/doctor work for an honest multi-platform shell

## Authority

| Layer | Authority |
| --- | --- |
| Engine APIs, pack, doctor, UI kit | **Keel** repo docs @ pinned rev |
| Static agent methods | Sylphx Skills (this + compose) |
| Product content, economy, live ops | Title / studio product repo |

Map: [references/keel-authority-map.md](references/keel-authority-map.md) · Examples: [references/keel-examples-routing.md](references/keel-examples-routing.md).  
Re-read Keel tip docs—do not invent APIs from chat memory.

## Method

### 1. Frame the slice

- Product promise (from blueprint or user) and **this cycle’s playable done-look**
- Platforms in scope (web pack, desktop, mobile scaffold, headless-only)
- Non-goals: engine 1.0 claims, dual chrome, unrelated refactors

### 2. Orient on Keel (before coding stack defaults)

1. Open [references/keel-examples-routing.md](references/keel-examples-routing.md) (then Keel **AGENT_PRODUCT_GUIDE** / EXAMPLES_CATALOG at tip); pick nearest bins and run them.  
2. Confirm day-1 shape: **`Title`** + `.view` + `.game` + Intent—not GameApp dual path.  
3. Confirm ship path: **`keel pack`** owns player shell; title owns sim wasm/content.  
4. If tempted by Three/R3F/Phaser/HTML sim: stop—map the need to World/Port/Asset
   or file an engine capability residual honestly.

### 3. Design composition (load on demand)

- Whole-game thesis/loops → whole-game design
- Premium HUD/menus → `craft-product-interface` (+ premium + game-overlay refs)
- Sprite/tile production → `produce-game-2d-*`
- Playable floors → [references/playable-implementation-floor.md](references/playable-implementation-floor.md)

### 4. Implement

- **Title day-1** in the **external** title repo (ADR-0008: no customer titles in engine).
- Systems mutate **World**; input becomes **Intent**; capabilities enter via **Port**.
- Chrome via **View / ThemePack / Widget**—apply premium non-generic UI floors.
- Assets via **Asset** + title paths; pack profiles in `keel.toml`.
- Prefer copying **keel-examples** patterns over inventing host facades.
- Source landing: atomic commits and a revert-safe PR outcome L1/L2/L3 when mutating git.

### 5. Verify

- Title/repo tests + headless proof where applicable  
- `keel doctor` / pack list-profiles when pack is in scope  
- Preview smoke (`verify-local-web-preview`) for local web surfaces  
- Control self-test for movement  
- Evidence labels: local ≠ device ≠ G9 pin ≠ G10  

### 6. Residuals

List engine gaps as **residuals/roadmap**, not silent title workarounds that
fork a second runtime.

## Cycle done

1. Framed slice runs on Keel boundaries with stated oracle  
2. No dual product chrome / dual sim introduced  
3. Pack/doctor ownership respected  
4. Residuals explicit  

## Output

Title paths · systems/intents · pack/profile notes · oracle evidence · residuals

## Absorbed title game craft

When the title is a game (not only app chrome), also load:

- [references/title-game-craft-absorbed.md](references/title-game-craft-absorbed.md) — loop/feel/genre principles rewritten off foreign browser engines
- Asset production: `produce-game-2d-sprites`, `produce-game-2d-map-assets`
- UI craft: `craft-product-interface` (Keel Paint/ThemePack — never a second React UI tree)

Platform services (auth, deploy, data) come from **Sylphx Platform** when needed — not workspace-kit clones.
