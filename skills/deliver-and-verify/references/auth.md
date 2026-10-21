# Sign-in and account standard

Trigger: building or changing how a person or an agent signs up, signs in,
recovers an account, links a login, manages sessions, or deletes an account,
in any product.

Goal: one way to get in across every product - fast for people, native for
agents, hard to take over - that looks like the product and never like us.
The platform identity service does the work behind it; the product owns
the screens.

## Hard lines

- **Customers never see the platform.** No page, email, SMS sender, consent
  screen, passkey name, device page, error, or cookie name a product's customer
  sees names the underlying platform or shows an internal platform domain, because a product sold as its
  own brand loses trust when a stranger's name appears at the door.
- The client renders steps; the platform identity service decides which step comes next, whether a
  code is right, and when a session exists. Authority is checked on the server
  ([security.md](security.md#hard-lines)).
- **Binding a login never moves or loses data**, and a login that already
  belongs to another account offers a switch, not a merge
  ([experience.md](../../self-challenge/references/experience.md#hard-lines)).
- **Agents and CLIs never get a long-lived personal key.** They get a scoped,
  short-lived, revocable token through device authorization
  ([dx.md](dx.md#agent-native-access)), because a copied key leaks and cannot
  be governed. An operator that must act on another's behalf uses an
  **attenuated child key**: the parent is the only signer, the child's scopes
  and expiry are a subset of the parent's, and every use it authorises carries
  the parent's receipt ([agents and operator keys](#agents-clis-and-mcp-clients)).
- **Codes and tokens are credentials** ([identifiers.md](identifiers.md#credentials)):
  stored hashed, single use, short lived, rate limited.
- Account deletion is reachable in the product and actually runs
  ([security.md](security.md#personal-data)).

## Integration model

Order of preference:

1. **SDK drop-in components on the product's own site** (the default). The
   product places `<SignIn />`, `<UserButton />`, `<AccountSettings />` (web)
   or their native equivalents (iOS, Android, Keel) on its own pages and
   themes them from its brand home. the platform identity service serves its API on the
   product's own origin, so cookies are first-party and nothing needs DNS.
2. **Headless SDK** when a product needs a flow the components cannot express.
   The product owns markup, states, and accessibility; the SDK still owns
   every security decision.
3. **Hosted page** only where the product cannot render its own screen: a TV
   or console, the consent page an outside agent or MCP client opens, and the
   device-approval page. It runs on the product's own domain with the
   product's brand.

Why this order: Clerk, Stytch, WorkOS (headless AuthKit) and Supabase all keep
the person on the product's site, and it is the only model that meets the
first hard line without per-product DNS work. It also binds passkeys to the
product's own domain, which a redirect to a shared auth domain cannot.
Auth0's reason to prefer hosted login (one hardened page, cross-app sign-on)
is covered by the SDK owning the security logic and by same-brand products
sharing one account.

Native apps use the platform credential APIs (Apple `ASAuthorization`, Android
Credential Manager) with the product's associated domains, not a web view.
On the web, passkeys come from WebAuthn Level 3 (W3C Recommendation,
2026-08-25): the server's JSON is the ceremony through
`parseCreationOptionsFromJSON()` and `parseRequestOptionsFromJSON()`, the product
asks the browser what it can do with `getClientCapabilities()` before offering a
method instead of sniffing the user agent, and when an authenticator holds a
credential the server no longer knows, the server tells it with the Level 3
signal methods (`signalUnknownCredential()`, `signalAllAcceptedCredentials()`)
as it answers a rejected assertion, so a deleted or reset account stops
appearing in the picker. The signal never replaces the server's own check.

## The sign-in and sign-up flow

The steps, methods and second factor are in [the detailed sign-in flow below](#detailed-sign-in-and-sign-up-flow).

## Start without an account

Where a product's first minute works without an account (games, tools,
trials), the person starts as a guest: a real account with a device
credential and a stable user id, not a separate record. Protecting it later
adds a login to the same account id, so nothing moves. When and how to ask
follows [experience.md](../../self-challenge/references/experience.md#account-protection).

## Recovery

- Recovery goes through a verified channel on file (email code; phone where
  enabled), then asks the person to add a passkey. There are no security
  questions.
- Every recovery, new sign-in method, and email change is announced to every
  verified channel with a one-tap "this wasn't me" that locks the account and
  signs out everywhere.
- Recovery signs out every other session. A product that moves money holds
  withdrawals and payout-detail changes for a period after recovery (the
  product sets it).
- Support cannot sign a person in or skip verification; it can start the same
  recovery the person could, from the product's own records
  ([growth.md](../../self-challenge/references/growth.md)).
- Support may see a person's account only through a read-only "view as" that
  the person starts or consents to: it is time-boxed (30 minutes), the person
  is told, every view is in the audit log, and it can never act, sign in, or
  change anything as them.
- An account with one recovery method is asked to add a second (Account
  protection).

## Linking logins

- An account holds many logins (passkeys, providers, email, phone); each
  provider login is keyed by its `sub`, never by email alone.
- Link automatically on a matching email only when both sides have verified it
  and the provider is authoritative for it (Google: `email_verified` is `true`
  and the address is Gmail or has `hd`; Apple relay addresses never match).
  Otherwise the person signs in to the existing account first and links from
  there. Unverified password sign-ups get their password reset before linking,
  which stops pre-registration takeover.
- Settings lists every login with add and remove; removing the last way in is
  refused.

## People and organizations

- **One person, one account,** signed up with a personal identity, never a
  company email by default. Sign-up with an email already on an account offers
  sign-in or linking, never a second account.
- **An account joins many organizations,** with a role in each. A membership
  can carry its own verified work email for that organization's invites and
  notices, and an account can hold several verified emails.
- **An organization can restrict membership to verified emails on its
  domains,** with automatic join or approval.
- **The platform identity service is the single owner** of workspaces, memberships, roles, shares
  and permission checks (owner ruling 2026-10-04). A product keeps its own
  resources and may keep a read copy of membership for joins, never a second
  writer, because two writers of who-may-do-what drift and the drift is a data
  leak. Plans belong to the workspace
  ([commercial.md](../../self-challenge/references/commercial.md#plans-belong-to-workspaces)). The design is
  the platform workspaces specification.

## Sessions and sign-out

- A session is a short-lived access token plus a refresh token that rotates on
  use, and a reused refresh token revokes its whole family (RFC 9700). Web
  sessions live in `HttpOnly`, `Secure`, `SameSite=Lax` cookies on the
  product's origin; native apps keep tokens in the OS keychain. We run on
  today's settled RFCs (RFC 6749, 7636, 6750, 9700, 8252) until
  `draft-ietf-oauth-v2-1-16` (2026-09-03) is published; it consolidates them
  and removes what RFC 9700 already forbids, so no design takes a feature the
  settled RFCs lack from the draft alone.
- **A web session is bound to the device where the browser supports it.**
  Device Bound Session Credentials bind the cookie to a non-exportable
  hardware key (TPM, Secure Enclave), so a stolen cookie expires instead of
  being replayed; Chrome 146 shipped it on Windows (2026-04-09), macOS and the
  other browsers are still arriving. The server offers the binding at sign-in
  and refreshes the short-lived cookie only on a proof of possession. The
  sessions page tells the person whether this session is bound, read from the
  browser's own registration observation; the browser never decides policy,
  and a refused or skipped binding never blocks a sign-in. Where the browser
  has no binding, rotating short-lived cookies with reuse detection (RFC 9700)
  is the fallback, not a second implementation of the same session.
- Tokens are verified locally in each Cell, so the platform identity service is not a runtime
  dependency of every request.
- Sign-out is visible from every signed-in surface (the account menu), and it
  ends the session on the server, not only in the client.
- Settings lists active sessions and connected agents with device, place, and
  last use, and can end one or all. Changing a password or recovering ends the
  others.
- Changing email, adding or removing a login, deleting the account, and money
  actions need a recent sign-in (step-up), not just a live session.

## Agents, CLIs, and MCP clients

- **Device authorization** ([RFC 8628](https://www.rfc-editor.org/rfc/rfc8628))
  on the product's domain (`example.com/device`) is the default for a CLI or
  agent. The user code follows [identifiers.md](identifiers.md#codes-a-person-types).
- The approval page names the client, the scopes in plain words, and where the
  request came from, requires a recent sign-in, and says "Approve only if you
  started this just now", because device-code phishing (Storm-2372, 2025)
  works by getting a person to approve an attacker's code. The desk's own
  An operator device-flow login is that same delegated grant
  to agents, scoped, audited and revocable, never a shared credential
  (the repository's agent instructions).
- **An operator acting for a person uses a child key, never a copy of the
  parent.** The parent key stays with its owner and is the only signer; a
  child is issued by the platform for one audience, with scopes, tenants and
  an expiry that are each a subset of the parent's, and it dies when the
  parent is revoked or its own expiry passes. Every action a child authorises
  records the parent as the receipt (who it was issued from, by whom, when),
  so revoking the parent withdraws the work it emitted and the audit still
  names the person. An issue that would widen scope, lengthen life or cross a
  tenant is refused, which is what makes the delegation safe to hand to an
  agent.
- **A token carried over an HTTP MCP connection is sender-constrained.** DPoP
  ([RFC 9449](https://www.rfc-editor.org/rfc/rfc9449)) binds the access token
  to a key the client holds, so a token copied from a log or a proxy is
  useless without the matching proof; the resource publishes its algorithms in
  `dpop_signing_alg_values_supported`. A bearer-only MCP client may still
  connect, at the lowest scopes, and never for money or operator scopes.
- **MCP servers and third-party agents** follow the MCP authorization
  specification as published on 2026-07-28:

  | Requirement | What we do |
  | --- | --- |
  | Server publishes protected resource metadata (RFC 9728) | `/.well-known/oauth-protected-resource` on the MCP server's own origin, `resource` identical to the URL the client used |
  | Client sends `resource` (RFC 8707) in both requests | Every authorization and token request, canonical server URI, no fragment |
  | Server validates the token's audience | A token issued for another resource is refused, not merely scope-checked |
  | Authorization code with PKCE (OAuth 2.1) | S256 only, exact redirect match, `iss` checked (RFC 9207) before the code is sent |
  | Client registration by Client ID Metadata Document | Required path for an unrecognised client |
  | Dynamic client registration (RFC 7591) | Permitted but deprecated; kept only for a server that cannot read a metadata document |
  | Scopes | Step-up from the `WWW-Authenticate` scope, least privilege, never the whole list at once |

- Tokens are scoped to one product and project, expire in hours, refresh by
  rotation, and appear in the person's connected-agents list with revoke.
- Server workloads use workload identity, not a person's token
  (the credentials record).
- Children's products give agents no access to child data.

## Branding

Every customer-visible part carries the product's brand and domain:
sign-in pages, emails (sent from the product's domain, registered with Apple's
private relay), SMS sender name, passkey relying-party name, Apple and Google
consent screens (the product's own client registrations), device and consent
pages, and error text. Keys and tokens a product issues to its own users carry
the product's own credential prefix
([identifiers.md](identifiers.md#credentials)).

## Security baselines

- Rate limit per identifier, per IP range, and per device; lock a code after 5
  wrong tries.
- Bot protection runs invisibly (risk scoring, proof of work) and escalates to
  a challenge only on risk; no image or puzzle CAPTCHA by default, because it
  fails accessible authentication and loses real sign-ups.
- Credential errors do not say which part was wrong.
- New-device sign-ins are announced to the person.
- OAuth: PKCE on every client, exact redirect-URI match, no implicit or
  password grant (RFC 9700); `draft-ietf-oauth-v2-1-16` makes that the
  framework rather than a best practice, so a design that needs a settled
  citation cites RFC 9700 until it publishes.

## Accessibility and locales

- Meet [WCAG 2.2 SC 3.3.8](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html):
  paste is never blocked, fields carry `username`, `current-password`,
  `new-password`, and `one-time-code` autocomplete, a split code input accepts
  a pasted whole code, and nothing asks a person to solve or remember a puzzle.
- Every sign-in, recovery, and security email and screen is translated in
  every locale the product ships ([experience.md](../../self-challenge/references/experience.md#international-experience)),
  and emails use the person's chosen locale. Internationalised email addresses
  and right-to-left layouts work.

## Other key flows

- **Onboarding**: the product's value before questions; ask profile details
  when a feature needs them, one question per screen, skippable.
- **Upgrade and checkout**: a paywall or buy button signs in or creates the
  account inline and returns to the same place; the payment runs through the platform billing service
  Money; a guest who pays is asked to protect the account right after.
- **Invitations**: an invite link opens the same flow with the email filled in
  and joins the organisation on success.
- **Email change**: verify the new address, notify the old one with an undo
  link valid for a week.
- **Settings**: one account page holding logins, sessions, connected agents,
  data export, and delete.
- **Deletion**: in the app and at a public web link; recent sign-in; say what
  is deleted and what the law makes us keep; cancel billing first; revoke Sign
  in with Apple tokens; show success only when the server confirms.

## How a product proves it

Each product adds `auth` rows to its `docs/capabilities.md` and passes a
post-deploy check that runs in production against a test account:

- [ ] Sign-in is on the product's domain; no underlying platform string or domain appears
      in the rendered pages, emails, consent screens, or passkey prompt.
- [ ] One "Continue" flow: new email gets a code and an account; returning
      email gets its strongest method.
- [ ] Passkey: create, sign in through autofill, sign in with the button
      (browser virtual authenticator in the end-to-end test), and a deleted
      credential is dropped from the picker by the signal methods.
- [ ] A stolen session cookie replayed from another device is refused where
      the browser binds the session, and the sessions page shows the binding.
- [ ] Apple and Google sign-in where offered; linking follows the rules above.
- [ ] Recovery by email code ends other sessions and notifies every channel.
- [ ] Sign-out is visible and ends the server session; the sessions list can
      end another session.
- [ ] A CLI or agent gets a scoped token by device authorization, and revoking
      it in settings stops it.
- [ ] Guest-first products: a guest binds a login and keeps the same user id.
- [ ] Deletion runs from the app and the web link.
- [ ] An accessibility check passes on the sign-in and code screens in every
      shipped locale.

Outcomes watched afterwards: sign-in success rate and time to sign in,
share of sign-ins by passkey, recovery completion rate, account-takeover
reports, and support tickets about getting in.

The 2026-09-30 sign-in decisions are in the decisions record.

## References

- NIST SP 800-63B-4 (2025): https://pages.nist.gov/800-63-4/sp800-63b.html
- WebAuthn Level 3, W3C Recommendation 2026-08-25: https://www.w3.org/TR/webauthn-3/
- RFC 9700, OAuth 2.0 Security Best Current Practice (2025): https://www.rfc-editor.org/info/rfc9700
- RFC 9728, OAuth 2.0 Protected Resource Metadata (2025): https://www.rfc-editor.org/rfc/rfc9728
- RFC 8707, Resource Indicators for OAuth 2.0 (2019): https://www.rfc-editor.org/rfc/rfc8707
- RFC 9449, OAuth 2.0 Demonstrating Proof of Possession (DPoP) (2023): https://www.rfc-editor.org/rfc/rfc9449
- draft-ietf-oauth-v2-1-16 (2026-09-03, not yet an RFC): https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/16/
- Device Bound Session Credentials, W3C Editor's Draft 2026-09-08: https://w3c.github.io/webappsec-dbsc/
- Google, DBSC generally available on Chrome 146 (2026-04-09): https://blog.google/security/protecting-cookies-with-device-bound-session-credentials/
- RFC 8628, Device Authorization Grant (2019): https://www.rfc-editor.org/rfc/rfc8628
- MCP authorization (2026-07-28): https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization
- Microsoft, Storm-2372 device code phishing (2025): https://www.microsoft.com/en-us/security/blog/2025/02/13/storm-2372-conducts-device-code-phishing-campaign/
- Passkey autofill (checked 2026-10-20): https://web.dev/articles/passkey-form-autofill
- Conditional create (checked 2026-10-20): https://developer.chrome.com/docs/identity/webauthn-conditional-create
- Auth0, hosted vs embedded login (checked 2026-10-20): https://auth0.com/docs/authenticate/login/universal-vs-embedded-login
- Clerk custom flows (Core 3, 2026-03-03): https://clerk.com/changelog/2026-03-03-core-3
- WorkOS AuthKit (checked 2026-10-20): https://workos.com/docs/custom-domains/authkit
- Stytch embedded vs universal (checked 2026-10-20): https://stytch.com/blog/embedded-auth-vs-universal-login/
- Google ID token verification (checked 2026-10-20): https://developers.google.com/identity/gsi/web/guides/verify-google-id-token
- Account linking risks (checked 2026-10-20): https://supertokens.com/docs/thirdpartypasswordless/common-customizations/account-linking/security-considerations
- WCAG 2.2 SC 3.3.8 (2023): https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
- Apple account deletion (5.1.1(v), 2022): https://developer.apple.com/news/?id=12m75xbj
- Google Play account deletion (checked 2026-10-20): https://support.google.com/googleplay/android-developer/answer/13327111

## Detailed sign-in and sign-up flow

One entry, one flow. There is no separate sign-up page: "Continue" works for
new and returning people alike (identifier-first).

1. **First screen**: the product's name, native one-tap buttons (Sign in with
   Apple, Google via FedCM or the native sheet), and one field for email
   (phone where the market expects it) marked
   `autocomplete="username webauthn"`. A passkey request with conditional
   mediation starts on page load, so a saved passkey appears in autofill and
   signs in with one tap. A visible "Sign in with a passkey" button stays for
   browsers without autofill.
2. **After the identifier**, the platform identity service picks the strongest method the
   account has: passkey, then password if the account has one, else an email
   code. An unknown address gets the same code screen, and verifying the code
   creates the account; the screen looks the same either way, so the flow
   does not tell a stranger whether an address is registered.
3. **Email code**: 6 digits, one input with `autocomplete="one-time-code"`,
   paste allowed, 10-minute expiry, 5 tries, bound to the browser that asked.
   The email may carry a link too, but it only completes sign-in in the
   browser that started it, because mail scanners click links and a link
   opened on another device should not sign that device in.
4. **Sign-up asks only for what the first use needs**: a verified identifier.
   Name, avatar, and preferences come later (see Onboarding). Terms and
   consent follow the market's rule ([commercial.md](../../self-challenge/references/commercial.md)).
5. **Offer a passkey** right after the first sign-in that did not use one:
   automatically (WebAuthn conditional create) after a password sign-in, and
   as one clear prompt after a code or social sign-in. The next sign-in is
   then one tap and resists phishing.

Methods, strongest first:

| Method | Default | Notes |
| --- | --- | --- |
| Passkey | on | Synced passkeys count as strong (NIST SP 800-63B-4). Relying party id is the product's registrable domain, chosen once: changing it orphans every passkey. |
| Sign in with Apple / Google | on for consumer products | Look up by the provider's `sub`. Where a third-party login is offered on iOS, a privacy-preserving option such as Sign in with Apple is offered too (App Store 4.8). Each product registers its own provider clients, so consent screens show its name. |
| Email code | on | The universal fallback and recovery channel. Not a second factor (NIST). |
| Password | off for new products | Allowed where a product needs it or already has it: at least 15 characters when it is the only factor, 8 with a second factor, no composition rules, paste and password managers allowed, checked against breached lists, never forced to rotate. |
| Phone code (SMS) | off | Only where a market expects phone sign-in; costs money per message, so it needs a spending decision. |
| Enterprise SSO | B2B products | The identifier's verified domain routes the person to their company's provider (home-realm discovery), which identifier-first makes free. |

Second factor: required for password accounts in products that move money or
grant admin power; a passkey already satisfies it. Accept passkeys and
authenticator apps (TOTP); email is not a second factor.
