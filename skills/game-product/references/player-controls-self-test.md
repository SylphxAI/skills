# Player controls self-test (design + implement)

Use when a game has WASD, vehicles, flight, or mouse-look. Distilled from common
browser-game failure modes (especially inverted A/D). Runtime wiring remains
the title's input ports and product runtime.

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

## Player-visible behavior

Anchor vehicle and flight control signs in the player-visible self-test so A/D
remain left/right even when a math example uses camera-relative signs.

## Controls self-test

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

- Design intent: `game-product`
- Implementation: title and product-runtime **input** ports
- Use the game's current control contract and direct player-visible tests as authority
