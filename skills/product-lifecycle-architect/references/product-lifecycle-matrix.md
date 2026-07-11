# Product Program Composition Matrix

## 1. Canonical artifact owners

| Fact or artifact | Owner |
| --- | --- |
| Product promise, user experience, capability semantics | `app-design-blueprint` or `game-design-blueprint` |
| App availability/presentation or game progression/population exposure | corresponding design blueprint |
| Evergreen game-world fairness | `game-design-blueprint` |
| Cross-domain dependency graph and declared Definition of Done | `product-lifecycle-architect` |
| Market evidence | `market-research-synthesis` |
| Pricing/packaging decision | commercial decision owner and billing SSOT |
| Provider transaction, ledger and settlement integration | `payment-platform-readiness` |
| Refund customer/account consequence and appeal | `refund-and-support-flow-review` |
| Subscription entitlement semantics | `payment-platform-readiness` |
| Analytics event/identity contract | `product-analytics-instrumentation-review` |
| Public review/private feedback loop | `review-solicitation-and-feedback-loop` |
| One promotion, update-reward or cross-promotion campaign | `promotion-campaign-review` |
| Referral qualification, grant, reversal and fraud | `referral-loop-review` |
| Marketing channel, budget and creative control plane | `marketing-automation-blueprint` |
| Listing metadata/creative conversion design | `store-listing-optimization` |
| Channel submission/certification/release evidence | `app-store-distribution-readiness` |
| Localization QA and market expansion | localization specialist |
| Actual source/build/release/runtime truth | Git, CI, artifact registry, store/partner and runtime systems |

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
| Delivery | Which repo/branch/commit/artifact/environment is the candidate, which gates ran, and what live readback proves it? |

Every row receives a complete target or exact hard-floor/non-applicability reason. “Later,” “too expensive,” “no users,” and “uncertain ROI” are invalid states.

## 3. Product Program Manifest record

```text
program_id and product_id:
objective, constraints, ruin boundaries and DoD:
upstream design artifact ID/version/digest:

artifact registry:
| artifact ID | kind | owner skill/system | canonical facts | inputs | outputs | proof | release state |

capability registry:
| capability | owner artifact | construction | proof | exposure/release | scale envelope | migration/recovery |

dependency DAG and critical path:
parallel agent lanes and collision boundaries:
serialized schemas/config/signing/release operations:
handoff acceptance fixtures:
external authority and partner gates:
delivery targets and exact-candidate evidence:
automated maintenance/recovery policies:
blockers and next machine actions:
```

## 4. Handoff protocol

Producer:

1. emits schema-conforming envelope and immutable version/digest;
2. owns only declared canonical facts;
3. labels assumptions and proof state;
4. supplies contract fixtures and acceptance evidence;
5. declares migration/supersession and notification rules.

Consumer:

1. verifies ID/version/digest and compatibility;
2. references rather than copies canonical facts;
3. rejects missing/expired/conflicting inputs with a typed blocker;
4. records consumed version in its own envelope;
5. revalidates when the producer supersedes a material contract.

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
