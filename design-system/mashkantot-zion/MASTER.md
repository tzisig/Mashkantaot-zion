# Design system - Mashkantot Zion (MASTER)

Direction: **B "Blueprint"** (approved 2026-09-22, preview in `design/directions.html`).
Idea: an architect's drafting sheet - grid, precise lines, clear numbers. Communicates the precision of an economist. The mortgage calculator is part of the first screen.
Page-specific overrides go in `pages/<page>.md` and win over this file.

## Positioning rules (content that affects design)
- Nationwide service. Do not mention Ofakim or "the South" as a service limit anywhere except `/areas/ofakim`.
- No invented facts, prices, stats or testimonials. Missing data = visible `[חסר: ...]` placeholder.
- No "licensed" / "certified" wording (see `LEGAL-CHECKLIST.md`).

## Color tokens
| Token | Hex | Use |
|---|---|---|
| `--ink` | #0B1F3A | Primary text, headings, borders, dark surfaces |
| `--ink-soft` | #334155 | Secondary text |
| `--muted` | #64748B | Captions, fine print (on white only) |
| `--line` | #2563EB | Blueprint lines, links, small mono labels, focus ring |
| `--line-strong` | #1D4ED8 | Link hover, links on white |
| `--coral` | #C2410C | Primary CTA background (white text) |
| `--coral-dark` | #9A3412 | CTA hover |
| `--highlight` | #FDBA74 | Marker highlight behind heading words (at 40% alpha) |
| `--paper` | #F8FBFF | Page background with grid |
| `--surface` | #FFFFFF | Cards, forms |
| `--grid-major` | #2563EB14 | Grid lines every 80px |
| `--grid-minor` | #2563EB08 | Grid lines every 16px |
| `--success` | #15803D | Form success (with icon + text) |
| `--error` | #B91C1C | Form errors (with icon + text) |

Verified contrast (WCAG AA 4.5:1): ink/paper 15.9, white/coral 5.2, line/paper 5.0, ink-soft/paper 10.0, muted/white 4.8, white/ink 16.5, line-strong/white 6.7, highlight/ink 9.8.
Rule: coral is for CTAs only. Never coral text on paper for body copy.

## Typography
- Family: **Rubik** (Hebrew + Latin), self-hosted woff2 via `@fontsource-variable/rubik`, `font-display: swap`, preload the Hebrew subset.
- Mono labels (section numbers, "// ECONOMIST SINCE 2007"-style tags): `ui-monospace, SFMono-Regular, Menlo, monospace`. Decorative only - never carries essential info.
- Scale (mobile -> desktop, `clamp`): H1 36->60 / 800, H2 28->40 / 700, H3 21->26 / 700, body 17->18 / 400, small 14 / 400. Line height 1.6 body, 1.1 headings.
- Numbers in the calculator and prices: `font-variant-numeric: tabular-nums`, `direction: ltr` inside the element.

## Shape and depth
- Radius: 10px buttons, 16px cards/forms, 999px pills.
- Signature "drafting" shadow: hard offset, no blur - `4px 4px 0 var(--ink)` on primary CTA, `10px 10px 0 #2563EB26` on cards/calculator. RTL: offset stays physical (right-down), consistent with the preview.
- Borders: 2px `--ink` for primary containers (calculator, service strip), 1px `#0B1F3A1F` for secondary cards.

## Spacing (density 3 - spacious)
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 px. Section padding 64px mobile, 96px desktop. Content max width 1200px, text column max 68ch. Side gutter 16px mobile.

## Components (signature)
- **Blueprint background**: paper + 2 grid layers (80px major, 16px minor). Used on hero and calculator page; plain paper elsewhere so the grid stays special.
- **Marker headline**: one key phrase per H1 wrapped in `<mark>` with a highlight gradient under the lower 38%.
- **Mono tag**: small monospace label above headings (`// 01`, section codes). English is fine here because it is decoration: every tag carries `aria-hidden="true"`, and where a section needs a heading the heading is Hebrew (visible, or `sr-only` when the design calls for the tag alone).
- **Numbered service strip**: bordered row of services with `01..0n` mono numbers.
- **Calculator card**: labeled range inputs + number inputs (keyboard/typing alternative), live result in an ink panel, `aria-live="polite"` on the result, fine print "להמחשה בלבד".
- **Primary CTA**: coral, white text, hard ink shadow; hover darkens and shadow shrinks to 2px (pressed feel).
- **Draft marker** (dev only): yellow pill "טיוטה" on pages with `draft: true`.

## Motion (level 5 - standard, CSS only, no GSAP)
- Durations 150-300ms, ease-out. Hover/press on buttons and cards.
- Section reveal: fade + 12px rise via IntersectionObserver, once.
- Calculator result: number updates instantly (no count-up animation that delays the answer).
- All motion behind `prefers-reduced-motion: no-preference`.

## Icons
Lucide (SVG, 1.75px stroke, currentColor). No emoji as icons.

## Accessibility (IS 5568 / WCAG 2.0 AA)
- Visible focus: 3px `--line` outline, 3px offset, never removed.
- Touch targets >= 44x44px.
- Every input has a visible `<label>`; errors with `role="alert"` + icon + text.
- Skip link, one H1 per page, logical heading order, `lang="he" dir="rtl"`.

## Avoid
- Generic blue-white bank look without the grid/drafting details.
- Purple/pink AI gradients, glassmorphism, emoji icons.
- Stock photos of handshakes / keys / smiling couples as hero. If photos are used, a real photo of the advisor comes first.
- Carousels for key content.
