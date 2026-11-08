# Product parity and live verification

Trigger: changing a game, app or SaaS journey; upgrading engine or SDK dependencies;
rebuilding an existing product;
publishing assets, content or configuration that change what a person sees
or receives; or comparing engine capabilities and performance. Apply this method
to the affected journey or declared benchmark. A remake covers every original
screen and feature.

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

Every sheet carries a row for tap to first usable screen, cold and warm, measured
the same way on both products ([performance.md](performance.md)).

Exercise the journey at phone, tablet and desktop sizes. Record exact viewport
or device dimensions, orientation, scale, browser/OS and input method; use the
same conditions on both products. For example, 390×844, 834×1194 and 1440×900 CSS
pixels are a starting matrix for a responsive web app, not universal device
requirements. For a genuinely unsupported platform, record that product boundary
and its evidence explicitly. A resized desktop screenshot cannot establish
native touch, keyboard, controller or device behavior. A fixed fixture matrix
does not cover every state: reproduce a reported fault at its exact viewport
and state as well as running the standard matrix.

Reconcile runtime captures with offline geometry using the measured content
viewport, origin, effective scale and anchor rules, not nominal device or screenshot
dimensions: an inset can change both origin and available width, so differently
anchored controls need not move equally. Each calibration row needs its actual
measured viewport/aspect profile and model predictions recomputed for that profile
before judging agreement. A static overlap and a successful runtime tap can both
be valid at different profiles; neither refutes the other's profile-specific result
or establishes behavior for every supported profile.

Compare what matters in use: composition, art and typography, content density,
discoverability, controls, motion and sound, latency, accessibility, feature
depth, failure states and recovery. Read the
[experience standard](../../challenge/references/experience.md) for design
criteria and [performance method](performance.md) for journey budgets. A green
HTTP response or an existing button does not establish a usable result.

Before making art or copy for a screen, read one frame from the shipped client in
the state a player reaches. Prefabs, atlases and offline renders show defaults;
the server and runtime decide what is visible. A check that each planned path
exists does not prove the visible set is covered, so list what the frame shows
and map every item to its source. An empty accessibility tree does not establish
a blank page; inspect the actual frame, including canvas-rendered content.

## Distinguish renderer faults from product defects

Graphics state queries, clears and draws can take different validation paths,
especially in virtualized drivers. A valid attachment query or error-free clear
does not establish successful drawing: use a known draw whose expected pixels
differ from the clear colour. **Bad:** nonblack clear pixels prove rendering.
**Good:** the draw changes the expected pixels, and the failing state is retained
as a negative control.

Host-language compilation and software-renderer correctness can pass without
parsing runtime-composed shaders: reserved identifiers or conditionally hidden
helpers may break only one variant. Derive the relevant variant population from
the actual runtime definitions and feature gates; GPU-free composition, parsing
and semantic validation must cover it with the runtime's validator version and
capabilities, recording expected/validated variants and
[named test execution under intended package features](dx.md#continuous-integration).
That check does not establish rendering: separately exercise the shipping
renderer's adapter → pipeline → draw → mapped pixel-buffer path and pair its output
with independent reference pixels, retaining original startup/validation failure
logs and unchanged pixel tolerances.

Rendering APIs can leave sampling or reconstruction implementation-dependent,
so descriptor validation and one exact-pixel fixture do not establish portable
quality. Derive assertions from the documented contract: retain exact references
for deterministic paths, independently computed bounds only for the variable
path, and a quality case that fails without the intended improvement alongside
its unsupported-backend control. **Bad:** require anisotropic sampling to match
isotropic fractional-LOD colours, or widen every pixel tolerance. **Good:** keep
exact isotropic/data results and separately prove detail retention for a grazing
footprint across supported backends
([Vulkan anisotropic filtering](https://docs.vulkan.org/spec/latest/chapters/textures.html#textures-texel-anisotropic-filtering),
read 2026-11-08).

Mechanism references (read 2026-11-06, Naga/wgpu 30.0.1):
[WGSL parsing](https://docs.rs/naga/30.0.1/naga/front/wgsl/fn.parse_str.html),
[semantic validation](https://docs.rs/naga/30.0.1/naga/valid/struct.Validator.html),
and [shader modules and pipelines](https://docs.rs/wgpu/30.0.1/wgpu/struct.Device.html#method.create_shader_module).

Headless browsers and virtualized native hosts may use a software GPU such as
SwiftShader or llvmpipe; corruption or delayed presentation can therefore share
an environment cause across graphics APIs, so switching APIs alone does not
establish a product defect. Record the adapter or renderer, browser/native host,
build and captures; if renderer details are unavailable, say so rather than
inferring hardware acceleration from the API name. Reproducing the same build,
scene and assets on a hardware GPU or physical device helps distinguish product
from environment faults; without that comparison, retain the observed artifact
and mark attribution and physical-device performance OPEN, while reporting
functional acceptance separately within the tested environment and latency bound.

## Continuous aspect ratios and visibility

For immersive scenes, apply the
[visibility and UI proxy principle](../../challenge/references/experience.md#immersive-scenes-and-ui-proxies).
Capture portrait phone, landscape phone, tablet, near-square foldable and desktop
frames, including portrait entry on a real phone. Then resize live between the
sampled ratios while retaining game or app state. Aspect ratio is continuous;
five captures alone do not establish the transitions. Verify that important
entities remain visible in the scene or have readable, tappable UI proxies when
off-screen, occluded or too small. Check proxy appearance and removal around
visibility thresholds for flicker, stale state and duplicate actions. A rotate
prompt, a squashed scene or a fixed-orientation fit does not satisfy the check.

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
new approval ceremony.

Every review round grades the whole sheet again from fresh captures, starting
with the core surface (for a game, the play surface) before polish. Checking only
the previous round's defect list misses what that round never saw, and misses
anything a fix broke. New products compare their declared value loop with the
leader without importing every unrelated feature into launch scope.

## Compare engines on declared equal work

A capability inventory and a benchmark answer different questions. Split compound
capabilities into observable requirements; distinguish documented support, an
isolated implementation and an exercised integrated path. An unmeasured cell is
OPEN, not evidence of absence. Keep product and platform responsibilities outside
the engine's verdict.

1. Keep a primary-source ledger for each engine: exact release/revision, official
   source URL, UTC read time from this session and the claim it supports. Read the
   current version's documentation/code rather than carrying forward an older
   release's limitations. Bind local builds and fixtures to immutable revisions;
   cross-revision comparisons also use [isolated child builds](dx.md#internal-development)
   so a clean checkout cannot stand in for the linked artifact's identity.
   Keep pinned browser/tool binaries in a location owned for the run and verify
   their hashes; an executable borrowed from another checkout can disappear
   before capture even when its version matched during setup.
2. Before running, declare the equal-work set, acceptance predicate, sample count,
   trial order and summary statistic. Match scene/content, resolution, quality,
   lights and shadows, assets, backend, build flags and workload semantics. Record
   compiler, browser/OS, device/CPU/GPU, cache state, network shaping, background
   load, effective process environment and instrumentation. Inherited settings can
   change only one runtime's colors, locale or cache behavior; equal command flags
   need rendered-output evidence, not an assumption of equal work. All-zero
   profiler counters can indicate disabled instrumentation rather than zero work;
   verify effective enablement with a known-positive counter control before
   attributing a hotspot or absence of work. Keep instrumented attribution separate
   from uninstrumented performance verdicts because instrumentation can change the
   measured path. Bind resource
   metrics to the measured process and lifetime: a child high-water mark may
   include its larger pre-exec launcher, so an application-memory claim needs
   post-exec evidence. Name unavoidable differences and the comparison they
   prevent; a software-GPU run does not establish physical-device performance.
   After a declared sampling or color-model change, derive expected pixels from
   that declaration, not captured output; known-answer synthetic inputs and a
   rejected mismatched-model control establish the check's independence without
   relaxing tolerances. Shared assets do not prove shared screen geometry: compare
   actual draw primitives with the independently expected complete population and
   required origins/scales, including a deliberate transform negative control.
   A resolution control needs both the actual backing-buffer size and full-layout
   preservation, checked against the downscaled full frame; a cropped scene is
   not equal work. Validate an absolute cadence threshold with a no-op control in
   the same measurement setup: if a no-rendering run fails the bar, the threshold
   is defective.
3. Counterbalance engine order across trials. Retain every raw sample, failed or
   cancelled attempt, error and confound; report distributions and the exact
   aggregation, not only a favorable median. A defective grading rule does not
   erase its original verdict: retain it verbatim and predeclare an additive
   correction before recomputing against the unchanged data. If an unequal
   setting is discovered, preserve the original set and predeclare an **additive**
   matched-work follow-up
   before mutating fixtures or running it. For example, equalize shadow settings
   explicitly. Never replace the original evidence or select reruns until green.
4. An engine-ready marker plus one immediate screenshot can yield a dark capture
   before visible content; GL submission does not prove paint. Use one observable
   completion predicate and the same bounded observer for every engine, retaining
   negative captures, capture/analysis times and hashes; validate loading, blank
   and wrong-content controls through the real capture path. Attempt the declared
   start population even after a timeout, and grade deadline success separately
   from latency distributions so missing observations are never treated as fast
   starts. Separate engine-ready events, first rendered content and usable input:
   a positive screenshot's completion is a conservative observation upper bound,
   whereas a negative capture's completion is not an onset lower bound because
   acquisition may precede completion. Use capture-start bounds only with
   justified monotonic readiness or validated image-acquisition timestamps, and
   report actual capture/analysis gaps and observer overhead; a polling sleep is
   not the measurement's time resolution.
5. Separate raw export bytes, compressed export bytes, startup response-body bytes
   and actual network transfer. Name the compression settings and request census;
   a server's completed write does not prove client receipt or wire bytes. Retain
   startup phases and cache policy ([performance.md](performance.md)); do not
   silently substitute archive size or engine-ready time for the user journey.
6. Report bounded conclusions with versions, workload, environment, uncertainty
   and unresolved acceptance cases. A serial entity-component-system (ECS) loop
   microbenchmark does not establish scheduler, rendering or whole-engine parity;
   matching checksums alone do not establish correctness. Overlapping trial
   ranges, a few successful samples or one scene do not establish equivalence,
   statistical significance, category leadership or blanket engine parity.

## Capture evidence from the serving revision

Capture live receipts in the **same run** as a version or revision read from the
surface under test. A screenshot taken before the release reached serving never
counts as evidence for that release.

For a server status or error-contract change, include client versions already in
the field using the [deployed-caller compatibility checks](integration.md#shared-dependency-features-and-client-policy);
a journey passing only on the newest client leaves their behavior unverified.

1. Start a uniquely named run directory containing UTC date/time and run ID.
   Record the target URL/environment, expected revision, device matrix, account
   fixture and journey. Keep credentials and personal data out of the record.
2. Read the version from the actual served page, API response or installed
   client. For independently published assets or data, also read the loaded
   manifest/content hashes and server revision that govern the changed behavior.
   Compare these with the candidate. A deployment's desired revision alone does
   not prove that this browser or device received it.
3. Exercise the journey, record assertions and capture screenshots or recordings.
   For timed acceptance, record each capture's actual begin/end on the executing
   device's clock; a filename or requested wait is not timing evidence. Check the
   device shell's integer width and unit range before arithmetic; use bounded
   monotonic deltas, not epoch nanoseconds. For example, frames named
   `t2s`/`t10s`/`t30s` began at +2.071/+5.771/+8.555 s when signed 32-bit shell
   arithmetic wrapped (`2000000000+2000000000=-294967296`,
   `10*1000000000=1410065408`).
   Read the served revision again at the end. Reject mixed-version evidence;
   wait for the intended release and make a new run. Bound propagation waits
   with the release's declared timeout rather than retrying until green.
4. Open and inspect the resulting images. Compare them side by side with the
   real reference at the same state and size. Record visible defects and keep
   subjective judgments distinct from measured facts. Full-page captures can
   misdraw sticky or fixed bars; check a viewport capture at the same scroll
   position and state before calling it a layout defect.
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

For a **frozen web run**, bind the browser to the bytes it actually received:

- Locally, serve an immutable build rather than a changing development server.
  Record its source revision and clean source status before and after the run,
  plus the running server's build identity at both ends. A checkout's `HEAD`
  alone does not identify an already running process.
- Hash the JavaScript and CSS response bodies loaded by the browser, including
  lazy-loaded files reached by the journey. Compare them with the immutable
  build and fresh end-of-run GET responses. A filename or a later fetch alone
  does not establish which bytes the browser used.
- On a public content delivery network without revision headers, retain start
  and end document response headers and the browser-loaded asset bodies/hashes.
  Compare those bytes with the intended immutable release; headers alone do
  not identify a revision. Leave release identity OPEN if that binding is absent.

Keep local fixture, public web, installed-client and authoritative server
results separate. Frozen local captures establish the tested local behavior,
not public propagation, installed behavior or real authentication/server effects.

## Let machine checks decide publication

Human or agent inspection finds quality gaps and informs acceptance cases. It
cannot replace executable pass/fail checks or authorize a failed release. Define
the expected values, tolerances, timeout and recovery action before publishing;
do not weaken them to fit the candidate. The release automation runs the checks,
decides pass/fail and performs recovery. No hand publication based on someone
looking at screenshots.

### UI coverage, geometry and painted output

Declare the expected case count and each fixture's target identities/counts
independently of the selector results. A nonempty-state case fails on missing
configuration, empty matches, wrong counts or duplicate/unexpected targets.
Record expected, discovered and checked counts, and cover every rendered row in
scope. Exact named-label assertions complement that census; a passing loop over
`[]` proves nothing. An intentionally empty state needs its own acceptance case.

Measure the defect's actual geometry. Use rendered glyph ranges
(`Range.getClientRects()` for DOM text) for the whole composite value (prefix,
number and suffix), not its allocated container width. Single-line values must
share one line band at the required readable font size across the complete
expected population; card containment alone misses wrapped prefixes. Check
required neighbour clearance in the same coordinate space; an 8 CSS px gap is
contextual, not a universal minimum. Do not shrink the font
to hide a spacing failure. For composite controls, check joints and endpoints in
a shared coordinate system as well as each part's size; correct dimensions can
still be anchored wrongly. Derive paint probes from the actual geometry and
rasterization: a fixed inset can sample an antialiased curve instead of the
intended junction. A corrected probe must retain the original failure and reject
both the known defective frame and an independent missing-segment control with
unchanged paint tolerances, then accept the repair under the same conditions.

Also reject a deliberate half-width regression. Sticky headers and ordinary cells
can have different offset parents: measure reachability with viewport rectangles,
the current scroll offset and pinned-column width, never `offsetLeft`.

A text-hidden control comparison limited to self-reported glyph, mesh or layout
bounds cannot detect paint outside those bounds. Account for every changed pixel
in the full frame, assigning each to disjoint real visual regions (the label's
plate or header and its neighbours); reject unassigned paint before checking each
region's bounds and clearance. **Bad:** accept a "safe" mesh while ignoring
changed pixels outside it. **Good:** overflowing paint fails despite safe mesh
bounds; contained paint passes only with the required neighbour clearance.

Project world points into capture-derived boxes using the same temporary aspect
ratio and projection as rendering and pixel capture; restore the camera on both
success and rejection. Prove the check fails if aspect correction is removed.

Positive hit geometry and handler ownership can still describe an unintended
or nonfunctional control. Compare the complete candidate control inventory and
activation states against a verified serving baseline: additions, including dormant
controls that runtime code can activate, and inactive-to-active transitions need
evidence of intent bound to exact identity and meaningful state. Intent approval
never waives geometry, paint or runtime-action checks; unchanged-baseline
self-comparison needs no new approval.

An offline engine adapter can pass isolated checks while inventing symmetry or
losing state between phases: derive each axis's contract and phase order from
the pinned upstream source, not from the other axis. Compare a chained case
where one phase changes the next phase's input against independent upstream
results, alongside empty-input and unchanged fixed-constraint controls; isolated
axis results do not establish composed behavior. A matching fixed-constraint
baseline remains valid, but does not establish flexible or content-dependent
behavior.

Treat target size, hit testing and visible paint as separate assertions:

- A control can submit the right values and expose an accessibility label while
  rendering no visible label. Assert its displayed content as well as its
  accessible name and action, and inspect the captured frame before presenting
  it as visual proof.
- For runtime-activated controls that are serialized inactive, evaluate each
  target with sibling menus still inactive. Resolve its runtime layout and
  nearest click-handler ancestor, then require the primary visible artwork
  centre to dispatch to a handler in that target's own subtree; a positive
  raycast area at a corner is not enough. Calibrate each semantic assumption
  against mapped device taps before making the checker blocking; serialized
  defaults alone do not establish runtime reachability.
- A valid DOM rectangle, nonempty SVG `getBBox()` and successful hit test can
  all pass while an ancestor's `opacity: 0` makes the control invisible. Check
  the control's effective opacity through every ancestor, visibility, clipping
  and occlusion as well as the required hit area and action.
- Glyph presence does not prove readability. Assert the target label's
  visible rect and rendered glyph height against the required minimum at each
  captured size; an undersized badge can paint every glyph and still be
  unreadable. When checking clipping, count only enabled clipping components
  (mask, scissor, `RectMask2D`, `overflow`, viewport) in the target's actual
  ancestor chain, intersect the target bounds with each, and record their
  names and bounds; a disabled or sibling mask clips nothing, and counting it
  rejects a correct layout. Run each assertion against the defective frames
  first, then confirm the repaired frame by eye.
- Check the actual icon's painted fill/stroke, alpha and contrast against its
  background, not only the SVG box or parent colour. Read the captured pixels
  yourself as well as running the assertions; geometry cannot prove visible ink.
- Exercise reduced motion both at mount and when the preference changes from
  false to true after initial render or hydration. If an entrance starts hidden
  or offset, explicitly settle its final state (for example `opacity: 1`,
  `y: 0`, `scale: 1` for properties it animates) with zero duration and no delay.
  Dropping `animate` can strand the previous hidden initial state. Sweep shared
  entrances for the same pattern and verify every affected control's paint.

Mechanism references (read 2026-11-03):
[text range bounds](https://developer.mozilla.org/en-US/docs/Web/API/Range/getClientRects),
[opacity and descendants](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity),
[`getBBox()` before rendering](https://developer.mozilla.org/en-US/docs/Web/API/SVGGraphicsElement/getBBox),
and [the reduced-motion preference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

Preserve failed captures and raw assertion output. Missing test configuration
is a verification coverage error, not evidence of a product layout failure or
success. After repairing the test, make a new run and retain the earlier result.
An unexpected golden-image mismatch that repeats at later frames establishes
stability, not that it is pre-existing or unrelated. Keep the committed baseline
and strict tolerance until a same-source/environment comparison or other
disconfirming check establishes the cause; adopt only explained, intended changes.

### Verify engine and SDK changes in the shipping host

For an in-place update or engine replacement, compare the signed package with
both current production and the oldest supported client, then upgrade synthetic
existing guests without clearing app data. Prove the same UI account and owned
value after a cold start; compatibility symbols alone cannot establish this.
A Unity guest may depend on PlayerPrefs (Android SharedPreferences or iOS
NSUserDefaults): source key names from the product contract and retain only
value hashes when a supported private-storage reader exists. Missing preference
inventory is a separate diagnostic INCOMPLETE; it does not change an observed
continuity PASS or FAIL. Device-bound login can mask preference loss: after
closing the upgrade observation window, uninstall and reinstall on the same
test device, and record whether the guest changes. A separate clean-install
control must also create a distinct guest. Server database assertions, purchase
restore and consumed-item replay need their own exercised evidence; record
missing coverage explicitly and never let it hide observed loss. Cancel a
background runner before manual takeover so its timeout cannot release a lease
still in use.

An upgrade can preserve application state while changing controls, feature flags
or browser event handling. Verify the dependency version, effective configuration
and attempted integration path in the tested artifact: a guest result can come
from an unset provider ID before any provider call. A skipped provider path
leaves that failure scenario OPEN; an account-free preview also cannot establish
sign-in continuity for the account-enabled release.

Generated host sources and linked native libraries can come from different
releases even when a package builds; restoring an integration can also revive
conflicting metadata or higher-priority configuration despite matching versions
and classes. Before device testing, match JNI/FFI contracts, establish canonical
ownership of shared metadata and resources, and check the effective merged release
variant—including eligible resource qualifiers—with known-conflicting input
controls rather than default files alone. Record local compatibility overlays,
limit the verdict to exercised behavior, and verify the complete published
combination before claiming an engine or SDK upgrade.

Declare each case's expected runtime observables and required lifecycle phases
independently of the candidate's configuration or compiled constants. A test choosing
its assertion branch from the candidate can pass the wrong mode; PASS proves only
that selected branch. Bind accepted configuration → generated/compiled policy →
observed OS output, using the [semantic preflight](code.md#deployment-configuration)
before device acceptance. Reject missing phases or mode mismatches even when artifact
bindings match; distinct APK hashes alone cannot prove a policy changed. Correct provider
replay can still belong to another intended operation; reject that receipt.

Test instrumentation or isolation that changes production dependencies or provider
semantics cannot establish shipped-artifact behavior; keep those outputs
structurally separate and make production publication refuse test-only variants.
Bind acceptance checks to the exact deployed or uploaded artifact bytes, comparing
runtime references with packaged definitions, target-platform APIs and explicitly
justified optional externals, with known-bad and known-good controls: declared
versions and keep rules do not establish packaged dependency closure.
Class presence does not prove method compatibility or device behavior; exercise
the affected integration in the shipping host before claiming those properties.

Compatibility APIs can implement policy through legacy flags or stored intent,
so a native-only getter can disagree with working behavior; use the shipped
wrapper's version-specific implementation and real gesture/lifecycle observations
to distinguish a verifier defect from a host defect. Window extent, reported safe
insets, ordinary versus hoisted control placement and painted content need separate
evidence: gesture interception regions can create unwanted padding, while physical
cutouts still need protected controls. Compare the same settled scene before and
after the change, including transient overlays and their removal; full-size
geometry cannot establish edge-to-edge paint.

Resolve each test selector to the current control and assert its identity,
visibility and action. Keep a negative control that fails when the control is
absent or inactive; a test that still passes against a removed entry is not
testing that entry. Exercise the full routed pointer-down and pointer-up sequence
for missing activation and duplicate side effects; a direct callback test misses
overlapping handlers on different phases of the same gesture. For account
changes, reopen an authorized existing-session or guest fixture and verify the
same canonical account and retained value.

For custom-rendered browser controls, distinguish three observations:

1. **Selection:** the expected control owns the logical focus or selection state.
2. **Paint:** the shipping theme renders the required visible focus indicator.
3. **Host behavior:** trusted input reaches the control while the document owns
   focus, activates it, and permits leaving and returning to the component.

A native theme test establishes its tested paint behavior. It does not execute
browser default actions. Use trusted browser keyboard input; dispatching a synthetic
event or calling the application handler directly does not establish the full
browser behavior. Start from a fresh pointer state so a previously painted ring
cannot hide a failed keyboard transition. Record the visible indicator,
`document.hasFocus()`, and canvas/document/window focus and blur events while
exercising Tab, Shift+Tab, relevant arrow navigation, activation, exit and return.
Verify genuine window blur still triggers the intended lifecycle behavior.

When navigation works with Home or arrows but Tab blurs the document, inspect
browser default handling and event ownership before changing styles or pixel
tolerances. Prevent a cancelable event's default action only while the component
handles that navigation; release ownership at its boundary so keyboard users
can leave. Blanket Tab suppression creates a keyboard trap. If the trace instead
shows document focus retained and the expected state reached without paint,
investigate rendering and theme state. Keep failed captures and the original
acceptance threshold through the diagnosis.

Illustrative contrast:

- ❌ **Bad:** “The engine upgrade passes,” because a native test selects Focus
  and a browser selector exists.
- ✅ **Good:** The account-enabled artifact retains the same fixture account;
  trusted browser navigation paints focus, activates the control, and exits and
  returns without pausing the application unexpectedly.

Apply the same checks to a game canvas or an embedded SaaS editor. These checks
cover the affected host interaction; they do not establish unrelated gameplay,
account-server behavior or untested device hosts. Repair shared event handling
at its owning engine or SDK boundary and consume the published correction.

Mechanism references (read 2026-11-06):
[event default actions](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault),
[document focus versus active element](https://developer.mozilla.org/en-US/docs/Web/API/Document/hasFocus),
and [avoiding keyboard traps](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html).

### Before publishing assets, tables or configuration

A generated image a release depends on fails closed on blank output: check its
colours or variance, not only that the file exists.

- Enumerate every changed asset and table from the candidate manifest/diff,
  including additions, removals and the complete declared dependency closure;
  match the checked set to that inventory so one sample cannot stand for all files.
  Artifact identity and admission include referenced payload bytes stored
  separately from root metadata; changed unowned or unverifiable payloads fail
  closed. The real publication gate must reject an undeclared change confined
  to referenced external bytes while accepting an explicitly declared complete
  closure. Identical objects do not prove compatibility: validate container and
  each serialized member’s target, runtime version and format metadata against
  the independently selected platform/runtime, with metadata-only negative
  controls through both the producer and an independent reader.
- Snapshot serving inputs read-only before handoff and diff the candidate against
  that baseline, not repository copies; for display claims, use only the bundle
  actually served to users. For probability fixes, trace the server's reader to
  the exact columns, report their before/after values and enumerate every row
  whose real probability changes: `display == actual` says neither which column changed nor
  that actual odds stayed fixed. Label each changed cell as chosen with its
  decision or unchosen drift; ship only chosen changes and preserve/report the
  live value for drift, since stale templates or a hiding flag can remove owned
  value.
- Trace asset generation through export/build, package staging and runtime
  manifest/cache/remote selection: a store build may skip a separate bundle
  builder, packaging may only copy an export, and remote content may supersede
  embedded assets. Bind the loaded-content evidence to prepared input hashes
  after live-data overlays; the same source commit or a new binary proves
  neither identical inputs nor delivery of serialized UI changes alongside
  runtime-created UI. Establish that every required changed resource was built,
  staged and selected.
- Read every changed artifact with an independent reader: the actual shipped
  consumer or a separately implemented decoder/validator. Reusing the writer's
  serialization code or comparing its output with itself is insufficient. Check
  the decoded values against the intended change, including field types, units,
  ranges, relationships, missing fields and intended removals. At displayed
  precision, reproduce the shipping consumer's numeric widths, cast order and
  rounding rather than an algebraically equivalent rational formula. For
  example, an independent consumer run can disprove equality at a rounding
  boundary: displayed `1.00%` versus consumer-formatted actual `1.01%` at raw
  `1.005%`.
- Exercise assets in their consuming renderer: for example, decode a sprite
  atlas, resolve every frame and render the changed states; load a model with
  its materials and animations. Existence, file size and checksums alone cannot
  establish usable content.
- Start the client and, for server-loaded data, a server built/configured from
  those exact candidate files; load every changed table and assert its consuming
  behavior, not schema acceptance alone. For reward delivery, apply the
  [channel-specific dispatch and effective-item checks](../../game-economy/SKILL.md#1-establish-what-is-happening).
  For random pools or boxes, every
  reachable outcome ID must resolve in the type-specific template used by the
  actual grant handler before deployment. Enforce cross-table references during configuration compilation so dangling IDs fail the build. Exercise single and batch draws with
  unknown-ID/null-grant controls, asserting durable grants and the contract's
  charge/rollback behavior: a response can list rewards even when one unknown ID
  suppresses the whole batch after charging.
- Emit machine-readable results bound to the candidate digest: checked artifact
  IDs, expected/actual values, assertions, failures and tool versions. Missing
  required results fail publication. Preserve the last known good release and
  prove the rollback path in an isolated or synthetic environment.

### After publishing

A WORSE row found on a live surface outranks queued work on that product: restore the reference or repair it first. When showing a person an image, say whether it is a design or already live; they may read a live screen as a demo.

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

A store test purchase proves a purchase path only if the server grants it. A
server that rightly refuses store test orders needs a supported test path: an
allowlist of synthetic test accounts that an agent can set through the API with a
narrow machine credential, without a person's login. When a release moves
purchases to a new delivery path, the old path's working sales prove nothing about
the new one; prove the new one with a granted, consumed test order before real
players reach it.

For web releases, hot updates and other reversible deployments, arm automatic
rollback before publication. A failed, missing or timed-out required
post-publish check automatically restores the last known good code/assets/config
and verifies that restored revision and journey. The automation records both
failure and recovery. Preserve user data: rollback does not rewind customer
writes or undo a ledger. If recovery fails, report that failure explicitly.
Where a channel cannot retract installed clients, follow its supported stop or
disable mechanism and verify it; do not claim automatic rollback that the channel
cannot perform ([app-store releases](dx.md#app-store-client-releases)).

Before a hot update reaches a device, run the real publisher's manifest generator
on the PR and assert that every bundle and dependency the build lists has a
catalog row and a staged file. A build that lists all its bundles can disagree
with a publisher that collects from a narrower list, and the client then waits
forever on a screen that reads as slow. Report what a returning player must
download for that update, in bytes, before publishing: on a coarse bundle layout
a small art change can cost hundreds of megabytes at startup.

Illustrative automated cases:

| Change | Independent pre-publish check | Live check and failure action |
| --- | --- | --- |
| Game reward table and icon atlas | Shipping client decodes every changed reward row; a separate atlas reader resolves frames; renderer shows each changed icon | Owned synthetic account sees the offer, receives the exact configured reward and can use it; wrong amount or missing icon restores the prior data/assets automatically |
| App navigation rebuild | Browser assertions cover route, focus, back navigation and layout; captures compare phone/tablet/desktop with the real original | Served revision matches; create/reopen journey succeeds at each size; a broken route restores the prior web release automatically |
| SaaS plan configuration | Independent reader checks every changed plan field and reference; candidate server loads the configuration | Owned synthetic account's UI and server plan, quota, features and expiry match field by field; mismatch restores prior configuration automatically |

### Temporary release announcements

When an in-product message says a change is available now, trigger it from the
exact serving-accepted release and its required observation period, never a
calendar date, merged source or completed build. Recheck the affected supported
clients immediately before sending; a preview does not prove that those users
can see the change.

Prepare the client check before creating the message. Use the existing
[durable request method](../../challenge/references/architecture.md#durable-ownership-of-an-accepted-request)
for creation and uncertain responses. Confirm the rendered copy in the actual
client; an API row, generated caption or font sample cannot establish delivery.
Give temporary copy an expiry. If acceptance fails or a rollback makes its claim
false, expire only that message. Verify its expiry at the authority and removal
from the public delivery feed; account for any already queued display interval.
Leave unrelated standing messages unchanged.

## Keep devices and tests dependable

Prepare builds, fixtures, scripts and the capture plan before taking a device
lease. Lease devices only while executing the capture/check and release them in
a `finally` block on success, failure, timeout or cancellation. Close temporary
browser sessions and remove synthetic fixtures through their supported cleanup
path. For abrupt process death, use a bounded lease expiry as well. Do not hold a
device while waiting for a build, merge queue or another writer.

For native input, retain the original frame, capture time, dimensions and hash.
Identify the visible control, then map any viewer scaling, crop or rotation back
to the original pixels before choosing an interior point. Check that point
against the raw pixels and measured control bounds; an observer's estimated
coordinate is not a measurement. Colour-threshold bounds describe only the
matching painted subset, not the full control or its hit area.

If a requested input leaves the visible UI unchanged, first test whether it
missed the control. Request acceptance and cursor coordinates do not establish
a hit.
Use a fresh frame and, where needed, a supported pointer-location diagnostic
before blaming a handler, backend or input driver, patching code or replacing
the device. Record the prior diagnostic setting, restore it and verify cleanup.
A matching pointer trace establishes only that gesture's coordinate mapping.
Record the observed UI transition separately from the requested action. For
short-lived turns or dialogs, capture before, act and capture after in one
bounded sequence; an observer round trip can outlast the state being tested.
Before patching allegedly lost or duplicated input, trace the affected user/device
and automated paths through host normalization, handler, state change, paint and
presentation; those paths can use different protocol branches, and a callback
still does not establish visible completion. A synthetic-path failure establishes
neither a universal product defect nor an automation-only defect, and a changed
stimulus must preserve the complete action workload. Retain the unchanged early
capture and any later transition with no new input to distinguish delayed
completion from a dropped action, without inferring its cause.

On a fresh Android emulator, let Google Play services and automatic system
package updates settle before launching the app, measuring startup or judging a
process loss. When the image has pending automatic updates, require observed
update completion followed by bounded, repeated stable version-code reads.
Stable versions before completion do not rule out a delayed update. If completion
is not observed within the preparation deadline, keep the app check OPEN rather
than launching against an unverified baseline. Recheck versions and completion
markers after the journey. An update during the run confounds the comparison, so
preserve that run rather than treating it as an app verdict. For a process loss,
bind unfiltered system logs and exit information to the exact app PID, and
compare simultaneous exits in other processes before
naming a cause. After repairing the environment, repeat the same fixture past
the earlier loss interval and through the intended UI state. Survival establishes
that route only; a new loss without an update reopens the app investigation.

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
