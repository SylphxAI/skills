import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { catalogBytes } from '../scripts/build-catalog.mjs';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const constitutionPath = path.join(repositoryRoot, 'runtime/constitution.md');

/** Ceiling ~1500 tokens at chars/4; leave headroom under hard Final Decision budget. */
const L0_MAX_CHARS = 6000;
/** Soft target ~900 tokens. */
const L0_TARGET_CHARS = 3600;

const REQUIRED_PHRASES = [
  'SylphxAI/skills',
  'active product repository',
  'authenticated Enact tools',
  'not work authority',
  'durable source of truth for **source**',
  'exact current revision',
  'Skills do not grant tools',
  'Evidence precedes claims',
  'Done means delivered',
  'Do not fabricate',
  'concurrent users and work',
  'explicit authority before destructive',
  'evidence only and never',
  'via **native** discovery only',
  'meta-router',
  'Always-on stays',
  'progressive disclosure',
  'delivery terminal',
  'coordinate-enact-work',
];

const FORBIDDEN_MARKERS = [
  'work.defer',
  'On Commit',
  'After Verification',
  'forge-agnostic',
  'RFC 9728',
  'auto_when_green',
  'merge queue',
  'adopt before invent',
  'high-signal communication',
  'break-glass',
  'launchd',
  'Task Scheduler',
];

test('runtime constitution stays within hard L0 size ceiling', () => {
  const text = readFileSync(constitutionPath, 'utf8');
  assert.ok(
    text.length <= L0_MAX_CHARS,
    `constitution ${text.length} chars exceeds hard ceiling ${L0_MAX_CHARS}`,
  );
});

test('runtime constitution reports soft target for operator attention', () => {
  const text = readFileSync(constitutionPath, 'utf8');
  // Soft target is not a hard fail forever, but current Final Decision requires
  // thin L0. Fail if we re-bloat past 1.25x soft target without raising budget.
  assert.ok(
    text.length <= Math.floor(L0_TARGET_CHARS * 1.25),
    `constitution ${text.length} chars exceeds soft-target band ${Math.floor(L0_TARGET_CHARS * 1.25)}; re-justify budget before growing L0`,
  );
});

test('runtime constitution contains frozen miss-class-A floors', () => {
  const text = readFileSync(constitutionPath, 'utf8');
  for (const phrase of REQUIRED_PHRASES) {
    assert.ok(text.includes(phrase), `missing required L0 phrase: ${phrase}`);
  }
});

test('runtime constitution excludes demoted dense operating-loop markers', () => {
  const text = readFileSync(constitutionPath, 'utf8');
  for (const marker of FORBIDDEN_MARKERS) {
    assert.equal(
      text.toLowerCase().includes(marker.toLowerCase()),
      false,
      `demoted marker leaked into L0: ${marker}`,
    );
  }
});

test('runtime constitution keeps fleet Enact bind as conditional section', () => {
  const text = readFileSync(constitutionPath, 'utf8');
  assert.match(text, /Fleet-conditional/i);
  assert.match(text, /only when Enact tools are present or fleet floors opted in/i);
});

test('catalog listing pressure is measurable from built catalog', () => {
  const catalog = JSON.parse(catalogBytes(repositoryRoot));
  assert.ok(catalog.count > 0);
  const descChars = catalog.skills.reduce((sum, skill) => sum + String(skill.description || '').length, 0);
  // Codex unknown-window class ~8000 chars. Prefer agent-facing short descriptions
  // over mega-merge. Soft ceiling prevents silent listing-budget regression.
  const ratio = descChars / 8000;
  assert.ok(Number.isFinite(ratio) && ratio > 0);
  assert.ok(
    ratio <= 1.25,
    `catalog description sum ${descChars} is ${ratio.toFixed(2)}× the 8k class (max 1.25×); shorten descriptions or retire packages`,
  );
  // Guardrail: individual descriptions must remain bounded for listing.
  for (const skill of catalog.skills) {
    assert.ok(
      String(skill.description || '').length <= 1024,
      `${skill.name} description exceeds 1024 chars`,
    );
    assert.ok(
      String(skill.description || '').length <= 220,
      `${skill.name} description exceeds 220-char agent-facing target (${String(skill.description || '').length})`,
    );
  }
});
