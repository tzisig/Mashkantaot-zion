"""Build the brand lockups as self-contained SVG files.

The emblem comes from the traced artwork (public/brand/icon.svg) and the
wordmark is rendered from real Rubik outlines, so the files depend on no font
being installed anywhere: the letters are shapes, not text.

Usage:
    python scripts/build_logo.py
"""

import pathlib
import re

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

FONT = 'node_modules/@fontsource-variable/rubik/files/rubik-hebrew-wght-normal.woff2'
ICON = pathlib.Path('public/brand/icon.svg')
OUT = pathlib.Path('public/brand')

NAVY = '#0b1f3a'
CORAL = '#c2410c'
WHITE = '#ffffff'

BRAND = 'משכנתאות'
NAME = 'ציון'
TAGLINE = 'הדרך הבטוחה לדירה שלך'


def load_font(weight: int) -> TTFont:
    """Rubik is variable, so it is pinned to one weight before use."""
    font = TTFont(FONT)
    return instancer.instantiateVariableFont(font, {'wght': weight})


def text_path(font: TTFont, text: str, size: float, x: float, y: float) -> tuple[str, float]:
    """Return SVG path data for right-to-left text, plus the width it used."""
    upem = font['head'].unitsPerEm
    scale = size / upem
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    hmtx = font['hmtx']

    parts: list[str] = []
    cursor = x
    for char in text:  # Hebrew here needs no shaping, only right-to-left placement
        name = cmap.get(ord(char))
        if name is None:
            continue
        advance = hmtx[name][0] * scale
        cursor -= advance
        pen = SVGPathPen(glyph_set, ntos=lambda v: f'{v:.1f}')
        glyph_set[name].draw(pen)
        d = pen.getCommands()
        if d:
            parts.append(f'<path transform="translate({cursor:.1f} {y:.1f}) scale({scale:.4f} {-scale:.4f})" d="{d}"/>')
    return ''.join(parts), x - cursor


def icon_paths() -> tuple[str, str]:
    """Pull the two colour paths out of the traced emblem."""
    svg = ICON.read_text(encoding='utf-8')
    navy = re.search(r'<path fill="#0b1f3a"[^>]*d="([^"]+)"', svg).group(1)
    coral = re.search(r'<path fill="#c2410c"[^>]*d="([^"]+)"', svg).group(1)
    box = re.search(r'viewBox="0 0 (\d+) (\d+)"', svg)
    return navy, coral, int(box.group(1)), int(box.group(2))


def build(stacked: bool, on_dark: bool, tagline: bool = True) -> str:
    navy_d, coral_d, icon_w, icon_h = icon_paths()
    ink = WHITE if on_dark else NAVY
    bold = load_font(900)
    regular = load_font(400)

    brand_size = 96
    tagline_size = 50
    gap = 34

    brand_d, brand_w = text_path(bold, BRAND, brand_size, 0, 0)
    name_d, name_w = text_path(bold, NAME, brand_size, -brand_w - 26, 0)
    word_w = brand_w + 26 + name_w
    tag_d, tag_w = text_path(regular, TAGLINE, tagline_size, 0, 0)

    if stacked:
        icon_scale = 320 / icon_w
        ih = icon_h * icon_scale
        width = max(word_w, 320) + 80
        height = ih + (190 if tagline else 140)
        cx = width / 2
        body = (
            f'<g transform="translate({cx - 160:.1f} 20) scale({icon_scale:.4f})">'
            f'<path fill="{ink}" fill-rule="evenodd" d="{navy_d}"/>'
            f'<path fill="{CORAL}" fill-rule="evenodd" d="{coral_d}"/></g>'
            f'<g fill="{ink}" transform="translate({cx + word_w / 2:.1f} {ih + 110:.1f})">{brand_d}</g>'
            f'<g fill="{CORAL}" transform="translate({cx + word_w / 2:.1f} {ih + 110:.1f})">{name_d}</g>'
            + (
                f'<g fill="{ink}" transform="translate({cx + tag_w / 2:.1f} {ih + 160:.1f})">{tag_d}</g>'
                f'<path stroke="{CORAL}" stroke-width="3" d="M{cx + tag_w / 2 + 16:.1f} {ih + 150:.1f}h34'
                f'M{cx - tag_w / 2 - 50:.1f} {ih + 150:.1f}h34"/>'
                if tagline else ''
            )
        )
    else:
        icon_scale = 150 / icon_h
        iw = icon_w * icon_scale
        width = word_w + iw + gap + 40
        rule_room = 50
        height = 200 if tagline else 150
        width += rule_room
        text_right = width - iw - gap - 20 - rule_room
        tag_right = text_right - (word_w - tag_w) / 2
        body = (
            f'<g transform="translate({width - iw - 20:.1f} 18) scale({icon_scale:.4f})">'
            f'<path fill="{ink}" fill-rule="evenodd" d="{navy_d}"/>'
            f'<path fill="{CORAL}" fill-rule="evenodd" d="{coral_d}"/></g>'
            f'<g fill="{ink}" transform="translate({text_right:.1f} 108)">{brand_d}</g>'
            f'<g fill="{CORAL}" transform="translate({text_right:.1f} 108)">{name_d}</g>'
            # the tagline is centred under the wordmark, not aligned to its edge
            + (
                f'<g fill="{ink}" transform="translate({tag_right:.1f} 158)">{tag_d}</g>'
                f'<path stroke="{CORAL}" stroke-width="3" d="M{tag_right - tag_w - 50:.1f} 148h34'
                f'M{tag_right + 16:.1f} 148h34"/>'
                if tagline else ''
            )
        )

    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.0f} {height:.0f}" '
        f'width="{width:.0f}" height="{height:.0f}" role="img" aria-label="משכנתאות ציון">'
        f'{body}</svg>'
    )


def main() -> None:
    files = {
        'logo-horizontal.svg': build(stacked=False, on_dark=False),
        'logo-horizontal-onDark.svg': build(stacked=False, on_dark=True),
        'logo-stacked.svg': build(stacked=True, on_dark=False),
        'logo-stacked-onDark.svg': build(stacked=True, on_dark=True),
        # Small sizes: the tagline would be unreadable, so it is dropped.
        'logo-horizontal-notag.svg': build(stacked=False, on_dark=False, tagline=False),
        'logo-horizontal-notag-onDark.svg': build(stacked=False, on_dark=True, tagline=False),
        'logo-stacked-notag.svg': build(stacked=True, on_dark=False, tagline=False),
        'logo-stacked-notag-onDark.svg': build(stacked=True, on_dark=True, tagline=False),
    }
    for name, svg in files.items():
        path = OUT / name
        path.write_text(svg, encoding='utf-8')
        print(f'{path}: {len(svg) / 1024:.1f}KB')


if __name__ == '__main__':
    main()
