"""Build a keyword candidate list for Google Keyword Planner.

Sources:
1. Google autocomplete (public suggest endpoint), expanded per seed with a-z style letter suffixes.
2. Combinatorial city x service patterns.

Output: research/keywords.md (keywords comma-separated, grouped by cluster).
No search volumes here - those come from Keyword Planner.
"""

import json
import random
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

OUT_DIR = Path(__file__).parent
CACHE = OUT_DIR / "autocomplete_cache.json"

SEEDS = [
    "משכנתא", "משכנתה", "משכנתאות", "יועץ משכנתאות", "ייעוץ משכנתאות", "יועץ משכנתא",
    "יעוץ משכנתאות", "יועצת משכנתאות", "מיחזור משכנתא", "מחזור משכנתא", "מיחזור משכנתאות",
    "איחוד הלוואות", "איחוד הלוואות ומשכנתא", "איחוד חובות", "הלוואה לכל מטרה",
    "משכנתא לכל מטרה", "הלוואה כנגד נכס", "הלוואה בשעבוד דירה", "משכנתא ראשונה",
    "משכנתא לזוג צעיר", "משכנתא לדירה ראשונה", "משכנתא לדירה שנייה", "משכנתא למשפרי דיור",
    "משכנתא למשקיעים", "משכנתא הפוכה", "משכנתא חוץ בנקאית", "משכנתא ללא בנק",
    "סירוב למשכנתא", "משכנתא אחרי סירוב", "משכנתא עם bdi", "משכנתא לעצמאים", "משכנתא לעולים",
    "משכנתא לתושבי חוץ", "משכנתא דירה מקבלן", "משכנתא מחיר למשתכן", "משכנתא דירה בהנחה",
    "הלוואת גישור", "משכנתא גישור", "ריבית משכנתא", "ריבית פריים משכנתא", "מסלולי משכנתא",
    "תמהיל משכנתא", "אישור עקרוני משכנתא", "מחשבון משכנתא", "מחשבון מיחזור משכנתא",
    "החזר חודשי משכנתא", "זכאות משכנתא", "עמלת פירעון מוקדם", "פירעון מוקדם משכנתא",
    "ביטוח משכנתא", "הון עצמי משכנתא", "כמה משכנתא אפשר לקבל", "יועץ משכנתאות מחיר",
    "יועץ משכנתאות מומלץ", "יועץ משכנתאות בדרום", "מכרז משכנתאות", "הקפאת משכנתא",
    "הפחתת החזר משכנתא", "פיגור בתשלומי משכנתא", "חובות משכנתא", "הלוואה חוץ בנקאית",
    "משכנתא בנק", "איך לקחת משכנתא", "כדאי למחזר משכנתא", "יועץ משכנתאות עצמאי",
]

LETTERS = list("אבגדהוזחטיכלמנסעפצקרשת")

# Hebrew city names. PHASE1 = launch pages; the rest are in the 2h radius.
PHASE1 = ["אופקים", "נתיבות", "באר שבע", "שדרות", "קריית גת", "אשקלון", "אשדוד", "עומר", "רהט"]
LATER = [
    "דימונה", "ערד", "קריית מלאכי", "גדרה", "יבנה", "רחובות", "גן יבנה", "נס ציונה",
    "ראשון לציון", "בית שמש", "רמלה", "לוד", "מודיעין", "חולון", "בת ים", "תל אביב",
    "רמת גן", "גבעתיים", "בני ברק", "פתח תקווה", "אור יהודה", "יהוד", "קריית אונו",
    "ראש העין", "אלעד", "ירושלים", "הרצליה", "רעננה", "כפר סבא", "הוד השרון", "נתניה",
    "חדרה",
]
CITY_ALIASES = {"באר שבע": ["באר-שבע", "ב\"ש"], "קריית גת": ["קרית גת"], "קריית מלאכי": ["קרית מלאכי"],
                "תל אביב": ["ת\"א"], "קריית אונו": ["קרית אונו"], "פתח תקווה": ["פתח תקוה"]}

CITY_PATTERNS = [
    "יועץ משכנתאות {c}", "יועץ משכנתאות ב{c}", "ייעוץ משכנתאות {c}", "ייעוץ משכנתאות ב{c}",
    "יועץ משכנתא {c}", "יועץ משכנתאות מומלץ {c}", "יועץ משכנתאות מומלץ ב{c}", "משכנתא {c}",
    "משכנתא ב{c}", "משכנתאות {c}", "משכנתאות ב{c}", "מיחזור משכנתא {c}", "מיחזור משכנתא ב{c}",
    "איחוד הלוואות {c}", "איחוד הלוואות ב{c}", "יועץ משכנתאות באזור {c}",
]

RELEVANT = re.compile(
    r"משכנת|הלווא|ריבית|פריים|מיחזור|מחזור|איחוד|חוב|תמהיל|מסלול|bdi|גישור|פירעון|פרעון|הון עצמי|שמאי|יועץ|ייעוץ|יעוץ",
    re.I,
)
NOISE = re.compile(
    r"הצגה|הבימה|תיאטרון|כרטיס|שיר|סרט|מילים|ויקיפדיה|תשבץ|באנגלית|english|מתכון|ילדים משחק|מחזור חודשי|מחזור הדם|מחזור המים|מחזור החיים|מחזור בקבוקים|מחזור פסולת|מחזור נייר|מחזור מים|ווסת|ביוץ|הריון",
    re.I,
)


def fetch(q, cache):
    if q in cache:
        return cache[q]
    url = "https://suggestqueries.google.com/complete/search?" + urllib.parse.urlencode(
        {"client": "firefox", "hl": "iw", "gl": "il", "ie": "utf-8", "oe": "utf-8", "q": q}
    )
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.loads(r.read().decode("utf-8"))
            cache[q] = data[1]
            return data[1]
        except Exception as e:  # rate limit or network hiccup
            print(f"retry {attempt} {q}: {e}", file=sys.stderr)
            time.sleep(5 * (attempt + 1))
    cache[q] = []
    return []


def autocomplete():
    cache = json.loads(CACHE.read_text("utf-8")) if CACHE.exists() else {}
    queries = []
    for s in SEEDS:
        queries.append(s)
        queries += [f"{s} {l}" for l in LETTERS]
    for c in PHASE1 + LATER:
        queries += [f"יועץ משכנתאות {c}", f"משכנתא {c}", f"מיחזור משכנתא {c}"]
    results = set()
    for i, q in enumerate(queries):
        was_cached = q in cache
        results.update(fetch(q, cache))
        if not was_cached:
            time.sleep(0.25 + random.random() * 0.25)
        if i % 50 == 0:
            CACHE.write_text(json.dumps(cache, ensure_ascii=False), "utf-8")
            print(f"{i}/{len(queries)} -> {len(results)}", file=sys.stderr)
    CACHE.write_text(json.dumps(cache, ensure_ascii=False), "utf-8")
    return results


def combinatorial():
    out = set()
    for c in PHASE1 + LATER:
        for name in [c] + CITY_ALIASES.get(c, []):
            out.update(p.format(c=name) for p in CITY_PATTERNS)
    return out


def normalize(k):
    k = re.sub(r"\s+", " ", k.strip().lower())
    return k.replace(",", " ").strip()


CITIES_ALL = PHASE1 + LATER + [a for v in CITY_ALIASES.values() for a in v]
BANKS = re.compile(r"הפועלים|לאומי|מזרחי|טפחות|דיסקונט|בינלאומי|מרכנתיל|ירושלים בנק|בנק ירושלים|אגוד|יהב|פאגי|מסד|וואן זירו|one zero")
CLUSTERS = [
    ("Calculators and tools", re.compile(r"מחשבון|סימולטור|טבלת|לוח סילוקין")),
    ("Refinance", re.compile(r"מיחזור|מחזור")),
    ("Loan and debt consolidation", re.compile(r"איחוד|חוב|הלוואה|הלוואת|פיגור|הקפאת|הסדר")),
    ("Special situations (declined, self-employed, non-bank, bridge)", re.compile(r"סירוב|bdi|עצמא|חוץ בנקאי|ללא בנק|גישור|עולים|תושבי חוץ|הפוכה|מוגבל|בלי תלושים|כינוס|פשיטת")),
    ("Advisor (service intent)", re.compile(r"יועץ|יועצת|ייעוץ|יעוץ|ברוקר")),
    ("Rates, tracks and mix", re.compile(r"ריבית|פריים|מסלול|תמהיל|צמוד|משתנה|קבועה|מדד|עוגן")),
    ("Buying, eligibility and process", re.compile(r"ראשונה|זוג צעיר|משפר|משקיע|קבלן|משתכן|הנחה|זכאות|אישור עקרוני|הון עצמי|כמה|איך|שמאי|ביטוח|מכרז|תהליך|מסמכים|דירה שנייה|שנייה")),
]


def cluster(k):
    if any(c.lower() in k for c in CITIES_ALL):
        return "Cities"
    if BANKS.search(k):
        return "Banks (comparison intent)"
    for name, rx in CLUSTERS:
        if rx.search(k):
            return name
    return "General mortgage"


def main():
    raw = autocomplete() | combinatorial()
    keywords = set()
    for k in raw:
        k = normalize(k)
        if not k or len(k) > 80 or len(k.split()) > 10:
            continue
        if not RELEVANT.search(k) or NOISE.search(k):
            continue
        keywords.add(k)

    groups = {}
    for k in keywords:
        groups.setdefault(cluster(k), []).append(k)
    order = ["Advisor (service intent)", "Cities", "Refinance", "Loan and debt consolidation",
             "Special situations (declined, self-employed, non-bank, bridge)", "Buying, eligibility and process",
             "Rates, tracks and mix", "Calculators and tools", "Banks (comparison intent)", "General mortgage"]

    lines = [
        "# Keyword research - candidate list",
        "",
        f"Total: {len(keywords)} keywords. Sources: Google autocomplete (Israel, Hebrew) + city x service combinations.",
        "No volumes yet - paste into Google Keyword Planner > Get search volume and forecasts.",
        "",
        "## All keywords (paste this block)",
        "",
        ", ".join(sorted(keywords)),
        "",
        "## By cluster",
        "",
    ]
    for name in order:
        ks = sorted(groups.get(name, []))
        lines += [f"### {name} ({len(ks)})", "", ", ".join(ks), ""]
    (OUT_DIR / "keywords.md").write_text("\n".join(lines), "utf-8")
    print(len(keywords), {k: len(v) for k, v in groups.items()})


if __name__ == "__main__":
    main()
