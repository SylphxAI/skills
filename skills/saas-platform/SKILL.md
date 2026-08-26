---
name: saas-platform
description: "Design a multi-tenant SaaS web platform from public acquisition through authenticated workspace — tenancy, entitlements, routes, and first value. Use when the user asks to design a SaaS, web platform, or public-to-authenticated service. Do not use for an app, a game, a single UI flow, or a pricing catalog."
---

# SaaS Web Platform

Design a public-acquisition-to-authenticated-service platform with tenancy, entitlements, and mixed public/private routes. A long setup wizard is not first value unless that is the deliberately chosen first value.

- Public marketing, docs, and status routes are explicitly indexable; product workspace routes are explicitly not.
- Tenant isolation, invites, roles, and (when required) SSO/SCIM have one owner each.
- Entitlement is projected from the billing owner, not from the UI.
- First value can occur as guest, demo, import, or signup — chosen deliberately, not by defaulting to a long setup wizard.
- PWA, push, and offline are selected only when they create product value, and they have update, eviction, and uninstall behavior.

Open [marketing automation](references/marketing-automation.md) when owned, earned, paid, and lifecycle channels are part of this product.

Use `app-product` when the promise is a recurring personal job rather than tenancy. Use `price-saas-subscription` for plan architecture.
