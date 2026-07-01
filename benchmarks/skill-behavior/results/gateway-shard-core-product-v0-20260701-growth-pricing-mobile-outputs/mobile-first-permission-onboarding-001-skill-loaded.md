Surface:  
Mobile onboarding flow: notifications permission, location permission, account creation, subscription trial start.

Primary mobile job:  
Get the user to first value/activation with the least friction, while collecting only the permissions and commitments needed at the moment they become useful.

Critical issues:
- `mobile-ui-4` Too many high-friction asks are stacked before value: notifications, location, account, and trial all feel like blockers. -> Reorder around value: show one clear value promise, let the user experience or preview the core benefit, then ask only for the next required action.
- `mobile-ui-6` Permissions are likely being requested before users understand why they matter. -> Use just-in-time permission prompts. Ask for location only when the user taps a feature that needs location. Ask for notifications only after showing what alerts/reminders they will receive.
- `mobile-ui-1` Primary next step may be buried behind multiple screens or competing CTAs. -> Each onboarding screen should have one obvious primary action in a sticky bottom area above the gesture bar: “Continue,” “Use my location,” “Create account,” or “Start trial.”
- `mobile-ui-4` Account creation before activation increases abandonment. -> Offer guest/preview mode where safe. Delay account creation until the user saves something, personalizes data, syncs, or starts the trial.
- `mobile-ui-5` Account creation may be too form-heavy for mobile. -> Prefer Apple/Google sign-in first, then email. Use autofill, password manager support, correct keyboard types, visible errors, and avoid asking for nonessential profile fields.
- `mobile-ui-4` Subscription trial start before trust/value creates a hard stop. -> Move paywall after the user understands the product outcome. If subscription is required, show a short personalized preview before the trial ask.
- `mobile-ui-2` Trial CTA, form submit, or permission explanations may conflict with safe areas/keyboard. -> Keep bottom CTAs above the home indicator, ensure forms scroll when keyboard opens, and keep error messages visible.
- `mobile-ui-3` Trial start and cancellation-adjacent actions may be too close or unclear. -> Separate routine CTA from destructive/commitment actions. Make “Not now,” “Skip,” or “Maybe later” tappable where permitted.
- `mobile-ui-7` Any setup/loading between steps may feel like dead time. -> Use stable loading states, short progress feedback, and avoid blank white screens after account creation or trial start.
- `mobile-ui-8` Permission denial likely leads to a dead end. -> Provide recovery states: “Continue without location,” “Choose city manually,” “Enable later in Settings,” or “Remind me later.”

Polish opportunities:
- `mobile-ui-4` Replace multi-slide education with one compact value screen. -> Use: headline benefit, one supporting visual, one primary CTA, one secondary skip/sign-in option if applicable.
- `mobile-ui-6` Add pre-permission screens only when they reduce surprise. -> Example: “Enable location to show results near you. You can change this anytime.” Then trigger the native prompt after the user taps.
- `mobile-ui-5` Reduce typing. -> Use SSO, email autofill, magic link/passkey where appropriate, and defer username/profile setup.
- `mobile-ui-1` Use a progress indicator only if it reduces uncertainty. -> Example: “Step 1 of 3” for required setup. Avoid making the flow feel longer than necessary.
- `mobile-ui-10` If this is mobile web, handle browser bars and keyboard. -> Use dynamic viewport units, avoid fixed CTAs hidden by browser chrome, and test install/open-in-app prompts so they do not interrupt onboarding.
- `mobile-ui-9` Subscription flow must include predictable controls. -> On paywall, show price, trial length, renewal date, cancellation terms, restore purchase, privacy/support links together.
- `mobile-ui-7` After trial/account success, immediately land users in the activated state. -> Avoid “success” dead ends; route to the first useful screen with a visible next action.
- `mobile-ui-8` Support partial activation. -> If notification denied but location allowed, continue and explain what is missing only when relevant.

Recommended revised flow:
1. Welcome/value screen  
   - One benefit-led headline.  
   - Primary CTA: “Get started.”  
   - Secondary: “Sign in” or “Continue as guest” if supported.

2. Lightweight personalization or preview  
   - Ask only one high-signal question or show an example result.  
   - No native permissions yet unless absolutely required.

3. Location request at moment of value  
   - Screen: “Show results near you.”  
   - Primary: “Use current location.”  
   - Secondary: “Enter location manually” / “Skip for now.”  
   - Then show native location prompt only after tap.

4. First value screen  
   - Show actual or sample personalized content.  
   - Let the user interact before asking for notifications or payment where possible.

5. Notification request after relevance  
   - Trigger when user creates/follows/saves something that benefits from alerts.  
   - Explain specific notification type: “Get reminded before X” or “Know when Y changes.”  
   - Include “Not now.”

6. Account creation at save/sync/commit point  
   - Ask when needed to preserve progress or continue across devices.  
   - Prefer Apple/Google/passkey.  
   - Defer optional fields.

7. Trial/paywall after demonstrated value  
   - Show what unlocks, price, trial period, renewal date, cancellation, restore purchase, and support.  
   - Primary CTA: “Start free trial.”  
   - Secondary, if allowed: “Not now” or “Continue limited version.”

Mobile acceptance checks:
- Primary CTA is visible without scrolling on every onboarding screen.
- Bottom CTAs respect safe area and remain usable with the keyboard open.
- No screen has more than one primary action.
- Native notification/location prompts appear only after a user action that explains the value.
- Permission denial has a useful fallback path.
- Account creation can be completed with SSO/autofill and minimal typing.
- Trial screen shows trial length, renewal date, price, cancellation terms, restore, support, and privacy links together.
- Users can reach first value before at least one of: account creation, notification permission, or trial start.
- Loading states preserve layout and never show a blank white screen.
- Track: `screen_viewed`, `primary_action_tapped`, `permission_prompt_shown`, `permission_result`, `input_error_shown`, `purchase_started`, `restore_started`, `offline_state_shown`, `support_opened`.
