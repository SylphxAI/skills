## Executive recommendation

Reduce onboarding friction by moving from a **front-loaded “ask everything” flow** to a **progressive, value-led flow**:

1. Let users experience value before account creation, permissions, or subscription.
2. Ask for each permission only when it is contextually needed.
3. Make the trial/subscription screen transparent, skippable where possible, and tied to a clear benefit.
4. Shorten the first-run path to activation to 2–4 lightweight steps.

---

# 1. Current issue

The flow asks for:

- Notification permission
- Location permission
- Account creation
- Subscription trial start

before users have reached meaningful value.

This creates a high-friction onboarding stack:

| Step | User perception |
|---|---|
| Notifications | “Why do you need this now?” |
| Location | “Is this safe / necessary?” |
| Account creation | “I haven’t decided if I want this yet.” |
| Trial start | “You’re asking me to pay before proving value.” |

Result: users drop before activation because the flow feels like a commitment funnel, not an onboarding experience.

---

# 2. Recommended onboarding structure

## Mobile-first revised flow

### Step 1: Welcome + value promise

Keep this to one screen.

**Goal:** confirm what the app does and what the user will get.

Example:

> “Get personalized recommendations near you in seconds.”

Primary CTA:

> “Get started”

Avoid carousel-heavy onboarding unless each screen collects useful input or improves activation.

---

### Step 2: Lightweight personalization

Ask 1–3 simple questions that create immediate relevance.

Examples:

- “What are you interested in?”
- “What’s your goal?”
- “How often do you want updates?”

Use large tappable chips, not forms.

Good mobile pattern:

- One question per screen
- 3–6 options max
- Visible progress, e.g. “1 of 3”
- “Skip” available where possible

---

### Step 3: Show initial value before permissions

Give users a preview, sample result, or partial experience.

Examples:

- Show recommended content
- Show a blurred or limited preview
- Show default results based on broad region
- Allow manual location entry

This builds trust before asking for access.

---

### Step 4: Ask for location only at point of need

Do not ask for location on app launch.

Ask when the user taps something that clearly requires it.

Example trigger:

- “Find options near me”
- “Use my current location”
- “Show nearby results”

Use a pre-permission screen before the OS prompt.

Recommended copy:

> “Use your location to show nearby recommendations. You can also enter a city manually.”

Buttons:

- Primary: “Use current location”
- Secondary: “Enter manually”
- Tertiary/link: “Not now”

Then show the native permission prompt only after the user taps the primary action.

Use the least invasive setting:

- Prefer “Allow While Using App”
- Avoid “Always Allow” unless absolutely necessary
- Do not immediately re-prompt after denial

---

### Step 5: Ask for notifications after user creates intent

Notifications should be requested after the user has indicated they want reminders, alerts, or updates.

Good triggers:

- User saves an item
- User follows a topic
- User sets a reminder
- User enables alerts
- User completes activation

Pre-permission copy:

> “Want alerts when there are new matches or important updates?”

Buttons:

- Primary: “Turn on alerts”
- Secondary: “Not now”

Avoid vague copy like:

> “Enable notifications to stay updated.”

Be specific about what notifications the user will receive.

---

### Step 6: Delay account creation until there is a reason

Do not require account creation before the user understands the product.

Better account creation triggers:

- Saving preferences
- Syncing across devices
- Booking/purchasing
- Starting a trial
- Accessing premium content

Offer low-friction auth:

- Continue with Apple
- Continue with Google
- Continue with email
- Guest mode, if feasible

Recommended copy:

> “Create an account to save your recommendations and access them later.”

Avoid asking for password upfront if social or passwordless sign-in is available.

---

### Step 7: Present subscription after value is demonstrated

The subscription trial should appear after the user has seen enough value to understand what they are paying for.

Better triggers:

- After first useful result
- After user hits a premium feature
- After a short free preview
- After completing a setup that leads naturally to premium value

Paywall must be clear and compliant:

- Price
- Trial length
- Billing start date
- Renewal terms
- Cancellation instructions
- What is included
- Clear CTA
- Secondary option if applicable

Example CTA:

> “Start 7-day free trial”

Supporting text:

> “Then $9.99/month. Cancel anytime before July 8 to avoid being charged.”

Avoid dark patterns:

- Hidden close button
- Ambiguous “Continue”
- Preselected expensive plans
- Making free users feel trapped

---

# 3. Recommended target flow

## Preferred flow

1. Welcome/value screen  
2. Personalization question 1  
3. Personalization question 2  
4. Show preview or first result  
5. Contextual location request, only if needed  
6. User reaches activation moment  
7. Prompt account creation to save progress  
8. Prompt subscription when premium value is clear  
9. Prompt notifications after user opts into an alert/reminder/update

---

# 4. Mobile UI fixes

## Reduce perceived effort

- Use one primary action per screen.
- Keep copy short and benefit-led.
- Avoid multi-field forms early.
- Use chips, toggles, and native pickers instead of text entry.
- Show progress only if onboarding has more than two steps.
- Keep each screen vertically simple and thumb-friendly.
- Use sticky bottom CTA for consistency.
- Make “Skip” or “Not now” visible for nonessential steps.

## Improve trust

- Explain why each permission is needed before showing the OS prompt.
- Provide alternatives, such as manual location.
- Never ask for two permissions back-to-back.
- Do not show the subscription screen immediately after permissions.
- Use plain language for billing and privacy-sensitive requests.

## Improve completion

- Save progress automatically.
- Let users resume where they left off.
- Avoid forcing email verification before activation unless required.
- Use skeleton loading or instant previews instead of blank loading states.
- If setup takes time, show what is being personalized.

---

# 5. Permission strategy

| Permission | Current issue | Recommended fix |
|---|---|---|
| Location | Asked too early | Ask only when user requests nearby/personalized results |
| Notifications | Asked without intent | Ask after user follows, saves, sets reminder, or completes activation |
| Account | Asked before value | Delay until saving/syncing is needed |
| Subscription | Asked before trust | Show after first value or premium feature intent |

---

# 6. Activation-focused success metrics

Track the funnel by step:

- App open → onboarding start
- Onboarding start → first value screen
- First value screen → activation
- Activation → account creation
- Account creation → trial start
- Permission pre-prompt accept rate
- Native permission grant rate
- Trial start rate
- Day 1 and Day 7 retention

Also track drop-off after each modal or permission prompt.

Primary success metric should not only be trial starts. It should include:

> Percentage of new users who reach the first meaningful value moment.

---

# 7. A/B test priorities

## Test 1: Account timing

- A: Account required before product access
- B: Guest preview first, account required to save

Expected winner: guest preview first.

## Test 2: Location timing

- A: Location request during onboarding
- B: Location request after “near me” action

Expected winner: contextual request.

## Test 3: Paywall timing

- A: Paywall before activation
- B: Paywall after first result or premium intent

Expected winner: post-value paywall.

## Test 4: Notification timing

- A: Notification request during onboarding
- B: Notification request after user sets intent

Expected winner: intent-based request.

---

# 8. High-priority fixes

1. Remove notification permission from initial onboarding.
2. Move location permission to a contextual action.
3. Allow users to see value before account creation.
4. Move subscription trial after the first meaningful product experience.
5. Add clear “Not now” options for noncritical asks.
6. Use pre-permission screens with specific benefit copy.
7. Replace long forms with taps, chips, and social sign-in.
8. Measure activation before monetization.

---

## Bottom line

The current flow asks for trust, data, identity, and payment before delivering value. The fix is to reverse that order:

> Value first, then permission, then account, then subscription.
