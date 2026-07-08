'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Star, Quote, MessageSquare } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import type { TestimonialItem } from './types'

export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: TestimonialItem[]
}) {
  const locale = useLocale()
  const t = getTranslations(locale)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const hasTestimonials = testimonials && testimonials.length > 0

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }, [testimonials.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }, [testimonials.length])

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  useEffect(() => {
    if (isPaused || !hasTestimonials || testimonials.length <= 1) return
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, goNext, testimonials.length, hasTestimonials])

  const variants = {
    enter: (dir: number) => ({ x: dir * 120, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir * -120, opacity: 0 }),
  }

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-14"
        >
          <span className="inline-block text-accent-gold text-sm font-medium tracking-widest mb-3">
            {t.testimonials.title}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-dark">
            {t.home.testimonialsTitle}
          </h2>
          <div className="gold-diamond-divider mt-4 max-w-xs mx-auto">
            <span>◆</span>
          </div>
        </motion.div>

        {hasTestimonials ? (
          <div
            className="max-w-2xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative min-h-[260px] flex items-center">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.3}
                  onDragEnd={(_, info) => {
                    if (info.offset.x > 50) goPrev()
                    else if (info.offset.x < -50) goNext()
                  }}
                  className="w-full"
                >
                  <div className="text-center px-4">
                    <div className="text-6xl leading-none text-accent-gold/15 font-heading mb-4">
                      &quot;
                    </div>
                    <p className="text-lg md:text-xl text-text-dark leading-relaxed mb-6">
                      {testimonials[current].content}
                    </p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (testimonials[current].rating ?? 5)
                              ? 'fill-accent-gold text-accent-gold'
                              : 'text-border'
                          }`}
                        />
                      ))}
                    </div>
                    <div>
                      <span className="font-heading font-bold text-text-dark">
                        {testimonials[current].name}
                      </span>
                      {testimonials[current].role && (
                        <span className="text-text-muted text-sm mr-2">— {testimonials[current].role}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={goPrev}
                  className="w-10 h-10 rounded-full border border-border hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-colors duration-200 focus-ring-gold"
                  aria-label={t.blog.prev}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 focus-ring-gold ${
                        i === current ? 'bg-accent-gold w-6' : 'bg-border hover:bg-accent-gold/40'
                      }`}
                      aria-label={`${t.blog.next} ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="w-10 h-10 rounded-full border border-border hover:border-accent-gold hover:text-accent-gold flex items-center justify-center transition-colors duration-200 focus-ring-gold"
                  aria-label={t.blog.next}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-20 h-20 rounded-full bg-accent-gold/5 border border-accent-gold/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-accent-gold/40" />
            </div>
            <Quote className="w-8 h-8 text-accent-gold/20 mx-auto mb-4" />
            <p className="text-text-muted leading-relaxed mb-6">
              {t.testimonials.noTestimonials}
            </p>
            <p className="text-text-muted/60 text-sm">
              {t.common.loading}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
