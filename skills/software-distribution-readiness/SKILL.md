---
name: software-distribution-readiness
description: "Design, prepare, or audit one exact-artifact Software Distribution Contract and Distribution Evidence Pack for command-line tools, apps, games, web, desktop, PC, console, direct downloads, package managers, registries, containers, and stores. Use when an already-designed software product needs channel selection, target packages, signing and provenance, install/update/uninstall behavior, submission or certification, rollout, recovery, publication, or live consumer readback. Do not use for whole-product design, a single library-registry publish with no distribution decision, listing conversion strategy, asset creation, or a cross-domain launch verdict."
---

# Software Distribution Readiness

Turn an exact product artifact into one audience-selected, channel-specific,
support-ready Distribution Evidence Pack. Architecture readiness, local build,
upload, processing, external review, publication, indexing, installation, and
live readback are distinct states.

## Resource routing

- Read `references/distribution-channel-matrix.md` only when a mobile app store,
  alternative app store, web/PWA, Microsoft Store, Steam/PC storefront, or
  console route is selected. It owns those store/channel states, commerce
  evidence, and live-readback floor; do not load its store transitions for a
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
   controlled build inputs, produces its own attested artifact identity, and
   must not claim byte identity.
5. Model every supported channel as an explicit state machine with durable
   receipts and consumer-side readback. Portal-only and partner decisions stay
   typed external gates rather than invisible checklist items.
6. Verify only OS/runtime integrations required by the declared product and
   channel behavior. Route unresolved product design back to its owner.
7. Produce blockers by exact dependency, failed proof, external authority
   pending, or policy floor; assign the next machine action and required live
   readback.
8. When release communication is selected, bind every variant to the exact
   shipped identity, audience, user impact, compatibility/support action,
   locale, destination, publication identity, and correction path.

Select the smallest complete channel set from actual user journeys. Do not
publish everywhere by checklist, and do not omit a required ecosystem merely
because a direct-download fallback is technically possible.

## Composition contract

Consume the exact owner-approved product/release target and only the commerce,
privacy, localization, listing, Product Asset, developer-experience, and other
upstream artifacts required by the selected product and channels. A free,
direct, CLI, or registry release must not fabricate store, commerce, listing,
or media dependencies.

The active product repository and delivery profile own source, build, artifact,
publish, rollout, rollback, credentials, and channel-adapter mutations.
`delivery-standard` owns their generic source-to-landed-to-published proof
ladder. This Skill owns the distribution contract, channel selection,
adapter-to-artifact requirements, install lifecycle requirements, and the
evidence pack that audits observed channel states; it does not become a second
release control plane. `developer-product-experience-review` owns the wider
developer adoption journey. A later product-program observed-state revision may
index this pack but the pack must not consume that later revision or a moving
“latest” alias.

External partner access, contracts, review, certification, protected signing,
law, safety, and physical hardware remain authority gates. Prepare and verify
what the selected release requires; never fabricate approval or require
adapters for channels outside the declared audience.

## When not to use

- Use `product-lifecycle-architect` when the primary artifact is a cross-domain
  product-program graph spanning at least three lifecycle domains.
- Use `delivery-standard` for one language library's ordinary registry publish
  when no channel portfolio, installer, executable lifecycle, submission, or
  certification decision exists.
- Use `developer-product-experience-review` when the independent artifact is
  the full discovery-to-production developer journey.
- Use `store-listing-optimization` for listing positioning, metadata, creative
  order, keywords/tags, asset requirements, and conversion experiments.
- Use app/game design for product semantics and `launch-readiness-review` for an
  independent whole-launch verdict.

## Guardrails

- Do not claim a channel ready without current authority, exact artifact,
  signing/provenance, required hardware or certification, publication state,
  and consumer-side evidence.
- Do not rebuild independently in each adapter, select an unrelated “latest”
  binary, present a source build as byte-identical, expose raw signing keys, or
  execute unverified downloads.
- Do not hardcode volatile API versions, quotas, fees, review times, target or
  locale lists, package-manager acceptance rules, or certification details.
- Do not call a local package, workflow success, upload, review submission,
  approval, registry publish request, or generated adapter a live release.
- Do not add low-value channels without an audience, owner, automated update
  path, clean-environment verification, and support commitment.
- Do not submit paid products without exact price, renewal, cancel, restore,
  refund/support, ledger, and entitlement semantics matched across product,
  channel, reviewer evidence, and support.
- Do not roll out broadly until the selected product's failure signals and
  halt, withdrawal, rollback, repair, or forward-fix path are readable.
- Do not create product assets, choose positioning, or redesign the product to
  make a distribution matrix appear complete; record the owning handoff.

## Output contract

Produce one **Software Distribution Contract and Distribution Evidence Pack**:

1. product, audience and invocation journeys, exact release identity,
   artifact/provenance map, compatibility floor, and selected channels with
   reasons;
2. per-channel adapter, authority, package/signing, install/update/uninstall,
   metadata/assets/privacy/commerce where applicable, testing, review/indexing,
   rollout/recovery, support, and live-readback matrix;
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
