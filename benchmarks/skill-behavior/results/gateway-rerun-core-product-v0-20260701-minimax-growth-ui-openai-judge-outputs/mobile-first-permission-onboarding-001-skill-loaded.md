```text
Surface: Onboarding flow (4 steps: notifications, location, account creation, trial start)
Primary mobile job: Reach a usable, personalized app state as quickly as possible with minimal taps and zero "what is this?" moments.

Critical issues:
- mobile-ui-1 + mobile-ui-4: Four sequential gates before value is too much. Show one primary action per screen and let "Skip" exist where safe (location, notifications). Move non-essential asks post-activation.
  Fix: Reorder to value -> account (only gate that truly blocks) -> trial -> ask notification on first relevant event, ask location on first map/content need.

- mobile-ui-6: Permissions asked at the wrong moment. Notification + location prompts at minute zero teach users to deny.
  Fix: Defer notification prompt until the first moment an alert would be missed (e.g., "We'll ping you when X updates — allow?"). Defer location until a feature needs it; provide search/manual entry as the default path.

- mobile-ui-5: Account creation is likely an email/password wall with inline validation. Replace with Apple/Google Sign-In first, email as secondary, and biometric for returning users.
  Fix: One-tap SSO primary, magic link fallback, autofill hints (emailAddress, oneTimeCode, newPassword). Validate after intent, not on every keystroke.

- mobile-ui-3: Trial start has destructive "Subscribe" sitting next to "Restore Purchase" / "Terms" with similar weight.
  Fix: Make trial CTA the single primary filled button; demote Restore, Terms, Privacy to text links below. Keep destructive/cancel paths visually subordinate.

- mobile-ui-2: Safe areas and keyboards not respected on forms and trial sheet; submit button hides behind keyboard or home indicator on small devices.
  Fix: Sticky CTA above keyboard using keyboardLayoutGuide / visualViewport. Add bottom safe-area inset to all sheets and footers.

- mobile-ui-7: Loading screens between steps show blank spinners; users think the app froze and back out.
  Fix: Skeletons matching final layout, optimistic UI for account, progress dots indicating "Step 2 of 3."

Polish opportunities:
- mobile-ui-8: No "skip for now" on notifications/location. Add skip; remember choice and re-prompt contextually with explanation.
- mobile-ui-1: Replace a welcome carousel with a single value-promise screen + immediate first-action button.
- mobile-ui-4: Collapse trial + price + cancellation + restore into one screen; show "$X.XX / week, cancel anytime, Restore Purchase" inline — not split across steps.
- mobile-ui-9: Surface "Sign in" link visibly for returning users; do not bury it.
- mobile-ui-10: On mobile web, defer install prompt to a natural pause, not mid-form.
- mobile-ui-11: Reduced-motion users get instant transitions; no auto-advancing carousels.

Accessibility checks:
- Screen reader: Each gate announces its decision first ("Allow notifications?" before explaining why). Icons never carry meaning alone; pair with text.
- Focus order: After permission denial, focus returns to the triggering control. Modal sheets trap focus; dismissal returns to the gate that opened them.
- Dynamic type / text scaling: Price, trial length, cancellation copy stay readable at AX5; sticky CTAs reflow, do not clip the home indicator or keyboard.
- Motion and animation: Respect reduced-motion; loading < 400ms or cancellable; success animation paired with "Done" text. No haptic-only feedback.

Mobile acceptance checks:
- Reach first usable state in <= 2 taps from launch (SSO path).
- Zero permission prompts before the user sees app value.
- Primary CTA reachable in thumb arc on 6.1" devices; tap target >= 44x44 pt.
- Forms survive keyboard open, orientation change, and dynamic type up to AX5.
- Offline: account creation queues and retries; trial screen shows cached price with offline banner.
- Restore Purchase reachable in <= 2 taps from trial screen.
- Events fired: screen_viewed, primary_action_tapped, permission_prompt_shown, permission_result, purchase_started, restore_started, screen_reader_enabled, reduced_motion_enabled, accessibility_text_size_bucket.
```

Quick patch plan (ordered by activation lift):
1. Cut to 2 mandatory steps: SSO account + trial confirmation. Make permissions contextual.
2. One screen for trial: price, period, renewal, cancel, restore, support — all visible together.
3. Sticky primary CTA above keyboard; skip/back on every optional gate.
4. Skeleton loading + progress indicator between steps.
5. Accessibility pass: announce decisions, support reduced motion, verify at AX5.
6. Instrument the event list above; watch drop-off per step and per permission prompt.
