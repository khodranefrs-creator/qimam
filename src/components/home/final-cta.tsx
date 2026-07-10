'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'
import { EyebrowTag } from '@/components/ui/eyebrow-tag'

export function FinalCTASection() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-primary section-padding relative overflow-hidden">
      <div className="absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />
      <div className="absolute top-7 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-accent-gold/[0.06] blur-[3px]" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-gold/[0.02] blur-[120px]" />
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex justify-center mb-5">
            <EyebrowTag label={t.nav.consultation} />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-light leading-[1.15] mb-5 text-balance">
            {t.home.finalCTATitle}
          </h2>
          <p className="text-text-muted text-muted-on-dark text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t.home.finalCTADesc}
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/consultation"
              className="btn-primary group"
              aria-label={t.home.finalCTACta}
            >
              {t.home.finalCTACta}
              {isRtl ? (
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              ) : (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              )}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
