'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

export function CtaBanner() {
  const locale = useLocale()
  const t = getTranslations(locale)

  return (
    <section className="bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 25% 50%, #B08D57 1px, transparent 1px), radial-gradient(circle at 75% 50%, #B08D57 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        className="container-custom py-20 md:py-28 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-8 h-px bg-accent-gold/60" />
          <span className="text-accent-gold text-sm font-medium">{t.home.contactCta}</span>
          <span className="w-8 h-px bg-accent-gold/60" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-light leading-tight mb-10 max-w-3xl mx-auto text-balance">
          {t.home.ctaTitle}
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-gold text-primary font-semibold text-base rounded-[8px] hover:bg-accent-gold/90 transition-all duration-300 shadow-gold hover:shadow-[0_4px_25px_rgba(176,141,87,0.35)]"
          >
            {t.home.ctaBooking}
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link
            href="https://wa.me/966565555437"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-accent-gold/30 text-accent-gold font-medium text-base rounded-[8px] hover:bg-accent-gold/10 transition-all duration-300"
          >
            {t.home.ctaWhatsapp}
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
