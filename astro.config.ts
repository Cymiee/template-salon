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
    // Inline the CSS rather than shipping a separate render-blocking request.
    // The whole site's stylesheet is a few KB, so this is strictly faster on 4G.
    inlineStylesheets: "always",
  },
  image: {
    // Modern formats first; Astro falls back to the original for old browsers.
    responsiveStyles: true,
  },
});
