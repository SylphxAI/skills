/**
 * Target checks for local headless capture scripts.
 * Restrict URL to loopback http(s) and output path to allowed roots.
 */
import { resolve, sep } from 'node:path';

const LOOPBACK = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);

export function checkedUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail(`not a valid URL: ${url}`);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    fail(`only http/https allowed, got ${parsed.protocol}`);
  }
  if (!LOOPBACK.has(parsed.hostname) && process.env.BROWSER_ALLOW_EXTERNAL_HOST !== '1') {
    fail(
      `${parsed.hostname} is not loopback; set BROWSER_ALLOW_EXTERNAL_HOST=1 to override`,
    );
  }
  return url;
}

export function checkedOutputPath(outPng, allowedDirs) {
  const abs = resolve(outPng);
  const allowed = allowedDirs.some((dir) => {
    const root = resolve(dir);
    return abs === root || abs.startsWith(root.endsWith(sep) ? root : root + sep);
  });
  if (!allowed) {
    fail(`screenshot path must be under ${allowedDirs.join(' or ')}, got ${abs}`);
  }
  return abs;
}

function fail(message) {
  console.error(JSON.stringify({ ok: false, error: message }, null, 2));
  process.exit(1);
}
