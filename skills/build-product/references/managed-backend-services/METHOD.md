# Wire Managed Backend Services

Attach one managed backend capability through the provider selected by the
product's current configuration and operating requirements.

## Method

1. Name the product job: flag evaluation, search indexing, analytics event,
   model routing, consent state, referral state, or another managed capability.
2. Open the [provider comparison](./providers/peers.md) and current
   official documentation. Select a maintained service that meets the product's
   region, isolation, quota, latency, availability, security, and cost needs.
3. Identify management and runtime authorities, credentials, environment,
   endpoint, quotas, retention, and data owner.
4. Provision the minimum required resource through the provider's supported
   management path.
5. Integrate the runtime API or SDK in the owning product repository.
6. Exercise the product behavior end to end: write and read state, evaluate the
   flag, query the index, accept the event, route the model, or update consent.
7. Record the selected provider, resource owner, configuration location,
   runtime result, quota/cost class, recovery, and material limits.

## References

- [Provider comparison](./providers/peers.md)
- [Service selection](./service-selection.md)

## Boundaries

Authentication, durable app data, background work, and message delivery use
their dedicated skills. Product secrets stay in the product's secret store.

## Output

Return the capability, provider, resource, management/runtime ownership,
configuration, behavior exercised, result, quota/cost class, and residuals.
