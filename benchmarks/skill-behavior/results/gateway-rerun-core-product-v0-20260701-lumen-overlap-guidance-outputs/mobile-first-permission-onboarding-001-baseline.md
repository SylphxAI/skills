### Diagnostic Summary
The current flow demands maximum commitment (payment, identity) and privacy (location, notifications) before demonstrating any product value. This triggers "permission fatigue" and cognitive overload, resulting in premature abandonment. 

### Recommended Flow Restructure (Progressive Disclosure)
Shift from a linear "gatekeeper" model to a value-first progressive model.
1. **Value Prop / Personalization (No friction):** "What are you looking for?"
2. **Account Creation (Low friction):** Sign in with Apple/Google.
3. **Core App Experience:** Let the user interact with the app (Guest mode equivalent).
4. **Subscription Trial (High intent):** Gate premium features or trigger after a "wins" moment.
5. **Permissions (Contextual):** Ask only when the feature requires it.

---

### Mobile-First UI & Interaction Fixes

#### 1. Permissions (Notifications & Location)
*   **Never ask on launch.** Trigger location when the user taps "Find near me" or "Delivery."
*   **Implement "Soft Asks" (Pre-permissions):** Use a custom, branded UI modal explaining *why* you need it before triggering the harsh OS-level prompt. 
    *   *UI Example:* "Turn on location to find matches nearby." [Maybe Later] | [Allow].
    *   *Interaction Benefit:* If they hit "Maybe Later," you retain them. If they hit "Allow," the OS prompt has a 90%+ acceptance rate.
*   **Notifications:** Tie to a specific user benefit (e.g., "Turn on notifications to get alerted when your trial is ending" or "Never miss a message").

#### 2. Account Creation
*   **Eliminate Passwords:** Force Apple Sign-In, Google Sign-In, or Phone OTP. Password creation/confirmation screens are massive friction points and high drop-off zones.
*   **Lazy Registration:** If possible, let them browse in a guest state and only ask for account creation right before they start the subscription trial.
*   **UI Polish:** Hide "Email/Password" fields behind a "Continue with Email" button to visually emphasize the 1-tap SSO options.

#### 3. Subscription Trial Start
*   **Anchor the Value:** Do not present a bare-bones paywall. Use a full-screen bottom-sheet modal highlighting 3 key premium benefits.
*   **De-risk the Trial:** Clearly emphasize the "7 Days Free" aspect. Use a checkbox UI: `[x] Start my 7-day free trial. I can cancel anytime.`
*   **Clear CTAs:** The primary button should read exactly what the system will do: *Start Free Trial & Subscribe*, not just "Continue."

#### 4. General Onboarding UI/Interaction
*   **Bottom Sheet Modals:** Instead of navigating to new full screens for every step (which feels like endless loading), use swipeable bottom sheets for soft-asks and paywalls. It feels less permanent.
*   **Micro-Progress Indicators:** If you *must* keep a multi-step flow, show a sleek, 3-dot progress indicator at the top so users know the end is near.
*   **Haptic Feedback:** Add subtle success haptics on Apple/Google sign-in completion and trial activation. This provides physical reassurance that the "heavy lifting" is done.
*   **Skippable Elements:** Always provide a highly visible, non-punitive "Skip for now" or "Maybe later" text button on screens asking for location or notifications.

### Key Metrics to Audit Post-Launch
*   **Funnel Conversion Rate:** Step 1 to Step 4 completion.
*   **OS Prompt Conversion:** % of users accepting Location/Notifications *after* interacting with the Soft Ask. 
*   **Drop-off by Step:** Ensure account creation isn't the primary bottleneck anymore.
