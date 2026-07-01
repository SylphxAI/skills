Surface:  
Mobile onboarding flow: value intro → notification permission → location permission → account creation → subscription trial start

Primary mobile job:  
Get the user to first value/activation with the least required setup, while asking for permissions, account, and payment only when they are clearly tied to immediate value.

Critical issues:
- `mobile-ui-4` Too many high-friction decisions before activation: notifications, location, account, and trial all compete for attention -> Reorder the flow around first value. Show one value promise, one setup action, then progressively ask only what is needed.
- `mobile-ui-6` Permissions are likely being asked before the user understands why they matter -> Replace upfront system prompts with feature-triggered asks. Use short pre-permission screens only when they reduce surprise.
- `mobile-ui-6` Notification permission before trust is established will cause denial and drop-off -> Delay notification ask until the user enables a reminder, alert, tracking, or follow-up feature. Offer “Not now.”
- `mobile-ui-6` Location permission before contextual value feels invasive -> Ask location only when the user taps a location-based feature. Offer manual ZIP/city/search entry as an alternative.
- `mobile-ui-5` Account creation before activation adds avoidable typing friction -> Allow guest mode, magic link, Apple/Google sign-in, or defer account creation until save/sync/share/purchase is needed.
- `mobile-ui-4` Subscription trial start appears too early if users have not experienced value -> Move paywall/trial ask after an activation moment, preview, result, or personalized setup. If paywall must appear early, clearly show benefits and allow restore/support.
- `mobile-ui-1` Primary action may be hidden or inconsistent across screens -> Use a sticky bottom CTA above the home indicator. Keep one primary CTA per step: “Continue,” “Enable location,” “Create account,” or “Start trial.”
- `mobile-ui-2` Permission sheets, paywall CTAs, and forms may conflict with safe areas, keyboard, and system chrome -> Ensure sticky CTAs reflow above keyboard/home indicator and that bottom sheets respect safe areas.
- `mobile-ui-5` Account creation likely requires too much mobile input -> Minimize fields. Use passwordless auth, autofill, correct keyboard types, paste support, visible errors, and no premature validation.
- `mobile-ui-7` If onboarding includes personalization/loading, blank waits increase abandonment -> Use stable skeletons, progress text, and optimistic transitions. Avoid full-screen spinners without context.
- `mobile-ui-8` Permission denial or skipped setup may dead-end the user -> Provide recovery paths: “Use manually,” “Remind me later,” “Open Settings,” and continue with reduced functionality.
- `mobile-ui-11` Paywall, permission, and form screens need full accessibility support -> Ensure names, roles, values, focus order, dynamic type, reduced motion, and non-gesture alternatives are preserved.

Polish opportunities:
- `mobile-ui-4` Replace multi-slide onboarding with a single value screen -> Headline: what the app does, subtext: why it matters, CTA: “Get started,” secondary: “I already have an account.”
- `mobile-ui-4` Add lightweight progress only if the flow has unavoidable steps -> Use “Step 1 of 3” rather than a long progress bar that makes the flow feel heavy.
- `mobile-ui-1` Use skip paths where safe -> “Not now” for notifications, “Enter manually” for location, “Continue as guest” before account creation.
- `mobile-ui-6` Use permission copy tied to user benefit -> “Get alerts when X changes” instead of “Allow notifications.” “Find options near you” instead of “Allow location.”
- `mobile-ui-5` Support one-tap auth -> “Continue with Apple” and “Continue with Google” should be above email/password.
- `mobile-ui-5` If email is needed, ask only for email first -> Defer password/profile fields. Use email autofill, magic link, and visible resend state.
- `mobile-ui-4` Make subscription decision understandable -> Show price, trial length, renewal date, cancellation terms, restore purchase, and support together.
- `mobile-ui-9` Add predictable account and billing recovery -> Paywall should include “Restore purchase,” “Terms,” “Privacy,” and “Contact support.”
- `mobile-ui-7` Use perceived-speed patterns -> Preload next onboarding screen, avoid heavy animations, and show immediate feedback after taps.
- `mobile-ui-10` For mobile web onboarding, test browser bars and virtual keyboard -> Avoid `100vh` bugs; ensure CTAs are not covered by Safari/Chrome chrome.

Recommended revised flow:
1. Welcome/value screen  
   - One clear promise.  
   - CTA: “Get started.”  
   - Secondary: “Sign in.”

2. Lightweight personalization or first action  
   - Ask only 1–2 high-value questions if needed.  
   - No account yet unless required.

3. First value preview  
   - Show a personalized result, recommendation, dashboard, map, alert setup, or sample outcome.

4. Contextual location ask  
   - Trigger only when location improves the visible result.  
   - Options: “Use my location,” “Enter manually,” “Not now.”

5. Contextual notification ask  
   - Trigger when the user opts into alerts/reminders.  
   - Options: “Notify me,” “Not now.”  
   - If denied, show manual recovery later in settings.

6. Account creation  
   - Ask when the user wants to save, sync, continue, or start trial.  
   - Prioritize Apple/Google/passwordless sign-in.

7. Subscription trial  
   - Present after value is demonstrated.  
   - Include trial length, price, renewal date, cancellation, restore, support, and privacy links.  
   - CTA: “Start free trial.”  
   - Secondary where appropriate: “Maybe later” or limited free path.

Accessibility checks:
- Screen reader:
  - Every CTA, permission option, restore link, price, trial term, and error has accessible name, role, value, and state.
  - Permission and paywall screens announce the main decision before secondary content.
  - Icons are not the only way to communicate location, notification, trial, or account status.

- Focus order:
  - Focus follows task order after each screen transition, permission denial, validation error, paywall open, and purchase completion.
  - Bottom sheets trap focus while open and return focus when dismissed.
  - Keyboard users can reach primary, skip, restore, support, terms, and privacy actions.

- Dynamic type / text scaling:
  - Large text does not clip trial terms, permission explanations, form errors, or sticky CTAs.
  - CTAs reflow above keyboard, home indicator, and browser chrome.
  - Price, renewal, and cancellation copy remain visible.

- Motion and animation:
  - Respect reduced motion.
  - Avoid auto-advancing onboarding carousels.
  - Keep loading/success animation brief and paired with text status.

Mobile acceptance checks:
- User can reach first value without granting notifications.
- User can use manual location entry if location is denied or skipped.
- User can continue without creating an account until save/sync/trial is needed.
- Account creation supports autofill, one-tap auth, and visible error recovery.
- Paywall shows trial length, price, renewal date, cancellation terms, restore, support, privacy, and terms together.
- Primary CTA is visible, reachable, and above safe areas/keyboard on small phones.
- Permission denial never dead-ends the flow.
- No screen has more than one competing primary action.
- Loading states preserve layout and never show a blank white screen.
- Analytics track: `screen_viewed`, `primary_action_tapped`, `permission_prompt_shown`, `permission_result`, `input_error_shown`, `purchase_started`, `restore_started`, `offline_state_shown`, `support_opened`, `accessibility_text_size_bucket`, `reduced_motion_enabled`, and `screen_reader_enabled`.
