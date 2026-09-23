# Mashkantot Zion

Marketing site for a Hebrew mortgage advisory business. Astro (static), Tailwind v4, RTL.

## Commands

```bash
npm run dev      # local dev server
npm run build    # astro check + static build into dist/
npm run preview  # serve the build
```

Note: this machine blocks some unsigned native Node addons, so `@bruits/satteri-wasm32-wasi`
is installed as the WASI fallback for Astro's markdown pipeline. Keep it.

## Where things live

| Path | What |
|---|---|
| `src/config/site.ts` | Business details. Anything left `null` renders a visible `[חסר: ...]` placeholder instead of fake data. |
| `src/config/analytics.ts` | GA4 / Meta / TikTok IDs and the key-event names. Nothing loads while an ID is `null`. |
| `src/content/services/*.md` | Service pages. Frontmatter carries keywords, FAQs and sources. |
| `src/content/blog/*.md` | Guides. Frontmatter carries keywords, FAQs, sources and the service page each one supports. |
| `src/content/areas/*.md` | City pages. Each needs genuinely local content before launch. |
| `src/pages/*` | Everything else, including the legal drafts. |
| `design-system/mashkantot-zion/MASTER.md` | The design system. Read it before changing styling. |
| `research/` | Keyword research, competitor analysis and the keyword-to-page map. |
| `LEGAL-CHECKLIST.md` | What a lawyer must approve before launch. |
| `scripts/build_logo.py` | Rebuilds the logo lockups (emblem + outlined Rubik wordmark) into `public/brand/`. |
| `design/og-template.html` | Source of `public/og-image.jpg`; screenshot it at 1200x630 after editing. |
| `functions/api/contact.ts` | Contact form endpoint (Cloudflare Pages Function). |
| `scripts/sheets-webhook.gs` | Apps Script that appends a lead to Google Sheets. |

## Content rules

- No invented facts, prices, statistics or testimonials. Missing data gets a `[חסר: ...]` placeholder.
- Every regulatory figure cites a real source, listed in the page frontmatter.
- No promises of savings or approval. The field is regulated.
- Plural address ("אתם") throughout.
- Ofakim is mentioned only on its own city page; the service is nationwide.

## Before launch

1. Fill in `src/config/site.ts` (domain, phone, WhatsApp, email, booking URL).
2. The domain is set once, in `src/config/site.ts`; `astro.config.ts`, the sitemap and `robots.txt` all read it from there.
3. Add the measurement IDs in `src/config/analytics.ts`.
4. Create the Cloudflare Pages project, set the variables from `.env.example`,
   and deploy the Apps Script from `scripts/sheets-webhook.gs`.
5. Have a lawyer approve everything in `LEGAL-CHECKLIST.md`.
6. Replace the `[חסר: ...]` placeholders and the local detail blocks on city pages.
