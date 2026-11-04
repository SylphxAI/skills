# Private device previews

Trigger: making an art, text or layout change and checking it in the real client
without publishing content, waiting for a pull request or submitting a store
build. This is a development feedback loop; use [parity.md](parity.md) for
release acceptance.

Prefer a private resource override in the existing application over a new native
build when the requested change is already serialized data. Keep the edit
interface small, the fixture explicit and the final screen observable. Switch to
the native build path when the change crosses the supported data boundary.

## Define the boundary before the first run

Record the executable version and digest, resource catalog and dependent data
bundle digests, target platform, account type and backend destination. A private
resource catalog does not imply a private backend. Use a disposable test account
and the authorized test journey; do not import a real player's preferences or
credentials.

Support only edits whose serialization and runtime behavior can be verified:
known text components, typography, rectangles, offsets or same-dimension texture
replacement, for example. Validate the input object identity and allowed fields,
then reopen the output and compare the requested values. Reject a missing object,
an unsupported field or a fixture mismatch before device access. Code, schemas,
shaders, new asset imports and changed animation topology need their own compiler
or importer path; a data preview does not prove them.

Keep each fixture's executable, catalog and dependent data together. A successful
hash check on the edited bundle cannot establish compatibility with a different
retained data bundle. Start cold sessions from explicit matching inputs and fresh
account state instead of inheriting an undocumented cache.

## Measure the screen, not the serializer

Use separate clocks:

| Measurement | Start | End |
| --- | --- | --- |
| Cold preparation | First lease/install/resource preparation action | First accepted complete target screen |
| Warm edit | Before local edit or serialization | First accepted complete target screen showing the change |
| Diagnostic segment | Named stage boundary | Next named stage boundary |

Keep transfer, restart, native dialogs, onboarding offers and screen inspection
inside the applicable end-to-end clock. Input acquisition and cold preparation
stay outside a warm clock only when reported separately. Record whether timing
fields are cumulative milestones or individual durations before subtracting them.

A file upload, PID, cache digest or captured image is a diagnostic result. Retain
the whole image and read it before accepting the run. Check the expected screen,
requested change, unobstructed controls and absence of blocking overlays. Native
hierarchy or optical character recognition can supplement the image; name what
was actually inspected. Do not claim a visual judgment from image metadata or a
crop that hides the rest of the screen.

❌ **Bad:** "Preview passed in 90 seconds" because serialization and the first
capture finished, although an offer covers the lobby.

✅ **Good:** "The first capture took 90 seconds. The unobstructed edited lobby was
captured at 210 seconds after normal offer dismissal; 210 seconds is the accepted
warm latency."

## Keep device execution exclusive and bounded

Give one controller ownership of one disposable lease and its command queue.
Persist the lease identity, controller start and actual controller deadline,
readiness, pending operation identities and final release result. A provider's
lease expiry and a controller's own time bound may differ; use the actual
controller deadline when deciding whether another command can run.

Before every queue write, check that the controller is live, no terminal record
exists and its actual deadline has not passed. Check again after slow local work
such as serialization. Keep these checks in the command helper, rather than in a
handoff message alone. Reject an ended session before leaving a new request in
its queue.

Persist the request identity before an external write and reconcile its existing
receipt on timeout or interruption, following the
[external-operation method](../SKILL.md#execute-and-verify). Do not create another
upload, restart or lease request while the first result is unknown. If the
controller ends during an operation, preserve that pending identity and fail the
trial explicitly. Continue only through the provider's supported recovery path
or a distinct, deliberately new disposable session.

Handle a recurring native dialog only when its current hierarchy identifies the
exact expected package, message and control. Keep hierarchy, action and complete
post-action frame together; bound repeated handling from the witnessed behavior.
Never use an unconditional coordinate tap as a general loading-screen escape.
State which command modes actually run the handler: restart handling does not
imply that a frame-only command dismisses dialogs.

Stop the controller and read the authoritative lease state after the final trial.
A local process exit or a successful release request alone does not establish
that the managed resource has ended.

## Establish a reproducible result

Run distinct representative edits against the same warm session. Retain each
input/output digest, complete before/after frame, accepted elapsed time and
relevant runtime errors. Verify that dependent resources remain unchanged and
that the client consumed the intended output. Navigate normally to a second
screen to expose a screenshot-only or direct-scene substitution.

Have an independent operator follow the published commands from their stated
prerequisites, with exclusive ownership of their own session. Require a real
edit-to-accepted-screen run; installing dependencies, passing unit tests or
serializing another caption establishes only those narrower results. Preserve
failed handoffs and their cause alongside the successful replacement run.

Report cold and warm results separately, including failures and the tested
platform. An emulator running the real application establishes runtime behavior,
not physical-device graphics, thermal behavior, purchase restore or signed-store
continuity. Keep those checks on the release path.

## Keep the fast path useful

Measure the dominant span before optimizing it. If cold preparation exceeds the
target but warm edits meet it, say so and reuse a supported live session while
actively editing; release it when finished. Do not turn a slow cold start into an
unreported always-on service.

At higher concurrency, keep isolated output directories, leases and command
ownership per operator. Measure shared upload, device and compiler/license
capacity before adding parallel work. Native and serialized-data workflows share
a build seat only when their common lock and license-return behavior have been
verified; a CI-only lock does not coordinate local use.

Replace this method when a supported engine-native preview meets the same
complete-screen, account-isolation and recovery contract at lower total cost.
Keep the product's actual commands, fixtures, measurements and rollout state in
its own repository rather than in this reusable reference.
