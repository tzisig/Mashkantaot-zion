// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/config/site';

// The domain lives in src/config/site.ts only - this file follows it.
export default defineConfig({
  site: site.url,
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
