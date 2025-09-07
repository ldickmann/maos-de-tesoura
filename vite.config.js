import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  // Pré Processadores de CSS (SCSS)
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/assets/styles/scss/variables.scss" as *;
        @use "@/assets/styles/scss/typography.scss" as *;
        @use "@/assets/styles/scss/base.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
