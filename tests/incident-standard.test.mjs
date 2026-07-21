import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const schema = JSON.parse(readFileSync(
  new URL('../skills/incident-standard/references/active-incident-record.schema.json', import.meta.url),
  'utf8',
));
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

function activeIncident() {
  return {
    schemaVersion: 'active-incident-record.v1',
    incidentId: 'inc_01KXYZ',
    severity: 'S2',
    status: 'mitigating',
    commandOwner: 'agent:on-call',
    affectedCapabilities: ['checkout'],
    scope: 'one tenant cohort',
    impact: 'checkout requests intermittently fail',
    mitigation: {
      state: 'in-progress',
      owner: 'agent:recovery',
      action: 'roll back the exact deployed candidate',
      evidenceRefs: ['evidence:deploy-readback'],
    },
    actions: [{
      id: 'action-1',
      owner: 'agent:recovery',
      state: 'in-progress',
      action: 'verify error-rate recovery',
      evidenceRefs: [],
    }],
    nextDecision: {
      owner: 'agent:on-call',
      dueAt: '2026-07-21T13:00:00.000Z',
      predicate: 'error rate returns below the declared threshold',
    },
    openedAt: '2026-07-21T12:45:00.000Z',
    updatedAt: '2026-07-21T12:50:00.000Z',
    evidenceRefs: ['evidence:alert-123'],
  };
}

test('active incident command record represents current ownership, action, and next decision', () => {
  assert.equal(validate(activeIncident()), true, JSON.stringify(validate.errors));
});

test('active incident command record fails closed without a command owner', () => {
  const record = activeIncident();
  delete record.commandOwner;
  assert.equal(validate(record), false);
  assert.ok(validate.errors.some(({ instancePath, keyword }) =>
    instancePath === '' && keyword === 'required'));
});
