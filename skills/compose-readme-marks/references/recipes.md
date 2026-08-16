# README mark recipes

## Static project mark

```markdown
[![Project mark](path/to/mark.svg)](https://example.com/project)
```

Commit the SVG when documentation must render offline or retain a fixed brand
asset. Use concise alternative text and link to the project or documentation.

## Dynamic status badge

```markdown
[![Build status](https://provider.example/badge/build.svg)](https://example.com/actions)
```

Build the image URL from the selected provider's current documented parameters.
Link it to the workflow, release, package, or policy page that owns the fact.

## Compact metadata row

Group a small set of peer marks for build state, current release, package, and
license. Keep the project purpose and primary usage path readable when remote
images are unavailable.

Open the rendered README, inspect image text and destination links, and confirm
that every displayed status matches its owning source.
