# Game-server lag evidence

Read this when attributing player lag on a server whose processes talk over a
queue bus (Redis or Valkey lists, Kafka topics) and share a database, or before
changing the durability or placement of that bus.

❌ **Bad:** "Slow-request lines per minute rose at peak and storage fsync stalls
were seen earlier, so storage is the cause; turn fsync off on the queue."

✅ **Good:** "Separate per-player fan-out from global freezes, rebuild each slow
request's start and end, check every shared dependency during a captured burst,
and list what data rides a store before touching its durability."

## Separate fan-out from freezes

1. A slow-request log with a fixed threshold counts requests, not players. A
   client that fires many requests at once (a lobby screen loading its panels)
   adds one line per request whenever they are served one after another. Group
   by player (hashed, never printed) and by burst; report fan-out span p50/p95
   and distinct players per minute alongside the raw count.
2. Rebuild each slow response's start as log time minus duration, per second.
   A global freeze shows many players' requests starting across the freeze and
   finishing together at the release. A throughput limit shows completions
   spread evenly with a constant delay. Per-entity serialization shows one
   player's requests finishing one after another.
3. Normalize by load (bus messages per second, logins) before comparing
   windows; a peak hour raises every count.

## Check each shared dependency inside a captured burst

Trigger on the burst itself: poll the slow log every few seconds and capture
when it crosses a threshold, so every reading below covers the same seconds.

- Process pauses: GC per process (`jstat -gcutil <pid> 1000`) and per-thread
  CPU from `/proc/<pid>/task/*/stat`. An idle thread pool with slow requests
  means the time is spent waiting.
- Thread dumps aggregated by the first application frame: sleeping in a lock
  or backoff loop, blocked in a socket read, or inside a database call.
- The bus: backlog per list sampled every 0.5 s (name the live topic
  explicitly; an empty list does not exist as a key), consumer-side round trip
  (a PING loop from the consumer's host), and round trips per message (a
  validation PING on every pool borrow, one pop per round trip).
- The database: running statements and their state (commit waits), and the
  device latency of its own volume (node-exporter per device), read separately
  from the bus store's volume.
- Placement: the node of every process and store, and same-node vs cross-node
  round trip. An emergency pin that outlived its reason is a common cause.

Rule a dependency out with a number from the burst window, never by the
absence of a log line.

## Before changing a queue store's durability

List every producer and message type on the store. If any message carries
state not yet in the system of record (settlements, currency, grants), the
queue holds the only copy until it is consumed, and a weaker fsync widens a
data-loss window. Keep the durability setting; remove the latency cause
instead (local disk for the append log, IO isolation, fewer round trips).

## Switching a live store

- Cap any write pause below the client's heartbeat timeout.
- Disconnect clients from the old primary before it becomes a replica, or its
  writes fail as read-only.
- Afterwards, count errors per process and caller for the switch window from
  the log aggregator (`kubectl logs` on a busy pod may not reach back). Classify
  them: requests never executed, replies lost after a commit, and lost
  state-carrying messages. Only the last is data loss.

## Locks and affinity

A per-entity distributed lock taken on every message, with polling backoff,
often compensates for lost partition affinity, for example a queue
replacement that ignores the routing key. Read the producer's key handling
before tuning the lock. A lock wait must not hold a pooled connection, and an
error inside the wait loop must be logged, not swallowed.
