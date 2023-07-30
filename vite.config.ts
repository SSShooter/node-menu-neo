import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/lib/NodeMenuNeo.svelte'),
      name: 'NodeMenuNeo',
      // the proper extensions will be added
      fileName: 'node-menu-neo',
    },
  },
})
