// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real domain once purchased (see src/config/site.ts).
const SITE_URL = 'https://example.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Utility pages are noindex and must stay out of the sitemap.
      filter: (page) => !/\/(thank-you|lp\/)/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
