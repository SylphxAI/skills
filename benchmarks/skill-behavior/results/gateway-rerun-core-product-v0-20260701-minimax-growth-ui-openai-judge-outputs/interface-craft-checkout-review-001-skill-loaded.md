## Review: SaaS Checkout Form

P0 — `CheckoutForm.tsx:118` — `ic-status-3`
Issue: Error toast shows generic message ("Something went wrong") with no cause or next action. Users re-click Submit and double-charge or bail at the final step.
Fix: Render toast with three slots — what failed (`Card declined`), why if known (`Insufficient funds`), and one concrete action (`Try a different card` or `Use saved card`). Keep it within the inline status region so screen readers announce it.

P0 — `CheckoutForm.tsx:74` — `ic-control-3`
Issue: Submit button is disabled with no explanation. On mobile, users can't tell whether email is invalid, coupon is missing, or the request is in flight, and they blame the form.
Fix: Show a single inline hint near the button ("Enter a valid email to continue") and disable button only after the first submit attempt, not on initial load.

P0 — `CheckoutForm.tsx:201` — `ic-control-2`
Issue: Async payment state lacks a duplicate-submit guard. A double-tap on mobile, a slow network, or a throttled click can submit the payment twice.
Fix: Move submit to a state machine (`idle → submitting → success | error`), disable the button on entry into `submitting`, and ignore further `onClick` and Enter-key submits. Re-enable only on terminal error, never on success.

P0 — `CheckoutForm.tsx:42` — `ic-form-1`
Issue: Company name and Coupon labels are visually present but not programmatically linked to the inputs (`<div>Label</div><input>`). Cardholder name, expiry, and CVC share the same problem, worse on mobile where zoom breaks visual proximity.
Fix: Wrap each input in its `<label>` or pair with `htmlFor`/`id`. Group Card Details in a `<fieldset>` with a legend for screen reader orientation.

P0 — `CheckoutForm.tsx:309` — `ic-status-1` + `ic-motion-1`
Issue: Async payment shows a spinner with no copy and a non-essential shimmer. Reduced-motion users see the same wait with zero feedback, and all users cannot estimate duration.
Fix: Replace spinner with a labeled status ("Securing payment…", then "Confirming with your bank…") that updates as intent progresses. Disable the shimmer under `prefers-reduced-motion: reduce`.

P0 — `CheckoutForm.tsx:376` — `ic-status-2`
Issue: Success state fires `redirect()` with no confirmation the result actually persisted (e.g., order ID, receipt). Users who reload mid-redirect think payment failed.
Fix: Show a short confirmation panel for 600–1000ms with the order ID and "Receipt sent to [email]" before navigating, and persist the ID in `sessionStorage` so reload lands on the receipt page instead of re-charging.

---

### Smaller (still material) findings

- `CheckoutForm.tsx:88` — `ic-form-3`: Enter inside a one-line card field, coupon, or email submits the form; confirm Enter on the card number formats runs as expected and Enter on cardholder name does not submit prematurely.
- `CheckoutForm.tsx:155` — `ic-control-1`: Coupon "Apply" hit target is ~28px tall on mobile; expand the tap area even if the visual button stays compact.
- `CheckoutForm.tsx:264` — `ic-type-3`: "3 items in your order" hard-codes plural; switch to an `Intl.PluralRules` message so localized strings stay correct.

### Implementation plan

1. Land the duplicate-submit state machine and the labeled error toast first — these are the two checkout-blocking fixes.
2. Wire every label (`htmlFor`/`id` or wrapping `<label>`) and add a `<fieldset>` around Card Details. Verify with VoiceOver/NVDA that focus order matches reading order.
3. Replace the spinner with a multi-step status region, gated by `prefers-reduced-motion`, and add an Enter-key test across email, coupon, and each card field.
4. Persist the order ID on success and render a brief confirmation before redirect; test reload mid-redirect lands on the receipt, not the checkout.
5. Increase the Coupon apply tap target to ≥44px and swap the hard-coded plural to `Intl.PluralRules`.
6. Smoke-test disabled, loading, duplicate-submit, error, success, focus, mobile 360px, and reduced-motion states before shipping.
