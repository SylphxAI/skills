import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';

const MANAGED_PATH_FRAGMENTS = ['.sylphx-skills/reconcile.mjs', '.sylphx-skills\\reconcile.mjs'];

function writeAtomic(file, bytes) {
  mkdirSync(path.dirname(file), { recursive: true });
  const mode = existsSync(file) ? statSync(file).mode & 0o777 : 0o600;
  const temporary = `${file}.tmp-${process.pid}-${randomBytes(4).toString('hex')}`;
  writeFileSync(temporary, bytes, { mode });
  renameSync(temporary, file);
}

function readDocument(file) {
  if (!existsSync(file)) return {};
  try {
    const document = JSON.parse(readFileSync(file, 'utf8'));
    if (!document || Array.isArray(document) || typeof document !== 'object') {
      throw new Error('top level must be a JSON object');
    }
    return document;
  } catch (error) {
    throw new Error(`Refusing to overwrite invalid hook configuration ${file}: ${error.message}`);
  }
}

function shellQuote(value) {
  return `'${String(value).replaceAll("'", "'\\''")}'`;
}

function hookCommand(nodePath, reconcilerPath, maxAgeMs, skipIfGrokCompat = false) {
  const compatibilityGuard = skipIfGrokCompat ? ' --skip-if-grok-compat' : '';
  return `${shellQuote(nodePath)} ${shellQuote(reconcilerPath)} --quiet --max-age-ms ${maxAgeMs}${compatibilityGuard}`;
}

function isManagedGroup(group) {
  return Array.isArray(group?.hooks) && group.hooks.some((hook) => (
    hook?.type === 'command'
    && typeof hook.command === 'string'
    && MANAGED_PATH_FRAGMENTS.some((fragment) => hook.command.includes(fragment))
  ));
}

function commandGroup(command, matcher) {
  const group = {
    hooks: [{ type: 'command', command, timeout: 60 }],
  };
  if (matcher) group.matcher = matcher;
  return group;
}

function eventDefinitions(runtime, nodePath, reconcilerPath) {
  // Grok Build officially imports Claude hooks. Mark Claude-owned commands so
  // that compatibility discovery becomes a cheap no-op when native Grok hooks
  // own the same boundary.
  const compatibilityGuard = runtime === 'claude';
  const boundary = hookCommand(nodePath, reconcilerPath, 1_000, compatibilityGuard);
  const activeTurn = hookCommand(nodePath, reconcilerPath, 10_000, compatibilityGuard);
  if (runtime === 'grok') {
    return {
      SessionStart: commandGroup(boundary),
      UserPromptSubmit: commandGroup(boundary),
      SubagentStart: commandGroup(boundary),
      PostToolUse: commandGroup(activeTurn),
    };
  }
  return {
    SessionStart: commandGroup(boundary, 'startup|resume|clear|compact'),
    UserPromptSubmit: commandGroup(boundary),
    SubagentStart: commandGroup(boundary, '.*'),
    // Claude offers a batch boundary immediately before the next model call.
    // Codex uses PreToolUse so failed as well as successful calls refresh the
    // next reasoning step without adding both a pre- and post-call process.
    [runtime === 'claude' ? 'PostToolBatch' : 'PreToolUse']:
      commandGroup(activeTurn, runtime === 'claude' ? undefined : '.*'),
  };
}

export function mergeManagedHooks(document, { runtime, nodePath, reconcilerPath }) {
  const result = structuredClone(document);
  if (result.hooks !== undefined && (!result.hooks || typeof result.hooks !== 'object' || Array.isArray(result.hooks))) {
    throw new Error('Refusing to replace a non-object hooks configuration');
  }
  result.hooks = result.hooks || {};
  const desired = eventDefinitions(runtime, nodePath, reconcilerPath);

  for (const [event, group] of Object.entries(desired)) {
    const existing = Array.isArray(result.hooks[event]) ? result.hooks[event] : [];
    result.hooks[event] = [...existing.filter((item) => !isManagedGroup(item)), group];
  }
  return result;
}

export function removeManagedHooks(document) {
  const result = structuredClone(document);
  if (!result.hooks || typeof result.hooks !== 'object' || Array.isArray(result.hooks)) return result;
  for (const event of Object.keys(result.hooks)) {
    if (!Array.isArray(result.hooks[event])) continue;
    result.hooks[event] = result.hooks[event].filter((group) => !isManagedGroup(group));
    if (!result.hooks[event].length) delete result.hooks[event];
  }
  if (!Object.keys(result.hooks).length) delete result.hooks;
  return result;
}

export function runtimeHookFiles({ codexHome, claudeHome, grokHome }) {
  return {
    codex: path.join(codexHome, 'hooks.json'),
    claude: path.join(claudeHome, 'settings.json'),
    grok: path.join(grokHome, 'hooks', 'sylphx-skills.json'),
  };
}

export function installRuntimeHooks({ agents, homes, nodePath, reconcilerPath }) {
  const files = runtimeHookFiles(homes);
  for (const runtime of agents) {
    const file = files[runtime];
    if (!file) throw new Error(`Unsupported hook runtime: ${runtime}`);
    const document = readDocument(file);
    writeAtomic(file, `${JSON.stringify(mergeManagedHooks(document, {
      runtime,
      nodePath,
      reconcilerPath,
    }), null, 2)}\n`);
  }
}

export function uninstallRuntimeHooks({ agents, homes }) {
  const files = runtimeHookFiles(homes);
  for (const runtime of agents) {
    const file = files[runtime];
    if (!file || !existsSync(file)) continue;
    const document = readDocument(file);
    writeAtomic(file, `${JSON.stringify(removeManagedHooks(document), null, 2)}\n`);
  }
}

export function runtimeHookStatus({ agents, homes }) {
  const files = runtimeHookFiles(homes);
  return agents.map((runtime) => {
    const file = files[runtime];
    const activation = {
      codex: 'exact-definition-trust-required',
      claude: 'automatic-unless-disabled-by-runtime-policy',
      grok: 'global-user-hook-trusted',
    }[runtime] || 'runtime-dependent';
    if (!file || !existsSync(file)) {
      return { runtime, file, installed: false, activation, events: [] };
    }
    const document = readDocument(file);
    const events = Object.entries(document.hooks || {})
      .filter(([, groups]) => Array.isArray(groups) && groups.some(isManagedGroup))
      .map(([event]) => event)
      .sort();
    return { runtime, file, installed: events.length > 0, activation, events };
  });
}
