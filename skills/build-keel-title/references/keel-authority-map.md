# Keel authority map (agent)

**Engine repo:** [SylphxAI/keel](https://github.com/SylphxAI/keel) — re-fetch tip docs;
this reference is a map, not a frozen API manual.

## Five concepts

| Concept | Role |
| --- | --- |
| **World** | Entities, components, resources, queries |
| **System** | Phases: input → fixed → late → render |
| **Intent** | Typed commands into sim |
| **Port** | Replaceable capability edge (Null / Scripted / HostFed) |
| **Asset** | Load / retain / dispose |

## Product sentence

```text
L0  Title · View · Intent · GameBuild
L1  AppView / GameView (interior)
L2  Ports via .provide
L3  keel.toml · pack · doctor
```

Day-1 product root for games/apps: **`Title`**. Sites may use document/AppRouter
paths per Keel docs—not React as sim SSOT.

## Read order (progressive)

1. [AGENT_PRODUCT_GUIDE.md](https://github.com/SylphxAI/keel/blob/main/docs/AGENT_PRODUCT_GUIDE.md) — map “I want → example”
2. [TITLE_AUTHORING.md](https://github.com/SylphxAI/keel/blob/main/docs/TITLE_AUTHORING.md) — Title grammar
3. [EXTERNAL_TITLE.md](https://github.com/SylphxAI/keel/blob/main/docs/EXTERNAL_TITLE.md) — separate game repo pin
4. [PACKAGING.md](https://github.com/SylphxAI/keel/blob/main/docs/PACKAGING.md) — `keel pack` owns player shell
5. [UI_KIT.md](https://github.com/SylphxAI/keel/blob/main/docs/UI_KIT.md) · [DESIGN_SYSTEM.md](https://github.com/SylphxAI/keel/blob/main/docs/DESIGN_SYSTEM.md) — chrome
6. [AGENT_CAPABILITY_USAGE.md](https://github.com/SylphxAI/keel/blob/main/docs/AGENT_CAPABILITY_USAGE.md) — before inventing title-local hacks
7. Local skill map [keel-examples-routing.md](keel-examples-routing.md) then [EXAMPLES_CATALOG.md](https://github.com/SylphxAI/keel/blob/main/docs/EXAMPLES_CATALOG.md) — run matching `keel-examples` bins
8. Domain SOTA only when needed (INPUT, AUDIO, XR, …) under DOC_AUTHORITY

## Hard forbid (engine constitution)

- Three.js / Phaser / R3F / Babylon as **product SSOT** (optional research only)
- Dual product chrome (React/Solid/Flutter/HTML **plus** Keel View as two truths)
- Dual sim (TS game state vs Rust World)
- Title-owned web player shell / Vite product shell instead of **pack**
- Claiming device / G9 / G10 from unit green alone

## Commands (engine checkout or pinned path)

```bash
cargo test --workspace
cargo run -p keel-cli -- doctor
cargo run -p keel-examples --bin hello-title-product
cargo run -p keel-examples --bin hello-title-chrome
cargo run -p keel-examples --bin hello-playable3d
cargo run -p keel-examples --bin hello-fps-hud
cargo run -p keel-pack -- --list-profiles
```

External title repos pin a Keel rev and run pack against that pin—see EXTERNAL_TITLE.
