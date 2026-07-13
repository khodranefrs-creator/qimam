import Link from 'next/link'
import { ArrowLeft, ArrowRight, MessageSquare, Quote } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getTranslations } from '@/i18n/get-translations'
import type { TestimonialItem } from './types'
import { TestimonialsCarousel } from './testimonials-carousel'

export default function TestimonialsSlider({
  testimonials,
  locale,
}: {
  testimonials: TestimonialItem[]
  locale: Locale
}) {
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)
  const hasTestimonials = testimonials && testimonials.length > 0

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="animate-fade-up-sm text-center mb-10 md:mb-12">
          <span className="inline-block text-accent-gold text-sm font-medium tracking-widest mb-3">
            {t.testimonials.title}
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark leading-[1.15]">
            {t.home.testimonialsTitle}
          </h2>
          <div className="gold-diamond-divider mt-4 max-w-xs mx-auto">
            <span>◆</span>
          </div>
        </div>

        {hasTestimonials ? (
          <TestimonialsCarousel testimonials={testimonials} />
        ) : (
          <div className="animate-fade-up-sm max-w-lg mx-auto text-center py-12"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="w-20 h-20 rounded-full bg-accent-gold/5 border border-accent-gold/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare aria-hidden="true" className="w-8 h-8 text-accent-gold/40" />
            </div>
            <Quote aria-hidden="true" className="w-8 h-8 text-accent-gold/20 mx-auto mb-4" />
            <p className="text-text-muted leading-relaxed mb-6">
              {t.testimonials.noTestimonials}
            </p>
            <p className="text-text-muted/60 text-sm">
              {t.testimonials.noTestimonials}
            </p>
          </div>
        )}

        <div className="animate-fade-in text-center mt-10 md:mt-12"
          style={{ animationDelay: '0.4s' }}
        >
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
          >
            <span>{t.home.ctaBooking}</span>
            {isRtl ? (
              <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}
