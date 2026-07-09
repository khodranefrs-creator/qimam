'use client'

import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export default function SkipToContent() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <a
      href="#main-content"
      className={`sr-only focus:not-sr-only focus:fixed focus:top-4 ${isRtl ? 'focus:right-4' : 'focus:left-4'} focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent-gold focus:text-primary focus:rounded-[8px] focus:text-sm focus:font-medium focus:shadow-gold focus:outline-none focus:ring-2 focus:ring-accent-gold focus:ring-offset-2 focus:ring-offset-primary`}
    >
      {t.common.skipToContent}
    </a>
  )
}
