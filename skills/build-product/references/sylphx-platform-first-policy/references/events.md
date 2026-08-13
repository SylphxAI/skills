# Events and delivery

How an app sends email, webhooks, realtime, and push on Sylphx Platform.

These are Platform Events/Delivery Resources (Relay). Submit a typed message;
watch one Delivery Operation to a terminal; inspect receipts.

## Do this

1. Provision or select the connector (sender domain, webhook signing secret,
   realtime channel) on the management plane.
2. Send from the **runtime** plane with `sk_…`.
3. Use a caller request id so retries do not double-send or double-charge.
4. Prove with the provider accept id / delivery receipt, not a local log line.

| Need | Path |
| --- | --- |
| Transactional email | Message + verified SenderDomain |
| Outbound webhook | Delivery target + signing + retry |
| Inbound webhook | EventSource + verified signature |
| Realtime | Subscription / channel with resume cursor |
| Push / in-app | Notification connector when shipped |

Discover exact SDK methods from the installed client. The pattern is always:
create or bind the connector → submit the message → watch the Operation.

## Done

- Email: provider accepted the message (and bounce/complaint path exists)
- Webhook: signed delivery attempt recorded; retry is idempotent
- Realtime: a subscriber receives the published event
