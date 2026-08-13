# Identity (sign-in)

How users enter an app on Sylphx Platform.

Customer-application authentication is a Platform Identity capability (Sigil).
It is a separate issuer from Platform IAM (the operator `svc_` / login plane).

## Do this

1. Confirm Auth is available on the current public contract (`sylphx` catalog /
   generated SDK / current docs).
2. Use the **runtime** plane (`sk_…` / publishable key as documented) in the
   app. Keep `svc_` tokens off browsers and off app request paths.
3. Implement sign-up, sign-in, session, OAuth/OIDC, passkey, and recovery
   through the Platform Auth SDK or runtime API.
4. Authorize every server decision with the verified principal and tenant.
   Frontend hiding is presentation only.
5. Prove: a session is issued; a protected route accepts it; revoke (or
   logout) makes reuse fail.

```ts
import { Client } from '@sylphx/sdk'
const app = Client.create(process.env.SYLPHX_SECRET_KEY!, 'tenant-slug')
// Use the current Auth methods from the installed SDK / generated client.
```

Consent, export, and deletion are the same family. Open current Auth and
consent surfaces rather than a local privacy store.

## Product domain stays local

“Which plan may open this talent?” is product policy. It reads the Platform
principal and a Commerce entitlement; it does not become a second IdP.
