import { fileURLToPath, URL } from 'url'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import vike from 'vike/plugin'
import { vavite } from "vavite";
import { UserConfig } from 'vite'

const config: UserConfig = {
  buildSteps: [
    { name: "client" },
    {
      name: "server",
      config: {
        build: { ssr: true },
      },
    },
  ],
  plugins: [vue(), vuetify(), vike(), vavite({
    serverEntry: "/server/index.ts",
    serveClientAssetsInDev: true,
  }),],
  ssr: { noExternal: ['vuetify', 'swiper']},
  resolve: {
    alias: {
      '#root': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
    port: 3000
  },
}

export default config
