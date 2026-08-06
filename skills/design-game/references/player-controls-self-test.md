# Player controls self-test (design + implement)

Use when a game has WASD, vehicles, flight, or mouse-look. Distilled from common
browser-game failure modes (especially inverted A/D). Runtime wiring remains
title + Keel input ports—not a TanStack/Grok template.

## Player-visible signs (default)

| Input | Expected player result |
| --- | --- |
| A / Left | Character/vehicle turns or strafes **left** on screen |
| D / Right | Turns or strafes **right** |
| W | Forward along facing (or up on pure top-down if defined) |
| S | Back / brake per vehicle model |
| Mouse +X | Yaw right (FPS/third-person look) |

Document any intentional invert (flight combat, tank reverse camera) in the
blueprint; default is **not** inverted.

## Anti-pattern

Shipping vehicle/flight demos with A/D flipped because a math example used
camera-relative signs without a player-visible self-test.

## Mandatory self-test before “controls done”

1. Spawn at a known pose.  
2. Tap A alone → assert leftward turn/strafe.  
3. Tap D alone → assert rightward.  
4. For flight: roll/yaw directions match player expectation in first seconds.  
5. Record pass/fail in title notes or automated test harness if present.

Optional debug hook (title-local, not a portfolio dependency):

```js
// window.__controlsTest?.() → { aIsLeft: boolean, dIsRight: boolean, notes }
```

## Composition

- Design intent: `design-game`  
- Implementation: title + Keel **input** ports  
- Do not pull third-party sandbox control stacks as authority
