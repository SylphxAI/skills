```text
P0 — checkout/PaymentForm.tsx:42 — ic-control-2, ic-status-1
Issue: Async payment state does not guard against duplicate submission, risking double charges. The loading state lacks clear feedback regarding what is happening.
Fix: Immediately disable the submit button and show an inline spinner with text (e.g., "Processing payment...") on click. Ensure the backend safely handles or blocks duplicate network requests.

P0 — checkout/ErrorToast.tsx:15 — ic-status-3
Issue: The error toast displays a generic "Payment failed" message, leaving the user unaware of what went wrong or what to do next.
Fix: Map backend errors to specific, actionable messages (e.g., "Your card was declined. Check your details or try another card", or "Coupon expired").

P1 — checkout/SubmitButton.tsx:28 — ic-control-3
Issue: The disabled submit button is purely visual and doesn't explain the missing requirement.
Fix: Keep the button visibly distinct but include a tooltip or subtle helper text below it indicating the exact blocker (e.g., "Enter valid email and card details to continue").

P1 — checkout/Inputs.tsx:55 — ic-control-1, ic-motion-1
Issue: Coupon "Apply" button and card details lack adequate mobile touch targets. Focus states may be hard to spot on small viewports.
Fix: Ensure all inputs and the coupon button have a minimum 44x44px hit target. Implement clear `focus-visible` rings for keyboard navigation, and ensure no jarring layout shifts occur when keyboard or autofill engages.

P2 — checkout/SuccessRedirect.tsx:10 — ic-status-2
Issue: Success state instantly redirects the user without confirming the durable result.
Fix: Render a brief, unambiguous success state ("Payment successful! Redirecting to your dashboard...") before transitioning. Respect `prefers-reduced-motion` by keeping the confirmation static or fading instantly rather than using an elaborate animation.

Implementation plan:
1. Fix P0 duplicate-submit guards (disable button + async idempotency) and replace generic toasts with specific, actionable error text.
2. Address mobile layout and touch targets: enforce 44px minimum heights on all inputs and buttons, and verify correct mobile keyboards (`inputmode`) are used for email and numeric card entry.
3. Add focus states to all inputs, improve the disabled button messaging, and implement a calm, reduced-motion-compatible success confirmation state.
```
