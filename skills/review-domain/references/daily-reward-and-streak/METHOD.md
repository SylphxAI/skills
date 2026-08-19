# Daily Reward And Streak

Assess whether a daily, streak, or calendar loop reinforces real recurring
value without anxiety, hostage progress, or economy damage.

## Method

1. Name the recurring user value the loop is supposed to reinforce. If the
   product works without the loop, the loop is optional garnish.
2. Open [daily reward systems](daily-reward-streak-systems.md) for clock,
   eligibility, claim/grant, missed-day, and reward-table design.
3. Model `eligible → available → claimed` plus missed, grace, expired,
   duplicate, offline, and reversal. Server clock is authoritative.
4. A disabled loop must have zero timers, notifications, background work, or
   grants. Core utility must not depend on streak or tenure.
5. Missed-day recovery should be proportionate. Churn-and-rejoin must not be
   the optimal earning strategy.
6. Hand notification intents to
   [notification strategy](../notification-strategy/METHOD.md); a streak is not
   emergency-message authority.

## Output

Return-loop findings: clock and grant rules, hostage-progress risks, economy
handoffs, and owner actions.
