# Game overlay & HUD craft

Use when the surface is **start/title/menu, pause, settings, win/lose, HUD,
toasts, on-screen controls**—DOM/Paint **chrome over** the game stage—not
sim rules themselves.

## Split ownership

| Layer | Owner |
| --- | --- |
| Rules / World / Intent | Game systems (whole-game design + title + Keel sim) |
| Feel juice (shake, hitstop, SFX) | Presentation; sim outcomes unchanged |
| HUD / menus / settings chrome | **This craft** + Keel View/ThemePack |
| Pack player shell (web index, fullscreen boot) | **Keel pack** — do not fork a second shell |

## Quality bar (why some demos look “expensive”)

1. **One visual system** for menus + HUD + store surfaces—not a different skin
   per screen.
2. **Stage first:** game view gets the space; chrome is sparse and legible at a
   glance (score, lives, objective—not walls of chrome).
3. **State completeness:** idle, playing, paused, failed, success, offline,
   purchase pending—each has chrome that matches trust and recovery.
4. **Readability under motion:** juice never obscures hit-critical info; reduce
   motion path exists.
5. **Input honesty:** on-screen buttons match physical control signs; no fake
   disabled states without reason.
6. **No monetization uncanny valley:** IAP/shop chrome matches the game’s craft
   language (`feel-5` in whole-game design experience quality).

## Layout patterns

- Safe margins for notches/TV overscan when those platforms are in scope.
- HUD anchors: corners for persistent stats; center for modal decisions only.
- Pause/settings: clear resume path; no dark pattern traps.
- Diegetic vs non-diegetic: pick one primary language per title fantasy.

## Keel wiring hints

- Prefer `Title` `.view` chrome + `game_slot` for the stage (see Keel
  `TITLE_AUTHORING.md`, examples `hello-title-chrome`, `hello-fps-hud`).
- Theme via ThemePack roles—not ad-hoc per-widget hex.
- Multi-commit Paint/Dom/Terminal when the product needs multi-surface chrome.

## Compose

- Premium floors: [premium-non-generic-ui.md](premium-non-generic-ui.md)
- Control signs: whole-game design player-controls self-test
- Asset icons/panels as **art**: `produce-game-2d-sprites` HUD art ref when
  generating bitmaps; prefer vector/Widget for interactive chrome when possible
