import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // ✅ ensures SPA fallback during local dev
  },
  build: {
    outDir: "dist",
  },
  base: "/", // ✅ important for correct routing in Vercel/production
});
