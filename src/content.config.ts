import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

const faq = z.object({ q: z.string(), a: z.string() });
const source = z.object({ label: z.string(), url: z.string().url() });

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Page H1. Usually the primary keyword in natural Hebrew. */
    heading: z.string(),
    description: z.string().min(80).max(180),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    /** Order in the services index and the numbered strip. */
    order: z.number(),
    icon: z.string(),
    summary: z.string(),
    faqs: z.array(faq).default([]),
    /** Key figures shown in a box. A value of "config:<path>" is resolved from src/config/site.ts. */
    facts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    sources: z.array(source).default([]),
    updated: z.date(),
    /** Draft copy awaiting owner approval - shows a badge in dev only. */
    draft: z.boolean().default(true),
  }),
});

const areas = defineCollection({
  loader: glob({ base: './src/content/areas', pattern: '**/*.md' }),
  schema: z.object({
    city: z.string(),
    title: z.string(),
    heading: z.string(),
    description: z.string().min(80).max(180),
    primaryKeyword: z.string(),
    /** Launch cities render first; later cities are added as content is ready. */
    phase: z.number().default(1),
    /** Shown on the areas index. */
    summary: z.string(),
    faqs: z.array(faq).default([]),
    updated: z.date(),
    draft: z.boolean().default(true),
  }),
});

const landing = defineCollection({
  loader: glob({ base: './src/content/landing', pattern: '**/*.md' }),
  schema: z.object({
    /** Variant id sent with the lead and with the GA4 events, e.g. "lp-a". */
    variant: z.string(),
    /** Which A/B round this page belongs to. */
    round: z.number().default(1),
    /** What this page is testing, in one sentence. For the team, never shown. */
    hypothesis: z.string(),
    title: z.string(),
    description: z.string().min(60).max(180),
    /** Above-the-fold copy. */
    eyebrow: z.string(),
    headline: z.string(),
    /** Word inside the headline to highlight with the marker style. */
    marker: z.string().optional(),
    subhead: z.string(),
    bullets: z.array(z.string()).default([]),
    ctaLabel: z.string().default('לשיחת היכרות'),
    formHeading: z.string().default('השאירו פרטים'),
    formNote: z.string().default('שיחה קצרה, בלי התחייבות ובלי תשלום.'),
    /** Short form = name, phone and subject only. */
    compactForm: z.boolean().default(false),
    /** Show the mortgage calculator above the form. */
    showCalculator: z.boolean().default(false),
    steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    faqs: z.array(faq).default([]),
    updated: z.date(),
    draft: z.boolean().default(true),
  }),
});

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /** Page H1, when it should differ from the SEO title. */
    heading: z.string().optional(),
    description: z.string().min(80).max(180),
    primaryKeyword: z.string(),
    secondaryKeywords: z.array(z.string()).default([]),
    published: z.date(),
    updated: z.date().optional(),
    /** Service page this article supports; linked from the article and the CTA. */
    supports: z.string().optional(),
    faqs: z.array(faq).default([]),
    sources: z.array(source).default([]),
    /** Pin to the top of the archive. */
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
  }),
});

export const collections = { services, areas, landing, guides };
