#!/usr/bin/env node
/**
 * ADR Lifecycle and Retrieval Contract — parser, structural checker, resolver.
 * Derived graph/index/summary are rebuildable projections only.
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import YAML from 'yaml';

export const RESOLVER_ID = 'sylphx-skills-adr-lifecycle';
export const RESOLVER_VERSION = '1.1.0';
export const AUTHORED_STATUSES = new Set(['proposed', 'accepted', 'rejected']);
export const DECISION_MODES = new Set(['complementary', 'exclusive']);
export const CANONICAL_SCOPE_FACETS = new Set([
  'repository',
  'capability_id',
  'component_id',
  'surface',
]);

/** Explicit registry of allowed custom facet full names (not prefixes alone). */
export const REGISTERED_CUSTOM_FACETS = new Set([
  // Empty by default: any custom.* facet is unknown until registered here.
]);

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const ALLOWED_FRONTMATTER_KEYS = new Set([
  'id',
  'status',
  'date',
  'decision_owner',
  'contributors',
  'decision_mode',
  'decision_key',
  'typed_scope',
  'amends',
  'supersedes',
  'relates',
]);

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256Hex(text) {
  return createHash('sha256').update(text).digest('hex');
}

export function resolverSourceBytes(root = repositoryRoot) {
  return readFileSync(path.join(root, 'scripts/adr-lifecycle.mjs'), 'utf8');
}

export function schemaBytes(root = repositoryRoot) {
  const record = readFileSync(path.join(root, 'schemas/adr-record.schema.json'), 'utf8');
  const bundle = readFileSync(path.join(root, 'schemas/applicable-decision-bundle.schema.json'), 'utf8');
  return `${record}\n${bundle}`;
}

export function schemaDigest(root = repositoryRoot) {
  return sha256Hex(schemaBytes(root));
}

export function resolverArtifactDigest(root = repositoryRoot) {
  return sha256Hex(resolverSourceBytes(root));
}

function asStringArray(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

function normalizeRelationList(raw, field, file, errors) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) {
    errors.push(`${file}: ${field} must be an array`);
    return [];
  }
  const out = [];
  for (const entry of raw) {
    if (typeof entry === 'string') {
      out.push({ id: entry, decision_key: null });
      continue;
    }
    if (entry && typeof entry === 'object' && typeof entry.id === 'string') {
      const keys = Object.keys(entry).sort();
      for (const key of keys) {
        if (key !== 'id' && key !== 'decision_key') {
          errors.push(`${file}: ${field} entry has unknown property ${key}`);
        }
      }
      out.push({
        id: entry.id,
        decision_key: entry.decision_key == null || entry.decision_key === ''
          ? null
          : String(entry.decision_key),
      });
      continue;
    }
    errors.push(`${file}: ${field} entry must be string id or {id, decision_key?}`);
  }
  return out;
}

export function normalizeTypedScope(raw, file, errors) {
  if (raw == null) {
    errors.push(`${file}: typed_scope required`);
    return {};
  }
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    errors.push(`${file}: typed_scope must be a map`);
    return {};
  }
  const out = {};
  for (const [facet, value] of Object.entries(raw)) {
    if (facet === 'decision_key') {
      errors.push(`${file}: decision_key must be top-level, not under typed_scope`);
      continue;
    }
    const values = asStringArray(value).map(String).filter(Boolean).sort();
    if (!values.length) {
      errors.push(`${file}: typed_scope.${facet} must be non-empty when declared`);
      continue;
    }
    out[facet] = values;
  }
  return out;
}

export function idFromFilename(name) {
  return name.replace(/\.md$/i, '');
}

export function parseAdrDocument(markdown, file = 'ADR') {
  const normalized = markdown.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`${file}: missing YAML frontmatter`);
  }
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file}: unterminated YAML frontmatter`);
  const yamlText = normalized.slice(4, end);
  const body = normalized.slice(end + 5);
  let values;
  try {
    values = YAML.parse(yamlText, { uniqueKeys: true });
  } catch (error) {
    throw new Error(`${file}: YAML parse failed: ${error.message}`);
  }
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    throw new Error(`${file}: frontmatter must be a mapping`);
  }
  return { values, body, yamlText };
}

function createRecordValidator(root = repositoryRoot) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const schema = JSON.parse(readFileSync(path.join(root, 'schemas/adr-record.schema.json'), 'utf8'));
  return ajv.compile(schema);
}

function toSchemaRecord(record) {
  return {
    id: record.id,
    status: record.status,
    date: record.date || undefined,
    decision_owner: record.decision_owner,
    contributors: record.contributors,
    decision_mode: record.decision_mode,
    decision_key: record.decision_key,
    typed_scope: record.typed_scope,
    amends: record.amends.map((item) => (
      item.decision_key ? { id: item.id, decision_key: item.decision_key } : item.id
    )),
    supersedes: record.supersedes.map((item) => (
      item.decision_key ? { id: item.id, decision_key: item.decision_key } : item.id
    )),
    relates: record.relates.map((item) => item.id),
  };
}

export function loadAdrRecords(root = repositoryRoot) {
  const adrRoot = path.join(root, 'docs', 'adr');
  const errors = [];
  if (!existsSync(adrRoot)) {
    return { records: [], errors: ['docs/adr/: missing'] };
  }
  const files = readdirSync(adrRoot)
    .filter((name) => name.endsWith('.md'))
    .sort();
  const validateRecord = createRecordValidator(root);
  const records = [];

  for (const name of files) {
    const rel = path.join('docs/adr', name);
    const absolute = path.join(root, rel);
    const markdown = readFileSync(absolute, 'utf8');
    const contentDigest = sha256Hex(markdown);
    try {
      const { values } = parseAdrDocument(markdown, rel);
      for (const key of Object.keys(values)) {
        if (!ALLOWED_FRONTMATTER_KEYS.has(key)) {
          errors.push(`${rel}: unknown frontmatter field ${key}`);
        }
      }
      const localErrors = [];
      const filenameId = idFromFilename(name);
      const id = values.id != null ? String(values.id) : filenameId;
      const typed_scope = normalizeTypedScope(values.typed_scope, rel, localErrors);
      const amends = normalizeRelationList(values.amends ?? [], 'amends', rel, localErrors);
      const supersedes = normalizeRelationList(values.supersedes ?? [], 'supersedes', rel, localErrors);
      const relates = normalizeRelationList(values.relates ?? [], 'relates', rel, localErrors);
      // relates must be ids only (no partial)
      for (const edge of relates) {
        if (edge.decision_key) {
          localErrors.push(`${rel}: relates entries cannot carry decision_key`);
        }
      }
      const record = {
        file: rel,
        filename: name,
        id,
        filenameId,
        status: values.status != null ? String(values.status) : '',
        date: values.date != null ? String(values.date) : '',
        decision_owner: values.decision_owner != null ? String(values.decision_owner) : '',
        contributors: asStringArray(values.contributors),
        decision_mode: values.decision_mode != null ? String(values.decision_mode) : 'complementary',
        decision_key: values.decision_key == null || values.decision_key === ''
          ? null
          : String(values.decision_key),
        typed_scope,
        amends,
        supersedes,
        relates: relates.map((item) => ({ id: item.id, decision_key: null })),
        contentDigest,
        markdown,
      };

      const schemaRecord = toSchemaRecord(record);
      if (!validateRecord(schemaRecord)) {
        for (const err of validateRecord.errors || []) {
          localErrors.push(`${rel}: schema ${err.instancePath || '/'} ${err.message}`);
        }
      }
      errors.push(...localErrors);
      records.push(record);
    } catch (error) {
      errors.push(`${rel}: ${error.message}`);
    }
  }
  return { records, errors };
}

function scopesMayOverlap(a, b) {
  // Conservatively: if for every facet present on both, values intersect, they may overlap.
  // Facets only on one side do not prevent overlap.
  const facets = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  for (const facet of facets) {
    if (!(facet in (a || {})) || !(facet in (b || {}))) continue;
    const left = new Set(a[facet]);
    if (!b[facet].some((value) => left.has(value))) return false;
  }
  return true;
}

function amendsParents(record) {
  return record.amends.map((item) => item.id);
}

function reachesViaAmends(fromId, toId, byId, seen = new Set()) {
  if (fromId === toId) return true;
  if (seen.has(fromId)) return false;
  seen.add(fromId);
  const record = byId.get(fromId);
  if (!record) return false;
  return amendsParents(record).some((parent) => reachesViaAmends(parent, toId, byId, seen));
}

/** Same lineage only when one record is an amends ancestor/descendant of the other. */
function sameLineage(a, b, byId) {
  if (a.id === b.id) return true;
  return reachesViaAmends(a.id, b.id, byId) || reachesViaAmends(b.id, a.id, byId);
}

/**
 * Full supersession hides a target from structural exclusive-owner admission
 * only when an accepted superseder's selector may cover/overlap the target scope.
 * A disjoint-scope superseder must not globally erase the target conflict surface.
 */
function fullSupersedesTarget(records, target, byId) {
  const targetRecord = typeof target === 'string' ? byId.get(target) : target;
  if (!targetRecord) return false;
  for (const record of records) {
    if (record.status !== 'accepted') continue;
    for (const edge of record.supersedes) {
      if (edge.id !== targetRecord.id || edge.decision_key) continue;
      if (scopesMayOverlap(record.typed_scope, targetRecord.typed_scope)) return true;
    }
  }
  return false;
}

export function validateAdrCorpus(records, parseErrors = []) {
  const errors = [...parseErrors];
  const byId = new Map();
  for (const record of records) {
    if (byId.has(record.id)) {
      errors.push(`${record.file}: duplicate id ${record.id} (also ${byId.get(record.id).file})`);
    } else {
      byId.set(record.id, record);
    }
    if (record.id !== record.filenameId) {
      errors.push(`${record.file}: id ${record.id} does not match filename stem ${record.filenameId}`);
    }
    if (!AUTHORED_STATUSES.has(record.status)) {
      errors.push(`${record.file}: illegal authored status ${JSON.stringify(record.status)}`);
    }
    if (!record.decision_owner) {
      errors.push(`${record.file}: missing decision_owner`);
    }
    if (!DECISION_MODES.has(record.decision_mode)) {
      errors.push(`${record.file}: illegal decision_mode ${JSON.stringify(record.decision_mode)}`);
    }
    if (record.decision_mode === 'exclusive' && !record.decision_key) {
      errors.push(`${record.file}: exclusive decision_mode requires decision_key`);
    }
    if (!record.typed_scope.repository?.length) {
      errors.push(`${record.file}: typed_scope.repository required`);
    }
    for (const facet of Object.keys(record.typed_scope)) {
      if (facet.startsWith('custom.')) {
        if (!REGISTERED_CUSTOM_FACETS.has(facet)) {
          errors.push(`${record.file}: unregistered custom facet ${facet}`);
        }
      } else if (!CANONICAL_SCOPE_FACETS.has(facet)) {
        errors.push(`${record.file}: unknown scope facet ${facet}`);
      }
    }
  }

  for (const record of records) {
    for (const rel of record.amends) {
      if (!byId.has(rel.id)) errors.push(`${record.file}: amends dangling target ${rel.id}`);
    }
    for (const rel of record.supersedes) {
      if (!byId.has(rel.id)) errors.push(`${record.file}: supersedes dangling target ${rel.id}`);
    }
    for (const rel of record.relates) {
      if (!byId.has(rel.id)) errors.push(`${record.file}: relates dangling target ${rel.id}`);
    }
  }

  function detectCycles(adj, label) {
    const visiting = new Set();
    const visited = new Set();
    function visit(id, stack) {
      if (visiting.has(id)) {
        errors.push(`${label} cycle detected: ${[...stack, id].join(' -> ')}`);
        return;
      }
      if (visited.has(id)) return;
      visiting.add(id);
      for (const next of adj.get(id) || []) visit(next, [...stack, id]);
      visiting.delete(id);
      visited.add(id);
    }
    for (const id of adj.keys()) visit(id, []);
  }

  detectCycles(
    new Map(records.map((record) => [record.id, record.amends.map((item) => item.id)])),
    'amends',
  );
  detectCycles(
    new Map(records.map((record) => [record.id, record.supersedes.map((item) => item.id)])),
    'supersedes',
  );

  // Exclusive ownership: only among accepted, not full-superseded, scope-overlapping, not same lineage
  const exclusive = records.filter(
    (record) => record.decision_mode === 'exclusive'
      && record.status === 'accepted'
      && record.decision_key
      && !fullSupersedesTarget(records, record, byId),
  );
  for (let i = 0; i < exclusive.length; i += 1) {
    for (let j = i + 1; j < exclusive.length; j += 1) {
      const left = exclusive[i];
      const right = exclusive[j];
      if (left.decision_key !== right.decision_key) continue;
      if (sameLineage(left, right, byId)) continue;
      if (!scopesMayOverlap(left.typed_scope, right.typed_scope)) continue;
      errors.push(
        `exclusive decision_key ${left.decision_key} has multiple current owners with overlapping scope: ${left.id}, ${right.id}`,
      );
    }
  }

  // Sibling amendment conflicts (admission): exclusive same key under same parent without chain
  const childrenByParent = new Map();
  for (const record of records) {
    if (record.status !== 'accepted') continue;
    for (const parent of amendsParents(record)) {
      const list = childrenByParent.get(parent) || [];
      list.push(record);
      childrenByParent.set(parent, list);
    }
  }
  for (const [parent, siblings] of childrenByParent.entries()) {
    for (let i = 0; i < siblings.length; i += 1) {
      for (let j = i + 1; j < siblings.length; j += 1) {
        const a = siblings[i];
        const b = siblings[j];
        const chained = a.amends.some((edge) => edge.id === b.id) || b.amends.some((edge) => edge.id === a.id);
        if (chained) continue;
        if (
          a.decision_mode === 'exclusive'
          && b.decision_mode === 'exclusive'
          && a.decision_key
          && a.decision_key === b.decision_key
        ) {
          errors.push(
            `sibling amendment conflict under ${parent}: ${a.id} and ${b.id} share exclusive decision_key ${a.decision_key} without amends chain`,
          );
        }
      }
    }
  }

  // Numeric short locator collisions
  const shortLocators = new Map();
  for (const record of records) {
    const match = record.id.match(/^(ADR-\d{4})(?:-|$)/);
    if (!match) continue;
    const list = shortLocators.get(match[1]) || [];
    list.push(record.filename);
    shortLocators.set(match[1], list);
  }
  for (const [locator, names] of shortLocators.entries()) {
    if (new Set(names).size > 1) {
      errors.push(`docs/adr/: locator ${locator} used by ${[...new Set(names)].join(', ')}`);
    }
  }

  return { errors, byId };
}

/**
 * Scope matching:
 * - AND across declared facets on the selector
 * - OR within values of the same facet
 * - omitted facet on selector = unconstrained
 * - missing task value for a declared facet = unresolved
 * - unregistered custom facet = unresolved
 */
export function matchTypedScope(selector, taskScope) {
  if (!selector || typeof selector !== 'object') {
    return { match: false, unresolved: true, reasons: ['selector missing'] };
  }
  const task = taskScope || {};
  for (const [facet, rawValues] of Object.entries(selector)) {
    const values = asStringArray(rawValues);
    if (!values.length) continue;
    if (facet.startsWith('custom.')) {
      if (!REGISTERED_CUSTOM_FACETS.has(facet)) {
        return {
          match: false,
          unresolved: true,
          reasons: [`unregistered custom facet ${facet}`],
        };
      }
    }
    if (!Object.prototype.hasOwnProperty.call(task, facet)) {
      return {
        match: false,
        unresolved: true,
        reasons: [`task missing required facet ${facet}`],
      };
    }
    const taskValues = new Set(asStringArray(task[facet]));
    // If task supplies an unregistered custom facet, unresolved when selector uses it (handled above)
    if (facet.startsWith('custom.') && !REGISTERED_CUSTOM_FACETS.has(facet)) {
      return {
        match: false,
        unresolved: true,
        reasons: [`unregistered custom facet ${facet}`],
      };
    }
    const hit = values.some((value) => taskValues.has(value));
    if (!hit) {
      return { match: false, unresolved: false, reasons: [`no overlap on ${facet}`] };
    }
  }
  // Task-only unregistered custom facets do not affect match unless selector used them
  for (const facet of Object.keys(task)) {
    if (facet.startsWith('custom.') && !REGISTERED_CUSTOM_FACETS.has(facet)) {
      // If task declares unknown custom facet as part of selection intent, treat unresolved
      // only when selector also constrains custom facets or task is exclusively using unknown.
      // Contract: unknown custom namespace never silently ignored when present on selector.
      // Presence only on task: ignore for match of canonical selectors.
    }
  }
  return { match: true, unresolved: false, reasons: [] };
}

export function orderAmendments(baseId, amendmentRecords) {
  const set = new Map(amendmentRecords.map((record) => [record.id, record]));
  const unresolved = [];
  const childrenByParent = new Map();
  for (const record of amendmentRecords) {
    for (const parent of amendsParents(record)) {
      if (!set.has(parent) && parent !== baseId) continue;
      const list = childrenByParent.get(parent) || [];
      list.push(record);
      childrenByParent.set(parent, list);
    }
  }
  for (const [, siblings] of childrenByParent.entries()) {
    for (let i = 0; i < siblings.length; i += 1) {
      for (let j = i + 1; j < siblings.length; j += 1) {
        const a = siblings[i];
        const b = siblings[j];
        const chained = a.amends.some((edge) => edge.id === b.id)
          || b.amends.some((edge) => edge.id === a.id);
        if (chained) continue;
        if (
          a.decision_mode === 'exclusive'
          && b.decision_mode === 'exclusive'
          && a.decision_key
          && a.decision_key === b.decision_key
        ) {
          unresolved.push({
            ids: [a.id, b.id].sort(),
            reason: 'sibling_amendment_conflict_requires_explicit_chain',
          });
        }
      }
    }
  }

  const ordered = [];
  const visited = new Set();
  const visiting = new Set();
  let cycle = false;
  function dfs(id) {
    if (visited.has(id)) return;
    if (visiting.has(id)) {
      cycle = true;
      return;
    }
    visiting.add(id);
    const record = set.get(id);
    if (record) {
      const parents = amendsParents(record).filter((parent) => set.has(parent)).sort();
      for (const parent of parents) dfs(parent);
      ordered.push(record);
    }
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of [...set.keys()].sort()) dfs(id);
  if (cycle) unresolved.push({ ids: [...set.keys()].sort(), reason: 'amends_cycle_in_bundle' });
  return { ordered, unresolved };
}

function sourceRef(record) {
  return {
    id: record.id,
    file: record.file,
    contentDigest: record.contentDigest,
  };
}

function reachesBaseLocal(record, baseId, byId, seen = new Set()) {
  if (seen.has(record.id)) return false;
  seen.add(record.id);
  for (const parent of amendsParents(record)) {
    if (parent === baseId) return true;
    const parentRecord = byId.get(parent);
    if (parentRecord?.amends?.length && reachesBaseLocal(parentRecord, baseId, byId, seen)) {
      return true;
    }
  }
  return false;
}

function normalizeTaskScope(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const out = {};
  for (const [facet, value] of Object.entries(raw)) {
    out[facet] = asStringArray(value).slice().sort();
  }
  return out;
}

function classifyUnresolvedDisposition(item, taskScope, exclusiveKeysInPlay) {
  const reason = item.reason || '';
  if (
    reason === 'exclusive_decision_key_conflict'
    || reason === 'sibling_amendment_conflict_requires_explicit_chain'
    || reason === 'amends_cycle_in_bundle'
    || reason === 'illegal_or_missing_status'
  ) {
    return 'block';
  }
  if (reason === 'scope_unresolved' || reason === 'unregistered_custom_facet' || reason === 'superseder_scope_unresolved') {
    // cannot decide intersection → scoped-block that decision
    return 'scoped-block';
  }
  if (reason === 'missing_source_revision') {
    return 'block';
  }
  // if unresolved id shares exclusive key with task-relevant keys
  if (item.decision_key && exclusiveKeysInPlay.has(item.decision_key)) {
    return 'block';
  }
  return 'warn';
}

export function resolveApplicableDecisionBundle(task, records, options = {}) {
  const root = options.root || repositoryRoot;
  if (!options.source_revision || String(options.source_revision).trim() === '') {
    return {
      task_scope: {},
      base_sources: [],
      ordered_amendment_sources: [],
      applicable_decision_keys: [],
      supersession_edges: [],
      unresolved_sources: [{
        id: null,
        reason: 'missing_source_revision',
        disposition: 'block',
        details: ['source_revision is required for exact resolve'],
      }],
      excluded_sources: [],
      provenance: {
        source_revision: null,
        resolver_id: RESOLVER_ID,
        resolver_version: RESOLVER_VERSION,
        input_digest: sha256Hex('missing_source_revision'),
        schema_digest: schemaDigest(root),
        resolver_artifact_digest: resolverArtifactDigest(root),
        corpus_digest: null,
      },
    };
  }

  const defaultRepository = options.repository || 'SylphxAI/skills';
  const provided = normalizeTaskScope(task.typed_scope || task.scope || {});
  const taskScope = {
    repository: provided.repository || [defaultRepository],
    ...provided,
  };
  // ensure repository array if overridden
  if (!taskScope.repository) taskScope.repository = [defaultRepository];

  const byId = new Map(records.map((record) => [record.id, record]));
  const base_sources = [];
  const ordered_amendment_sources = [];
  const applicable_decision_keys = [];
  const supersession_edges = [];
  const unresolved_sources = [];
  const excluded_sources = [];

  // Collect supersession edges from accepted records that match task scope
  for (const record of records) {
    if (record.status !== 'accepted') continue;
    const scopeHit = matchTypedScope(record.typed_scope, taskScope);
    if (scopeHit.unresolved) {
      if (record.supersedes.length) {
        unresolved_sources.push({
          id: record.id,
          file: record.file,
          contentDigest: record.contentDigest,
          reason: 'superseder_scope_unresolved',
          details: scopeHit.reasons,
        });
      }
      continue;
    }
    if (!scopeHit.match) continue;
    for (const edge of record.supersedes) {
      supersession_edges.push({
        from: record.id,
        to: edge.id,
        decision_key: edge.decision_key,
        full: !edge.decision_key,
      });
    }
  }

  // Full supersession edges persist even if superseder is later superseded —
  // collect ALL full edges from accepted records (not only scope-matching)?
  // Contract: "authored by an accepted, scope-matching record".
  // So only scope-matching superseders contribute for this task.
  const fullSuperseded = new Set(
    supersession_edges.filter((edge) => edge.full).map((edge) => edge.to),
  );

  const matching = [];
  for (const record of records) {
    if (record.status === 'proposed' || record.status === 'rejected') {
      excluded_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason: `status_${record.status}`,
      });
      continue;
    }
    if (record.status !== 'accepted') {
      unresolved_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason: 'illegal_or_missing_status',
      });
      continue;
    }
    if (fullSuperseded.has(record.id)) {
      excluded_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason: 'full_superseded',
      });
      continue;
    }
    const scopeHit = matchTypedScope(record.typed_scope, taskScope);
    if (scopeHit.unresolved) {
      const reason = scopeHit.reasons.some((item) => item.startsWith('unregistered'))
        ? 'unregistered_custom_facet'
        : 'scope_unresolved';
      unresolved_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason,
        details: scopeHit.reasons,
        decision_key: record.decision_key,
      });
      continue;
    }
    if (!scopeHit.match) {
      excluded_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason: 'scope_no_match',
        details: scopeHit.reasons,
      });
      continue;
    }
    matching.push(record);
  }

  const matchingIds = new Set(matching.map((record) => record.id));
  const candidateBases = matching.filter((record) => {
    if (!record.amends.length) return true;
    return !record.amends.some((edge) => matchingIds.has(edge.id));
  });
  const candidateBaseIds = new Set(candidateBases.map((record) => record.id));

  for (const base of candidateBases) {
    base_sources.push(sourceRef(base));
    if (base.decision_key) applicable_decision_keys.push(base.decision_key);
  }

  const amendmentCandidates = matching.filter((record) => !candidateBaseIds.has(record.id));
  const usedAmendments = new Set();
  for (const base of [...candidateBases].sort((a, b) => a.id.localeCompare(b.id))) {
    const related = amendmentCandidates.filter((record) => reachesBaseLocal(record, base.id, byId));
    const { ordered, unresolved } = orderAmendments(base.id, related);
    for (const item of unresolved) {
      unresolved_sources.push({
        id: item.ids.join('+'),
        reason: item.reason,
        details: item.ids,
        decision_key: null,
      });
    }
    for (const amendment of ordered) {
      if (usedAmendments.has(amendment.id)) continue;
      usedAmendments.add(amendment.id);
      ordered_amendment_sources.push(sourceRef(amendment));
      if (amendment.decision_key) applicable_decision_keys.push(amendment.decision_key);
    }
  }

  // Exclusive key conflicts in applicable set: ignore same lineage (base+amendment chain)
  const applicableRecords = [...base_sources, ...ordered_amendment_sources]
    .map((ref) => byId.get(ref.id))
    .filter(Boolean);
  const byKey = new Map();
  for (const record of applicableRecords) {
    if (record.decision_mode !== 'exclusive' || !record.decision_key) continue;
    const list = byKey.get(record.decision_key) || [];
    list.push(record);
    byKey.set(record.decision_key, list);
  }
  for (const [key, owners] of byKey.entries()) {
    const unique = [];
    for (const owner of owners) {
      if (unique.some((existing) => sameLineage(existing, owner, byId))) continue;
      unique.push(owner);
    }
    // merge lineage groups
    const groups = [];
    for (const owner of owners) {
      let found = false;
      for (const group of groups) {
        if (group.some((member) => sameLineage(member, owner, byId))) {
          group.push(owner);
          found = true;
          break;
        }
      }
      if (!found) groups.push([owner]);
    }
    if (groups.length > 1) {
      unresolved_sources.push({
        id: key,
        reason: 'exclusive_decision_key_conflict',
        details: groups.map((group) => group.map((item) => item.id).sort()),
        decision_key: key,
      });
    }
  }

  const exclusiveKeysInPlay = new Set(
    applicable_decision_keys.concat(
      unresolved_sources.map((item) => item.decision_key).filter(Boolean),
    ),
  );

  const unresolvedWithDisposition = unresolved_sources
    .map((item) => ({
      ...item,
      disposition: classifyUnresolvedDisposition(item, taskScope, exclusiveKeysInPlay),
    }))
    .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b)));

  const bundleCore = {
    task_scope: taskScope,
    base_sources: [...base_sources].sort((a, b) => a.id.localeCompare(b.id)),
    ordered_amendment_sources,
    applicable_decision_keys: [...new Set(applicable_decision_keys)].sort(),
    supersession_edges: supersession_edges
      .map((edge) => ({ ...edge }))
      .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))),
    unresolved_sources: unresolvedWithDisposition,
    excluded_sources: excluded_sources
      .map((item) => ({ ...item }))
      .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))),
  };

  const corpusDigest = sha256Hex(
    stableStringify({
      records: records
        .map((record) => ({ id: record.id, contentDigest: record.contentDigest }))
        .sort((a, b) => a.id.localeCompare(b.id)),
    }),
  );
  const input_digest = sha256Hex(
    stableStringify({
      task_scope: taskScope,
      profiles: options.profiles || null,
      corpusDigest,
      source_revision: String(options.source_revision),
    }),
  );

  return {
    ...bundleCore,
    provenance: {
      source_revision: String(options.source_revision),
      resolver_id: RESOLVER_ID,
      resolver_version: RESOLVER_VERSION,
      input_digest,
      schema_digest: schemaDigest(root),
      resolver_artifact_digest: resolverArtifactDigest(root),
      corpus_digest: corpusDigest,
    },
  };
}

export function buildAdrIndexProjection(records) {
  return {
    schemaVersion: 1,
    non_authoritative: true,
    generated_by: RESOLVER_ID,
    resolver_version: RESOLVER_VERSION,
    count: records.length,
    records: records
      .map((record) => ({
        id: record.id,
        file: record.file,
        status: record.status,
        decision_owner: record.decision_owner,
        decision_mode: record.decision_mode,
        decision_key: record.decision_key,
        typed_scope: record.typed_scope,
        amends: record.amends.map((item) => item.id),
        supersedes: record.supersedes.map((item) => (
          item.decision_key
            ? { id: item.id, decision_key: item.decision_key }
            : { id: item.id }
        )),
        contentDigest: record.contentDigest,
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
}

export function adrIndexBytes(records) {
  return `${JSON.stringify(buildAdrIndexProjection(records), null, 2)}\n`;
}

export function checkAdrLifecycle(root = repositoryRoot) {
  const { records, errors: parseErrors } = loadAdrRecords(root);
  const { errors } = validateAdrCorpus(records, parseErrors);

  const indexPath = path.join(root, 'docs/adr/INDEX.json');
  const expectedIndex = adrIndexBytes(records);
  if (!existsSync(indexPath) || readFileSync(indexPath, 'utf8') !== expectedIndex) {
    errors.push('docs/adr/INDEX.json is stale; regenerate with scripts/adr-lifecycle.mjs --write-index');
  }

  return { errors, records };
}

export function writeAdrIndex(root = repositoryRoot) {
  const { records, errors } = loadAdrRecords(root);
  if (errors.length) {
    throw new Error(`cannot write index: ${errors.join('; ')}`);
  }
  const bytes = adrIndexBytes(records);
  writeFileSync(path.join(root, 'docs/adr/INDEX.json'), bytes);
  return records.length;
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--write-index')) {
    const count = writeAdrIndex();
    console.log(`wrote docs/adr/INDEX.json (${count} records)`);
    process.exit(0);
  }
  const { errors, records } = checkAdrLifecycle();
  if (errors.length) {
    console.error(`ADR lifecycle check failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`ADR lifecycle ok: ${records.length} records`);
}
