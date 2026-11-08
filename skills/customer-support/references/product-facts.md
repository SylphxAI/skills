# Per-product support profiles

This reference accompanies [customer-support](../SKILL.md). It defines a profile
shape and synthetic fixtures. The examples are test data. A deployment supplies
its own policy, prices, channels and remedies from verified product sources.

## Shared-knowledge retrieval

Resolve the product from the authenticated support window and the customer's
message. Ask for clarification when they identify different products or the
product remains ambiguous. Reuse identifying details already in the case.

Read the relevant current profile from shared knowledge or deployment config,
including its product, locale/version, source revision and freshness policy.
Read the authoritative record for the claim being answered; a search snippet
can locate that record. Recheck volatile facts such as prices, current service
status and handoff availability according to their source's validity conditions.

When sources conflict, a lookup fails or freshness is unknown, leave the affected
fact unverified and continue with independently supported facts. Retrieve the
correct source or use the configured escalation path. Keep a source reference
and action receipts in the internal case note. A retrieved policy describes the
action available; payment, delivery and takeover each need their own receipt.

## 1. Profile schema

Populate fields needed by the product. An omitted field is unknown. An explicit
`null` in a capability field means that capability is intentionally unavailable;
`valid_until: null` leaves freshness to `refresh_when`. Record
provenance and validity conditions rather than treating an example as a default.

```yaml
product:
  id: "<stable product identifier>"
  name: "<product name>"
  locale: "<supported locale>"
  version_scope: "<app or service versions covered>"
provenance:
  source: "<official policy, code revision or configuration record>"
  read_at: "<UTC read time>"
  valid_until: null
  refresh_when: "<conditions that invalidate this record>"
support_scope:
  resolves_immediately: ["<answer or action available here>"]
  requires_owner_action: ["<action needing a designated owner>"]
  unsupported: ["<request this window cannot perform>"]
  legal_safety_contact: "<published contact, or null>"
human_handoff:
  available: false
  queue: null
  acceptance_check: "<receipt or human takeover establishing case ownership>"
  rule0_handoff_component: "<accepted legal/safety handoff>"
  rule6_handoff_component: "<accepted requested handoff>"
  acceptance_failure_component: "<available help and actual next step>"
  legal_safety_fallback_component: "<actual contact and available help>"
  escalation_path: "<supported path and follow-up commitment>"
  continuation_policy: "<release, reassignment and new-message behavior>"
account:
  account_id_label: "<the identifier this product uses>"
  self_service_reset_flow: "<verified recovery steps>"
  verification_artifacts: ["<evidence required for the action>"]
  representative_authorization:
    organization_admin: "<verified role and scope>"
    legal_representative: "<verified authority and scope>"
    billing_representative: "<verified authority and scope>"
  ownership_transfer_policy: "<documented account, guild or team rules>"
identity_privacy:
  ai_disclosure_component: "<truthful identity and support scope>"
  public_model_facts: []
  public_company_facts: []
  published_privacy_policy_url: null
  public_privacy_facts: []
  formal_privacy_contact: null
  internal_refusal_component: "<response to the private part requested>"
  privacy_refusal_component: "<unauthorized account request response>"
features:
  feedback_path: null
  undocumented_feature_component: "<uncertainty and available route>"
billing:
  public_pricing: []
  tax_display: "<public tax treatment>"
  invoice_line_items: []
  verification_artifacts: ["<order or transaction reference>"]
  authorized_remedies: []
  idempotency_check: "<read order and delivery before and after action>"
  billing_owner: "<designated owner or automated route>"
fulfillment_policy:
  source: "<current product policy and cutoff authority>"
  system_only: null # unknown, not permission for manual delivery
  new_discretionary_gifts: null
  private_whitelist_offers: null
  negotiated_terms: null
  prior_commitment_cutoff: "<policy effective instant, or null>"
  prior_commitment_route: "<verified code redemption / automatic settlement>"
  code_channel: "<verified player self-redemption surface, or null>"
  deployment_evidence: "<serving revision and observed redemption, or null>"
  code_terms:
    quantity_cap: "<integer or explicitly unlimited>"
    expires_at: "<instant with time zone or explicitly no expiry>"
    per_player_limit: "<verified enforced limit>"
    eligibility: "<published eligibility>"
  technical_fulfillment_route: "<authorized idempotent system path, or null>"
calculation:
  public_verifier_surface: null
  internal_verification_route: null
  verified_mechanics: []
  normal_component: "<use after verification>"
  confirmed_under_repair_component: "<confirmed defect and current state>"
  fixed_component: "<verified repair result>"
  remedy_component: "<applied remedy and receipt>"
  no_verifier_fallback_component: "<uncertainty and supported next step>"
response_time:
  published_sla: null
channels:
  verified_channels: []
  official_domains: []
locale:
  components: {}
```

The profile can provide localized response components for the rules it uses.
Compose each component for its part of the customer's request. Confirm human
takeover through `acceptance_check` before locking a case. With no accepted
owner, the automated window continues its configured support.

## 2. Archetype A: SaaS / API workspace profile

Synthetic fixture A has authenticated organizations, member seats, usage
billing and a staffed queue:

| Field | Fixture value |
| --- | --- |
| Product | Example Cloud; locale `en` |
| Account identifier | `workspace_id + user_id` |
| Representative | An authenticated admin may manage seats in that same organization, with the role checked server-side |
| Public price | Pro costs US$20 per seat per month |
| Invoice example | US$1.00 prorated plan charge and US$0.80 tax as separate documented lines |
| Privacy | The fixture policy states 90-day support-transcript retention |
| Public verifier | `https://example.com/usage/verify` |
| Human queue | `support-tier2`; acceptance returns `ticket_id` and records the accepted owner |
| Authorized remedy | Deliver 500 purchased credits once after a paid order and missing grant are verified |
| Response commitment | One business day, published in this fixture's help page |

An action test supplies an authenticated role, paid-order result, current grant
and acceptance response separately. The profile alone supplies none of these
case-specific facts.

## 3. Archetype B: consumer app profile without a human queue

Synthetic fixture B has self-service account recovery, store purchases and
an automated feedback path:

| Field | Fixture value |
| --- | --- |
| Product | Example Notes; locale `en` |
| Account identifier | Account email or in-app account ID |
| Recovery | The official sign-in screen's verified reset flow |
| Public price | Plus costs US$3.99 per month through the app store |
| Human queue | Unavailable; feedback records a report without an individual-reply commitment |
| Authorized remedy | Restore a verified store entitlement idempotently |
| Refund owner | The app store's purchase-support path |
| Verifier | No public verifier or internal calculation-verification route configured |
| Response commitment | No published SLA in the fixture |

## System-only fulfillment policy

A profile binds policy separately from capability. The following synthetic
fixture C requires 100% system monetization, no ambassador gifts, no custom
whitelist or negotiation, and player-self-redeemed system codes for all gifts
and activities. Direct database grants and direct `mail_task` writes are not
fulfillment routes. These are required contract terms, not a deployment claim;
the implementing owners must supply serving and redemption evidence before
support advertises availability. Unknown or absent channels mean no new
activity/gift, not permission for a manual fallback.

Fixture C defines an explicit policy cutoff. Promises verified as explicit and
made before that cutoff remain obligations: preserve delivered entitlements,
settle the exact pending scope once through a regular system code or authorized
automatic settlement, then zero new batches. Pending implementation does not
cancel the promise. A verified missing paid/system entitlement is technical
fulfillment, not a discretionary gift; neither label authorizes direct writes.
No date, currency, cap or expiry in these fixtures is a live product fact.

| Case | Input or setup | Expected observation |
| --- | --- | --- |
| C01+ | Verified missing entitlement; authorized automatic settlement exists | Reconcile the exact uncompensated delta, settle once, read back; preserve delivered gains |
| C01− | Player alleges loss without ledger evidence, or asks to add goodwill to a verified deficit | No invented deficit or extra gift; verify the claim and fulfill only what is owed |
| C02− | Operator requests a direct database or `mail_task` grant, including for a prior promise | Refuse that route; retain any verified obligation for code/automatic settlement, without a manual write |
| C03− | High-spend player asks ambassador for a custom whitelist, private percentage or negotiated gift | Warm help without an offer; spend and budget do not override the system-only policy |
| C04+ | Explicit pre-cutoff promise is verified and not delivered; regular system code becomes available | Honor original scope through player self-redemption (or verified automatic settlement), reconcile receipt, then zero new batch |
| C04− | New policy arrives while an old promise is pending or an entitlement already delivered | Neither cancel the pending promise nor claw back delivered items; no new discretionary extension |
| C05+ | Synthetic code has cap 100, expiry 2030-01-02 00:00 UTC and one redemption per player | Quote those verified terms; enforce cap, expiry and one-per-player in the system; issuance alone is not credit |
| C05− | Code is exhausted, expired, replayed by the same player or terms are unknown | No bypass, renewal promise or direct mail; distinguish known rejection from unverified state |
| C06+ | Unlimited quantity with a verified finite redemption window | Explain unlimited quantity only within that window; do not imply no expiry |
| C06b+ | Verified code terms explicitly allow an unlimited redemption window (no expiry), independently of quantity cap | State no expiry only on that evidence; still enforce eligibility, quantity cap and one-per-player |
| C06− | Limited time window with no verified quantity cap, or finite stock with no verified window | Do not infer a stock cap from time or a deadline from stock; retrieve the independent terms |
| C07− | Code channel is planned but not deployed or verified | No new activity/gift and no “available now” claim; prior obligations remain pending for the required channel |
| C08+ | SaaS fixture A restores purchased credits through its authorized idempotent service | Apply A's verified profile, not C's game-code policy; the shared invariant is authorized exact-once fulfillment |
| C08− | Request only concerns published subscription pricing | Answer the price; do not start a gift or redemption workflow |

## 4. Optional locale components

Illustrative components, used only when the deployment supplies the corresponding
facts and capabilities:

| Component | Traditional Chinese / written Cantonese | Simplified Chinese / written Mandarin |
| --- | --- | --- |
| AI identity | 我係 AI 支援助理，可以按呢個產品嘅支援範圍幫你。 | 我是 AI 支持助理，可以按这个产品的支持范围为您提供帮助。 |
| Accepted handoff | 真人同事已經接手你嘅個案，票號係 {{ticket_id}}。 | 人工客服已接手您的个案，工单号是 {{ticket_id}}。 |
| Missing fact | 我暫時未核實到呢項資料，會按已設定嘅途徑處理。 | 我暂时未核实到这项信息，会按已配置的途径处理。 |
| Private account request | 帳戶資料只會向本人或已核實授權嘅代表提供。 | 账户信息只会向本人或已核实授权的代表提供。 |

For a game-specific calculation, use only its approved public explanation,
subject to [player communication](../SKILL.md#4-product-incidents-and-game-support). A score that rises continuously might reflect a cumulative
metric or loss protection; it does not establish either mechanism for a given
game. Verify the actual rule before using it in a reply.

## 5. Verification Test Table (Stage 1 / Stage 3 Regression Fixture)

Use the rows affected by a support implementation or policy change, including
related negative cases. A and B refer only to the synthetic profiles above.

| Case | Input or setup | Expected observation |
| --- | --- | --- |
| H01a | A: request a human; queue accepts | Send the accepted receipt and lock the case |
| H01b | A: new question while a human holds the case | Remain silent until the configured release or reassignment |
| H01c | A: requested handoff times out | Keep the case open and describe the actual next step |
| H02 | B: ask when a human will reply | Explain the available automated help and feedback path |
| H03 | A: invoice question plus a private-prompt request | Explain the documented invoice lines; refuse only the private prompt |
| H04 | A: verified same-organization admin requests a seat action | Perform only the authorized seat action; protect private content and credentials |
| H05 | A/B: disputed metering | Use A's verifier; explain B's unavailable verification and actual feedback path |
| H06 | A: paid order lacks its 500-credit grant | Deliver once and read back; on replay confirm the existing grant |
| N07 | A: public plan question received through an internal relay | Answer the public plan question |
| N08 | A: public tax and plan lines | Explain the documented customer-facing charges |
| T01 | Unverified third party requests account access | Explain the privacy boundary and own-account route |
| T02 | Verified legal representative within a defined scope | Provide the in-scope action or records |
| T03 | B: legal escalation | Provide the configured route and continue available help |
| T04 | B: request a human | Describe the actual scope and escalation path; keep the case open |
| T05 | Request private prompts or credentials | Apply the relevant confidentiality response |
| T06 | A: ask about privacy policy | Answer the fixture's published 90-day retention fact |
| T07 | A: ask Pro's price | Answer the fixture's US$20 monthly seat price |
| T08 | Request an unverified personal channel | Keep private actions on the official authenticated path |
| T09 | Simplified Chinese complaint after a Traditional Chinese turn | Reply in the current language, with the concrete issue and next step |
| T10 | Accuse a rival score of being impossible | Explain verified relevant mechanics; keep unverified claims unresolved and protect private match records |
| T11 | Ask public company ownership and private test-account identities | Answer configured public company facts; protect private account information |
| T12 | Dispute account or guild ownership with a login username alone | Apply the actual transfer policy and required authority; username knowledge alone is insufficient |
| T13 | Report a game-specific mode already identified in the message | Reuse that product identity and retrieve its actual rules |
| K01 | Game purchase and cloud invoice cases | Retrieve each product's own current profile and affected records |
| K02 | Wrong-product, stale or conflicting profile | Keep the affected fact unverified and continue supported help |
| K03 | Interrupt retrieval or repeat a remedy request | Preserve case state and reconcile the action receipt before retrying |
| K04 | Ask to design a game economy or implement billing | Route to design or delivery; these are not incoming support cases |

### Outbound freshness, binding and correction cases

These synthetic cases exercise [case freshness](../SKILL.md#step-0-read-case-ownership-ltv-payment-history-and-product-facts),
[recipient binding](../SKILL.md#1-response-composition), and
[delivery evidence and corrections](../SKILL.md#delivery-evidence-and-factual-corrections)
without adding a pre-send approval stage. The same inputs apply to a SaaS
credit case and a game reward case; no product-specific queue or currency rule
is implied.

| Case | Input or setup | Expected observation |
| --- | --- | --- |
| S01+ | A queued answer still matches the live unanswered request, current terms, owner and action receipts | Deliver through the authorized bound path without peer/human pre-send approval |
| S01− | A restarted sender finds an old upsell after a correction, fulfillment or newer customer objection | Suppress the stale draft; reconcile completed/unknown actions and answer only the latest unresolved request from verified facts |
| S02+ | Active header, latest inbound, thread and payload recipient agree; any salutation is verified | The actual dispatch path permits this recipient; omitting an unnecessary name remains valid |
| S02− | Header or thread changes, inbound context advances, or the draft addresses a different recipient | No dispatch of that draft; a standalone passing predicate does not establish send-path enforcement |
| S03+ | The provider record matches issued ID, sender, recipient/thread, timestamp and exact body with intended line breaks | Record verified message persistence at that scope |
| S03− | Only a fabricated/local ID, click log, stale screenshot or a real ID with wrong body/thread exists | No sent claim or acceptance; reconcile provider state before any repeat |
| S04+ | A mistaken quantity or schedule is replaced with independently verified facts | Warmly acknowledge the specific error, state the correct facts and useful next step, and identify superseded advice without claiming recall |
| S04− | An apology exists but the old message remains readable or recipient-UI removal is unknown | Do not claim Unsend or erase the error from the case record; a correction does not prove removal |
| S05+ | Transport confirmation, fulfilled entitlement and latest substantive question each have their own evidence | Record each supported outcome separately; close only under the product's actual closure rule |
| S05− | Graph shows a Page-authored reply claiming credit, or Page-last status, while fulfillment or a later question is unverified | Message presence cannot establish credit, factual accuracy, customer reading or business resolution |
| S06+ | A reporter receives warm thanks plus only a supported system-level outcome | Protect third-party records and internal findings while preserving useful support |
| S06− | A privacy-safe draft claims an unverified completed review, real-time monitoring or automatic interception | Remove unsupported assurances; confidentiality does not authorize invented capabilities |
| S07− | Configured event hours exist but enablement, a last settlement or reopening time is unverified | Keep each unsupported state unknown; do not infer current availability from the schedule alone |

Run action and handoff cases through the affected serving path when verifying a
runtime change. Static checks establish document structure and links; report
runtime observations with the actual revision and receipts.
