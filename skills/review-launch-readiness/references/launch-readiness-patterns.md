# Launch Readiness Patterns

Use only the areas touched by the candidate and its user journey.

| Area | Launch question |
| --- | --- |
| Product | Does the core promise work for the target users? |
| Interface | Do onboarding, empty, loading, error, recovery, accessibility, and responsive states work? |
| Money and access | Do price, checkout, entitlement, refund, cancellation, and account access reconcile? |
| Distribution | Does the exact artifact install, update, uninstall, and appear correctly in its channel? |
| Data | Do migration, backfill, reconciliation, retention, restore, and deletion preserve intended state? |
| Support | Can customers reach the right help and escalation path? |
| Trust | Do consent, privacy, security, child, safety, and platform decisions come from current owners? |
| Operations | Are recovery, incident ownership, and user communication ready for the changed behavior? |
| Promotion | Do claims and fulfillment match the shipped product? |

## Selection

- Run the exact product and distribution path that will ship.
- Exercise money, data, identity, and irreversible actions end to end when the
  candidate touches them.
- Verify platform or partner approval at the layer that owns it.
- Assign every material defect or pending external decision to its owner before
  choosing the launch action.
- Use bounded exposure only when the actual release channel supports it and the
  changed behavior has an observable signal and recovery action.
- Keep promotion timing independent from product release when the shipped
  product is ready and campaign materials are still being prepared.

## Decision record

Record the exact candidate, audience and channel, paths run, material results,
external owner decisions, migration and recovery behavior, release action,
owner, communication, and the smallest live readback needed for the claim.
