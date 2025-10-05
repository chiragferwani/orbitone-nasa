
import { defineConfig } from 'astro/config';
import { astroSpaceship } from 'astro-spaceship';

import websiteConfig from 'astro-spaceship/config';

export default defineConfig({
  devToolbar: {
    enabled: false
  },
  integrations: [
    astroSpaceship(websiteConfig)
  ]
});