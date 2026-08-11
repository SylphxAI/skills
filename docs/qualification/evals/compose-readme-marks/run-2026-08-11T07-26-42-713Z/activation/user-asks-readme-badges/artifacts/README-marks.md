<!-- README-marks.md — copy-paste hero + badge row for the library README.
     Replace placeholders before pasting:
       PROJECT_NAME     → your library's name (URL-encoded, spaces as %20)
       ONE_LINE_PITCH   → your tagline (URL-encoded)
       OWNER            → GitHub user/org        REPO → repository name
       ci.yml           → your main workflow filename
       your-package     → your published package name (npm)
     All image URLs below were probed live (HTTP 200, image/svg+xml) on 2026-08-11. -->

# PROJECT_NAME

> ONE_LINE_PITCH — short, benefit-first description of the library.

<!-- Hero banner — Sylphx Mark. Swap art/theme/animation from https://mark.sylphx.com/api/v1/catalog -->
[![PROJECT_NAME banner: ONE_LINE_PITCH](https://mark.sylphx.com/api/v1/mark?form=hero&art=wave&theme=tokyonight&text=PROJECT_NAME&desc=ONE_LINE_PITCH&height=200&animation=ambient&credit=0)]

One or two sentences about what the library does, who it is for, and the main win. Keep this real markdown text — never rely on the banner image alone for the name or pitch.

<!-- Badge row — shields.io, purpose labels: build · coverage · version · license -->
![Build status](https://img.shields.io/github/actions/workflow/status/OWNER/REPO/ci.yml?branch=main&label=build&logo=github&style=flat)
![Test coverage](https://img.shields.io/codecov/c/github/OWNER/REPO?label=coverage&logo=codecov&style=flat)
![Latest version](https://img.shields.io/npm/v/your-package?label=version&logo=npm&style=flat)
![License](https://img.shields.io/github/license/OWNER/REPO?label=license&color=blue&style=flat)

---

<!-- Reference — do not paste. -->

## Swap-ins

**Version badge by ecosystem** (replace `your-package`/`your-crate`/`com.example:artifact`):

```markdown
![Latest version](https://img.shields.io/pypi/v/your-package?label=version&logo=pypi&style=flat)
![Latest version](https://img.shields.io/crates/v/your-crate?label=version&logo=rust&style=flat)
![Latest version](https://img.shields.io/maven-central/v/com.example/artifact?label=version&logo=apachemaven&style=flat)
![Latest version](https://img.shields.io/gem/v/your-gem?label=version&logo=rubygems&style=flat)
```

**Coverage via Coveralls** (instead of Codecov):

```markdown
![Test coverage](https://img.shields.io/coveralls/github/OWNER/REPO?label=coverage&style=flat)
```

**Static Mark badge** (same provider as the banner; renders only what the URL says — no live data):

```markdown
![Build status](https://mark.sylphx.com/api/v1/mark?form=pill&label=build&message=passing&color=brightgreen&style=flat)
```

**Banner knobs** — `art` (`wave`, `aurora`, `terminal`, `product`, `oss`, …), `theme` (`tokyonight`, `nord`, `github`, `dark`, …), `animation` (`none`, `ambient`, `rise`, …), `height`, `credit=0|1`. Full lists: `https://mark.sylphx.com/api/v1/catalog`.
