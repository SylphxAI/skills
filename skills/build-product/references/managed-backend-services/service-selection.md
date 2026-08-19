# Managed Service Selection

Select an account-backed, maintained service whose product and operating
contract fits the application.

## Selection

- Use a service with a current product owner, official API or SDK, supported
  authentication, quotas, isolation, regions, retention, billing, and recovery.
- Keep management credentials in the deployment or operator boundary. Give
  browser and app clients the documented runtime credential class.
- Use durable object storage for product files and an artifact registry for
  releases. Temporary public file hosts remain sharing tools.
- Activate provider capabilities in their published availability state.
- Set AI routing budgets, quotas, model policy, and cost observability before
  product traffic enters the gateway.

## Behavior checks

| Capability | Exercise |
| --- | --- |
| Authentication | Issue a session for a fixture user, then confirm revocation ends reuse |
| Key-value state | Set and get the same key; exercise expiry when TTL is selected |
| Storage | Upload bytes and download the same object or signed URL |
| Email | Observe provider acceptance; use recipient readback for an inbox-delivery claim |
| Realtime | Publish and receive on the selected channel |
| Sandbox | Run a harmless command and capture its terminal result |
| Background task | Observe success or failure plus the selected callback behavior |
| Feature flag | Evaluate the expected variant for a fixture identity |
| Search | Index a fixture record and retrieve it through the product query |
| Analytics | Send a fixture event and observe it in the owning ingestion path |

The product behavior above establishes the integration. Health endpoints remain
service-availability diagnostics.
