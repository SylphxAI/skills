# Evals: notification-strategy

Scoring: each rubric item is pass or fail; a task passes at 3 of 4 items. Prompts are self-contained; the model answers in text only, under 300 words. The with-skill arm also gets `references/notification-strategy-patterns.md`.

## Task 1
**Prompt:** Review our habit app's notification plan: a push every day at 8pm "Don't lose your streak!", plus 3 reminder pushes if the user hasn't opened that day. There is no setting to turn them off.

**Rubric:**
1. Says every notification needs a stop condition and a cooldown.
2. Says a message that cannot be turned off is an interruption, not a notification.
3. Says a streak does not inherit emergency rights, so it respects caps and quiet hours.
4. Asks for the same outcome to be available in-product without the ping.

## Task 2
**Prompt:** Marketing wants to measure the new push campaign. They propose reporting send volume and open rate as the success metrics. Assess.

**Rubric:**
1. Says to measure useful action after open, not send volume.
2. Names negative guardrails (opt-out, unsubscribe, complaint, uninstall or churn).
3. Treats fatigue as product debt rather than only an unsubscribe metric.
4. Proposes readback by cohort, channel or lifecycle event before new campaigns.

## Task 3
**Prompt:** Users denied the push permission prompt. Product wants to re-prompt on every app launch until they accept. Advise.

**Rubric:**
1. Rejects repeated platform prompts as a dark pattern.
2. Recommends in-product education or a preference center instead.
3. Says the next prompt needs a fresh user action or a material value moment.
4. Names a permission state model (for example denied, not_asked, soft_asked) or suppression state.

## Task 4
**Prompt:** We send a payment-failed message by push, email and SMS at once for each failed payment, with the card's last four digits and account balance in the SMS body. Review it.

**Rubric:**
1. Requires cross-channel deduplication with a durable key per lifecycle event.
2. Flags sensitive details in SMS or lock-screen content and asks for privacy-minimized payloads or auth-gated deep links.
3. Requires a stop condition (payment updated, cancellation or support escalation).
4. Names channel mechanics (SMS STOP/HELP, List-Unsubscribe, or similar).

## Task 5
**Prompt:** Design the notification system architecture for our new app: queue, workers, templates, provider adapters.

**Rubric:**
1. Says this skill reviews a notification strategy and does not design the system.
2. Does not produce a queue or worker architecture as its main answer.
3. Offers to assess cadence, stop conditions and suppression instead.
4. Stays short.
