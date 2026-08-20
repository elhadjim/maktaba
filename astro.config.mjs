// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://maktaba.example',
  i18n: {
    locales: ['fr', 'ar', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: false
    }
  },
  // pagefind must stay last in the integrations array
  integrations: [mdx(), pagefind()]
});