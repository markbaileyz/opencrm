
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Generate service worker
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        "service-worker": path.resolve(__dirname, "src/service-worker.ts"),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === "service-worker" 
            ? "[name].js" 
            : "assets/[name]-[hash].js";
        },
      },
    },
  },
}));
