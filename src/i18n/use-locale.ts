'use client'

import { useState, useEffect } from 'react'
import { defaultLocale, type Locale, locales, cookieName } from './config'

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`))
    const val = match?.[1] as Locale | undefined
    if (val && locales.includes(val)) {
      setLocale(val)
    }
  }, [])

  return locale
}
