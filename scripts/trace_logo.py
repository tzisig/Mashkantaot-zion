"""Vectorise the brand logo from the raster artwork.

The logo uses exactly two ink colours, so each colour is separated into its own
bitmap, traced with potrace, and written back as one path per colour. That keeps
the letterforms identical to the artwork while producing a real vector file.

Usage:
    python scripts/trace_logo.py <source.png> <out.svg> [--supersample 3]
"""

import argparse
import pathlib

import numpy as np
import potrace
from PIL import Image

NAVY = '#0b1f3a'
CORAL = '#c2410c'


def masks(img: Image.Image) -> tuple[np.ndarray, np.ndarray]:
    """Split the artwork into a navy mask and a coral mask."""
    a = np.asarray(img.convert('RGB')).astype(int)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    lum = (r + g + b) / 3

    ink = lum < 225
    warm = (r - b) > 40  # orange has much more red than blue
    coral = ink & warm
    navy = ink & ~warm
    return navy, coral


def trace(mask: np.ndarray, scale: float, tolerance: float = 0.2, precision: int = 1) -> str:
    """Trace one mask into SVG path data."""
    # potracer expects a boolean array and inverts it in the constructor,
    # so the mask is passed inverted to keep the ink as the traced shape.
    bmp = potrace.Bitmap(~mask.astype(bool))
    path = bmp.trace(turdsize=8, alphamax=1.0, opticurve=True, opttolerance=tolerance)

    def xy(point) -> str:
        return f'{point.x / scale:.{precision}f},{point.y / scale:.{precision}f}'

    parts: list[str] = []

    def emit(curve) -> None:
        parts.append(f'M{xy(curve.start_point)}')
        for segment in curve.segments:
            if segment.is_corner:
                parts.append(f'L{xy(segment.c)}L{xy(segment.end_point)}')
            else:
                parts.append(f'C{xy(segment.c1)} {xy(segment.c2)} {xy(segment.end_point)}')
        parts.append('Z')
        for child in curve.children or []:
            emit(child)

    for curve in path:
        emit(curve)
    return ''.join(parts)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('source')
    ap.add_argument('out')
    ap.add_argument('--supersample', type=int, default=3, help='trace at N times the source size for smoother curves')
    ap.add_argument('--navy', default=NAVY, help='colour for the dark ink; pass #ffffff for the on-dark version')
    ap.add_argument('--tolerance', type=float, default=0.2, help='higher means fewer nodes and a smaller file')
    ap.add_argument('--precision', type=int, default=1, help='decimal places kept in the path data')
    args = ap.parse_args()

    img = Image.open(args.source)
    w, h = img.size
    scale = args.supersample
    big = img.resize((w * scale, h * scale), Image.LANCZOS)

    navy, coral = masks(big)
    navy_d = trace(navy, scale, args.tolerance, args.precision)
    coral_d = trace(coral, scale, args.tolerance, args.precision)

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img" aria-label="משכנתאות ציון">'
        f'<path fill="{args.navy}" fill-rule="evenodd" d="{navy_d}"/>'
        f'<path fill="{CORAL}" fill-rule="evenodd" d="{coral_d}"/>'
        '</svg>'
    )
    pathlib.Path(args.out).write_text(svg, encoding='utf-8')
    print(f'{args.out}: {len(svg) / 1024:.1f}KB')


if __name__ == '__main__':
    main()
