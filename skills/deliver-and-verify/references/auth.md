# Sign-in and account standard

Trigger: building or changing sign-up, sign-in, recovery, linked identities, sessions, delegated access or account deletion.

Give people a fast, accessible route into the product and give agents an appropriately scoped identity. Prefer a coherent product-branded experience; white-label obligations, domains and provider registrations belong in the product's contract.

## Hard lines

- Authority is checked by the server. A client renders the flow; it does not decide whether a credential is valid or an effect is allowed ([security](security.md#hard-lines)).
- Binding a login preserves the account and its data. A login already bound elsewhere offers an explicit switch/linking route instead of silently merging accounts.
- Scope credentials to their intended principal, audience and permissions; keep secret material out of source/logs. Different credential types have different storage, reuse and expiry rules ([identifiers](identifiers.md#credentials)).
- A promised account-deletion path actually performs the defined deletion and retention contract ([personal data](security.md#personal-data)).

## Integration model

Prefer supported SDK components on the product's own pages when they express the intended flow. Use a headless SDK for a needed custom flow and a hosted page where that best fits the client or provider. Keep security decisions at the server regardless of rendering choice.

Compare actual embedded/headless/hosted capabilities, maintenance, branding and domain setup. For example, WorkOS's AuthKit custom-domain guide requires CNAME setup.

Use native platform credential APIs on native clients rather than embedding a password web view. On the web, use supported WebAuthn APIs and feature detection rather than user-agent guesses. WebAuthn Level 3 (Recommendation, 25 August 2026) includes JSON option parsing, `getClientCapabilities()` and credential signal methods.

Choose a stable RP ID valid for the calling origin and validate origins on the server. It can be the registrable domain or an appropriate permitted narrower scope; related-origin requests need explicit configuration and client support. Treat an RP ID change as a credential-continuity change.

After a rejected unknown credential, use `signalUnknownCredential()` where supported. Use `signalAllAcceptedCredentials()` only in the authenticated context appropriate to the full credential list. Feature-detect support and verify the provider's behavior; a signal does not replace the server's check or guarantee every picker updates immediately.

## Detailed sign-in and sign-up flow

Use one identifier-first entry where it simplifies the product's flow:

1. Offer the supported native/provider buttons, a passkey button and an identifier field. For conditional passkey autofill, annotate the field with `autocomplete="username webauthn"` and feature-detect the ceremony.
2. Select an available method for the identified account: passkey, an existing password or a verified-channel code. An unknown email can verify a code to create an account. These branches can reveal different account states; do not claim indistinguishability unless all relevant branches are designed and tested for it.
3. For a code, use a pasteable input with `autocomplete="one-time-code"`, a declared short lifetime, single-use redemption and an attempt budget. Bind completion to the intended transaction/browser when the flow needs it, including handling mail-scanner clicks and cross-device links.
4. Ask only for information needed for the first useful action; obtain terms/consent as the applicable product/market requires. Offer a passkey after a successful non-passkey sign-in, using conditional create only where supported and appropriate.

Choose methods for the audience and assurance requirement:

- Passkeys are the preferred phishing-resistant method. For multi-factor assurance, request and verify the required user-verification result; a passkey without verified UV is single-factor cryptographic authentication under NIST.
- Apple/Google or enterprise federation can supply supported native/SSO paths. Apply App Store 4.8 where it binds, including its stated exceptions, rather than assuming every iOS product needs another provider.
- Email codes can be a product's convenience or recovery choice. NIST prohibits email as out-of-band authentication for its assurance model; email confirmation/recovery is a separate use, so an email login does not establish that NIST assurance.
- Existing or necessary passwords follow the selected assurance profile. NIST SP 800-63B-4 calls for at least 15 characters for a sole factor or 8 within MFA, no composition rules, paste/password-manager support and a compromised-password blocklist. Avoid periodic changes; require a reset when there is evidence of compromise.
- Use SMS only where its audience/value justifies it and the existing authorization covers the cost. Ask only for new unauthorized spending, not another approval of an already funded integration.

## Guests and linking logins

Where the core experience works without sign-in, a guest can be a stable account with a device credential. Adding protection preserves that identity and data rather than copying it to a new account ([account protection](../../self-challenge/references/experience.md#account-protection)).

Key an OIDC identity by validated issuer/provider and subject (`iss`, `sub`), not email alone. Link automatically on a verified email only when the provider is authoritative for that address and the existing account's proof is valid. Google's guide identifies Gmail and verified Workspace/Cloud-domain cases; other providers need their own rules. Otherwise authenticate the existing account before linking. Protect against an unverified pre-registration credential remaining attached after linking.

List linked methods in settings and prevent removing the last supported way in. Keep one declared authority for memberships and permissions, with derived read copies where needed. The actual account/organization design and current service ownership belong with that product.

## Recovery

Recover through an established verified channel and apply the product's required step-up/assurance policy. Offer stronger protection afterwards. Avoid knowledge questions as proof of identity.

Define notification, session invalidation and any money-movement hold from the product's actual contract and measured risk. Support can start the same verified recovery route; it does not skip authentication. An authorized support view is scoped, audited and read-only unless a separate grant permits an effect. Apply the product's existing privacy and access policy.

## Sessions and sign-out

Choose bounded access-token lifetimes and an explicit refresh/revocation profile. Refresh-token rotation with reuse detection is one choice; RFC 9700 also permits sender-constrained refresh tokens for public clients and describes confidential-client binding. Do not attribute a universal rotation requirement to it.

For web cookie sessions, use appropriate `HttpOnly`, `Secure` and SameSite/CSRF controls on the intended origin; native clients use protected OS storage. Local signature verification can avoid an identity lookup on each request, but requires explicit expiry and revocation-propagation semantics. Verify those semantics for sign-out, recovery and ending another session.

Where supported and selected, DBSC binds session renewal to possession of a protected private key. Short-lived cookies can remain usable until expiry; test refused renewal without the registered key and expiration of a copied cookie rather than promising every immediate replay is rejected. Show binding status only from an actual supported observation, and keep a working fallback where binding is unavailable.

Give users a visible sign-out and a way to inspect/end active sessions and connected agents. Step up for account/credential changes and sensitive money actions according to the product's authorization contract.

## Agents, CLIs, and MCP clients

Use device authorization (RFC 8628) for supported interactive delegation from an input-constrained/browserless client. The approval screen identifies the client, permissions and request context and tells the person to approve only a request they initiated. Unattended workloads use their own supported machine/workload identity rather than requiring a person at every run.

Describe a delegated token by issuer, subject/actor, audience, scope and expiry, with an auditable grant. RFC 8693 defines token exchange and delegation semantics. Specify attenuation, signing authority and cascade revocation in the implemented contract; document the propagation delay for revoking future use.

DPoP (RFC 9449) is a sender-constrained token profile a product can select where supported. Its `dpop_signing_alg_values_supported` field is authorization-server metadata. A mandatory DPoP scope policy is an additional product choice, not an MCP authorization requirement.

For HTTP MCP authorization, preserve the normative requirements of the supported specification:

- Publish and discover protected-resource metadata through RFC 9728, including the path-specific well-known URL or advertised metadata location. Do not assume every resource is the origin root.
- Include the RFC 8707 `resource` indicator as specified and validate audience at the resource server.
- Use the required authorization-code/PKCE and issuer/redirect checks.
- In MCP 2026-07-28, authorization servers and clients SHOULD support Client ID Metadata Documents. Pre-registration and the specified retained dynamic-registration route remain alternatives; do not promote SHOULD to MUST.
- Request the permissions the feature needs and support the specified step-up challenge. The needed scope set can include several permissions at once.

Set lifetimes and child-data permissions from the actual product's authorization/privacy obligations rather than fixed hours or a blanket prohibition on authorized system processing.

## Accessibility, settings and deletion

Keep paste and password-manager/autofill support, a whole-code paste path and accessible labels. WCAG 2.2 SC 3.3.8 provides alternative/mechanism/object-recognition/personal-content exceptions; a no-puzzle default is a UX choice rather than proof every image challenge violates the criterion. Localize the shipped authentication, recovery and security surfaces and test the product's supported locales/layouts.

Return checkout to the initiating context and preserve the paying guest's account. Invitations, email changes and undo actions carry explicit verification/expiry semantics. Offer the settings and deletion controls the product promises, cancel the relevant ongoing billing and revoke provider tokens as required, and distinguish deletion accepted from deletion completed. Preserve only applicable legally required records.

## Verify the exposed contract

Select cases for the features/channels the product exposes and the contracts changed: sign-in, linked methods, guest continuity, recovery, session revocation, delegated access, accessibility and deletion. Test protocol-specific features only where supported. Verify deployed behavior at its actual surface without manufacturing unrelated auth features or a pre-use approval stage.

Watch sign-in success/time, recovery completion and support/account-takeover reports on a stated population/window.

## References

Primary sources checked 2026-10-30:

- [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/) and [signal API guidance](https://developer.chrome.com/docs/identity/webauthn-signal-api).
- [Passkey autofill](https://web.dev/articles/passkey-form-autofill) and [conditional create](https://developer.chrome.com/docs/identity/webauthn-conditional-create).
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html).
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700), [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628), [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693), [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) and [RFC 8707](https://www.rfc-editor.org/rfc/rfc8707).
- [OAuth 2.1 draft -16](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/16/) (3 September 2026; still a draft in this read).
- [MCP 2026-07-28 authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- [DBSC draft](https://w3c.github.io/webappsec-dbsc/) and [Chrome availability/renewal behavior](https://blog.google/security/protecting-cookies-with-device-bound-session-credentials/).
- [Google ID token verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html), [Auth0 integration comparison](https://auth0.com/docs/authenticate/login/universal-vs-embedded-login) and [WorkOS AuthKit domain setup](https://workos.com/docs/custom-domains/authkit).
- [WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), [Apple review guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple deletion](https://developer.apple.com/news/?id=12m75xbj) and [Google Play deletion](https://support.google.com/googleplay/android-developer/answer/13327111).
