# One-cycle invoke (copy/paste)

```text
$continuous-product-quality

Engagement <id> status=active cycle=<n>
Outer objective: <product north-stars>
State path: <path>

Run exactly ONE betterment cycle (card → admit all high-L B → execute → verify → write state).
Goal API if present: outer objective only, no budget; complete only at engagement idle.
Do not ask the user to start the next cycle.
```

Multi-cycle: re-send this after each turn while `status=active`, or attach a Codex automation heartbeat (see `docs/reference/betterment-engagement-runner.md`).
