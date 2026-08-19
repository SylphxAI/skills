# Share Ephemeral Artifact

Publish a scrubbed, non-secret file to a temporary public URL for debugging or
handoff.

## Method

1. Confirm the artifact is suitable for public access. Remove credentials,
   customer data, private source, internal URLs, and unnecessary context.
2. Open [provider selection](./provider-selection.md), current provider
   terms, and [safety guidance](./safety.md). Select a host whose size,
   retention, content type, and acceptable-use policy fit the artifact.
3. Upload through the provider's documented route in
   [recipes](./recipes.md).
4. Fetch the URL once and verify status, content type, size, and expected file.
5. Return the URL with content class, size, expiry or retention, and deletion
   route when the provider supplies one.

## Boundaries

Use managed object storage for durable product custody and an artifact registry
for releases. Temporary public hosts are appropriate for intentionally public,
short-lived, non-secret material.

## Output

Return the verified URL, provider, content class, size, retention or expiry,
and deletion information.
