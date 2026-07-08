'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center px-4 text-center">
      <span className="text-accent-gold text-7xl font-heading mb-6">◆</span>
      <h1 className="text-3xl font-heading font-bold text-text-light mb-4">
        حدث خطأ غير متوقع
      </h1>
      <p className="text-text-muted max-w-md mb-8">
        عذراً، حدث خطأ أثناء تحميل الصفحة. يرجى المحاولة مرة أخرى.
      </p>
      <button
        onClick={reset}
        className="px-8 py-3 bg-accent-gold text-primary font-semibold rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300"
      >
        إعادة المحاولة
      </button>
    </div>
  )
}
