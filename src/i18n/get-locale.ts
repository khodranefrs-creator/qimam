import { cookies } from 'next/headers'
import { defaultLocale, type Locale, locales, cookieName } from './config'

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies()
    const locale = cookieStore.get(cookieName)?.value as Locale | undefined
    if (locale && locales.includes(locale)) return locale
  } catch {}
  return defaultLocale
}
