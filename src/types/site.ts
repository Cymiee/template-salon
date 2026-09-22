/**
 * Shape of the single source of truth for a client site.
 *
 * Everything a component renders comes from here. If you find yourself wanting to
 * open a `.astro` file to change something for a client, that thing probably
 * belongs in this interface instead.
 */

export interface Business {
  /** Full trading name. Used in the <h1>, JSON-LD and the browser tab. */
  name: string;
  /** Shorter form for the nav bar and tight spaces. Can equal `name`. */
  shortName: string;
  /** One line under the business name in the hero. Keep it under ~70 characters. */
  tagline: string;
  /** Two or three sentences for the About section. */
  about: string;
  /** Filename inside `src/assets/images/` (e.g. "logo.svg"). */
  logo: string;
  /** Alt text for the logo. Usually just the business name. */
  logoAlt: string;
}

/**
 * Brand colours as hex strings. These become CSS custom properties on <html>,
 * which Tailwind reads as `bg-primary`, `text-muted`, `border-border` and so on.
 *
 * Contrast matters: `text` and `muted` must reach 4.5:1 against `background`, and
 * `primary` must reach 4.5:1 against `background` because buttons use it as a
 * fill behind `background`-coloured text. `accent` is only ever used for large
 * display text, rules and icons, so 3:1 is enough for it.
 */
export interface Brand {
  /** Buttons, headings, strong UI. Dark. */
  primary: string;
  /** Decorative only: hairlines, small caps labels, stars, icons. */
  accent: string;
  /** Page background. */
  background: string;
  /** Cards and alternating bands; a half-step off `background`. */
  surface: string;
  /** Body copy. */
  text: string;
  /** Secondary copy: durations, captions, footer text. */
  muted: string;
  /** Hairlines and input borders. */
  border: string;
}

export interface Fonts {
  /** Google font family name for headings, exactly as Google spells it. */
  heading: string;
  /** Google font family name for body copy. */
  body: string;
  /**
   * The full Google Fonts stylesheet URL for both families.
   * Must include `&display=swap`. Changing this one string re-types the site.
   */
  googleFontsUrl: string;
}

export interface Contact {
  /** International format, digits only, no `+` or spaces. e.g. "971501234567". */
  whatsapp: string;
  /** Pre-filled text for every WhatsApp link on the site. */
  whatsappMessage: string;
  /** Digits for the `tel:` link, with `+`. e.g. "+971501234567". */
  phone: string;
  /** How the phone number is shown to humans. e.g. "+971 50 123 4567". */
  phoneDisplay: string;
  email: string;
  /** Instagram handle including the `@`. The URL is derived from it. */
  instagram: string;
}

export interface Location {
  /** Street address line, without the area or city. */
  addressLine: string;
  /** Neighbourhood, e.g. "Jumeirah 1". Shown next to the business name. */
  area: string;
  city: string;
  country: string;
  /** The `src` from Google Maps → Share → Embed a map. */
  mapEmbedUrl: string;
  /** Google Maps deep link used by the "Get directions" button. */
  directionsUrl: string;
  /** Coordinates for JSON-LD. Right-click the pin in Google Maps to copy them. */
  geo: { lat: number; lng: number };
}

export interface OpeningHours {
  /** Full English day name, e.g. "Monday". Drives the schema.org output. */
  day: string;
  /** 24-hour "HH:MM". Ignored when `closed` is true. */
  open: string;
  /** 24-hour "HH:MM". Ignored when `closed` is true. */
  close: string;
  /** Set true for days the salon does not open. */
  closed?: boolean;
}

export interface ServiceItem {
  name: string;
  /** Free text, e.g. "45 min" or "1 hr 30 min". */
  duration: string;
  /** Number only. The "AED" prefix is added by the component. */
  price: number;
  /** Optional one-liner shown under the service name. */
  description?: string;
}

export interface ServiceCategory {
  /** e.g. "Hair", "Nails", "Skin". Becomes a heading in the price menu. */
  category: string;
  items: ServiceItem[];
}

export interface GalleryImage {
  /** Filename inside `src/assets/images/`, e.g. "gallery-01.jpg". */
  src: string;
  /** Describe what is in the photo. Never leave this empty. */
  alt: string;
}

export interface Testimonial {
  name: string;
  text: string;
  /** 1 to 5. Feeds the aggregate rating in JSON-LD. */
  rating: number;
}

export interface Seo {
  /** Canonical origin with no trailing slash, e.g. "https://maisonlumiere.ae". */
  siteUrl: string;
  /** Browser tab and search result title. Aim for 50–60 characters. */
  title: string;
  /** Search result description. Aim for 140–160 characters. */
  description: string;
  /** Path under `public/`, e.g. "/og-image.jpg". Resolved against `siteUrl`. */
  ogImage: string;
  /** Open Graph locale, e.g. "en_AE". */
  locale: string;
  /** `<html lang>` value, e.g. "en". */
  lang: string;
  /** Text direction. "rtl" is wired through but has no dedicated stylesheet yet. */
  dir: "ltr" | "rtl";
}

/** Every section can be switched off. Turning one off also drops its nav link. */
export interface Sections {
  nav: boolean;
  hero: boolean;
  services: boolean;
  about: boolean;
  gallery: boolean;
  testimonials: boolean;
  hoursLocation: boolean;
  contact: boolean;
  footer: boolean;
  whatsappFab: boolean;
}

export interface SiteConfig {
  /**
   * Demo mode, for the public showcase deployment of this template.
   *
   * When on, the site is marked `noindex`, robots.txt disallows everything, the
   * sitemap is suppressed, the rating structured data is dropped (a fictional
   * salon should not assert a star rating to Google) and the footer says it is a
   * demo.
   *
   * Leave this `false`. The showcase deployment turns it on with a `DEMO=1`
   * environment variable instead, so that a real client site cloned from this
   * template can never accidentally inherit a `noindex`.
   */
  demo: boolean;
  business: Business;
  brand: Brand;
  fonts: Fonts;
  contact: Contact;
  location: Location;
  hours: OpeningHours[];
  services: ServiceCategory[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  forms: {
    /**
     * Web3Forms access key from https://web3forms.com.
     * This is a public submission key, not a secret — it is meant to ship in the
     * client-side HTML, so committing it is fine.
     */
    web3formsKey: string;
  };
  seo: Seo;
  sections: Sections;
  footer: {
    /** Your credit line. Edit or blank it out per client. */
    credit: string;
    /** Where the credit links to. Leave empty for plain text. */
    creditUrl: string;
  };
}
