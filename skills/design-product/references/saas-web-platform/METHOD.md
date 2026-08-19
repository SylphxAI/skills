# SaaS Web Platform

Use when the product is a public-acquisition-to-authenticated-service platform
with tenancy, entitlements, and mixed public/private routes.

## Unique checks

- Public marketing, docs, and status routes are explicitly indexable; product
  workspace routes are explicitly not.
- Tenant isolation, invites, roles, and (when required) SSO/SCIM have one
  owner each.
- Entitlement is projected from the billing owner, not from the UI.
- First value can occur as guest, demo, import, or signup — chosen
  deliberately, not by defaulting to a long setup wizard.
- PWA, push, and offline are selected only when they create product value, and
  they have update, eviction, and uninstall behavior.

Hand pricing to `price-saas-subscription` and money movement to
`build-payment-readiness`. Return a platform blueprint another builder can
implement.
