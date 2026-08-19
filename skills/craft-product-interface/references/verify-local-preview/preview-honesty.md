# Preview honesty (agent ↔ human)

Distilled from app-builder workspace kits; portable to any host.

## Verification contract

- Treat the human’s visible surface as **their** preview/client—not your loopback
  shell, container path, or agent-only port.
- Verify load/render yourself with host browser tools or `browser-smoke.mjs`
  when a local server exists.
- Describe product behavior and residual risk in user language.
- Keep the preview server up when the human is expected to look.
- Say clearly when a capability requires native APIs beyond an in-web polyfill.

## Communication boundary

- Perform available basic QA directly before asking the human for inaccessible
  environment steps.
- Share paths and surfaces the human can actually access.
- Report the observed result and remaining checks directly.
- Label **preview** as ephemeral and potentially state-resetting, distinct from
  **production**.

## Evidence

Record URL (or preview channel), screenshot path, console error summary, and
what was not tested (mobile, auth, payments).
