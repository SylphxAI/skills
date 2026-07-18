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

function isManagedGroup(group) {
  return Array.isArray(group?.hooks) && group.hooks.some((hook) => (
    hook?.type === 'command'
    && typeof hook.command === 'string'
    && MANAGED_PATH_FRAGMENTS.some((fragment) => hook.command.includes(fragment))
  ));
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

export function uninstallRuntimeHooks({ agents, homes }) {
  const files = runtimeHookFiles(homes);
  for (const runtime of agents) {
    const file = files[runtime];
    if (!file || !existsSync(file)) continue;
    const document = readDocument(file);
    writeAtomic(file, `${JSON.stringify(removeManagedHooks(document), null, 2)}\n`);
  }
}
