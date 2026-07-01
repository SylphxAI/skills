# Checkout Form UI Audit — Highest-Impact Craft Fixes

## P0 — Blocker-class issues

**1. Disabled submit gives no signal**
A disabled button without context reads as "broken." Add a live tooltip/helper text under the button that resolves as conditions are met (e.g., "Add card details to continue") and switch to an enabled *visually distinct* state (filled, not just less-opacity). Re-enable as soon as required fields are valid; don't wait for blur.

**2. Error toast is decoupled from the cause**
Toasts are transient and un-anchored. Fix: route field-level errors to inline messages tied to the offending input (aria-describedby + role="alert"), and use the toast only for system/network failures with a retry CTA. Ensure the toast does not auto-dismiss in <4s and is keyboard-dismissable.

**3. Card field inputmode/autocomplete**
Common miss: card number rendered as `type="text"`. Use `inputmode="numeric"`, `autocomplete="cc-number"`, `cc-exp`, `cc-csc`. Without these, mobile keyboards fall back to full QWERTY and Apple/Google Pay autofill is suppressed — directly hurts conversion.

---

## P1 — High-impact craft

**4. Async payment state is ambiguous**
Replace the single button spinner with a layered state:
- Button → "Processing…" + disabled, label swap, no layout shift.
- Card region → subtle skeleton/border highlight to localize progress.
- Page → trap focus, prevent navigation (beforeunload guard) so the user can't double-submit or leave mid-charge.

Add a server-side idempotency key; client should disable the button the moment it's tapped, not when the network responds.

**5. Coupon field placement and state**
Don't hide it behind an expander. Render inline above the order summary with: input → "Apply" affordance → inline result state ("✓ -20%" / "Invalid code — try again") that never reflows the layout. Validate async with debounce; clear stale results when the user edits.

**6. Field validation timing**
Validate on blur, not on every keystroke. Show success states only after blur and only for non-sensitive fields (email format, company length). For card details, mask format with separators (4242 4242 4242 4242) as the user types.

**7. Email field hardening**
Add `type="email"`, `autocomplete="email"`, single-line with `spellcheck="false"`, lowercase normalization on submit. Display domain typo suggestions (gmial.com → gmail.com) — high ROI, low effort.

---

## P2 — Polish that separates good from great

**8. Mobile layout specifics**
- Sticky bottom submit bar within the viewport (not page-bottom) so the thumb doesn't travel.
- 16px+ input font-size to prevent iOS auto-zoom on focus.
- Numeric keyboards for CVC and card; text keyboard for company/email.
- Order summary as a collapsible `<details>` above the fold on small screens — don't hide totals behind scroll.

**9. Success redirect handoff**
A silent redirect loses confirmations. Show a brief (600–1200ms) success state with checkmark + "Receipt sent to {email}" before navigating. Preserves trust and gives users a fallback if the redirect stalls.

**10. Accessibility wiring**
- Single `h1` per step, landmark `<main>`.
- `aria-live="polite"` region for async coupon/payment results.
- Visible focus rings (no `outline:none` without replacement).
- Color contrast ≥ 4.5:1 for helper text and disabled states — disabled ≠ invisible.

---

## Summary of highest-leverage moves

| Fix | Impact | Effort |
|---|---|---|
| Enabled-state + helper text on submit | Clarity, conversion | Low |
| Inline field errors vs toast-only | Recoverable failures | Low |
| Correct inputmode/autocomplete on card | Mobile conversion | Low |
| Async state layering + idempotency | Trust, no double-charge | Medium |
| Sticky mobile submit + 16px inputs | Thumb reach, no zoom | Low |
| Email typo suggestions | Conversion | Low |

**Skip:** visual redesign, copy rewrites, payment-provider swap — these are strategy-adjacent. The above are pure craft fixes with measurable conversion and trust lift.
