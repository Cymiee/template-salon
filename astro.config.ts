import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import { site } from "./src/config/site";

// Canonical origin comes from the client config. SITE_URL overrides it so the
// public demo can be deployed to a *.vercel.app address without editing the
// repo — otherwise the demo would advertise a domain nobody owns in its
// canonical tags, sitemap and share previews.
const siteUrl = process.env.SITE_URL || site.seo.siteUrl;

// A noindex demo should not publish a sitemap.
const isDemo = process.env.DEMO === "1" || site.demo === true;

if (isDemo) {
  console.warn(
    "\n  ⚠  DEMO MODE: this build is noindex and publishes no sitemap.\n" +
      "     Never deploy a real client site with DEMO=1 set.\n",
  );
}

export default defineConfig({
  site: siteUrl,
  integrations: isDemo ? [] : [sitemap()],
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
