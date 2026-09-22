import type { SiteConfig } from "../types/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE ONLY FILE YOU NEED TO EDIT FOR A NEW CLIENT.
 *
 *  Work top to bottom. Every field is documented in `src/types/site.ts`, and the
 *  step-by-step order is in the "New client checklist" in README.md.
 *
 *  The content below is a demo for a fictional salon so the template looks
 *  finished out of the box. Replace all of it.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const site: SiteConfig = {
  // 1 ── Business -------------------------------------------------------------
  business: {
    name: "Maison Lumière",
    shortName: "Maison Lumière",
    tagline: "A quiet salon in Jumeirah for hair, nails and skin.",
    about:
      "Maison Lumière began with a simple idea: that a salon should feel calm. " +
      "We keep our appointment book deliberately short so every guest gets an " +
      "unhurried chair, a senior stylist and a finish that still looks right a " +
      "week later. Our team trained in Paris, Beirut and London, and we have been " +
      "looking after Jumeirah since 2016.",
    logo: "logo.svg",
    logoAlt: "Maison Lumière",
  },

  // 2 ── Brand colours --------------------------------------------------------
  // Swap these six hex values and the entire site re-skins. See the contrast
  // notes in src/types/site.ts before choosing.
  brand: {
    primary: "#2B3A33", // deep forest — buttons and headings
    accent: "#9A7B4F", // bronze — hairlines, labels, stars (decorative only)
    background: "#FBF9F6", // warm off-white
    surface: "#F3EFE9", // cards and alternating bands
    text: "#1F2522", // body copy
    muted: "#5F5A54", // durations, captions, footer
    border: "#E2DBD0", // hairlines and input borders
  },

  // 3 ── Typography -----------------------------------------------------------
  // Pick any pair at fonts.google.com, then copy the stylesheet URL it gives you.
  fonts: {
    heading: "Playfair Display",
    body: "Inter",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600&display=swap",
  },

  // 4 ── Contact --------------------------------------------------------------
  contact: {
    whatsapp: "971501234567", // digits only, country code first, no "+"
    whatsappMessage: "Hi, I'd like to book an appointment",
    phone: "+971501234567",
    phoneDisplay: "+971 50 123 4567",
    email: "hello@maisonlumiere.ae",
    instagram: "@maisonlumiere",
  },

  // 5 ── Location -------------------------------------------------------------
  location: {
    addressLine: "Villa 12, Street 10B, Jumeirah 1",
    area: "Jumeirah 1",
    city: "Dubai",
    country: "United Arab Emirates",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Jumeirah%201%2C%20Dubai%2C%20United%20Arab%20Emirates&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Jumeirah+1%2C+Dubai",
    geo: { lat: 25.2116, lng: 55.2565 },
  },

  // 6 ── Opening hours --------------------------------------------------------
  // 24-hour times. Set `closed: true` for days the salon does not open.
  hours: [
    { day: "Monday", open: "10:00", close: "20:00" },
    { day: "Tuesday", open: "10:00", close: "20:00" },
    { day: "Wednesday", open: "10:00", close: "20:00" },
    { day: "Thursday", open: "10:00", close: "21:00" },
    { day: "Friday", open: "10:00", close: "21:00" },
    { day: "Saturday", open: "09:00", close: "21:00" },
    { day: "Sunday", open: "00:00", close: "00:00", closed: true },
  ],

  // 7 ── Services and prices --------------------------------------------------
  // Grouped by category. Prices are numbers; "AED" is added automatically.
  services: [
    {
      category: "Hair",
      items: [
        {
          name: "Cut & Finish",
          duration: "60 min",
          price: 280,
          description: "Consultation, wash, precision cut and blow-dry.",
        },
        { name: "Blow-dry", duration: "45 min", price: 160 },
        {
          name: "Full Colour",
          duration: "2 hr",
          price: 640,
          description: "Single-process colour with a gloss finish.",
        },
        {
          name: "Balayage",
          duration: "3 hr",
          price: 950,
          description: "Hand-painted lightening, toner and cut included.",
        },
        { name: "Root Touch-up", duration: "90 min", price: 380 },
        {
          name: "Keratin Treatment",
          duration: "2 hr 30 min",
          price: 850,
          description: "Formaldehyde-free smoothing, lasts up to four months.",
        },
        { name: "Bridal Styling", duration: "2 hr", price: 1200 },
      ],
    },
    {
      category: "Nails",
      items: [
        { name: "Classic Manicure", duration: "45 min", price: 120 },
        { name: "Classic Pedicure", duration: "60 min", price: 160 },
        {
          name: "Gel Manicure",
          duration: "60 min",
          price: 180,
          description: "Two weeks of wear, soak-off included.",
        },
        { name: "Gel Pedicure", duration: "75 min", price: 220 },
        {
          name: "Builder Gel Overlay",
          duration: "90 min",
          price: 290,
          description: "Strengthens natural nails without extensions.",
        },
        { name: "Nail Art", duration: "20 min", price: 60 },
      ],
    },
    {
      category: "Skin",
      items: [
        {
          name: "Signature Facial",
          duration: "60 min",
          price: 420,
          description: "Double cleanse, gentle exfoliation, mask and massage.",
        },
        {
          name: "Hydrating Facial",
          duration: "75 min",
          price: 520,
          description: "For skin dulled by air conditioning and sun.",
        },
        { name: "Express Glow Facial", duration: "30 min", price: 250 },
        { name: "Brow Shaping", duration: "20 min", price: 90 },
        { name: "Lash Lift & Tint", duration: "60 min", price: 320 },
      ],
    },
  ],

  // 8 ── Gallery --------------------------------------------------------------
  // `src` is a filename in src/assets/images/. Keep the alt text descriptive.
  gallery: [
    { src: "gallery-01.jpg", alt: "The styling floor, with light coming through linen blinds" },
    { src: "gallery-02.jpg", alt: "A stylist finishing a soft blow-dry" },
    { src: "gallery-03.jpg", alt: "Close-up of a fresh gel manicure in a warm nude" },
    { src: "gallery-04.jpg", alt: "The treatment room set up for a facial" },
    { src: "gallery-05.jpg", alt: "Colour being hand-painted through mid-lengths" },
    { src: "gallery-06.jpg", alt: "The reception desk and waiting area" },
  ],

  // 9 ── Testimonials ---------------------------------------------------------
  testimonials: [
    {
      name: "Reem A.",
      text: "The only place in Dubai where I have never once had to explain my hair twice. Nadia listens, and the colour has grown out beautifully.",
      rating: 5,
    },
    {
      name: "Sophie M.",
      text: "Unhurried, quiet and genuinely skilled. I booked a facial before a wedding and ended up moving my whole routine here.",
      rating: 5,
    },
    {
      name: "Hala K.",
      text: "Immaculate on hygiene, and the gel manicure lasted three weeks without a single chip. Booking on WhatsApp takes about a minute.",
      rating: 5,
    },
  ],

  // 10 ── Contact form --------------------------------------------------------
  // Free key from https://web3forms.com — enter the client's email, they get the
  // key by email. Public by design; safe to commit.
  forms: {
    web3formsKey: "YOUR-WEB3FORMS-ACCESS-KEY",
  },

  // 11 ── SEO -----------------------------------------------------------------
  seo: {
    siteUrl: "https://maisonlumiere.ae",
    title: "Maison Lumière — Hair, Nails & Skin in Jumeirah, Dubai",
    description:
      "A quiet Jumeirah salon for cut, colour, nails and facials. Senior stylists, unhurried appointments and easy booking on WhatsApp.",
    ogImage: "/og-image.jpg",
    locale: "en_AE",
    lang: "en",
    dir: "ltr",
  },

  // 12 ── Section switches ----------------------------------------------------
  // Set any of these to false to remove the section and its nav link.
  sections: {
    nav: true,
    hero: true,
    services: true,
    about: true,
    gallery: true,
    testimonials: true,
    hoursLocation: true,
    contact: true,
    footer: true,
    whatsappFab: true,
  },

  // 13 ── Footer credit -------------------------------------------------------
  footer: {
    credit: "Website by Avyukt",
    creditUrl: "",
  },
};

export default site;
