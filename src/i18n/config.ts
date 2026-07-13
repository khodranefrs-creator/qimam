export const locales = ['ar', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'ar'

export const localeNames: Record<Locale, string> = {
  ar: 'AR',
  en: 'EN',
}

export const localeDirections: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
}

export const cookieName = 'NEXT_LOCALE'

/** Google Business Profile — replace with the firm's official GBP URL when available */
export const googleBusinessProfile = {
  /** Direct edit link for the business owner */
  editUrl: '' as string,
  /** Public Google Maps URL with CID for reviews */
  mapsUrl: 'https://maps.google.com/?q=Qimam+Al-Yaqin+Law+Firm+Makkah' as string,
  /** Direct link to leave a review */
  reviewUrl: '' as string,
  /** Place ID from Google Places API — used for LocalBusiness schema */
  placeId: '' as string,
}

/** Social media profiles — set when the firm provides URLs */
export const socialProfiles = {
  x: '' as string,
  linkedin: '' as string,
  instagram: '' as string,
} as const
