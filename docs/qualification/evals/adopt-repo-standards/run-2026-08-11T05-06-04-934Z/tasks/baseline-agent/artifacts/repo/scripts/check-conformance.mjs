#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const CANONICAL_SCHEMA =
  "https://github.com/SylphxAI/skills/blob/main/skills/adopt-repo-standards/references/project-manifest-standard/references/project-manifest.schema.json";
const ID_PATTERN = /^[a-z0-9]+(?:[-_.][a-z0-9]+)*$/;

function object(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    failures.push(`${label}: must be an object`);
    return null;
  }
  return value;
}

function string(value, label, min = 1) {
  if (typeof value !== "string" || value.trim().length < min) {
    failures.push(`${label}: must be a non-empty string of at least ${min} char(s)`);
    return null;
  }
  return value;
}

function array(value, label, min = 1) {
  if (!Array.isArray(value) || value.length < min) {
    failures.push(`${label}: must contain at least ${min} item(s)`);
    return null;
  }
  return value;
}

function forEach(value, label, min, fn) {
  const items = array(value, label, min);
  if (!items) return;
  items.forEach(fn);
}

function exactKeys(value, expected, label, optional = []) {
  const actual = Object.keys(value).sort();
  const missing = expected.filter((k) => !actual.includes(k)).sort();
  const unexpected = actual
    .filter((k) => !expected.includes(k) && !optional.includes(k))
    .sort();
  if (missing.length) failures.push(`${label}: missing keys ${missing.join(", ")}`);
  if (unexpected.length) failures.push(`${label}: unexpected keys ${unexpected.join(", ")}`);
}

function id(value, label) {
  if (typeof value !== "string" || !ID_PATTERN.test(value)) {
    failures.push(`${label}: must match ^[a-z0-9]+(?:[-_.][a-z0-9]+)*$`);
  }
}

function enumOf(value, allowed, label) {
  if (typeof value !== "string" || !allowed.includes(value)) {
    failures.push(`${label}: must be one of ${allowed.join(", ")}`);
  }
}

function checkGap(gap, label) {
  const g = object(gap, label);
  if (!g) return;
  exactKeys(g, ["id", "description", "owner", "exitCondition"], label);
  id(g.id, `${label}.id`);
  string(g.description, `${label}.description`, 10);
  string(g.owner, `${label}.owner`);
  string(g.exitCondition, `${label}.exitCondition`, 10);
}

function checkDocumentationHome(home, label) {
  const h = object(home, label);
  if (!h) return;
  exactKeys(h, ["location", "status"], label);
  string(h.location, `${label}.location`);
  enumOf(h.status, ["present", "not-applicable", "planned"], `${label}.status`);
}

const requiredSurfaces = [
  "AGENTS.md",
  "PROJECT.md",
  "project.manifest.json",
  "README.md",
  "scripts/check-conformance.mjs",
];
for (const surface of requiredSurfaces) {
  if (!existsSync(join(root, surface))) {
    failures.push(`required baseline surface missing: ${surface}`);
  }
}

const manifestPath = join(root, "project.manifest.json");
if (existsSync(manifestPath)) {
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch (error) {
    failures.push(`project.manifest.json: invalid JSON (${error.message})`);
  }
  if (manifest) {
    if (manifest.$schema !== CANONICAL_SCHEMA) {
      failures.push("project.manifest.json: $schema must point to the canonical project manifest schema");
    }
    if (manifest.schemaVersion !== 2) failures.push("project.manifest.json: schemaVersion must be 2");
    if (manifest.kind !== "ProjectManifest") failures.push("project.manifest.json: kind must be ProjectManifest");

    const project = object(manifest.project, "project");
    if (project) {
      exactKeys(project, ["id", "repository", "name", "summary", "lifecycle", "layer", "visibility", "policyPool", "links", "tags"], "project");
      id(project.id, "project.id");
      string(project.repository, "project.repository", 3);
      string(project.name, "project.name");
      string(project.summary, "project.summary", 20);
      enumOf(project.lifecycle, ["incubating", "active", "production", "commercial", "maintenance", "deprecated", "archived"], "project.lifecycle");
      id(project.layer, "project.layer");
      enumOf(project.visibility, ["private", "internal", "public"], "project.visibility");
      id(project.policyPool, "project.policyPool");
      forEach(project.links, "project.links", 1, (link, index) => {
        const l = object(link, `project.links[${index}]`);
        if (!l) return;
        exactKeys(l, ["type", "url", "title"], `project.links[${index}]`);
        id(l.type, `project.links[${index}].type`);
        string(l.url, `project.links[${index}].url`, 3);
        string(l.title, `project.links[${index}].title`);
      });
      forEach(project.tags, "project.tags", 1, (tag, index) => id(tag, `project.tags[${index}]`));
    }

    const intent = object(manifest.intent, "intent");
    if (intent) {
      exactKeys(intent, ["goals", "nonGoals"], "intent");
      array(intent.goals, "intent.goals");
      array(intent.nonGoals, "intent.nonGoals");
    }

    const boundaries = object(manifest.boundaries, "boundaries");
    if (boundaries) {
      exactKeys(boundaries, ["owns", "doesNotOwn", "publicSurfaces", "allowedDependencies", "forbiddenCouplings"], "boundaries");
      const owns = array(boundaries.owns, "boundaries.owns");
      if (owns) {
        owns.forEach((capability, index) => {
          const c = object(capability, `boundaries.owns[${index}]`);
          if (!c) return;
          exactKeys(c, ["id", "name", "description"], `boundaries.owns[${index}]`);
          id(c.id, `boundaries.owns[${index}].id`);
          string(c.name, `boundaries.owns[${index}].name`);
          string(c.description, `boundaries.owns[${index}].description`, 20);
        });
      }
      array(boundaries.doesNotOwn, "boundaries.doesNotOwn");
      forEach(boundaries.publicSurfaces, "boundaries.publicSurfaces", 0, (surface, index) => {
        const s = object(surface, `boundaries.publicSurfaces[${index}]`);
        if (!s) return;
        exactKeys(s, ["type", "name", "location"], `boundaries.publicSurfaces[${index}]`);
        id(s.type, `boundaries.publicSurfaces[${index}].type`);
        string(s.name, `boundaries.publicSurfaces[${index}].name`);
        string(s.location, `boundaries.publicSurfaces[${index}].location`);
      });
      forEach(boundaries.allowedDependencies, "boundaries.allowedDependencies", 0, (dependency, index) => {
        const d = object(dependency, `boundaries.allowedDependencies[${index}]`);
        if (!d) return;
        exactKeys(d, ["owner", "surface", "direction"], `boundaries.allowedDependencies[${index}]`);
        string(d.owner, `boundaries.allowedDependencies[${index}].owner`);
        string(d.surface, `boundaries.allowedDependencies[${index}].surface`);
        id(d.direction, `boundaries.allowedDependencies[${index}].direction`);
      });
      array(boundaries.forbiddenCouplings, "boundaries.forbiddenCouplings");
    }

    const architecture = object(manifest.architecture, "architecture");
    if (architecture) {
      exactKeys(architecture, ["generationRef", "standardPackages", "capabilities", "components", "moduleGraph", "adoptionStatus", "gaps"], "architecture");
      string(architecture.generationRef, "architecture.generationRef", 3);
      forEach(architecture.standardPackages, "architecture.standardPackages", 1, (pkg, index) => id(pkg, `architecture.standardPackages[${index}]`));
      forEach(architecture.capabilities, "architecture.capabilities", 1, (capability, index) => id(capability, `architecture.capabilities[${index}]`));
      if (architecture.components !== undefined) {
        const components = object(architecture.components, "architecture.components");
        if (components && Object.keys(components).length === 0) {
          failures.push("architecture.components: must contain at least 1 component");
        }
        if (components) {
          for (const [componentId, fact] of Object.entries(components)) {
            const label = `architecture.components.${componentId}`;
            id(componentId, label);
            const f = object(fact, label);
            if (!f) continue;
            exactKeys(f, ["role", "implementation", "backendOwner", "ownedEffects"], label);
            id(f.role, `${label}.role`);
            id(f.implementation, `${label}.implementation`);
            if (f.backendOwner !== null) object(f.backendOwner, `${label}.backendOwner`);
            forEach(f.ownedEffects, `${label}.ownedEffects`, 0, (effect, i) => id(effect, `${label}.ownedEffects[${i}]`));
          }
        }
      }
      if (architecture.moduleGraph !== undefined) {
        const graph = object(architecture.moduleGraph, "architecture.moduleGraph");
        if (graph) {
          exactKeys(graph, ["cyclePolicy", "internalAccessPolicy", "allowedEdges", "enforcementCommands"], "architecture.moduleGraph");
          enumOf(graph.cyclePolicy, ["forbidden"], "architecture.moduleGraph.cyclePolicy");
          enumOf(graph.internalAccessPolicy, ["public-api-only"], "architecture.moduleGraph.internalAccessPolicy");
          forEach(graph.allowedEdges, "architecture.moduleGraph.allowedEdges", 0, (edge, index) => {
            const e = object(edge, `architecture.moduleGraph.allowedEdges[${index}]`);
            if (!e) return;
            exactKeys(e, ["from", "to"], `architecture.moduleGraph.allowedEdges[${index}]`);
            id(e.from, `architecture.moduleGraph.allowedEdges[${index}].from`);
            id(e.to, `architecture.moduleGraph.allowedEdges[${index}].to`);
          });
          array(graph.enforcementCommands, "architecture.moduleGraph.enforcementCommands");
        }
      }
      enumOf(architecture.adoptionStatus, ["not-applicable", "not-started", "migrating", "adopted", "gapped"], "architecture.adoptionStatus");
      forEach(architecture.gaps, "architecture.gaps", 0, (gap, index) => checkGap(gap, `architecture.gaps[${index}]`));
    }

    const documentation = object(manifest.documentation, "documentation");
    if (documentation) {
      exactKeys(documentation, ["adrs", "specs", "catalog", "runbooks", "generatedReferences"], "documentation");
      for (const field of ["adrs", "specs", "catalog", "runbooks", "generatedReferences"]) {
        checkDocumentationHome(documentation[field], `documentation.${field}`);
      }
    }

    const delivery = object(manifest.delivery, "delivery");
    if (delivery) {
      exactKeys(delivery, ["lane", "verificationCommands", "terminalBoundary", "recoveryClass", "deployable"], "delivery", ["ciModel", "packageRelease", "runnerProfiles"]);
      string(delivery.lane, "delivery.lane", 3);
      id(delivery.ciModel, "delivery.ciModel");
      array(delivery.verificationCommands, "delivery.verificationCommands");
      string(delivery.terminalBoundary, "delivery.terminalBoundary", 20);
      id(delivery.recoveryClass, "delivery.recoveryClass");
      if (typeof delivery.deployable !== "boolean") failures.push("delivery.deployable: must be a boolean");
      if (delivery.packageRelease !== undefined) {
        const release = object(delivery.packageRelease, "delivery.packageRelease");
        if (release) {
          exactKeys(release, ["producer", "strategy"], "delivery.packageRelease");
          if (typeof release.producer !== "boolean") failures.push("delivery.packageRelease.producer: must be a boolean");
          id(release.strategy, "delivery.packageRelease.strategy");
          if (release.producer === true) {
            array(release.artifactKinds, "delivery.packageRelease.artifactKinds");
            array(release.registryRefs, "delivery.packageRelease.registryRefs");
          }
        }
      }
      if (delivery.runnerProfiles !== undefined) object(delivery.runnerProfiles, "delivery.runnerProfiles");
    }

    const commercial = object(manifest.commercial, "commercial");
    if (commercial) {
      exactKeys(commercial, ["status", "decisionHome"], "commercial", ["pricingSourceOfTruth", "metricsSourceOfTruth", "guardrails"]);
      enumOf(commercial.status, ["not-applicable", "internal", "candidate", "commercial"], "commercial.status");
      string(commercial.decisionHome, "commercial.decisionHome", 5);
      if (commercial.pricingSourceOfTruth !== undefined) string(commercial.pricingSourceOfTruth, "commercial.pricingSourceOfTruth");
      if (commercial.metricsSourceOfTruth !== undefined) string(commercial.metricsSourceOfTruth, "commercial.metricsSourceOfTruth");
      if (commercial.guardrails !== undefined) forEach(commercial.guardrails, "commercial.guardrails", 0, (guardrail, index) => string(guardrail, `commercial.guardrails[${index}]`));
    }

    const adoption = object(manifest.adoption, "adoption");
    if (adoption) {
      exactKeys(adoption, ["status", "gaps"], "adoption");
      enumOf(adoption.status, ["not-applicable", "not-started", "migrating", "adopted", "gapped"], "adoption.status");
      forEach(adoption.gaps, "adoption.gaps", 0, (gap, index) => checkGap(gap, `adoption.gaps[${index}]`));
    }
  }
}

const agentsPath = join(root, "AGENTS.md");
if (existsSync(agentsPath)) {
  const agents = readFileSync(agentsPath, "utf8");
  for (const link of ["PROJECT.md", "project.manifest.json"]) {
    if (!agents.includes(link)) failures.push(`AGENTS.md: must link local fact authority ${link}`);
  }
  const legacyDirectives = [
    "ops " + "guild",
    "all engineering " + "rules in this file",
    "any other " + "instruction source",
  ];
  for (const directive of legacyDirectives) {
    if (agents.toLowerCase().includes(directive)) {
      failures.push(`AGENTS.md: retired predecessor directive present (${directive})`);
    }
  }
}

const packagePath = join(root, "package.json");
if (existsSync(packagePath)) {
  let packageJson;
  try {
    packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
  } catch (error) {
    failures.push(`package.json: invalid JSON (${error.message})`);
  }
  if (packageJson) {
    const check = packageJson.scripts && packageJson.scripts.check;
    if (typeof check !== "string" || !check.includes("scripts/check-conformance.mjs")) {
      failures.push("package.json: scripts.check must invoke scripts/check-conformance.mjs");
    }
  }
}

if (failures.length > 0) {
  console.error("FAIL: acme-app conformance");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log("OK: acme-app conformance — baseline surfaces present, manifest contract valid, legacy layout retired.");
