'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ChevronRight, ChevronLeft, Star } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import type { TestimonialItem } from './types'

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: TestimonialItem[]
}) {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }, [testimonials.length])

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  const goTo = useCallback((index: number) => {
    setCurrent(index)
  }, [])

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, goNext, testimonials.length])

  const item = testimonials[current]

  return (
    <div
      className="max-w-2xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[260px] flex items-center">
        <div
          key={current}
          className="w-full animate-fade-in"
          style={{ animationDuration: '0.4s' }}
        >
          <div className="text-center px-4">
            <div className="text-6xl leading-none text-accent-gold/15 font-heading mb-4">
              &quot;
            </div>
            <p className="text-lg md:text-xl text-text-dark leading-relaxed mb-6">
              {item.content}
            </p>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star aria-hidden="true"
                  key={i}
                  className={`w-4 h-4 ${
                    i < (item.rating ?? 5)
                      ? 'fill-accent-gold text-accent-gold'
                      : 'text-border'
                  }`}
                />
              ))}
            </div>
            <div>
              <span className="font-heading font-bold text-text-dark">
                {item.name}
              </span>
              {item.role && (
                <span className="text-text-muted text-sm me-2">— {item.role}</span>
              )}
              {item.source && (
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-accent-gold/5 text-accent-gold border border-accent-gold/15 font-medium">
                    {item.source}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={goPrev}
            className="w-10 h-10 rounded-full border border-border hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-colors duration-200 focus-ring-gold"
            aria-label={t.blog.prev}
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus-ring-gold ${
                  i === current ? 'bg-accent-gold w-6' : 'bg-border hover:bg-accent-gold/40'
                }`}
                aria-label={`${t.testimonials.title} ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-10 h-10 rounded-full border border-border hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-colors duration-200 focus-ring-gold"
            aria-label={t.blog.next}
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      )}
    </div>
  )
}
