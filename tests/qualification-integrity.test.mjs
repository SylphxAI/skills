import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  FORBIDDEN_INSTRUCTION_PATTERNS,
  incrementalValueEligible,
  incrementalValueEvidenceError,
  qualifiedDigestError,
  scanTextForForbiddenInstructions,
  suiteForbiddenInstructionFindings,
  unqualifiedRecord,
} from '../scripts/qualification-integrity.mjs';

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const DIGEST_A = `sha256:${'a'.repeat(64)}`;
const DIGEST_B = `sha256:${'b'.repeat(64)}`;

test('qualifiedDigestError requires a matching current-algorithm digest', () => {
  assert.equal(qualifiedDigestError({ status: 'unqualified' }, DIGEST_A), null);
  assert.match(
    qualifiedDigestError({ status: 'qualified' }, DIGEST_A),
    /requires packageDigest/,
  );
  assert.match(
    qualifiedDigestError({ status: 'qualified', packageDigest: DIGEST_A }, DIGEST_B),
    /does not match current/,
  );
  assert.equal(
    qualifiedDigestError({ status: 'qualified', packageDigest: DIGEST_A }, DIGEST_A),
    null,
  );
});

test('research-public-web class prompts cannot qualify', () => {
  const leaked = {
    baseline: { prompt: 'What are the current Node.js LTS system requirements?' },
    tasks: [
      {
        id: 'agent-follows-procedure',
        prompt:
          'Read ./SKILL.md completely (open recipes.md first), then write research.md. Follow the method: do not web-search.',
      },
      {
        id: 'baseline-agent',
        baseline: true,
        prompt: 'Write research.md answering the current Node.js LTS system requirements.',
      },
    ],
  };
  const findings = suiteForbiddenInstructionFindings(leaked);
  assert.ok(findings.includes('open recipes.md first'), findings.join(','));
  assert.ok(findings.includes('do not web-search'), findings.join(','));
});

test('honest eval prompts that mention search stay clean', () => {
  const clean = {
    tasks: [
      {
        prompt: 'Use host web search and fetch tools. Do not claim currentness without a retrieved page.',
      },
    ],
  };
  assert.deepEqual(suiteForbiddenInstructionFindings(clean), []);
  assert.deepEqual(scanTextForForbiddenInstructions('Known URL patterns live in references/recipes.md.'), []);
});

test('forbidden instruction patterns stay exported for the integrity gate', () => {
  assert.ok(FORBIDDEN_INSTRUCTION_PATTERNS.length >= 4);
  assert.ok(FORBIDDEN_INSTRUCTION_PATTERNS.every((pattern) => pattern.re && pattern.label));
});

test('unqualifiedRecord is the honest default shape', () => {
  const record = unqualifiedRecord('compose-readme-marks');
  assert.equal(record.status, 'unqualified');
  assert.equal(record.evaluator, null);
  assert.deepEqual(record.evidence, []);
  assert.equal(record.packageDigest, undefined);
});

test('fixture Read SKILL.md pairs are not incremental-value', () => {
  const fixture = {
    tasks: [
      {
        id: 'agent-follows-procedure',
        kind: 'agent',
        fixtures: [{ source: 'package:SKILL.md', as: 'SKILL.md' }],
        prompt: 'Read ./SKILL.md completely, then write update.md with the exact template.',
      },
      {
        id: 'baseline-agent',
        kind: 'agent',
        baseline: true,
        prompt: 'Write a short status update to update.md. Keep it concise.',
      },
    ],
  };
  assert.equal(incrementalValueEligible(fixture), false);
  assert.match(
    incrementalValueEvidenceError(
      { status: 'qualified', evidence: [{ kind: 'incremental-value' }] },
      fixture,
    ),
    /same-prompt/,
  );
});

test('design-skill-evals is a same-prompt pair, not a four-way program', () => {
  const capability = JSON.parse(readFileSync(path.join(repoRoot, 'skills/design-skill-evals/capability.json'), 'utf8'));
  const suite = JSON.parse(readFileSync(path.join(repoRoot, 'skills/design-skill-evals/evals/suite.json'), 'utf8'));
  const contract = JSON.stringify(capability).toLowerCase();
  const suiteText = JSON.stringify(suite).toLowerCase();
  assert.equal(contract.includes('seven-part'), false);
  assert.equal(contract.includes('holdout'), false);
  assert.equal(contract.includes('judge families'), false);
  assert.equal(contract.includes('receiptschema'), false);
  assert.equal(contract.includes('outcome-receipt'), false);
  assert.equal(suiteText.includes('seven-part'), false);
  assert.equal(suiteText.includes('holdout'), false);
  assert.equal(incrementalValueEligible(suite), true);
  const agentPrompts = suite.tasks.filter((task) => task.kind === 'agent').map((task) => task.prompt);
  assert.equal(new Set(agentPrompts).size, 1);
  assert.ok(!suite.tasks.some((task) => (task.fixtures || []).some((fixture) => fixture.source === 'package:SKILL.md')));
});

test('every agent eval suite is a same-prompt pair and does not hand SKILL.md', () => {
  const skillsRoot = path.join(repoRoot, 'skills');
  const folders = readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
  let agentSuites = 0;
  for (const folder of folders) {
    const suitePath = path.join(skillsRoot, folder, 'evals', 'suite.json');
    if (!existsSync(suitePath)) continue;
    const suite = JSON.parse(readFileSync(suitePath, 'utf8'));
    const agents = (suite.tasks || []).filter((task) => task.kind === 'agent');
    if (!agents.length) continue;
    agentSuites += 1;
    const blob = JSON.stringify(suite);
    assert.equal(/Read \.\/SKILL\.md/i.test(blob), false, folder);
    assert.equal(blob.includes('package:SKILL.md'), false, folder);
    assert.equal(incrementalValueEligible(suite), true, folder);
    const prompts = agents.map((task) => task.prompt);
    assert.equal(new Set(prompts).size, 1, folder);
  }
  assert.ok(agentSuites >= 30, `expected a real agent-suite corpus, got ${agentSuites}`);
});

test('same-prompt installed-vs-absent pairs can claim incremental-value', () => {
  const prompt = 'Write update.md about the login-outage fix: deployed, rollback ready, QA by Friday.';
  const same = {
    tasks: [
      { id: 'with-skill', kind: 'agent', prompt },
      { id: 'baseline-agent', kind: 'agent', baseline: true, prompt },
    ],
  };
  assert.equal(incrementalValueEligible(same), true);
  assert.equal(
    incrementalValueEvidenceError({ status: 'qualified', evidence: [{ kind: 'incremental-value' }] }, same),
    null,
  );
});
