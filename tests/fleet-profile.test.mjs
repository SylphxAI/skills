import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const profile = JSON.parse(readFileSync(new URL('../skills/fleet-engineering-profile/references/profile.json', import.meta.url), 'utf8'));
const projectSchema = JSON.parse(readFileSync(new URL('../skills/project-manifest-standard/references/project-manifest.schema.json', import.meta.url), 'utf8'));

const backendRoles = [
  'api', 'backend-service', 'background-job', 'controller', 'critical-path', 'gateway',
  'queue-consumer', 'queue-producer', 'runtime', 'storage', 'worker',
];
const webRoles = ['browser', 'product-web', 'server-rendered-web', 'ui-orchestration'];
const forbiddenEffects = [
  'backend-authorization-decision', 'backend-business-effect', 'backend-database-mutation',
  'durable-queue-consume', 'durable-queue-publish', 'typescript-backend-fallback',
];

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function sorted(values) {
  return [...values].sort();
}

test('fleet profile binds the canonical role and effect boundary', () => {
  assert.equal(profile.profile.revision, '2026-07-18.2');
  assert.equal(profile.profile.predecessor, undefined);
  assert.equal(profile.retirement.predecessor, 'fleet-engineering-profile@2026-07-18.1');
  const defaults = new Map(profile.defaults.map((item) => [item.key, item]));
  assert.equal(defaults.get('engineering.language.backend-authority').value, 'rust');
  assert.deepEqual(sorted(defaults.get('engineering.language.backend-authority').appliesToRoles), sorted(backendRoles));
  assert.equal(defaults.get('engineering.language.web-authority').value, 'typescript-bun-next');
  assert.deepEqual(sorted(defaults.get('engineering.language.web-authority').appliesToRoles), sorted(webRoles));
  assert.equal(defaults.get('engineering.language.completion-measure').value, 'service-role-and-effect-coverage');
  assert.deepEqual(sorted(profile.forbiddenEffectsForWeb), sorted(forbiddenEffects));
  assert.deepEqual(profile.exceptionPolicy.exceptableDefaults, []);
  assert.equal(profile.selector.unknownFactPolicy, 'fail-closed');
});

test('fleet selector uses only canonical operational project lifecycles', () => {
  const selector = profile.selector.matchAll.find((item) => item.fact === 'repository.lifecycle');
  const canonical = projectSchema.properties.project.properties.lifecycle.enum;
  assert.deepEqual(sorted(selector.values), sorted(['active', 'commercial', 'incubating', 'maintenance', 'production']));
  assert.equal(selector.values.every((value) => canonical.includes(value)), true);
  assert.equal(selector.values.includes('archived'), false);
  assert.equal(selector.values.includes('deprecated'), false);
});

test('project service facts share the profile vocabulary without copying policy', () => {
  assert.equal(projectSchema.properties.serviceFacts.items.$ref, '#/$defs/serviceFact');
  const fact = projectSchema.$defs.serviceFact;
  assert.equal(fact.additionalProperties, false);
  assert.equal(fact.properties.boundaryVersion.const, 1);
  assert.deepEqual(sorted(fact.properties.serviceRole.enum), sorted([...backendRoles, ...webRoles]));
  assert.deepEqual(sorted(fact.properties.ownedEffects.items.enum), sorted(forbiddenEffects));
  assert.deepEqual(sorted(fact.properties.implementation.enum), sorted(['other', 'rust', 'typescript-bun-next']));
  assert.equal('forbiddenEffectsForWeb' in fact.properties, false);
  assert.equal('authorityPolicy' in fact.properties, false);
});

test('fleet profile digest covers the canonical profile document', () => {
  const candidate = structuredClone(profile);
  delete candidate.profile.contentDigest;
  const digest = `sha256:${createHash('sha256').update(stableJson(candidate)).digest('hex')}`;
  assert.equal(profile.profile.contentDigest, digest);
});
