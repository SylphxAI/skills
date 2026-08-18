# Sensory Feedback

Use this reference when a product interaction needs sound, music, haptics,
camera response, particles, motion, or other sensory feedback. This is
interaction feedback, not customer-review ingestion or product-learning work;
that separate job belongs to `run-product-feedback-loop`.

The Sylphx company [sound, haptics, and feedback](https://github.com/SylphxAI/owner/blob/main/standards/feedback.md)
standard remains source authority. Product and engine contracts own concrete
APIs and live capability; this reference owns the portable interface method.

## Feedback chain

For each material action define:

```text
event class -> intensity -> colour/shape/motion -> animation timing -> camera
-> sound family -> music response -> haptic -> UI -> reduced-effects alternative
```

Cover five questions where they apply:

| Layer | User question |
| --- | --- |
| Input acknowledgement | Did the product hear me? |
| World or system result | What changed? |
| Tactical guidance | Was that good, unsafe, blocked, or incomplete? |
| Progress meaning | Why does this result matter? |
| Social consequence | Who else was affected? |

Acknowledge input quickly, but never present an uncommitted purchase, reward,
hit, save, or network action as final.

## Sensory rules

- Essential meaning has a visual or textual path. Audio, haptics, colour,
  particles, camera motion, and vibration never carry unique required state.
- Separate authoritative simulation from presentation. Hitstop, shake, rumble,
  ducking, and particles do not change gameplay, money, replay, or network
  outcomes.
- Match intensity to importance and rarity. Frequent interactions stay quiet;
  critical failure, destructive action, safety, and purchase paths prioritize
  clarity over spectacle.
- Provide mute, intensity, reduced-motion/reduced-effects, captions, and input
  alternatives appropriate to the selected modalities.
- Bound simultaneous voices, effects, flashes, shake, vibration, and particles.
  Degrade spectacle before input latency, readability, or state truth.
- Exercise interruption, repeated input, overlapping cues, disabled modality,
  reduced-effects, low-end device, background/foreground, and authoritative
  correction paths.

## Sylphx and Keel sound mapping

For a Keel title or another company product that uses the company audio
contract, use the four first-class buses:

| Bus | Use |
| --- | --- |
| `MASTER` | Output gain |
| `MUSIC` | Background music, beds, and musical stingers |
| `SFX` | World, action, dialogue, ambience, and voice/chat families |
| `UI` | Click, open, invalid, confirm, and accessibility cues |

Dialogue, ambience, voice/chat, and accessibility are mix families on these
buses, not a fifth company bus or a title-local audio API. A product may add
family-level mute or mix controls without replacing the engine contract.

## Output

Return the action-feedback matrix, event/intensity mapping, modality and bus or
family choices, authoritative commit boundary, accessibility alternatives,
performance/degradation budgets, overlap/interruption policy, and exercised
states.
