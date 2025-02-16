import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src/') }],
  },
  server: {
    host: "0.0.0.0",
    port: 5000
  }
})
