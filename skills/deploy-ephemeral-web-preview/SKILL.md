---
name: deploy-ephemeral-web-preview
description: Publish a short-lived public web preview for a demo, review, or integration check. Use when a temporary URL materially helps collaborators inspect the current candidate.
---

# Deploy Ephemeral Web Preview

Publish a bounded preview with a clear candidate identity, access policy, and expiry.

## Method

1. Confirm that a public preview is useful for the requested review and that the content is authorized for external hosting.
2. Identify the exact source revision, build command, output directory, runtime needs, routes, and environment variables.
3. Select the smallest supported preview provider that matches static or dynamic runtime requirements.
4. Remove secrets, customer data, internal endpoints, privileged controls, and production credentials from the preview artifact.
5. Add authentication or an unguessable access route when the approved audience is limited.
6. Deploy the exact candidate and record the resulting URL and provider expiry or removal method.
7. Load the URL from an external path and exercise the representative interaction, asset loading, routing, and responsive layout.
8. Share the candidate identity, audience, expiry, and any functional difference from production.
9. Remove the preview when its review purpose ends or the provider's short retention period expires.

Read [Acceptance](references/acceptance.md) for preview checks, [Provider selection](references/provider-selection.md) for the hosting path, and [Recipes](references/recipes.md) for common static and dynamic deployments.

## Output

Return the public URL, candidate revision, provider, audience, expiry, interaction checked, and removal state.
