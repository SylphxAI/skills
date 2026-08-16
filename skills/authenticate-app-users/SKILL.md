---
name: authenticate-app-users
description: Add app sign-in, sessions, OAuth or OIDC, passkeys, logout, and account recovery through the product's current identity provider.
---

# Authenticate App Users

Give users a secure entry, session, and recovery path using the active product identity contract.

## Method

1. Define the sign-in journey, user and tenant identities, protected resources, session lifetime, recovery path, and entitlement boundary.
2. Read the active repository's identity configuration and the provider's current official SDK or API documentation.
3. Use the provider's standard authorization flow and redirect, token, session, key, and cookie protections for the chosen application type.
4. Validate identity and session state on the server at every protected boundary.
5. Keep product authorization and entitlement decisions in the product domain after identity verification.
6. Implement logout, revocation, expiry, recovery, and account-linking behavior required by the journey.
7. Cover normal sign-in, invalid or expired state, revoked sessions, tenant separation, recovery, and replay protection.
8. Run the real sign-in and protected-route path in the target environment.

## Completion

Return the identity provider and flow, protected boundary, session behavior, recovery behavior, checks run, and strongest truthful delivery state.
