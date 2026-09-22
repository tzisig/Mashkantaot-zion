declare global {
  interface Window {
    /** GTM/GA4 data layer. Populated by the analytics layer. */
    dataLayer: Record<string, unknown>[];
  }
}

export {};
