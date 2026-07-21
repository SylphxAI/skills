#!/usr/bin/env python3
"""Validate a portable proof-bound multi-repository migration ledger.

Structural mode checks state entry evidence. Changed-file mode also fails on
unclassified migration changes, stale source/target proof, target artifact
drift, or reintroduction of a retired source implementation.
"""

from __future__ import annotations

import argparse
import fnmatch
import json
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any


ORDERED_STATES = (
    "source_only",
    "contracted",
    "target_implemented",
    "parity_proven",
    "cutover_ready",
    "authority_target",
    "source_retired",
)
ALLOWED_STATES = set(ORDERED_STATES) | {"stale"}
PARITY_STATES = {"parity_proven", "cutover_ready", "authority_target"}
CUTOVER_STATES = {"cutover_ready", "authority_target", "source_retired"}
READBACK_STATES = {"authority_target", "source_retired"}
VERIFICATION_STAGES = {
    "development",
    "internal_dogfood",
    "internal_beta",
    "public_production",
}
DIGEST_RE = re.compile(r"^sha256:[0-9a-f]{64}$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("ledger", type=Path, help="Path to migration ledger JSON")
    parser.add_argument("--repo", help="Repository to evaluate for changed-file admission")
    parser.add_argument(
        "--changed-files",
        type=Path,
        help="Newline-delimited paths changed between the base and candidate",
    )
    parser.add_argument(
        "--candidate-source-ref",
        help="Exact source revision represented by the candidate",
    )
    parser.add_argument(
        "--candidate-target-ref",
        help="Exact target revision represented by the candidate",
    )
    parser.add_argument(
        "--candidate-target-artifact-digest",
        help="Exact sha256 digest of the target artifact used for parity",
    )
    return parser.parse_args()


def is_nonempty_string(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def is_string_list(value: Any, *, allow_empty: bool = False) -> bool:
    return (
        isinstance(value, list)
        and (allow_empty or bool(value))
        and all(is_nonempty_string(item) for item in value)
    )


def is_sha256_digest(value: Any) -> bool:
    return isinstance(value, str) and DIGEST_RE.fullmatch(value) is not None


def is_timestamp(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    try:
        datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return False
    return True


def matches(path: str, patterns: list[str]) -> bool:
    normalized = path.removeprefix("./")
    return any(fnmatch.fnmatchcase(normalized, pattern.removeprefix("./")) for pattern in patterns)


def require_strings(
    obj: dict[str, Any], keys: tuple[str, ...], context: str, errors: list[str]
) -> None:
    for key in keys:
        if not is_nonempty_string(obj.get(key)):
            errors.append(f"{context}: missing non-empty {key}")


def require_digests(
    obj: dict[str, Any], keys: tuple[str, ...], context: str, errors: list[str]
) -> None:
    for key in keys:
        if not is_sha256_digest(obj.get(key)):
            errors.append(f"{context}: {key} must be sha256:<64 lowercase hex>")


def validate_capability(
    capability: Any, repo_name: str, index: int, errors: list[str]
) -> str | None:
    context = f"{repo_name}.capabilities[{index}]"
    if not isinstance(capability, dict):
        errors.append(f"{context}: must be an object")
        return None

    capability_id = capability.get("id")
    if not is_nonempty_string(capability_id):
        errors.append(f"{context}: missing non-empty id")
        return None
    context = f"{repo_name}:{capability_id}"

    state = capability.get("state")
    if state not in ALLOWED_STATES:
        errors.append(f"{context}: invalid state {state!r}")
        return capability_id
    if not is_string_list(capability.get("sourceGlobs")):
        errors.append(f"{context}: sourceGlobs must be a non-empty string list")
    if "dependencyGlobs" in capability and not is_string_list(
        capability.get("dependencyGlobs"), allow_empty=True
    ):
        errors.append(f"{context}: dependencyGlobs must be a string list")
    if "contractGlobs" in capability and not is_string_list(
        capability.get("contractGlobs"), allow_empty=True
    ):
        errors.append(f"{context}: contractGlobs must be a string list")

    validation_state = state
    if state == "stale":
        require_strings(
            capability,
            ("staleReason", "staleByRef", "previousState"),
            context,
            errors,
        )
        if not is_timestamp(capability.get("staleAt")):
            errors.append(f"{context}: staleAt must be an ISO-8601 timestamp")
        previous_state = capability.get("previousState")
        if previous_state not in PARITY_STATES:
            errors.append(
                f"{context}: stale previousState must be parity_proven, "
                "cutover_ready, or authority_target"
            )
            validation_state = "parity_proven"
        else:
            validation_state = previous_state

    state_index = ORDERED_STATES.index(validation_state)
    if state_index >= ORDERED_STATES.index("contracted") and not is_nonempty_string(
        capability.get("contract")
    ):
        errors.append(f"{context}: {state} requires contract")
    if state_index >= ORDERED_STATES.index("target_implemented") and not is_string_list(
        capability.get("targetGlobs")
    ):
        errors.append(f"{context}: {state} requires non-empty targetGlobs")

    proof: dict[str, Any] = {}
    if validation_state in PARITY_STATES or validation_state == "source_retired":
        raw_proof = capability.get("proof")
        if not isinstance(raw_proof, dict):
            errors.append(f"{context}: {state} requires retained proof")
        else:
            proof = raw_proof
            require_strings(
                proof,
                ("sourceRef", "targetRef", "artifact"),
                f"{context}.proof",
                errors,
            )
            require_digests(
                proof,
                (
                    "contractDigest",
                    "behaviorSpecDigest",
                    "corpusDigest",
                    "targetArtifactDigest",
                ),
                f"{context}.proof",
                errors,
            )

    if validation_state in CUTOVER_STATES:
        cutover = capability.get("cutover")
        if not isinstance(cutover, dict):
            errors.append(f"{context}: {state} requires cutover")
        else:
            require_strings(
                cutover,
                ("mechanism", "rollback"),
                f"{context}.cutover",
                errors,
            )
            stage = cutover.get("verificationStage")
            probe = cutover.get("verificationProbe")
            if stage is None and is_nonempty_string(cutover.get("prodProbe")):
                # Backward-compatible interpretation of the old field.
                stage = "public_production"
                probe = cutover.get("prodProbe")
            if stage not in VERIFICATION_STAGES:
                errors.append(
                    f"{context}.cutover: verificationStage must be one of "
                    f"{sorted(VERIFICATION_STAGES)}"
                )
            if not is_nonempty_string(probe):
                errors.append(f"{context}.cutover: missing verificationProbe")

    if validation_state in READBACK_STATES:
        readback = capability.get("verificationReadback")
        readback_context = f"{context}.verificationReadback"
        if readback is None and isinstance(capability.get("runtimeReadback"), dict):
            # Old runtimeReadback records are production-stage compatibility input.
            readback = capability.get("runtimeReadback")
            readback_context = f"{context}.runtimeReadback"
        if not isinstance(readback, dict):
            errors.append(f"{context}: {state} requires verificationReadback")
        else:
            require_strings(
                readback,
                ("targetRef", "probeArtifact"),
                readback_context,
                errors,
            )
            readback_stage = readback.get("verificationStage")
            if readback_context.endswith(".runtimeReadback") and readback_stage is None:
                readback_stage = "public_production"
            if readback_stage not in VERIFICATION_STAGES:
                errors.append(
                    f"{readback_context}: verificationStage must be one of "
                    f"{sorted(VERIFICATION_STAGES)}"
                )
            cutover = capability.get("cutover", {})
            cutover_stage = cutover.get("verificationStage")
            if cutover_stage is None and is_nonempty_string(cutover.get("prodProbe")):
                cutover_stage = "public_production"
            if readback_stage != cutover_stage:
                errors.append(
                    f"{context}: verification readback stage must match cutover stage"
                )
            if not is_sha256_digest(readback.get("artifactDigest")):
                errors.append(
                    f"{readback_context}: artifactDigest must be "
                    "sha256:<64 lowercase hex>"
                )
            if not is_timestamp(readback.get("observedAt")):
                errors.append(
                    f"{readback_context}: observedAt must be an ISO-8601 timestamp"
                )
            if readback.get("targetRef") != proof.get("targetRef"):
                errors.append(
                    f"{context}: verification readback targetRef must match proof.targetRef"
                )
            if readback.get("artifactDigest") != proof.get("targetArtifactDigest"):
                errors.append(
                    f"{context}: verification readback artifactDigest must match "
                    "proof.targetArtifactDigest"
                )

    if validation_state == "source_retired":
        if not is_timestamp(capability.get("sourceRetiredAt")):
            errors.append(f"{context}: sourceRetiredAt must be an ISO-8601 timestamp")
        if capability.get("sourcePathAbsent") is not True:
            errors.append(f"{context}: source_retired requires sourcePathAbsent=true")

    return capability_id


def validate_ledger(data: Any) -> tuple[list[str], list[dict[str, Any]]]:
    errors: list[str] = []
    if not isinstance(data, dict):
        return ["ledger: root must be an object"], []
    if data.get("schemaVersion") != 1:
        errors.append("ledger: schemaVersion must equal 1")
    if not is_nonempty_string(data.get("migrationId")):
        errors.append("ledger: migrationId must be a non-empty string")
    repos = data.get("repos")
    if not isinstance(repos, list) or not repos:
        errors.append("ledger: repos must be a non-empty list")
        return errors, []

    seen_repos: set[str] = set()
    for repo_index, repo in enumerate(repos):
        context = f"repos[{repo_index}]"
        if not isinstance(repo, dict):
            errors.append(f"{context}: must be an object")
            continue
        repo_name = repo.get("repo")
        if not is_nonempty_string(repo_name):
            errors.append(f"{context}: missing non-empty repo")
            repo_name = context
        elif repo_name in seen_repos:
            errors.append(f"{context}: duplicate repo {repo_name}")
        else:
            seen_repos.add(repo_name)
        require_strings(
            repo,
            (
                "sourceRuntime",
                "targetRuntime",
                "baselineSourceRef",
                "currentSourceRef",
                "currentTargetRef",
            ),
            str(repo_name),
            errors,
        )
        if not is_string_list(repo.get("trackedScopeGlobs")):
            errors.append(f"{repo_name}: trackedScopeGlobs must be a non-empty string list")
        capabilities = repo.get("capabilities")
        if not isinstance(capabilities, list) or not capabilities:
            errors.append(f"{repo_name}: capabilities must be a non-empty list")
            continue
        seen_capabilities: set[str] = set()
        for capability_index, capability in enumerate(capabilities):
            capability_id = validate_capability(
                capability, str(repo_name), capability_index, errors
            )
            if capability_id:
                if capability_id in seen_capabilities:
                    errors.append(f"{repo_name}: duplicate capability {capability_id}")
                seen_capabilities.add(capability_id)
    return errors, repos


def capability_dimensions(capability: dict[str, Any], path: str) -> set[str]:
    dimensions: set[str] = set()
    patterns_by_dimension = {
        "source": capability.get("sourceGlobs", []),
        "target": capability.get("targetGlobs", []),
        "dependency": capability.get("dependencyGlobs", []),
        "contract": [capability.get("contract")]
        + capability.get("contractGlobs", []),
    }
    for dimension, patterns in patterns_by_dimension.items():
        usable = [pattern for pattern in patterns if is_nonempty_string(pattern)]
        if matches(path, usable):
            dimensions.add(dimension)
    return dimensions


def validate_changed_files(
    repo: dict[str, Any],
    changed_files: list[str],
    candidate_source_ref: str,
    candidate_target_ref: str,
    candidate_target_artifact_digest: str,
) -> list[str]:
    errors: list[str] = []
    repo_name = repo["repo"]
    if repo.get("currentSourceRef") != candidate_source_ref:
        errors.append(
            f"{repo_name}: currentSourceRef={repo.get('currentSourceRef')!r}; "
            f"expected exact candidate {candidate_source_ref!r}"
        )
    if repo.get("currentTargetRef") != candidate_target_ref:
        errors.append(
            f"{repo_name}: currentTargetRef={repo.get('currentTargetRef')!r}; "
            f"expected exact candidate {candidate_target_ref!r}"
        )
    if not is_sha256_digest(candidate_target_artifact_digest):
        errors.append(
            f"{repo_name}: candidate target artifact digest must be "
            "sha256:<64 lowercase hex>"
        )

    scope = repo.get("trackedScopeGlobs", [])
    capabilities = repo.get("capabilities", [])
    affected: dict[str, dict[str, set[str]]] = {}
    unclassified: list[str] = []

    for path in sorted(set(changed_files)):
        matched = False
        for capability in capabilities:
            dimensions = capability_dimensions(capability, path)
            if dimensions:
                capability_id = capability["id"]
                record = affected.setdefault(
                    capability_id, {"paths": set(), "dimensions": set()}
                )
                record["paths"].add(path)
                record["dimensions"].update(dimensions)
                matched = True
        # Capability mappings are authoritative for classified migration files.
        # trackedScopeGlobs only discovers files that still need classification;
        # an incomplete outer scope must never suppress a declared dimension.
        if not matched and matches(path, scope):
            unclassified.append(path)

    if unclassified:
        errors.append(
            f"{repo_name}: unclassified tracked migration changes: "
            f"{', '.join(unclassified)}"
        )

    capability_by_id = {capability["id"]: capability for capability in capabilities}
    for capability_id, record in sorted(affected.items()):
        capability = capability_by_id[capability_id]
        state = capability["state"]
        paths = record["paths"]
        dimensions = record["dimensions"]
        context = f"{repo_name}:{capability_id} ({', '.join(sorted(paths))})"

        if state == "source_retired":
            if "source" in dimensions:
                errors.append(f"{context}: source implementation changed after retirement")
            continue
        if state == "stale" or state not in PARITY_STATES:
            continue

        proof = capability.get("proof", {})
        if dimensions & {"source", "dependency", "contract"}:
            if proof.get("sourceRef") != candidate_source_ref:
                errors.append(
                    f"{context}: stale proof sourceRef={proof.get('sourceRef')!r}; "
                    f"expected {candidate_source_ref!r} or state=stale"
                )
        if dimensions & {"target", "dependency", "contract"}:
            if proof.get("targetRef") != candidate_target_ref:
                errors.append(
                    f"{context}: stale proof targetRef={proof.get('targetRef')!r}; "
                    f"expected {candidate_target_ref!r} or state=stale"
                )
            if proof.get("targetArtifactDigest") != candidate_target_artifact_digest:
                errors.append(
                    f"{context}: stale proof targetArtifactDigest="
                    f"{proof.get('targetArtifactDigest')!r}; expected exact candidate "
                    f"{candidate_target_artifact_digest!r} or state=stale"
                )

    return errors


def main() -> int:
    args = parse_args()
    if bool(args.changed_files) != bool(args.repo):
        print("--changed-files and --repo must be provided together", file=sys.stderr)
        return 2
    if args.changed_files and not all(
        (
            args.candidate_source_ref,
            args.candidate_target_ref,
            args.candidate_target_artifact_digest,
        )
    ):
        print(
            "--candidate-source-ref, --candidate-target-ref, and "
            "--candidate-target-artifact-digest are required with --changed-files",
            file=sys.stderr,
        )
        return 2

    try:
        data = json.loads(args.ledger.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"failed to read ledger: {error}", file=sys.stderr)
        return 2

    errors, repos = validate_ledger(data)
    if not errors and args.repo:
        selected = [repo for repo in repos if repo.get("repo") == args.repo]
        if not selected:
            errors.append(f"ledger: repo {args.repo!r} not found")
        else:
            try:
                changed_files = [
                    line.strip().removeprefix("./")
                    for line in args.changed_files.read_text(encoding="utf-8").splitlines()
                    if line.strip()
                ]
            except OSError as error:
                errors.append(f"failed to read changed files: {error}")
            else:
                errors.extend(
                    validate_changed_files(
                        selected[0],
                        changed_files,
                        args.candidate_source_ref,
                        args.candidate_target_ref,
                        args.candidate_target_artifact_digest,
                    )
                )

    if errors:
        print(f"Migration ledger validation failed with {len(errors)} error(s):", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    capability_count = sum(len(repo.get("capabilities", [])) for repo in repos)
    print(f"Validated {len(repos)} repos and {capability_count} capabilities")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
