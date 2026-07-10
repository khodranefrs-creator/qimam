'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

export function CtaBanner() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-primary relative overflow-hidden pb-16 lg:pb-0">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 25% 50%, #C6A15B 1px, transparent 1px), radial-gradient(circle at 75% 50%, #C6A15B 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="absolute top-1/2 -left-20 w-64 h-64 rounded-full bg-accent-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-64 h-64 rounded-full bg-accent-gold/5 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="container-custom py-24 md:py-32 text-center relative z-10"
      >
        <div className="flex justify-center mb-6">
          <EyebrowTag label={t.home.contactCta} />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-light leading-[1.15] mb-6 max-w-3xl mx-auto text-balance">
          {t.home.ctaTitle}
        </h2>

        <p className="text-text-muted text-muted-on-dark text-lg leading-relaxed max-w-lg mx-auto mb-10">
          {t.home.ctaDesc}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/consultation"
            className="btn-primary group"
            aria-label={t.home.ctaBooking}
          >
            {t.home.ctaBooking}
            {isRtl ? (
              <ArrowLeft aria-hidden="true" className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight aria-hidden="true" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            )}
          </Link>
          <a
            href="https://wa.me/966565555437"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            aria-label={t.home.ctaWhatsapp}
          >
            <MessageCircle aria-hidden="true" className="w-5 h-5" />
            {t.home.ctaWhatsapp}
          </a>
          <a
            href="tel:+966565555437"
            className="btn-secondary"
            aria-label={t.nav.contactUs}
          >
            <Phone aria-hidden="true" className="w-5 h-5" />
            {t.nav.phone}
          </a>
        </div>
      </motion.div>
    </section>
  )
}
