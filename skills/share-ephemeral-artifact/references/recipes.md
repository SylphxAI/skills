# Agent recipes — share non-secret files (no search)

## Preflight scrub (always)

```bash
# fail if high-risk patterns appear
if rg -n "AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY|xox[baprs]-" "$FILE"; then
  echo "REFUSE: scrub secrets first"; exit 2
fi
```

## A. 0x0.st (L1 hobby)

```bash
# POST file; response is plain URL text when healthy
curl -sS -F "file=@${FILE}" "https://0x0.st"
# proof
curl -sSI "$URL" | head
```

Host is hobby-grade; uptime not guaranteed. Live probe host before depending on it.

## B. litterbox.catbox.moe (explicit temporary)

```bash
# time values commonly: 1h, 12h, 24h, 72h — confirm form fields if upload fails
curl -sS -F "reqtype=fileupload" -F "time=24h" -F "fileToUpload=@${FILE}" \
  "https://litterbox.catbox.moe/resources/internals/api.php"
```

## C. Prefer managed storage when durable

If the file must survive or is product data → `wire-managed-backend-services` (BaaS Storage), not paste hosts.

## Refuse

Secrets, PII, env files, credential-bearing HAR/logs.
