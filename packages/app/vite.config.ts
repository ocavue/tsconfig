import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
   build : {
      rollupOptions: {
          external: ['cloudflare:workers']
      }
  },
  plugins: [
    cloudflare({
      configPath: "./wrangler.toml",
    }),
    reactRouter(),
  ],
});
