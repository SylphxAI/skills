# Events and delivery

Submit a typed message; watch one Delivery Operation; inspect the receipt.

1. Bind the connector (sender domain, webhook signing, channel) on management.
2. Send on the runtime plane with a caller request id.
3. Prove with provider accept id or delivery receipt.

| Need | Path |
| --- | --- |
| Email | Message + verified SenderDomain |
| Webhook | signed Delivery / EventSource |
| Realtime | Subscription with resume cursor |
| Push | notification connector when shipped |

Campaign copy stays in the product repo.
