/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Send a page_view event to GA4.
 * Call this on every React Router location change.
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title ?? document.title,
  });
}

/**
 * Send a custom event to GA4.
 * GA4 event names must be snake_case, max 40 chars.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/**
 * Set user properties in GA4 (e.g. language, theme).
 */
export function setUserProperties(
  properties: Record<string, string | number | boolean>
) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('set', 'user_properties', properties);
}
