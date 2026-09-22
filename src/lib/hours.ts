import type { OpeningHours } from "../types/site";
import { site } from "../config/site";

/** Schema.org expects these exact two-letter forms in openingHoursSpecification. */
const SCHEMA_DAY: Record<string, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

/** "18:30" → "6:30 PM", "20:00" → "8 PM". Trailing ":00" is dropped for calm. */
export function formatTime(time: string): string {
  const [rawHour, rawMinute] = time.split(":");
  const hour24 = Number(rawHour);
  const minute = Number(rawMinute ?? 0);
  if (Number.isNaN(hour24)) return time;

  const suffix = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return minute === 0
    ? `${hour12} ${suffix}`
    : `${hour12}:${String(minute).padStart(2, "0")} ${suffix}`;
}

/** "10 AM – 8 PM", or "Closed". Used by the hours list and the footer. */
export function formatRange(entry: OpeningHours): string {
  if (entry.closed) return "Closed";
  return `${formatTime(entry.open)} – ${formatTime(entry.close)}`;
}

/**
 * Which config row corresponds to today.
 *
 * Deliberately computed in the browser, not at build time: a static page built
 * on Tuesday must not tell a Friday visitor that Tuesday is today. The server
 * render highlights nothing, and a few lines of client JS mark the right row.
 */
export function todayIndex(now = new Date()): number {
  const name = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  return site.hours.findIndex((h) => h.day.toLowerCase() === name);
}

/** schema.org `openingHoursSpecification`, built from the config hours array. */
export function openingHoursSpecification() {
  return site.hours
    .filter((entry) => !entry.closed)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAY[entry.day.toLowerCase()] ?? entry.day,
      opens: entry.open,
      closes: entry.close,
    }));
}

/**
 * Cheapest useful signal of price band for JSON-LD: the span of everything on
 * the menu, mapped onto Google's $-style scale.
 */
export function priceRange(): string {
  const prices = site.services.flatMap((c) => c.items.map((i) => i.price));
  if (prices.length === 0) return "$$";
  const average = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  if (average < 150) return "$";
  if (average < 400) return "$$";
  if (average < 800) return "$$$";
  return "$$$$";
}
