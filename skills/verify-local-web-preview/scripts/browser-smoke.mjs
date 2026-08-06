#!/usr/bin/env node
/**
 * Lightweight headless load + screenshot for a local preview URL.
 * Exit 0 success, 1 navigation/HTTP failure, 2 console/page errors, 3 missing playwright.
 *
 * Usage:
 *   node browser-smoke.mjs [url] [out.png]
 * Defaults: http://127.0.0.1:5173/  ./screenshots/local-preview.png
 * Env: BROWSER_SMOKE_TIMEOUT_MS, BROWSER_SMOKE_URL, BROWSER_ALLOW_EXTERNAL_HOST,
 *      BROWSER_SMOKE_ALLOW_ROOT (extra output roots, ':'-separated)
 *
 * Requires playwright + chromium at runtime (product or agent environment).
 */
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { checkedOutputPath, checkedUrl } from './browser-guard.mjs';

const url = checkedUrl(process.argv[2] || process.env.BROWSER_SMOKE_URL || 'http://127.0.0.1:5173/');
const defaultOut = resolve(process.cwd(), 'screenshots', 'local-preview.png');
const extraRoots = (process.env.BROWSER_SMOKE_ALLOW_ROOT || '')
  .split(/[:;]/)
  .map((s) => s.trim())
  .filter(Boolean);
const outPng = checkedOutputPath(process.argv[3] || defaultOut, [
  resolve(process.cwd()),
  ...extraRoots,
]);
const timeoutMs = Number(process.env.BROWSER_SMOKE_TIMEOUT_MS || 45000);

mkdirSync(dirname(outPng), { recursive: true });

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error(
    JSON.stringify({
      ok: false,
      error: 'playwright not installed; use host browser tools or npm i -D playwright',
    }),
  );
  process.exit(3);
}

const consoleErrors = [];
const pageErrors = [];
const browser = await chromium.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(String(err?.message || err)));

  const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: timeoutMs });
  const status = resp?.status() ?? 0;
  await page.waitForTimeout(1000);

  const title = await page.title();
  const hasCanvas = (await page.locator('canvas').count()) > 0;
  const bodyTextLen = (await page.locator('body').innerText().catch(() => '')).trim().length;

  await page.screenshot({ path: outPng, fullPage: false });

  console.log(
    JSON.stringify(
      {
        url,
        status,
        title,
        hasCanvas,
        bodyTextLen,
        consoleErrors,
        pageErrors,
        screenshot: outPng,
      },
      null,
      2,
    ),
  );

  if (status >= 400 || status === 0) process.exit(1);
  if (pageErrors.length || consoleErrors.length) process.exit(2);
  process.exit(0);
} catch (err) {
  console.error(JSON.stringify({ ok: false, url, error: String(err?.message || err) }, null, 2));
  process.exit(1);
} finally {
  await browser.close();
}
