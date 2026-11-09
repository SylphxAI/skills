# Sign-in and account standard

Trigger: building or changing sign-up, sign-in, recovery, linked identities, sessions, delegated access, or account deletion.

Give people a fast, accessible route into the product and give agents an appropriately scoped identity. Prefer a coherent product-branded experience; white-label obligations, domains, and provider registrations belong in the product's contract.

## Hard lines

- Authority is checked by the server. A client renders the flow; it does not decide whether a credential is valid or an effect is allowed ([security](security.md#hard-lines)).
- Binding a login preserves the account and its data. A login already bound elsewhere offers an explicit switch/linking route instead of silently merging accounts.
- Scope credentials to their intended principal, audience, and permissions; keep secret material out of source/logs. Different credential types have different storage, reuse, and expiry rules ([identifiers](identifiers.md#credentials)).
- A promised account-deletion path actually performs the defined deletion and retention contract ([personal data](security.md#personal-data)).

## Integration model

Prefer supported SDK components on the product's own pages when they express the intended flow. Use a headless SDK for a needed custom flow and a hosted page where that best fits the client or provider. Keep security decisions at the server regardless of rendering choice. Compare actual embedded/headless/hosted capabilities, maintenance, branding, and domain setup (for example, WorkOS's AuthKit custom-domain guide requires CNAME setup).

Use native platform credential APIs on native clients rather than embedding a password web view. On the web, use supported WebAuthn APIs and feature detection rather than user-agent guesses. WebAuthn Level 3 (Recommendation, 25 August 2026) includes JSON option parsing, `getClientCapabilities()`, and credential signal methods.

Choose a stable RP ID valid for the calling origin and validate origins on the server. It can be the registrable domain or an appropriate permitted narrower scope; related-origin requests need explicit configuration and client support. Treat an RP ID change as a credential-continuity change.

After a rejected unknown credential, use `signalUnknownCredential()` where supported. Use `signalAllAcceptedCredentials()` only in the authenticated context appropriate to the full credential list. Feature-detect support and verify the provider's behavior; a signal does not replace the server's check or guarantee every picker updates immediately.

## Risk checks and delivery cost

Human or session assurance and permission to incur recurring delivery cost are
independent: successful anti-abuse verification or a valid session never resets
the server-side cost or conversion budget. In a risk-based step-up flow, a
low-risk request makes no anti-abuse provider call; keep thresholds and other
product-specific constants in product policy. **Bad:** a passed challenge unlocks
unlimited message sends; **Good:** the request still passes delivery admission,
while a low-risk sign-in needs no challenge provider.

## The one sign-in flow

Every product uses a single unified passwordless entry flow for both new and returning users.

### Rules

1. **One entry, one verb:** Do not maintain separate sign-in and sign-up pages. Title the entry for the product (*"Sign in to …"*) with the primary action **Continue**. A verified identity with no existing account creates one automatically; an existing account signs straight in. Redirect legacy `/signup`, `/register`, and `/forgot-password` routes permanently to the unified entry while preserving the return URL.
2. **No new passwords:** Never ask a user to create a password, and do not build a `"forgot password"` reset flow—one-time code or passkey verification already establishes possession. Preserve continuity for legacy password accounts by offering `"Use password instead"` on step 2 when an identifier has a password and no passkey, and let users remove their legacy password once a passkey or verified channel is linked.
3. **Email as the primary text identifier:** Accept an email address in the identifier field—no sign-in usernames and no public SMS sign-up (SMS carries per-message cost and toll-fraud exposure; retain phone sign-in only for legacy continuity where already live). Request a display name or handle later inside the product only when needed, defaulting to the identity provider's profile name when available.
4. **6-digit codes, not magic links:** Use a 6-digit one-time verification code rather than a magic link, which breaks across devices and embedded in-app browsers.
5. **Single shared implementation:** Render the flow through the platform's shared web component/hosted entry or native SDK sheet rather than hand-writing per-product forms.

### Screen 1: choose a way in

- Show at most three primary social/federated provider buttons (*"Continue with …"*) at equal size with official marks: on iOS, lead with Sign in with Apple; on Android and web, lead with Google, followed by the audience's primary regional or domain provider (such as LINE in Taiwan/Japan or GitHub for developer tools), placing additional providers behind *"More ways to continue"*.
- Badge the method last used on this browser or device with *"Last used"*.
- Below a divider, render a single email input (`type="email"`, `autocomplete="username webauthn"`, `inputmode="email"`) and the **Continue** button. Start a conditional WebAuthn request on load so saved passkeys appear in autofill for one-tap sign-in.
- Include a concise terms and privacy notice with links below the button; collect optional marketing opt-ins separately without pre-ticked boxes.
- In embedded in-app web views where an OAuth provider blocks framing, hide that provider button and lead with email and passkey.

### Screen 2: prove it, on the same page

- Transition inline without a full page reload. Invoke a device passkey if registered; otherwise send the 6-digit code and focus a single numeric field (`autocomplete="one-time-code"`, `inputmode="numeric"`) that supports full-code paste and auto-submits on the sixth digit.
- Display the masked recipient address (*"Sent to k•••@example.com"*), a *"Change email"* link, and a *"Resend"* action with a 30-second cooldown. Expire codes after 10 minutes with a bounded attempt budget, and preserve typed input on error.
- Keep Screen 1 and Screen 2 identical for new and returning users until verification succeeds.

### After verification

- Return existing users to their starting route and place new users directly into the product's first useful screen.
- Prompt once to register a passkey (*"Use Face ID / Touch ID next time"*) via conditional create where supported, snoozing for 30 days if declined.

### Apple and account deletion

- Whenever an iOS app offers third-party sign-in, include Sign in with Apple at equal visual prominence per App Store Review Guideline 4.8.
- Provide in-app account deletion that revokes Sign in with Apple tokens and cancels store/platform billing per App Store Review Guideline 5.1.1(v) and Google Play policy.

### Assurance notes

- Verify the WebAuthn user-verification (`UV`) flag when multi-factor assurance is required; a passkey without `UV` is single-factor cryptographic authentication under NIST SP 800-63B-4.
- Because email codes provide convenience rather than NIST out-of-band assurance, require a passkey or step-up check for high-risk account or financial actions where the product contract requires it.
- Where legacy passwords exist, follow NIST SP 800-63B-4 (minimum 15 characters as a sole factor or 8 with MFA, paste/password-manager support, compromised-password screening, and rotation only on evidence of compromise).

## Guests and linking logins

Where the core experience works without sign-in, provision a stable guest account bound to a device credential. Upgrading or saving progress links the verified identity directly to that guest account so zero progress or purchases are lost ([account protection](../../challenge/references/experience.md#account-protection)).

Key OIDC identities by validated `(iss, sub)`, never email alone. Auto-link by verified email only when the provider is authoritative for that address (Google for Gmail/verified Workspace domains, Apple, Microsoft for its domains, a GitHub primary verified email, or an email OTP) and the existing account's proof is valid; otherwise require authenticating the existing account first. If the chosen login already belongs to another account with progress or purchases, let the user choose which account to keep rather than silently overwriting either.

List linked sign-in methods in settings and prevent removing the last active sign-in method.

### Prove guest continuity

Recovery has two independent facts: retained-source presence and readable
credential value. A decoded optional value cannot prove absence; test absent,
corrupt-only and corrupt-plus-readable sources through the public login path,
including its fallback, with no replacement identity or storage writes on refusal.
A parser returning several accounts also proves no durable import: compare the
complete credential set after the production importer, reload and actual account
consumer, using original-writer bytes and real storage encoding/compaction states
rather than fixtures invented around the parser. **Wrong:** a helper returns two
accounts while its caller keeps only the first; **Right:** both remain selectable
after relaunch, and unreadable evidence cannot authorize a new account.

Credential imports have two independent equivalences: account identity and
credential identity; deduplicating accounts before verification can discard the
only working credential, while first-entry deduplication of identical credentials
can discard newer usable metadata. An ambient bearer or cookie has no account
binding merely because an entry lacks a token: retain the association established
by its source or server verification, and test distinct candidates, reordered
freshness, nonempty ambient credentials and every supported validator-optional
path through import and reload. **Wrong:** keep the first account entry and fill
its missing bearer from the browser session; **Right:** preserve candidate
credentials until verification, retain the contract-selected complete record,
and omit a bearer whose owner is unproven.

For a live product, verify guest and account continuity across five distinct layers—passing one layer never substitutes for another:

- **Implementation:** Inspect the account selector, creation guard, and all sign-in entrypoints to confirm existing accounts are preserved.
- **Serving behavior:** Bind source revisions and runtime flags on every serving node.
- **Installed client:** On an owned test device, verify that nonzero guest and linked-account progress survive both an in-place signed app update and an uninstall/reinstall cycle, reading the account ID from the product UI or authorized account API.
- **Paid value:** Verify that a test-mode purchase or authorized test entitlement survives the same transitions.
- **Population:** Reconcile aggregate account-continuity metrics over a stated window and eligible population.

For an in-place app-update check, bind both signed artifacts to their package,
version and SHA-256, and verify signing compatibility before installing. On an
owned synthetic guest, capture the account identity and balance, force-stop and
cold-launch the old client, then capture them again. If the UI exposes no stable
account ID, use a marker known to belong to the server account, such as a
server-backed nickname. A local preference can survive an update while the
server creates a fresh account, so cold-start persistence alone does not prove
server identity. If no server-backed identity marker is available, use an
authorized normal gameplay action on the synthetic guest to establish a
non-default exact balance, then confirm that balance after a baseline cold
start. Do not substitute a daily reward available to every fresh account. A
default name or starting balance cannot distinguish a restored guest from a new
one. Label a marker comparison as such; it does not establish a numeric ID.

Use the supported data-preserving update operation. Capture the candidate's
first-open sign-in or restore prompt before interacting, then cold-launch it and
compare the marker and exact balance. Once the baseline is established, avoid
play, purchases and reward claims between captures so balance changes cannot
confound the result. Keep the baseline and candidate on the same device and
lease; an expired or lost device requires a new baseline. Retain frames
when a canvas or game engine omits rendered text from the accessibility tree.
Read back the installed version and APK hash; a successful installer response
alone does not bind the client being observed. Keep the verdict scoped to the
tested guest and transition, separate from reinstall, linked-account, paid-value
and population checks.

## Recovery

Recover accounts through a verified channel with appropriate step-up checks and offer passkey enrollment afterward. Never rely on static knowledge-based security questions. Scope support views to audited, read-only access unless an explicit recovery grant is authorized.

## Sessions and sign-out

Choose bounded access-token lifetimes and an explicit refresh/revocation profile (such as refresh-token rotation with reuse detection or sender-constrained tokens under RFC 9700). Protect web cookies with `HttpOnly`, `Secure`, and `SameSite`/CSRF controls, and store native tokens in OS keystore storage. Where Device Bound Session Credentials (DBSC) are supported, test renewal refusal without the registered key while maintaining a fallback for unsupported browsers. Provide a clear sign-out action and active-session management.

A refresh repair can preserve continuity in one transport while another active
transport persists rotation as an independent selection; the relevant population
is every handler that changes the shared credentials, not only the failing client.
**Bad:** verify one client's refresh helper and infer account continuity; **Good:**
overlap each production refresh path with pending account or role work, allowing
proven source-to-successor continuity while independent same-account and
different-account replacements reject stale credential, cookie, retry and cleanup
effects.

With cookie-authenticated proxies, `Origin` and Fetch Metadata carry evidence
about the initiating browser request; substituting a configured trusted origin
or inventing `Sec-Fetch-Site` erases that provenance.
Where a trusted server-side method contract distinguishes reads from mutations,
enforce that effect at the API boundary rather than treating every `POST` as a
mutation, while keeping missing, foreign and opaque origins distinct.
Verify both permitted reads and refused mutations through the actual session
middleware and downstream handler: a forwarding-only mock can miss a guard that
breaks server-rendered reads or admits an unverified write.

## Agents, CLIs, and MCP clients

Use OAuth 2.0 Device Authorization (RFC 8628) for interactive user delegation from browserless or CLI clients, and scoped workload identities for unattended agents. Describe delegated tokens by issuer, subject/actor, audience, scope, and expiry (RFC 8693), with optional DPoP sender constraints (RFC 9449) where selected.

For HTTP MCP authorization, follow the normative specification requirements:
- Publish and discover protected-resource metadata via RFC 9728 (supporting path-specific well-known URLs).
- Pass and validate the RFC 8707 `resource` indicator at the resource server.
- Enforce authorization-code + PKCE and issuer/redirect validation, supporting Client ID Metadata Documents alongside pre-registration or dynamic registration as specified by MCP `2026-07-28`.

## Accessibility, settings and deletion

Preserve paste and password-manager/autofill support across all authentication fields, localize all auth and recovery screens, and keep checkout return paths bound to the initiating guest or signed-in account. Distinguish deletion accepted from deletion completed, retaining only records required by applicable tax or statutory law.

## Verify the exposed contract

Verify the unified sign-in flow (Screen 1, Screen 2 code/passkey, returning sign-in, new sign-in, in-app browser fallback, guest-to-linked upgrade, session revocation, and account deletion) on phone and desktop viewports against the live serving environment.

Present-but-invalid stored credentials are unreadable, not absence that
permits a replacement user or fallback to another saved identity. Positive
absence and a source-documented zero-byte standalone-file fallback are distinct
states; verify them separately from malformed bytes and invalid credential shapes.

## References

Primary sources checked 2026-10-30 and 2026-11-03:
- [passkeys.dev bootstrapping](https://passkeys.dev/docs/use-cases/bootstrapping/), [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/), [Passkey autofill](https://web.dev/articles/passkey-form-autofill), [conditional create](https://developer.chrome.com/docs/identity/webauthn-conditional-create), and [signal API guidance](https://developer.chrome.com/docs/identity/webauthn-signal-api).
- [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) sections 3.1.1 and 3.1.3.1.
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700), [RFC 8628](https://www.rfc-editor.org/rfc/rfc8628), [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693), [RFC 9449](https://www.rfc-editor.org/rfc/rfc9449), [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728), [RFC 8707](https://www.rfc-editor.org/rfc/rfc8707), and [OAuth 2.1 draft -16](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/16/).
- [MCP 2026-07-28 authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization).
- [DBSC draft](https://w3c.github.io/webappsec-dbsc/) and [Chrome DBSC behavior](https://blog.google/security/protecting-cookies-with-device-bound-session-credentials/).
- [Google ID token verification](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token), [Google One Tap](https://developers.google.com/identity/gsi/web/guides/features), [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html), [Auth0 integration comparison](https://auth0.com/docs/authenticate/login/universal-vs-embedded-login), and [WorkOS AuthKit domain setup](https://workos.com/docs/custom-domains/authkit).
- [WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), [Apple Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) 4.8 & 5.1.1(v), [Apple deletion](https://developer.apple.com/news/?id=12m75xbj), and [Google Play deletion](https://support.google.com/googleplay/android-developer/answer/13327111).

Primary sources checked 2026-11-06 for request provenance and method semantics:
- [Fetch Standard, `Origin` header](https://fetch.spec.whatwg.org/#origin-header)
  defines origin serialization, including `null`.
- [RFC 9110, POST](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.3.3)
  leaves request processing to the target resource's semantics; a declared
  read-only application method is an explicit server contract, not a generic
  exemption for `POST`.
