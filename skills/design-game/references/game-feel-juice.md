# Game feel & juice (portable)

Separate **simulation** from **presentation**. Juice never changes gameplay
outcomes (important for fairness, netcode, and replays).

Canon orientation: Swink *Game Feel*, Vlambeer “Juice it or lose it,” Nijman
screenshake craft—apply via title + engine ports, not a locked web stack.

## Principle

Every meaningful action should produce multi-sensory feedback: sound, particles,
camera shake, hitstop, flash, knockback read, squash/stretch, damage numbers—as
appropriate to the fantasy—without muddying readability.

## Highest leverage defaults

| Technique | Method notes |
| --- | --- |
| Trauma camera shake | Store trauma ∈ [0,1]; shake ∝ trauma² (or ³); decay by dt; noise not pure random; slight rotational shake; directional kick on impact; accessibility cap/slider |
| Hitstop | Freeze sim ~30–120ms on big hits while still rendering FX; keep short |
| Easing | Almost nothing moves linearly; easeOut for settle, easeOutBack sparingly for pops |
| Particles / muzzle / impact | Layer cheap FX; prefer pooled systems; never block core loop on FX |
| Audio layering | One-shot + sweetener + bus-limited master; duck music on critical feedback |

## Accessibility & perf floors

- Expose reduce-motion / shake intensity.
- Cap simultaneous FX; degrade particles before input latency.
- Juice must not hide hitboxes, text, or critical UI.

## Design handoff

Blueprint names which actions get which feedback layers and what is
accessibility-gated. Implementation uses title + Keel (or product) presentation
ports—do not mandate Phaser/R3F/GSAP as portfolio defaults.
