---
name: build-distribution-readiness
description: "Build distribution readiness: artifacts, install/upgrade, channel state."
---

# Build Distribution Readiness

Turn an exact product artifact into one audience-selected, channel-specific,
support-ready distribution contract. Architecture readiness, local build,
upload, processing, external review, publication, indexing, and installation
are distinct states.


## When to use
- An exact product artifact needs channel-specific distribution readiness: packages, install/upgrade, certification
- Release communication variants bind to exact shipped identity
- Not for making the artifact (`build-product`) or listing conversion (`optimize-store-listing`)

## Resource routing

- Read `references/distribution-channel-matrix.md` only when a mobile app store,
  alternative app store, web/PWA, Microsoft Store, Steam/PC storefront, or
  console route is selected. It owns those store/channel states, commerce
  evidence, and live-release floor; do not load its store transitions for a
  CLI-only or package-registry task.
- Read `references/cli-and-package-distribution.md` for command-line target
  artifacts, direct downloads, shell and PowerShell installers, npm/npx,
  Homebrew, WinGet, Cargo, OCI, update ownership, and clean-install evidence.
- Read `references/desktop-and-pc-release-readiness.md` when macOS, Windows,
  Microsoft Store, Steam, or another GUI desktop or PC storefront is selected.
- Read `references/release-communication.md` when the exact release requires a
  public changelog, update note, migration notice, patch note, support brief, or
  incident follow-up.

Load only the selected product-format, channel, and communication modules.
Current official channel requirements remain execution-time authority.

## Workflow

1. Consume an immutable owner-approved product and release target. Identify the
   audience and invocation journeys, product format, territories, selected
   channels, exact source revision, version, target artifacts and digests,
   build inputs, signing/provenance, support floor, and external authority.
2. Retrieve current official requirements only for those product formats,
   channels, territories, and release actions.
3. Build a channel capability and evidence matrix: target compatibility,
   package/signing/certification, adapter-to-artifact mapping, metadata/assets
   where applicable, privacy/permissions, commerce, install/update/uninstall,
   testing, review or indexing, rollout, halt/recovery, support, and live probes.
   Mark required channel-by-target rows explicitly; an untested row is unknown,
   not inherited from another OS, architecture, libc, runtime, or channel.
4. Require and verify one immutable target-artifact set from the product's
   delivery owner. Every selected package-manager entry, registry wrapper,
   installer, container, or store package references or contains that exact set;
   preserve the relationship when a channel requires repackaging. An explicitly
   selected source-build channel instead binds the exact source revision and
   controlled build inputs and produces its own attested artifact identity.
5. Model every supported channel as an explicit state machine with durable
   receipts and consumer-side readback. Portal-only and partner decisions stay
   typed external gates rather than invisible checklist items.
6. Verify only OS/runtime integrations required by the declared product and
   channel behavior. Route unresolved product design back to its owner.
7. Produce blockers by exact dependency, failed proof, external authority
   pending, or policy floor; assign the next machine action.
8. When release communication is selected, bind every variant to the exact
   shipped identity, audience, user impact, compatibility/support action,
   locale, destination, publication identity, and correction path.

Select the smallest complete channel set from actual user journeys. A
required ecosystem channel stays in the set when users need that path.

## Composition contract

Consume the exact owner-approved product/release target and only the commerce,
privacy, localization, listing, Product Asset, developer-experience, and other
upstream artifacts the selected product and channels need. A free, direct, CLI,
or registry release uses the dependencies that release actually has.

The active product repository and delivery profile own source, build, artifact,
publish, rollout, rollback, credentials, and channel-adapter mutations.
`../drive-to-delivery/references/delivery-standard/` owns the
source-to-landed-to-published ladder. This Skill owns the distribution
contract, channel selection, adapter-to-artifact requirements, and install
lifecycle. `../review-domain/references/developer-product-experience/` owns
the developer adoption journey. Bind to a named observed-state revision when
a later product-program index exists.

External partner access, contracts, review, certification, protected signing,
law, safety, and physical hardware remain authority gates. Prepare and verify
what the selected release requires.

## Path

- A channel is ready when current authority, exact artifact, signing or
  provenance, required hardware or certification, publication state, and
  consumer-side evidence are present.
- One immutable target-artifact set. Adapters reference that set. A
  source-build channel binds revision and inputs and claims its own attested
  identity. Signing keys stay protected. Downloads run after verification.
- Volatile API versions, quotas, fees, review times, locale lists, and
  certification details come from current official sources at use.
- Local package, workflow success, upload, review submission, approval,
  registry publish request, and generated adapter stay at their named state.
  Live release is consumer-side readback.
- Each channel has an audience, owner, automated update path,
  clean-environment verification, and support commitment.
- Paid products match price, renewal, cancel, restore, refund or support,
  ledger, and entitlement across product, channel, reviewer evidence, and
  support.
- Broad rollout starts when failure signals and the halt, withdrawal,
  rollback, repair, or forward-fix path are readable.
- Product assets, positioning, and redesign stay with their owners. This
  skill records the handoff.


## Progressive disclosure

- [references/cli-and-package-distribution.md](references/cli-and-package-distribution.md) — open when needed for depth
- [references/desktop-and-pc-release-readiness.md](references/desktop-and-pc-release-readiness.md) — open when needed for depth
- [references/distribution-channel-matrix.md](references/distribution-channel-matrix.md) — open when needed for depth
- [references/release-communication.md](references/release-communication.md) — open when needed for depth

## Output contract

Produce one **Software Distribution Contract**:

1. product, audience and invocation journeys, exact release identity,
   artifact/provenance map, compatibility floor, and selected channels with
   reasons;
2. per-channel adapter, authority, package/signing, install/update/uninstall,
   metadata/assets/privacy/commerce where applicable, testing, review/indexing,
   rollout/recovery, and support matrix;
3. OS/runtime integration evidence and unresolved design handoffs;
4. exact submission, publication, certification, registry, rollout, and
   consumer installation states with receipts and next transitions;
5. release communication pack when selected;
6. blockers classified as exact dependency, failed proof, external pending, or
   policy floor, with owner, recovery, evidence, and next machine action.

The pack is complete only when every required target row for each selected
channel meets its declared acceptance predicate and strongest claimed state is
independently observable. Mutable external observations record when they were
read, their freshness boundary, and the event that requires revalidation; a
stale observation retracts the stronger claim to unknown. The pack does not
imply undeclared channels or the whole product launch are complete.

