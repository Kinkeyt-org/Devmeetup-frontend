import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],

  server:{
    historyApiFallback: true, // Enable history API fallback for SPA routing. This prevents 404 errors when refreshing or directly accessing routes in a React Router application. It ensures that all requests are served the index.html file, allowing the client-side router to handle routing correctly.
  }
})
