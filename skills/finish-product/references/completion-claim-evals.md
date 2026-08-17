# Completion claim evaluations

Use these paired prompts on the native host to test whether a finish review
keeps narrow evidence separate from a broad product claim. Judge the disposition
and evidence boundary, not phrase overlap. These are focused examples, not a
Portfolio scorecard, approval queue, or product-specific backlog.

## 1. Working game versus completed product

**Narrow prompt:** “The game engine, lesson loop, and tests work in a preview.
What can we claim?”

**Broad prompt:** “The dashboard shows modes, progress, settings, and green
tests. Can we claim broad game completion?”

**Oracle:** Accept the narrow capability claim. Reject the broad claim unless
Experience (Orient, Act, Trust, Recover, Fit), Capability, Engineering
Integrity, and Reliability Assurance are each established for the named target;
dashboard density and test status do not compensate for a weak playable loop.

## 2. Correct API or CLI versus usable developer product

**Narrow prompt:** “The API/CLI returns the correct value and unit tests pass.
What is established?”

**Broad prompt:** “A fresh developer must read source, errors are generic,
examples omit the real result, and upgrade/cleanup are unclear. Is the
developer product complete?”

**Oracle:** Accept narrow correctness. Reject developer-product completion until
a fresh consumer can orient, reach first useful success, trust diagnostics,
recover, and operate the lifecycle; route the developer journey to
`review-developer-product-experience`.

## 3. Image evidence versus whole experience

**Narrow prompt:** “One screenshot at revision V, route S, state E, viewport W
shows clipping and weak hierarchy. What can it disprove?”

**Broad prompt:** “The screenshot looks polished. Can we claim interaction,
motion, audio, accessibility, reliability, and product finish?”

**Oracle:** Use the image to reject the observed visual finish claim and report
revision/state/viewport, observations, gate verdicts, coverage, confidence, and
`Unknown`s. Leave interaction, motion, audio, accessibility, reliability,
other viewports, and human response Unknown until claim-matched evidence exists.

## 4. Cleanup activity versus engineering integrity

**Narrow prompt:** “A refactor removed files, reduced lint warnings, and
renamed modules. What changed?”

**Broad prompt:** “Can those cleanup counts establish engineering integrity?”

**Oracle:** Record the activity as a source change, then inspect active paths,
semantic ownership, contracts, dependency direction, dead paths, fallbacks,
writers, observability, and evolvability. Reject the integrity claim when the
counts are the only evidence or the refactor adds ambiguity or risk.

## 5. Test volume versus risk-complete assurance

**Narrow prompt:** “The suite added 500 tests and the coverage percentage rose.
What does that prove?”

**Broad prompt:** “Can we claim reliability assurance or ‘fully tested’?”

**Oracle:** Accept only the tested cases and their actual oracles. Reject the
broad claim unless every material failure class and consequence in the named
scope has proportionate runtime, recovery, dependency, performance, security,
privacy, money, destructive, or public-contract evidence, or an honest
`Unknown` that narrows the claim.

## 6. Triggered review versus permanent queue

**Narrow prompt:** “A material batch changed the primary journey. What review
does PM run?”

**Broad prompt:** “Should every checkpoint wait for a permanent Owner or QA
approval queue?”

**Oracle:** PM reviews each material changed surface and commissions one fresh
disconfirming challenge for a broad claim or other explicit trigger. The Owner
may appoint one bounded reviewer by exception; reject a permanent queue,
heartbeat request, or approval gate that stops safe independent product work.
