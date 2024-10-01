import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8081,
    proxy: {
      '^/api': {
        target: 'http://localhost:8080',
        rewrite: (path: any) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})