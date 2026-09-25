/**
 * Measurement IDs. Everything is null until the accounts exist, and nothing
 * loads while an ID is null - so no third-party script runs by accident.
 * Tags are loaded only after the visitor accepts the matching consent category.
 */
export const analytics = {
  /** GA4 measurement ID, e.g. "G-XXXXXXX". */
  ga4Id: 'G-EKVL8HYDQR' as string | null,
  metaPixelId: null as string | null,
  tiktokPixelId: null as string | null,
};

/** GA4 key events. Kept here so the names stay identical across the site. */
export const keyEvents = {
  lead: 'generate_lead',
  whatsapp: 'whatsapp_click',
  phone: 'phone_click',
  booking: 'book_meeting_click',
} as const;
