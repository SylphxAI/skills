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
