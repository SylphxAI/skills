# Authenticate App Users

Give users a secure entry, session, and recovery path using the active product identity contract.

## Method

1. Read the product's current identity contract and keep customer identity
   separate from operator or infrastructure IAM.
2. Define the sign-in journey, user and tenant identities, protected resources, session lifetime, recovery path, and entitlement boundary.
3. Read the active repository's identity configuration and the provider's current official SDK or API documentation.
4. Use the provider's standard authorization flow and redirect, token, session, key, and cookie protections for the chosen application type.
5. Validate identity and session state on the server at every protected boundary.
6. Keep product authorization and entitlement decisions in the product domain after identity verification.
7. Implement logout, revocation, expiry, recovery, and account-linking behavior required by the journey.
8. Cover normal sign-in, invalid or expired state, revoked sessions, tenant separation, recovery, and replay protection.
9. Run the real sign-in and protected-route path in the target environment.

## Completion

Return the identity provider and flow, protected boundary, session behavior, recovery behavior, checks run, and strongest truthful delivery state.
