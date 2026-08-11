import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));

const failures = [];
const results = [];

function check(id, ok, detail) {
  results.push({ id, ok, detail });
  if (!ok) failures.push(`${id}: ${detail}`);
}

const ID_PATTERN = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/;
const SHA256_PATTERN = /^sha256:[0-9a-f]{64}$/;
const REVISION_PATTERN = /^\d{4}-\d{2}-\d{2}\.[1-9][0-9]*$/;
const CONSTITUTION_URL =
  "https://github.com/SylphxAI/skills/blob/main/runtime/constitution.md";
const SCHEMA_URL =
  "https://github.com/SylphxAI/skills/blob/main/skills/adopt-repo-standards/references/project-manifest-standard/references/project-manifest.schema.json";
const LEGACY_PHRASES = [
  "Always ask the ops guild before changing anything.",
  "Keep all engineering rules in this file.",
  "Do not use any other instruction source.",
];

function isNonEmptyStringArray(v) {
  return (
    Array.isArray(v) &&
    v.length >= 1 &&
    v.every((item) => typeof item === "string" && item.length >= 1)
  );
}

function hasOnlyKeys(obj, keys) {
  return Object.keys(obj).every((k) => keys.includes(k));
}

function validateManifest(m) {
  const errors = [];
  const topKeys = [
    "$schema",
    "schemaVersion",
    "kind",
    "project",
    "intent",
    "boundaries",
    "architecture",
    "documentation",
    "delivery",
    "commercial",
    "adoption",
  ];
  const require = (cond, msg) => {
    if (!cond) errors.push(msg);
  };

  require(typeof m === "object" && m !== null, "manifest is not an object");
  if (typeof m !== "object" || m === null) return errors;
  require(hasOnlyKeys(m, topKeys), "unexpected top-level keys");
  require(m.$schema === SCHEMA_URL, "$schema mismatch");
  require(m.schemaVersion === 2, "schemaVersion must be 2");
  require(m.kind === "ProjectManifest", "kind must be ProjectManifest");
  for (const k of topKeys.slice(3)) require(m[k] !== undefined, `missing ${k}`);

  const p = m.project;
  require(p && hasOnlyKeys(p, ["id", "repository", "name", "summary", "lifecycle", "layer", "visibility", "policyPool", "links", "tags"]), "project keys");
  require(p && ID_PATTERN.test(p.id), "project.id pattern");
  require(p && typeof p.repository === "string" && p.repository.length >= 3, "project.repository");
  require(p && typeof p.name === "string" && p.name.length >= 1, "project.name");
  require(p && typeof p.summary === "string" && p.summary.length >= 20, "project.summary min length");
  require(p && ["incubating", "active", "production", "commercial", "maintenance", "deprecated", "archived"].includes(p.lifecycle), "project.lifecycle enum");
  require(p && ID_PATTERN.test(p.layer), "project.layer pattern");
  require(p && ["private", "internal", "public"].includes(p.visibility), "project.visibility enum");
  require(p && ID_PATTERN.test(p.policyPool), "project.policyPool pattern");
  require(p && Array.isArray(p.links) && p.links.length >= 1, "project.links minItems");
  require(p && p.links.every((l) => hasOnlyKeys(l, ["type", "url", "title"]) && ID_PATTERN.test(l.type) && typeof l.url === "string" && l.url.length >= 3 && typeof l.title === "string" && l.title.length >= 1), "project.links shape");
  require(p && (!p.tags || (Array.isArray(p.tags) && p.tags.every((t) => ID_PATTERN.test(t)))), "project.tags pattern");

  const i = m.intent;
  require(i && hasOnlyKeys(i, ["goals", "nonGoals"]), "intent keys");
  require(i && isNonEmptyStringArray(i.goals), "intent.goals");
  require(i && isNonEmptyStringArray(i.nonGoals), "intent.nonGoals");

  const b = m.boundaries;
  require(b && hasOnlyKeys(b, ["owns", "doesNotOwn", "publicSurfaces", "allowedDependencies", "forbiddenCouplings"]), "boundaries keys");
  require(b && Array.isArray(b.owns) && b.owns.length >= 1, "boundaries.owns minItems");
  require(b && b.owns.every((o) => hasOnlyKeys(o, ["id", "name", "description"]) && ID_PATTERN.test(o.id) && typeof o.name === "string" && o.name.length >= 1 && typeof o.description === "string" && o.description.length >= 20), "boundaries.owns shape");
  require(b && isNonEmptyStringArray(b.doesNotOwn), "boundaries.doesNotOwn");
  require(b && Array.isArray(b.publicSurfaces) && b.publicSurfaces.every((s) => hasOnlyKeys(s, ["type", "name", "location", "description"]) && ID_PATTERN.test(s.type) && typeof s.name === "string" && s.name.length >= 1 && typeof s.location === "string" && s.location.length >= 1), "boundaries.publicSurfaces shape");
  require(b && Array.isArray(b.allowedDependencies) && b.allowedDependencies.every((d) => hasOnlyKeys(d, ["owner", "surface", "direction"]) && typeof d.owner === "string" && d.owner.length >= 1 && typeof d.surface === "string" && d.surface.length >= 1 && ID_PATTERN.test(d.direction)), "boundaries.allowedDependencies shape");
  require(b && isNonEmptyStringArray(b.forbiddenCouplings), "boundaries.forbiddenCouplings");

  const a = m.architecture;
  require(a && hasOnlyKeys(a, ["generationRef", "standardPackages", "capabilities", "components", "profileBindings", "moduleGraph", "stateAuthorities", "availability", "trustBoundaries", "extensions", "adoptionStatus", "gaps"]), "architecture keys");
  require(a && typeof a.generationRef === "string" && a.generationRef.length >= 3, "architecture.generationRef");
  require(a && Array.isArray(a.standardPackages) && a.standardPackages.length >= 1 && new Set(a.standardPackages).size === a.standardPackages.length && a.standardPackages.every((s) => ID_PATTERN.test(s)), "architecture.standardPackages");
  require(a && Array.isArray(a.capabilities) && a.capabilities.length >= 1 && new Set(a.capabilities).size === a.capabilities.length && a.capabilities.every((c) => ID_PATTERN.test(c)), "architecture.capabilities");
  require(a && ["not-applicable", "not-started", "migrating", "adopted", "gapped"].includes(a.adoptionStatus), "architecture.adoptionStatus enum");
  require(a && Array.isArray(a.gaps) && a.gaps.every((g) => hasOnlyKeys(g, ["id", "description", "owner", "exitCondition"]) && ID_PATTERN.test(g.id) && typeof g.description === "string" && g.description.length >= 10 && typeof g.owner === "string" && g.owner.length >= 1 && typeof g.exitCondition === "string" && g.exitCondition.length >= 10), "architecture.gaps shape");
  if (a && a.components) {
    require(Object.keys(a.components).every((k) => ID_PATTERN.test(k)), "components ids");
    require(Object.values(a.components).every((c) => hasOnlyKeys(c, ["role", "implementation", "backendOwner", "ownedEffects"]) && ID_PATTERN.test(c.role) && ID_PATTERN.test(c.implementation) && (c.backendOwner === null || (typeof c.backendOwner === "object" && hasOnlyKeys(c.backendOwner, ["repository", "componentId"]) && typeof c.backendOwner.repository === "string" && c.backendOwner.repository.length >= 3 && ID_PATTERN.test(c.backendOwner.componentId))) && Array.isArray(c.ownedEffects) && c.ownedEffects.every((e) => ID_PATTERN.test(e))), "components shape");
  }
  if (a && a.profileBindings) {
    require(Object.entries(a.profileBindings).every(([k, v]) => ID_PATTERN.test(k) && hasOnlyKeys(v, ["revision", "contentDigest"]) && REVISION_PATTERN.test(v.revision) && SHA256_PATTERN.test(v.contentDigest)), "profileBindings shape");
  }
  if (a && a.moduleGraph) {
    require(hasOnlyKeys(a.moduleGraph, ["cyclePolicy", "internalAccessPolicy", "allowedEdges", "enforcementCommands"]) && a.moduleGraph.cyclePolicy === "forbidden" && a.moduleGraph.internalAccessPolicy === "public-api-only" && Array.isArray(a.moduleGraph.allowedEdges) && a.moduleGraph.allowedEdges.every((e) => hasOnlyKeys(e, ["from", "to"]) && ID_PATTERN.test(e.from) && ID_PATTERN.test(e.to)) && isNonEmptyStringArray(a.moduleGraph.enforcementCommands), "moduleGraph shape");
  }

  const d = m.documentation;
  require(d && hasOnlyKeys(d, ["adrs", "specs", "catalog", "runbooks", "generatedReferences"]), "documentation keys");
  require(d && Object.values(d).every((h) => hasOnlyKeys(h, ["location", "status"]) && typeof h.location === "string" && h.location.length >= 1 && ["present", "not-applicable", "planned"].includes(h.status)), "documentation homes shape");

  const dl = m.delivery;
  require(dl && hasOnlyKeys(dl, ["lane", "ciModel", "verificationCommands", "terminalBoundary", "recoveryClass", "deployable", "packageRelease", "runnerProfiles"]), "delivery keys");
  require(dl && typeof dl.lane === "string" && dl.lane.length >= 3, "delivery.lane");
  require(dl && ID_PATTERN.test(dl.ciModel), "delivery.ciModel pattern");
  require(dl && isNonEmptyStringArray(dl.verificationCommands), "delivery.verificationCommands");
  require(dl && typeof dl.terminalBoundary === "string" && dl.terminalBoundary.length >= 20, "delivery.terminalBoundary min length");
  require(dl && ID_PATTERN.test(dl.recoveryClass), "delivery.recoveryClass pattern");
  require(dl && typeof dl.deployable === "boolean", "delivery.deployable boolean");
  if (dl && dl.packageRelease) {
    require(hasOnlyKeys(dl.packageRelease, ["producer", "strategy", "artifactKinds", "registryRefs"]) && typeof dl.packageRelease.producer === "boolean" && ID_PATTERN.test(dl.packageRelease.strategy), "packageRelease shape");
    require(!dl.packageRelease.producer || (Array.isArray(dl.packageRelease.artifactKinds) && dl.packageRelease.artifactKinds.length >= 1 && dl.packageRelease.artifactKinds.every((k) => ID_PATTERN.test(k)) && Array.isArray(dl.packageRelease.registryRefs) && dl.packageRelease.registryRefs.length >= 1 && dl.packageRelease.registryRefs.every((r) => typeof r === "string" && r.length >= 3)), "packageRelease producer facts");
  }

  const c = m.commercial;
  require(c && hasOnlyKeys(c, ["status", "decisionHome", "pricingSourceOfTruth", "metricsSourceOfTruth", "guardrails"]) && ["not-applicable", "internal", "candidate", "commercial"].includes(c.status) && typeof c.decisionHome === "string" && c.decisionHome.length >= 5, "commercial shape");

  const ad = m.adoption;
  require(ad && hasOnlyKeys(ad, ["status", "gaps"]) && ["not-applicable", "not-started", "migrating", "adopted", "gapped"].includes(ad.status) && Array.isArray(ad.gaps) && ad.gaps.every((g) => hasOnlyKeys(g, ["id", "description", "owner", "exitCondition"]) && ID_PATTERN.test(g.id) && typeof g.description === "string" && g.description.length >= 10 && typeof g.owner === "string" && g.owner.length >= 1 && typeof g.exitCondition === "string" && g.exitCondition.length >= 10), "adoption shape");

  return errors;
}

function parseFences(text) {
  const out = { fences: [] };
  let current = null;
  const lines = text.split("\n");
  for (let n = 0; n < lines.length; n += 1) {
    const line = lines[n].replace(/\s+$/, "");
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const indent = line.match(/^\s*/)[0].length;
    const pair = line.trim().match(/^([A-Za-z][A-Za-z0-9-]*):\s*(.*)$/);
    if (indent === 0) {
      if (!pair) return { error: `line ${n + 1}: malformed top-level entry` };
      out[pair[1]] = pair[1] === "fences" ? [] : pair[2];
      current = null;
    } else if (indent === 2 && line.trim().startsWith("- ")) {
      const itemPair = line.trim().slice(2).match(/^([A-Za-z][A-Za-z0-9-]*):\s*(.*)$/);
      if (!itemPair) return { error: `line ${n + 1}: malformed fence entry` };
      current = { [itemPair[1]]: itemPair[2] };
      out.fences.push(current);
    } else if (indent === 4 && current && pair) {
      current[pair[1]] = pair[2];
    } else {
      return { error: `line ${n + 1}: unexpected format` };
    }
  }
  return out;
}

let fences;
try {
  fences = parseFences(fs.readFileSync(path.join(root, "fences.yaml"), "utf8"));
} catch (err) {
  fences = { error: err.message };
}
const implementedChecks = new Set([
  "instruction-authority",
  "project-facts",
  "dependency-fence",
  "legacy-retirement",
]);

check(
  "fences-wellformed",
  !fences.error &&
    Object.keys(fences).every((k) => ["schemaVersion", "kind", "owner", "fences"].includes(k)) &&
    fences.schemaVersion === "1" &&
    fences.kind === "RepoFences" &&
    typeof fences.owner === "string" &&
    fences.owner.length >= 1 &&
    Array.isArray(fences.fences) &&
    fences.fences.length >= 1,
  fences.error || "fences.yaml must declare schemaVersion 1, kind RepoFences, owner, and at least one fence"
);

const fenceIds = fences.fences ? fences.fences.map((f) => f.id) : [];
check(
  "fences-declared",
  fenceIds.length >= 1 &&
    new Set(fenceIds).size === fenceIds.length &&
    fenceIds.every((id) => implementedChecks.has(id)) &&
    fences.fences.every((f) => Object.keys(f).sort().join(",") === "enforcement,id,rule" && typeof f.rule === "string" && f.rule.length >= 10 && f.enforcement === "conformance/check.mjs"),
  "every declared fence id must be unique, implemented, and enforced by conformance/check.mjs"
);

const agents = exists("AGENTS.md") ? read("AGENTS.md") : "";
check(
  "instruction-authority",
  agents.includes(CONSTITUTION_URL) &&
    agents.includes("PROJECT.md") &&
    agents.includes("project.manifest.json") &&
    !LEGACY_PHRASES.some((p) => agents.includes(p)),
  "AGENTS.md must project the Sylphx constitution by link, link PROJECT.md and project.manifest.json, and contain no legacy instruction phrases"
);

const manifestText = exists("project.manifest.json") ? read("project.manifest.json") : "";
let manifest = null;
let manifestParseError = null;
try {
  manifest = JSON.parse(manifestText);
} catch (err) {
  manifestParseError = err.message;
}
const manifestErrors = manifest ? validateManifest(manifest) : [manifestParseError || "project.manifest.json missing"];
check(
  "project-facts",
  exists("PROJECT.md") && manifest !== null && manifestErrors.length === 0,
  manifestErrors.length > 0 ? `project.manifest.json invalid: ${manifestErrors.join("; ")}` : "PROJECT.md must exist and project.manifest.json must validate against the canonical schema"
);

const pkg = exists("package.json") ? JSON.parse(read("package.json")) : {};
const dependencyKeys = ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"];
const hasDependencies = dependencyKeys.some((k) => pkg[k] && Object.keys(pkg[k]).length > 0);
const checkScript = pkg.scripts && pkg.scripts.check;
check(
  "dependency-fence",
  !hasDependencies &&
    checkScript === "node conformance/check.mjs" &&
    exists("conformance/check.mjs"),
  "package.json must declare no dependencies and scripts.check must resolve to node conformance/check.mjs"
);

const residual = exists("AGENTS.legacy.md") ? read("AGENTS.legacy.md") : "";
check(
  "legacy-retirement",
  residual.includes("Retired: 2026-08-11") &&
    residual.includes("Owner: acme-app-owner") &&
    residual.includes("non-authoritative") &&
    LEGACY_PHRASES.every((p) => residual.includes(p)) &&
    !agents.includes("Always ask the ops guild"),
  "AGENTS.legacy.md must be a dated, owned, non-authoritative residual containing the original content, and AGENTS.md must not restate legacy rules"
);

for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} ${r.id}: ${r.detail}`);
}
console.log(`${results.length - failures.length}/${results.length} checks passed`);
process.exitCode = failures.length === 0 ? 0 : 1;
