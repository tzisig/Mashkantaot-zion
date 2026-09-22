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

export const collections = { services, areas };
