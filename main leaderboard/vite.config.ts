import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/daily-final-score": {
        target: "http://34.59.147.161:8000",
        changeOrigin: true,
      },
    },
  },
});