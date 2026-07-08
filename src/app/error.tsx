'use client'

import { useEffect } from 'react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = useLocale()
  const t = getTranslations(locale)
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 text-center">
      <span className="text-accent-gold text-7xl font-heading mb-6">◆</span>
      <h1 className="text-3xl font-heading font-bold text-text-light mb-4">
        {t.error.title}
      </h1>
      <p className="text-text-muted max-w-md mb-8">
        {t.error.desc}
      </p>
      <button
        onClick={reset}
        className="px-8 py-3 bg-accent-gold text-primary font-semibold rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300"
      >
        {t.common.retry}
      </button>
    </div>
  )
}
