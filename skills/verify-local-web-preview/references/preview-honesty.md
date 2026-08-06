# Preview honesty (agent ↔ human)

Distilled from app-builder workspace kits; portable to any host.

## Do

- Treat the human’s visible surface as **their** preview/client—not your loopback
  shell, container path, or agent-only port.
- Verify load/render yourself with host browser tools or `browser-smoke.mjs`
  when a local server exists.
- Describe product behavior and residual risk in user language.
- Keep the preview server up when the human is expected to look.
- Say clearly when a capability needs native APIs you cannot polyfill in-web.

## Avoid

- Asking the human to open `localhost`, paste logs, or run install commands for
  basic QA you can do.
- Implying they can see `/tmp`, container paths, or your IDE terminals.
- Ending with “let me know if it works” as a substitute for verification.
- Confusing **preview** (ephemeral, may reset DB/state) with **production**.

## Evidence

Record URL (or preview channel), screenshot path, console error summary, and
what was not tested (mobile, auth, payments).
