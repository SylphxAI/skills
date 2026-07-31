#!/usr/bin/env node
/**
 * ADR Lifecycle and Retrieval Contract — parser, structural checker, resolver.
 * Derived graph/index/summary are rebuildable projections only.
 */

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RESOLVER_ID = 'sylphx-skills-adr-lifecycle';
export const RESOLVER_VERSION = '1.0.0';
export const AUTHORED_STATUSES = new Set(['proposed', 'accepted', 'rejected']);
export const DECISION_MODES = new Set(['complementary', 'exclusive']);
export const CANONICAL_SCOPE_FACETS = new Set([
  'repository',
  'capability_id',
  'component_id',
  'surface',
]);

export const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

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

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"'))
    || (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseInlineArray(raw) {
  const inner = raw.slice(1, -1).trim();
  if (!inner) return [];
  return inner.split(',').map((part) => stripQuotes(part.trim())).filter(Boolean);
}

/**
 * Minimal YAML subset for ADR frontmatter:
 * scalars, inline arrays, block arrays, one-level nested maps of arrays/scalars.
 */
export function parseAdrFrontmatter(markdown, file = 'ADR') {
  const normalized = markdown.replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    throw new Error(`${file}: missing YAML frontmatter`);
  }
  const end = normalized.indexOf('\n---\n', 4);
  if (end < 0) throw new Error(`${file}: unterminated YAML frontmatter`);
  const body = normalized.slice(end + 5);
  const lines = normalized.slice(4, end).split('\n');
  const values = {};
  let i = 0;

  function parseValueToken(token) {
    const t = token.trim();
    if (!t) return '';
    if (t.startsWith('[') && t.endsWith(']')) return parseInlineArray(t);
    if (t === '[]') return [];
    if (t === '{}' ) return {};
    return stripQuotes(t);
  }

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }
    if (/^\s/.test(line)) {
      throw new Error(`${file}: unexpected indent at ${JSON.stringify(line)}`);
    }
    const colon = line.indexOf(':');
    if (colon < 1) throw new Error(`${file}: invalid frontmatter line ${JSON.stringify(line)}`);
    const key = line.slice(0, colon).trim();
    const rest = line.slice(colon + 1);
    if (rest.trim() !== '') {
      values[key] = parseValueToken(rest);
      i += 1;
      continue;
    }
    // nested block
    i += 1;
    const nested = {};
    const list = [];
    let mode = null; // 'map' | 'list'
    while (i < lines.length) {
      const child = lines[i];
      if (!child.trim()) {
        i += 1;
        continue;
      }
      if (!/^\s/.test(child)) break;
      const indent = child.match(/^(\s*)/)[1].length;
      if (indent < 2) break;
      const trimmed = child.trim();
      if (trimmed.startsWith('- ')) {
        if (mode === 'map') throw new Error(`${file}: mixed list/map under ${key}`);
        mode = 'list';
        list.push(parseValueToken(trimmed.slice(2)));
        i += 1;
        continue;
      }
      const childColon = trimmed.indexOf(':');
      if (childColon < 1) throw new Error(`${file}: invalid nested line ${JSON.stringify(child)}`);
      if (mode === 'list') throw new Error(`${file}: mixed list/map under ${key}`);
      mode = 'map';
      const childKey = trimmed.slice(0, childColon).trim();
      const childRest = trimmed.slice(childColon + 1);
      if (childRest.trim() !== '') {
        nested[childKey] = parseValueToken(childRest);
        i += 1;
        continue;
      }
      // nested list under map key
      i += 1;
      const nestedList = [];
      while (i < lines.length) {
        const grand = lines[i];
        if (!grand.trim()) {
          i += 1;
          continue;
        }
        const gIndent = grand.match(/^(\s*)/)[1].length;
        if (gIndent < indent + 2) break;
        const gTrim = grand.trim();
        if (!gTrim.startsWith('- ')) {
          throw new Error(`${file}: expected list under ${key}.${childKey}`);
        }
        nestedList.push(parseValueToken(gTrim.slice(2)));
        i += 1;
      }
      nested[childKey] = nestedList;
    }
    values[key] = mode === 'list' ? list : nested;
  }

  return { values, body, rawFrontmatter: normalized.slice(0, end + 5) };
}

function asStringArray(value) {
  if (value == null || value === '') return [];
  if (Array.isArray(value)) return value.map(String);
  return [String(value)];
}

function normalizeRelationEntry(entry) {
  if (entry == null) return null;
  if (typeof entry === 'string') {
    return { id: entry, decision_key: null };
  }
  if (typeof entry === 'object' && entry.id) {
    return {
      id: String(entry.id),
      decision_key: entry.decision_key ? String(entry.decision_key) : null,
    };
  }
  return null;
}

export function normalizeTypedScope(raw) {
  if (raw == null || raw === '') return {};
  if (typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('typed_scope must be a map of facet -> values');
  }
  const out = {};
  for (const [facet, value] of Object.entries(raw)) {
    out[facet] = asStringArray(value).slice().sort();
  }
  return out;
}

export function idFromFilename(name) {
  // Full filename stem is the stable id (avoids date-prefix collisions).
  return name.replace(/\.md$/i, '');
}

export function loadAdrRecords(root = repositoryRoot) {
  const adrRoot = path.join(root, 'docs', 'adr');
  if (!existsSync(adrRoot)) {
    return { records: [], errors: ['docs/adr/: missing'] };
  }
  const files = readdirSync(adrRoot).filter((name) => name.endsWith('.md')).sort();
  const records = [];
  const errors = [];
  for (const name of files) {
    const rel = path.join('docs/adr', name);
    const absolute = path.join(root, rel);
    const markdown = readFileSync(absolute, 'utf8');
    const contentDigest = sha256Hex(markdown);
    try {
      const { values, body } = parseAdrFrontmatter(markdown, rel);
      const filenameId = idFromFilename(name);
      const id = values.id ? String(values.id) : filenameId;
      let typed_scope;
      try {
        typed_scope = normalizeTypedScope(values.typed_scope);
      } catch (error) {
        errors.push(`${rel}: ${error.message}`);
        typed_scope = {};
      }
      const amends = asStringArray(values.amends).map((idValue) => ({ id: idValue, decision_key: null }));
      // supersedes may be list of strings or list of {id, decision_key} — our parser only gives strings/lists of strings unless nested maps in list which we don't support well
      // Support supersedes as string list (full). Partial via supersedes_partial map optional.
      const supersedes = asStringArray(values.supersedes).map((idValue) => ({
        id: idValue,
        decision_key: null,
      }));
      if (values.supersedes_partial && typeof values.supersedes_partial === 'object') {
        for (const [target, key] of Object.entries(values.supersedes_partial)) {
          supersedes.push({ id: String(target), decision_key: String(key) });
        }
      }
      const relates = asStringArray(values.relates).map((idValue) => ({ id: idValue, decision_key: null }));
      const record = {
        file: rel,
        filename: name,
        id,
        filenameId,
        status: values.status ? String(values.status) : '',
        date: values.date ? String(values.date) : '',
        decision_owner: values.decision_owner ? String(values.decision_owner) : '',
        contributors: asStringArray(values.contributors),
        decision_mode: values.decision_mode ? String(values.decision_mode) : 'complementary',
        decision_key: values.decision_key ? String(values.decision_key) : null,
        typed_scope,
        amends,
        supersedes,
        relates,
        body,
        contentDigest,
        markdown,
      };
      records.push(record);
    } catch (error) {
      errors.push(`${rel}: ${error.message}`);
    }
  }
  return { records, errors };
}

export function validateAdrCorpus(records, parseErrors = [], options = {}) {
  const errors = [...parseErrors];
  const byId = new Map();
  for (const record of records) {
    if (byId.has(record.id)) {
      errors.push(`${record.file}: duplicate id ${record.id} (also ${byId.get(record.id).file})`);
    } else {
      byId.set(record.id, record);
    }
    if (record.id !== record.filenameId) {
      errors.push(`${record.file}: id ${record.id} does not match filename locator ${record.filenameId}`);
    }
    if (!AUTHORED_STATUSES.has(record.status)) {
      errors.push(`${record.file}: illegal authored status ${JSON.stringify(record.status)} (allowed: proposed|accepted|rejected)`);
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
    if (record.decision_mode === 'complementary' && record.decision_key) {
      // allowed but unusual; ok
    }
    if (!record.typed_scope || Object.keys(record.typed_scope).length === 0) {
      errors.push(`${record.file}: typed_scope required`);
    } else {
      for (const facet of Object.keys(record.typed_scope)) {
        if (facet.startsWith('custom.')) continue;
        if (!CANONICAL_SCOPE_FACETS.has(facet)) {
          errors.push(`${record.file}: unknown scope facet ${facet} (use canonical facets or custom.<ns>.*)`);
        }
        if (!record.typed_scope[facet].length) {
          errors.push(`${record.file}: typed_scope.${facet} must be non-empty when declared`);
        }
      }
    }
    for (const rel of [...record.amends, ...record.supersedes, ...record.relates]) {
      if (!byId.has(rel.id) && !records.some((item) => item.id === rel.id)) {
        // checked after full map
      }
    }
  }

  // relation targets + cycles after all ids known
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

  // amends cycles
  const amendsAdj = new Map(records.map((record) => [record.id, record.amends.map((item) => item.id)]));
  const visiting = new Set();
  const visited = new Set();
  function visit(id, stack) {
    if (visiting.has(id)) {
      errors.push(`amends cycle detected: ${[...stack, id].join(' -> ')}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const next of amendsAdj.get(id) || []) visit(next, [...stack, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of amendsAdj.keys()) visit(id, []);

  // supersedes cycles
  const superAdj = new Map(records.map((record) => [record.id, record.supersedes.map((item) => item.id)]));
  visiting.clear();
  visited.clear();
  function visitSuper(id, stack) {
    if (visiting.has(id)) {
      errors.push(`supersedes cycle detected: ${[...stack, id].join(' -> ')}`);
      return;
    }
    if (visited.has(id)) return;
    visiting.add(id);
    for (const next of superAdj.get(id) || []) visitSuper(next, [...stack, id]);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of superAdj.keys()) visitSuper(id, []);

  // exclusive key uniqueness among accepted records that are not full-superseded globally
  // Structural exclusive-owner: two accepted exclusive records same decision_key with no supersession between them
  const exclusive = records.filter((record) => record.decision_mode === 'exclusive' && record.status === 'accepted');
  const byKey = new Map();
  for (const record of exclusive) {
    const list = byKey.get(record.decision_key) || [];
    list.push(record);
    byKey.set(record.decision_key, list);
  }
  for (const [key, list] of byKey.entries()) {
    if (list.length < 2) continue;
    // if one full-supersedes another chain, ok if only one remains non-superseded
    const surviving = list.filter((record) => !isFullySuperseded(record.id, records, byId));
    if (surviving.length > 1) {
      errors.push(
        `exclusive decision_key ${key} has multiple current owners: ${surviving.map((item) => item.id).join(', ')}`,
      );
    }
  }

  // Forbid legacy authored fields
  for (const record of records) {
    if (/\n(?:owners|supersededBy|superseded_by|amendedBy|amended_by):/m.test(record.markdown.slice(0, record.markdown.indexOf('\n---\n') + 20))) {
      // checked via parse — if they appear as keys
    }
  }
  for (const record of records) {
    const { values } = parseAdrFrontmatter(record.markdown, record.file);
    for (const banned of ['owners', 'supersededBy', 'superseded_by', 'amendedBy', 'amended_by', 'owner']) {
      if (Object.prototype.hasOwnProperty.call(values, banned)) {
        errors.push(`${record.file}: banned field ${banned} (use decision_owner + outgoing relations)`);
      }
    }
  }

  if (options.requireRepositoryFacet !== false) {
    for (const record of records) {
      if (!record.typed_scope.repository?.length) {
        errors.push(`${record.file}: typed_scope.repository required in this corpus`);
      }
    }
  }

  return { errors, byId };
}

/** Full supersession edges only (decision_key == null). Transitive persistent edges. */
export function isFullySuperseded(id, records, byId = null) {
  const map = byId || new Map(records.map((record) => [record.id, record]));
  // BFS: any accepted record with full supersedes edge targeting id, edges never disappear
  const queue = [id];
  const seen = new Set();
  // Actually: id is full-superseded if there exists an edge S -full supersedes-> id from any record with authored accepted
  for (const record of records) {
    if (record.status !== 'accepted') continue;
    for (const edge of record.supersedes) {
      if (edge.id === id && !edge.decision_key) return true;
    }
  }
  return false;
}

/**
 * Scope matching:
 * - AND across declared facets on the selector
 * - OR within values of the same facet
 * - omitted facet on selector = unconstrained
 * - missing task value required by selector facet = unresolved
 * - unknown custom namespace on either side handled by caller
 */
export function matchTypedScope(selector, taskScope) {
  const reasons = [];
  if (!selector || typeof selector !== 'object') {
    return { match: false, unresolved: true, reasons: ['selector missing'] };
  }
  const task = taskScope || {};
  for (const [facet, rawValues] of Object.entries(selector)) {
    const values = asStringArray(rawValues);
    if (!values.length) continue;
    if (facet.startsWith('custom.')) {
      // unknown custom namespace if task doesn't declare same facet → unresolved
      if (!Object.prototype.hasOwnProperty.call(task, facet)) {
        return {
          match: false,
          unresolved: true,
          reasons: [`task missing custom facet ${facet}`],
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
    const hit = values.some((value) => taskValues.has(value));
    if (!hit) {
      return { match: false, unresolved: false, reasons: [`no overlap on ${facet}`] };
    }
  }
  // unknown custom facets on task only don't matter
  // if selector has only unconstrained (empty) — match all
  return { match: true, unresolved: false, reasons };
}

function partialSupersededKeys(id, records) {
  const keys = new Set();
  for (const record of records) {
    if (record.status !== 'accepted') continue;
    for (const edge of record.supersedes) {
      if (edge.id === id && edge.decision_key) keys.add(edge.decision_key);
    }
  }
  return keys;
}

function amendsParents(record) {
  return record.amends.map((item) => item.id);
}

/**
 * Deterministic order for amendment sources that amend a base:
 * topo along amends DAG among the set; lex id for independent peers.
 * Sibling amendments overlapping same decision_key without chain → unresolved.
 */
export function orderAmendments(baseId, amendmentRecords, allById) {
  const set = new Map(amendmentRecords.map((record) => [record.id, record]));
  const unresolved = [];
  // conflict: two siblings both amends same parent (base or intermediate) and share decision_key or both exclusive same key
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
    if (siblings.length < 2) continue;
    // if they form a chain among themselves, ok
    for (let i = 0; i < siblings.length; i += 1) {
      for (let j = i + 1; j < siblings.length; j += 1) {
        const a = siblings[i];
        const b = siblings[j];
        const aPointsB = a.amends.some((item) => item.id === b.id);
        const bPointsA = b.amends.some((item) => item.id === a.id);
        if (aPointsB || bPointsA) continue;
        const overlapKey = a.decision_key && a.decision_key === b.decision_key;
        const bothTouchMaterial = overlapKey
          || (a.decision_mode === 'exclusive' && b.decision_mode === 'exclusive' && a.decision_key === b.decision_key);
        // independent complementary without same key: lex order only
        if (bothTouchMaterial) {
          unresolved.push({
            ids: [a.id, b.id],
            reason: 'sibling_amendment_conflict_requires_explicit_chain',
          });
        }
      }
    }
  }

  // topo order
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
      const parents = amendsParents(record)
        .filter((parent) => set.has(parent))
        .sort();
      for (const parent of parents) dfs(parent);
      ordered.push(record);
    }
    visiting.delete(id);
    visited.add(id);
  }
  const ids = [...set.keys()].sort();
  for (const id of ids) dfs(id);
  if (cycle) {
    unresolved.push({ ids, reason: 'amends_cycle_in_bundle' });
  }
  return { ordered, unresolved };
}

export function resolveApplicableDecisionBundle(task, records, options = {}) {
  const repository = options.repository || 'SylphxAI/skills';
  const taskScope = { repository: [repository], ...normalizeTaskScope(task.typed_scope || task.scope || {}) };
  const byId = new Map(records.map((record) => [record.id, record]));
  const base_sources = [];
  const ordered_amendment_sources = [];
  const applicable_decision_keys = [];
  const supersession_edges = [];
  const unresolved_sources = [];
  const excluded_sources = [];

  for (const record of records) {
    // collect supersession edges that match task scope of superseder
    if (record.status === 'accepted') {
      const scopeHit = matchTypedScope(record.typed_scope, taskScope);
      if (scopeHit.match && !scopeHit.unresolved) {
        for (const edge of record.supersedes) {
          supersession_edges.push({
            from: record.id,
            to: edge.id,
            decision_key: edge.decision_key,
            full: !edge.decision_key,
          });
        }
      } else if (scopeHit.unresolved && record.supersedes.length) {
        unresolved_sources.push({
          id: record.id,
          file: record.file,
          contentDigest: record.contentDigest,
          reason: 'superseder_scope_unresolved',
          details: scopeHit.reasons,
        });
      }
    }
  }

  const fullSuperseded = new Set(
    supersession_edges.filter((edge) => edge.full).map((edge) => edge.to),
  );
  // edges persist even if superseder is itself superseded — already included if superseder accepted+scope matched

  const partialKeysByTarget = new Map();
  for (const edge of supersession_edges.filter((item) => !item.full)) {
    const set = partialKeysByTarget.get(edge.to) || new Set();
    set.add(edge.decision_key);
    partialKeysByTarget.set(edge.to, set);
  }

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
      unresolved_sources.push({
        id: record.id,
        file: record.file,
        contentDigest: record.contentDigest,
        reason: 'scope_unresolved',
        details: scopeHit.reasons,
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

  // Base = matching record with no amends parent also in the matching set.
  // Amendment-only records attach under parents; a record that amends only
  // non-matching parents remains a base (primary decision with extra amends).
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
  const { ordered, unresolved } = orderAmendments('__multi__', amendmentCandidates, byId);
  for (const item of unresolved) {
    unresolved_sources.push({
      id: item.ids.join('+'),
      reason: item.reason,
      details: item.ids,
    });
  }
  // Order amendments per base for stable stream
  for (const base of [...candidateBases].sort((a, b) => a.id.localeCompare(b.id))) {
    const related = amendmentCandidates.filter((record) => reachesBaseLocal(record, base.id, byId));
    const orderedForBase = orderAmendments(base.id, related, byId);
    for (const item of orderedForBase.unresolved) {
      unresolved_sources.push({
        id: item.ids.join('+'),
        reason: item.reason,
        details: item.ids,
      });
    }
    for (const amendment of orderedForBase.ordered) {
      ordered_amendment_sources.push(sourceRef(amendment));
      if (amendment.decision_key) applicable_decision_keys.push(amendment.decision_key);
    }
  }

    // exclusive key double owner in applicable set
  const keyOwners = new Map();
  for (const ref of [...base_sources, ...ordered_amendment_sources]) {
    const record = byId.get(ref.id);
    if (record?.decision_mode === 'exclusive' && record.decision_key) {
      const list = keyOwners.get(record.decision_key) || [];
      list.push(record.id);
      keyOwners.set(record.decision_key, list);
    }
  }
  for (const [key, owners] of keyOwners.entries()) {
    if (new Set(owners).size > 1) {
      unresolved_sources.push({
        id: key,
        reason: 'exclusive_decision_key_conflict',
        details: owners,
      });
    }
  }

  const source_revision = options.source_revision || null;
  const corpusDigest = sha256Hex(
    stableStringify({
      records: records.map((record) => ({ id: record.id, contentDigest: record.contentDigest })).sort((a, b) => a.id.localeCompare(b.id)),
    }),
  );
  const taskDigest = sha256Hex(stableStringify(taskScope));
  const schemaDigest = options.schema_digest || sha256Hex('adr-lifecycle-schemas-v1');
  const bundleCore = {
    task_scope: taskScope,
    base_sources: sortSourceRefs(base_sources),
    ordered_amendment_sources: ordered_amendment_sources, // already deterministic per base then lex
    applicable_decision_keys: [...new Set(applicable_decision_keys)].sort(),
    supersession_edges: supersession_edges
      .map((edge) => ({ ...edge }))
      .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))),
    unresolved_sources: unresolved_sources
      .map((item) => ({ ...item }))
      .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))),
    excluded_sources: excluded_sources
      .map((item) => ({ ...item }))
      .sort((a, b) => stableStringify(a).localeCompare(stableStringify(b))),
  };
  // Stable amendment order globally: group already push order by sorted bases
  bundleCore.ordered_amendment_sources = sortAmendmentStream(bundleCore.base_sources, bundleCore.ordered_amendment_sources, byId);

  const input_digest = sha256Hex(
    stableStringify({
      task_scope: taskScope,
      profiles: options.profiles || null,
      corpusDigest,
      source_revision,
    }),
  );
  const resolver_artifact_digest = sha256Hex(
    stableStringify({
      resolver_id: RESOLVER_ID,
      resolver_version: RESOLVER_VERSION,
      bundle: bundleCore,
    }),
  );

  return {
    ...bundleCore,
    provenance: {
      source_revision,
      source_revisions: options.source_revisions || (source_revision ? [source_revision] : []),
      resolver_id: RESOLVER_ID,
      resolver_version: RESOLVER_VERSION,
      input_digest,
      schema_digest: schemaDigest,
      resolver_artifact_digest,
      corpus_digest: corpusDigest,
    },
  };
}

function normalizeTaskScope(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const out = {};
  for (const [facet, value] of Object.entries(raw)) {
    out[facet] = asStringArray(value).slice().sort();
  }
  return out;
}

function sourceRef(record) {
  return {
    id: record.id,
    file: record.file,
    contentDigest: record.contentDigest,
  };
}

function sortSourceRefs(refs) {
  return [...refs].sort((a, b) => a.id.localeCompare(b.id));
}

function sortAmendmentStream(bases, amendments, byId) {
  // Re-order: for each base in sorted id order, amendments that reach that base, topo+lex already in list — rebuild cleanly
  const baseIds = bases.map((item) => item.id).sort();
  const amendmentRecords = amendments.map((ref) => byId.get(ref.id)).filter(Boolean);
  const out = [];
  const used = new Set();
  for (const baseId of baseIds) {
    const related = amendmentRecords.filter((record) => {
      if (used.has(record.id)) return false;
      return reachesBaseLocal(record, baseId, byId);
    });
    const { ordered } = orderAmendments(baseId, related, byId);
    for (const record of ordered) {
      if (used.has(record.id)) continue;
      used.add(record.id);
      out.push(sourceRef(record));
    }
  }
  return out;
}

function reachesBaseLocal(record, baseId, byId, seen = new Set()) {
  if (seen.has(record.id)) return false;
  seen.add(record.id);
  for (const parent of amendsParents(record)) {
    if (parent === baseId) return true;
    const parentRecord = byId.get(parent);
    if (parentRecord?.amends?.length && reachesBaseLocal(parentRecord, baseId, byId, seen)) return true;
  }
  return false;
}

export function checkAdrLifecycle(root = repositoryRoot) {
  const { records, errors: parseErrors } = loadAdrRecords(root);
  const { errors } = validateAdrCorpus(records, parseErrors);
  // short locator collision for ADR-NNNN still useful for numeric ids
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
  return { errors, records };
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
        supersedes: record.supersedes.map((item) => ({
          id: item.id,
          decision_key: item.decision_key,
        })),
        contentDigest: record.contentDigest,
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
}

if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const { errors, records } = checkAdrLifecycle();
  if (errors.length) {
    console.error(`ADR lifecycle check failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }
  console.log(`ADR lifecycle ok: ${records.length} records`);
}
