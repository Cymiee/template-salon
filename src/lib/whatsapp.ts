import { site } from "../config/site";

/**
 * Build a wa.me link with a pre-filled message.
 *
 * Every WhatsApp entry point on the site goes through here, so the number and
 * the default message only ever come from the config.
 *
 * @param message Overrides `contact.whatsappMessage` for context-specific CTAs.
 */
export function whatsappLink(message?: string): string {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}

/** `@handle` in the config becomes a real profile URL. */
export function instagramUrl(): string {
  return `https://instagram.com/${site.contact.instagram.replace(/^@/, "")}`;
}
