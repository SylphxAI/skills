# Performance standard

Trigger: setting a speed or reliability target, touching a hot path, or
handling an incident.

Fast and correct beat fast: plausible, wrong output is an outage the customer
cannot see. Each critical customer journey has one target, how it is measured,
and what happens when it is missed; with too little data, say so instead of
guessing.

- **Web:** Core Web Vitals at p75, mobile and desktop separately: LCP at most
  2.5 s, INP at most 200 ms, CLS at most 0.1.
- **Games and native apps:** each title sets its own frame-time, input-latency,
  and start-up targets for its weakest supported device.
- **Real-device frame-time evidence:** use Keel real-user monitoring (RUM),
  following the real-user measurement approach of
  [Datadog RUM](https://docs.datadoghq.com/real_user_monitoring/browser/monitoring_page_performance/)
  (read 2026-10-10), not a desk phone, a paid device farm, or a capture on the
  owner's phone. Keep the title's device cohorts, gameplay scope, percentiles,
  and worst-frame limits unchanged. The evidence names the measured build, query and time range, device model or supported
  cohort, OS/browser, and sample count. Missing samples or dimensions are
  unverified, never a pass; an emulator or a session-wide percentile cannot
  prove a physical-device or sequence-specific worst-frame limit.

## Hard lines

- **A replica is not a backup:** a deleted row is deleted on the replica too.
  Every durable store has a backup, and losing data is a hard line.

## Practices

- **Web delivery:** anonymous marketing and catalog pages return
  shared-cacheable HTML, with session reads and per-request nonces in an island
  rather than the layout. Each public route has a compressed first-load
  JavaScript budget CI enforces, a client receives only the translation
  namespaces it uses, and third-party scripts, analytics, and chat do not block
  first input.
- **Bounds and queries** follow [code.md](code.md#transactions-and-idempotency) and [code.md](code.md#outbound-calls): a timeout on every remote call, queue and pool, and one set-based query for related rows. Retries are bounded, jittered and idempotent. Index what a growing list filters and sorts on, use keyset pagination on growing tables, and skip exact totals on public or hot paths.
- **Reports, exports, and analytics** use the platform's read replica (`<= 30 s` statement timeout) or precomputed rollups/async exports rather than starving the primary serving pool (use bounded queries proportional to the workload rather than inventing bespoke replica infrastructure per call).
- **Workers** wait on a notification with a slow safety poll, not a tight
  database poll ([events first](../../self-challenge/references/architecture.md#real-time-events-first-resync-as-the-safety-net)). A cache speeds things up; correctness survives losing it.
- **Rollback** has to work with the current schema and comes first in the
  [recovery ladder](security.md#recovery-ladder).
- **Incidents** get a short blameless record: impact, cause, fix, and the
  follow-up with its owner. An incident needs real impact; a finding nobody
  exploited is a bug, not an incident.

## How it is judged

By the measured target per journey. A restore is tested by reading the restored
data back, not by seeing the job finish. An incident is over when the customer
behavior is checked working, not when the record is written.
