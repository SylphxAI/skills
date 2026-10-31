# Product parity and live verification

Trigger: changing a game, app or SaaS journey; rebuilding an existing product;
or publishing assets, content or configuration that change what a person sees
or receives. Apply this method to the affected journey. A remake covers every
original screen and feature.

The result people see and can use decides product quality. Establish it on the
serving build, compare it with a real reference, and turn the acceptance cases
into machine checks. Unit tests, a successful upload and an attractive mockup
each establish only their own result.

## Choose the reference and journey

Name the category leader and explain why it is the relevant benchmark for this
audience and task. Inspect its current product in the same session; record the
URL or app version, UTC read time and captures. Compare the same goal, starting
state, content, locale, input and meaningful end state. A marketing image alone
does not establish an interactive journey. If access is missing, record the
missing fact as OPEN rather than inventing the leader's behavior.

For a remake, capture the shipped original as a second, mandatory reference.
Keep its parity result distinct from the category-leader result: matching an
older original does not establish category leadership. Compare a reconstruction
against an actual capture before judging fidelity. Read the images yourself;
filenames, descriptions, DOM structure and an image-generation prompt cannot
establish what the pixels show. Use recordings and actual playback for motion,
sound and input response.

Exercise the journey at phone, tablet and desktop sizes. Record exact viewport
or device dimensions, orientation, scale, browser/OS and input method; use the
same conditions on both products. For example, 390×844, 834×1194 and 1440×900 CSS
pixels are a starting matrix for a responsive web app, not universal device
requirements. For a genuinely unsupported platform, record that product boundary
and its evidence explicitly. A resized desktop screenshot cannot establish
native touch, keyboard, controller or device behavior.

Compare what matters in use: composition, art and typography, content density,
discoverability, controls, motion and sound, latency, accessibility, feature
depth, failure states and recovery. Read the
[experience standard](../../self-challenge/references/experience.md) for design
criteria and [performance method](performance.md) for journey budgets. A green
HTTP response or an existing button does not establish a usable result.

## Keep a screen-and-feature parity sheet

Inventory every screen and feature in scope, including applicable loading,
empty, denied, error, offline and recovery states. Give each a row and separate
results for each tested size and reference; split rows when one grade would
hide a weaker feature or state. Keep visual quality and functional behavior
visible separately. Each row names its acceptance case, evidence and next action.

| Grade | Meaning |
| --- | --- |
| EQUAL | The observed experience meets the reference on this row, with evidence. |
| BETTER | Evidence shows a specific improvement, with no regression hidden in the row. |
| WORSE | A visible, behavioral or performance regression remains. **Different but plainer is WORSE** when a reconstruction strips the reference's art, hierarchy, motion, sound or useful detail. A new style does not excuse lost quality. |
| OPEN | The verdict lacks a named fact: for example, “offline retry on the shipped tablet build has not been exercised.” Name the missing capture, measurement or behavior and the check that will resolve it. |

Illustrative rows below describe synthetic products, not measured results:

| Screen / feature / state | Reference and size | Acceptance case | Grade and observation | Evidence / next action |
| --- | --- | --- | --- | --- |
| Puzzle board / move feedback | Shipped original, phone | Valid move animates and sounds; invalid move preserves the board | WORSE: rules pass, but the remake shows static tiles and no feedback | Paired recording; restore feedback and capture again |
| Notes / create and reopen | Category leader, tablet | Saved note reopens with the same text after relaunch | EQUAL: both preserve text and offer reachable save status | Paired journey recording and automated persistence assertion |
| Subscription / expired access | Category leader, desktop | Expired entitlement shows its state and a working renewal route | OPEN: server expiry is checked; the expired UI is uncaptured | Capture the owned synthetic account after expiry |

A remake replaces its original only when every original screen and feature is
EQUAL or BETTER: no WORSE row remains, and every OPEN fact is resolved. Show the
owner the sheet and the actual side-by-side captures when reporting replacement.
An average score cannot cancel one regression. This is evidence delivery, not a
new approval ceremony. New products compare their declared value loop with the
leader without importing every unrelated feature into launch scope.

## Capture evidence from the serving revision

Capture live receipts in the **same run** as a version or revision read from the
surface under test. A screenshot taken before the release reached serving never
counts as evidence for that release.

1. Start a uniquely named run directory containing UTC date/time and run ID.
   Record the target URL/environment, expected revision, device matrix, account
   fixture and journey. Keep credentials and personal data out of the record.
2. Read the version from the actual served page, API response or installed
   client. For independently published assets or data, also read the loaded
   manifest/content hashes and server revision that govern the changed behavior.
   Compare these with the candidate. A deployment's desired revision alone does
   not prove that this browser or device received it.
3. Exercise the journey, record assertions and capture screenshots or recordings.
   Read the served revision again at the end. Reject mixed-version evidence;
   wait for the intended release and make a new run. Bound propagation waits
   with the release's declared timeout rather than retrying until green.
4. Open and inspect the resulting images. Compare them side by side with the
   real reference at the same state and size. Record visible defects and keep
   subjective judgments distinct from measured facts.
5. Save a new dated record for every repair or release. Preserve prior captures,
   machine results and hashes; never overwrite old evidence with a new image at
   the same path. Store receipts in the product's authorized evidence location
   and link them from the parity rows.

A useful record binds `run_id`, UTC start/end, expected and observed revisions,
loaded asset/data hashes, reference version, viewport/device, journey/state,
assertion results and capture paths. If revision identity is unavailable, that
fact is OPEN; an unlabeled screenshot cannot establish release acceptance.

Illustrative evidence contrast:

- ❌ **Bad:** “The release is fixed,” with a screenshot captured before the
  release and a later deployment success message.
- ✅ **Good:** One dated run observes the expected served revision, exercises
  the changed journey, saves new paired captures and assertions, and confirms
  that the served revision stayed the same through the run.

## Let machine checks decide publication

Human or agent inspection finds quality gaps and informs acceptance cases. It
cannot replace executable pass/fail checks or authorize a failed release. Define
the expected values, tolerances, timeout and recovery action before publishing;
do not weaken them to fit the candidate. The release automation runs the checks,
decides pass/fail and performs recovery. No hand publication based on someone
looking at screenshots.

### Before publishing assets, tables or configuration

- Enumerate every changed asset and table from the candidate manifest/diff,
  including additions, removals and dependent references. Match the checked set
  to that inventory so one successful sample cannot stand for all changed files.
- Read every changed artifact with an independent reader: the actual shipped
  consumer or a separately implemented decoder/validator. Reusing the writer's
  serialization code or comparing its output with itself is insufficient. Check
  the decoded values against the intended change, including field types, units,
  ranges, relationships, missing fields and intended removals.
- Exercise assets in their consuming renderer: for example, decode a sprite
  atlas, resolve every frame and render the changed states; load a model with
  its materials and animations. Existence, file size and checksums alone cannot
  establish usable content.
- Start the client and, for server-loaded data, a server built/configured from
  those exact candidate files. Load every changed table without error and assert
  its relevant behavior. A schema-only check cannot establish that the shipping
  client or server accepts the file.
- Emit machine-readable results bound to the candidate digest: checked artifact
  IDs, expected/actual values, assertions, failures and tool versions. Missing
  required results fail publication. Preserve the last known good release and
  prove the rollback path in an isolated or synthetic environment.

### After publishing

Run a browser or device check against the serving revision immediately after
publication. Exercise the affected journey, assert its visible state and
actions, and verify the dependent API/server effects. Include visual regression
checks where they distinguish the defect, with recorded reference images and
tolerances. Visual inspection alone cannot pass this check.

Use synthetic accounts owned for testing for server-side verification, never
real users' accounts. Read the authoritative state through the supported API or
scoped test interface and compare **field by field against the intended change**.
Check both the UI and server state when the journey has both. For example, a
changed subscription grant checks plan, features, quota and expiry, plus refusal
after expiry; a success toast proves none of those fields. Keep synthetic
fixtures isolated from real balances, messages, purchases and audience metrics.

For web releases, hot updates and other reversible deployments, arm automatic
rollback before publication. A failed, missing or timed-out required
post-publish check automatically restores the last known good code/assets/config
and verifies that restored revision and journey. The automation records both
failure and recovery. Preserve user data: rollback does not rewind customer
writes or undo a ledger. If recovery fails, report that failure explicitly.
Where a channel cannot retract installed clients, follow its supported stop or
disable mechanism and verify it; do not claim automatic rollback that the channel
cannot perform ([app-store releases](dx.md#app-store-client-releases)).

Illustrative automated cases:

| Change | Independent pre-publish check | Live check and failure action |
| --- | --- | --- |
| Game reward table and icon atlas | Shipping client decodes every changed reward row; a separate atlas reader resolves frames; renderer shows each changed icon | Owned synthetic account sees the offer, receives the exact configured reward and can use it; wrong amount or missing icon restores the prior data/assets automatically |
| App navigation rebuild | Browser assertions cover route, focus, back navigation and layout; captures compare phone/tablet/desktop with the real original | Served revision matches; create/reopen journey succeeds at each size; a broken route restores the prior web release automatically |
| SaaS plan configuration | Independent reader checks every changed plan field and reference; candidate server loads the configuration | Owned synthetic account's UI and server plan, quota, features and expiry match field by field; mismatch restores prior configuration automatically |

## Keep devices and tests dependable

Prepare builds, fixtures, scripts and the capture plan before taking a device
lease. Lease devices only while executing the capture/check and release them in
a `finally` block on success, failure, timeout or cancellation. Close temporary
browser sessions and remove synthetic fixtures through their supported cleanup
path. For abrupt process death, use a bounded lease expiry as well. Do not hold a
device while waiting for a build, merge queue or another writer.

Illustrative pseudocode, independent of any device provider:

```python
lease = acquire_device(expiry=capture_deadline)
try:
    verify_revision_and_capture(lease, candidate, journey)
finally:
    release_device(lease)
```

A flaky test is quarantined, never retried until it happens to pass. Retain its
failure, name the repair and keep its lost coverage visible. If it covered a
required acceptance case, supply a dependable replacement or leave that case
OPEN; quarantine cannot silently turn an unverified release green. Rerun an
affected check after a concrete code, fixture or infrastructure repair, recording
what changed ([CI discipline](dx.md#continuous-integration)).

Keep one writer per change, branch and live publication target. Inspect open
changes before editing; readers can compare independently, and separate changes
can proceed together. A collision is resolved before either writer changes the
other's work. Follow the existing merge/release path.

## Completion receipt

Report the delivered revision, dated live run, machine verdict, parity sheet
and paired captures, plus any unresolved facts and actual recovery result. For
a remake, include the owner-facing side-by-side and establish that all original
rows pass. Synthetic checks establish the tested journeys and account states;
they do not establish real audience enjoyment, retention or willingness to pay.
Product-specific commands, device IDs, benchmarks, account fixtures and current
release state live in the product repository, not this reusable method.
