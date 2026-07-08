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
