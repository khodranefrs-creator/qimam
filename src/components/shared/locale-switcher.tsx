'use client'

import { locales, type Locale, cookieName, localeNames } from '@/i18n/config'

function getCurrentLocale(): Locale {
  if (typeof document === 'undefined') return 'ar'
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`))
  const val = match?.[1] as Locale | undefined
  if (val && locales.includes(val)) return val
  return 'ar'
}

export function LocaleSwitcher() {
  const current = getCurrentLocale()
  const next = current === 'ar' ? 'en' : 'ar'

  const switchLocale = () => {
    document.cookie = `${cookieName}=${next}; path=/; max-age=31536000; SameSite=Lax`
    window.location.reload()
  }

  return (
    <button
      onClick={switchLocale}
      className="text-xs font-medium text-text-muted hover:text-accent-gold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold rounded"
      aria-label={`Switch to ${next === 'en' ? 'English' : 'Arabic'}`}
    >
      <span className="text-accent-gold font-medium">{localeNames[current]}</span>
      <span className="text-text-light/20 mx-1.5">|</span>
      <span className="hover:text-text-light transition-colors">{localeNames[next]}</span>
    </button>
  )
}
