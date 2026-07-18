import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import {
  validateActiveProfileCollisions,
  validateActiveProfileMetadata,
  validateTechnologyStackProfile,
} from '../scripts/check.mjs';

const profile = JSON.parse(readFileSync(new URL('../skills/technology-stack-profile/references/profile.json', import.meta.url), 'utf8'));
const profileSchema = JSON.parse(readFileSync(new URL('../skills/technology-stack-profile/references/enterprise-profile.schema.json', import.meta.url), 'utf8'));
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

test('technology profile binds the canonical role and effect boundary', () => {
  assert.equal(profile.profile.revision, '2026-07-18.2');
  assert.equal(profile.profile.predecessor, undefined);
  assert.equal(profile.retirement.predecessor, 'technology-stack-profile@2026-07-18.1');
  const defaults = new Map(profile.defaults.map((item) => [item.key, item]));
  assert.equal(defaults.get('engineering.language.backend-required-technology').value, 'rust');
  assert.deepEqual(sorted(defaults.get('engineering.language.backend-required-technology').appliesToRoles), sorted(backendRoles));
  assert.equal(defaults.get('engineering.language.web-required-technology').value, 'typescript-bun-next');
  assert.deepEqual(sorted(defaults.get('engineering.language.web-required-technology').appliesToRoles), sorted(webRoles));
  assert.equal(defaults.get('engineering.language.completion-measure').value, 'service-role-and-effect-coverage');
  assert.deepEqual(sorted(defaults.get('engineering.language.completion-measure').appliesToRoles), sorted([...backendRoles, ...webRoles]));
  assert.deepEqual(sorted(profile.forbiddenEffectsForWeb), sorted(forbiddenEffects));
  assert.deepEqual(profile.exceptionPolicy.exceptableDefaults, []);
  assert.equal(profile.selector.unknownFactPolicy, 'fail-closed');
});

test('technology profile selector uses only canonical operational project lifecycles', () => {
  const selector = profile.selector.matchAll.find((item) => item.fact === 'repository.lifecycle');
  const canonical = projectSchema.properties.project.properties.lifecycle.enum;
  assert.deepEqual(sorted(selector.values), sorted(['active', 'commercial', 'incubating', 'maintenance', 'production']));
  assert.equal(selector.values.every((value) => canonical.includes(value)), true);
  assert.equal(selector.values.includes('archived'), false);
  assert.equal(selector.values.includes('deprecated'), false);
});

test('project service facts bind exact profile identity and unique component keys without copying policy', () => {
  const envelope = projectSchema.properties.serviceFacts;
  assert.equal(envelope.properties.vocabularyVersion.const, 1);
  assert.equal(envelope.properties.profile.$ref, '#/$defs/profileBinding');
  assert.equal(envelope.properties.components.minProperties, 1);
  assert.equal(envelope.properties.components.additionalProperties.$ref, '#/$defs/serviceFact');
  assert.deepEqual(sorted(projectSchema.$defs.profileBinding.required), sorted(['id', 'revision', 'contentDigest']));
  const fact = projectSchema.$defs.serviceFact;
  assert.equal(fact.additionalProperties, false);
  assert.deepEqual(sorted(fact.properties.serviceRole.enum), sorted([...backendRoles, ...webRoles]));
  assert.deepEqual(sorted(fact.properties.ownedEffects.items.enum), sorted(forbiddenEffects));
  assert.deepEqual(sorted(fact.properties.implementation.enum), sorted(['other', 'rust', 'typescript-bun-next']));
  assert.deepEqual(sorted(fact.properties.declaredProductionAuthorityScope.enum), sorted(['in-scope', 'out-of-scope']));
  assert.equal('production' in fact.properties, false);
  assert.equal('componentId' in fact.properties, false);
  assert.equal('forbiddenEffectsForWeb' in fact.properties, false);
  assert.equal('authorityPolicy' in fact.properties, false);
});

test('service fact envelope rejects missing, empty, and stale-unbound projections', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  const validate = ajv.compile({
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $defs: projectSchema.$defs,
    ...projectSchema.properties.serviceFacts,
  });
  const valid = {
    vocabularyVersion: 1,
    profile: {
      id: profile.profile.id,
      revision: profile.profile.revision,
      contentDigest: profile.profile.contentDigest,
    },
    components: {
      'product-web': {
        serviceRole: 'product-web',
        implementation: 'typescript-bun-next',
        declaredProductionAuthorityScope: 'in-scope',
        backendOwner: { repository: 'SylphxAI/platform', componentId: 'api' },
        ownedEffects: [],
      },
    },
  };
  assert.equal(validate(valid), true, JSON.stringify(validate.errors));
  assert.equal(validate({ ...valid, components: {} }), false);
  const unbound = structuredClone(valid);
  delete unbound.profile;
  assert.equal(validate(unbound), false);
});

test('schema and active-profile admission reject authority-state mutations', () => {
  const ajv = new Ajv2020({ allErrors: true, strict: true, allowUnionTypes: true });
  addFormats(ajv);
  const validate = ajv.compile(profileSchema);
  assert.equal(validate(profile), true, JSON.stringify(validate.errors));
  const missingEffects = structuredClone(profile);
  delete missingEffects.forbiddenEffectsForWeb;
  assert.equal(validate(missingEffects), false);
  const illegalAuthority = structuredClone(profile);
  illegalAuthority.profile.authorityClass = 'local-policy-fork';
  assert.equal(validate(illegalAuthority), false);
  const candidate = structuredClone(profile);
  candidate.profile.lifecycle = 'candidate';
  assert.equal(validate(candidate), true);
  const admissionErrors = [];
  validateActiveProfileMetadata(candidate, 'technology-stack-profile', admissionErrors, '2026-07-18');
  assert.equal(admissionErrors.some((finding) => finding.includes('must be active')), true);
});

test('technology profile structural gate and active-profile collision check fail closed', () => {
  const structuralErrors = [];
  validateTechnologyStackProfile(profile, structuralErrors, projectSchema);
  assert.deepEqual(structuralErrors, []);

  const overlap = structuredClone(profile);
  overlap.profile.id = 'overlapping-profile';
  const collisionErrors = [];
  validateActiveProfileCollisions([
    { folder: 'technology-stack-profile', document: profile },
    { folder: 'overlapping-profile', document: overlap },
  ], collisionErrors);
  assert.equal(collisionErrors.length, 1);

  overlap.selector.matchAll.find((item) => item.fact === 'organization').values = ['non-overlap'];
  const disjointErrors = [];
  validateActiveProfileCollisions([
    { folder: 'technology-stack-profile', document: profile },
    { folder: 'overlapping-profile', document: overlap },
  ], disjointErrors);
  assert.deepEqual(disjointErrors, []);
});

test('technology profile digest covers the canonical profile document', () => {
  const candidate = structuredClone(profile);
  delete candidate.profile.contentDigest;
  const digest = `sha256:${createHash('sha256').update(stableJson(candidate)).digest('hex')}`;
  assert.equal(profile.profile.contentDigest, digest);
});
