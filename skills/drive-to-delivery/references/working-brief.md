# Working brief — ordinary delivery ownership

Use this as a mid-task re-anchor when driving source to the delivery terminal.
Depth lives in `delivery-standard`, `source-authoring-standard`, and
`autonomous-execution-standard`.

## Own the loop

For the accepted objective: know the owning product/project deeply enough to be
correct, keep **strict project boundaries**, and run implement → independent
review → merge → deploy yourself under repository policy.

## Direction first

Before non-trivial work: north-star alignment, owning project, contracts, and
what must not be crossed. Root-cause, future-proof fixes in the owner only. No
boundary/contract/policy violations. No workarounds.

## Canonical path (no bypass)

```text
PR → Merge Queue → main → Auto Deploy → live verification
```

- Auto-merge = queue arm only after independent separate-context review is
  clear of material findings and required checks will admit the candidate.
  Not quality proof. Not done.
- Never force-merge, skip required checks, admin-override, or weaken gates.
  If blocked: fix the owning project and re-enter the path.
- Own the outcome through the path. Worker occupancy may checkpoint/re-enter;
  merged/deployed alone is not automatic done.
- Done only when the repository delivery terminal is proven (often live-healthy
  and well-tested for the change).

## Mid-task questions

1. Direction and owner/boundary still correct?
2. Root-cause in the right project—or workaround/bypass-shaped?
3. Still on PR → Queue → main → Deploy → live with no gate skip?
4. Independent review done before merge trust?
5. Which lifecycle layer is actually proven, and what is next to true done?
