Purchase/refund context:
Mobile subscription app utilizing Apple App Store, Google Play, and Stripe. Requires server-side entitlement management to handle standard refunds, chargebacks, and goodwill exceptions without compromising trust.

Authority:
Apple and Google control platform refunds. Stripe controls direct web charges and chargebacks. Internal Support controls goodwill refunds.

Provider table:
- Apple App Store -> App Store Server Notification (REFUND) -> Apple -> original_transaction_id + notification id -> pending_revoke -> Revoke access after grace period
- Google Play -> Voided Purchases RTDN -> Google -> purchase_token + notification id -> pending_revoke -> Revoke access after grace period
- Stripe refund -> charge.refunded webhook -> Stripe -> charge/refund id -> pending_revoke -> Revoke access immediately or at period end
- Stripe chargeback -> charge.dispute.created webhook -> Stripe/Issuer -> dispute id -> disputed_hold -> Hold entitlement; block new purchases
- Internal goodwill -> Support tool adjustment -> Internal Support -> ticket_id + approval_id -> active -> Maintain access until period end

Entitlement state machine:
- active -> refund_confirmed -> pending_revoke -> grace_elapsed (7 days) -> revoked 
- active -> chargeback_opened -> disputed_hold -> dispute_won -> active
- disputed_hold -> dispute_lost -> revoked
- revoked -> repurchase_or_appeal_approved -> active
- Audit evidence: Immutable ledger records webhook payload, event timestamp, and resulting entitlement state.

Decision table:
- Platform Refund (Apple/Google) -> Action: Revoke at period end or after 7-day grace. Account: None. Support: Macro acknowledging refund and access end date.
- One-time Goodwill Refund -> Action: Keep active until period end. Account: Apply goodwill flag. Support: Macro explaining courtesy, no account impact.
- Chargeback Opened -> Action: Move to disputed_hold. Account: Commerce limit (block new purchases). Support: Macro urging dispute resolution.
- Repeated Refund Abuse -> Action: Immediate revoke. Account: Commerce limit/Downgrade. Support: Escalate to Trust & Safety.

Abuse and trust ladder:
- Low (1-2 normal refunds) -> Evidence: Standard refund history. Action: Standard revocation. Approval: Automated. FP guard: Ignore bulk platform system issues.
- Medium (3+ rapid refunds) -> Evidence: Consistently purchasing and refunding quickly. Action: Warn user, skip future grace periods (immediate revoke). Approval: Automated. 
- High (1+ chargeback or repeated abuse) -> Evidence: Payment dispute or medium tier exceeded. Action: Downgrade/Commerce limit (block checkout). Approval: Automated. Appeal path: Support ticket review.
- Severe (Multiple chargebacks/linked fraud) -> Evidence: Network of abusing accounts. Action: Ban account. Approval: Trust & Safety Lead. FP guard: Manual review of payment history. Appeal path: T&S escalation form.

Support macros/events:
- Standard Refund: "We received confirmation that your subscription was refunded. Premium access will remain active until [Date] as a courtesy, after which your account will revert to the free tier. Your account remains in good standing."
- Chargeback Hold: "We noticed a payment dispute was initiated on your account. To resolve this and restore full access, please close the dispute with your bank or contact our support team with your order ID."
- Abuse Warning: "Our system detected unusual refund activity on your account. While your account remains active, future premium features will be removed immediately upon refund without a grace period."

Metrics/dashboard:
- Refund rate by provider -> Product/Pricing teams -> Identifies pricing friction or unclear paywalls.
- Entitlement revocation lag -> Engineering -> Ensures webhooks and grace periods process correctly.
- Goodwill usage limit -> Support Leads -> Monitors manual policy abuse.
- Chargeback win/loss ratio -> Trust & Safety -> Indicates fraud or billing confusion.
- Abuse-tier transitions -> Trust & Safety -> Tracks effectiveness of commerce limits and warnings.
- Churn after refund -> Growth -> Measures recovery and repurchase rates.
