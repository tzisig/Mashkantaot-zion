"""Extract keyword candidates from competitor sitemaps (Hebrew URL slugs).

Output: research/competitor_keywords.json (list of keywords).
"""

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

from build_keywords import NOISE, RELEVANT, normalize

OUT = Path(__file__).parent / "competitor_keywords.json"

SITEMAPS = [
    "https://alpm.co.il/sitemap_index.xml",
    "https://www.mbenhanan.co.il/sitemap.xml",
    "https://lemon.co.il/sitemap_index.xml",
    "https://mashcantaman.co.il/sitemap_index.xml",
    "https://www.zvm.co.il/sitemap_index.xml",
    "https://www.maslulmortgage.co.il/sitemap.xml",
]
SKIP_MAPS = re.compile(r"image|author|attachment|media|product_cat|elementor", re.I)
HEBREW = re.compile(r"[֐-׿]")


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read().decode("utf-8", "replace")


def collect(url, seen, depth=0):
    if url in seen or depth > 2:
        return []
    seen.add(url)
    try:
        xml = get(url)
    except Exception as e:
        print("fail", url, e)
        return []
    locs = [re.sub(r"<!\[CDATA\[|\]\]>", "", l).strip() for l in re.findall(r"<loc>\s*(.*?)\s*</loc>", xml)]
    if "<sitemapindex" in xml:
        pages = []
        for loc in locs:
            if not SKIP_MAPS.search(loc):
                pages += collect(loc, seen, depth + 1)
        return pages
    return locs


def slug_to_keyword(url):
    path = urllib.parse.unquote(urllib.parse.urlparse(url).path).strip("/")
    if not path:
        return None
    slug = path.split("/")[-1]
    if not HEBREW.search(slug):
        return None
    return normalize(re.sub(r"[-_]+", " ", slug))


def main():
    keywords = set()
    for sm in SITEMAPS:
        urls = collect(sm, set())
        found = {k for k in map(slug_to_keyword, urls) if k}
        found = {k for k in found if RELEVANT.search(k) and not NOISE.search(k) and len(k) <= 80 and len(k.split()) <= 10}
        print(sm, len(urls), "urls ->", len(found))
        keywords |= found
    OUT.write_text(json.dumps(sorted(keywords), ensure_ascii=False, indent=0), "utf-8")
    print("total", len(keywords))


if __name__ == "__main__":
    main()
