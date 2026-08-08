# File host recipes

## 0x0.st

| Field | Value |
|---|---|
| Auth | none |
| Class | L1 |
| Upload | `curl -F file=@path https://0x0.st` |
| Response | URL text |
| Risk | public, logged, hobby |

## litterbox (temporary catbox)

| Field | Value |
|---|---|
| Auth | none |
| Class | L1/L2 |
| Upload | multipart API (`reqtype=fileupload`, `time=`, `fileToUpload`) |
| Risk | public; TTL modes |

## catbox permanent

Longer retention but still **public**. Not private object storage.

## transfer.sh class

Historically intermittent — **live `curl -sI` before use**.

## Proof template

```bash
URL=...
curl -sSI "$URL" | head -15
# optional size class: curl -sS "$URL" | wc -c
```
