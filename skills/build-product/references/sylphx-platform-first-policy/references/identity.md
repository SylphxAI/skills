# Identity

Customer-application authentication is Platform Identity (separate issuer
from operator IAM / `svc_`).

1. Confirm Auth on the current public contract.
2. Use the runtime plane (`sk_…`) in the app.
3. Implement sign-up, sign-in, session, OAuth/OIDC, passkey, recovery through
   the Platform Auth SDK or API.
4. Authorize server decisions with the verified principal and tenant.
5. Prove: session issued; protected route accepts it; revoke rejects reuse.

Product policy (“this plan may open this talent”) stays in the product repo
and reads the Platform principal / entitlement.
