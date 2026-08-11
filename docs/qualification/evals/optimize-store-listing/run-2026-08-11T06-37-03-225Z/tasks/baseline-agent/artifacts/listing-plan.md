# Trueform · App Store Listing Plan

| Field | Value |
|---|---|
| Product | Trueform (真式) — verification-fluency arena |
| Package / bundle id | `com.cubeage.trueform` |
| Engine | SylphxAI/keel (exact pin in `KEEL_PIN`) |
| Source revision (this plan grounds on) | `trueform-core` @ `8439d21` (`dist/cloudflare-release-8439d21`) |
| Canonical listing source | `store/listing.json` + `store/privacy_nutrition.json` (trueform-core) |
| Live web (capture source) | `https://trueform-94g.pages.dev` — HTTP 200, `DEPLOY_IDENTITY.json` matches source tip `8439d21` (checked 2026-08-11) |
| Artifact state | Draft plan (no store submission exists; signing + StoreKit/Play Billing adapters residual) |
| Channel | Apple App Store (primary), Google Play (same content, field names differ) |

> This plan is the **content contract** for a listing that has not been submitted. It
> states the title, subtitle, screenshot order, and description claims, and maps every
> claim to shipped product behavior. Nothing here asserts App Store availability,
> ratings, reviews, or downloads.

---

## 1. What the product is (and is not)

**Is:** A local-first verification-fluency arena. You judge whether a machine-verifiable
arithmetic claim is true or false (`3 + 5 = 8`), at speed. Every claim is generated and
verified by a versioned Domain Contract (`arithmetic-v1`); results are replayable
evidence, not cosmetic scores. Four modes: **Sprint** (timed, one miss ends the run),
**Practice** (untimed), **Daily** (same seeded claim set for everyone that civil date),
**Check** (held-out practice on fresh seeds). **Record** shows calibrated mastery from
held-out attempts only. **TF2** share codes replay an exact claim set with an
attested-but-unverified digest.

**Is not:** A brain trainer, IQ test, school curriculum, content arcade, leaderboard
product, multiplayer game, or pay-to-score game. No ads, no tracking, no account, no IAP.
(Sources: `PROJECT.md`, `README.md`, `docs/VERIFIED_FLUENCY_NETWORK.md`, `store/listing.json`.)

---

## 2. Title (App name)

| Locale | Title | Length | Limit |
|---|---|---|---|
| en | **Trueform** | 8 | 30 |
| zh-Hant | **真式** | 2 | 30 |
| zh-Hans | **真式** | 2 | 30 |

- Canonical, exact brand match — same as bundle id `com.cubeage.trueform`, live site, and
  product docs. No competitor marks, no keyword stuffing.
- Experiment variant (only after submission, via Product Page Optimization where
  supported): `Trueform: Judge Math Claims` (en, 27 chars) — keeps brand first, adds a
  plain category word. Keep as variant only; never ship title variants that promise
  "train your brain", "IQ", or curriculum outcomes.

## 3. Subtitle (App Store, max 30 chars)

| Locale | Primary (≤30) | Length | Status |
|---|---|---|---|
| en | **Spot the error. Build fluency.** | 30 | Compliant |
| zh-Hant | **一眼捉錯 · 建立可驗證的流暢判斷** | 17 | Compliant |
| zh-Hans | **一眼纠错 · 建立可验证的判断流畅度** | 18 | Compliant |

- The canonical subtitle in `store/listing.json` ("Spot the error in the claim. Build
  verified fluency.", 52 chars) **exceeds** the App Store 30-char subtitle limit. Use the
  trimmed primary above in the App Store subtitle field; keep the canonical 52-char line
  in the Play short description (80-char limit) and the 40-char tagline
  "Judge the claim. Build verified fluency." in-app / as Play short description variant.
- Subtitle says the mechanism (spot the error) and the outcome (fluency) — both shipped
  behaviors, no unproven outcomes.

## 4. Keywords (App Store, max 100 chars, space-separated)

```
math true false verification fluency logic practice daily challenge formula judgment mastery
```
(92 chars — compliant.)

- All terms describe shipped features/modes. No competitor marks, no brand names of
  other apps, no "free", no ranking words.
- zh keyword sets per locale: 數學 真假 驗證 流暢度 練習 每日挑戰 真式 本地優先 (as in
  `listing.json`; verify per-locale char limits at console time).

## 5. Screenshots — order, content, provenance

All seven shots were captured **live** from `https://trueform-94g.pages.dev` by
`scripts/capture_store_shots.mjs` (markers `storeShotsCaptureV9`,
`storeShotsDesktopLobbyHostV9`, `storeShotsPhoneLandscapeHostV9`,
`storeShotsResultVFN`) using the product host API — not hand-edited, no unreleased UI.
Captions are the canonical ones from `store/listing.json`.

**App Store iPhone order (first two carry conversion — lead with the core loop):**

| # | Asset | Scene | Caption (en) | Why this position |
|---|---|---|---|---|
| 1 | `phone_play.png` | Arena, in-run | "Arena — one claim, True or False" | Core promise in one glance: judge the claim, two pads |
| 2 | `phone_boot.png` | Boot / first screen | "Board-first boot — see it, call it" | What entry looks like; low-friction start |
| 3 | `phone_result.png` | Session result | "Session result — attested attempts and mastery delta" | Trust/evidence moment: results are real, not cosmetic |
| 4 | `phone_landscape.png` | Landscape play | "Landscape short strip still playable" | Form-factor breadth (claim: playable in short landscape strip) |
| 5 | `desktop_lobby.png` | Arena hub | "Arena hub — Sprint, Practice, Daily, Check" | Mode inventory — shows the four modes are real |
| 6 | `desktop_play.png` | Desktop wide stage | "Desktop wide stage with scan board" | Wide-screen polish |
| 7 | `desktop_result.png` | Result over card | "Desktop over card with rematch dock" | Replay loop ("again" is a shipped affordance) |

- `listing.json`'s stored order (boot → play → landscape → lobby → desktop play →
  result → desktop result) is the canonical capture order; the order above is the
  recommended **display** order. Both are truthful to content.
- **Submission constraints:** current phone PNGs are 780×1688 (390×844 @2x). App Store
  requires exact console sizes (e.g. 6.7" 1290×2796). A `produce-product-assets` capture
  pass at exact dimensions, plus iPad variants if iPad support is declared, is **residual
  before submission** — do not upload these PNGs as-is.
- Desktop PNGs are web captures; map them to iPad/desktop slots only where the channel
  accepts them, never as iPhone shots.
- Text overlays, if baked in by asset production, must be exactly the captions above in
  the listing locale; never claim features not in the shot.

## 6. Description claims — every claim mapped to shipped behavior

Base copy: the canonical en description from `store/listing.json` (754 chars; limit
4000). Each claim and its evidence:

| Claim in description | Shipped-behavior evidence |
|---|---|
| "verification-fluency arena. Judge whether a machine-verifiable claim is true or false" | Arena surface; one interaction grammar (judge claim) — `README.md`, `docs/VERIFIED_FLUENCY_NETWORK.md` |
| "`3 + 5 = 8` is a beat you can read and answer in a glance" | Example claim from the arithmetic-v1 domain; claims are the task shown to every participant |
| "Every claim is generated and verified by a versioned Domain Contract, so truth is never a matter of opinion" | Domain Contract `arithmetic-v1` owns truth; generation is candidate supply, only the contract verifier approves — Forge surface, VFN design |
| "Practice untimed" | Practice session kind (untimed, fixed claim count) |
| "timed Sprint where one miss ends the run" | Sprint (timed, fail-on-wrong, purity rule, no shields) |
| "The Daily is the same seeded claim set for everyone on the same day" | Daily = today's seeded Sprint; strict proleptic Gregorian calendar |
| "A TF2 share code replays the exact claim set — your result is attested evidence, never a forged score" | TF2 share artifact: self-reported digest, labelled unverified, no forged opponent score accepted — correctness contract #4 |
| "Record tracks calibrated mastery per skill from held-out attempts only: no streaks, purchases, or cosmetics can raise it" | Mastery authority rule (held-out, difficulty-calibrated attempts only) |
| "Local-first: attempts and history stay on your device" | `privacy_nutrition.json`: gameplay attempts + mastery estimates local only; `local_only: true` |
| "No ads. No tracking. No account required." | `privacy_nutrition.json`: `ads: false`, `tracking: false`, `account_required: false`; no IAP (`iap: []`) |
| "Built on SylphxAI/keel." | `engine: "SylphxAI/keel"` + `KEEL_PIN` exact revision |

**May also truthfully state (optional):** screen-reader activation of the core loop
(Enter/Space judge, semantic DOM, aria-live — commit `49a7cfb` #216); reduced-motion and
untimed presentation exist; results are reproducible via TF2 codes.

**Must NOT claim:** brain-training/IQ effects, curriculum alignment, leaderboards or
multiplayer, cloud sync, cross-device account history, anti-cheat beyond attestation,
any App Store availability/rankings/reviews/downloads, or that a store binary exists
(it does not yet — signing and vendor IAP adapters are residual).

**Privacy/disclosure block for the store page:** no data linked to the user; gameplay
attempts and mastery estimates local-only; no purchases, no ads, no tracking (per
`store/privacy_nutrition.json`); content rating 9+ (teens/adults audience per
`listing.json`); support URL `https://trueform-94g.pages.dev`; privacy policy
`store/PRIVACY_POLICY.md`.

## 7. Localization brief (summary)

- Locales: en (source), zh-Hant, zh-Hans — copy already exists in `listing.json` for all
  three (title, subtitle, description, keywords, whats-new).
- **Flag:** the zh-Hant copy is Hong Kong Cantonese register (e.g. 係 / 唔係). App Store
  `zh-Hant` covers TW/HK/zh-Hant users broadly — run native QA on the zh-Hant set before
  submission and adjust register if targeting TW as well.
- Screenshots must be localized per locale by `produce-product-assets` (never reuse one
  translated set); current shots are en-only. Residual before submission.
- Field length limits (title/subtitle/keywords/description) re-check at console time per
  locale; Apple limits can change.

## 8. Experiment & measurement (post-submission)

- Variant axis: title/subtitle pair (control: Trueform / "Spot the error. Build
  fluency."; variant: "Trueform: Judge Math Claims" / same subtitle) via Product Page
  Optimization where supported.
- Primary metric: install → first judged session (core loop reached). Countermetrics:
  day-1 retention, refunds, support contacts, review sentiment — a higher install rate
  with worse trust metrics is not a win.
- Stop rules: minimum traffic and 95% confidence predeclared before launch; rollback =
  restore control variant. No experiments run before the first submission exists.

## 9. Channel authority & residuals (state honesty)

| Item | State |
|---|---|
| Listing content (title/subtitle/description/keywords/screenshots captions) | Present & grounded in this plan |
| App Store / Play submission | **None** — no console upload, no live store page |
| Signed binaries (iOS/Android) | **Residual** |
| StoreKit / Play Billing adapter link | **Residual** (`iap: []`, but adapter link unproven) |
| Screenshot pixel QA + exact App Store dimensions + localized sets | **Residual** — needs `produce-product-assets` pack revision |
| Device soak on physical hardware | **Residual** |
| Education-category human curriculum sign-off | **Residual** (relevant for Education placement) |
| Live web | Verified: `trueform-94g.pages.dev` HTTP 200, `DEPLOY_IDENTITY.json` = `dist/cloudflare-release-8439d21` (source tip) |

## 10. Sources

- `trueform-core/store/listing.json` — canonical title/subtitle/description/keywords/screenshots/captions
- `trueform-core/store/privacy_nutrition.json` — privacy disclosures
- `trueform-core/store/PRIVACY_POLICY.md` — privacy policy
- `trueform-core/scripts/capture_store_shots.mjs` — live capture pipeline (markers V8/V9)
- `trueform-core/docs/VERIFIED_FLUENCY_NETWORK.md` — product authority (four concepts, three surfaces)
- `trueform-core/README.md`, `PROJECT.md` — player promise, modes, correctness floors
- Live: `https://trueform-94g.pages.dev` + `/DEPLOY_IDENTITY.json` (checked 2026-08-11)

**Next action:** when a store submission is authorized, hand this plan plus the
canonical `listing.json` to `produce-product-assets` for an exact-dimension, localized
screenshot pack; then move to `build-distribution-readiness` for signing, vendor
adapters, console metadata, and upload evidence.
