# Product Program Composition Matrix

## 1. Canonical artifact owners

| Fact or artifact | Owner |
| --- | --- |
| Product promise, user experience, capability semantics | `app-design-blueprint` or `game-design-blueprint` |
| App availability/presentation or game progression/population exposure | corresponding design blueprint |
| Evergreen game-world fairness | `game-design-blueprint` |
| Cross-domain dependency graph, release targets, stable handoffs and declared Definition of Done | planning revision of `product-lifecycle-architect` |
| Market evidence | `market-research-synthesis` |
| App monetization model and value-exchange semantics | `app-design-blueprint` |
| Subscription/SaaS pricing and packaging decision | `saas-subscription-pricing` |
| Other pricing/packaging decisions | declared commercial decision owner and billing SSOT |
| Provider transaction, ledger and settlement integration | `payment-platform-readiness` |
| Refund customer/account consequence and appeal | `refund-and-support-flow-review` |
| Subscription entitlement semantics | `payment-platform-readiness` |
| Analytics event/identity contract | `product-analytics-instrumentation-review` |
| Platform-specific authentic public review request policy | `review-solicitation-policy` |
| Universal private feedback, review ingestion and product-learning close-loop | `product-feedback-learning-loop` |
| One promotion, update-reward or cross-promotion campaign | `promotion-campaign-review` |
| Referral qualification, grant, reversal and fraud | `referral-loop-review` |
| Marketing channel, budget and creative control plane | `marketing-automation-blueprint` |
| Listing metadata/creative conversion design | `store-listing-optimization` |
| Channel submission/certification/release evidence | `app-store-distribution-readiness` |
| Localized product meaning | corresponding App/Game Design Blueprint |
| Exact localized product capture, media transformation, accessibility, rights/provenance and file QA | `product-asset-production` |
| Campaign creative brief/concept and paid/organic variants | `marketing-automation-blueprint` |
| Listing narrative, asset selection and channel metadata | `store-listing-optimization` |
| SDK semantic ports and product behavior | corresponding App/Game Design Blueprint |
| SDK provider/version/disclosure/replacement and release registry | `product-lifecycle-architect` |
| Actual source/build/release/runtime truth | Owning source, build, artifact, store/partner and runtime systems; an observed-state manifest revision references their evidence |

The program manifest references these artifacts. It never becomes a prose mirror of their live facts.

## 2. Lifecycle completeness sweep

| Domain | Required artifact questions |
| --- | --- |
| Thesis/experience | Which design artifact owns user promise, objects, loops/workflows, capability semantics and ruin boundaries? |
| Research/claims | Which evidence supports category, audience, claims, price and platform choices? What remains hypothesis? |
| Data/identity | What are account, role, device, sync, offline, backup, export/delete, migration and residency authorities? |
| Commerce | Which catalog, provider, ledger, entitlement, refund, tax, fraud and support artifacts own money/access? |
| Engagement | Which notification, reward, referral, review/feedback, update and cross-promotion artifacts are required? |
| Platform | Which semantic core and UI/input/storage/identity/commerce/social/package ports exist? |
| Globalization | Which locale architecture, LQA, cultural, legal, support, store and asset artifacts cover each market? |
| SDKs | Which vendor-neutral adapters, data maps, consents, dormant states, versions, replacement tests and kill switches exist? |
| Distribution | Which exact artifact, signing/provenance, channel, submission, review/certification, rollout and recovery evidence exists? |
| Marketing | Which truth/claims, audience/consent, channel, creative, spend, measurement and reputation artifacts exist? |
| Trust/operations | Which security, privacy, child, moderation, support, observability, backup, incident, shutdown and appeal artifacts exist? |
| Delivery | Which versioned artifact and channel/environment state is observed, which acceptance evidence exists, and what live readback proves it? |

Every row receives a complete target or exact hard-floor/non-applicability reason. “Later,” “too expensive,” “no users,” and “uncertain ROI” are invalid states.

## 3. Product Program Manifest record

```text
program_id, product_id and manifest phase (planning | observed-state):
superseded manifest revision when observed-state:
objective, constraints, ruin boundaries and DoD:
upstream design input reference with artifactId/artifactVersion/artifactRevision/artifactState/fulfillsHandoffId, plus artifactDigest and digestRule only when sealed:

artifact registry:
| artifact ID | kind | owner skill/system | artifactVersion/artifactRevision/artifactState | sealed-input digest reference if applicable | canonical facts | inputs | outputs | proof | release state |

capability registry:
| capability | owner artifact | construction | proof | exposure/release | scale envelope | migration/recovery |

dependency DAG and critical path:
delivery order and collision boundaries:
shared-state and external-authority boundaries:
handoff acceptance fixtures:
external authority and partner gates:
delivery targets and observed acceptance evidence:
automated maintenance/recovery policies:
blockers and next machine actions:
```

## 4. Handoff protocol

Producer:

1. emits a draft or sealed envelope with `artifactVersion`,
   `artifactRevision`, `artifactState`, and stable producer-owned `handoffId`
   values, never a top-level self-digest;
2. owns only declared canonical facts;
3. labels assumptions and proof state;
4. supplies contract fixtures and acceptance evidence;
5. declares migration/supersession and notification rules;
6. emits downstream handoff requirements but never back-references a future consumer.

Consumer:

1. verifies `artifactId`, `artifactVersion`, `artifactRevision`, `artifactState`, `fulfillsHandoffId`, and compatibility; a sealed input reference must also carry a reproducible `artifactDigest` and `digestRule`;
2. references rather than copies canonical facts;
3. rejects missing/expired/conflicting inputs with a typed blocker;
4. records consumed version in its own envelope;
5. revalidates when the producer supersedes a material contract.

The observed-state Product Program Manifest is the only revision that indexes
the complete sibling set. A specialist may consume an immutable planning
revision, and the observed-state revision may later index that specialist's
exact output. Reject any graph in which one revision both consumes and indexes
the same artifact, two artifacts require each other's current revision, or a
consumer resolves a moving alias such as “latest manifest.”

## 5. Collision tests

- app/game claims disagree with marketing creative or store listing;
- price/catalog differs across UI, provider, entitlement, support and campaign;
- refund consequence destroys data promised by design/export policy;
- locale, age, privacy, commerce or social capability differs across channel claims;
- SDK runtime behavior disagrees with consent/store disclosure;
- release artifact differs from tested/attested artifact;
- minimum-version update gate strands offline or old-device users;
- platform capability is marketed before certification/availability;
- campaign deep link targets unavailable, unauthorized, refunded or region-blocked state;
- rollback would erase committed purchases, grants, user work or cross-device consistency.
- one manifest revision back-references a specialist that consumed that same
  revision, or any handoff lacks a stable producer-owned ID.

## 6. Delivery truth ladder

```text
documented intent
-> artifact authored
-> implementation present
-> exact candidate validated
-> artifact signed/attested
-> submitted/external review pending
-> approved/certified
-> released/deployed
-> live readback verified
```

Never collapse these states. A local file, PR, merge, store upload, approval, staged release, and production behavior are distinct evidence.
