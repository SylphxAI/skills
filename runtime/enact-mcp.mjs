#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const ENACT_MCP_ENV = 'SYLPHX_ENACT_MCP_URL';
export const DEFAULT_ENACT_MCP_URL = 'https://enact.sylphx.com/api/mcp';
export const ENACT_SERVER_NAME = 'sylphx-enact';
export const REQUIRED_ENACT_SCOPES = Object.freeze([
  'enact.observe',
  'enact.propose',
  'enact.claim',
  'enact.checkpoint',
  'enact.evidence',
  'enact.attest',
]);
/** Env var *name* for fleet-managed agent bearer (secret never written by installer). */
export const ENACT_BEARER_TOKEN_ENV_NAME = 'SYLPHX_ENACT_BEARER_TOKEN_ENV';
export const DEFAULT_ENACT_BEARER_TOKEN_ENV = 'SYLPHX_ENACT_AGENT_TOKEN';
const MAX_PROTECTED_RESOURCE_METADATA_BYTES = 64 * 1024;

function isLoopback(hostname) {
  return ['localhost', '127.0.0.1', '::1', '[::1]'].includes(hostname.toLowerCase());
}

function safeHttpsUrl(input, label, { requireMcpPath = false } = {}) {
  let parsed;
  try {
    parsed = new URL(input);
  } catch {
    throw new Error(`${label} must be an absolute URL`);
  }
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && isLoopback(parsed.hostname))) {
    throw new Error(`${label} must use HTTPS (HTTP is allowed only for loopback verification)`);
  }
  if (parsed.username || parsed.password) throw new Error(`${label} must not contain credentials`);
  if (parsed.search || parsed.hash) throw new Error(`${label} must not contain a query or fragment`);
  if (requireMcpPath && parsed.pathname.replace(/\/+$/, '') !== '/api/mcp') {
    throw new Error(`${label} must use the canonical /api/mcp path`);
  }
  parsed.pathname = parsed.pathname.replace(/\/+$/, '') || '/';
  return parsed;
}

export function normalizeEnactMcpUrl(input) {
  const parsed = safeHttpsUrl(String(input || '').trim(), 'Enact MCP URL', {
    requireMcpPath: true,
  });
  return parsed.toString();
}

export function resolveEnactMcpUrl(input = process.env[ENACT_MCP_ENV]) {
  return normalizeEnactMcpUrl(String(input || '').trim() || DEFAULT_ENACT_MCP_URL);
}

/**
 * Fleet-managed enrollment: hosts inject an Enact agent principal token via env.
 * Installer only persists the env *name* (Codex bearer_token_env_var), never the secret.
 * Interactive/public installs keep OAuth and must not set this.
 */
export const DEFAULT_ENACT_AGENT_TOKEN_FILE = '.codex/secrets/sylphx-enact-agent.token';

export function resolveManagedBearerTokenEnvName({
  env = process.env,
  explicit,
  homedir = process.env.HOME || '',
  fileExists = (path) => {
    try {
      return existsSync(path);
    } catch {
      return false;
    }
  },
} = {}) {
  if (explicit !== undefined && explicit !== null) {
    const value = String(explicit).trim();
    if (!value) return null;
    if (!/^[A-Z][A-Z0-9_]*$/.test(value)) {
      throw new Error('Managed Enact bearer env name must be SCREAMING_SNAKE_CASE');
    }
    return value;
  }
  if (Object.prototype.hasOwnProperty.call(env, ENACT_BEARER_TOKEN_ENV_NAME)) {
    const configured = String(env[ENACT_BEARER_TOKEN_ENV_NAME] || '').trim();
    if (!configured) return null;
    if (!/^[A-Z][A-Z0-9_]*$/.test(configured)) {
      throw new Error('SYLPHX_ENACT_BEARER_TOKEN_ENV must name a SCREAMING_SNAKE_CASE env var');
    }
    return configured;
  }
  // Default fleet env name is selected when the host already provides the env
  // value, or when the standard host secret file exists (loader injects env).
  if (String(env[DEFAULT_ENACT_BEARER_TOKEN_ENV] || '').trim()) {
    return DEFAULT_ENACT_BEARER_TOKEN_ENV;
  }
  if (homedir) {
    const tokenFile = `${String(homedir).replace(/\/+$/, '')}/${DEFAULT_ENACT_AGENT_TOKEN_FILE}`;
    if (fileExists(tokenFile)) {
      return DEFAULT_ENACT_BEARER_TOKEN_ENV;
    }
  }
  return null;
}

export function protectedResourceMetadataUrl(endpoint) {
  const parsed = new URL(normalizeEnactMcpUrl(endpoint));
  parsed.pathname = '/.well-known/oauth-protected-resource';
  return parsed.toString();
}

export function validateProtectedResourceMetadata(metadata, endpoint) {
  const normalizedEndpoint = normalizeEnactMcpUrl(endpoint);
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) {
    throw new Error('OAuth protected-resource metadata must be a JSON object');
  }
  const resource = normalizeEnactMcpUrl(metadata.resource);
  if (resource !== normalizedEndpoint) {
    throw new Error(`OAuth protected-resource metadata resource does not match ${normalizedEndpoint}`);
  }
  if (!Array.isArray(metadata.authorization_servers) || metadata.authorization_servers.length === 0) {
    throw new Error('OAuth protected-resource metadata must declare authorization_servers');
  }
  const authorizationServers = metadata.authorization_servers.map((value) => (
    safeHttpsUrl(String(value || '').trim(), 'OAuth authorization server').toString()
  ));
  if (!Array.isArray(metadata.scopes_supported)) {
    throw new Error('OAuth protected-resource metadata must declare scopes_supported');
  }
  const scopesSupported = [...new Set(metadata.scopes_supported.filter((scope) => typeof scope === 'string'))];
  const missingScopes = REQUIRED_ENACT_SCOPES.filter((scope) => !scopesSupported.includes(scope));
  if (missingScopes.length) {
    throw new Error(`OAuth protected-resource metadata is missing required scopes: ${missingScopes.join(', ')}`);
  }
  const unexpectedScopes = scopesSupported.filter((scope) => !REQUIRED_ENACT_SCOPES.includes(scope));
  if (unexpectedScopes.length) {
    throw new Error(`OAuth protected-resource metadata advertises non-public scopes: ${unexpectedScopes.join(', ')}`);
  }
  if (metadata.mcp?.transport !== 'streamable_http') {
    throw new Error('Enact metadata must declare MCP streamable_http transport');
  }
  const advertisedEndpoint = normalizeEnactMcpUrl(metadata.mcp?.endpoint);
  if (advertisedEndpoint !== normalizedEndpoint) {
    throw new Error('Enact metadata MCP endpoint does not match the protected resource');
  }
  return {
    endpoint: normalizedEndpoint,
    authorizationServers,
    scopesSupported,
    metadataUrl: protectedResourceMetadataUrl(normalizedEndpoint),
    protocolRevisionsSupported: Array.isArray(metadata.mcp?.protocol_revisions_supported)
      ? metadata.mcp.protocol_revisions_supported.filter((revision) => typeof revision === 'string')
      : [],
  };
}

async function boundedJson(response) {
  if (!response.body || typeof response.body.getReader !== 'function') {
    try {
      return await response.json();
    } catch {
      throw new Error('OAuth protected-resource discovery did not return JSON');
    }
  }
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_PROTECTED_RESOURCE_METADATA_BYTES) {
        try {
          await reader.cancel();
        } catch {
          // The size boundary remains authoritative even if cancellation fails.
        }
        throw new Error('OAuth protected-resource metadata exceeds 64 KiB');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error('OAuth protected-resource discovery did not return JSON');
  }
}

export async function discoverEnactMcp({
  endpoint = process.env[ENACT_MCP_ENV],
  fetchImpl = globalThis.fetch,
  timeoutMs = 5_000,
} = {}) {
  if (typeof fetchImpl !== 'function') throw new Error('This Node runtime does not provide fetch');
  const endpointSource = String(endpoint || '').trim() ? 'controlled_override' : 'canonical_sylphx_saas';
  const normalizedEndpoint = resolveEnactMcpUrl(endpoint);
  const metadataUrl = protectedResourceMetadataUrl(normalizedEndpoint);
  const response = await fetchImpl(metadataUrl, {
    method: 'GET',
    redirect: 'error',
    signal: AbortSignal.timeout(timeoutMs),
    headers: { accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`OAuth protected-resource discovery failed with HTTP ${response.status}`);
  }
  const metadata = await boundedJson(response);
  return {
    disposition: 'ready_for_enrollment',
    endpointSource,
    ...validateProtectedResourceMetadata(metadata, normalizedEndpoint),
  };
}

export function enrollmentCommand(runtime, endpoint, {
  serverName = ENACT_SERVER_NAME,
  managedBearerEnv = null,
} = {}) {
  const normalizedEndpoint = normalizeEnactMcpUrl(endpoint);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(serverName)) {
    throw new Error('Enact MCP server name must be lowercase kebab-case');
  }
  if (runtime === 'codex') {
    if (managedBearerEnv) {
      return {
        executable: 'codex',
        args: [
          'mcp', 'add', serverName,
          '--url', normalizedEndpoint,
          '--bearer-token-env-var', managedBearerEnv,
        ],
        oauth: {
          supported: false,
          initiation: 'managed_bearer_env',
          managedBearerEnv,
          loginArgs: null,
        },
      };
    }
    return {
      executable: 'codex',
      args: [
        'mcp', 'add', serverName,
        '--url', normalizedEndpoint,
        '--oauth-resource', normalizedEndpoint,
      ],
      oauth: {
        supported: true,
        initiation: 'native_login_command',
        // Codex otherwise derives its DCR request from the authorization
        // server's global catalog, which also contains managed-client effect
        // scopes. Bind public enrollment to the exact RFC 9728 resource scope
        // set so the installer cannot request privileged effects.
        loginArgs: [
          'mcp', 'login', serverName,
          '--scopes', REQUIRED_ENACT_SCOPES.join(','),
        ],
      },
    };
  }
  if (runtime === 'claude') {
    return {
      executable: 'claude',
      args: [
        'mcp', 'add', '--transport', 'http', '--scope', 'user',
        serverName, normalizedEndpoint,
      ],
      oauth: {
        supported: true,
        initiation: 'native_login_command',
        loginArgs: ['mcp', 'login', serverName],
      },
    };
  }
  if (runtime === 'grok') {
    return {
      executable: 'grok',
      args: [
        'mcp', 'add', '--transport', 'http', '--scope', 'user',
        serverName, normalizedEndpoint,
      ],
      oauth: {
        supported: true,
        initiation: 'automatic_on_connect',
        loginArgs: null,
      },
    };
  }
  throw new Error(`Unsupported agent: ${runtime}. Supported: codex, claude, grok.`);
}

function inspectRuntimeMcp(runtime, serverName, { run, pathEnv }) {
  let executable;
  let args;
  if (runtime === 'codex') {
    executable = 'codex';
    args = ['mcp', 'get', serverName, '--json'];
  } else if (runtime === 'claude') {
    executable = 'claude';
    args = ['mcp', 'get', serverName];
  } else if (runtime === 'grok') {
    executable = 'grok';
    args = ['mcp', 'list', '--json'];
  } else {
    throw new Error(`Unsupported agent: ${runtime}. Supported: codex, claude, grok.`);
  }
  const result = run(executable, args, {
    encoding: 'utf8',
    env: { ...process.env, PATH: pathEnv },
    // Claude's native readback includes a bounded connectivity check. An
    // unauthenticated OAuth server can take longer than the other runtimes to
    // return its typed disconnected state, so preserve a finite but usable
    // inspection window rather than rewriting an uninspected entry.
    timeout: runtime === 'claude' ? 30_000 : 15_000,
  });
  if (result.error) throw new Error(`Unable to run ${executable}: ${result.error.message}`);
  const output = String(result.stdout || '');
  const diagnostic = `${output}\n${String(result.stderr || '')}`;
  if (runtime === 'codex') {
    if (result.status !== 0 && /No MCP server named/.test(diagnostic)) return { state: 'missing' };
    if (result.status !== 0) throw new Error('Unable to inspect existing Codex MCP configuration');
    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch {
      throw new Error('Codex MCP inspection did not return JSON');
    }
    if (
      parsed?.enabled !== true
      || parsed?.transport?.type !== 'streamable_http'
      || typeof parsed?.transport?.url !== 'string'
    ) {
      return { state: 'conflict' };
    }
    if (parsed.transport.http_headers || parsed.transport.env_http_headers) {
      return { state: 'conflict' };
    }
    if (parsed.transport.bearer_token_env_var) {
      // Fleet-managed path: env *name* only. Secret is injected by host, not installer.
      if (!/^[A-Z][A-Z0-9_]*$/.test(String(parsed.transport.bearer_token_env_var))) {
        return { state: 'conflict' };
      }
      return {
        state: 'existing_managed_bearer',
        endpoint: parsed.transport.url,
        managedBearerEnv: parsed.transport.bearer_token_env_var,
      };
    }
    return { state: 'existing', endpoint: parsed.transport.url };
  }
  if (runtime === 'claude') {
    if (result.status !== 0 && /No MCP server named/.test(diagnostic)) return { state: 'missing' };
    if (result.status !== 0) throw new Error('Unable to inspect existing Claude MCP configuration');
    const type = output.match(/^\s*Type:\s*(\S+)\s*$/m)?.[1];
    const endpoint = output.match(/^\s*URL:\s*(\S+)\s*$/m)?.[1];
    const scope = output.match(/^\s*Scope:\s*(.+?)\s*$/m)?.[1];
    if (
      type !== 'http'
      || !endpoint
      || !scope?.startsWith('User config')
      || /^\s*Headers:\s*$/m.test(output)
    ) {
      return { state: 'conflict' };
    }
    return { state: 'existing', endpoint };
  }
  if (result.status !== 0) throw new Error('Unable to inspect existing Grok MCP configuration');
  let parsed;
  try {
    parsed = JSON.parse(output);
  } catch {
    throw new Error('Grok MCP inspection did not return JSON');
  }
  if (!Array.isArray(parsed)) throw new Error('Grok MCP inspection did not return a server list');
  const existing = parsed.find((server) => server?.name === serverName && server?.scope === 'user');
  if (!existing) return { state: 'missing' };
  if (
    existing.enabled !== true
    || typeof existing.url !== 'string'
    || existing.headers
    || existing.command
  ) {
    return { state: 'conflict' };
  }
  return { state: 'existing', endpoint: existing.url };
}

export function configureEnactMcp(runtime, discovery, {
  run = spawnSync,
  serverName = ENACT_SERVER_NAME,
  pathEnv = process.env.PATH || '',
  env = process.env,
  homedir = process.env.HOME || '',
  fileExists,
  managedBearerEnv,
} = {}) {
  if (discovery?.disposition !== 'ready_for_enrollment') {
    throw new Error('Enact MCP enrollment requires verified protected-resource metadata');
  }
  // Managed bearer is Codex-only. Resolve autodetect only for codex unless caller
  // explicitly passed managedBearerEnv (including null to force OAuth).
  let resolvedManagedBearerEnv = managedBearerEnv;
  if (resolvedManagedBearerEnv === undefined) {
    resolvedManagedBearerEnv = runtime === 'codex'
      ? resolveManagedBearerTokenEnvName({ env, homedir, fileExists })
      : null;
  }
  if (resolvedManagedBearerEnv && runtime !== 'codex') {
    throw new Error('Managed Enact bearer enrollment is currently supported for Codex only');
  }
  const command = enrollmentCommand(runtime, discovery.endpoint, {
    serverName,
    managedBearerEnv: runtime === 'codex' ? resolvedManagedBearerEnv : null,
  });
  const existing = inspectRuntimeMcp(runtime, serverName, { run, pathEnv });
  if (existing.state === 'conflict') {
    throw new Error(`Refusing to replace incompatible existing MCP server ${serverName}`);
  }
  if (existing.state === 'existing' || existing.state === 'existing_managed_bearer') {
    let normalizedExisting;
    try {
      normalizedExisting = normalizeEnactMcpUrl(existing.endpoint);
    } catch {
      throw new Error(`Refusing to replace incompatible existing MCP server ${serverName}`);
    }
    if (normalizedExisting !== discovery.endpoint) {
      throw new Error(`Refusing to replace existing MCP server ${serverName} with a different endpoint`);
    }
    if (existing.state === 'existing_managed_bearer') {
      if (resolvedManagedBearerEnv && existing.managedBearerEnv !== resolvedManagedBearerEnv) {
        throw new Error(
          `Refusing to replace managed bearer env ${existing.managedBearerEnv} with ${resolvedManagedBearerEnv}`,
        );
      }
      return {
        disposition: 'configured_managed_bearer',
        runtime,
        serverName,
        endpoint: discovery.endpoint,
        metadataUrl: discovery.metadataUrl,
        configuration: 'existing_managed_bearer',
        oauth: {
          supported: false,
          initiation: 'managed_bearer_env',
          managedBearerEnv: existing.managedBearerEnv,
          loginArgs: null,
        },
      };
    }
    if (resolvedManagedBearerEnv) {
      throw new Error(
        `Refusing to replace OAuth-only MCP server ${serverName} with managed bearer enrollment`,
      );
    }
    return {
      disposition: 'configured_authentication_required',
      runtime,
      serverName,
      endpoint: discovery.endpoint,
      metadataUrl: discovery.metadataUrl,
      configuration: 'existing',
      oauth: command.oauth,
    };
  }
  const result = run(command.executable, command.args, {
    encoding: 'utf8',
    env: { ...process.env, PATH: pathEnv },
    timeout: 30_000,
  });
  if (result.error) throw new Error(`Unable to run ${command.executable}: ${result.error.message}`);
  if (result.status !== 0) {
    // Some native clients persist a valid MCP entry before returning a non-zero
    // status from a later bootstrap/login phase. Treat the command exit as an
    // observation, then read the actual effect back. Only the exact safe entry
    // can converge; missing, conflicting, credential-bearing, or different
    // endpoints remain failures.
    const afterFailure = inspectRuntimeMcp(runtime, serverName, { run, pathEnv });
    if (afterFailure.state === 'existing') {
      let normalizedAfterFailure;
      try {
        normalizedAfterFailure = normalizeEnactMcpUrl(afterFailure.endpoint);
      } catch {
        normalizedAfterFailure = null;
      }
      if (normalizedAfterFailure === discovery.endpoint) {
        if (afterFailure.state === 'existing_managed_bearer' || resolvedManagedBearerEnv) {
          return {
            disposition: 'configured_managed_bearer',
            runtime,
            serverName,
            endpoint: discovery.endpoint,
            metadataUrl: discovery.metadataUrl,
            configuration: 'created_after_nonzero_readback',
            oauth: command.oauth,
          };
        }
        return {
          disposition: 'configured_authentication_required',
          runtime,
          serverName,
          endpoint: discovery.endpoint,
          metadataUrl: discovery.metadataUrl,
          configuration: 'created_after_nonzero_readback',
          oauth: command.oauth,
        };
      }
    }
    throw new Error(`${command.executable} MCP enrollment failed with exit code ${result.status}`);
  }
  if (resolvedManagedBearerEnv) {
    return {
      disposition: 'configured_managed_bearer',
      runtime,
      serverName,
      endpoint: discovery.endpoint,
      metadataUrl: discovery.metadataUrl,
      configuration: 'created',
      oauth: command.oauth,
    };
  }
  return {
    disposition: 'configured_authentication_required',
    runtime,
    serverName,
    endpoint: discovery.endpoint,
    metadataUrl: discovery.metadataUrl,
    configuration: 'created',
    oauth: command.oauth,
  };
}

function option(name, args) {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function help() {
  console.log(`Sylphx Enact MCP integration\n\nUsage:\n  enact-mcp discover [--url HTTPS_URL] [--json]\n  enact-mcp enroll --agent codex|claude|grok [--url HTTPS_URL] [--json]\n\nThe default resource is the canonical Sylphx SaaS endpoint\n${DEFAULT_ENACT_MCP_URL}. --url or ${ENACT_MCP_ENV} may override\nit only for controlled staging or isolated evaluation. Discovery validates RFC\n9728 metadata before any runtime configuration is changed. OAuth credentials\nare never copied or stored by this adapter.`);
}

async function main(args = process.argv.slice(2)) {
  if (args.some((arg) => ['help', '--help', '-h'].includes(arg))) return help();
  const action = args.find((arg) => !arg.startsWith('-')) || 'discover';
  const endpoint = option('--url', args) || process.env[ENACT_MCP_ENV];
  const discovery = await discoverEnactMcp({ endpoint });
  let result = discovery;
  if (action === 'enroll') {
    const runtime = option('--agent', args);
    if (!runtime) throw new Error('enroll requires --agent codex, claude, or grok');
    result = configureEnactMcp(runtime, discovery);
  } else if (action !== 'discover') {
    throw new Error(`Unknown command: ${action}`);
  }
  if (args.includes('--json')) console.log(JSON.stringify(result, null, 2));
  else console.log(`${result.disposition}${result.endpoint ? ` ${result.endpoint}` : ''}`);
}

const invokedFile = process.argv[1] && existsSync(process.argv[1])
  ? realpathSync(process.argv[1])
  : '';

if (invokedFile === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`enact-mcp: ${error.message}`);
    process.exit(1);
  });
}
