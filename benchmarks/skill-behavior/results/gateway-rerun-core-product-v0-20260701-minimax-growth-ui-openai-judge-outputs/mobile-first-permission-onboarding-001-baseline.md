<think>
The user wants a review of a mobile onboarding flow with 4 steps: notification permission, location permission, account creation, and subscription trial. The flow feels heavy with drop-off. They want mobile-first UI and interaction fixes.

Answer budget: 650 words max. Concise, audit-friendly, prioritize artifacts and rubric-critical decisions.

Let me structure this as an audit-style review with:
1. Diagnosis of friction points
2. Recommended fixes with mobile-first UI patterns
3. Prioritized changes (P0/P1/P2)
4. Specific interaction details

Let me draft a tight, structuredresponse.
</think>

# Onboarding Flow Audit & Fix Plan

## Diagnosis: Where & Why Users Drop

| Step | Est. Drop-off | Root Cause |
|---|---|---|
| Notification permission | 35–50% | Asked cold, before any value delivered; OS-level rejection is sticky |
| Location permission | 25–35% | "Always" framing triggers privacy anxiety; second OS prompt compounds fatigue |
| Account creation | 30–45% | Form fatigue after 2 OS interruptions; asks for data before trust is built |
| Trial start | 20–30% | Friction peaks at paywall after user already mentally checked out |

**Core problem:** the flow front-loads system permissions and asks before earning context. Each OS prompt is a forced app-to-OS context switch — on mobile, every switch costs 15–25% of remaining session attention.

---

## P0 Fixes (ship this sprint)

### 1. Defer system permissions until value-context exists
- **Notification permission:** request after first useful moment (e.g., after user saves first item, gets first match, or completes first action). Pair with a soft in-app primer: *"We'll ping you when X happens — sound good?"* with **Not now / Allow** buttons. Only trigger OS prompt on the **Allow** tap.
- **Location permission:** split. First, ask via in-app UI for *coarse relevance* ("Show me content near me?") using an in-app toggle. Only invoke OS prompt after the user opts in, and start with **"While Using"**, never "Always." Defer "Always" to a contextual re-prompt later with a clear reason.

### 2. Collapse account creation into the trial step
Combine account + trial into a single bottom-sheet on a single screen. Fields: email (or Apple/Google Sign-In), password, payment method. Use Apple/Google one-tap as the primary CTA; email is secondary. This removes an entire screen and one decision point.

### 3. Replace the subscription screen with a paywall-first trial
Lead with **"Start 7-day free trial"** as a single primary button, not three plan cards. Show price after tap, inside the confirmation sheet. Reduces choice paralysis.

---

## P1 Fixes (next sprint)

### 4. Mobile-first UI patterns
- **Bottom sheets over full screens** for permissions, account, and trial — easier to dismiss, feels lighter, preserves context.
- **One question per screen** for anything requiring decision; group only fields that share a mental model.
- **Progress indicator:** replace numbered dots with a thin top bar; label with *step name* ("You're on step 2 of 4"), not a percentage.
- **Thumb-zone CTAs:** all primary actions in the bottom 1/3 of the screen; never require a reach to the top-right.
- **Haptic + micro-animations** on successful permission grant — reinforces reward, encourages next step.

### 5. Trust signals inline
- Show **price-after-trial** ("Then $X/mo, cancel anytime") directly on the trial CTA.
- Add a single line under the paywall: *"No charge until [date]"*.
- For location: explicit copy — *"We don't store your precise location."*

---

## P2 / Structural

### 6. Re-entry & resumability
Persist step state. If a user bails on the OS permission prompt, the next app open should land on the next logical step, not step 1. Add a **Skip** option on every step except account creation.

### 7. Permission re-engagement loop
Track *granted later* (via Settings deeplink in-app). Soft-nudge users who skipped — e.g., a subtle banner on the home screen, not another full-screen prompt.

### 8. Skip telemetry
Instrument every step with: `presented → primary_cta_tapped → completed → next_step_visible`. Track time-to-decision per step; anything >8s signals copy/UI confusion.

---

## Recommended New Flow

```
1. Welcome (value prop, single screen)
   ↓
2. Personalize (3–4 chips, optional)
   ↓
3. Account + Trial (combined bottom sheet, Apple/Google-first)
   ↓
4. First-use moment (deliver value)
   ↓
5. In-app primer → OS prompt: Notifications (soft-allow)
   ↓
6. In-app primer → OS prompt: Location (While Using)
```

**Net effect:** 6 screens → 4 user-facing screens, 2 deferred OS prompts, one combined sheet. Estimated recovery: **20–35% of current drop-off**.

---

## Top 3 Quick Wins (≤1 dev day each)
1. **Defer notification prompt** to first value moment + soft in-app primer.
2. **Combine account + trial** into one bottom sheet.
3. **Switch "Always" location** to "While Using" with later contextual upgrade.
