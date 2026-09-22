#!/usr/bin/env python3
"""
Regenerate the neutral placeholder images in src/assets/images/ and public/.

You normally run this once per client, right after pasting their brand colours
into src/config/site.ts, so the placeholders match the new palette while you wait
for the client to send real photos. Then you delete them one by one as the real
photos arrive, keeping the same filenames.

    pip install pillow
    python3 scripts/generate-placeholders.py

Everything it writes is listed at the end of the run, so you know exactly which
files are still placeholders and need swapping.
"""

import math
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "src" / "assets" / "images"
PUBLIC = ROOT / "public"

# Keep these in sync with `brand` in src/config/site.ts.
PRIMARY = (43, 58, 51)
ACCENT = (154, 123, 79)
BACKGROUND = (251, 249, 246)
SURFACE = (243, 239, 233)


def mix(a, b, t):
    """Blend two RGB tuples. t=0 gives a, t=1 gives b."""
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def gradient(size, top, bottom, angle=0.0):
    """A smooth linear gradient, drawn at low resolution then scaled up."""
    w, h = size
    small = Image.new("RGB", (64, 64))
    px = small.load()
    ax, ay = math.cos(angle), math.sin(angle)
    for y in range(64):
        for x in range(64):
            # Project onto the gradient axis and normalise to 0..1.
            t = ((x / 63) * ax + (y / 63) * ay + 1) / 2
            px[x, y] = mix(top, bottom, min(1.0, max(0.0, t)))
    return small.resize((w, h), Image.LANCZOS)


def soft_shapes(img, colour, count, rng, strength=(70, 150), spread=0.05):
    """Out-of-focus blobs, so the image reads as a blurred interior photo."""
    w, h = img.size
    layer = Image.new("RGB", (w, h), colour)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    for _ in range(count):
        r = rng.randint(int(w * 0.10), int(w * 0.38))
        cx = rng.randint(-r // 2, w + r // 2)
        cy = rng.randint(-r // 2, h + r // 2)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=rng.randint(*strength))
    mask = mask.filter(ImageFilter.GaussianBlur(radius=w * spread))
    img.paste(layer, (0, 0), mask)
    return img


def light_streak(img, rng, colour, count=3):
    """Soft diagonal shafts, like light coming past a blind. Gives the frame
    somewhere for the eye to go, which flat gradients never do."""
    w, h = img.size
    layer = Image.new("RGB", (w, h), colour)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    band = int(w * 0.14)
    for i in range(count):
        x = int(w * (0.12 + i * 0.27)) + rng.randint(-band // 3, band // 3)
        skew = int(h * 0.38)
        draw.polygon(
            [(x, 0), (x + band, 0), (x + band + skew, h), (x + skew, h)],
            fill=rng.randint(55, 105),
        )
    mask = mask.filter(ImageFilter.GaussianBlur(radius=w * 0.055))
    img.paste(layer, (0, 0), mask)
    return img


def vignette(img, strength=0.30):
    """Darken the corners a little; stops large flat images looking synthetic."""
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    inset = int(min(w, h) * 0.12)
    draw.ellipse((-inset, -inset, w + inset, h + inset), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=min(w, h) * 0.18))
    dark = Image.new("RGB", (w, h), mix(PRIMARY, (0, 0, 0), 0.4))
    return Image.composite(img, Image.blend(img, dark, strength), mask)


def grain(img, amount=4):
    """A touch of noise, so flat gradients don't band on cheap phone screens."""
    w, h = img.size
    noise = Image.effect_noise((w, h), amount * 8).convert("L")
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), amount / 100)


def make(path, size, seed, warmth=0.5, depth=0.55):
    """Write one placeholder. `warmth` leans bronze, `depth` leans dark."""
    rng = random.Random(seed)
    # Push the two ends of the gradient well apart, otherwise every image
    # averages out to the same flat mid-grey once the blurs are applied.
    top = mix(BACKGROUND, ACCENT, 0.18 + warmth * 0.70)
    bottom = mix(PRIMARY, ACCENT, 0.10 + (1 - depth) * 0.35)
    bottom = mix(bottom, SURFACE, max(0.0, 0.62 - depth))
    img = gradient(size, top, bottom, angle=rng.uniform(0.7, 1.15))
    # Dark masses first, then warm highlights on top of them.
    img = soft_shapes(img, mix(PRIMARY, (0, 0, 0), 0.25), rng.randint(3, 5), rng,
                      strength=(80, 165), spread=0.055)
    img = soft_shapes(img, mix(ACCENT, BACKGROUND, 0.55), rng.randint(4, 6), rng,
                      strength=(70, 140), spread=0.045)
    img = light_streak(img, rng, mix(BACKGROUND, ACCENT, 0.22))
    img = img.filter(ImageFilter.GaussianBlur(radius=max(size) * 0.004))
    img = vignette(img)
    # The stacked blurs desaturate everything toward grey; pull the warmth back.
    img = ImageEnhance.Color(img).enhance(1.45)
    img = ImageEnhance.Contrast(img).enhance(1.08)
    img = grain(img)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    return path


def main():
    written = []

    # Hero: wide, darker, so white text sits on it with room to spare.
    written.append(make(IMAGES / "hero.jpg", (2000, 1333), seed=11, warmth=0.35, depth=0.78))

    # About: lighter and calmer than the hero.
    written.append(make(IMAGES / "about.jpg", (1400, 1050), seed=22, warmth=0.62, depth=0.38))

    # Gallery: portrait 4:5, the aspect Instagram-sourced photos usually arrive in.
    for i in range(1, 7):
        written.append(
            make(
                IMAGES / f"gallery-{i:02d}.jpg",
                (1200, 1500),
                seed=100 + i,
                warmth=0.30 + (i % 3) * 0.22,
                depth=0.32 + (i % 4) * 0.13,
            )
        )

    # Open Graph card: 1200×630, lives in public/ because it needs a stable URL.
    written.append(make(PUBLIC / "og-image.jpg", (1200, 630), seed=7, warmth=0.45, depth=0.62))

    print("Placeholder images written — swap each of these for a real photo:")
    for p in written:
        print(f"  {p.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
