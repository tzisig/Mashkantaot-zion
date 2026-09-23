# A/B test plan - campaign landing pages

Bracket: two pairs in round 1, the two winners meet in round 2.

```
Round 1, pair 1:  lp-a  vs  lp-b     ->  winner 1
Round 1, pair 2:  lp-c  vs  lp-d     ->  winner 2
Round 2:          winner 1 vs winner 2  ->  the page the campaign runs on
```

## The four pages

| Variant | URL | Angle | Hypothesis being tested |
|---|---|---|---|
| lp-a | `/lp/refinance-calculator` | Tool first: calculator above the fold, short form | A self-service number pulls more leads than a claim |
| lp-b | `/lp/refinance-relief` | Pain first: "the monthly payment does not add up" | Naming the pain beats offering a tool |
| lp-c | `/lp/advisor-authority` | Trust first: economist since 2007, paid by the client only | The blocking objection is trust in the advisor |
| lp-d | `/lp/advisor-process` | Clarity first: the four steps, spelled out | Fear of an unclear commitment blocks the lead |

Pair 1 tests **tool vs pain** on the same audience (existing mortgage holders).
Pair 2 tests **credentials vs process** on the same audience (people choosing an advisor).
Keep the pairs apart: never compare lp-a to lp-c in round 1, the audiences differ.

## What each page shares (so the test measures the angle, not the mechanics)

- Same lead form component, same fields per form length, same validation.
- Same WhatsApp and phone actions, same sticky bar on mobile.
- No site navigation, one conversion goal, `noindex`.
- Same design system, so speed and look do not skew the result.

## Measurement

Every page fires `lp_view` with its `variant`. Every tracked click fires
`<action>_lp` with the same `variant`, and a submitted lead fires `generate_lead`
with `variant`. The variant is also written into the lead itself, so the Google
Sheet can be split by page without touching analytics.

Primary metric: **leads / sessions** per variant.
Guardrail metric: **lead quality** - what share of leads turned into a first
call. A page that brings many empty leads did not win.

## How to run it

1. Split traffic 50/50 within one campaign (two ads, same budget, same audience,
   same days). Do not run one page this week and the other next week - seasonality
   will decide the winner instead of the copy.
2. Let each pair run until each page has enough conversions to tell the difference.
   With a conversion rate around 5%, ~100 leads per page is a reasonable target for
   detecting a meaningful gap; below ~30 leads per page the result is noise.
3. Stop both pages in a pair at the same moment.
4. Winner of each pair goes to round 2, again 50/50.

## Before launch

- Set the GA4 measurement ID in `src/config/analytics.ts`, otherwise nothing is recorded.
- Keep `draft: true` in the frontmatter until the copy is approved.
- Landing pages stay out of the sitemap and carry `noindex` - paid traffic only.
