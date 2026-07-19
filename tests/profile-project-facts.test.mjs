import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const profile = JSON.parse(readFileSync(
  new URL('../skills/technology-stack-profile/references/profile.json', import.meta.url),
  'utf8',
));
const projectSchema = JSON.parse(readFileSync(
  new URL('../skills/project-manifest-standard/references/project-manifest.schema.json', import.meta.url),
  'utf8',
));

test('technology profile lifecycle selector uses project manifest vocabulary', () => {
  assert.equal(profile.profile.revision, '2026-07-19.3');
  assert.equal(profile.retirement.predecessor, 'technology-stack-profile@2026-07-18.3');
  const selector = profile.selector.matchAll.find((item) => item.fact === 'repository.lifecycle');
  const manifestValues = projectSchema.properties.project.properties.lifecycle.enum;
  assert.deepEqual(
    [...selector.values].sort(),
    ['active', 'commercial', 'incubating', 'maintenance', 'production'],
  );
  assert.equal(selector.values.every((value) => manifestValues.includes(value)), true);
});

test('project manifests expose generic component facts without copying profile policy', () => {
  const components = projectSchema.properties.architecture.properties.components;
  assert.equal(components.minProperties, 1);
  assert.equal(components.additionalProperties.$ref, '#/$defs/componentFact');
  assert.equal(components.propertyNames.$ref, '#/$defs/id');
  const fact = projectSchema.$defs.componentFact;
  assert.deepEqual(fact.required, ['role', 'implementation', 'backendOwner', 'ownedEffects']);
  assert.equal(fact.properties.role.$ref, '#/$defs/id');
  assert.equal(fact.properties.implementation.$ref, '#/$defs/id');
  assert.equal(fact.properties.ownedEffects.items.$ref, '#/$defs/id');
  assert.equal('production' in fact.properties, false);
  const bindings = projectSchema.properties.architecture.properties.profileBindings;
  assert.equal(bindings.minProperties, 1);
  assert.equal(bindings.propertyNames.$ref, '#/$defs/id');
  assert.equal(bindings.additionalProperties.$ref, '#/$defs/profileBinding');
  assert.deepEqual(projectSchema.$defs.profileBinding.required, ['revision', 'contentDigest']);
});
