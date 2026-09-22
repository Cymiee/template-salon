import { site } from "../config/site";

/**
 * Whether this build is the public showcase demo rather than a client site.
 *
 * Driven primarily by a `DEMO=1` environment variable set on the showcase
 * deployment, with the config flag as a fallback for anyone who prefers to set
 * it in one place. Env-first is deliberate: a client repo cloned from this
 * template has no such variable, so it cannot inherit a `noindex` from the
 * template's own deployment.
 */
export const isDemo =
  import.meta.env.DEMO === "1" ||
  import.meta.env.PUBLIC_DEMO === "1" ||
  site.demo === true;
