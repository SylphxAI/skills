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

## The one sign-in flow

Every product uses the same entry for new and returning people. This is one standard for every product and site; there is no per-product variant.

### Rules

1. **One entry, one verb.** There is no separate sign-up page. The entry is titled for the product ("Sign in to …" / 「登入 …」) and the action is **Continue** (「繼續」). A verified identity that has no account gets one at that moment; one that has an account goes in. Old `/signup`, `/register` and `/forgot-password` routes redirect permanently to the entry and keep the return page.
2. **No new passwords.** Nobody is asked to create a password. There is no "forgot password" flow, because a code sign-in already proves the same thing. Existing password accounts keep working (live sign-ins never break): when the identifier has a password and no passkey, step 2 offers "Use password instead" as a secondary link. A person can remove their password in settings once a passkey or verified channel exists.
3. **Email is the identifier.** The field accepts an email address only. No usernames for sign-in, no public phone/SMS sign-up (SMS costs money per message and invites pumping). Accounts that already sign in with a phone number keep their existing route; that is continuity, not a new option. A display name or public handle is asked later, inside the product, only where it is needed; take the name from the provider when there is one.
4. **Codes, not links.** Email verification is a 6-digit code, not a magic link (links break across devices and in-app browsers).
5. **One implementation.** Products never hand-write sign-in or sign-up forms. Web uses the platform's hosted entry or its single shared component; native apps use the SDK's native sheet with the same order, wording and states. A change to the flow is made once.

### Screen 1: choose a way in

- At the top, the provider buttons for the product's audience, at most three visible, each "Continue with …" (「使用 … 繼續」), with the provider's own marks and equal size. Order: on iOS, Sign in with Apple first; on Android and the web, Google first; then the audience's next most used (for example LINE in Taiwan and Japan, GitHub for developers). The rest sit behind "More ways to continue".
- A "Last used" tag on the method this browser or device used last.
- A divider, then one email field (`type="email"`, `autocomplete="username webauthn"`, `inputmode="email"`) and the Continue button. On page load, start a conditional passkey request so a saved passkey appears in the field's autofill; selecting it signs in with no further step.
- Under the button, one plain line: continuing means agreeing to the terms and privacy policy, both linked. No checkbox; marketing consent is never pre-ticked and is asked separately, later.
- In an in-app browser where a provider refuses to load (for example Google in embedded web views), hide that provider's button and lead with email and passkey instead of showing a dead end.

### Screen 2: prove it, on the same page

- No page load. If the account has a passkey on this device, call it. Otherwise send the code and show a single code field (`autocomplete="one-time-code"`, `inputmode="numeric"`) that accepts a pasted code and submits by itself at the sixth digit.
- Show where the code went ("Sent to k•••@example.com"), "Change email", and "Resend" that becomes available after 30 seconds. The code lives 10 minutes, is single-use and has an attempt budget; wrong entries say so plainly and keep what was typed.
- New and returning people see exactly the same screens until the code is accepted.

### After the code

- A returning person lands where they started. A new person lands in the product's first useful screen; ask nothing else first.
- Offer a passkey once ("Use Face ID next time"), using conditional create where the browser supports it. If declined, don't ask again for 30 days.

### Linking and guests

- A verified email links automatically only when the provider is authoritative for that address (Google for Gmail and verified Workspace domains, Apple, Microsoft for its domains, a GitHub primary verified email, an email code). Otherwise the person proves the existing account first. See [Guests and linking logins](#guests-and-linking-logins).
- Guests play or try first. "Save progress" opens this same flow and keeps the guest's identity and data. If the chosen login already belongs to another account with progress or purchases, show both and let the person choose: keep this one, or switch to the other. Never overwrite either silently.

### Apple and account deletion

- Where an iOS app offers a third-party login for the primary account, it offers an equivalent privacy-focused option as App Store Guideline 4.8 requires; Sign in with Apple meets it. Show it at the same size and level as the others.
- Account deletion is in the app and revokes Sign in with Apple tokens.

### Check every site against this

For each product, record: entry URL, screen 1 frame (phone and desktop), the code step, a returning-account sign-in, a new-account sign-in, a passkey sign-in and the passkey offer, the in-app-browser case, and the guest-to-account case. A site passes only when all of them match this section.

### Assurance notes

- Passkeys are the preferred phishing-resistant method. For multi-factor assurance, request and verify the required user-verification result; a passkey without verified UV is single-factor cryptographic authentication under NIST.
- NIST SP 800-63B-4 prohibits email for out-of-band authentication in its assurance model (confirmation and recovery codes are a separate use). An email-code sign-in is a consumer convenience and does not establish that assurance; step up with a passkey for sensitive actions where the product's contract needs it.
- Existing passwords follow NIST SP 800-63B-4: at least 15 characters as a sole factor (8 within MFA), no composition rules, paste and password-manager support, a compromised-password blocklist, and no periodic changes (reset only on evidence of compromise).
- SMS is only for routes that already exist and whose cost is already authorized; it is never a public sign-up path.

## Guests and linking logins

Where the core experience works without sign-in, a guest can be a stable account with a device credential. Adding protection preserves that identity and data rather than copying it to a new account ([account protection](../../self-challenge/references/experience.md#account-protection)).

Key an OIDC identity by validated issuer/provider and subject (`iss`, `sub`), not email alone. Link automatically on a verified email only when the provider is authoritative for that address and the existing account's proof is valid. Google's guide identifies Gmail and verified Workspace/Cloud-domain cases; other providers need their own rules. Otherwise authenticate the existing account before linking. Protect against an unverified pre-registration credential remaining attached after linking.

List linked methods in settings and prevent removing the last supported way in. Keep one declared authority for memberships and permissions, with derived read copies where needed. The actual account/organization design and current service ownership belong with that product.

### Prove guest continuity

For a live product, separate these evidence levels; a pass at one level does not pass the others:

- **Implementation:** read the existing-account selector, creation guard and every creation entrypoint. Preserve the documented working selector unless the outcome explicitly changes it. Name eligibility, missing-identifier and lock-expiry paths rather than promising universal exactly-once creation from a conditional guard.
- **Serving behavior:** bind the relevant source bytes to every serving revision and read the actual runtime switches, including unset/default behavior. A main-branch commit or configuration schema does not prove rollout.
- **Installed client:** use an owned fixture on the supported old client. Record account identity and nonzero progress before an in-place signed update and, separately, uninstall/reinstall. Repeat for guest and bound accounts; compare the same fields afterwards. Read account IDs from the product UI or authorized account surface, not a device identifier. An API-only login does not pass an installed-client case.
- **Paid value:** verify an existing supported test entitlement through the product's normal test-payment or authorized grant route, then compare entitlement and expiry after each transition. Free starting balance cannot prove paid-value continuity. Without a supported fixture, retain the paid-value row as unproven; do not invent a grant or spend real money.
- **Population:** use authorized, bounded aggregate reports with the title, window, exclusions and total eligible population stated. An unavailable report or timed-out query means unknown, not zero. Shared device-code overlap alone does not establish a person, physical device or lost value.

Report the exact remaining client/account/transition/value combinations. Keep source, serving, client and population receipts distinct so a strong result in one cannot hide a gap in another.

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

Primary sources checked 2026-10-30; the one-flow section re-read on 2026-11-03 against [passkeys.dev bootstrapping](https://passkeys.dev/docs/use-cases/bootstrapping/) (updated 31 October 2025), [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) sections 3.1.1 and 3.1.3.1, [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) 4.8 and 5.1.1(v), and [Google One Tap behaviour](https://developers.google.com/identity/gsi/web/guides/features):

- [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/) and [signal API guidance](https://developer.chrome.com/docs/identity/webauthn-signal-api).
- [Passkey autofill](https://web.dev/articles/passkey-form-autofill) and [conditional create](https://developer.chrome.com/docs/identity/webauthn-conditional-create).
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html).
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700), [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628), [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693), [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) and [RFC 8707](https://www.rfc-editor.org/rfc/rfc8707).
- [OAuth 2.1 draft -16](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/16/) (3 September 2026; still a draft in this read).
- [MCP 2026-07-28 authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- [DBSC draft](https://w3c.github.io/webappsec-dbsc/) and [Chrome availability/renewal behavior](https://blog.google/security/protecting-cookies-with-device-bound-session-credentials/).
- [Google ID token verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html), [Auth0 integration comparison](https://auth0.com/docs/authenticate/login/universal-vs-embedded-login) and [WorkOS AuthKit domain setup](https://workos.com/docs/custom-domains/authkit).
- [WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), [Apple review guidelines](https://developer.apple.com/app-store/review/guidelines/), [Apple deletion](https://developer.apple.com/news/?id=12m75xbj) and [Google Play deletion](https://support.google.com/googleplay/android-developer/answer/13327111).
