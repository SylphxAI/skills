---
name: verify-local-web-preview
description: "Verify a local web or game preview through load, screenshot, and console checks."
---

# Verify Local Web Preview

Load a local web or canvas preview through a browser, inspect the rendered
result, and report console or page errors.

## Method

1. Discover the actual local preview URL from the product's running server.
2. Open it with the host browser or the product repository's existing browser
   test interface.
3. Capture a screenshot and inspect layout, content, canvas state, clipping,
   loading, and obvious visual defects.
4. Exercise the interaction changed by the task. For games, use visible input
   and movement behavior in addition to the screenshot.
5. Record URL, navigation result, screenshot path, console/page errors, and the
   behavior exercised.
6. Communicate the result using
   [preview honesty](references/preview-honesty.md), matching local preview,
   public preview, released, and live states to the observed layer.

## Output

Return the preview URL, browser result, screenshot path, console/page errors,
interaction result, and material untested areas.

Use `deploy-ephemeral-web-preview` when the requested result is a public
temporary URL.
