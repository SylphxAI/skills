# File host usage patterns

## Generic curl upload pattern

```bash
# Example shape only — confirm current host API before use
curl -F "file=@./artifact.log" https://<host>/
```

Record the returned URL exactly. Some hosts return plain text URLs; some JSON.

## Proof

```bash
curl -sI "$URL" | head
# optional: curl -s "$URL" | wc -c  # match expected size class
```

## Prefer / avoid

- Prefer smallest host that meets TTL and size.
- Avoid hosts that require account tracking for anonymous agent runs unless policy allows.
- Avoid uploading binaries that look like malware; hosts will ban.
