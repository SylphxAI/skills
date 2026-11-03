# Play purchase evidence

Trigger: investigating a refunded Play purchase, missing entitlement, duplicate
consumable grant, or a claim that server-delivered purchases work end to end.
For store review and release status, use [app store state](app-store-state.md).

## Separate the provider reason from the application failure

Match the package, product, order and purchase token before joining observations.
Keep raw tokens, account identifiers and signed proofs out of reports; use a
non-secret correlation reference and retain restricted evidence at its source.
Read the purchase, completion and voided-purchase records with their timestamps.
Interpret enums from the current Publisher contract, not a remembered label.

- **Wrong:** “The order was refunded for lack of acknowledgment, so the game's
  checkout exception was caused by the acknowledgment code.”
- **Right:** “The provider reports an unacknowledged purchase. The exception's
  cause remains unknown until its request and executing code are traced.”

A provider reason establishes that layer's result, not which application step
failed first. For example, `voidedReason = 8` is `Unacknowledged_purchase` and
`voidedSource = 2` is Google in the cited discovery revision. Check the applicable
production or test acknowledgment window before interpreting elapsed time.

## Verify ownership and the original delivery contract

For a server-delivered flow, trace the released native purchase entrypoint through
the provider response, signed grant, application grant and completion request.
A client-supplied delivery marker is not proof of what the provider verified.
Check canonical account ownership and any original opt-in metadata from the
verified purchase; carry those facts through the authenticated contract.

An available completion endpoint does not prove an older purchase used that
contract. Keep unmarked legacy receipts on their supported delivery path rather
than upgrading them from a retry flag. Preserve the raw verification payload's
published meaning; add separate metadata rather than silently replacing it.
Use a stable purchase identity for idempotency, including when the provider order
identifier is absent or later appears as an alias.

Test wrong-account and wrong-product purchases, pending and revoked purchases,
forged markers, legacy receipts, duplicate callbacks and missing order identifiers.
Interrupt execution after the durable grant but before completion: recovery must
finish the same purchase without another entitlement or first-purchase bonus.

## Keep acceptance claims at the observed layer

| Claim | Evidence |
| --- | --- |
| Contract logic passes | Positive, negative and recovery cases against the exact source; fixtures do not establish live purchase acceptance. |
| Released client uses the contract | Exact released SDK version, downloaded plugin hashes and the installed application's dependency identity; a source wrapper alone is insufficient. |
| Payment reached the application | Same provider purchase correlated with the application request and canonical owner. A displayed test payment sheet is not a completed purchase. |
| Entitlement was delivered | Durable order and grant result through the product's supported grant path, followed by the player's balance or inventory after reload. |
| Purchase was completed | Provider completion state for that same purchase. For consumables, consumption also acknowledges the purchase; a client callback or local journal does not prove provider completion. |
| Recovery is idempotent | Repeated delivery and reload produce no second grant, and any incomplete completion is recovered for the original purchase. |

Use the authorized test mechanism and preserve existing player data. If a real
purchase test is unavailable, report the missing layer rather than changing
store policy, making an unauthorized payment or treating fixtures as acceptance.
Record package, product, artifact identities, observation times, correlation
reference and each observed result, with private values redacted.

## Sources and replacement conditions

- [Android Publisher v3 discovery](https://androidpublisher.googleapis.com/$discovery/rest?version=v3),
  revision `20261103`, read 2026-11-03 22:59 UTC: `VoidedPurchase` defines the reason
  and initiator separately. Re-read these fields when interpreting another revision.
- [Play one-time purchase lifecycle](https://developer.android.com/google/play/billing/lifecycle/one-time),
  read 2026-11-03 22:59 UTC: consumption also acknowledges a consumable purchase;
  missing acknowledgment can lead to automatic refund and revocation. Re-read the
  current lifecycle and test-specific timing before choosing a completion deadline.
