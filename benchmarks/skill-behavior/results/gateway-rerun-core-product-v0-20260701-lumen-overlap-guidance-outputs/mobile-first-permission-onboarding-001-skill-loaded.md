Surface: Mobile onboarding flow (Permissions, Account Creation, Subscription Trial)
Primary mobile job: Guide the user to value rapidly by activating an account and starting a trial, eliminating upfront friction.

Critical issues:
- `mobile-ui-6` Requesting notification and location permissions upfront before demonstrating app value -> Move permission prompts to contextual moments (e.g., ask for location when the user searches for nearby content) and use pre-permission screens to explain the "why".
- `mobile-ui-4` Cognitive overload from sequencing four heavy tasks (two permissions, account creation, trial start) in a single rigid flow -> Decouple permissions from onboarding. Let users create an account, start the trial, and experience the core app before asking for system-level access.
- `mobile-ui-5` Form fields and sticky CTAs are likely obscured by the virtual keyboard or lack validation recovery -> Use sticky bottom CTAs with safe-area insets, apply correct keyboard types (e.g., `emailAddress`), and implement scroll-to-error behavior for failed validation.
- `mobile-ui-1` Trial terms and pricing are visually separated or hidden behind scroll -> Present a single, clear hierarchy. Display the trial duration, price, renewal terms, and the primary "Start Trial" CTA together in a bottom sheet or sticky bottom container.

Polish opportunities:
- `mobile-ui-8` Hard blocks or dead-ends when users deny permissions or hit network issues -> Add "Skip for now" options and provide clear manual opt-in paths in the UI later. 
- `mobile-ui-7` Blank screens or frozen UI during account creation and trial processing -> Replace with layout-preserving skeleton screens or short, labelled loading states.
- `mobile-ui-3` Destructive or secondary actions (e.g., "Cancel", "Restore Purchases") placed too close to primary CTAs -> Increase spacing between primary and secondary actions and ensure all touch targets meet minimum 44x44pt sizes.
- `mobile-ui-2` UI overlaps with platform navigation chrome -> Apply explicit safe-area insets to bottom sheets, CTAs, and form containers to prevent overlap with notches or gesture bars.

Accessibility checks:
- Screen reader: Ensure every form input, permission rationale, and subscription term has a descriptive accessible name, role, and state. Announce validation errors or trial success immediately.
- Focus order: Focus must logically follow the visual flow. When a modal or bottom sheet opens (e.g., for location or trial), trap focus inside and return it to the triggering element when dismissed.
- Dynamic type / text scaling: Trial terms, pricing, and form labels must reflow gracefully at large dynamic text sizes without truncating or overlapping the keyboard and bottom CTAs.
- Motion and animation: Replace auto-advancing onboarding carousels or decorative transitions with instant or subtle state changes. Respect reduced-motion preferences.

Mobile acceptance checks:
- Verify `permission_prompt_shown`, `permission_result`, `purchase_started`, and `primary_action_tapped` events fire correctly without blocking the UI.
- Confirm that denying notifications or location does not prevent the user from completing account creation and starting a trial.
- Validate that the virtual keyboard smoothly pushes up the sticky "Create Account" CTA without visual glitching.
- Check that "Restore Purchases" and "Terms of Service" links are easily reachable via keyboard or screen reader without accidental taps.
