'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Scale } from 'lucide-react'
import { useLocale } from '@/i18n/use-locale'
import { getTranslations } from '@/i18n/get-translations'

const highlights = [
  { key: 'aboutHighlight1' },
  { key: 'aboutHighlight2' },
  { key: 'aboutHighlight3' },
  { key: 'aboutHighlight4' },
]

export function AboutTeaser() {
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const t = getTranslations(locale)

  return (
    <section className="bg-secondary section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <h2 className="text-3xl md:text-[2.5rem] font-heading font-bold text-text-dark leading-[1.12] mb-6 text-balance">
              {t.home.aboutTitle}
            </h2>
            <p className="text-text-muted leading-[1.9] mb-8 max-w-xl text-base md:text-[1.0625rem]">
              {t.home.aboutDesc}
            </p>
            <div className="space-y-3 mb-9">
              {highlights.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold/50 shrink-0" />
                  <span className="text-text-dark text-sm md:text-base">
                    {t.home[item.key as keyof typeof t.home] as string}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-accent-gold font-medium hover:text-accent-gold-light transition-colors duration-200 group"
            >
              {t.home.aboutLink}
              {isRtl ? (
                <ArrowLeft aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              ) : (
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              )}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, delay: 0.15 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-card bg-primary overflow-hidden border border-border-dark/50">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-4">
                    <Scale aria-hidden="true" className="w-7 h-7 text-accent-gold" />
                  </div>
                  <p className="text-text-light/80 text-sm font-heading font-semibold">{t.site.fullName}</p>
                  <p className="text-text-muted/60 text-xs mt-1">{t.footer.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
