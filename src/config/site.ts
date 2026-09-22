/**
 * Single source of truth for business details.
 * Any value left as null is treated as "missing": components that depend on it
 * either hide themselves or render a visible [חסר: ...] placeholder.
 */
export interface SiteConfig {
  name: string;
  /** Owner's full name, used on about, legal pages and schema. */
  ownerName: string;
  tagline: string;
  /** Production URL, no trailing slash. Keep in sync with astro.config.mjs. */
  url: string;
  locale: string;
  contact: {
    /** Display format, e.g. "050-000-0000" */
    phone: string | null;
    /** International format without "+", e.g. "972500000000" */
    whatsapp: string | null;
    email: string | null;
  };
  /** Physical address. When null, the site presents a nationwide service area only. */
  address: {
    street: string;
    city: string;
    postalCode?: string;
  } | null;
  /** Google Business Profile URL. Enables the GBP block when set. */
  googleBusinessUrl: string | null;
  /** Business registration number (עוסק / ח.פ.). */
  businessId: string | null;
  /** Reserved for the upcoming mortgage advisor license. Never show wording like "licensed" while null. */
  licenseNumber: string | null;
  /** Public booking page (Google Calendar appointment schedule). */
  bookingUrl: string | null;
  foundedYear: number | null;
  /** Opening hours for replies, free text. */
  businessHours: string | null;
  /** Product facts the owner supplied and can change without touching content. */
  facts: {
    /** Minimum age most lenders require for a reverse mortgage (owner-provided, pending verification). */
    reverseMortgageMinAge: number;
  };
  /** Year the owner started working as an economist (confirmed by the owner). */
  economistSince: number;
  social: {
    facebook: string | null;
    tiktok: string | null;
    instagram: string | null;
    youtube: string | null;
  };
}

export const site: SiteConfig = {
  name: 'משכנתאות ציון',
  ownerName: 'ציון סיגרון',
  tagline: 'ייעוץ משכנתאות, מחזור משכנתא ואיחוד הלוואות',
  url: 'https://example.com',
  locale: 'he_IL',
  contact: {
    phone: '058-443-3181',
    whatsapp: '972584433181',
    email: 'info@zionmortgages.com',
  },
  address: null,
  googleBusinessUrl: null,
  businessId: '068422138',
  licenseNumber: null,
  bookingUrl: null,
  foundedYear: null,
  businessHours: 'ימים א-ה, 9:00 עד 18:00',
  facts: {
    reverseMortgageMinAge: 65,
  },
  economistSince: 2007,
  social: {
    facebook: null,
    tiktok: null,
    instagram: null,
    youtube: null,
  },
};

export const whatsappLink = (text?: string) =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;

export const phoneLink = () =>
  site.contact.phone ? `tel:${site.contact.phone.replace(/[^\d+]/g, '')}` : null;
