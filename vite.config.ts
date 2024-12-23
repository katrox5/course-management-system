import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: './auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/layouts'],
      resolvers: [ElementPlusResolver()],
      dts: './components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/dev': {
        target: 'http://172.26.186.202:8080',
        rewrite: (path) => path.replace(/^\/dev/, ''),
        changeOrigin: true,
      },
      '/git': {
        target: 'https://github.com/',
        rewrite: (path) => path.replace(/^\/git/, ''),
        changeOrigin: true,
      },
    },
  },
})
