---
name: review-launch-readiness
description: "Review the exact release candidate and decide whether it is ready to launch."
---

# Review Launch Readiness

Make one release decision from the exact candidate, the product behavior it
changes, and the authorities that own its external effects.

## Method

1. Identify the exact commit, build, content, configuration, model, policy, and
   migration that will ship; the audiences, channels, territories, change
   window, user impact, and decision owner.
2. Run the product path changed by that candidate and its compiler, behavior,
   integration, and packaging checks. Use
   [launch readiness patterns](references/launch-readiness-patterns.md) when a
   domain-specific release concern needs depth.
3. Confirm current owner state for money, personal data, children, destructive
   actions, security, accessibility, legal or platform requirements, support,
   and external approvals that the candidate touches.
4. For data or state changes, verify migration, backfill, reconciliation,
   restart behavior, and recovery against the exact candidate. Preserve user
   data and define customer communication and compensation where applicable.
5. Define the smallest live watch that can detect material release harm and
   name the owner action for that signal. Read
   [release health watch](references/release-health-watch.md) when the actual
   rollout uses a canary, bounded exposure, or a staffed release window.
6. Decide to launch, hold, or withdraw the candidate. State the exact reason,
   owner, next action, and current delivery layer.

## Output

Return one launch decision containing:

- exact candidate and release scope;
- product paths and checks run;
- current external approvals and owner decisions that govern the release;
- migration, backfill, recovery, and customer-protection behavior where
  applicable;
- launch, hold, or withdrawal decision with reasons, owners, and next actions;
- the smallest live readback needed for the claimed release state.

A local check supports a candidate claim. A merged revision supports a landed
claim. Release and live claims use the exact released identity and observation
from those layers.
