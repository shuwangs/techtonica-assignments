/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/api/result': 'http://localhost:3001',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    provider: playwright(),
    enable: true,
    instances: [
      {browser: 'chromium'},
    ]


  }
})
