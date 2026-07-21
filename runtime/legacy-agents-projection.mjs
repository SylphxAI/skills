import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { packageDigest } from './package-digest.mjs';

const OWNER = 'SylphxAI/skills';
const MANIFEST = 'skills-binding-install-manifest.json';
const PACKAGE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMIT = /^[0-9a-f]{40}$/;

// The predecessor installer did not record package digests. Consequently an
// arbitrary manifest carrying the old filename cannot prove deletion
// authority. Recognize only exact historical projections whose bytes have
// been independently captured, and extend this registry deliberately if
// another genuine projection is found.
export const LEGACY_AGENTS_PROJECTIONS = Object.freeze({
  '8057d661583fd1ce6bb98ffe28915f3a732a6d65': Object.freeze({
    'agent-first-development-standard': 'sha256:380e807e8b62ea1b00bad3a331813791778997dcc297ba9454777814b131224f',
    'agent-native-standard': 'sha256:77addcf9cc5811266bf436f609cbc5e14051030b40820308fb3f19d4d9fc5b22',
    'autonomous-execution-standard': 'sha256:fc180fa56c2c3622e1aaecb0e8401fde4bdeb8749d1ad6d8ce2f7022c72148b0',
    'ci-admission-standard': 'sha256:76f179360ef591a9b11c127f1d3563a7ad7138038fd9180824cb77f154957091',
    'ci-runner-capacity-standard': 'sha256:fd924d1dfc8bd9ab016aaac7c65a1647a72ad5909bf7d9f6c2804097defe4864',
    'commercial-decision-standard': 'sha256:ca40566a0e34c558690b81c899b5a0ac482ffccb912aa48118371957baa6e282',
    'delivery-standard': 'sha256:1feaf370db744baf54bae236eba6285089aba172624147bcc04640b7d2cb436b',
    'documentation-standard': 'sha256:74fccbcb0c48d0ddd81b0d6c1663fb46469945947ae2088911ce04dd9f13db01',
    'engineering-standard': 'sha256:6696b8161e9ed59f2fd7e8ae96b204bd9c8d3ec197b9576cb6fa02dcf0963811',
    'enterprise-control-plane-standard': 'sha256:b3c7b1c13751354121b94a0cc43f43a4946f880fdd763d21a0b892bb64c6ff1b',
    'enterprise-profile-standard': 'sha256:dc5dc1e9a543af522cec2662e0d36ebc130c5906c24d1785c5b178d2ec142e50',
    'frontier-verification-standard': 'sha256:b65d3e075b0fe2c419d6f3b71b9ec84700d2aa4c5dac222fa4220404e697f19a',
    'incident-standard': 'sha256:3dac89d78aabdedc7d24e55ebe007c972e681fafac00a3b7d6b1b91628bdec2f',
    'instruction-evolution-standard': 'sha256:e1a21c71dd76f16bb48d2b37d0c13f63e87e5a070b4009461fd3039e3cef89a4',
    'mission-control-standard': 'sha256:139c07c5f65994c5e997efb8fb73844b75030c0b9b0e64f8c7bb5314722de41a',
    'project-manifest-standard': 'sha256:aebc136cc2873200bb3b848c0f85c1f200500e7501bd4c3b5d4e10aaffb158a8',
    'prompt-architecture': 'sha256:1c7d179542ea4105fb76808be4fbe734d5211b30a217112e4fbadff4896c31c8',
    'repo-adoption-standard': 'sha256:065d461ec0df4a581dc2dd253574b30c1f2833bbdb33067daf7dedc0bc09ed5b',
    'roleless-speculative-development-standard': 'sha256:4cb1ce32124692cd557bc65172929077f09e1e4421e546c9fdda0853decf2ce4',
    'self-feeding-agent-loop-standard': 'sha256:53a29aa3410218a92c6cb8bbe97c4f258a9a57546eeb2b2c2e5c76c193836727',
    'sota-execution-standard': 'sha256:fa2e84c8821450cba399d9903e2b71f6414d453a0b8a814dd9433952c05262d6',
    'source-authoring-standard': 'sha256:d13e1a7b99ee6c72d4ed31589e7668206d88a9f69b25ec6e1beff71d0009e5ea',
    'specification-control-plane-standard': 'sha256:35f3b20f5d6cc57b228f737ffd7b7ba5c8bdb67e91efe1dd6b6624380e01fcac',
    'sylphx-platform-first': 'sha256:1f51a652daa4a690c8094547d6004f0240bd962612282921e2c87e233063f970',
  }),
});

function readRegularJson(file) {
  const stat = lstatSync(file);
  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new Error(`legacy ownership manifest is not a regular file: ${file}`);
  }
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`invalid legacy ownership manifest ${file}: ${error.message}`);
  }
}

function assertRegularDirectory(directory, label) {
  const stat = lstatSync(directory);
  if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw new Error(`${label} is not a regular directory: ${directory}`);
  }
}

function validateManifest(manifest, file, projections) {
  const expectedShape = [
    'authority',
    'count',
    'installed_at',
    'package_kind',
    'removed_retired_dual_discovery',
    'skills',
    'source',
    'source_commit',
  ];
  if (
    JSON.stringify(Object.keys(manifest || {}).sort()) !== JSON.stringify(expectedShape)
    || manifest.source !== OWNER
    || manifest.authority !== 'binding'
    || manifest.package_kind !== 'standard'
    || !COMMIT.test(manifest.source_commit || '')
    || typeof manifest.installed_at !== 'string'
    || !Number.isFinite(Date.parse(manifest.installed_at))
    || new Date(manifest.installed_at).toISOString() !== manifest.installed_at
    || !Array.isArray(manifest.skills)
    || new Set(manifest.skills).size !== manifest.skills.length
    || !manifest.skills.every((name) => PACKAGE_NAME.test(name))
    || manifest.count !== manifest.skills.length
    || !Number.isInteger(manifest.removed_retired_dual_discovery)
    || manifest.removed_retired_dual_discovery < 0
  ) throw new Error(`unrecognized legacy ownership manifest: ${file}`);

  const digests = projections[manifest.source_commit];
  if (!digests) throw new Error(`unknown legacy Sylphx Skills projection: ${manifest.source_commit}`);
  if (JSON.stringify(manifest.skills) !== JSON.stringify(Object.keys(digests))) {
    throw new Error(`legacy projection package set does not match its source commit: ${file}`);
  }
  return digests;
}

function verifyPackage(root, name, expectedDigest) {
  const packageRoot = path.join(root, name);
  let observed;
  try {
    observed = packageDigest(packageRoot);
  } catch (error) {
    throw new Error(`invalid legacy managed package ${packageRoot}: ${error.message}`);
  }
  if (observed !== expectedDigest) {
    throw new Error(`legacy managed package digest mismatch: ${packageRoot}`);
  }
}

function projectionPaths(home, sourceCommit) {
  const nativeRoot = path.join(home, '.agents', 'skills');
  const archiveRoot = path.join(home, '.sylphx-skills', 'retired-native-projections');
  return {
    nativeRoot,
    manifestFile: path.join(nativeRoot, MANIFEST),
    archiveRoot,
    transactionRoot: path.join(archiveRoot, `.retiring-agents-skills-${sourceCommit}`),
    retiredRoot: path.join(archiveRoot, `agents-skills-${sourceCommit}`),
  };
}

function validateRetirement(metadata, paths, projections) {
  const expectedShape = [
    'manifest',
    'owner',
    'packageDigests',
    'schemaVersion',
    'sourceCommit',
    'sourceRoot',
  ];
  if (
    JSON.stringify(Object.keys(metadata || {}).sort()) !== JSON.stringify(expectedShape)
    || metadata.schemaVersion !== 1
    || metadata.owner !== OWNER
    || metadata.sourceRoot !== paths.nativeRoot
    || metadata.sourceCommit !== metadata.manifest?.source_commit
  ) throw new Error(`invalid legacy projection retirement: ${paths.transactionRoot}`);
  const digests = validateManifest(metadata.manifest, paths.transactionRoot, projections);
  if (JSON.stringify(metadata.packageDigests) !== JSON.stringify(digests)) {
    throw new Error(`invalid legacy projection retirement digests: ${paths.transactionRoot}`);
  }
  return { manifest: metadata.manifest, digests, ...paths, resuming: true };
}

function pendingRetirement(home, projections) {
  const pending = [];
  for (const sourceCommit of Object.keys(projections)) {
    const paths = projectionPaths(home, sourceCommit);
    if (!existsSync(paths.transactionRoot)) continue;
    if (existsSync(paths.retiredRoot)) {
      throw new Error(`legacy projection has both pending and completed retirement: ${paths.archiveRoot}`);
    }
    assertRegularDirectory(paths.transactionRoot, 'legacy projection retirement');
    pending.push(validateRetirement(
      readRegularJson(path.join(paths.transactionRoot, 'retirement.json')),
      paths,
      projections,
    ));
  }
  if (pending.length > 1) throw new Error('multiple legacy projection retirements require operator reconciliation');
  return pending[0] || null;
}

/**
 * Resolve a deletion boundary without mutating native discovery. An invalid or
 * incomplete lookalike is an error, never deletion authority.
 */
export function inspectLegacyAgentsProjection({
  home,
  projections = LEGACY_AGENTS_PROJECTIONS,
} = {}) {
  assertRegularDirectory(home, 'Skills home');
  const pending = pendingRetirement(home, projections);
  if (pending) {
    assertRegularDirectory(path.join(home, '.agents'), 'legacy Agent Skills home');
    assertRegularDirectory(pending.nativeRoot, 'legacy Agent Skills root');
    for (const [name, digest] of Object.entries(pending.digests)) {
      const source = path.join(pending.nativeRoot, name);
      const archived = path.join(pending.transactionRoot, name);
      if (existsSync(source) === existsSync(archived)) {
        throw new Error(`ambiguous interrupted legacy package retirement: ${name}`);
      }
      verifyPackage(existsSync(source) ? pending.nativeRoot : pending.transactionRoot, name, digest);
    }
    return pending;
  }
  const nativeRoot = path.join(home, '.agents', 'skills');
  const manifestFile = path.join(nativeRoot, MANIFEST);
  if (!existsSync(manifestFile)) return null;
  assertRegularDirectory(path.join(home, '.agents'), 'legacy Agent Skills home');
  assertRegularDirectory(nativeRoot, 'legacy Agent Skills root');
  const manifest = readRegularJson(manifestFile);
  const digests = validateManifest(manifest, manifestFile, projections);
  for (const [name, digest] of Object.entries(digests)) verifyPackage(nativeRoot, name, digest);
  const paths = projectionPaths(home, manifest.source_commit);
  if (existsSync(paths.transactionRoot) || existsSync(paths.retiredRoot)) {
    throw new Error(`legacy projection retirement destination already exists: ${paths.archiveRoot}`);
  }
  return { manifest, digests, ...paths };
}

export function legacyAgentsProjectionReadback(options = {}) {
  try {
    const plan = inspectLegacyAgentsProjection(options);
    if (!plan) return { state: 'absent', sourceCommit: null, skills: [], error: null };
    return {
      state: plan.resuming ? 'retirement-interrupted' : 'recognized',
      sourceCommit: plan.manifest.source_commit,
      skills: plan.manifest.skills,
      error: null,
    };
  } catch (error) {
    return { state: 'invalid', sourceCommit: null, skills: [], error: error.message };
  }
}

/** Move one verified legacy projection outside native discovery without deleting it. */
export function retireLegacyAgentsProjection(plan) {
  if (!plan) return null;
  const stateRoot = path.dirname(plan.archiveRoot);
  if (existsSync(stateRoot)) assertRegularDirectory(stateRoot, 'Sylphx Skills state root');
  else mkdirSync(stateRoot, { mode: 0o700 });
  if (existsSync(plan.archiveRoot)) assertRegularDirectory(plan.archiveRoot, 'legacy projection archive');
  else mkdirSync(plan.archiveRoot, { mode: 0o700 });
  if (statSync(plan.nativeRoot).dev !== statSync(plan.archiveRoot).dev) {
    throw new Error('legacy projection archive must share a filesystem with native discovery');
  }
  if (!plan.resuming) {
    const claim = `${plan.transactionRoot}-claim-${process.pid}-${randomBytes(4).toString('hex')}`;
    mkdirSync(claim, { mode: 0o700 });
    writeFileSync(path.join(claim, 'retirement.json'), `${JSON.stringify({
      schemaVersion: 1,
      owner: OWNER,
      sourceRoot: plan.nativeRoot,
      sourceCommit: plan.manifest.source_commit,
      manifest: plan.manifest,
      packageDigests: plan.digests,
    }, null, 2)}\n`, { mode: 0o600 });
    renameSync(claim, plan.transactionRoot);
  }

  try {
    for (const [name, digest] of Object.entries(plan.digests)) {
      const source = path.join(plan.nativeRoot, name);
      const archived = path.join(plan.transactionRoot, name);
      if (existsSync(source) && !existsSync(archived)) renameSync(source, archived);
      else if (existsSync(source) || !existsSync(archived)) {
        throw new Error(`ambiguous legacy package retirement: ${name}`);
      }
      verifyPackage(plan.transactionRoot, name, digest);
    }
    const archivedManifest = path.join(plan.transactionRoot, MANIFEST);
    if (existsSync(plan.manifestFile) && !existsSync(archivedManifest)) {
      renameSync(plan.manifestFile, archivedManifest);
    } else if (existsSync(plan.manifestFile) || !existsSync(archivedManifest)) {
      throw new Error('ambiguous legacy ownership manifest retirement');
    }
    if (JSON.stringify(readRegularJson(archivedManifest)) !== JSON.stringify(plan.manifest)) {
      throw new Error('legacy ownership manifest changed during retirement');
    }
    renameSync(plan.transactionRoot, plan.retiredRoot);
    return {
      sourceCommit: plan.manifest.source_commit,
      removedFromDiscovery: plan.manifest.skills,
      archive: plan.retiredRoot,
    };
  } catch (error) {
    // A partially moved projection remains recoverable in the transaction
    // directory. Do not guess ownership or delete either side.
    throw new Error(`legacy projection retirement interrupted; preserved at ${plan.transactionRoot}: ${error.message}`);
  }
}
