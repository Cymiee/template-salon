import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { site } from "./src/config/site";

// `site` is read straight from the client config so the sitemap and every
// canonical URL follow `seo.siteUrl` without a second place to update.
export default defineConfig({
  site: site.seo.siteUrl,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // One stylesheet in the <head> beats several render-blocking requests on 4G.
    inlineStylesheets: "auto",
  },
  image: {
    // Modern formats first; Astro falls back to the original for old browsers.
    responsiveStyles: true,
  },
});
