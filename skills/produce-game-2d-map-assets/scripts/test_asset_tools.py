#!/usr/bin/env python3
from __future__ import annotations

import sys
import tempfile
import unittest
from pathlib import Path

from PIL import Image

sys.path.insert(0, str(Path(__file__).parent))

import compose_layered_preview
import extract_prop_pack


class AssetToolsTest(unittest.TestCase):
    def test_inventory_output_is_explicit(self) -> None:
        args = extract_prop_pack.build_parser().parse_args(
            [
                "--input",
                "sheet.png",
                "--rows",
                "1",
                "--cols",
                "1",
                "--output-dir",
                "props",
            ]
        )
        self.assertIsNone(args.manifest)

    def test_extract_keeps_subject_and_clears_magenta_background(self) -> None:
        image = Image.new("RGBA", (12, 12), (255, 0, 255, 255))
        for x in range(4, 8):
            for y in range(3, 9):
                image.putpixel((x, y), (20, 120, 220, 255))

        cleaned = extract_prop_pack.remove_bg_magenta(image, 100, 150)

        self.assertEqual(cleaned.getpixel((0, 0))[3], 0)
        self.assertEqual(cleaned.getpixel((5, 5)), (20, 120, 220, 255))

    def test_preview_places_a_prop_at_declared_coordinates(self) -> None:
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary)
            prop_path = root / "prop.png"
            Image.new("RGBA", (3, 3), (255, 0, 0, 255)).save(prop_path)
            canvas = Image.new("RGBA", (10, 10), (0, 0, 0, 255))
            placement = {
                "image": str(prop_path),
                "x": 4,
                "y": 5,
                "anchor": "top-left",
            }

            result = compose_layered_preview.paste_prop(canvas, placement, [root])

            self.assertEqual(canvas.getpixel((4, 5)), (255, 0, 0, 255))
            self.assertEqual(result["left"], 4)
            self.assertEqual(result["top"], 5)


if __name__ == "__main__":
    unittest.main()
