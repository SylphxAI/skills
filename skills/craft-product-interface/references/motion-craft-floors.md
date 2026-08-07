# Motion craft floors (portable)

Complements accessibility/performance rules. Motion must explain **state change**,
not decorate every control.

## Duration tokens (guidance)

| Class | Budget | Use |
| --- | --- | --- |
| Micro | ~80–150ms | Hover, press feedback |
| Fast | ~150–250ms | Toggle, small panels |
| Medium | ~250–350ms | Modal/sheet enter |
| Slow | ~400–500ms | Rare emphasis only |

Prefer ease-out / smooth-out for enters; keep exits equal or slightly shorter.

## Enter patterns that read premium

- Combine **opacity + small translateY (6–12px)**; optional light blur on large
  marketing enters only—never on gameplay-critical HUD.
- Stagger sibling groups ~80–100ms; do not stagger every leaf node in dense HUD.
- Split hero title vs actions as groups, not letter-by-letter thrash.

## Perf floors

- Transition **named properties only** (opacity/transform/colors)—never “all”.
- Prefer compositor-friendly transform/opacity for movement.
- `will-change` only when first-frame stutter is observed—not on every node.
- Cap simultaneous decorative animations; degrade under low power / reduced motion.

## Reduced motion

When reduced motion is on: cut blur/large travel; keep opacity or instant state
swap. Game juice that can induce nausea must respect the same preference path.

## Game overlay

- Pause/menu enter may use medium motion; in-play HUD updates should stay micro.
- Never block input waiting for chrome animation.
- Juice (shake/hitstop) lives in presentation systems—see whole-game design feel refs—
  and must not change sim outcomes.
