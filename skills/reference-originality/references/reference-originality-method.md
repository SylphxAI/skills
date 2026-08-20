# Reference originality method

Use this method to compare one declared subject with an explicit reference set.
It is an evidence and design-risk method, not a legal test.

## 1. Freeze the comparison

Record:

| Field | Required meaning |
| --- | --- |
| Subject | Product/revision, exact revision, route/state, locale, viewport, and capture time |
| References | Exact products/artifacts and revisions supplied or discovered within the authorized scope |
| Authority | Who supplied or authorized each source and any access or publication limits |
| Question | The expression or dependency being evaluated |
| Denominator | Which surfaces, states, media, and history are included and excluded |
| Output audience | Who may read the detailed evidence and whether a public derivative is permitted |

Keep scope explicit: one screen remains one screen, and a supplied reference set
supports conclusions only about that set.

## 2. Build the source registry

For every subject and reference source, capture a stable locator, byte or commit
identity where available, observed version and time, current versus historical
status, origin, authorization, and confidence. Material history includes earlier
commits, archived captures, prior assets, or design revisions that help
establish chronology and independent evolution.

A source registry prevents three common errors:

1. comparing a current subject with a stale or reconstructed reference;
2. treating a shared upstream template or library as direct copying; and
3. losing the chronology that distinguishes original evolution from a later
   redesign.

## 3. Inspect the complete expression

Select applicable categories and preserve the whole-comparison boundary across
them.

| Category | Examples of material evidence |
| --- | --- |
| Language and claims | distinctive phrases, numeric examples, naming, label sequences, error copy |
| Identity | marks, icon silhouette, typography role, color relationships, illustration language |
| Media and assets | images, footage, audio, generated material, crops, composition, metadata |
| Information structure | section order, hierarchy, grouping, density, progressive disclosure |
| Interaction and flow | state sequence, gesture/input behavior, transition logic, recovery |
| Motion | timing relationships, staging, signature transitions, scroll choreography |
| Responsive expression | recomposition, breakpoint-specific hierarchy, compact/wide variants |
| Implementation-visible composition | component/DOM organization when it materially expresses the same distinctive design |

## 4. Classify similarity

Evaluate evidence at three levels:

1. **Common grammar** — standard controls, platform conventions, familiar
   layouts, accessibility requirements, or unavoidable functional constraints.
2. **Shared combination** — individually ordinary choices arranged in a notably
   similar sequence, hierarchy, or interaction.
3. **Distinctive expression** — unusual wording, identity, assets, composition,
   motion, or a combination unlikely to be explained by the shared problem
   alone.

For each material pair record:

```text
Pair ID:
Subject locator:
Reference locator:
Category:
Observed similarity:
Common constraint or upstream source:
Chronology:
Alternative explanations tested:
Distinctive dependency:
Confidence:
Required action:
```

Automated similarity measures may prioritize inspection. Determining whether a
similarity is conventional, independently derived, authorized, or legally
significant requires source, rights, and legal context.

## 5. Calibrate the verdict

- **Clear on the reviewed evidence:** the declared comparison set shows
  independent expression within the stated scope and uncertainty.
- **Targeted changes advisable:** explainable or limited similarity leaves a
  specific dependency that a coherent design change can remove.
- **Redesign needed:** material distinctive expression or combination remains
  too dependent on the reference for the current design.
- **Comparison unresolved:** unavailable, conflicting, or restricted sources
  leave the decision open until the named source or owner is available.

Legal infringement and non-infringement claims require qualified legal authority
beyond these labels.

## 6. Redesign and re-review

Remove the smallest coherent distinctive dependency rather than recoloring the
same composition. Preserve the product requirement, then vary the independent
design thesis, information hierarchy, interaction model, wording, asset source,
or motion relationship that caused the risk. Re-run the same comparison against
the exact changed revision and retain the rejected candidate in the audit
trail.

## Method lineage

This original synthesis was informed by the MIT-licensed
[`audit-reference-originality`](https://github.com/MengTo/Skills/tree/21b278c62f49f3ce3d8c8ecbcc84cbcd534f3e49/agent-skills/codex/audit-reference-originality)
method. The package adapts its useful current/history and paired-evidence ideas
to this repository's evidence, audience, routing, and non-overclaim standards.
