#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CANONICAL_SCHEMA_URL =
  "https://github.com/SylphxAI/skills/blob/main/skills/adopt-repo-standards/references/project-manifest-standard/references/project-manifest.schema.json";
const LEGACY_MARKERS = [
  "Always ask the ops guild before changing anything",
  "Keep all engineering rules in this file",
  "Do not use any other instruction source",
  "echo legacy-check",
];

function read(relative) {
  return readFileSync(join(ROOT, relative), "utf8");
}

function loadJson(relative) {
  return JSON.parse(read(relative));
}

function resolveRef(ref, schema) {
  if (!ref.startsWith("#/$defs/")) {
    throw new Error(`unsupported $ref: ${ref}`);
  }
  const key = ref.slice("#/$defs/".length);
  if (!schema.$defs || !(key in schema.$defs)) {
    throw new Error(`unknown $defs key: ${key}`);
  }
  return schema.$defs[key];
}

function validate(value, node, schema, path, errors) {
  if (node === true) return;
  if (node === false) {
    errors.push(`${path}: schema forbids value`);
    return;
  }
  if (node.$ref) {
    validate(value, resolveRef(node.$ref, schema), schema, path, errors);
    return;
  }
  if (node.type === "object") {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      errors.push(`${path}: expected object`);
      return;
    }
    if (node.required) {
      for (const key of node.required) {
        if (!(key in value)) errors.push(`${path}: missing required property "${key}"`);
      }
    }
    if (node.properties) {
      for (const [key, sub] of Object.entries(node.properties)) {
        if (key in value) validate(value[key], sub, schema, `${path}.${key}`, errors);
      }
    }
    if (node.propertyNames) {
      for (const key of Object.keys(value)) {
        validate(key, node.propertyNames, schema, `${path}.<name>`, errors);
      }
    }
    if (node.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!node.properties || !(key in node.properties)) {
          errors.push(`${path}: unexpected property "${key}"`);
        }
      }
    } else if (node.additionalProperties && typeof node.additionalProperties === "object") {
      for (const key of Object.keys(value)) {
        if (!node.properties || !(key in node.properties)) {
          validate(value[key], node.additionalProperties, schema, `${path}.${key}`, errors);
        }
      }
    }
  } else if (node.type === "array") {
    if (!Array.isArray(value)) {
      errors.push(`${path}: expected array`);
      return;
    }
    if (node.minItems !== undefined && value.length < node.minItems) {
      errors.push(`${path}: expected at least ${node.minItems} items`);
    }
    if (node.items) {
      for (let i = 0; i < value.length; i++) {
        validate(value[i], node.items, schema, `${path}[${i}]`, errors);
      }
    }
    if (node.uniqueItems) {
      const seen = new Set();
      for (const item of value) {
        const serialized = JSON.stringify(item);
        if (seen.has(serialized)) errors.push(`${path}: duplicate item`);
        seen.add(serialized);
      }
    }
  } else if (node.type === "string") {
    if (typeof value !== "string") {
      errors.push(`${path}: expected string`);
      return;
    }
    if (node.minLength !== undefined && value.length < node.minLength) {
      errors.push(`${path}: shorter than minLength ${node.minLength}`);
    }
    if (node.pattern && !new RegExp(node.pattern).test(value)) {
      errors.push(`${path}: does not match pattern ${node.pattern}`);
    }
  } else if (node.type === "boolean") {
    if (typeof value !== "boolean") errors.push(`${path}: expected boolean`);
  } else if (node.type === "integer") {
    if (!Number.isInteger(value)) errors.push(`${path}: expected integer`);
  } else if (node.type) {
    if (typeof value !== node.type) errors.push(`${path}: expected ${node.type}`);
  }
  if (node.const !== undefined && value !== node.const) {
    errors.push(`${path}: expected const ${JSON.stringify(node.const)}`);
  }
  if (node.enum && !node.enum.includes(value)) {
    errors.push(`${path}: not one of ${JSON.stringify(node.enum)}`);
  }
  if (node.anyOf && !node.anyOf.some((sub) => validateQuiet(value, sub, schema).length === 0)) {
    errors.push(`${path}: matches no anyOf branch`);
  }
  if (node.allOf) {
    for (const sub of node.allOf) validate(value, sub, schema, path, errors);
  }
  if (node.if) {
    const branch = validateQuiet(value, node.if, schema).length === 0 ? node.then : node.else;
    if (branch) validate(value, branch, schema, path, errors);
  }
}

function validateQuiet(value, node, schema) {
  const errors = [];
  validate(value, node, schema, "$", errors);
  return errors;
}

const checks = [];

function check(name, ok, detail) {
  checks.push({ name, ok, detail: detail || "" });
}

const manifest = loadJson("project.manifest.json");
const vendoredSchema = loadJson("scripts/schemas/project-manifest.schema.json");
const packageJson = loadJson("package.json");
const agents = read("AGENTS.md");
const project = read("PROJECT.md");
const readme = read("README.md");

check("manifest is valid JSON", true);
check("vendored schema is pinned to canonical $id", vendoredSchema.$id === CANONICAL_SCHEMA_URL, vendoredSchema.$id);
const schemaErrors = validateQuiet(manifest, vendoredSchema, vendoredSchema);
check("manifest conforms to canonical schema", schemaErrors.length === 0, schemaErrors.join("; "));
check(
  "package.json check script runs the conformance entrypoint",
  packageJson.scripts && packageJson.scripts.check === "node scripts/conformance-check.mjs",
  packageJson.scripts && packageJson.scripts.check
);
check("AGENTS.md exists", agents.length > 0);
check("AGENTS.md links project facts", agents.includes("PROJECT.md") && agents.includes("project.manifest.json"));
const legacyHits = LEGACY_MARKERS.filter((marker) => agents.toLowerCase().includes(marker.toLowerCase()));
check("legacy instruction authority retired from AGENTS.md", legacyHits.length === 0, legacyHits.join("; "));
check("PROJECT.md exists", project.length > 0);
check("PROJECT.md projects the machine manifest", project.includes("project.manifest.json") && project.includes("npm run check"));
check("README points at the baseline surfaces", readme.includes("AGENTS.md") && readme.includes("project.manifest.json"));

let failed = 0;
for (const c of checks) {
  console.log(`${c.ok ? "PASS" : "FAIL"} ${c.name}${c.detail ? ` - ${c.detail}` : ""}`);
  if (!c.ok) failed += 1;
}

if (failed > 0) {
  console.error(`conformance: FAIL (${failed} failing check(s))`);
  process.exit(1);
}

console.log("conformance: PASS");
