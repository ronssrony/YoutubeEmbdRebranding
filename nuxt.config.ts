// https://nuxt.com/docs/api/configuration/nuxt-config
import { vite as vidstack } from 'vidstack/plugins';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr:false,
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('media-'),
    },
  },
  vite: {
    plugins: [vidstack()],
  },
})
