# Playable implementation floor (Keel apps)

Portable correctness floors from high-quality game builders, mapped to Keel.

## Loop & time

- Drive sim from engine fixed/render phases—not `setInterval` game loops.
- Scale motion by **dt**; **cap** large dt after tab background.
- Prefer **fixed timestep** accumulation for gameplay/physics; render may differ.
- Keel: use `.fixed` / phase systems on `GameBuild`; profile via `GameDefaults`.

## Input

- Player-visible signs first (A = left on chase cam). Self-test before “controls
  done” — whole-game design player-controls reference.
- Map keys/pointers → **Intent**, not scattered global flags.
- Keel: `.on_key` / `.on_intent`; host input Ports when needed.

## Presentation vs sim

- Juice (shake, hitstop, flash, particles) **must not** change outcomes.
- HUD/menus: `references/craft-interface` premium + game-overlay refs + Keel View.
- Stage vs chrome: `game_slot` + View hierarchy.

## Assets

- Engine-ready sheets/tiles: `produce-product-assets` (see references/game-2d-sprites) / `produce-product-assets` (see references/game-2d-map-assets).
- Prefer Keel Asset loaders + pack paths over ad-hoc CDN Three loaders.

## Save / meta

- Durable state in World resources / product-owned persistence Ports.
- Document session-only vs durable; never silent wipe of purchased value.

## Verify ladder

1. Headless title proof / `cargo test` in app repo  
2. Example-class dogfood path or pack web preview  
3. `verify-local-web-preview` when a local web surface exists  
4. Control self-test when movement ships  
5. Separate soft vs device vs G9 vs G10 claims  

## Genre acceptance

After thesis exists, use whole-game design genre-acceptance-checks—not Phaser genre
files as runtime authority.
