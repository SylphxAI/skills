# Checkout UI Craft Audit

**Scope:** Visual + interaction + a11y polish only. No pricing, plan, or funnel changes.

---

## P0 — Fix now (blocks conversion or fails audits)

| # | Element | Issue | Fix |
|---|---------|-------|-----|
| 1 | **Disabled submit** | Grey button with no reason = users think it's broken. | Keep visible, use `aria-disabled`, show 1-line helper under it ("Enter card details to continue"). Re-validate on blur, not keystroke. |
| 2 | **Card details** | Raw `<input>` for PAN/expiry/CVC risks PCI scope and lacks live card-brand detection. | Swap to Stripe Elements / Adyen Drop-in. Show brand glyph (Visa/MC/Amex) as user types. |
| 3 | **Error toast** | Toasts auto-dismiss; payment errors are actionable. | Move card/decline errors **inline** under the field. Reserve toast for non-blocking notices ("Coupon applied"). |
| 4 | **Email** | Missing `type="email"`, `inputmode`, `autocomplete="email"`. | Add all three; validate on blur, never block on TLD case. |
| 5 | **Coupon** | Apply button hidden, no inline state. | Replace with an inline "Apply" affordance showing: idle → checking → ✓ −$X/mo / ✗ invalid. Recalc totals in place. |

## P1 — Polish (trust + clarity)

- **Async payment state:** Morph submit into spinner + label "Processing…" → lock all inputs, disable back nav, surface a 3–8s timeout fallback ("Still working — don't refresh"). Never leave the button silently spinning.
- **Company name:** Mark optional explicitly ("Company (optional)"), `autocomplete="organization"`. Don't gate submit on it.
- **Success redirect:** Show 600–900ms confirmation state (checkmark + plan name + receipt email line) before route change. Prevents the "did it charge me?" doubt on slow networks.
- **Field hierarchy:** Email + card visually grouped; coupon visually subordinate (smaller, secondary styling) so it doesn't compete with payment.
- **Live formatting:** Card number spaces every 4, expiry auto-`/`, CVC numeric-only with `inputmode="numeric" maxlength=4`.

## P2 — Mobile-specific (where most checkout traffic lives)

- **Single column**, 16px field height padding min, inputs ≥44px tap target.
- **Sticky submit bar** with total + CTA; pulls the price into thumb-zone.
- **Numeric keyboards:** `inputmode="numeric"` for PAN/expiry/CVC; `inputmode="email"` for email.
- **No modals** for coupon or errors — inline expansion only; modals collide with iOS keyboard.
- **Autofill:** test Safari + Chrome autofill; ensure autofill yellow doesn't break contrast.
- **Order summary:** collapsed accordion above the form, expanded below on scroll — not a separate page.

---

## Rubric-critical decisions (the "why")

1. **Inline > toast for actionable errors.** WCAG 3.3.1 + plain conversion sense; toasts fail when keyboard is open on mobile.
2. **Disabled button must be explained**, not just visually muted — opacity alone fails cognitive affordance.
3. **Payment processor Elements over hand-rolled inputs** — reduces PCI surface and gives free brand detection, 3DS handling, and zip formatting.
4. **Visible processing state with timeout** — prevents duplicate submissions (the #1 cause of double-charges) and abandons on slow networks.
5. **Coupon is secondary affordance** — full-paying users should never feel they're missing a deal; power users still find it fast.

## Don't do
- Don't block submit on company name.
- Don't hide totals behind accordions on desktop.
- Don't auto-advance fields ( fights autofill and backspace).
- Don't use red border as the only error signal — pair with icon + text.

---

**Quick wins ranked by impact:** inline errors → explained disabled state → Stripe Elements → sticky mobile CTA → coupon inline feedback → branded success transition.
