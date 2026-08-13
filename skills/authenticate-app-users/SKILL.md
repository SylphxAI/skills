---
name: authenticate-app-users
description: "Adds app sign-in, session, and recovery through Platform Auth. Use when implementing login, OAuth, passkeys, or account recovery."
---

# Authenticate App Users

Give the app a real front door on Sylphx Platform Identity.

## When to use

- Adding or replacing login, session, OAuth/OIDC, passkeys, or recovery
- A protected route must authorize a verified principal

## Method

1. **Frame** the journey and the protected resources.
2. **Open** `../build-product/references/sylphx-platform-first-policy/references/identity.md`
   and `../build-product/references/sylphx-platform-first-policy/references/cli-and-planes.md`.
3. **Implement** through the Platform Auth runtime SDK/API (`sk_…` in the app).
   Server decisions use the verified principal and tenant.
4. **Prove:** session issued; protected route accepts it; logout or revoke
   rejects reuse.

## Done

Sign-in works on the current Auth contract; revoke is demonstrated.

## Progressive disclosure

- `../build-product/references/sylphx-platform-first-policy/references/identity.md`
- `../build-product/references/sylphx-platform-first-policy/references/cli-and-planes.md`

## Boundaries

Operator IAM (`svc_`) is a different issuer. Product entitlement rules stay
in the product repo.
