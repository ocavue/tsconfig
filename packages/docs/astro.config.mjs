import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    starlight({
      title: 'Documentation',
      social: {
        github: 'https://github.com/yourusername/yourrepo',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', slug: 'guides/getting-started' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
