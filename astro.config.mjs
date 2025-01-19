// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/styles/common.scss"; 
          @import "@/styles/color-variables.scss";
          @import "@/styles/global.scss";
          `,
          quietDeps: true,
        }
      }
    }
  },
});