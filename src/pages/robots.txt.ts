import type { APIRoute } from "astro";

import { site } from "../config/site";
import { isDemo } from "../lib/demo";

/**
 * Generated rather than dropped in public/ so the sitemap line always follows
 * `seo.siteUrl` — one less thing to forget when a client's domain changes.
 */
export const GET: APIRoute = ({ site: configuredSite }) => {
  const origin = configuredSite?.href ?? site.seo.siteUrl;

  // The demo build asks search engines to stay away entirely.
  const body = isDemo
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${new URL("/sitemap-index.xml", origin).href}`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
