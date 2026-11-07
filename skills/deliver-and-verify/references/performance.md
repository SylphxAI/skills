# Performance standard

Trigger: setting a speed/reliability target, changing a hot path or investigating an incident.

Choose a measurable target for each critical journey and define its response when missed. Correctness remains part of the journey; state uncertainty when samples are insufficient.

- Web defaults follow Core Web Vitals at p75, mobile and desktop separately: LCP at most 2.5 s, INP at most 200 ms and CLS at most 0.1 ([primary definitions](https://web.dev/articles/vitals), checked 2026-10-30).
- Games/native apps set frame-time, input-latency and startup targets for supported devices. Record the build, workload/sequence, device/cohort, OS/browser, query/window and sample count. Use real-user instrumentation or an authorized controlled-device measurement that can establish the claimed property. An emulator or session-wide percentile does not prove a physical-device sequence's worst-frame bound.
- Measure startup as a journey from the tap to the first usable screen. Anchor it on the OS launch event and report OS display, engine ready, app code ready, sign-in and usable screen separately, cold and warm. A run that stopped at a dialog or a missing store service measured the path up to there, and says nothing about the rest. A positive screenshot completion is an observation upper bound, not exact onset. A negative screenshot completion is not a lower bound when image acquisition happened earlier. Use validated capture timestamps or justified capture-start bounds, and state the clock and acquisition uncertainty ([engine benchmark method](parity.md#compare-engines-on-declared-equal-work)); a log line needs the same event/clock validation. Measure a claimed saving: a fixed logo that overlaps asynchronous startup may save no time when removed.
- Default startup budget for a game or app on a mid-range phone: tap to first usable screen within 5 s cold and 2 s warm. Android vitals treats first display of 5 s cold, 2 s warm or 1.5 s hot as excessive ([Android vitals](https://developer.android.com/google/play/vitals/launch-time), read 2026-11-02), so that line is a floor, and our budget counts usable, not first display. Every title in a portfolio shares the budget. Each release records its number, and a regression is a defect.
- Store stability is a quality number nobody has to sign in to read. Google Play judges user-perceived ANR at 0.47% and user-perceived crash at 1.09% overall, and 8% per phone model, on a 28-day average; above them it may reduce visibility and warn on the listing ([Android vitals](https://developer.android.com/topic/performance/vitals), read 2026-11-02). Read every title daily through the Play Developer Reporting API with a service account (`crashRateMetricSet`, `anrRateMetricSet`, `errorIssues:search`, `errorReports:search`). A title over a limit is a defect even with no complaint. Report the user-perceived rate, not the larger all-ANR rate, and watch the daily rate, which moves before the 28-day figure.
- When a cached reload is as slow as a cold open, look for fixed timers before caching or the engine: read the startup source for minimum splash and loading durations. A launch image must be bound natively, so it shows before the engine starts; if work continues behind it, show progress on it, because a still picture reads as a hang.
- Choose caching, payload and JavaScript budgets from the journey and measured workload. Keep third-party work off the critical input path; cache anonymous content where its actual variation permits it.
- Compare download and install sizes using the same measure before and after. Name the shipping version/build, platform, device, delivery variant, cache state and measurement source. APK/IPA archive bytes, expanded ZIP members, source assets, store estimates and installed disk use are different measures. Rank the largest entries from the complete delivered artifact or observed request population; a source directory is not a shipping inventory.
- For Apple apps, the product page's Information size is the install size; over-the-air download size is compressed. Bind the released version to its build, then read the complete per-device size population in App Store Connect (`BuildBundleFileSize.downloadBytes` and `installBytes`), keeping the Universal variant separate. Label these provider sizes separately from physical-device measurements. Apple applies digital rights management (DRM) and recompression during distribution, so an uploaded archive does not establish final transfer size ([Apple build metadata](https://developer.apple.com/help/app-store-connect/manage-builds/view-builds-and-metadata/), [size API](https://developer.apple.com/documentation/appstoreconnectapi/buildbundlefilesize), read 2026-11-02).
- Before ranking API routes or claiming a tail-latency improvement, use [API latency evidence](../../prove-it/references/api-latency.md) for the observation boundary, population controls, phase attribution and comparable follow-up.
- Use [bounded calls and set-based queries](code.md#outbound-calls). Index growing filter/sort paths and use appropriate pagination. Choose report isolation, a read replica, rollup or asynchronous export when measured query cost would starve serving work; a fixed replica topology or timeout is not universal.
- Prefer notifications with a slow safety resync to tight database polling, following [events first](../../challenge/references/architecture.md#real-time-events-first-resync-as-the-safety-net). Losing a performance cache does not lose correctness.
- A replica is not a backup: deletion can propagate. Protect authoritative/unique user data with a tested recovery source; a safely rebuildable derived store need not invent an independent backup copy.
- Plan rollback/repair against the current schema using the [recovery procedure](security.md#recovery-procedure). Verify restored data and the affected customer behavior.

Use the organization's declared incident threshold and measured impact/exposure. Record the cause and corrective action proportionate to the event; a terminology choice alone does not authorize an investigation or interrupt. Judge performance by the defined journey metric and population, not by completion of a report or job.


## Replicated readiness

A successful load-balanced request can hide a stale replica: a readiness promise
across replicas needs repeated agreement on every member of a stable serving
consumer census, tied to its deployed revision, with each sample taking the
maximum latency rather than the first success. State the clock origin, preserve
the original source-observation time across reloads and unchanged content, retain
failed or censored samples, and identify excluded routes or a changed census
rather than silently shrinking or mixing the population. A measured budget uses
that complete cohort's maximum plus a stated margin; finite acceptance does not
establish an absolute bound under failure or a production-population tail
percentile.

## Fragment-shader hot paths

Use when a renderer misses frame-time targets despite few draw calls, or when
specializing a general-purpose fragment shader. Model fragment work as shaded
area, including overdraw, times per-pixel program cost; flags and early returns
do not establish that unused features are free, especially on software rasterizers.

Hold geometry, draw area and uploads fixed while comparing the original shader,
a constant-colour fragment and an early-return variant. If constant colour is
cheap but early returns are not, test compile-time specialized pipelines for
common paint while retaining the general path for unsupported states; the
ablation isolates a candidate cost, not pixel correctness or shipping speed.

Require byte-exact differential pixels against the general path on every affected
backend, with an independently expected visible-target population and a deliberately
wrong-pipeline mutation that changes it; fully overpainted targets can pass
vacuously. After merge, repeat [paired engine runs](parity.md#compare-engines-on-declared-equal-work)
against the category leader on the frozen fixture, preserving quality, startup
and size limits; shader tests alone do not establish the delivered frame times.

## Final encoded limits and reliability evidence

A per-item limit does not bound the encoded aggregate: count the complete consumer request or response, including escaping, envelopes and reserved output, against its actual limit. Evaluate state-reduction candidates before committing them; rejection leaves the prior usable state and authoritative raw data unchanged. **Bad:** persist a smaller checkpoint that still exceeds the request window; **Good:** measure each candidate and commit only one that fits.

Derive behavioral-test request budgets from the serialized empty instruction/schema envelope plus a fixed source allowance, preserving the full encoded-bound assertion and original partition/omission assertions as the envelope grows.

Bound every agent tool output to 32 KiB in its final encoded form, with a continuation cursor for omitted bytes. Returning an active transcript range verbatim can duplicate the context into itself; return pointers or a summary for already-visible content, while keeping evicted raw bytes recoverable through bounded pages. Test aggregate size, oversized single records, escaping, Unicode boundaries and lossless continuation through the real tool boundary.

A short green streak is weak evidence for a low-rate flake: with independent 6% failures, the probability of 16 clean runs is `0.94^16 ≈ 37%`. Near that rate, compare at least 100 runs per arm under the same conditions and use [Fisher's exact test](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.fisher_exact.html) on failure/pass counts, reporting the effect and uncertainty rather than treating a nonsignificant result as equivalence (read 2026-11-07). Choose larger populations when the desired detectable improvement or observed dependence requires them.

## Bounded memory for large transfers

Set a peak-memory budget from concurrency and bounded buffers, independent of
payload size. Follow bytes from storage through driver prefetch, application
buffers, encoding, multipart framing and the receiver. A streaming HTTP type
does not help if an earlier database result or response collector holds the
whole value. Read metadata before deciding whether output is needed; cap a
historical replay in the database before its bytes reach the process.

Transport or decompressor frame sizes are not application allocation bounds: a
transform that copies each frame can recreate a whole-document allocation despite
chunked retained output. Derive bounded input slices and scratch space for the
transform, test one oversized frame as well as many tiny frames, and include
decoder-owned bytes in the end-to-end budget.

A shared payload can outlive its cache entry or stream, and each fan-out copy is
another allocation: charge bytes until the last reader or transport owner releases
them. Budget waits must observe transitions that make further allocation
unnecessary, including terminal errors, or a memory bound can become a liveness
failure. Prove both bounds by holding detached slow-consumer buffers through
eviction and comparing live allocation multiplicity with charged bytes, then
saturating the budget and exercising progress without new allocations.

Measure decoded representation as well as stored bytes. A typed binary field
such as `Vec<u8>` can serialize as a JSON integer array; decoding through a
generic JSON value allocates a separate enum element per byte. Loading every
cumulative request on each continuation multiplies this amplification across
the whole history. Project identities, outcomes and replay dependencies in the
storage query, then decode typed records with only the request payloads replay
actually reads. Prove those dependencies by replaying with obsolete payloads
removed. Compact binary or base64 writes reduce future storage cost; they do
not repair reads of retained legacy arrays. Follow
[rolling format compatibility](../../challenge/references/architecture.md#platform-data-and-job-contracts)
before changing the writer.

Use an established streaming object store or bounded immutable chunk rows.
Repeated appends to a large `bytea` rewrite prior content; repeated slices of
compressed TOAST can repeat decompression. `EXTERNAL` permits out-of-line
uncompressed storage and optimized partial reads. TOAST relation size alone
does not establish compression ([PostgreSQL 18 TOAST](https://www.postgresql.org/docs/18/storage-toast.html),
read 2026-11-06). Measure storage work as well as application allocation before
calling a chunked interface scalable.

Bound temporary staging at the producer before transfer; rejecting an oversized
response cannot limit a file already written to disk. Keep one owner responsible
for the producer and its outputs until the producer is terminal, since earlier
cancellation cleanup can race a late write that recreates the files. Prove the
bound and cleanup with oversized input, producer interruption and consumer
cancellation, preserving the last committed result and source.

Enforce receiving limits as bytes arrive. Publish a manifest only after EOF,
byte count and digest verification. Serialize replacement against readers or
read immutable version references, so a stream cannot mix versions. Follow
[migration compatibility](code.md#migrations) while old revisions still serve.

Prove the actual storage-to-network or storage-to-replay path. Use a fresh
child process for each original and repaired loader on the same fixture, so
allocator history cannot hide peak resident set size (RSS). On Linux, record
`VmHWM` from `/proc/self/status` ([Linux /proc documentation](https://www.kernel.org/doc/html/latest/filesystems/proc.html),
read 2026-11-06); assert a budget derived from serving memory and concurrency.
Exercise the production query, codec and replay fold, with
both retained legacy records and the new encoding. Name the history count and
payload sizes; a small single-record decode does not test whole-history loads.

For transfers, use a payload larger than the isolated process's memory budget.
Generate the source outside that process and hash the receiver incrementally;
a fixture that collects the whole body defeats the proof. Compare source,
destination and published digest; include interrupted streams, corruption and
tenant denial. Keep isolated memory measurements separate from deployed
revision, normal-load OOM/restart counts and peak memory over the declared
observation window.

## Startup measurements from video and queued logs

Use this method when a startup event and the screen people can use disagree:

- Treat an application's ready event as one diagnostic boundary. Establish the
  first usable screen from its required controls and content, then exercise a
  safe control. Keep appearance and input-response results separate; an empty
  container behind an onboarding overlay does not establish readiness.
- For sampled video, retain the last frame missing the required content and
  the first frame showing it. Report that interval, including uncertainty in
  the input timestamp. Preserve original presentation timestamps (PTS) and
  source-frame indices. A frame-rate conversion can duplicate frames and assign
  new timestamps; its output index divided by frame rate is not the original
  frame's time. Match selected images to source frames by index or decoded-pixel
  hashes before calculating a latency.
- Bind video time to the recorded input's clock. Android `screenrecord` can
  embed Winscope frame timestamps and a clock offset; validate the magic,
  version, length and frame count against the
  [matching implementation](https://android.googlesource.com/platform/frameworks/av/+/refs/heads/android14-release/cmds/screenrecord/screenrecord.cpp)
  (Android 14 implementation read 2026-11-03). Cross-check the mapping against
  the video's PTS and the device's clock observations. A recorder process's
  launch timestamp does not establish when its first frame was captured. If no
  reliable mapping exists, report the remaining clock-alignment uncertainty.
- Separate event capture from log emission. A logger posted to a UI thread can
  report the emitter's thread ID and a later wall time. Capture a monotonic
  timestamp and the producer's thread identity before posting; compare clocks
  with the same origin before attributing a delay to a network call or message
  delivery.
- Verify that required timing records survive the actual release logging
  settings. Keep diagnostic fields fixed and numeric, preserve startup behavior
  when an older native wrapper lacks the diagnostic method, and retain a
  positive-control event after settings change. Missing filtered logs do not
  prove that the operation never ran.
