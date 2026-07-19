import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const INJECTION_CASES = JSON.parse(readFileSync(
  new URL('./fixtures/method-injection-cases.json', import.meta.url),
  'utf8',
));

const METHOD_PACKAGES = [
  'agent-context-engineering',
  'agent-planning-system-review',
  'agent-system-improvement',
  'causal-inference-analysis',
  'decision-optimization-modeling',
  'design-space-exploration',
  'evidence-synthesis',
  'optimization-objective-review',
  'probabilistic-forecasting',
  'provenance-system-design',
  'requirements-engineering',
  'security-threat-modeling',
  'semantic-taxonomy-design',
  'structured-deliberation',
  'system-dynamics-analysis',
  'user-research-and-discovery',
];

const COMPOSABLE_STANDARDS = [
  'agent-first-development-standard',
  'agent-native-standard',
  'autonomous-execution-standard',
  'ci-admission-standard',
  'ci-runner-capacity-standard',
  'commercial-decision-standard',
  'decision-quality-standard',
  'delivery-standard',
  'documentation-standard',
  'engineering-standard',
  'enterprise-control-plane-standard',
  'enterprise-profile-standard',
  'frontier-verification-standard',
  'incident-standard',
  'instruction-evolution-standard',
  'parallel-change-integration-standard',
  'project-manifest-standard',
  'prompt-architecture',
  'repo-adoption-standard',
  'self-feeding-agent-loop-standard',
  'source-authoring-standard',
  'specification-control-plane-standard',
  'work-coordination-standard',
];

function skill(name) {
  return readFileSync(new URL(`../skills/${name}/SKILL.md`, import.meta.url), 'utf8');
}

test('independently requested method artifacts remain first-class native Skills', () => {
  for (const name of METHOD_PACKAGES) {
    const markdown = skill(name);
    assert.match(markdown, /^description: .*\bUse (?:when|for)\b/im, name);
    assert.match(markdown, /\bDo not use\b/i, name);
    assert.match(markdown, /## (?:Output(?: contract)?|Artifact)\b/i, name);
  }
});

test('standards compose into the primary artifact instead of emitting reports per injection', () => {
  for (const name of COMPOSABLE_STANDARDS) {
    const markdown = skill(name);
    assert.match(markdown, /## Composition and output\b/, name);
    assert.match(markdown, /Do not emit a separate per-standard compliance\s+report/i, name);
  }
});

test('evaluation contract exercises native compound injection without inventing a router', () => {
  const markdown = skill('skill-eval-designer');
  assert.match(markdown, /runtime auto-injection/i);
  assert.match(markdown, /do not build\s+a meta-router/i);
  assert.match(markdown, /one semantic owner per artifact/i);
});

test('authored injection boundary cases name valid Skills and one owner per artifact', () => {
  assert.ok(INJECTION_CASES.length >= 10);
  assert.equal(new Set(INJECTION_CASES.map(({ id }) => id)).size, INJECTION_CASES.length);
  const allowedKinds = new Set(['positive', 'near-neighbour', 'abstention', 'compound']);
  const seenKinds = new Set();

  for (const fixture of INJECTION_CASES) {
    assert.ok(allowedKinds.has(fixture.kind), fixture.id);
    seenKinds.add(fixture.kind);
    assert.ok(fixture.prompt.length > 10, fixture.id);
    assert.equal(new Set(fixture.expectedSkills).size, fixture.expectedSkills.length, fixture.id);
    for (const name of fixture.expectedSkills) skill(name);
    const owners = fixture.artifacts.map(({ owner }) => owner);
    const artifacts = fixture.artifacts.map(({ artifact }) => artifact);
    assert.equal(new Set(artifacts).size, artifacts.length, `${fixture.id}: duplicate artifact`);
    for (const owner of owners) assert.ok(fixture.expectedSkills.includes(owner), `${fixture.id}: ${owner}`);
  }

  assert.deepEqual([...seenKinds].sort(), [...allowedKinds].sort());
});

test('portable work semantics and the Control Plane adapter stay separate', () => {
  const portable = readFileSync(
    new URL('../skills/work-coordination-standard/references/full-standard.md', import.meta.url),
    'utf8',
  );
  const adapter = skill('control-plane-work-coordination');
  assert.doesNotMatch(portable, /Control Plane|Sylphx|work\.start|fleet\.activity/);
  assert.match(adapter, /Control Plane/);
  assert.match(adapter, /work-coordination-standard/);
});
