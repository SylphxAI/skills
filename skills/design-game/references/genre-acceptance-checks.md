# Genre acceptance checks (portable)

Use as a **playable-quality checklist** per genre after thesis/loops exist.
Implement with title + Keel (or product runtime)—these are acceptance signals,
not stack prescriptions.

## Shared

- First 60s teach the core verb without a wall of text.
- Fail states are recoverable or clearly terminal with restart path.
- Input signs pass player-visible self-test when movement exists.
- Juice on the core verb; reduce-motion path defined.
- Save/continue policy stated (or explicitly session-only).

## Platformer (2D)

- Coyote time / jump buffer or documented hard precision.
- Variable jump height if hold-to-jump is advertised.
- Camera keeps threat and landing readable; no unfair offscreen hits as default.

## Top-down / twin-stick

- Aim independent of move when twin-stick; diagonal speed normalized.
- Enemy telegraph before damage; i-frames or clear hit feedback.

## Racing / vehicle

- A/D (or steer) player-correct from chase cam; self-test mandatory.
- Under/oversteer readable; respawn not soft-locked.

## FPS / shooter

- Mouse look yaw/pitch signs correct; sensitivity bounds.
- Hit registration feedback (sound/FX) within frame budget; friendly fire policy.

## Puzzle / match / tetris-like

- Gravity/lock delay documented; misdrop recovery; no soft-lock layouts as
  default spawn.

## Tower defense

- Pathing visible; economy one clear sink/source; lose condition early-warned.

## Endless runner

- One-button or two-lane clarity; difficulty ramp without invisible spikes.

## Voxel / sandbox light

- Break/place feedback; tool intent obvious; performance budget for view distance.

## Card / board (digital)

- Legal moves highlighted or rules-complete tooltips; undo/replay policy.

When a genre is not listed, invent checks from the core verb and fail states—not
from a third-party demo stack.
