#!/usr/bin/env python3
from __future__ import annotations

import sys
import unittest
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))

import generate2dsprite
import video2dsprite


class SpriteToolsTest(unittest.TestCase):
    def test_metadata_output_is_explicit(self) -> None:
        image_args = generate2dsprite.build_parser().parse_args(
            [
                "process",
                "--input",
                "sprite.png",
                "--target",
                "asset",
                "--mode",
                "single",
                "--output-dir",
                "out",
            ]
        )
        video_args = video2dsprite.build_parser().parse_args(
            [
                "sample",
                "--clean-dir",
                "frames",
                "--out-dir",
                "out",
            ]
        )
        self.assertIsNone(image_args.metadata)
        self.assertIsNone(video_args.metadata)

    def test_sampling_spans_the_available_motion(self) -> None:
        self.assertEqual(video2dsprite.sample_indices(10, 4), [0, 3, 6, 9])
        self.assertEqual(video2dsprite.sample_indices(3, 8), [0, 1, 2])

    def test_chroma_key_preserves_the_sprite(self) -> None:
        image = Image.new("RGB", (8, 8), (255, 0, 255))
        image.putpixel((4, 4), (30, 160, 220))

        cleaned = video2dsprite.chroma_key_rgba(image)

        self.assertEqual(cleaned.getpixel((0, 0))[3], 0)
        self.assertEqual(cleaned.getpixel((4, 4))[3], 255)

    def test_target_modes_follow_the_public_cli_contract(self) -> None:
        self.assertTrue(generate2dsprite.is_known_target_mode("asset", "single"))
        self.assertTrue(generate2dsprite.is_known_target_mode("player", "player_sheet"))


if __name__ == "__main__":
    unittest.main()
