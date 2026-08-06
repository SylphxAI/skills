# Title game craft (absorbed, Keel-native)

Source: external building-games skill materials. **Rewrite target: Sylphx Keel titles** (Cubeage and other Keel consumers). Reject browser stacks (Three/R3F/Phaser/Babylon) as SSOT.

## Authority

- Runtime SSOT: Keel (`World · System · Intent · Port · Asset`)
- UI: Keel Paint / ThemePack / Views — not a second React tree
- Proof: `keel doctor`, title-audit, headless evidence stack — not “looks fine in Vite”
- Multiplayer/backends: Sylphx Platform services when product needs them; do not invent parallel BaaS

## Absorbed principles

# Game loop & timing (engine-agnostic principles)

## 1. Game loop & timing (the #1 correctness issue)

**Rules:**
- Drive the loop with **`renderer.setAnimationLoop(fn)`** in 
- **Scale ALL movement/animation by delta time** (seconds since last frame) so speed is frame-rate independent (30fps laptop vs 144Hz monitor). e.g. `mesh.position.x += speed * delta`.
- **Cap delta** to avoid huge jumps after a backgrounded tab: `delta = Math.min(delta, 0.1)`.
- **Compute delta exactly once per frame** and reuse it everywhere.
  - 
- **For physics/gameplay stability use a fixed timestep + accumulator** ("Fix Your Timestep"): run `fixedUpdate(FIXED_STEP)` (e.g. 1/60) in a `while (accumulator >= FIXED_STEP)` loop, render at display rate, optionally interpolate. Variable delta is fine for purely visual demos.
- **Modularize**: give objects a `.update(delta)`/`.tick(delta)` method and iterate an "updatables" list; keep the top-level loop lean.
- **On-demand rendering**: if nothing is animating, stop the loop / render only on change to save battery (

**Reference pattern (
```js
const timer = new THREE.Timer();
let accumulator = 0; const FIXED = 1/60;
function animate() {
  timer.update();
  let delta = Math.min(timer.getDelta(), 0.25);
  accumulator += delta;
  while (accumulator >= FIXED) { fixedUpdate(FIXED); accumulator -= FIXED; } // physics/AI
  updateVisuals(delta);
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
```

---


---

## 8. Don't over-juice (readability & perf guardrails)
- **Juice must not obscure gameplay.** If shake/flash/particles hide the player, enemies, or projectiles, dial back. Readability > spectacle.
- **Accessibility:** provide toggles/sliders for screen shake, flashing, and reduced motion (respect `prefers-reduced-motion`). Heavy flashing risks photosensitivity — avoid rapid full-screen strobing.
- **Perf:** pool particles/tweens, cap concurrent particles, don't allocate in the hit path. Juice is cheap but "thousands of unpooled particles per explosion" is not.
- Keep hitstop short and prediction-safe in multiplayer (apply juice on the client only; never let it alter the authoritative sim).

---


---

## 7. Input

- Keyboard: `this.cursors = this.input.keyboard.createCursorKeys()` (arrows + space/shift), or `this.keys = this.input.keyboard.addKeys('W,A,S,D')`. **Read state in `update` via `.isDown`**; use `Phaser.Input.Keyboard.JustDown(key)` for single-press actions. Don't drive movement off `keydown` events.
- Pointer/touch: `this.input.on('pointerdown', p => …)`; enable object interaction with `sprite.setInteractive()` then `sprite.on('pointerdown', …)`. Set explicit hit areas for irregular sprites.
- Unify keyboard + touch + **Gamepad API** (`this.input.gamepad`) into one input-state object your `update` reads, so control code doesn't branch per device.
- Drag: `this.input.setDraggable(sprite)` + `'drag'` event. For virtual joysticks on mobile, integrate nipplejs or the rex virtual joystick plugin and feed normalized -1..1 into your input state.

---


---

# Genre notes (engine-agnostic)


================================================================================
# building-games/references/genres/board-card-chess.md
================================================================================

# Genre Playbook — Board & Card Games (Chess, Checkers, Tic-Tac-Toe, Card games)

Turn-based logic games where correctness *is* the game: an illegal move or a flaky turn transition breaks trust instantly. The genre is about a clean **turn state machine**, **rigorous legal-move validation**, and (for solo play) a **minimax / alpha-beta AI**. Almost always 2D (Canvas/DOM/Phaser); rendering is trivial, logic is everything. Read `../threejs-foundational.md` for general structure; this file is about game-logic correctness.

---

## 1. Core mechanics (minimal-but-good scope for a demo)

1. **A board/state data model** separate from the view (array of pieces / card lists).
2. **A turn state machine** that governs whose turn it is and what's allowed.
3. **Legal-move generation + validation** (only legal moves accepted and highlighted).
4. **Win/draw/loss detection** (checkmate/stalemate, three-in-a-row, deck empty, etc.).
5. **A simple AI opponent** (minimax/alpha-beta for perfect-info games; heuristics for card games).

For chess specifically: **do not hand-roll the rules for a demo unless asked — use `chess.js`** for move generation/validation/checkmate and `chessground`/a board lib for the UI. Hand-rolling chess rules (en passant, castling through check, pins, promotion, threefold repetition) is a huge bug surface. Build custom rules only for simpler games (tic-tac-toe, checkers, connect-4) or when explicitly required.

---

## 2. Turn state machine

Model the game as an explicit finite state machine — never as ad-hoc booleans scattered across handlers.

- **States (typical):** `PlayerTurn (idle → pieceSelected → moveConfirmed)` → `Resolving/Animating` → `CheckWinCondition` → `OpponentTurn` → … → `GameOver`.
- **One source of truth for `currentPlayer`.** Only accept input during that player's `idle`/`selecting` state; **ignore all input while animating or during the AI's turn** (a top bug: clicking during resolution corrupts state or lets a player move twice).
- **Strict transitions:** select piece → show legal moves → choose destination → validate → apply move → switch player → check terminal conditions. Each step gated; no shortcuts.
- **Undo/history:** keep a move stack (and/or full state snapshots) — enables undo, threefold-repetition detection, and replay. Store enough to reverse a move (captured piece, castling/en-passant flags).
- **Determinism:** the model must be pure and reproducible; the view only reflects it. This makes AI, undo, and (later) networking possible.

---

## 3. Legal-move validation (get this exactly right)

- **Generate, then filter.** Produce candidate moves per piece, then remove illegal ones. **Only offer/accept legal moves** — highlight them; reject clicks on illegal squares.
- **Chess "leaves your king in check" rule (the classic omission):** a move is illegal if, *after* making it, your own king is attacked. Implement by making the move on a copy, checking if your king is attacked, and rejecting if so. This automatically handles pins — don't try to special-case pins.
- **Special chess rules to not forget:** castling (king & rook unmoved, squares empty, king not in/through/into check), en passant (only immediately after the enemy pawn's two-square move), pawn promotion, and the 50-move / threefold-repetition / stalemate draws. These are exactly why `chess.js` exists.
- **Terminal detection:** checkmate = in check AND no legal moves; stalemate = not in check AND no legal moves (a draw, not a loss — a very common bug is scoring stalemate as a win). For tic-tac-toe/connect-4, check all lines after each move and also detect a full-board draw.
- **Card games:** validate legality against the rules (can you play this card now?), keep hidden information hidden (trivial in single-player; true hidden-info enforcement needs a server, which is out of scope on this deploy target), and shuffle with an unbiased algorithm (**Fisher–Yates**, not `sort(() => Math.random()-0.5)` which is biased).

---

## 4. AI: minimax & alpha-beta pruning

For **perfect-information, deterministic** games (chess, checkers, tic-tac-toe, connect-4, Othello):

- **Minimax:** recursively explore the game tree; the mover **maximizes** their evaluation, the opponent **minimizes** it. At the depth limit (or terminal node), return a heuristic evaluation. Choose the move leading to the best guaranteed outcome.
- **Alpha-beta pruning:** carry `alpha` (best already guaranteed to the maximizer) and `beta` (best guaranteed to the minimizer); **prune** a branch when `alpha >= beta` (the opponent would never allow it). Same result as minimax, far fewer nodes → much deeper search. Move ordering (try likely-good moves first, e.g. captures) dramatically improves pruning.
- **Depth = difficulty.** Tic-tac-toe: search to the end (perfect play). Connect-4/checkers: a few plies. Chess: alpha-beta + a material+position evaluation gets a decent club-level bot; go deeper/iterative-deepening for stronger.
- **Evaluation function (heuristic):** for chess, material values (P=1, N/B=3, R=5, Q=9) + piece-square tables (positional bonuses) + mobility/king safety. Terminal nodes return ±∞ for win/loss, 0 for draw. A good eval matters more than raw depth for feel.
- **Avoid freezing the UI:** run deeper searches so they don't block the main thread — use a **Web Worker**, iterative deepening with a time budget, or `requestAnimationFrame`-chunked search. A 2-second UI hang while the AI "thinks" feels broken.
- **Imperfect-info / non-deterministic games** (most card games) need different AI: rules-based heuristics, Monte Carlo (MCTS) with determinization, or expectiminimax. Don't shoehorn plain minimax into a hidden-hand card game.

---

## 5. Common bugs to avoid (checklist)

- **Accepting input during animation or the AI's turn** → double moves / corrupted state. Gate all input on the turn state.
- **Offering illegal moves** → validate + highlight only legal moves; reject the rest.
- **(Chess) Allowing a move that leaves your own king in check** → test post-move king safety; this also handles pins.
- **(Chess) Missing en passant / castling-through-check / promotion / draw rules** → use `chess.js` instead of hand-rolling.
- **Scoring stalemate as a win** → stalemate is a draw; checkmate = in check + no legal moves.
- **Biased shuffle** (`sort(Math.random)`) → use Fisher–Yates.
- **State in the DOM/sprites, not a model** → makes AI, undo, and win-checks unreliable; keep a pure model.
- **AI blocks the main thread** → search in a Web Worker or time-boxed/iterative; keep the UI responsive.
- **Minimax min/max sign errors** → a classic; test against known positions (mate-in-1, forced draws).
- **No move history** → can't undo or detect repetition; keep a reversible move stack.

---

## Defaults to apply

1. **For chess, default to `chess.js` (rules/validation/mate) + a board UI lib** rather than hand-rolling. Hand-roll only simple games (tic-tac-toe, connect-4, checkers) or when asked.
2. **Model the game as an explicit turn state machine with one `currentPlayer` source of truth; ignore input during animation/AI turns.** Keep a pure model separate from the view + a reversible move history.
3. **Only ever present and accept LEGAL moves** (generate → filter → highlight). For chess, reject any move that leaves your own king in check.
4. **Detect terminal states correctly** — checkmate vs stalemate (draw!), draws, and full-board ties.
5. **AI = minimax + alpha-beta pruning with a heuristic eval; depth = difficulty; run in a Web Worker / time-boxed so the UI never freezes.** Use MCTS/heuristics (not plain minimax) for hidden-info card games; shuffle with Fisher–Yates.
6. **Minimal scope:** correct rules + turn FSM + legal-move UI + win/draw detection + one AI opponent. Correctness beats features here.

---

## Sources
- chess.js — move generation, validation, check/checkmate/draw detection: https://github.com/jhlywa/chess.js
- chessground — Lichess's board UI: https://github.com/lichess-org/chessground
- Chess Programming Wiki — Minimax: https://www.chessprogramming.org/Minimax
- Chess Programming Wiki — Alpha-Beta: https://www.chessprogramming.org/Alpha-Beta
- Chess Programming Wiki — Evaluation & Piece-Square Tables: https://www.chessprogramming.org/Evaluation and https://www.chessprogramming.org/Piece-Square_Tables
- Red Blob Games — game trees / minimax intuition and grid tools: https://www.redblobgames.com/
- Wikipedia — Fisher–Yates shuffle (unbiased): https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
- Wikipedia — Monte Carlo tree search (imperfect-info/large trees): https://en.wikipedia.org/wiki/Monte_Carlo_tree_search
- MDN — Web Workers (off-thread AI search): https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API

================================================================================
# building-games/references/genres/endless-runner.md
================================================================================

# Genre Playbook — Endless Runner

Auto-forward games where the player dodges obstacles and collects pickups at ever-increasing speed (Temple Run, Subway Surfers, Canabalt, Flappy-adjacent, Chrome Dino). Works in 2D (Phaser) or 3D (Three.js). The whole genre rests on **procedural spawning + object pooling + a difficulty ramp**. Read `../threejs-foundational.md` first (delta time, pooling, mobile input).

---

## 1. Core mechanics (minimal-but-good scope for a demo)

1. **Auto-run:** the player moves forward automatically (or the world scrolls toward a fixed player) at a speed that **increases over time**.
2. **Simple avoidance input:** jump / slide, or lane-switch left/right (or both).
3. **Endless procedural spawning** of obstacles + collectibles as pooled objects.
4. **Collision → death** (one hit or a few lives), with **distance/coins as score**.
5. **Instant restart** and a persisted high score.

One lane setup + jump/slide + one obstacle type + coins + a speed ramp + hi-score is a complete, replayable game. Add power-ups, multiple biomes, and characters later. **The tuning of the speed/difficulty curve is the game.**

---

## 2. The "endless" trick: scroll the world, recycle the pieces

- **Keep the player near a fixed position; move the world toward them** (or move the player and follow with the camera — mathematically equivalent). Fixed-player + moving-world is usually simpler for spawning and scoring by distance.
- **Chunk/segment spawning:** build the track from prefab segments (ground tiles, obstacle patterns). Spawn a new segment ahead when the last one enters view; **despawn/recycle** segments once they pass behind the player/camera.
- **Object pooling is mandatory.** Runners spawn thousands of obstacles/coins over a run — preallocate pools and recycle (`active/visible=false` in Phaser, or a free-list). Never create/destroy per spawn (GC stutter kills the feel).
- **Parallax background** (2D): multiple layers scrolling at different speeds for depth; use `tileSprite`/texture offset scrolling rather than spawning background sprites.
- **Seamless ground:** loop a tiling ground texture by scrolling UV/tilePosition, or ping-pong two ground pieces, so there's no visible seam.

---

## 3. Controls & feel

- **Jump:** use platformer forgiveness where relevant — **jump buffering** (register a press slightly before landing) and a short **coyote window** make it feel fair. Variable jump height optional. Clamp fall speed.
- **Slide/duck:** a timed crouch that shrinks the hitbox; must end even if the key is held-then-released oddly (timer-driven, not just key-held).
- **Lane switch (3D runners):** discrete lanes; **tween** the player smoothly between lane X positions rather than teleporting, and lock input during the transition or allow queueing. Support swipe (mobile) + arrows/A-D (desktop).
- **One-button variants (Flappy/Canabalt):** tap = flap/jump; keep the single input crisp and buffered.
- **Coyote/buffer + snappy, immediate response** — runners punish input lag hard because timing is everything.
- **Fairness rule:** never spawn an **impossible/unavoidable** obstacle combination for the current speed. Constrain the spawner so the player always has a reachable gap/lane (see §5).

---

## 4. Difficulty & scoring

- **Speed ramps up with distance/time** (linear or gently curved), which naturally raises difficulty. Tie obstacle density and pattern complexity to the same progression.
- **Cap the max speed** or the game becomes unplayable / physics/collision get unstable — and above some speed the player literally can't react.
- **Reaction-time budget:** obstacles must appear far enough ahead that the player has time to react at the current speed (spawn distance should scale with speed). This is the core fairness constraint.
- **Score = distance** (+ coins). Persist the high score in `localStorage`. Show near-misses / combos for extra juice.
- **Pickups:** coins in patterns (arcs, lines) that sometimes lure the player into risk; occasional power-ups (magnet, shield, jetpack) on a timer.

---

## 5. Common bugs to avoid (checklist)

- **Creating/destroying objects per spawn** → GC hitches; use pools and recycle off-screen objects.
- **Impossible obstacle combos** → spawner must always leave a reachable gap/lane for the current speed; validate patterns.
- **Obstacles appear too late to dodge** → spawn distance / reaction budget must scale with speed.
- **Unbounded speed** → cap max speed; otherwise collision tunneling and unfair, unplayable pace.
- **Collision tunneling at high speed** → swept/segment collision or sub-stepping, not per-frame overlap only.
- **Visible seams in ground/background** → scroll UV/tilePosition or ping-pong two pieces; don't spawn gap-prone tiles.
- **Objects never despawn** → recycle everythi
