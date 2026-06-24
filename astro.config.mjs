import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Update this URL when deploying to production
const site = 'https://petemcpherson.com';

export default defineConfig({
  site,
  integrations: [tailwind(), sitemap()],
});
