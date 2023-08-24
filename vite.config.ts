import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'NodeMenuNeo',
      // the proper extensions will be added
      fileName: 'node-menu-neo',
    },
  },
})
