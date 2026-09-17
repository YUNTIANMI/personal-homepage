import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // 放行云隧道域名：开发时若通过 Cloudflare quick tunnel 等公网地址访问
    // （手机自测 / 临时演示），Vite 6 会校验 Host 头，未放行会返回
    // "Blocked request. This host is not allowed"。仅影响 dev server，不影响构建产物。
    allowedHosts: ['.trycloudflare.com'],
  },
})
