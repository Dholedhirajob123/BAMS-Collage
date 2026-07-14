import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173,
    strictPort: false,
  },

  build: {
    outDir: "dist",
    sourcemap: false,

    // Only increases the warning limit
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-popover",
            "@radix-ui/react-tabs",
          ],
          icons: ["lucide-react"],
        },
      },
    },
  },
});