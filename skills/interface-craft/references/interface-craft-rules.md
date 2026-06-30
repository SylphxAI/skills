# Interface Craft Rules

Use these as candidate rules, not a checklist to force into every surface.

## Forms

- `ic-form-1` — Programmatically connect every visible label to its input.
- `ic-form-2` — Preserve IME composition; do not submit or transform text during composition events.
- `ic-form-3` — Make Enter context-aware: submit single-field forms, add a line in multiline fields, select highlighted suggestions in comboboxes.
- `ic-form-4` — Let long input remain editable; do not hide the caret or make overflow unrecoverable.
- `ic-form-5` — Offer paste helpers only where paste is a frequent path, such as invite codes, URLs, tokens, or addresses.

## Buttons and controls

- `ic-control-1` — Ensure the hit target is at least 44px where practical, even if the visual target is smaller.
- `ic-control-2` — Guard irreversible or expensive actions against duplicate clicks.
- `ic-control-3` — Use disabled states to explain the missing requirement, not just to block.
- `ic-control-4` — Use pointer cursors for navigation and clickable controls consistently; do not rely on cursor alone.

## Motion

- `ic-motion-1` — Honor `prefers-reduced-motion` for non-essential animation.
- `ic-motion-2` — Keep frequent interactions fast and quiet; reserve expressive motion for rare transitions.
- `ic-motion-3` — Make animations interruptible; a user reversing an action should not wait for choreography.
- `ic-motion-4` — Preserve spatial continuity: modals close toward origin, selected items move rather than teleport, shared elements keep identity.
- `ic-motion-5` — Prevent font-weight or icon swaps from shifting layout.

## Typography and content

- `ic-type-1` — Truncate paths and long identifiers from the middle when the start and end carry meaning.
- `ic-type-2` — Keep brand names, product names, and user-provided capitalization exact.
- `ic-type-3` — Match plural labels to the count.
- `ic-type-4` — Prefer concrete action labels over vague labels such as "here" or "learn more".

## Feedback and status

- `ic-status-1` — Loading states should explain what is happening when wait time is noticeable.
- `ic-status-2` — Success feedback should confirm the durable result, not merely disappear.
- `ic-status-3` — Error text should say what failed, why if known, and what the user can do next.
- `ic-status-4` — Use ambient status for background lifecycle changes; avoid modal interruptions for non-blocking updates.

## Navigation and browser shell

- `ic-shell-1` — Preserve meaningful UI state in the URL when it supports sharing, reload, back/forward, or support debugging.
- `ic-shell-2` — Prevent accidental browser navigation only inside surfaces with intentional horizontal swipes.
- `ic-shell-3` — Keep active navigation visible when content scrolls.
- `ic-shell-4` — Align theme color, favicon, and app icon treatment with the active theme where the platform supports it.

## Empty states and first-run

- `ic-empty-1` — Empty states should tell the user what belongs here and offer the next useful action.
- `ic-empty-2` — Use examples that match real user vocabulary; avoid lorem ipsum and fake metrics.
- `ic-empty-3` — First-run guidance should be dismissible, recoverable, and not block expert users.
