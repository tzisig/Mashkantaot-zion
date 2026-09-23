# Blog plan

Topics ranked by the volumes in `keyword-map.md`. Each article takes an
informational keyword the service pages do not own, and links once to the
service page it supports.

| # | Working title | Primary keyword | Volume | Supports | Notes |
|---|---|---|---|---|---|
| 1 | ריבית הפריים (done) | ריבית פריים | 10K-100K | `/services/mortgage-refinance` | Needs a dated figure from the Bank of Israel; the article must state the date and link to the source |
| 2 | אישור עקרוני למשכנתא (done) | אישור עקרוני למשכנתא | 1K-10K | `/services/new-mortgage` | Validity period differs per bank - say so instead of picking a number |
| 3 | הלוואת גרייס, בולט ובלון | הלוואת בלון | 1K-10K | `/services/new-mortgage` | Done. Moved to new-mortgage: the topic is contractor deals, not consolidation |
| 4 | תמהיל משכנתא (done) | תמהיל משכנתא | 100-1K | `/services/new-mortgage` | Use the 66.66% variable-rate cap and the 30-year limit |
| 5 | כמה משכנתא אפשר לקבל (done) | כמה משכנתא אפשר לקבל | 100-1K | `/services/new-mortgage` | LTV 75/70/50 and the payment-to-income rule |
| 6 | עמלת פירעון מוקדם: מתי משלמים וכמה | עמלת פירעון מוקדם | 100-1K | `/services/mortgage-refinance` | Five fee types, the 10-45 day notice, the 10-40% statutory discount |
| 7 | הלוואת גישור למשפרי דיור | הלוואת גישור | 100-1K | `/services/equity-mortgage` | Directive 329 treats bridge loans up to three years separately |
| 8 | הקפאת משכנתא ודחיית תשלום | הקפאת משכנתא | 100-1K | `/services/loan-consolidation` | Sensitive topic: no promises, explain the cost of deferral |
| 9 | מה זה משכנתא, בשפה פשוטה | מה זה משכנתא | 100-1K | `/services/new-mortgage` | Entry-level piece, good internal-link hub |

## Rules for every article

- Written through the `article-writer` skill: research first, sources listed in
  the frontmatter, no figure without a source.
- Plural address, business voice ("אנחנו"), no promise of savings or approval.
- One primary keyword per article, and it must not be owned by a service page.
- `supports` points at the service page; the body links to it once, naturally.
- Ship with `draft: true` until the copy is approved.

## Frontmatter

```yaml
---
title: ''
heading: ''            # optional, when the H1 differs from the SEO title
description: ''        # 80-180 characters
primaryKeyword: ''
secondaryKeywords: []
published: 2026-09-23
updated:               # optional
supports: /services/... # optional
faqs: []
sources: []
featured: false
draft: true
---
```
