import type { APIRoute } from 'astro';
import { site } from '../config/site';

// Generated so the domain stays defined in one place (src/config/site.ts).
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /thank-you',
      'Disallow: /lp/',
      '',
      `Sitemap: ${site.url}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'content-type': 'text/plain; charset=utf-8' } },
  );
