# Motion Transition Rules

## Motion purposes

Motion should do one of five jobs: confirm input, explain continuity, orient navigation, reveal hierarchy, or reduce perceived wait. If it does none, remove it.

## Rule IDs

- `motion-1` — Feedback motion should be immediate and short; users should feel the interface heard them before they wonder.
- `motion-2` — Navigation transitions should preserve spatial continuity and never make users wait for decoration.
- `motion-3` — Enter and exit choreography should match hierarchy: parent first for context, child first for local feedback.
- `motion-4` — Loading motion should communicate progress or liveliness without implying fake precision.
- `motion-5` — Gesture-driven motion must be interruptible, reversible, and tied to finger movement.
- `motion-6` — Destructive or important state changes need clear confirmation, not playful ambiguity.
- `motion-7` — Reduced-motion mode should replace travel/scale/parallax with opacity, instant state, or simpler feedback.
- `motion-8` — Avoid animating layout properties that cause jank; prefer transform and opacity when implementing.
- `motion-9` — Keep motion language consistent: one easing family for product surfaces, not random effects.
- `motion-10` — Games and reward moments can be more expressive, but core navigation and purchases must stay legible and fast.

## Duration bands

| Purpose | Typical band | Notes |
| --- | --- | --- |
| Tap feedback | 50-120ms | Must feel instant |
| Micro reveal | 120-220ms | Tooltips, chips, inline expansion |
| Modal/drawer | 180-320ms | Can be gesture-controlled |
| Page navigation | 180-360ms | Shorter for productivity tools |
| Reward flourish | 400-900ms | Skippable or non-blocking |

## Decision table

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| UI feels sluggish | Animation blocks action | Shorten, make non-blocking, allow interruption |
| UI feels cheap | Easing/durations inconsistent | Define motion tokens by purpose |
| Users lose context | Instant replacement across hierarchy | Add continuity from source to destination |
| Users get dizzy | Large travel/parallax | Reduced travel, opacity transition, honor reduced motion |

## Motion spec fields

Document: trigger, start state, end state, duration, easing, affected properties, interrupt behavior, reduced-motion behavior, and performance risk.
