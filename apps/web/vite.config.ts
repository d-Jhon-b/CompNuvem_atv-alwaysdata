import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'
export default defineConfig({
  plugins: [react()],
  base: isGitHubPages?'/CompNuvem_atv-alwaysdata/': '/',
})
