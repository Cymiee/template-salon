import type { ImageMetadata } from "astro";

/**
 * Resolve an image filename from the config to real image metadata.
 *
 * Astro can only optimise images that live under `src/`, and it needs a static
 * import to do it — a runtime path string is not enough. `import.meta.glob` with
 * `eager: true` gives us every image up front at build time, so the config can
 * keep referring to plain filenames like "gallery-01.jpg" while components still
 * get width, height and `srcset` generation.
 */
const files = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/*.{jpeg,jpg,png,webp,avif,gif,svg}",
  { eager: true },
);

/** Filename (not path) → metadata, e.g. "hero.jpg". */
const byName = new Map<string, ImageMetadata>(
  Object.entries(files).map(([path, mod]) => [
    path.slice(path.lastIndexOf("/") + 1),
    mod.default,
  ]),
);

/**
 * Throws at build time rather than shipping a broken <img>, so a typo in the
 * config or a photo you forgot to copy across fails the build instead of the
 * client's launch day.
 */
export function image(filename: string): ImageMetadata {
  const found = byName.get(filename);
  if (!found) {
    const available = [...byName.keys()].sort().join(", ") || "none";
    throw new Error(
      `Image "${filename}" was not found in src/assets/images/.\n` +
        `Check the filename in src/config/site.ts. Available files: ${available}`,
    );
  }
  return found;
}
