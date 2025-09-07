import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/maos-de-tesoura/',
  plugins: [vue()], // Removido vueDevTools temporariamente
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
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
