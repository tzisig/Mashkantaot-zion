declare global {
  interface Window {
    /** GTM/GA4 data layer. Populated by the analytics layer. */
    dataLayer: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export {};
