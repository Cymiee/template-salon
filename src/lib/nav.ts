import { site } from "../config/site";

/**
 * The nav links, derived from the section switches.
 *
 * Because this reads `site.sections`, turning a section off in the config also
 * removes its nav link — no dangling anchors that scroll nowhere.
 */
export interface NavLink {
  href: string;
  label: string;
}

export function navLinks(): NavLink[] {
  const candidates: Array<[boolean, NavLink]> = [
    [site.sections.services, { href: "#services", label: "Services" }],
    [site.sections.about, { href: "#about", label: "About" }],
    [site.sections.gallery, { href: "#gallery", label: "Gallery" }],
    [site.sections.testimonials, { href: "#reviews", label: "Reviews" }],
    [site.sections.hoursLocation, { href: "#visit", label: "Visit" }],
    [site.sections.contact, { href: "#contact", label: "Contact" }],
  ];
  return candidates.filter(([enabled]) => enabled).map(([, link]) => link);
}
