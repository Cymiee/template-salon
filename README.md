# Salon & Spa Website Template

A config-driven [Astro](https://astro.build) template for small salons and spas.
Everything a client needs — content, colours, fonts, hours, prices, SEO — lives in
one file, **`src/config/site.ts`**. You should not need to open a component to
launch a new site.

Static output, no backend, deploys free to Vercel or Netlify.

**Lighthouse (mobile, production build):** Performance **100** · Accessibility
**100** · Best Practices **100** · SEO **100**.

---

## Stack

| | |
|---|---|
| Framework | Astro 7 (static output) |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` |
| Language | TypeScript, strict |
| Forms | [Web3Forms](https://web3forms.com) (free tier, no backend) |
| Images | Astro `<Image>` — AVIF/WebP, `srcset`, lazy below the fold |
| Deps | 5 runtime packages, no UI library |

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds to dist/
npm run preview  # serve the production build locally
```

`npm run build` runs `astro check` first, so a typo in the config fails the build
rather than the client's launch day.

---

## How it fits together

```
src/
├── config/site.ts      ← the only file you edit per client
├── types/site.ts          the config's shape, with a note on every field
├── assets/images/      ← client photos go here (keep the filenames)
├── lib/                   whatsapp links, image lookup, hours formatting
├── layouts/Base.astro     <head>, SEO, JSON-LD, brand CSS variables
├── components/            one per section, all reading from the config
└── pages/
    ├── index.astro        composes the sections, each behind a config flag
    ├── 404.astro
    └── robots.txt.ts      generated so it follows seo.siteUrl
```

**Colours and fonts.** `Base.astro` writes the config's brand values onto `<html>`
as CSS custom properties. `src/styles/global.css` maps them to Tailwind tokens
once, in a single `@theme inline` block. That's why components say `bg-primary`
and `text-muted` and never contain a hex code — change the config, the whole site
re-skins.

**Sections.** `index.astro` renders each section only if its flag in
`sections` is true. Turning one off also removes its nav and footer links, so
there are never anchors that scroll nowhere.

---

## New client checklist

Work top to bottom. Roughly 60–90 minutes once you have the client's content.

### 1. Start the project

```bash
npx degit Cymiee/template-salon client-name
cd client-name
npm install
git init && git add -A && git commit -m "Initial commit from template"
npm run dev
```

### 2. Fill in `src/config/site.ts`

The file is numbered 1–13. Go in order — every field is documented in
`src/types/site.ts` if you need detail.

| # | Block | What to do |
|---|---|---|
| 0 | `demo` | Leave it `false`. Only the public demo deployment turns it on, and it does that with an environment variable. |
| 1 | `business` | Name, tagline, 2–3 sentence about text. |
| 2 | `brand` | Six hex values. **Read the contrast note below before choosing.** |
| 3 | `fonts` | Pick a pair on [fonts.google.com](https://fonts.google.com), click *Get embed code*, paste the `<link href="...">` URL into `googleFontsUrl`, and put the two family names in `heading` and `body`. Keep `&display=swap`. |
| 4 | `contact` | WhatsApp number is **digits only, country code first, no `+`** — `971501234567`. Getting this wrong silently breaks every booking button, so test it. |
| 5 | `location` | See step 4 below for the two map URLs. |
| 6 | `hours` | 24-hour times. Use `closed: true` for days off. |
| 7 | `services` | Prices are numbers, not strings — `280`, not `"AED 280"`. |
| 8 | `gallery` | Filenames plus **real alt text**. Describe the photo; it is both an accessibility and an SEO win. |
| 9 | `testimonials` | Use real reviews only — see the warning below. |
| 10 | `forms` | See step 5. |
| 11 | `seo` | Title 50–60 characters, description 140–160, `siteUrl` with no trailing slash. |
| 12 | `sections` | Switch off anything the client doesn't have. A salon with no gallery photos yet: set `gallery: false` and turn it on later. |
| 13 | `footer` | Your credit line. Set `creditUrl` to your own site once you have one. |

**Contrast.** `text`, `muted` and `primary` must each reach **4.5:1** against
`background`; `accent` only needs 3:1 because it is used for large or decorative
elements. Check pairs at [WebAIM](https://webaim.org/resources/contrastchecker/).
If a client insists on a pale gold for body text, put it in `accent` and keep a
darker tone in `primary` — this is what keeps the Accessibility score at 100.

**Testimonials.** These generate `Review` and `AggregateRating` structured data.
Inventing them is a Google penalty risk and a misrepresentation to customers. Use
real reviews with permission, or set `testimonials: false` in `sections`.

### 3. Swap the images

Replace the files in **`src/assets/images/`**, keeping the same filenames:

| File | Used for | Suggested size |
|---|---|---|
| `hero.jpg` | Full-screen hero | 2000×1333, landscape |
| `about.jpg` | About section | 1400×1050, 4:3 |
| `gallery-01.jpg` … `gallery-06.jpg` | Gallery grid | 1200×1500, portrait 4:5 |
| `logo.svg` | Nav mark | SVG, square-ish |
| `public/og-image.jpg` | Share preview | **exactly** 1200×630 |

Notes:

- Images live in `src/assets/`, **not `public/`** — Astro only optimises images
  under `src/`. Files in `public/` are served untouched, with no WebP/AVIF and no
  `srcset`. `og-image.jpg` is the exception: it needs a fixed public URL.
- Add or remove gallery images freely; just list them in `gallery` in the config.
  A wrong filename fails the build with a list of the files that do exist.
- The hero works best with a darker image, since white text sits over it.
- For `logo.svg`, use `fill="currentColor"` and it will pick up the brand colour
  automatically.
- No photos yet? Regenerate neutral placeholders in the client's brand colours:
  update the four RGB values at the top of `scripts/generate-placeholders.py`,
  then `pip install pillow && python3 scripts/generate-placeholders.py`.

### 4. Get the two map URLs

**Embed URL** (`location.mapEmbedUrl`): Google Maps → find the business →
**Share** → **Embed a map** → **Copy HTML** → paste only the `src="..."` value.

**Directions URL** (`location.directionsUrl`): use the business name or address:

```
https://www.google.com/maps/dir/?api=1&destination=URL+ENCODED+ADDRESS
```

**Coordinates** (`location.geo`): right-click the map pin → the first item is
`lat, lng`. These feed the `BeautySalon` structured data.

### 5. Set up the contact form

1. Go to [web3forms.com](https://web3forms.com).
2. Enter **the client's** email address — that is where enquiries land.
3. They receive an access key by email; paste it into `forms.web3formsKey`.
4. Run the site and send a real test enquiry. Check the client's inbox **and**
   their spam folder, then tell them to mark it "not spam".

The key is a public submission key, not a secret. It is designed to ship in the
page's HTML, so committing it is fine. If you leave it unset, a warning appears in
the form during `npm run dev` only.

### 6. Check before you ship

```bash
npm run build && npm run preview
```

- [ ] Every WhatsApp button opens a chat with the right number and the pre-filled
      message. **Test on a real phone.**
- [ ] The contact form delivers to the client's inbox.
- [ ] Map shows the right location; "Get directions" opens navigation.
- [ ] Prices and durations match what the client sent — read them back one by one.
- [ ] Check it at 360px wide, the narrowest phone worth caring about.
- [ ] Tab through the page: every link and button shows a visible focus ring.
- [ ] Open `/some-missing-page` and confirm the 404 looks right.
- [ ] Optional: run Lighthouse yourself —
      `npx lighthouse http://localhost:4321/ --view`

### 7. Deploy to Vercel

1. Push to a new GitHub repo.
2. [vercel.com](https://vercel.com) → **Add New** → **Project** → import the repo.
3. Vercel detects Astro. Leave build command and output directory as they are.
4. **Deploy.** You get a `*.vercel.app` URL — send this to the client for sign-off
   before the domain is connected.

**Connect the domain**

1. Vercel → project → **Settings** → **Domains** → add `clientdomain.com`.
2. Vercel shows the records to add. At the client's registrar (GoDaddy, Namecheap,
   Etisalat, du…), add:

   | Type | Name | Value |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   Use the values Vercel shows you — they occasionally change.
3. DNS takes 10 minutes to 48 hours. Vercel issues the HTTPS certificate itself.
4. Once live, set `seo.siteUrl` to the real domain, commit and push. This is what
   canonical URLs, `robots.txt`, the sitemap and the share preview all key off, so
   **don't skip it.**
5. Submit the site to [Google Search Console](https://search.google.com/search-console)
   and give it the sitemap: `https://clientdomain.com/sitemap-index.xml`.

Netlify works the same way — `netlify.toml` is included with the build settings.

### 8. Hand over

Give the client:

- The live URL, and the Search Console property if you set one up.
- Their Web3Forms login, so enquiries keep arriving if they ever leave you.
- A plain-English note on what changes cost what. Suggested framing: *"Prices,
  hours, photos and text are a small update. New sections or a redesign are
  quoted separately."*

Things worth saying out loud, because they save arguments later:

- The client cannot edit the site themselves — there is no CMS. That is deliberate:
  it is what keeps it fast and free to host.
- Their domain renewal is their own bill, not yours.
- Hosting on Vercel's free tier is genuinely free at this traffic level.

---

## Deploying the public demo

This is the showcase you send to prospective clients — a live URL they can open
on their phone. It is the template repo itself, deployed as-is.

Deploy it on Vercel like any client site (step 7 above), then set **two
environment variables** in the Vercel project (Settings → Environment Variables):

| Variable | Value |
|---|---|
| `DEMO` | `1` |
| `SITE_URL` | your deployment's URL, e.g. `https://template-salon.vercel.app` |

Redeploy after adding them.

`DEMO=1` does four things, all of them about not lying to Google or to visitors:

- adds `<meta name="robots" content="noindex">` and makes `robots.txt` disallow
  everything, so a fictional salon never competes for real Jumeirah searches;
- publishes no sitemap;
- drops `aggregateRating` and `Review` from the structured data — invented
  reviews should not assert a star rating;
- adds "Demo site — sample content for a fictional salon" to the footer.

`SITE_URL` overrides `seo.siteUrl` at build time, so canonical tags, the OG
image and share previews point at the address the demo actually lives on
instead of the placeholder domain in the config.

**Why an environment variable and not a config flag.** If demo mode lived only in
`site.ts`, every client repo cloned from this template would start with it set,
and one forgotten line would ship a paying client's site as `noindex` — quietly
destroying their search presence with nothing visibly wrong. A client clone has
no `DEMO` variable, so it cannot inherit the mistake. The build also prints a
loud warning whenever demo mode is on.

**Expected Lighthouse on the demo:** Performance 100 · Accessibility 100 · Best
Practices 100 · **SEO 69**. The SEO score is low *because* the page is
deliberately blocked from indexing — that single audit is worth ~31 points. The
client build, which is what actually matters, scores 100 across all four.

---

## Things you will want to change eventually

**Adding a page.** Create `src/pages/offers.astro`, wrap it in `Base`, done — the
nav, footer and floating button come with the layout:

```astro
---
import Base from "../layouts/Base.astro";
---
<Base title="Offers — Salon Name" description="Current offers.">
  <section class="px-5 py-32 sm:px-8">…</section>
</Base>
```

**Self-hosting the fonts.** The Google Fonts stylesheet is loaded off the critical
path, so it does not block the first paint. If you want to drop the third-party
request entirely, `npm i @fontsource/<family>`, import the weights in `Base.astro`,
and delete the three font `<link>` tags. You lose the "swap one config string"
convenience, so only do it if a client asks.

**Arabic / RTL.** `seo.lang` and `seo.dir` are already wired to `<html>`. Setting
`dir: "rtl"` flips the document, but the layout has not been tested in RTL and
some spacing utilities would need logical properties. Budget real time for it.

**Motion.** Sections fade and rise on scroll via a small IntersectionObserver in
`Base.astro`. It is disabled automatically under `prefers-reduced-motion`. To
remove it entirely, delete the `reveal` class from the components.

---

## Licence

Yours to use commercially for client work. The placeholder images are generated,
so there are no stock photo licences to worry about.
