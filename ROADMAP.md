# Roadmap

Agreed order of work (2026-09-22). Done in this order unless the owner says otherwise.

| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Logo | Done | Owner supplied the mark; edited and built into the 8 lockups + square icon in `public/brand/`, plus favicon, apple-touch-icon and og-image. The from-scratch design attempt was dropped, not pending |
| 2 | Campaign landing pages | Done | 4 pages for an A/B bracket; plan in `research/ab-test-plan.md` |
| 3 | Google Calendar booking integration | Done | `/book` page + lazy embed, live calendar connected |
| 4 | Blog infrastructure (content collection) | Done | Archive + article template; topic plan in `research/blog-plan.md` |

| 5 | Personalisation pass on the guides | Doc delivered | `MAKE-IT-YOURS.md`: the repeated constructions to break, and one specific first-hand addition per article. Editing is the owner's to do |

## Before the site goes live

- Delete the `X-Robots-Tag: noindex, nofollow` block from `public/_headers`. It is
  there only while the site runs on *.pages.dev without a domain.
- Add HSTS once the real domain is attached (left out on the shared pages.dev host).

## Blocked on the owner

- Domain purchase: mashkantaotzion.co.il (found free 2026-09-22, not yet registered) -> business email -> SMTP credentials
- Google Business Profile: address + profile URL (`site.googleBusinessUrl`), currently null
- Cloudflare Pages, GA4, Turnstile and Google Sheets accounts
- Lawyer review of `LEGAL-CHECKLIST.md`
- Local detail blocks on the 9 city pages (worksheet ready: `CITY-PAGES.md`)
- Pricing model for `/pricing`
