import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트에서 /daily-final-score 로 호출하면
      // Vite dev 서버가 34.59.147.161:8000/daily-final-score 로 대신 요청해 줌
      "/daily-final-score": {
        target: "http://34.59.147.161:8000",
        changeOrigin: true,
      },
    },
  },
});