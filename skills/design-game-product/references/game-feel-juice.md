# Game feel & juice (portable)

Separate **simulation** from **presentation**. Juice preserves gameplay
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
| Particles / muzzle / impact | Layer cheap pooled FX while the core loop remains independently available |
| Audio layering | One-shot + sweetener + bus-limited master; duck music on critical feedback |

## Accessibility & perf floors

- Expose reduce-motion / shake intensity.
- Cap simultaneous FX; degrade particles before input latency.
- Keep hitboxes, text, and critical UI legible through every effect.

## Design handoff

The blueprint names which actions receive each feedback layer and their
accessible alternatives. Implementation uses the product's active presentation
stack and conventions.
