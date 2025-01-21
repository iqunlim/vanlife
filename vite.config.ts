import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { patchCssModules } from 'vite-css-modules'
// https://vite.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCase",
    }
  },
  plugins: [react(), patchCssModules({ generateSourceTypes: true})],
  build: {
    target: 'es2022'
  }
})
