# Frontend runtime performance method

Use this method for a concrete runtime symptom or declared performance budget.
Choose tools that exist in the target stack; the evidence contract is
tool-independent.

## 1. Define a reproducible scenario

Bind the baseline to:

- exact source/build and dependency lock;
- browser or app runtime, device class, OS, viewport, refresh-rate and power
  conditions where material;
- route, state, content/data fixture, cache state, input sequence and duration;
- warm-up and sample count;
- declared budget or exact user-visible symptom; and
- control scenarios that remain unaffected.

Capture at least the failing state and the transitions that enter and leave it.
For long-session or accumulation failures, include bounded idle and repeated
route or mount cycles rather than waiting for unspecified production traffic.

## 2. Inventory work producers

Inspect source and runtime evidence for:

| Producer | Questions |
| --- | --- |
| Render/reconciliation | Which state or provider updates, subscriptions, selectors, or unstable identities cause work? |
| Style/layout/paint | Which reads/writes force layout, invalidate large regions, or create expensive paint/compositing? |
| Animation | Which CSS animations, pseudo-elements, RAF loops, timelines, canvas or WebGL loops run, including offscreen? |
| Scheduling | Which timers, microtasks, idle callbacks, transitions, or recursive queues remain active? |
| Events/observers | Where are listeners, Resize/Intersection/Mutation observers and media queries attached and detached? |
| Async/data | Which fetches, streams, workers, decoders, caches, or derived computations overlap or outlive the view? |
| Memory/resources | Which nodes, closures, buffers, textures, media, workers, subscriptions, or caches remain retained? |
| Third party | Which SDK, widget, analytics, animation, or rendering dependency owns measurable cost? |

Search all source paths that can instantiate the mechanism, not only the first
visible component. Include pseudo-elements and dynamically created resources.

## 3. Measure and isolate

Use the smallest combination that can falsify competing explanations:

- performance timeline and long-task/event timing;
- frame/render traces and main-thread attribution;
- browser/app profiler and source-level counters;
- memory snapshots or allocation/retainer evidence;
- listener, observer, timer, RAF, worker and resource lifecycle probes;
- layout/paint/compositor diagnostics;
- network, decoding, bundle and cache evidence where the symptom implicates
  them; and
- controlled toggles or component isolation.

Separate facts read from source from observations made at runtime. Confirm that
the instrumented build and route are the exact candidate under review.

## 4. Correct in value order

Prefer, in order:

1. remove work that has no user value;
2. bind work to the owning component, route, visibility and cancellation
   lifecycle;
3. minimize recomputation through stable data flow, derived state, batching, and
   appropriate memoization;
4. move non-critical work outside the interaction/rendering critical path;
5. reduce algorithmic, allocation, layout, paint, decode, or transfer cost;
6. reduce fidelity or frequency only when product and accessibility behavior
   remain correct; and
7. use throttling, sampling, virtualization, or quality adaptation as an
   intentional bounded policy, not as camouflage for a leak.

Every started timer, loop, observer, listener, subscription, request, worker,
media/resource handle, and retained cache needs an explicit owner and stop,
cancel, detach, dispose, or eviction condition.

## 5. Verify the exact correction

Re-run the same baseline and controls. Exercise applicable transitions:

- first load, steady interaction, idle and recovery;
- repeated enter/leave, mount/unmount and navigation;
- visible/offscreen and foreground/background;
- compact/medium/wide and representative content stress;
- pointer, keyboard, touch or controller input;
- reduced motion and other relevant accessibility settings; and
- slow network, low-power or lower-tier device conditions where part of the
  declared failure model.

Report raw observations or distributions, sampling method, environmental
variance and the product budget. A percentage without baseline units and a
single best run are not sufficient.

The result record should connect:

```text
Claim -> scenario -> source evidence -> runtime observation
      -> oracle/budget -> exact result -> uncertainty
```

Also run functional, visual and accessibility regression checks proportional
to the changed mechanism. If a required environment is unavailable, mark the
claim unverified rather than substituting a different route or screenshot.

## Method lineage

This original synthesis was informed by the MIT-licensed
[`optimize-web-animations`](https://github.com/MengTo/Skills/tree/21b278c62f49f3ce3d8c8ecbcc84cbcd534f3e49/agent-skills/codex/optimize-web-animations)
method. The package generalizes its measure-first, lifecycle and repeated-route
ideas beyond animation while preserving this repository's reproduction,
evidence, accessibility, and routing boundaries.
