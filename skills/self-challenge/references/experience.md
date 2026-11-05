# Experience standard

Trigger: designing or reviewing any user-facing surface across web, mobile, desktop, CLI, or games.

## Hard lines

- **Category-leader benchmark:** Design and verify every user journey against the current global category leader (`../../deliver-and-verify/references/parity.md`). A remake replaces its original only when every original screen and feature grades `EQUAL` or `BETTER` on the parity sheet.
- **Immediate value:** Place users in the product's core loop as fast as possible (`../../deliver-and-verify/references/performance.md`), using passwordless single-entry sign-in (`../../deliver-and-verify/references/auth.md#the-one-sign-in-flow`) only when identity is needed.
- **Inspect rendered pixels, not just DOM or schemas:** Verify layout, typography, contrast, hit areas, motion, and audio on the actual rendered frames across phone, tablet, and desktop viewports (`../../deliver-and-verify/references/parity.md#ui-coverage-geometry-and-painted-output`).

## Account protection

Let people try or play before asking them to sign in where the product supports guest use. When a guest links an email, passkey, or social login—or completes a purchase—preserve their existing account ID, progress, and entitlements in place (`../../deliver-and-verify/references/auth.md#guests-and-linking-logins`). If the chosen login is already bound to another account with data, present an explicit choice rather than silently overwriting either account.

## Brand home

Every product surface—landing page, app store listing, onboarding, and in-app chrome—projects a cohesive, trustworthy, well-established brand (`../../clear-writing/references/articles-and-copy.md`):
- **Specific, accurate value propositions:** Lead with the concrete outcome the user gets right now. Never ship placeholder copy, dead buttons, or `"Coming soon"` badges (`product.md#practices`).
- **Clear recovery states:** Every empty, loading, offline, or error state tells the user what happened in plain language, confirms their data/payment is safe, and gives the single action to recover.

## How it is judged

Measure time to first value, task completion rate, cold/warm startup latency (`../../deliver-and-verify/references/performance.md`), and side-by-side visual/behavioral parity against the category leader (`../../deliver-and-verify/references/parity.md`).

## Reachable mobile checkout

When a mobile purchase selection leaves the primary pay action far below the
chosen option, use the top-up category pattern: a pinned bottom bar showing the
selected amount and the pay button. Derive both from the same selected state so
the amount cannot drift from the order. Test changing options, safe-area insets,
keyboard display, loading and disabled states on a phone; reserve content space
so the bar never hides the final option or required terms. A short checkout with
an already reachable action does not need another bar. Apply the
[money-copy checks](../../clear-writing/references/articles-and-copy.md#money-and-time-in-consumer-copy)
to its labels.

## Focus and error states

A focus ring identifies the active control; an error colour identifies invalid
input. Sharing the colour makes a valid focused field look broken. Give focus a
visible neutral ring when the brand is red, reserving red for errors and the
primary call to action (CTA). Verify keyboard focus on valid and invalid fields,
including against the CTA background; retain text or icons for errors rather
than relying on colour alone.

## Immersive scenes and UI proxies

First-person immersive, UI fills the gaps. Keep what the
person can see in the 3D scene. Supply UI proxies for important information or
actions that are off-screen, occluded, too small to read or too small to tap.
Apply the same visibility and legibility test to 2D/3D interfaces rather than
forcing a particular orientation.

Aspect ratio and orientation change the camera frustum, not the interaction
model. The shared engine projects tagged important entities, checks visibility
and readable/tappable size, and shows their UI proxies when those checks fail.
Use hysteresis around the thresholds so a small camera movement cannot flicker
a proxy on and off. Titles supply entity importance and proxy content, not
per-aspect layouts or rotate prompts. Verify state continuity and proxy actions
through the [continuous-aspect parity check](../../deliver-and-verify/references/parity.md#continuous-aspect-ratios-and-visibility).
