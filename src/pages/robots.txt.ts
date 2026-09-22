import type { APIRoute } from "astro";

import { site } from "../config/site";

/**
 * Generated rather than dropped in public/ so the sitemap line always follows
 * `seo.siteUrl` — one less thing to forget when a client's domain changes.
 */
export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${new URL("/sitemap-index.xml", site.seo.siteUrl).href}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
