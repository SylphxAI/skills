# Performance standard

Trigger: setting a speed/reliability target, changing a hot path or investigating an incident.

Choose a measurable target for each critical journey and define its response when missed. Correctness remains part of the journey; state uncertainty when samples are insufficient.

- Web defaults follow Core Web Vitals at p75, mobile and desktop separately: LCP at most 2.5 s, INP at most 200 ms and CLS at most 0.1 ([primary definitions](https://web.dev/articles/vitals), checked 2026-10-30).
- Games/native apps set frame-time, input-latency and startup targets for supported devices. Record the build, workload/sequence, device/cohort, OS/browser, query/window and sample count. Use real-user instrumentation or an authorized controlled-device measurement that can establish the claimed property. An emulator or session-wide percentile does not prove a physical-device sequence's worst-frame bound.
- Choose caching, payload and JavaScript budgets from the journey and measured workload. Keep third-party work off the critical input path; cache anonymous content where its actual variation permits it.
- Use [bounded calls and set-based queries](code.md#outbound-calls). Index growing filter/sort paths and use appropriate pagination. Choose report isolation, a read replica, rollup or asynchronous export when measured query cost would starve serving work; a fixed replica topology or timeout is not universal.
- Prefer notifications with a slow safety resync to tight database polling, following [events first](../../self-challenge/references/architecture.md#real-time-events-first-resync-as-the-safety-net). Losing a performance cache does not lose correctness.
- A replica is not a backup: deletion can propagate. Protect authoritative/unique user data with a tested recovery source; a safely rebuildable derived store need not invent an independent backup copy.
- Plan rollback/repair against the current schema using the [recovery procedure](security.md#recovery-procedure). Verify restored data and the affected customer behavior.

Use the organization's declared incident threshold and measured impact/exposure. Record the cause and corrective action proportionate to the event; a terminology choice alone does not authorize an investigation or interrupt. Judge performance by the defined journey metric and population, not by completion of a report or job.
