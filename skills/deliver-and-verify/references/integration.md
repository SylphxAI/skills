# Provider integration

Trigger: calling an outside service (a payment provider, a store, a forge, a
model provider) or receiving its webhooks.

An integration survives the provider being slow, wrong, or briefly gone, and
holds no more access than the feature needs.

## Hard lines

- **Secrets stay out of code and logs** ([security.md](security.md#hard-lines)).
  Use the platform's Connections where it offers the provider, otherwise the
  product's own Secrets. Models go through the platform AI gateway with the product's project
  `SYLPHX_API_KEY`, not a raw model-provider key, and a product does not hold a
  key the platform owns.

## Practices

- **Calls** follow [code.md](code.md#outbound-calls): a timeout, an idempotency
  key when the call creates or charges anything, a bounded retry with backoff
  only when the failure is safe to retry, and no database transaction or lock
  held across the call.
- **Missing permission is a state, not a silent empty:** return a typed error
  naming what is missing and how to fix it, so it does not look like "no data"
  or block unrelated work.
- **Webhooks:** verify the signature, deduplicate by delivery id, store the
  event before processing, and answer inside the provider's timeout. They are
  not the only source: reconcile anything that matters on a schedule from the
  provider's API so a missed webhook is caught.
- **Ask for the least:** request a permission when a feature needs it, not in
  advance.

The platform's own provider design (the Broker, GitHub App permission sets,
runner sessions) lives in the platform repository.

## How it is judged

A replayed, duplicated, or dropped webhook and a provider timeout each leave the
data correct, and no secret appears in code or logs.
