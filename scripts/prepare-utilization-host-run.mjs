#!/usr/bin/env node
/**
 * Emit a printable host-run pack from skill-utilization-eval fixtures.
 * Does not score agents. Not utilization proof by itself.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { buildCatalog } from './build-catalog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixturePath = path.join(root, 'tests/fixtures/skill-utilization-eval.json');
const outDir = path.join(root, 'tests/fixtures/skill-utilization-host-results');

const program = JSON.parse(readFileSync(fixturePath, 'utf8'));
const catalog = buildCatalog(root);
const catalogJson = readFileSync(path.join(root, 'catalog.json'));
const catalogDigest = `sha256:${createHash('sha256').update(catalogJson).digest('hex')}`;
let skillsCommit = 'unknown';
try {
  skillsCommit = execSync('git rev-parse HEAD', { cwd: root, encoding: 'utf8' }).trim();
} catch {
  /* offline */
}

const bySuite = Object.fromEntries(['floor', 'critical-skill', 'near-neighbour', 'abstention', 'compound'].map((s) => [s, []]));
for (const c of program.cases) {
  if (bySuite[c.suite]) bySuite[c.suite].push(c);
}

const productJobs = new Set([
  'prototype-product',
  'build-product',
  'maintain-product',
  'expand-product',
  'finish-product',
  'pursue-product-objective',
  'better-product',
  'author-skill',
]);

const criticalPreferred = bySuite['critical-skill'].filter((c) =>
  (c.expectedSkills || []).some((s) => productJobs.has(s)),
);
const criticalRest = bySuite['critical-skill'].filter((c) => !criticalPreferred.includes(c));
const criticalPick = [...criticalPreferred, ...criticalRest].slice(0, 12);

const pack = {
  schemaVersion: 1,
  purpose: 'host-run pack — score with skill-utilization-host-runbook.md; not auto-pass',
  pinned: {
    skillsCommit,
    catalogCount: catalog.count,
    catalogDigestSha256OfCatalogJson: catalogDigest,
    fixtureNote: program.pinnedAtAuthoring?.note || '',
  },
  minimumSlice: {
    floor: bySuite.floor.map((c) => c.id),
    criticalSkill: criticalPick.map((c) => c.id),
    nearNeighbour: bySuite['near-neighbour'].slice(0, 5).map((c) => c.id),
    abstention: bySuite.abstention.map((c) => c.id),
    compound: bySuite.compound.slice(0, 1).map((c) => c.id),
  },
  cases: [
    ...bySuite.floor,
    ...criticalPick,
    ...bySuite['near-neighbour'].slice(0, 5),
    ...bySuite.abstention,
    ...bySuite.compound.slice(0, 1),
  ],
};

mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, `host-run-pack-${skillsCommit.slice(0, 12)}.json`);
writeFileSync(outPath, `${JSON.stringify(pack, null, 2)}\n`);

// Markdown checklist for human/host execution
const md = [];
md.push(`# Host-run pack ${skillsCommit.slice(0, 12)}`);
md.push('');
md.push(`- skillsCommit: \`${skillsCommit}\``);
md.push(`- catalogDigest: \`${catalogDigest}\``);
md.push(`- catalogCount: ${catalog.count}`);
md.push(`- cases in pack: ${pack.cases.length}`);
md.push('');
md.push('Score with `docs/reference/skill-utilization-host-runbook.md`.');
md.push('This pack is **not** a green utilization claim.');
md.push('');
for (const c of pack.cases) {
  md.push(`## ${c.id} (\`${c.suite}\`)`);
  md.push('');
  md.push('**Prompt**');
  md.push('');
  md.push('```text');
  md.push(c.prompt);
  md.push('```');
  md.push('');
  md.push(`- expectedSkills: ${(c.expectedSkills || []).join(', ') || '(none)'}`);
  md.push(`- mandatoryObservable: ${c.behaviorOracle?.mandatoryObservable || ''}`);
  if (c.behaviorOracle?.mustNot?.length) {
    md.push(`- mustNot: ${c.behaviorOracle.mustNot.join(' | ')}`);
  }
  md.push(`- score: _pass | fail | inconclusive_`);
  md.push(`- failureClasses: _[]_`);
  md.push(`- notes:`);
  md.push('');
}
const mdPath = path.join(outDir, `host-run-pack-${skillsCommit.slice(0, 12)}.md`);
writeFileSync(mdPath, `${md.join('\n')}\n`);
console.log(outPath);
console.log(mdPath);
console.log(`cases=${pack.cases.length}`);
