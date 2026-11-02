# Android lifecycle failures and shipped-build exposure

Use when an Android launch or relaunch produces an ANR, or when deciding whether
an observed native failure affects a store's published client. Use
[`unblock`](../../unblock/SKILL.md) to restore the failing path and
[`deliver-and-verify`](../../deliver-and-verify/SKILL.md) to ship its repair.

## Bind the failure before choosing a fix

1. Retain the failing job, source commit, dependency pin, APK SHA256, device/API
   level, scenario and complete title-process ANR trace. Read the Java main
   thread and the native app thread together, plus their lifecycle log from the
   same process and time. A blocked Java thread alone does not identify its
   missing acknowledgement.
2. Read the exact dependency version's event dispatch and destruction handshake.
   Check whether destruction was received but ignored, awaited resource release,
   or never reached the callback. Polling after a destruction notification and
   failing to receive that notification are different mechanisms.
3. Check existing fixes and the actual dependency before editing. A title commit
   after an engine repair can still pin a pre-repair engine. For registry
   packages, verify the published archive checksum, inspect its actual source
   and VCS metadata, and check ancestry where available. A dirty VCS marker
   makes direct archive-source inspection important. Tag order alone does not
   establish the first fixed publication.
4. Test the claimed transition negatively: restoring the old dispatch behavior
   should fail the new regression. Label a mutation test as a mutation test,
   not a replay of the old APK. Keep the original failure visible.

### GameActivity destruction

For an `android-activity` host, receiving `MainEvent::Destroy` must lead promptly
to return from `android_main`, not another poll. The native glue can wait for
that return before Java `onDestroy` completes. Releasing a surface or
acknowledging an event is not necessarily the final destruction handshake.
Do not terminate the process to finish an Activity: other Activities or services
may share it.

Read this contract again at the version in use. Primary sources inspected
2026-11-02: [`android-activity` 0.6.1's main-loop contract](https://docs.rs/android-activity/0.6.1/android_activity/#main-loop-thread-entrypoint-android_main-required)
and its [GameActivity native glue](https://docs.rs/crate/android-activity/0.6.1/source/android-games-sdk/game-activity/prefab-src/modules/game-activity/src/game-activity/native_app_glue/android_native_app_glue.c).

Useful adversarial cases are destruction before any surface, during pause,
after surface loss, after an app-requested exit and across repeated Activity
recreation. Exercise both resume/window event orderings. Assert that native
resources are released before acknowledgement and that the replacement can
render. Pure dispatcher tests prove that transition; a native launch or
recreation receipt is a separate integration result.

## Prove which client a store serves

Keep these claims separate: source adoption, built candidate, upload,
review/approval, publication, eligible delivery and observed runtime behavior.
The same package ID can identify both an old engine and a replacement engine.

- Read current production releases through a supported read-only API or
  authenticated Console. Re-read the provider's current method specification;
  an old helper that creates a temporary publishing edit is not read-only and
  can interfere with another edit. Public listing versionName is a useful
  cross-check, not a versionCode or binary binding.
- Bind the published release's versionCode to provider-generated artifact
  metadata and downloaded signed APKs. Verify package, versionCode, launcher,
  signatures/certificate binding, artifact hashes and engine markers. Native
  libraries and serialized engine headers are stronger evidence than the
  current repository's framework version.
- Label the inspected ABI/variant and assets. Listing the full artifact
  population is not inspecting it. A published-state receipt need not prove
  full rollout, every country's eligibility, successful installation or vitals.
- Store source, read times, raw receipts, scope and unknowns with the owning
  product. Preserve evidence outside temporary leases and agent workspaces
  before they expire or are archived; read the retained copy back.

❌ **Bad:** “The current repository uses the fixed engine, so every store user is
fixed.”

✅ **Good:** “The failing APK predates the repair. The new dispatcher rejects the
old behavior. This published build's signed arm64 artifact uses a different
host; the replacement's native recreation and other ABIs remain unverified.”
