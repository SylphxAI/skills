## Mobile onboarding audit: reduce friction before activation

### Core diagnosis
The flow asks for too much trust too early:

1. Notification permission
2. Location permission
3. Account creation
4. Subscription trial start

If users have not yet experienced product value, each request feels like a barrier. Move from a **permission-first onboarding** to a **value-first onboarding**.

---

# 1. Recommended onboarding structure

## Current pattern
**Install → Permissions → Account → Trial → Product**

This creates early abandonment because users are asked to commit before understanding the benefit.

## Recommended pattern
**Install → Quick value preview → Lightweight setup → Activation moment → Contextual permissions → Account/trial when needed**

### Proposed flow

1. **Welcome screen**
   - One clear value proposition.
   - Primary CTA: “Get started”
   - Secondary option: “Continue as guest” if feasible.

2. **Personalization / goal selection**
   - 1–3 lightweight questions max.
   - Use tappable cards, not forms.
   - Example: “What do you want help with?”

3. **First value moment**
   - Show the user something useful before asking for sensitive access.
   - Example: recommendations, preview content, basic dashboard, sample result, or first task.

4. **Contextual permission prompt**
   - Ask only when the feature requires it.
   - Use a custom pre-permission screen explaining why.
   - Then trigger the native OS prompt.

5. **Account creation**
   - Delay until saving, syncing, personalization, or cross-device use.
   - Support Apple, Google, email, and passkey where possible.
   - Avoid password creation upfront.

6. **Subscription trial**
   - Present after the user understands the product value.
   - Tie trial to a specific benefit or unlocked feature.
   - Be transparent about price, renewal date, cancellation, and what is included.

---

# 2. Permission request fixes

## Notification permission

### Problem
Notification prompts at app launch usually convert poorly because the user does not yet know what notifications will be.

### Fix
Ask only after the user performs or configures something worth reminding them about.

### Better timing examples
- After they set a goal.
- After they create a reminder.
- After they follow an item/topic.
- After they complete the first meaningful action.

### Pre-permission copy
**Title:** Stay on track  
**Body:** We’ll send helpful reminders about your goals. No spam. You can change this anytime.  
**CTA:** Allow reminders  
**Secondary:** Not now

Then trigger the native permission only after tapping “Allow reminders.”

### Interaction rules
- Always include “Not now.”
- Do not block progress.
- If denied, continue gracefully.
- Offer a settings entry later, not repeated nagging.

---

## Location permission

### Problem
Location is high-sensitivity. Asking too early feels invasive.

### Fix
Only ask when a visible feature needs it.

### Better timing examples
- When showing nearby results.
- When enabling local recommendations.
- When the user taps “Use my current location.”

### Pre-permission copy
**Title:** Find options near you  
**Body:** We use your location to show relevant nearby results. We don’t share your precise location without permission.  
**CTA:** Use my location  
**Secondary:** Enter location manually

### Interaction rules
- Provide manual ZIP/city entry as an alternative.
- Prefer approximate location if precise is not required.
- Do not ask for “Always Allow” unless absolutely necessary.
- Use “While using the app” as default.

---

# 3. Account creation fixes

## Problem
Mandatory account creation before value is a major drop-off point.

## Fix
Defer account creation until there is a reason to save progress.

### Recommended triggers
Ask users to create an account when they:
- Want to save preferences.
- Need to access history.
- Start a trial.
- Sync across devices.
- Complete a meaningful setup.

### UI recommendations
- Use social sign-in: Apple, Google.
- Keep email sign-up short.
- Avoid mandatory profile fields.
- Allow guest mode where possible.
- Use inline validation.
- Support autofill and password managers.
- Never clear entered data after an error.

### Better account creation copy
**Title:** Save your setup  
**Body:** Create an account so your preferences and progress are saved.  
**CTA:** Continue with Apple  
**Secondary CTAs:** Continue with Google, Email  
**Text link:** Not now

---

# 4. Subscription trial fixes

## Problem
A subscription trial before activation feels like a paywall before proof.

## Fix
Move the trial ask after the first clear “aha” moment or after showing locked premium value.

### Better trial timing
- After the user sees a useful preview.
- After they complete setup.
- When they tap a premium feature.
- After a limited free action has delivered value.

### Trial screen requirements
Make the offer clear and trustworthy.

Include:
- Trial length.
- Price after trial.
- Renewal date.
- Cancellation terms.
- What is included.
- “Remind me before trial ends” if available.
- Restore purchases.
- Terms and privacy links.

### UI recommendations
- Avoid dark patterns.
- Do not hide close buttons.
- Do not make the secondary option invisible.
- Use concise benefit bullets, not long paragraphs.
- Show plan comparison only if necessary.

### Better trial CTA copy
Primary: **Start free trial**  
Subtext: **Free for 7 days, then $X/month. Cancel anytime.**  
Secondary: **Continue with free version** or **Maybe later**

---

# 5. Mobile-first UI and interaction fixes

## Reduce screens and decisions
- Combine non-sensitive intro screens.
- Avoid multi-page carousels.
- Keep onboarding under 60 seconds.
- Use progress indicators only if the flow has 3+ steps.
- Do not stack permission, account, and payment asks back-to-back.

## Improve thumb-friendly design
- Primary CTA fixed near bottom.
- Minimum tap target: 44x44 pt.
- Avoid tiny text links for critical choices.
- Keep forms single-column.
- Use native pickers and autofill.

## Make every step skippable unless essential
- “Not now” should be visible.
- Users should never feel trapped.
- If a step is required, explain why.

## Use progressive disclosure
Ask for information only when needed:
- Don’t ask for profile data upfront.
- Don’t ask for permissions before feature use.
- Don’t ask for payment before value.

## Provide immediate feedback
- Show loading states.
- Confirm successful setup.
- Preserve progress if users leave.
- Avoid dead-end error states.

---

# 6. Suggested revised flow

### Lightweight version
1. Welcome/value proposition  
2. Goal or preference selection  
3. Show personalized preview or first useful result  
4. Optional: create account to save setup  
5. Contextual permission request only when feature requires it  
6. Trial offer after value is demonstrated  

### If subscription is central
1. Welcome  
2. Show product value with preview/demo  
3. Let user complete one free action or see locked premium result  
4. Trial screen with transparent terms  
5. Account creation as part of trial start  
6. Permissions later, in context  

---

# 7. Measurement plan

Track funnel completion by step:

- App open → Welcome CTA
- Welcome → Setup complete
- Setup → First value moment
- First value → Account creation
- Account → Trial screen
- Trial screen → Trial start
- Permission prompt shown → Permission accepted
- Activation rate
- Day 1 / Day 7 retention

Also track:
- Drop-off per screen
- Time to first value
- Permission denial rate
- Trial conversion rate
- Trial cancellation rate
- Guest-to-account conversion

---

# 8. Priority fixes

## Highest impact
1. Delay notification and location permissions until contextually needed.
2. Move account creation after first value or make it optional.
3. Move trial start after users understand the product benefit.
4. Add visible “Not now” and “Continue free” paths.
5. Shorten onboarding to one clear value step plus one lightweight personalization step.

## Success criterion
Users should reach a meaningful product experience before being asked for permissions, identity, or payment.
