import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})

// https://vite.dev/config/
// export default defineConfig({
//   server: {
//     host: '0.0.0.0',
//     proxy: {
//       '/socket.io/': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false,
//         ws: true,
//       },
//     }
//   },
//   plugins: [react(),tailwindcss(),],
// });