#!/usr/bin/env python3
"""Regression tests for the portable fleet ledger validator."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).resolve().parent))
import validate_fleet_ledger as validator  # noqa: E402


DIGEST = "sha256:" + "a" * 64
NEW_DIGEST = "sha256:" + "b" * 64


def base_capability() -> dict:
    return {
        "id": "orders.list",
        "state": "parity_proven",
        "sourceGlobs": ["src/backend/orders/**"],
        "targetGlobs": ["target/orders/**"],
        "dependencyGlobs": ["db/schema/**", "config/runtime/orders.*"],
        "contract": "proto/orders.proto",
        "contractGlobs": ["proto/shared/**"],
        "proof": {
            "sourceRef": "source-new",
            "targetRef": "target-new",
            "contractDigest": DIGEST,
            "behaviorSpecDigest": DIGEST,
            "corpusDigest": DIGEST,
            "targetArtifactDigest": DIGEST,
            "artifact": "ci://parity/orders.list",
        },
    }


def base_ledger() -> dict:
    return {
        "schemaVersion": 1,
        "migrationId": "fixture",
        "repos": [
            {
                "repo": "example/service",
                "sourceRuntime": "python",
                "targetRuntime": "go",
                "baselineSourceRef": "source-base",
                "currentSourceRef": "source-new",
                "currentTargetRef": "target-new",
                "trackedScopeGlobs": [
                    "src/backend/**",
                    "target/**",
                    "db/schema/**",
                    "config/runtime/**",
                    "proto/**",
                ],
                "capabilities": [base_capability()],
            }
        ],
    }


def admission_errors(ledger: dict, paths: list[str]) -> list[str]:
    structural, repos = validator.validate_ledger(ledger)
    if structural:
        return structural
    return validator.validate_changed_files(
        repos[0], paths, "source-new", "target-new", DIGEST
    )


class FleetLedgerValidatorTests(unittest.TestCase):
    def test_valid_parity_ledger_and_candidate_pass(self) -> None:
        ledger = base_ledger()
        self.assertEqual(validator.validate_ledger(ledger)[0], [])
        self.assertEqual(
            admission_errors(
                ledger,
                [
                    "src/backend/orders/list.py",
                    "target/orders/list.go",
                    "db/schema/orders.sql",
                    "proto/orders.proto",
                ],
            ),
            [],
        )

    def test_dependency_contract_and_target_drift_cannot_bypass(self) -> None:
        for path in (
            "db/schema/orders.sql",
            "proto/orders.proto",
            "target/orders/list.go",
        ):
            with self.subTest(path=path):
                ledger = base_ledger()
                ledger["repos"][0]["capabilities"][0]["proof"]["sourceRef"] = "old"
                ledger["repos"][0]["capabilities"][0]["proof"]["targetRef"] = "old"
                ledger["repos"][0]["capabilities"][0]["proof"][
                    "targetArtifactDigest"
                ] = NEW_DIGEST
                errors = admission_errors(ledger, [path])
                self.assertTrue(errors, path)
                self.assertTrue(any("stale proof" in error for error in errors), errors)

    def test_declared_dimensions_ignore_incomplete_outer_scope(self) -> None:
        fixtures = (
            ("db/schema/orders.sql", "db/schema/**"),
            ("proto/orders.proto", "proto/**"),
            ("target/orders/list.go", "target/**"),
        )
        for path, omitted_scope in fixtures:
            with self.subTest(path=path, omitted_scope=omitted_scope):
                ledger = base_ledger()
                repo = ledger["repos"][0]
                repo["trackedScopeGlobs"].remove(omitted_scope)
                proof = repo["capabilities"][0]["proof"]
                proof["sourceRef"] = "old"
                proof["targetRef"] = "old"
                proof["targetArtifactDigest"] = NEW_DIGEST
                errors = admission_errors(ledger, [path])
                self.assertTrue(errors, path)
                self.assertTrue(any("stale proof" in error for error in errors), errors)

    def test_unclassified_tracked_change_fails(self) -> None:
        errors = admission_errors(base_ledger(), ["src/backend/payments/charge.py"])
        self.assertTrue(any("unclassified" in error for error in errors), errors)

    def test_stale_state_retains_previous_state_and_proof(self) -> None:
        ledger = base_ledger()
        capability = ledger["repos"][0]["capabilities"][0]
        capability.update(
            {
                "state": "stale",
                "previousState": "parity_proven",
                "staleReason": "source behavior changed",
                "staleByRef": "source-new",
                "staleAt": "2026-07-10T12:00:00Z",
            }
        )
        self.assertEqual(validator.validate_ledger(ledger)[0], [])
        del capability["proof"]
        errors = validator.validate_ledger(ledger)[0]
        self.assertTrue(any("retained proof" in error for error in errors), errors)

    def test_retired_source_reintroduction_fails_but_target_era_dependency_can_move(self) -> None:
        ledger = base_ledger()
        capability = ledger["repos"][0]["capabilities"][0]
        capability.update(
            {
                "state": "source_retired",
                "cutover": {
                    "mechanism": "router",
                    "rollback": "forward recovery",
                    "prodProbe": "probe://orders",
                },
                "runtimeReadback": {
                    "targetRef": "target-new",
                    "artifactDigest": DIGEST,
                    "probeArtifact": "probe://orders/run/1",
                    "observedAt": "2026-07-10T12:00:00Z",
                },
                "sourceRetiredAt": "2026-07-10T12:30:00Z",
                "sourcePathAbsent": True,
            }
        )
        self.assertEqual(validator.validate_ledger(ledger)[0], [])
        source_errors = admission_errors(ledger, ["src/backend/orders/reintroduced.py"])
        self.assertTrue(any("after retirement" in error for error in source_errors))
        self.assertEqual(admission_errors(ledger, ["db/schema/orders.sql"]), [])
        self.assertEqual(admission_errors(ledger, ["target/orders/list.go"]), [])

    def test_runtime_readback_binds_exact_target_artifact(self) -> None:
        ledger = base_ledger()
        capability = ledger["repos"][0]["capabilities"][0]
        capability.update(
            {
                "state": "authority_target",
                "cutover": {
                    "mechanism": "router",
                    "rollback": "route to source",
                    "prodProbe": "probe://orders",
                },
                "runtimeReadback": {
                    "targetRef": "target-new",
                    "artifactDigest": NEW_DIGEST,
                    "probeArtifact": "probe://orders/run/1",
                    "observedAt": "2026-07-10T12:00:00Z",
                },
            }
        )
        errors = validator.validate_ledger(ledger)[0]
        self.assertTrue(any("artifactDigest must match" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
