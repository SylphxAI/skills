## Acceptance map

- Reliability target: 99.9% of password-reset email requests must succeed in production.
- Current provider is the existing email delivery service.
- Define rollback procedures for the password-reset service to revert if necessary.

## Delivery terminal

- Evidence of successful password-reset email delivery for 99.9% of requests, verified in production.
- All logs and user feedback during the rollout period must indicate this reliability threshold has been crossed.

## Research execute verify repair loop

1. **Research:** Assess current email delivery logs to establish a baseline failure rate.
2. **Execute:** Implement any proposed enhancements or fixes to the email delivery process.
3. **Verify:** Continuously monitor email delivery performance post-implementation; ensure reliability metrics improve towards 99.9%.
4. **Repair:** Adjust strategies based on performance data and user feedback until the delivery terminal is reached.

## Revert-safe PR outcome

- The outcome must include a typical revert-safe PR that documents any changes made.
- The PR should be structured as an atomic commit to simplify rollback if necessary, maintaining transparency and clarity.

## Not merely local green

- Delivery claims must be backed up by evidence from the production environment, not limited to local testing and build success.
- Only consider the goal met when the target is achieved in a live system, reflecting real user interactions and requests.

## Honest blocker

- Identify any blockers that reject achieving the reliability target, such as third-party service outages, capacity limits, or any internal development issues that surface during the rollout phase.
- Document these blockers with clear evidence to ensure transparency and facilitate necessary discussions about potential adjustments in strategy.
