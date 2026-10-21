# Feedback standard

Trigger: adding audible, haptic, motion, or other sensory feedback.

Sensory feedback makes state understandable and gives the product its feel. It
stays out of the authoritative simulation, and essential information always has
another representation, so a player with sound off, reduced motion, or no
haptics loses nothing needed to play or pay.

## Hard lines

- Haptics and audio carry no unique essential meaning and do not touch game
  rules, economy, netcode, or replay: those must behave the same on every
  device.

## Practices

- **Audio** goes through the owning engine's public audio contract (API names,
  asset routing, mixer); a missing shared capability is fixed there. Each asset
  has one semantic destination, and gain, mute, and persistence work
  independently. Critical dialogue stays intelligible through ducking and the
  mix recovers after an interruption.
- **Alternatives** exist for material dialogue, instruction, threat, success,
  error, purchase, safety, and social state: text, caption, shape, or another
  form. A caption names its speaker and meaningful non-speech sound. Audio and
  visual alternatives each work alone, and asking the user to turn sound on is
  not a recovery path. Interaction requirements live in
  [experience.md](experience.md).
- **Haptics** are a semantic feedback (selection, confirmation, warning, impact,
  sustained boundary) that a platform adapter maps to the hardware. They are
  optional, disableable, and adjustable, and unsupported hardware keeps the task
  available.
- **Coherent response:** choose the layers that improve comprehension for each
  material action, acknowledge input promptly, and distinguish pending state
  from a committed result. Bound simultaneous voices, particles, camera motion,
  hitstop, and ducking, and reduce spectacle before readability, input latency,
  or frame pacing suffers.

## How it is judged

Through the public path: a muted category stays silent, controls do what they
promise, and the critical journeys complete with sound off and with reduced
motion.
